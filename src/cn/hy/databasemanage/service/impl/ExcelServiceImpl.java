package cn.hy.databasemanage.service.impl;


import cn.hy.basemanage.dao.CreateTebleUserDao;
import cn.hy.commForm.pojo.Attachment;
import cn.hy.common.service.impl.BaseService;
import cn.hy.databasemanage.service.IExcelService;
import cn.hy.releasesmanage.pojo.RelationPojo;
import cn.hy.releasesmanage.pojo.TableColumnPojo;
import com.alibaba.fastjson.JSONArray;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.*;
import java.util.regex.Pattern;


@Service
public class ExcelServiceImpl extends BaseService implements IExcelService {

	@Resource(name="createTebleUserDao")
	public void setMapper(CreateTebleUserDao dao){
		mapper=dao;
	}



	@Override
	public List<Map<String, Object>> selectExportData(String tableName, Map<String, Object> where, String columns,String relations) {
		StringBuffer buffer = new StringBuffer();
		buffer.append("select ");


		String [] columnsArray = columns.split(",");
		List list = Arrays.asList(columnsArray);

		List<String> newList = new ArrayList<>(list);
		if(StringUtils.isNotEmpty(relations) && StringUtils.isNotEmpty(relations) && !"[]".equals(relations)) {
			List<RelationPojo> relationPojos = com.alibaba.fastjson.JSONArray.parseArray(relations, RelationPojo.class);

			if(relationPojos != null && !relationPojos.isEmpty()) {
				for(int i = 0;i<relationPojos.size();i++) {
					RelationPojo relationPojo = relationPojos.get(i);

					buffer.append("(select ")
							.append(relationPojo.getColumnname())
							.append(" from ")
							.append(relationPojo.getTablename())
							.append(" where ")
							.append(relationPojo.getId())
							.append(" = ")
							.append("s."+relationPojo.getRelationColumns()).append(" ) " + relationPojo.getRelationColumns());
					//if(i != (relationPojos.size()-1)) {
						buffer.append(" , ");
					//}

					newList.remove(relationPojo.getRelationColumns());

				}
			}

		}

		for(int i = 0;i<newList.size();i++) {
			buffer.append(newList.get(i));

			if(i != (newList.size()-1)) {
				buffer.append(",");
			}
		}

		buffer.append(" from ").append(tableName + " s ");

		if(where != null && !where.isEmpty()) {
			buffer.append(" where ");
			Iterator<String> it = where.keySet().iterator();
			while (it.hasNext()) {
				String key = it.next();
				String val = String.valueOf(where.get(key) != null ? where.get(key) : "");
				if(StringUtils.isNotEmpty(val) && StringUtils.isNotBlank(val)) {
					buffer.append(key + " = '" + val +"'");
					if(it.hasNext()) {
						buffer.append(" and ");
					}
				}

			}
		}
		return selectBySQL(buffer.toString());
	}
	@Override
	public void exportExcel(HttpServletResponse response,List<Map<String,Object>> datas,String[] title,String  columns){
		OutputStream out=null;
		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet("Sheet1");
		HSSFRow row = sheet.createRow((int) 0);
		HSSFCellStyle style = wb.createCellStyle();
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		for (int i = 0; i < title.length; i++) {
			HSSFCell cell = row.createCell(i);
			cell.setCellValue(title[i]);
			cell.setCellStyle(style);
			sheet.autoSizeColumn(i);
			sheet.setColumnWidth(i, 16 * 256);
		}

		String [] newColumns = columns.split(",");
		int size = datas.size();
		for (int i = 0; i < size; i++) {
			row = sheet.createRow(i + 1);
			Map<String, Object> map=datas.get(i);
			for (int j = 0; j < newColumns.length; j++) {
				Cell cell = row.createCell(j);
				cell.setCellValue(map.get(newColumns[j])==null?"":String.valueOf(map.get(newColumns[j]).toString()));
			}
		}
		try {
			StringBuilder sb=new StringBuilder();
			String str = Pattern.compile("\\.xlsx$", Pattern.CASE_INSENSITIVE).matcher("数据导出.xlsx").replaceAll("");//去掉.xls字符
			str = java.net.URLEncoder.encode(str, "UTF-8");//解决中文文件名乱码
			sb.append(str);
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/octet-stream;charset=UTF-8");
			response.addHeader("Content-Disposition","attachment;charset=UTF-8;filename="+sb.toString()+".xlsx");
			out = response.getOutputStream();
			wb.write(out);
		}catch (Exception e) {
			e.printStackTrace();
		} finally{
			try {
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}



	@Override
	public String getKeys(Map<String, Object> columns, String title) {
		for(Map.Entry entry : columns.entrySet()) {
			if(title != null && title.equals(entry.getValue())) {
				return String.valueOf(entry.getKey() != null ? entry.getKey() : "");
			}
		}
		return null;
	}

	@Override
	public String accrodingRelationGetId(String relaltions,String column,String columnVal) {
		String result = null;
		RelationPojo pojo = getRelationPojo(relaltions,column);
		if(pojo != null) {
			result = "(select s.id from " + pojo.getTablename() + " s where s." + pojo.getColumnname() + " = '" +columnVal+ "')";
		}
		return result;
	}

	public RelationPojo getRelationPojo(String relaltions,String column) {
		List<RelationPojo> relationPojos = JSONArray.parseArray(relaltions,RelationPojo.class);
		for(int i = 0;i<relationPojos.size();i++) {
			RelationPojo pojo = relationPojos.get(i);
			if(pojo.getRelationColumns().equals(column)) {//pid
				return pojo;
			}
		}
		return null;
	}





	@Override
	public boolean importData(List<Attachment> attachments, String tableName,String relations,List<TableColumnPojo> columnPojos) {

		Map<String,Object> columsMap = new HashMap<String,Object>();
		for(TableColumnPojo pojo : columnPojos) {
			columsMap.put(pojo.getId(),pojo.getText());
		}
		try {
			List<String> deleteId = new ArrayList<String>();
			StringBuffer insert = new StringBuffer();
			insert.append("insert into " + tableName +"(");

			if(attachments == null && attachments.isEmpty() && tableName == null && "".equals(tableName)) {
				return false;
			}
			for(int i = 0;i<attachments.size();i++) {

				Attachment attachment = attachments.get(i);
				InputStream is = new FileInputStream("D:\\formAtt\\"+attachment.getFilepath());

				POIFSFileSystem fileSystem = new POIFSFileSystem(is);
				HSSFWorkbook  hssfWorkbook = new HSSFWorkbook(fileSystem);

				HSSFSheet sheet = hssfWorkbook.getSheetAt(0);
				HSSFRow row = sheet.getRow(0);

				int column = row.getPhysicalNumberOfCells();
				String [] titles = new String[column];
				for(int j = 0;j<column;j++) {
					HSSFCell cell = row.getCell(j);
					String title = cell.getStringCellValue();
					String key = getKeys(columsMap,title);
					if(key != null) {
						insert.append(key);
					}
					if(j != (column-1)) {
						insert.append(",");
					}
					titles[j] = cell.getStringCellValue();
				}
				insert.append(") values");

				int rowNum = sheet.getLastRowNum();
				for(int j = 1;j<=rowNum;j++) {
					row = sheet.getRow(j);
					for(int k = 0;k<column;k++) {
						if(k == 0) {
							insert.append("(");
						}
						String key = getKeys(columsMap,titles[k]);
						if("id".equals(key)) {
							row.getCell(k).setCellType(Cell.CELL_TYPE_STRING);
							deleteId.add(row.getCell(k).getStringCellValue());
						}
						if(key != null) {
							//判断是否是关联字段
							row.getCell(k).setCellType(Cell.CELL_TYPE_STRING);
							String valColumn = accrodingRelationGetId(relations,key,row.getCell(k).getStringCellValue());
							if(StringUtils.isNotEmpty(valColumn) && StringUtils.isNotBlank(valColumn)){ //如果是关联字段，则有值，反之
								insert.append(valColumn);
							} else {
								insert.append("'"+row.getCell(k).getStringCellValue()+"'");
							}
						}
						if(k != (column-1)) {
							insert.append(",");
						} else {
							insert.append(")");
						}
					}
					if(j != rowNum) {
						insert.append(",");
					}
				}
				if(deleteId.size() > 0) {
					StringBuffer ids = new StringBuffer();
					for(int m = 0;m< deleteId.size();m++) {
						ids.append(deleteId.get(m));
						if(m != (deleteId.size()-1)) {
							ids.append(",");
						}
					}
					String delte = "delete from "+tableName+" where id in (" +ids.toString()+")";
					deleteBySQL(delte);

				}
				insertBySQL(insert.toString());
			}
			return true;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}
}
