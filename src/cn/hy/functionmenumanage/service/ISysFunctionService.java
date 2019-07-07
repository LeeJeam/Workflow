package cn.hy.functionmenumanage.service;

import java.util.List;
import java.util.Map;

import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.IService;
import cn.hy.functionmenumanage.pojo.SysFunction;
import cn.hy.functionmenumanage.vo.TreeNode;

/**
 * @author lijianbin
 *
 * 2016年1月25日
 */
public interface ISysFunctionService extends IService<CreateTebleUser> {

	/**
	 * 插入实体
	 * @param entity
	 * @param isNeedId
	 * @return
	 */
	public Long insertEntity(SysFunction entity,Boolean isNeedId);
	/**
	 * 根据项目主键和表主键查询项目功能
	 * @param projectId   项目主键
	 * @param id          表主键
	 * @return
	 */
	public List<Map<String,Object>> findByProjectIdAndId(Long projectId,Long id,String typeid,String ctId,String webname);
	/**
	 * 根据项目主键查询项目功能返回一个树节点
	 * @param projectId   项目主键
	 * @return
	 */
	public List<TreeNode> findTreeNode(Long projectId);

	/**
	 * 根据项目主键查询项目功能返回一个树节点
	 * @param projectId   项目主键
	 * @return
	 */
	public List<TreeNode> findFlowForms(Long projectId);





	/***
	 * 根据项目主键查询项目功能页面返面一个树节点
	 * @param projectId
	 * @param type 1表格 2表单
	 * @return
	 */
	public List<TreeNode> findFromTreeNode(Long projectId,String type,String menuPath,String level,String customerType);
	/**
	 * 更新功能表
	 * @param id           功能表主键
	 * @param content      页面内容
	 */
	public void updateC(Long id, String content,String modalName,String formProperties);

	public void updateC(Long id, String content);
	
	/**
	 * 按主键查询一条记录
	 * @param id   主键
	 * @return
	 */
	public Map<String,Object> findById(Long id);
	/**按主键删除
	 * @param id   主键
	 * @return 
	 */
	public Integer deleteById(Long id);


	/***
	 * 查询自定义页面
	 * @param projectId 项目id
	 * @param tableId   表id
	 * @param type      自定义类型1表格 2表单
	 * @return
	 */
	public List<Map<String,Object>> findByProjectAndTableIdAndType(Long projectId,Long tableId,Integer type);
	/**
	 * 得到单个
	 * @param id
	 * @return
	 */
	public List<Map<String, Object>>  selectone(Object id);

	public boolean updateTableContent(Long id,String content);
	
	public List<Map<String, Object>> selectProcessForm(Long projectId);
}
