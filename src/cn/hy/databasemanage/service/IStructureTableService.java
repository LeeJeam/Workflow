package cn.hy.databasemanage.service;

import java.util.List;
import java.util.Map;

import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.IService;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.pojo.StructureTable;
import cn.hy.releasesmanage.pojo.ViewRelationPojo;

/**
 * @author lijianbin
 *
 * 2016年1月22日
 */
public interface IStructureTableService extends IService<CreateTebleUser>{
	/**
	 * 通过表名与工程名查询该工程中tableName数据库是否存在
	 * @param tableName     表名
	 * @param projectId   工程名
	 * @return true存在false不存在
	 */
	public Boolean findTableIsExites(String tableName,Long projectId);
	/**
	 * 保存表结构------表与项目的对应关系
	 * @param tables           列属性集合
	 * @param tableName        表名
	 * @param updateTableName  要更新的表名
	 * @param projectId      项目主键
	 * @param tableType      表类型
	 * @param is_default     是否默认
	 * @return
	 */
	public JsonMessage insertStructureTableList(List<StructureTable> tables, Long projectId, String updateTableName, String tableName,String remarks,String tid, String tableType, String is_default,String customerType);

	/****
	 * 更新和创建视图结构
	 * @param structureTables
	 * @param tableId
	 * @param tablename
	 * @return
	 */
	public boolean createOrUpdateIsViewColumns(List<StructureTable> structureTables,Long tableId,String tablename,Long projectId,List<ViewRelationPojo> views);
	/**
	 * 根据项目名称查询该项目下的所有表
	 * @param projectId  项目主键
	 * @return
	 */
	public List<Map<String,Object>> findTableByProjectId(Long projectId);
	
	/**
	 * 根据项目名称和表名查询一张表结构
	 * @param projectId  项目主键
	 * @param tableName    表名
	 * @return
	 */
	public List<Map<String,Object>> findTableStructureByPnAndTn(Long projectId,String tableName);

	public List<Map<String,Object>> findViewsColumns(Long projectTableId,String tablename);


	public List<Map<String,Object>> findViewsRelations(Long projectId,Long projectTableId);
	/**
	 * 根据项目-表结构表主键查询
	 * @param projectTableId  项目-表结构表主键
	 * @return
	 */
	public List<Map<String,Object>> findTableByPId(Long projectTableId);
	/**
	 * 删除数据表
	 * @Desription TODO
	 * @Author 周取宝
	 * @CreateDate 2016年6月21日 
	 * @Version 0.1
	 */
	public void deleteTableDataBase(Long tid);
}
