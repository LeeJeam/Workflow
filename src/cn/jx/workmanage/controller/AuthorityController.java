package cn.jx.workmanage.controller;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import cn.hy.common.utils.PropertiesUtils;
import cn.hy.common.utils.UrlUtil;

/**
 * 权限控制类
 * @author lijainbin
 *
 * 2016年9月13日
 */
@Controller
@Scope("prototype")
@RequestMapping("authority/")
public class AuthorityController {

	private final static Logger log= Logger.getLogger(AuthorityController.class);
	
	//是否是超级管理员
	private final static String IS_SUPER_ADMIN= "is_super_admin";
	//权限菜单名称
	private final static String AUTHORITY_URL= "authority_url";
	//登录日记主键
	private final static String LOGIN_LOG_ID="login_log_id";
	//查询范围区域主键
	public static final String SEARCH_SCOPE_EN = "searchScopeEn";
	
	/**
     * 是否是超级管理员
     * @param request
	 * @return 
     * @return
     */
    @RequestMapping("isSuperAdmin")
    @ResponseBody
	public Boolean isSuperAdmin(HttpServletRequest request) {
    	try {
			HttpSession session=request.getSession();
			Object o=session.getAttribute(IS_SUPER_ADMIN);
			if(null==o){//未请求过
				Object si=session.getAttribute(LOGIN_LOG_ID);
				if(null!=si){
					String url=PropertiesUtils.init("hsyweb_isSuper_admin_url");
					String result=UrlUtil.getJsonString(url+si.toString());
					if("true".equals(result)){//是超级管理员
						//存入session
						session.setAttribute(IS_SUPER_ADMIN, true);
						return true;
					}else{
						//存入session
						session.setAttribute(IS_SUPER_ADMIN, false);
						return false;
					}
				}
			}else{
				return Boolean.valueOf(o.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return false;
    }
    
    
    /**
     * 是否是超级管理员
     * @param request
	 * @return 
     * @return
     */
    @RequestMapping("searchScope")
    @ResponseBody
	public String searchScope(HttpServletRequest request) {
    	try {
			HttpSession session=request.getSession();
			Object o=session.getAttribute(SEARCH_SCOPE_EN);
			if(null==o){//未请求过
				Object si=session.getAttribute(LOGIN_LOG_ID);
				if(null!=si){
					String url=PropertiesUtils.init("hsyweb_searchScope_url");
					String result=UrlUtil.getJsonString(url+si.toString());
					if(StringUtils.isNotBlank(result)){//是超级管理员
						//存入session
						session.setAttribute(SEARCH_SCOPE_EN, result);
						return result;
					}else{
						//存入session
						session.setAttribute(SEARCH_SCOPE_EN, "");
						return null;
					}
				}
			}else{
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return null;
    }
    
    /**
     * 获取权限菜单列表集合
     * @param request
	 * @return 
     * @return
     */
    @SuppressWarnings("rawtypes")
	@RequestMapping("getAuthorityUrl")
    @ResponseBody
	public List getAuthorityUrl(HttpServletRequest request) {
    	try {
			HttpSession session=request.getSession();
			Object o=session.getAttribute(AUTHORITY_URL);
			if(null==o){//未请求过
				Object si=session.getAttribute(LOGIN_LOG_ID);
				if(null!=si){
					String url=PropertiesUtils.init("hsyweb_authority_url");
					String result=UrlUtil.getJsonString(url+si.toString());
					if(StringUtils.isNotBlank(result)){
						//遍历集合
						JSONArray jsonArray = JSON.parseArray(result);
						if(!jsonArray.isEmpty()){
							List<String> list=new ArrayList<String>();
							for(Object object:jsonArray){
								//存入集合
								list.add(object.toString());
							}
							//存入session
							session.setAttribute(AUTHORITY_URL, list);
							return list;
						}
					}
				}
			}else{
				return (List) o;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return null;
    }
}
