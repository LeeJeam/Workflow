package cn.hy.functionpagemanage.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.hy.common.utils.SessionUtil;
import cn.hy.projectmanage.pojo.Project;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.hy.basemanage.service.ICreateTebleUserService;
import cn.hy.common.controller.BaseController;
import cn.hy.common.utils.Base64Util;
import cn.hy.common.utils.PinYinUtil;

/**
 * 功能页面控制类
 * @author lijianbin
 *
 * 2016年6月6日
 */
@Controller
@Scope("prototype")
@RequestMapping("createDataTable/")
public class CreateDataTableController extends BaseController {

	protected static final Logger log = Logger
			.getLogger(CreateDataTableController.class);
	@Resource(name = "createTebleUserService")
	private ICreateTebleUserService service;

	@RequestMapping("tableFlow")
	public String tableFlow() {
		return "functionpagemanage/table-flow";
	}

	@RequestMapping(INDEX)
	 /*ptid：关联的数据库表id，页面记录id pid*/
	public ModelAndView index(HttpServletRequest request,Integer ptid,Integer pid) throws UnsupportedEncodingException {
		cn.hy.projectmanage.pojo.Project project = cn.hy.common.utils.SessionUtil
				.getProjectName(request);
		long projectid = project.getId();
		List<Map<String, Object>> list = getTableStructure( ptid, projectid);
		ModelAndView view = new ModelAndView();
		if(list != null && !list.isEmpty()) {
			view.addObject("tableType",list.get(0).get("tableType"));
		}

		view.addObject("columns", list);
		String title="";
		if(list.size()!=0){
			title=list.get(0).get("table_alias").toString();
			view.addObject("tableId",ptid);
		}
		List<Map<String, Object>> pages =selectAllPages();
		String etableName=PinYinUtil.chineseToPinYin(title);
		
		String pageName="";//页面名字
		Long tableId = null;
		String sql="SELECT sys_function.* FROM sys_function WHERE sys_function.id ="+pid;
		List<Map<String, Object>> pageNames= service.selectMapBySQL(sql);
		if(pageNames.size()!=0){
			pageName=pageNames.get(0).get("file_name").toString();
		}
		String type = String.valueOf(pageNames.get(0).get("type") != null ? pageNames.get(0).get("type") : "1");
		//查询出所有表
		List<Map<String,Object>> allTables = service.selectMapBySQL("select e.id,e.table_alias,e.table_name,e.tableType from project_table e where e.project_id = " + projectid);

		view.addObject("allTables",allTables);
		view.addObject("etableName",etableName );
		view.addObject("pages",pages);
		view.addObject("type","create" );
		view.addObject("tableName",title );
		view.addObject("pageName",pageName);
		view.addObject("pid", pid);
		view.addObject("projectId",projectid);
		view.addObject("flag","functionPage");
		if("4".equals(type)) { //树形表格
			view.setViewName("functionpagemanage/table-tree-flow");
		} else  {
			view.setViewName("functionpagemanage/table-flow");
		}

		return view;
	}

	@RequestMapping("/getTablesColumnsData")
	@ResponseBody
	public Map<String,Object> getTablesColumnsData(HttpServletRequest request,Integer tableId) throws Exception {
		Map<String,Object> dataResult = new HashMap<String,Object>();
		try {
			Project project = SessionUtil.getProjectName(request);
			List<Map<String, Object>> list = getTableStructure(tableId, project.getId());
			dataResult.put("success",true);
			dataResult.put("rows",list);
		} catch (Exception ex) {
			dataResult.put("success",false);
			ex.printStackTrace();
		}
		return dataResult;
	}


	@RequestMapping("/getColumnsToTableName")
	@ResponseBody
	public Map<String,Object> getColumnsToTableName(HttpServletRequest request,String tablename) throws Exception {
		Map<String,Object> dataResult = new HashMap<String,Object>();
		try {
			Project project = SessionUtil.getProjectName(request);
			List<Map<String, Object>> list = getTableStructureToTableName(tablename, project.getId());
			dataResult.put("success",true);
			dataResult.put("rows",list);
		} catch (Exception ex) {
			dataResult.put("success",false);
			ex.printStackTrace();
		}
		return dataResult;
	}

	/***
	 * 获取项目下所有表
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getTables")
	@ResponseBody
	public Map<String,Object> getTables(HttpServletRequest request) throws Exception {
		Map<String,Object> dataResult = new HashMap<String,Object>();
		try {
			String tableType = request.getParameter("tableType");
			String customerType = request.getParameter("customerType");
			String tablename = request.getParameter("tablename");
			Project project = SessionUtil.getProjectName(request);
			StringBuffer sql = new StringBuffer("select e.id,e.table_alias,e.table_name from project_table e where  1=1 ");

			if(StringUtils.isNotEmpty(tablename) && StringUtils.isNotBlank(tablename)) {
				sql.append(" and (table_name like '%"+PinYinUtil.chineseToPinYin(tablename)+"%' or table_alias like '%"+tablename+"%')");
			}
			if (StringUtils.isNotEmpty(tableType) && StringUtils.isNotBlank(tableType)) {
				sql.append(" and tableType = '" +tableType +"'");
			}
			if(StringUtils.isNotEmpty(customerType) && StringUtils.isNotBlank(customerType)) {
				sql.append(" and customerType = '" +customerType+ "'");
			}
			sql.append(" and e.project_id = " + project.getId());

			List<Map<String,Object>> allTables = service.selectMapBySQL(sql.toString());
			dataResult.put("success",true);
			dataResult.put("rows",allTables);
		} catch (Exception ex) {
			dataResult.put("success",false);
			ex.printStackTrace();
		}
		return dataResult;
	}


	/***
	 * 获取表中select的值
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getSelectValues")
	@ResponseBody
	public Map<String,Object> getSelectValues(String table,String column) throws Exception {
		Map<String,Object> dataResult = new HashMap<String,Object>();
		try {
			if(StringUtils.isNotEmpty(column) && StringUtils.isNotBlank(column)
					&& StringUtils.isNotEmpty(table) && StringUtils.isNotBlank(table)) {
				List<Map<String,Object>> allTables = service.selectMapBySQL("select e.id,e."+column+" text from "+table+" e ");
				dataResult.put("success",true);
				dataResult.put("rows",allTables);
			}
		} catch (Exception ex) {
			dataResult.put("success",false);
			ex.printStackTrace();
		}
		return dataResult;
	}

	@RequestMapping(TOEDIT)
	 /*页面记录id pid*/
	public ModelAndView toEdit(HttpServletRequest request,Integer pid) throws UnsupportedEncodingException {
		cn.hy.projectmanage.pojo.Project project = cn.hy.common.utils.SessionUtil
				.getProjectName(request);
		ModelAndView view = new ModelAndView();
		long projectid = project.getId();
		String sql="SELECT sys_function.* FROM sys_function WHERE sys_function.id ="+pid;
		List<Map<String, Object>> pages= service.selectMapBySQL(sql);
		Map<String, Object> page=new HashMap<String, Object>();
		String title="";
		if(pages.size()!=0){
			page=pages.get(0);
			List<Map<String, Object>> list = getTableStructure( Integer.parseInt(page.get("project_table_id").toString()) , projectid);
			if(list != null && !list.isEmpty()) {
				view.addObject("tableType",list.get(0).get("tableType"));
			}
			view.addObject("columns", list);
			if(list.size()!=0){
				title=list.get(0).get("table_alias").toString();
				view.addObject("tableId",Integer.parseInt(page.get("project_table_id").toString()));
			}
			
			Object c=page.get("content");
			String content="";
			if(c!=null){
				content=Base64Util.getFromBase64(c.toString());
			}
			page.put("content", content);
		}
		List<Map<String, Object>> ps =selectAllPages();
		String etableName=PinYinUtil.chineseToPinYin(title);

		String type = String.valueOf(pages.get(0).get("type") != null ? pages.get(0).get("type") : "1");

		//查询出所有表
		List<Map<String,Object>> allTables = service.selectMapBySQL("select e.id,e.table_alias,e.table_name,e.tableType from project_table e where e.project_id = " + projectid);

		view.addObject("allTables",allTables);
		view.addObject("showLeft",request.getParameter("showLeft"));
		view.addObject("etableName",etableName );
		view.addObject("pages",ps);
		view.addObject("type","edit" );
		view.addObject("tableName",title );
		view.addObject("content",page.get("content").toString());
		view.addObject("pid", pid);
		view.addObject("projectId",projectid);
		view.addObject("flag","functionPage");
		if("4".equals(type)) { //树形表格
			view.addObject("pageType","4");
			view.setViewName("functionpagemanage/table-tree-flow");
		} else  {
			view.setViewName("functionpagemanage/table-flow");
		}
		return view;
	}
	
	

	@RequestMapping(EDIT)
	@ResponseBody
	public Map<String, Object> edit(Integer pid, String content,String publishContent)
			throws UnsupportedEncodingException {
		String s = Base64Util.getBase64(content);
		String publish = Base64Util.getBase64(publishContent);
		String sql="update sys_function set  sys_function.content='"+s+"',sys_function.publish_content ='"+publish+"' WHERE  sys_function.id="+pid;
		service.updateBySQL(sql);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", 1);
		return map;
	}

	@RequestMapping("preview")
	public ModelAndView preview(HttpServletRequest request,
			HttpServletResponse response, Integer pid)
			throws IOException {
		ModelAndView view = new ModelAndView();
		String sql = "SELECT sys_function.* FROM sys_function WHERE sys_function.id= "
				+pid+ "";
		List<Map<String, Object>> lsit = service.selectMapBySQL(sql);
		Map<String, Object> data = lsit.get(lsit.size() - 1);
		Object  content=data.get("content");
		if(content!=null){
			data.put("content", Base64Util.getFromBase64(content.toString()));
		}
		view.addObject("data", data);
		view.addObject("isPreview",request.getParameter("isPreivew"));
		view.setViewName("releasesmanage/table-view");
		return view;
	}


	@RequestMapping("getTreeData")
	@ResponseBody
	public List<Map<String,Object>> getTreeData(String tablename,String columns,String where) {
		String sql = "select "+columns+",pid pId,id from " + tablename;
		if(StringUtils.isNotEmpty(where) && StringUtils.isNotBlank(where)) {
			sql += "where " + where;
		}
		System.out.println(sql);
		return service.selectBySQL(sql);
	}



	@RequestMapping("updatePageRelationTable")
	public void updatePageRelationTable(Long tableId,Long pid) {
		String sql = "update sys_function n set n.project_table_id = '"+tableId+"' where n.id =" + pid;
		service.updateBySQL(sql);
	}
	
	
	
	
	
	/*ptid：关联的数据库表id，projectid:项目id*/
	private List<Map<String, Object>> getTableStructure(Integer ptid,long projectid){
		String sql = "SELECT structure_table.*,project_table.table_alias,project_table.tableType FROM structure_table "
				+ "LEFT JOIN project_table ON structure_table.project_table_id = project_table.id "
				+ "LEFT JOIN project ON project_table.project_id = project.id "
				+ "WHERE project.id = "+projectid+" AND structure_table.project_table_id = "+ptid+"" ;
		List<Map<String, Object>> list = service.selectMapBySQL(sql);
		return list;
	}


	/*ptid：关联的数据库表id，projectid:项目id*/
	private List<Map<String, Object>> getTableStructureToTableName(String tableName,long projectid){
		String sql = "SELECT structure_table.*,project_table.table_alias,project_table.tableType FROM structure_table "
				+ "LEFT JOIN project_table ON structure_table.project_table_id = project_table.id "
				+ "LEFT JOIN project ON project_table.project_id = project.id "
				+ "WHERE project.id = "+projectid+" AND structure_table.table_name = '"+tableName+"'" ;
		List<Map<String, Object>> list = service.selectMapBySQL(sql);
		return list;
	}

	/*查询所有页面记录*/
	private List<Map<String, Object>> selectAllPages(){
		String sql = " SELECT sys_function.* FROM sys_function " ;
		List<Map<String, Object>> list = service.selectMapBySQL(sql);
		return list;
	}


	
	
}
