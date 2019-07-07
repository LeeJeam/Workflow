package cn.hy.functionmenumanage.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import cn.hy.common.utils.SessionUtil;
import cn.hy.projectmanage.pojo.Project;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import cn.hy.basemanage.dao.CreateTebleUserDao;
import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.impl.BaseService;
import cn.hy.functionmenumanage.pojo.SysMenu;
import cn.hy.functionmenumanage.service.IMenuService;
import cn.hy.functionmenumanage.vo.MenuTreeNode;
/**
 * @author lijianbin
 *
 * 2016年1月28日
 */
@Service("menuService")
public class MenuServiceImpl extends BaseService<CreateTebleUser> implements IMenuService {

	@Resource(name="createTebleUserDao")
	public void setMapper(CreateTebleUserDao dao){
		mapper=dao;
	}
	
	public CreateTebleUserDao getDao(){
		return (CreateTebleUserDao)getMapper();
	}
	
	public Long insertEntity(SysMenu entity, Boolean isNeedId) {
		StringBuilder sb=new StringBuilder("INSERT INTO sys_menu (menu_name, sys_function_id,parent_id,project_id) VALUES (")
		.append("'").append(entity.getMenuName()==null?"":entity.getMenuName())
		.append("',").append(entity.getSysFunctionId()==null?"NULL":entity.getSysFunctionId())
		.append(",").append(entity.getParentId()==null?"NULL":entity.getParentId())
		.append(",").append(entity.getProjectId()==null?"NULL":entity.getProjectId()).append(")");
		insertBySQL(sb.toString());
		if(isNeedId){
			return getLastInsertId();
		}
		return 1L;
	}
	
	public void insertTreeEntity(List<MenuTreeNode> nodes,Long projectId) {
		if(nodes!=null&&!nodes.isEmpty()){
			for(MenuTreeNode node:nodes){
				updateInsertMenu(node, node.getpId() != null ? Long.parseLong(node.getpId()) : null, projectId);
			}
		}
	}

	public Long insertMenuTree(MenuTreeNode node,Long projectId) {
		SysMenu menu=new SysMenu();
		menu.setMenuName(node.getName());
		menu.setSysFunctionId(node.getSysFunctionId());
		Long parentId = node.getpId() != null ? Long.parseLong(node.getpId()) : null;
		menu.setParentId(parentId);
		menu.setProjectId(projectId);
		Long id;
		if(node.getChildren()!=null){//有子集
			id=insertEntity(menu, true);
			List<MenuTreeNode> children=node.getChildren();
			for(MenuTreeNode n:children){
				updateInsertMenu(n,id,projectId);
			}
		}else{
			id=insertEntity(menu, false);
		}
		return id;
	}
	
	public void updateInsertMenu(MenuTreeNode node,Long parentId,Long projectId){
		if(node.getIsDelete()){//删除
			deleteBySQL("DELETE FROM sys_menu WHERE id="+node.getId());
		}else if(node.getIsUpdate()){//修改
			SysMenu menu=new SysMenu();
			menu.setId(Long.valueOf(node.getId()));
			menu.setMenuName(node.getName());
			menu.setSysFunctionId(node.getSysFunctionId());
			update(menu);
			if(node.getChildren()!=null){
				List<MenuTreeNode> children=node.getChildren();
				for(MenuTreeNode n:children){
					updateInsertMenu(n,menu.getId(),projectId);
				}
			}
		}else if(node.getIsInsert()){//插入
			SysMenu menu=new SysMenu();
			menu.setMenuName(node.getName());
			menu.setSysFunctionId(node.getSysFunctionId());
			menu.setParentId(parentId);
			menu.setProjectId(projectId);
			Long id;
			if(node.getChildren()!=null){//有子集
				id=insertEntity(menu, true);
				List<MenuTreeNode> children=node.getChildren();
				for(MenuTreeNode n:children){
					updateInsertMenu(n,id,projectId);
				}
			}else{
				id=insertEntity(menu, false);
			}
			
		}else{//既不是删除、修改也不是插入
			if(node.getChildren()!=null){
				List<MenuTreeNode> children=node.getChildren();
				for(MenuTreeNode n:children){
					updateInsertMenu(n,Long.valueOf(node.getId()),projectId);
				}
			}
		}
	}

	public Map<String, Object> findById(Long id) {
		return selectBySQL("select * from sys_menu where id = " + id).get(0);
	}

	public Integer deleteById(Long id) {
		deleteBySQL("DELETE FROM sys_menu WHERE parent_id="+id);
		return deleteBySQL("DELETE FROM sys_menu WHERE ID="+id);
	}

	public List<MenuTreeNode> findTreeNode(Long projectId) {
		List<Map<String, Object>> listMap=selectBySQL("SELECT sm.id,sm.menu_name,sm.parent_id,sm.sys_function_id,sf.web_name FROM sys_menu sm LEFT JOIN sys_function sf  ON sm.sys_function_id = sf.id where sm.project_id="+projectId);
		List<MenuTreeNode> treeNodes=new ArrayList<MenuTreeNode>();
		if(listMap!=null&&!listMap.isEmpty()){
			for(Map<String,Object> map:listMap){
				Object o=map.get("sys_function_id");
				MenuTreeNode tn=new MenuTreeNode();
				tn.setId(String.valueOf(map.get("id")));
				tn.setpId(String.valueOf(map.get("parent_id")));
				tn.setName((String)map.get("menu_name"));
				tn.setText((String)map.get("web_name"));
				tn.setSysFunctionId(o==null?null:Long.valueOf(o.toString()));
				treeNodes.add(tn);
			}
		}
		return treeNodes;
	}

	public Integer update(SysMenu menu) {
		StringBuilder sb=new StringBuilder("UPDATE sys_menu SET ");
		boolean flag = false;
		if(menu.getMenuName() != null) {
			flag = true;
			sb.append(" menu_name= '").append(menu.getMenuName()).append("'");
		}

		if(menu.getSysFunctionId()!=null){
			if(flag) {
				sb.append(",");
			}
			flag = true;
			sb.append(" sys_function_id=").append(menu.getSysFunctionId());
		}
		if(flag) {
			sb.append(" WHERE id=").append(menu.getId());
			return updateBySQL(sb.toString());
		} else {
			return null;
		}
	}


	public Integer updateFunctionIdToNull(Long id) {
		StringBuffer sb = new StringBuffer("update sys_menu set sys_function_id = null where id =").append(id);
		return updateBySQL(sb.toString());
	}

	@Override
	public List<Map<String,Object>> getTreeMenu(Long projectId,String pid,boolean flag) {
		List<Map<String,Object>> dataLists = new ArrayList<>();

		StringBuffer sql = new StringBuffer();

		sql.append("select u.*,n.url,n.id funId,n.web_name,(select count(*) from sys_menu ue where ue.parent_id = u.id) isParent");
		sql.append(" from sys_menu u LEFT JOIN  sys_function  n on u.sys_function_id = n.id ");
		sql.append(" where (n.modal_name is null or n.modal_name !=-1)");

		if (StringUtils.isNotEmpty(pid) && StringUtils.isNotBlank(pid)) {
			sql.append(" and u.parent_id = '" +pid+ "'");
		} else {
			sql.append(" and u.parent_id is null ");
		}

		sql.append(" and u.project_id = '"+projectId+"'");
		List<Map<String,Object>> lists = selectBySQL(sql.toString());

		if(flag) {
			for(Map<String,Object> listMap : lists) {

				Integer isParent = Integer.parseInt(String.valueOf(listMap.get("isParent") != null ? listMap.get("isParent") : "0"));
				String  id       = String.valueOf(listMap.get("id") != null ? listMap.get("id") : "");
				boolean isP = isParent > 0 ? true : false;

				dataLists.add(listMap);
				if(isP) {
					List<Map<String,Object>> var0 = getTreeMenu(projectId,id,isP);
					if(var0 != null && var0.size() > 0) {
						dataLists.addAll(var0);
					}
				}
			}
			return dataLists;
		} else {
			return lists;
		}
	}
}
