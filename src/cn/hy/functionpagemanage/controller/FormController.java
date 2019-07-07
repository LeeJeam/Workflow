package cn.hy.functionpagemanage.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.hy.common.controller.BaseController;
import cn.hy.common.utils.Base64Util;
import cn.hy.functionmenumanage.service.ISysFunctionService;

/**
 * 自定义表单
 * @author lijianbin
 *
 * 2016年1月26日
 */
@Controller
@Scope("prototype")
@RequestMapping("form/")
public class FormController extends BaseController {

	protected static final Logger log = Logger.getLogger(FormController.class);
	
	@Resource(name="sysFunctionService")
	private ISysFunctionService service;
	
	@RequestMapping("submenu-shop-custom")
	public ModelAndView createTable(Long t) {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("functionpagemanage/submenu-shop-custom");
		try {
			if(t==null){
				return mav;
			}
			Map<String, Object> map=service.findById(t);
			mav.addObject("data", map);
			
			//查询指定项目下的数据字典
			List<Map<String, Object>> typeList=service.selectMapBySQL("select type from t_d_dataconfig where projectId="+map.get("project_id")+" GROUP BY type");
			mav.addObject("typeList", typeList);
			//查询指定项目下的表名
			List<Map<String, Object>> tableNameList=service.selectMapBySQL("select * from project_table where project_id="+map.get("project_id"));
			mav.addObject("tableNameList", tableNameList);
			List<Map<String, Object>> list=service.selectone(t);
			if(list!=null&&list.size()>0){
				mav.addObject("sys", list.get(0));
			}
			List<Map<String, Object>> tableName=service.selectMapBySQL("select * from project_table where id="+map.get("project_table_id"));
			if(tableName!=null&&tableName.size()>0){
				mav.addObject("tableName", tableName.get(0));
			}
			//查询指定表单下的js文件
			List<Map<String, Object>> js=service.selectMapBySQL("select * from t_u_attachment where formid="+t);
			mav.addObject("js", js);
			mav.addObject("flag","functionPage");
		} catch (Exception e) {
			e.getStackTrace();
		}
		return mav;
	}
	/**
	 * 通过表名ID查询表名下的所有字段
	 * @param id
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(GETDATA)
	@ResponseBody
	public List<Map<String, Object>> getData(Integer id)
			throws UnsupportedEncodingException {
		List<Map<String, Object>> list=service.selectMapBySQL("select * from structure_table where project_table_id="+id);
		return list;
	}
	@RequestMapping(SELECTONE)
	public ModelAndView selectOne(Long t) {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("releasesmanage/custom-table-view");
		try {
			if(t==null){
				return mav;
			}
			mav.addObject("data", service.findById(t));
		} catch (Exception e) {
			e.getStackTrace();
		}
		return mav;
	}
	@RequestMapping("seleteSysByPid")
	@ResponseBody
	public List<Map<String, Object>> seleteSysByPid(Integer pid,String flag)
			throws UnsupportedEncodingException {
		String sql="select * from project_table where project_id="+pid;
		if(flag!=null&&"6".equals(flag)){
			sql+="  and tableType=6";
		}
		//查询指定项目下的表名
		List<Map<String, Object>> tableNameList=service.selectMapBySQL(sql);
		
		return tableNameList;
	}
}
