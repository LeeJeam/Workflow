package cn.hy.functionmenumanage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.hy.common.controller.BaseController;
import cn.hy.common.utils.SessionUtil;
import cn.hy.common.vo.JsonMessage;
import cn.hy.functionmenumanage.pojo.SysMenu;
import cn.hy.functionmenumanage.service.IMenuService;
import cn.hy.functionmenumanage.vo.MapToTreeUtil;
import cn.hy.functionmenumanage.vo.MenuTreeNode;
import cn.hy.projectmanage.pojo.Project;
import org.springframework.web.servlet.ModelAndView;

/**
 * 功能菜单
 * @author lijianbin
 *
 * 2016年1月28日
 */
@Controller
@Scope("prototype")
@RequestMapping("menu/")
public class MenuController extends BaseController {

	protected static final Logger log = Logger.getLogger(MenuController.class);
	
	@Resource(name="menuService")
	private IMenuService service;

	@RequestMapping(INDEX)
	public String createTable() {
		return "functionmenumanage/menu";
	}


	/***
	 * 新增菜单
	 * @param request
	 * @return
	 */
	@RequestMapping(ADD)
	@ResponseBody
	public JsonMessage add(HttpServletRequest request) {
		String menuName = request.getParameter("menuName");
		String pid      = request.getParameter("pid");
		Long funId = Long.parseLong(request.getParameter("funId") != null ? request.getParameter("funId") : "0");

		MenuTreeNode node = new MenuTreeNode();
		node.setName(menuName);
		node.setpId(pid);
		node.setIsInsert(true);
		if(funId > 0L) {
			node.setSysFunctionId(funId);
		}

		try {
			Project project = SessionUtil.getProjectName(request);
			service.insertMenuTree(node,project.getId());
			Long id = service.getLastInsertId();
			return new JsonMessage(true,String.valueOf(id != null ? id :""));
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false,"保存失败");
		}
	}

	@RequestMapping("getTreeMenu")
	@ResponseBody
	public List<Map<String,Object>> getTreeMenu(HttpServletRequest request,String parentId) {
		Project project = SessionUtil.getProjectName(request);
		return service.getTreeMenu(project.getId(),parentId,true);
	}


	@RequestMapping("getOneMenu")
	@ResponseBody
	public Map<String,Object> getOneMenu(HttpServletRequest request,Long id) {
		Map<String,Object> dataMap = new HashMap<String,Object>();
		try {
			Map<String,Object> menuInfo = service.findById(id);
			dataMap.put("success",true);
			dataMap.put("menuInfo",menuInfo);
		} catch (Exception e) {
			dataMap.put("success",false);
			e.printStackTrace();
		}
		return dataMap;
	}

	
	/**
	 * 获得项目功能树
	 */
	@RequestMapping(UPDATE)
	@ResponseBody
	public JsonMessage update(SysMenu menu) {
		try {
			service.update(menu);
			return new JsonMessage(true,"");
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false,"保存失败");
		}
	}

	/**
	 * 获得项目功能树
	 */
	@RequestMapping("updateFunctionToNull")
	@ResponseBody
	public JsonMessage update(Long id) {
		try {
			service.updateFunctionIdToNull(id);
			return new JsonMessage(true,"");
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false,"保存失败");
		}
	}
	
	/**
	 * 获得项目功能树
	 */
	@RequestMapping("findTreeNode")
	@ResponseBody
	public List<MenuTreeNode> findTreeNode(Long projectId) {
		try {
			if(projectId==null){
				return new ArrayList<MenuTreeNode>();
			}
			return service.findTreeNode(projectId);
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<MenuTreeNode>();
		}
	}
	
	/**
	 * 获得项目功能树
	 */
	@RequestMapping(DELETE)
	@ResponseBody
	public JsonMessage delete(Long id) {
		try {
			if(id==null){
				return new JsonMessage(false,"参数为空");
			}
			service.deleteById(id);
			return new JsonMessage(true,"删除成功!");
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false,"删除失败");
		}
	}
}
