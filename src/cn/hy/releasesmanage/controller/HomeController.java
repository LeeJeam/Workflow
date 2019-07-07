package cn.hy.releasesmanage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.hy.common.controller.BaseController;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.functionmenumanage.vo.MapToTreeUtil;

/**
 * 新项目首页进入地址
 * @author lijianbin
 *
 * 2016年1月30日
 */
@Controller
@Scope("prototype")
@RequestMapping("home/")
public class HomeController extends BaseController {

	protected static final Logger log=Logger.getLogger(HomeController.class);
	@Resource(name = "createTableService")
	private ICreateTableService service;
	
	/**
	 * 新项目首页地址
	 * @return 返回树型集合
	 */
	@RequestMapping(INDEX)
	public ModelAndView index(HttpServletRequest request){
		ModelAndView mav=new ModelAndView();
		if("true".equals(request.getParameter("allowedFlag"))){
			request.setAttribute("u_name", request.getParameter("u_name"));
			request.setAttribute("s_id", request.getParameter("s_id"));
		}
		mav.setViewName("releasesmanage/templet/home");
		
		return mav;
	}
	
	/**
	 * 用递归获得菜单树
	 */
	private void getChildrenIDtoin(Map map2,List<Map<String, Object>> commlist){
		List<Map<String, Object>> clist=service.selectBySQL("select * from left_menu where pid="+map2.get("id"));
		if(clist!=null&&clist.size()>0)
		{
			for(Map map:clist)
			{
				commlist.add(map);
				getChildrenIDtoin( map, commlist);
			}
			map2.put("dtype", "folder");
		}else{
			map2.put("dtype", "file");
		}
	}
	
	/**
	 * 得到菜单数据
	 * @return
	 */
	@RequestMapping("findMenuName")
	@ResponseBody
	public List<Map<String, Object>> findDataConfigByType() {
		List<Map<String, Object>> clist=new ArrayList<Map<String, Object>>();
		
		try {
			List<Map<String, Object>> parendList=service.selectBySQL("select * from left_menu where ISNULL(pid)");
			if(parendList!=null&&parendList.size()>0){
				for(Map map:parendList){
					clist.add(map);
					getChildrenIDtoin( map, clist);
				}
			}
			return clist;
		}catch(Exception e){
			e.printStackTrace();
			return clist;
		}
	} 
}
