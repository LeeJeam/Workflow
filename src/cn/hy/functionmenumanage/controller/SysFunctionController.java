package cn.hy.functionmenumanage.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import cn.hy.common.utils.Base64Util;
import cn.hy.common.utils.GetHtmlContent;
import cn.hy.common.utils.JSPCreater;

import cn.hy.databasemanage.service.ICreateTableService;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gwt.http.client.Request;

import cn.hy.common.controller.BaseController;
import cn.hy.common.vo.JsonMessage;
import cn.hy.common.vo.Page;
import cn.hy.functionmenumanage.pojo.SysFunction;
import cn.hy.functionmenumanage.service.ISysFunctionService;
import cn.hy.functionmenumanage.vo.TreeNode;

/**
 * 项目功能
 * @author lijianbin
 *
 * 2016年1月25日
 */
@Controller
@Scope("prototype")
@RequestMapping("sysFunction/")
public class SysFunctionController extends BaseController {

	protected static final Logger log=Logger.getLogger(SysFunctionController.class);
	
	@Resource(name="sysFunctionService")
	private ISysFunctionService service;

	@Resource(name = "createTableService")
	private ICreateTableService createTableService;
	
	@RequestMapping(INDEX)
	public String createTable() {
		return "functionpagemanage/submenu-shop-system";
	}
	
	@RequestMapping("idx")
	public String idx() {
		return "functionpagemanage/submenu-shop-page";
	}
	
	@RequestMapping(ADD)
	@ResponseBody
	public JsonMessage add(SysFunction sysFunction) {
		try {
			return new JsonMessage(true,""+service.insertEntity(sysFunction,true));
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false,"保存失败");
		}
	}
	
	@RequestMapping("findByProjectId")
	@ResponseBody
	public List<Map<String,Object>> findByProjectId(String typeid,Long projectId,Long id,String ctId,HttpServletRequest request) {
		try {
			if(projectId==null){
				return null;
			}
			String webname = request.getParameter("webname");
			//List<Map<String, Object>> findByProjectIdAndId = service.findByProjectIdAndId(projectId, id,typeid,ctId);
			return service.findByProjectIdAndId(projectId, id,typeid,ctId,webname);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	//全部页面类型
	@RequestMapping("getPageType")
	@ResponseBody
	public List<Map<String, Object>> getPageType() {
		try {
			return service.selectBySQL("SELECT DISTINCT type FROM sys_function WHERE TYPE<>3 ");
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	
	/**
	 * 获得项目功能树
	 */
	@RequestMapping("findTreeNode")
	@ResponseBody
	public List<TreeNode> findTreeNode(Long projectId) {
		try {
			if(projectId==null){
				return new ArrayList<TreeNode>();
			}
			return service.findTreeNode(projectId);
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<TreeNode>();
		}
	}


	/***
	 * 查询所有的流程表单
	 */
	@RequestMapping("findFlowForms")
	@ResponseBody
	public List<TreeNode> findFlowForms(Long projectId) {
		try {
			if(projectId==null){
				return new ArrayList<TreeNode>();
			}
			return service.findFlowForms(projectId);
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<TreeNode>();
		}
	}

	
	/**
	 * 获得项目功能树
	 */
	@RequestMapping(UPDATE)
	@ResponseBody
	public JsonMessage update(Long id,String content,String modalName,String formProperties,HttpServletRequest request) {
		try {
			service.updateC(id,content, modalName,formProperties);
			service.updateTableContent(id,content);
			
			String flag=cn.hy.common.utils.PropertiesUtils.init("isPublishFlag");
			if("true".equals(flag)){
				cn.hy.projectmanage.pojo.Project project=cn.hy.common.utils.SessionUtil.getProjectName(request);
				Map<String, Object> item=service.findById(id);
				item.put("content", content);
				String filePathTempt=request.getSession().getServletContext().getRealPath("/");
				publishTOSysConfigJSP(item, project.getProjectName(), filePathTempt);


				String basePath =SysFunctionController.class.getClassLoader().getResource("").getPath();
				if(StringUtils.isNotEmpty(basePath) && StringUtils.isNotBlank(basePath)) {
					basePath = basePath.substring(0,basePath.indexOf(project.getProjectEnName()) + project.getProjectEnName().length());
				}
				System.out.println("basePath==>" + basePath);
				createTableService.copyFileToPublishProject(project.getId(), basePath + "\\formAtt\\", "");//重新生成js文件
			}
			
			
			return new JsonMessage(true,"");
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false,"保存失败");
		}
	}

	public void publishTOSysConfigJSP(Map<String, Object> item ,String projectName,String filePathTempt){
		String $content = item.get("publish_content") != null ? item.get("publish_content").toString() : item.get("content") != null ? item.get("content").toString() : null;
		String html = "";
		if(StringUtils.isNotEmpty($content) && StringUtils.isNotBlank($content)) {
			String content = $content;//Base64Util.getFromBase64($content);
			System.out.print(content);
			//if(!"1".equals(item.get("type") .toString()) && !"4".equals(item.get("type") .toString())) {
				content=content.replace("src=\"/"+projectName+"/","src=\""+"<%=rootPath %>"+"/");
				content+="<script type=\"text/javascript\" src=\"<%=rootPath %>/js/filecommon.js\"></script>";
				content+="<script src=\"<%=rootPath %>/js/file/jquery.uploadify.min.js\" type=\"text/javascript\"></script>";
				content+="<link rel=\"stylesheet\" href=\"<%=rootPath %>/js/file/uploadify.css\">";
			//}
			html = GetHtmlContent.getVMContent(content,item.get("templet_name").toString(),projectName);
			
		}else{
			if("3".equals(item.get("type"))){
				html = GetHtmlContent.getVMContent(null,item.get("templet_name").toString(),projectName);
			}
		}

		//page.setPagBody(content);

		File file = new File(filePathTempt);
		if (!file.exists()) {
			file.mkdirs();
		}
		String savePath = filePathTempt+"WEB-INF/views/" + item.get("file_name").toString()+".jsp";
		
		String ipt="";
		if("2".trim().equals(item.get("type") .toString())){
			 ipt="<input type=\"hidden\" id=\"iptid\" name=\'id\' value=\"<c:if test=\'${!empty id }\'>${id}</c:if> \">"
						+ "<input type=\"hidden\" id=\"iptEtableName\" name=\'etableName\' value=\"<c:if test=\'${!empty etableName }\'>${etableName}</c:if> \">"
						+"<input type=\"hidden\" id=\"iptPageName\" name=\'pageName\' value=\"<c:if test='${!empty pageName }'>${pageName}</c:if> \">";
		}
		Page page = new Page();
		page.setPagePath(savePath);
		try {
			JSPCreater.createJSP(page,html);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
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
			return new JsonMessage(true,"");
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false,"删除失败");
		}
	}
	/**
	 * 得到单个
	 */
	@RequestMapping(SELECTONE)
	@ResponseBody
	public Map<String, Object>  selectone(Long id) {
		try {
			List<Map<String, Object>> s = service.selectone(id);
			s.get(0).put("content",Base64Util.getFromBase64(String.valueOf(s.get(0).get("content") != null ? s.get(0).get("content") :"")));
			return s.get(0);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 获得项目功能树
	 */
	@RequestMapping("findFormTreeNode")
	@ResponseBody
	public List<TreeNode> findFormTreeNode(Long projectId,String type,String menuPath,String level,String customerType) {
		try {
			if(projectId==null){
				return new ArrayList<TreeNode>();
			}
			return service.findFromTreeNode(projectId,type,menuPath,level,customerType);
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<TreeNode>();
		}
	}
}
