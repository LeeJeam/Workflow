package cn.hy.databasemanage.service;

import cn.hy.commForm.pojo.Attachment;
import cn.hy.releasesmanage.pojo.RelationPojo;
import cn.hy.releasesmanage.pojo.TableColumnPojo;
import net.sf.json.JSONArray;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * 数据导出excel
 * @author lijianbin
 *
 * 2016年3月16日
 */
public interface IExcelService {

	/**
	 * 导出excel
	 * @param response
	 * @param data     数据
	 * @param title     标题
	 */
	public void exportExcel(HttpServletResponse response, List<Map<String, Object>> data, String[] title,String columns);

	/***
	 * 查询需要导出的表数据
	 * @param tableName
	 * @param where
	 * @param columns
	 * @return
	 */
	public List<Map<String,Object>> selectExportData(String tableName,Map<String,Object> where,String columns,String relations);





	public String getKeys(Map<String,Object> columns,String title);


	/**
	 * 导入Excel数据到系统中
	 * @param attachments
	 * @param tableName
	 * @return
	 */
	public boolean importData(List<Attachment> attachments,String tableName,String relations,List<TableColumnPojo> columnPojos);


	public String accrodingRelationGetId(String relations,String column,String columnVal);

	/***
	 * 根据列名查询关联列信息
	 * @param relaltions
	 * @param column
	 * @return
	 */
	public RelationPojo getRelationPojo(String relaltions,String column);
}
