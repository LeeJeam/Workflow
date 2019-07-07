package cn.hy.databasemanage.service;

import java.util.List;
import java.util.Map;

import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.IService;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.vo.TableFiled;



public interface ICreateTableService extends IService<CreateTebleUser>{

	/**
	 * 创建表
	 * @param tableName   查询表名
	 * @param tableFileds    查询表单参数
	 * @return
	 */
	public JsonMessage insertTable(String tableName, List<TableFiled> tableFileds);
	/**
	 * 查找表注释
	 * @param tableName 表名
	 * @return
	 */
	public List<Map<String,Object>> findTableComment(String tableName);
	
	/**
	 * 按项目主键创建项目中的所有表
	 * @param projectId  项目主键
	 */
	public void createDB(Long projectId,String user,String pasw);

	/***
	 * 创建数据库
	 * @param database
	 */
	public String createDataBase(String database, String user, String pasw,String dbPath,boolean isCreate);

	public void copyFileToPublishProject(Long projectId,String projectFilePath,String commonpath);
}
