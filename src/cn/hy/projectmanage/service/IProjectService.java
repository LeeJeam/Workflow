package cn.hy.projectmanage.service;

import java.util.List;

import cn.hy.common.service.IService;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.pojo.StructureTable;
import cn.hy.projectmanage.pojo.Project;

/**
 * @author lijianbin
 *
 * 2016年1月22日
 */
public interface IProjectService extends IService<Project>{
	public JsonMessage insertStructureTableList(Long projectId, String tableName,String remarks,String tid,Boolean isDefault,Integer baseType);
	public Boolean findTableIsExites(String tableName,Long projectId);
	
}
