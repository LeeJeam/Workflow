package cn.hy.common.utils;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import cn.hy.projectmanage.pojo.Project;

/**
 * @author lijianbin
 *
 * 2016年1月22日
 */
public class SessionUtil {

	/**
	 * 存在session的项目名的键值
	 */
	public static final String PROJECT_NAME = "projectName";
	public static final String USEROBJECT = "userobject";
	
	/**
	 * 获得项目名
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Project getProjectName(HttpServletRequest request){
		HttpSession session = request.getSession();
		String sesionId = session.getId();
		Map<String,Object> map=(Map<String, Object>) session.getAttribute(sesionId);
		if(map!=null){
			Object project = map.get(PROJECT_NAME);
			if(project!=null){
				return (Project) project;
			}
		}
		return null;
	}
	
	/**
	 * 登录用户
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map<String,Object> getLoginUser(HttpServletRequest request){
		HttpSession session = request.getSession();
		Map<String,Object> map=(Map<String, Object>) session.getAttribute(USEROBJECT);
		if(map!=null){
			return map;
		}
		return null;
	}
	
	/**
	 * 给项目名赋值
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static void setProjectName(HttpServletRequest request,Project project){
		HttpSession session = request.getSession();
		String sesionId = session.getId();
		Map<String,Object> map=(Map<String, Object>) session.getAttribute(sesionId);
		if(map==null){
		   map=new HashMap<String, Object>();
		   session.setAttribute(sesionId, map);
		}
		map.put(PROJECT_NAME, project);
	}
}
