package cn.hy.common.controller;

import cn.hy.common.utils.PropertiesUtils;
import cn.hy.common.utils.SessionUtil;
import cn.hy.common.utils.UrlUtil;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.interceptor.MySessionContext;
import cn.hy.projectmanage.pojo.Project;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/6/23.
 */
@Controller
@RequestMapping("login/")
public class LoginController {

	private final static Logger log=Logger.getLogger(LoginController.class);
	
	//登录日记主键
	private final static String LOGIN_LOG_ID="login_log_id";
		
    @Resource(name = "createTableService")
    private ICreateTableService service;

    @RequestMapping("loginIn")
    @ResponseBody
    public Map<String,Object> login(String username,String password,HttpServletRequest request) {
        Map<String, Object> dataMap = new HashMap<String, Object>();
        try {
            List<Map<String, Object>> lists =  service.selectBySQL("select * from user r where r.login_name = '" + username + "' and r.password = '" + password + "'");
            if(lists != null && !lists.isEmpty()) {
                dataMap.put("success",true);
                request.getSession().setAttribute(SessionUtil.USEROBJECT, lists.get(0));
            } else  {
                dataMap.put("success",false);
            }
        } catch (Exception ex) {
            dataMap.put("success", false);
            ex.printStackTrace();
        }
        return dataMap;
    }


    @RequestMapping("logout")
    public Map<String,Object> logout(HttpServletRequest request) {
        Map<String,Object> dataMap = new HashMap<>();
        request.getSession().removeAttribute("projectId");
        request.getSession().removeAttribute("project");
        dataMap.put("success",true);
        return dataMap;
    }
    /**
     * 
     * 发布后的登陆
     * @param username
     * @param password
     * @return
     */
    @RequestMapping("loginInAfterDeploy")
    @ResponseBody
    public Map<String,Object> loginInAfterDeploy(String username,String password,HttpServletRequest request) {
    	Map<String, Object> dataMap = new HashMap<String, Object>();
    	try {
    		List<Map<String, Object>> lists =  service.selectBySQL("select r.loginname,b.name bname,j.name jname from yonghubiao r left join bumenbiao b on r.departId=b.id left join jiaosebiao j on r.roleId=j.id where r.loginname = '" + username + "' and r.password = '" + password + "'"); 
    		if(lists != null && !lists.isEmpty()) {
    			HttpSession session=request.getSession();
    			Map<String, Object> map=lists.get(0);
    			session.setAttribute(SessionUtil.USEROBJECT, map);
    			session.setAttribute("username", map.get("loginname"));
    			session.setAttribute("jname", map.get("jname"));
    			session.setAttribute("bname",  map.get("bname"));
    			List<Map<String, Object>> plist=service.selectBySQL("select * from project");
    			
    			if(plist != null && plist.size()>0) {
    				Project project=new Project();
    				project.setId(((Integer)plist.get(0).get("id")+0l));
    				project.setModuleId((String)plist.get(0).get("module_id"));
    				project.setProjectEnName((String)plist.get(0).get("project_en_name"));
    				project.setProjectName((String)plist.get(0).get("project_name"));
        			SessionUtil.setProjectName(request, project);
    			}
    			if("true".equals(request.getParameter("allowedFlag"))){
    				dataMap.put("u_name",username);
    				dataMap.put("s_id",request.getSession().getId());
        			MySessionContext.AddSession(request.getSession());
        		}
    			dataMap.put("success",true);
    			return dataMap;
    			
    
    		} else  {
    			dataMap.put("success",false);
    		}
    		
    	} catch (Exception ex) {
    		dataMap.put("success", false);
    		ex.printStackTrace();
    	}
    	return dataMap;
    }
    @RequestMapping("loginOut")
    public String loginOut(HttpServletRequest request) {
    	HttpSession session = request.getSession();
    	//清除session
    	session.invalidate();
		return "publish/project1/login";
    }

   
}