package cn.hy.databasemanage.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import cn.hy.releasesmanage.pojo.ViewRelationPojo;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import cn.hy.basemanage.dao.CreateTebleUserDao;
import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.impl.BaseService;
import cn.hy.common.utils.PinYinUtil;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.pojo.StructureTable;
import cn.hy.databasemanage.service.IStructureTableService;

/**
 * @author lijianbin
 *
 * 2016年1月22日
 */
@Service("structureTableService")
public class StructureTableServiceImpl extends BaseService<CreateTebleUser> implements IStructureTableService {

	protected static final Logger log=Logger.getLogger(StructureTableServiceImpl.class);
	
	
	@Resource(name="createTebleUserDao")
	public void setMapper(CreateTebleUserDao dao){
		mapper=dao;
	}
	
	public Boolean findTableIsExites(String tableName,Long projectId){
		List<Map<String,Object>> list = selectMapBySQL("SELECT pt.id FROM project_table pt WHERE pt.table_name='"+tableName+"' AND pt.project_id="+projectId);
	    if(!list.isEmpty()){
	    	return true;
	    }
		return false;
	}
	
	public JsonMessage insertStructureTableList(List<StructureTable> tables, Long projectId, String updateTableName, String tableName,String remarks,String tid,String tableType,String is_default,String customerType){
		 //表-项目关系表主键
		Long lastId = null;
		String tableNameEN=PinYinUtil.chineseToPinYin(tableName);
		   Boolean isFlag=true;
		   if(StringUtils.isNotBlank(tid)){//更新表
			  /* //删除表
			   List<Map<String,Object>> pl=selectBySQL("SELECT id FROM project_table WHERE project_id="+projectId+" AND table_name='"+updateTableName+"'");
			   lastId=Long.valueOf(pl.get(0).get("id").toString());
			   */
			   if(!updateTableName.equals(tableNameEN)){//表名未改
				   List<Map<String,Object>> list = selectMapBySQL("SELECT pt.id FROM project_table pt WHERE pt.table_name='"+tableName+"' AND pt.project_id="+projectId+" and id !="+tid);
				   if(!list.isEmpty()){
					   return new JsonMessage(false, "表已经存在");
				    }else{
				    	updateBySQL("update project_table set table_name='"+tableNameEN+"',table_alias='"+tableName+"' where id='"+tid+"'");
				    }
				   //删除表-项目关系关系表
				  // deleteBySQL("DELETE FROM project_table WHERE project_id="+projectId+" AND table_name='"+updateTableName+"'");
			   }
			   isFlag=false;
			   //删除表结构表
			   if(!"yonghubiao".equals(tableName)) { //当不是用户表时
				   deleteBySQL("DELETE FROM structure_table WHERE project_table_id="+tid);
			   }else{
				   deleteBySQL("DELETE FROM structure_table WHERE project_table_id= '"+tid+"' and filed_name not in  ('username' ,'password')");
			   }
			   
		   }else{//新增表
			   Boolean isExites=findTableIsExites(tableNameEN, projectId);
			   if(isExites){
				   return new JsonMessage(false, "表已经存在");
			   }
		   }
		   if(isFlag){
			   insertBySQL("INSERT INTO project_table(project_id,table_name,table_alias,remarks,table_create_time,tableType,is_default,customerType) VALUES ("+projectId+", '"+tableNameEN+"', '"+tableName+"','"+remarks+"','"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"','"+tableType+"','"+(is_default==null?0:is_default)+"','"+customerType+"')");
			   lastId=getLastInsertId();
			   if("2".equals(tableType)){//树形结构表
				   if(tables==null){
					   tables=new ArrayList<StructureTable>();
				   }
				   StructureTable s1=new StructureTable();
				   s1.setProjectTableId(lastId);
				   s1.setTableName(tableNameEN);
				   s1.setFiledName("pid");
				   s1.setColumnAlias("上级");
				   s1.setColumnType("数字");
				   s1.setColumnSize(11);
				   s1.setIsDefault("1");
				   s1.setProjectId(projectId);
				   StructureTable s2=new StructureTable();
				   s2.setProjectTableId(lastId);
				   s2.setTableName(tableNameEN);
				   s2.setFiledName("name");
				   s2.setColumnAlias("名称");
				   s2.setColumnType("字符串");
				   s2.setColumnSize(32);
				   s2.setProjectId(projectId);
				   s2.setIsDefault("1");
				   tables.add(s2);
				   tables.add(s1);
				   tid=lastId.toString();
			   }else if("3".equals(tableType)){//字典表
				   if(tables==null){
					   tables=new ArrayList<StructureTable>();
				   }
				  
				   StructureTable s1=new StructureTable();
				   s1.setProjectTableId(lastId);
				   s1.setTableName(tableNameEN);
				   s1.setFiledName("name");
				   s1.setColumnAlias("名称");
				   s1.setColumnType("字符串");
				   s1.setColumnSize(32);
				   s1.setIsDefault("1");
				   s1.setProjectId(projectId);
				  // tables.add(s2);
				   tables.add(s1);
				   tid=lastId.toString();
			   }else if("4".equals(tableType)){//多关联表
				   if(tables==null){
					   tables=new ArrayList<StructureTable>();
				   }
				   StructureTable s3=new StructureTable();
				   s3.setProjectTableId(lastId);
				   s3.setTableName(tableNameEN);
				   s3.setFiledName("lever");
				   s3.setColumnAlias("级别");
				   s3.setColumnType("数字");
				   s3.setColumnSize(11);
				   s3.setIsDefault("1");
				   s3.setProjectId(projectId);
				   StructureTable s2=new StructureTable();
				   s2.setProjectTableId(lastId);
				   s2.setTableName(tableNameEN);
				   s2.setFiledName("name");
				   s2.setColumnAlias("名称");
				   s2.setColumnType("字符串");
				   s2.setColumnSize(32);
				   s2.setIsDefault("1");
				   s2.setProjectId(projectId);
				   StructureTable s1=new StructureTable();
				   s1.setProjectTableId(lastId);
				   s1.setTableName(tableNameEN);
				   s1.setFiledName("pid");
				   s1.setColumnAlias("上级");
				   s1.setColumnType("数字");
				   s1.setColumnSize(11);
				   s1.setIsDefault("1");
				   s1.setProjectId(projectId);
				   tables.add(s2);
				   tables.add(s1);
				   tables.add(s3);
				   tid=lastId.toString();
			   }else if("6".equals(tableType)){//字典表
				   if(tables==null){
					   tables=new ArrayList<StructureTable>();
				   }
				  
				   StructureTable s1=new StructureTable();
				   s1.setProjectTableId(lastId);
				   s1.setTableName(tableNameEN);
				   s1.setFiledName("guanlianshujuid");
				   s1.setColumnAlias("关联数据ID");
				   s1.setColumnType("字符串");
				   s1.setColumnSize(32);
				   s1.setIsDefault("1");
				   s1.setProjectId(projectId);
				 
				   StructureTable s2=new StructureTable();
				   s2.setProjectTableId(lastId);
				   s2.setTableName(tableNameEN);
				   s2.setFiledName("shujuleixing");
				   s2.setColumnAlias("数据类型");
				   s2.setColumnType("字符串");
				   s2.setColumnSize(50);
				   s2.setIsDefault("1");
				   s2.setProjectId(projectId);

				   StructureTable s3=new StructureTable();
				   s3.setProjectTableId(lastId);
				   s3.setTableName(tableNameEN);
				   s3.setFiledName("flowCode");
				   s3.setColumnAlias("流程编码");
				   s3.setColumnType("字符串");
				   s3.setColumnSize(50);
				   s3.setIsDefault("1");
				   s3.setProjectId(projectId);
				   
				   tables.add(s1);
				   tables.add(s2);
				   tables.add(s3);
				   tid=lastId.toString();
			   }else{
				   
			   }
		   }
		if(tables!=null&&!tables.isEmpty()){
		   StringBuilder sb=new StringBuilder("INSERT INTO structure_table (table_name, filed_name, column_alias, column_type, column_size, is_default,project_id,project_table_id) VALUES ");
		   int size=tables.size();
		   for(int i=0;i<size;i++){
			   if(i!=0){
				   sb.append(",");
			   }
			   StructureTable table=tables.get(i);
			   sb.append("('").append(tableNameEN)
				 .append("','").append(PinYinUtil.chineseToPinYin(table.getFiledName()))
				 .append("','").append(table.getColumnAlias())
				 .append("','").append(table.getColumnType())
				 .append("','").append(table.getColumnSize())
				 .append("',").append(table.getIsDefault()==null?0:table.getIsDefault())
				 .append(",").append(projectId)
				 .append(",").append(tid).append(")");
		   }
		   insertBySQL(sb.toString());
		}
		return new JsonMessage(true, String.valueOf(lastId));
	}


	public boolean createOrUpdateIsViewColumns(List<StructureTable> structureTables,Long tableId,String tablename,Long projectId,List<ViewRelationPojo> views){

		try{
			deleteBySQL("delete from structure_table where table_name ='" +tablename+ "' and project_table_id ='" +tableId+ "'");

			if(structureTables!=null&&!structureTables.isEmpty()){//根据表名删除
				StringBuilder sb=new StringBuilder("INSERT INTO structure_table (table_name, filed_name, column_alias, column_type, column_size, is_default,project_id,project_table_id) VALUES ");
				int size=structureTables.size();
				for(int i=0;i<size;i++){
					if(i!=0){
						sb.append(",");
					}
					StructureTable table=structureTables.get(i);
					sb.append("('").append(tablename)
							.append("','").append(PinYinUtil.chineseToPinYin(table.getFiledName()))
							.append("','").append(table.getColumnAlias())
							.append("','").append(table.getColumnType())
							.append("','").append(table.getColumnSize())
							.append("',").append(table.getIsDefault()==null?0:table.getIsDefault())
							.append(",").append(projectId)
							.append(",").append(tableId).append(")");
				}
				insertBySQL(sb.toString());

				deleteBySQL("delete from structrue_view_relations where tableId ='" +tableId+ "' and projectId ='" +projectId+ "'");

				StringBuilder sr =new StringBuilder("INSERT INTO structrue_view_relations (mtable, mcolumn, rtable, rcolumn,joinMethod, projectId, tableId) VALUES ");
				for(int i = 0;i<views.size();i++) {
					ViewRelationPojo view = views.get(i);
					if(i !=0) {
						sr.append(",");
					}
					sr.append("('").append(view.getMtable())
							.append("','").append(view.getMcolumn())
							.append("','").append(view.getRtable())
							.append("','").append(view.getRcolumn())
							.append("','").append(view.getJoin())
							.append("',").append(projectId)
							.append(",").append(tableId).append(")");

				}
				insertBySQL(sr.toString());
				return true;
			}
		} catch (Exception ex){
			ex.printStackTrace();
			return false;
		}
		return false;

	}

	public List<Map<String, Object>> findTableByProjectId(Long projectId) {
		return selectMapBySQL("SELECT id,project_id,table_name,table_alias FROM project_table WHERE project_id='"+projectId+"'");
	}

	public List<Map<String, Object>> findTableStructureByPnAndTn(Long projectId, String tableName) {
		StringBuilder sb=new StringBuilder("SELECT st.table_name,st.filed_name,st.column_alias,st.column_type,st.column_size,pt.table_alias,st.is_default ")
		  .append(" FROM structure_table st LEFT JOIN project_table pt ON st.project_table_id = pt.id ")
		  .append(" WHERE pt.table_name='").append(tableName).append("' AND pt.project_id=").append(projectId);

		return selectMapBySQL(sb.toString());
	}

	@Override
	public List<Map<String, Object>> findViewsColumns(Long projectTableId, String tablename) {
		return selectMapBySQL("select * from structure_table e where e.table_name = '"+tablename+"' AND e.project_table_id="+projectTableId);
	}

	@Override
	public List<Map<String, Object>> findViewsRelations(Long projectId, Long projectTableId) {
		StringBuffer sb = new StringBuffer();

		sb.append("select * from structrue_view_relations s where s.tableId = '"+projectTableId+"' and s.projectId='"+projectId+"'");

		return selectMapBySQL(sb.toString());
	}

	public List<Map<String, Object>> findTableByPId(Long projectTableId) {
		return selectBySQL("SELECT st.id,st.table_name,st.filed_name,st.column_alias,st.column_type,st.column_size,st.project_table_id FROM structure_table st WHERE st.project_table_id="+projectTableId);
	}

	@Override
	public void deleteTableDataBase(Long tid) {
		if(tid!=null){
			 deleteBySQL("DELETE FROM project_table WHERE id="+tid);
			 deleteBySQL("DELETE FROM structure_table WHERE project_table_id="+tid);
			 deleteBySQL("delete from structrue_view_relations where tableId =" + tid);
		}
	}
}
