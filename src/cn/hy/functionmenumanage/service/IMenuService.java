package cn.hy.functionmenumanage.service;

import java.util.List;
import java.util.Map;

import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.IService;
import cn.hy.functionmenumanage.pojo.SysMenu;
import cn.hy.functionmenumanage.vo.MenuTreeNode;


/**
 * @author lijianbin
 *
 * 2016年1月28日
 */
public interface IMenuService extends IService<CreateTebleUser> {

	/**
	 * 插入实体
	 * @param entity
	 * @param isNeedId
	 * @return
	 */
	public Long insertEntity(SysMenu entity,Boolean isNeedId);
	
	/**
	 * 插入树实体
	 * @param nodes      树集合
	 * @param projectId  项目主键
	 */
	public void insertTreeEntity(List<MenuTreeNode> nodes,Long projectId);

	/***
	 * 插入树实体
	 * @param node
	 * @param projectId
	 * @return
	 */
	public Long insertMenuTree(MenuTreeNode node,Long projectId);
	
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
	/**
	 * 根据项目主键查询项目菜单功能返回一个树节点
	 * @param projectId   项目主键
	 * @return
	 */
	public List<MenuTreeNode> findTreeNode(Long projectId);

	/**
	 * 保存
	 * @param menu
	 * @return 
	 */
	public Integer update(SysMenu menu);

	/***
	 *更新功能id为空
	 * @param id
	 * @return
	 */
	public Integer updateFunctionIdToNull(Long id);

	/***
	 *
	 * @return
	 */
	public List<Map<String,Object>> getTreeMenu(Long projectId,String pid,boolean flag);
}
