package cn.hy.jsmanage.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONArray;

import cn.hy.commForm.pojo.Attachment;
import cn.hy.commForm.service.IAttachmentService;
import cn.hy.common.controller.BaseController;
import cn.hy.common.utils.SessionUtil;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.projectmanage.pojo.Project;

/**
 * JS插件管理
 * @author lijianbin
 *
 * 2016年6月30日
 */
@Controller
@Scope("prototype")
@RequestMapping("js/")
public class JsController extends BaseController{

	protected static final Logger log=Logger.getLogger(JsController.class);
	@Resource(name = "createTableService")
	private ICreateTableService service;
	@Resource(name = "attachmentService")
	private IAttachmentService attachmentService;
	
	/**
	 * 按项目查询js库
	 * @param request
	 * @return
	 */
	@RequestMapping(SELECTALL)
	@ResponseBody
	public List<Map<String, Object>> selectall(HttpServletRequest request,String isPlugIn) {
		try {
			Project project=SessionUtil.getProjectName(request);
			if(null!=project){
				StringBuilder sb=new StringBuilder("SELECT a.id,a.filename,a.filepath,f.web_name FROM t_u_attachment a ")
				.append("LEFT JOIN sys_function f ON a.formid = f.id WHERE  a.projectId=")
				.append(project.getId());
				if("ture".equals(isPlugIn)){
					sb.append(" and ISNULL(a.formid)");
				}else{
					sb.append(" and a.type='js'");
				}
				return service.selectMapBySQL(sb.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 删除js
	 * @param request
	 * @return
	 */
	@RequestMapping(DELETE)
	@ResponseBody
	public JsonMessage delete(String id) {
		try {
			if(StringUtils.isNotBlank(id)){
				service.updateBySQL("DELETE FROM t_u_attachment WHERE id="+id);
				return new JsonMessage(true, "删除成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new JsonMessage(false, "删除失败");
	}
	
	/**
	 * 更新或者保存js库
	 * @param request
	 * @return
	 */
	@RequestMapping("saveOrUpdate")
	@ResponseBody
	public JsonMessage saveOrUpdate(HttpServletRequest request,Integer formid,String id) {
		try{
			Project project=SessionUtil.getProjectName(request);
			if(null==project){
				return new JsonMessage(false, "提交失败"); 
			}
			String atta = request.getParameter("attachments");
			List<Attachment> attachments = JSONArray.parseArray(atta, Attachment.class);
			if(StringUtils.isNotBlank(id)){//更新
				attachmentService.update(attachments,formid,Integer.valueOf(project.getId().toString()));
			}else{//插入
				attachmentService.insert(attachments,formid,Integer.valueOf(project.getId().toString()));
			}
			return new JsonMessage(true, "提交成功");
		}catch(Exception e){
			e.printStackTrace();
			return new JsonMessage(false, "提交失败");
		}
	}
	
	/**
	 * 查找js
	 * @param request
	 * @return
	 */
	@RequestMapping(SELECTONE)
	public ModelAndView selectone(HttpServletRequest request,String id) {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("jsmanage/jsmanage-edit");
		try {
			if(StringUtils.isNotBlank(id)){
				StringBuilder sb=new StringBuilder("SELECT a.id,a.filename,f.web_name,a.filepath,a.filesize FROM t_u_attachment AS a ")
				.append("LEFT JOIN sys_function  f ON a.formid =f.id WHERE a.id=").append(id);
				List<Map<String,Object>> list=service.selectMapBySQL(sb.toString());
			    if(null!=list&&!list.isEmpty()){
			    	mav.addObject("data", list.get(0));
			    }
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mav;
	}
}
