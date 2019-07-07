package cn.hy.releasesmanage.controller;

import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.functionmenumanage.vo.MapToTreeUtil;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import cn.hy.common.controller.BaseController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

@Controller
@Scope("prototype")
@RequestMapping("pageToPage/")
public class PageToPageController extends BaseController {

	@Resource(name = "createTableService")
	private ICreateTableService service;

	@RequestMapping(INDEX)
	/*url:页面链接*/
	public ModelAndView index(String pagename,Integer menuId,String parentId,HttpServletRequest request){
		ModelAndView view = new ModelAndView();
		view.setViewName(pagename);
		if("true".equals(request.getParameter("allowedFlag"))){
			request.setAttribute("u_name", request.getParameter("u_name"));
			request.setAttribute("s_id", request.getParameter("s_id"));
		}
		if("undefined".equals(parentId)){
			parentId=null;
		}
		
		return view;
	}
	@RequestMapping("/toFlowCommPage")
	public ModelAndView toFlowCommPage(String processkey,String taskId,HttpServletRequest request){
		ModelAndView view = new ModelAndView();
		view.setViewName("releasesmanage/templet/flowOprationJSP");
		request.setAttribute("processkey", processkey);
		request.setAttribute("taskId", taskId);

		request.setAttribute("isView", request.getParameter("isView"));
		StringBuffer sql = new StringBuffer();
		sql.append("select f.NAME_ from act_hi_procinst t , act_re_procdef f where t.PROC_DEF_ID_ = f.ID_ and t.ID_ = '"+processkey+"'");
		List<Map<String,Object>> lists = service.selectBySQL(sql.toString());
		if(lists!= null && !lists.isEmpty()) {

			view.addObject("flowName",lists.get(0).get("NAME_"));
		}
		
		return view;
	}
}
