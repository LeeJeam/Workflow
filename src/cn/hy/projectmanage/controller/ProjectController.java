package cn.hy.projectmanage.controller;

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

import cn.hy.common.controller.BaseController;
import cn.hy.common.utils.PinYinUtil;
import cn.hy.common.utils.SessionUtil;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.service.IStructureTableService;
import cn.hy.functionmenumanage.pojo.SysMenu;
import cn.hy.functionmenumanage.service.IMenuService;
import cn.hy.projectmanage.pojo.Project;
import cn.hy.projectmanage.service.IProjectModuleService;
import cn.hy.projectmanage.service.IProjectService;

/**
 * 项目管理
 * @author lijianbin
 *
 * 2016年1月22日
 */
@Controller
@Scope("prototype")
@RequestMapping("project/")
public class ProjectController extends BaseController {
	protected static final Logger log = Logger.getLogger(ProjectController.class);
	@Resource(name="projectService")
	private IProjectService projectService;
	@Resource(name="projectModuleService")
	private IProjectModuleService projectModuleService;
	@Resource(name = "structureTableService")
	private IStructureTableService service;
	@Resource(name="menuService")
	private IMenuService menuService;
	
	/**
	 * 增加一个项目
	 * @param request
	 * @param projectName  项目名称
	 * @return
	 */
	@RequestMapping(ADD)
	@ResponseBody
	public JsonMessage add(HttpServletRequest request,String projectName,String modulesId){
		if(StringUtils.isBlank(projectName)){
			return new JsonMessage(false, "项目名为空");
		}
		Project project=new Project();
		project.setProjectName(projectName);
		project.setProjectEnName(PinYinUtil.chineseToPinYin(projectName));
		if(StringUtils.isNoneEmpty(modulesId)){
			project.setModuleId(modulesId.substring(0, modulesId.length()-1));
		}
		//项目名是否已存在
		int count=projectService.selectCount(project);
		if(count>0){
			return new JsonMessage(false, "项目已存在");
		}
		//保存创建的项目数据
		int record=projectService.insert(project);
		if(record<=0){
			return new JsonMessage(false, "项目创建失败");
		}
		//将项目名放进SESSION
		SessionUtil.setProjectName(request, project);
		//创建功能表
		projectService.insertStructureTableList(Long.valueOf(project.getId()), "用户表", "用户信息表","1",true,1);
		projectService.insertStructureTableList(Long.valueOf(project.getId()), "角色表", "用户角色表","2",true,3);
		projectService.insertStructureTableList(Long.valueOf(project.getId()), "部门表", "部门表","3",true,2);
		if(StringUtils.isNoneEmpty(modulesId)){
			
		}
		return new JsonMessage(true, "成功");
	}
	
	@RequestMapping(SELECT)
	@ResponseBody
	public List<Map<String, Object>> select(){
		return projectService.selectMapBySQL("select project_name from project order by id desc");
		
	}
	@RequestMapping(SELECTALL)
	@ResponseBody
	public List<Map<String, Object>> selectAll(){
		return projectService.selectMapBySQL("select id,project_name,project_en_name from project order by id desc");
	}
	@RequestMapping(DELETE)
	@ResponseBody
	public JsonMessage delete(String id){
		  int  result=projectService.deleteByPrimaryKey(id);
		  if(result>0){
			  return new JsonMessage(true, "删除项目成功");
		  }else{
			  return new JsonMessage(false, "删除项目失败");
		  }
	}
	/**
	 * 将项目保存到session中去
	 * @param request
	 * @param projectName   工程名
	 * @return
	 */
	@RequestMapping("setSisson")
	@ResponseBody
	public JsonMessage setSisson(HttpServletRequest request,String projectName){
		if(StringUtils.isBlank(projectName)){
			return new JsonMessage(false,"项目名为空");
		}
		Project project=new Project();
		project.setProjectName(projectName);
		project=projectService.selectOne(project);
		SessionUtil.setProjectName(request, project);
		return new JsonMessage(true,"成功");
	}
	
	/**
	 * 将项目保存到session中去
	 * @param request
	 * @param projectName   工程名
	 * @return
	 */
	@RequestMapping("updateProject")
	@ResponseBody
	public JsonMessage updateProject(HttpServletRequest request,String projectName,String id){
		if(StringUtils.isBlank(projectName)){
			return new JsonMessage(false,"项目名为空");
		}
		Project project=new Project();
		project.setProjectName(projectName);
		project.setId(Long.valueOf(id));
		int result=projectService.updateAll(project);
		if(result>0){
			return new JsonMessage(true,"保存成功");
		}else{
			return new JsonMessage(true,"保存失败");	
		}
	}
	
	@RequestMapping("selectModule")
	@ResponseBody
	public List<Map<String, Object>> selectModule(){
		return projectModuleService.selectMapBySQL("select id,module_name from project_module");
	}
	
	
}
