package cn.hy.interceptor;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import cn.hy.common.controller.LoginController;
import cn.hy.common.utils.PropertiesUtils;
import cn.hy.common.utils.SessionUtil;
import cn.hy.common.utils.SpringUtil;
import cn.hy.common.utils.UrlUtil;


public class RequestURLInterceptor implements HandlerInterceptor {
	
	//登录日记主键
	private final static String LOGIN_LOG_ID="login_log_id";
	
	public RequestURLInterceptor() {
	}

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String url=request.getRequestURL().toString();  
		String allowedFlag=request.getParameter("allowedFlag");
		
		if("true".equals(allowedFlag)){
			String sid=request.getParameter("s_id");
			HttpSession s=MySessionContext.getSession(sid);
			if(url.contains("formOpration/runImportClassFun.htm")
			 ||url.contains("login/loginIn.htm")
			 ||url.contains("login/logout.htm")
			 ||url.contains("login/loginInAfterDeploy.htm") 
			 ||url.contains("login/loginOut.htm")
			 ||url.contains("home/index.htm")
			 ||url.contains("pageToPage/index.htm")){
				return true;
			}
			if(sid==null||"".equals(sid)||s==null||s.getAttribute(SessionUtil.USEROBJECT)==null){
				response.getWriter().print("loginout");;
				return false;
			}else{
				return true;
			}
		}
        if(request.getSession().getAttribute(SessionUtil.USEROBJECT)==null&&!url.contains("formOpration/runImportClassFun.htm")&&!url.contains("login/loginIn.htm")&&!url.contains("login/logout.htm")&&!url.contains("login/loginInAfterDeploy.htm") && !url.contains("login/loginOut.htm")){
        	String flag=cn.hy.common.utils.PropertiesUtils.init("isPublishFlag");
        	if("false".equals(flag)){
        		response.sendRedirect(request.getContextPath()+"/login.jsp");
        	}else{//发布后的项目
        		//如果是大区绩效系统则执行以下操作
        		String webName=PropertiesUtils.init("web_name");
        		//如果是大区绩效项目
        		if(request.getContextPath().matches("/"+webName)){
        			try {
        				//接口类不拦截
        				if(request.getRequestURI().substring(request.getContextPath().length()).split("/")[0].matches("api")){
        					return true;
        				}
    					//没有登录
    					HttpSession session=request.getSession();
    					//登录日记主键
    					String userlogid=(String) session.getAttribute(LOGIN_LOG_ID);
    					String si=request.getParameter("si");
    					//有带参数
    					if(org.apache.commons.lang3.StringUtils.isNotBlank(si)){
    						//有带参数:从大区绩效系统点击工作管理跳转进来的,可能由于会话过期失效,需要重新调用登录
    						if(!si.equals(userlogid)){//如果携带的参数与之前的不一样,会话失效或者登录用户已改变
    							LoginController loginController =(LoginController) SpringUtil.getBean("loginController");
    							String userName=getLoginUserName(si);
    							//成功调用
    							if(org.apache.commons.lang3.StringUtils.isNotBlank(userName)){
    								JSONObject jsonObject = getLoginUser(userName);
    								//清空session
    								session.invalidate();
    								//重新登录
    								Map<String, Object> map = loginController.loginInAfterDeploy(jsonObject.getString("username"), jsonObject.getString("password"), request);
    					    		if(Boolean.valueOf(map.get("success").toString())){//登录成功
    					    			return true; 
    					    		}
    							}
    						}
    					}
    				} catch (Exception e) {
    					e.printStackTrace();
    				}
        		}
        		
    			response.sendRedirect(request.getContextPath()+"/publish/project1/login.jsp");
				return false;
        	}
        	return false; 
        }  
		
		return true;
	}
	
	/**
	 * 获取登陆者账号
	 * @param si
	 * @return
	 */
	public String getLoginUserName(String si){
		try {
			//登录主键不为空
			if(org.apache.commons.lang3.StringUtils.isNotBlank(si)){
				//获取登录用户的账号密码
				String loginUrl=PropertiesUtils.init("user_server_url");
				loginUrl+=si;
				//接口调用登录日记
				String results=UrlUtil.getJsonString(loginUrl);
				if(StringUtils.isNotBlank(results)){
					JSONObject jsonObject = JSONObject.parseObject(results);
					//成功调用
					if(jsonObject.getBooleanValue("status")){
						return jsonObject.getString("message");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	/**
	 * 获取登陆者信息
	 * @param si
	 * @return
	 */
	public JSONObject getLoginUser(String userName){
		try {
			//账号不为空
			if(org.apache.commons.lang3.StringUtils.isNotBlank(userName)){
				//获取登录用户信息地址
				String loginUrl=PropertiesUtils.init("user_server_findList_url");
				loginUrl+="?username="+userName;
				//接口调用登录日记
				String result = UrlUtil.getJsonString(loginUrl);
				//成功调用
				if(org.apache.commons.lang3.StringUtils.isNotBlank(result)){
					JSONArray jsonArray = JSONObject.parseArray(result);
					JSONObject jsonObject= jsonArray.getJSONObject(0);
					//返回登录用户信息
					return jsonObject;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	
	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}
	
}