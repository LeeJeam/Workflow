package cn.hy.databasemanage.controller;

import java.util.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import cn.hy.common.utils.SessionUtil;
import cn.hy.projectmanage.pojo.Project;
import cn.hy.releasesmanage.pojo.ViewRelationPojo;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONArray;

import cn.hy.common.controller.BaseController;
import cn.hy.common.utils.PinYinUtil;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.pojo.StructureTable;
import cn.hy.databasemanage.service.IStructureTableService;

/**
 * 表与项目结构
 * @author lijianbin
 *
 * 2016年1月25日
 */
@Controller
@Scope("prototype")
@RequestMapping("structureTable/")
public class StructureTableController extends BaseController {

	protected static final Logger log=Logger.getLogger(StructureTableController.class);
	@Resource(name = "structureTableService")
	private IStructureTableService service;

	@RequestMapping(value = "createTable")
	public String createTable() {
		return "databasemanage/dataBase";
	}
	@RequestMapping(value = "addDataBasefunjsp")
	public String addDataBasefunjsp() {
		return "databasemanage/dataBase-alert";
	}
	@RequestMapping("insertStructureTableList")
	@ResponseBody
	public JsonMessage insertStructureTableList(HttpServletRequest request){
		try {
			String tid=request.getParameter("tid");
			String columns=request.getParameter("columns");
			String updateTableName=request.getParameter("updateTableName");
			Long projectId=Long.valueOf(request.getParameter("projectId"));
			String tableName=request.getParameter("tableName");
			String remarks=request.getParameter("remarks");
			String tableType=request.getParameter("tableType");
			String customerType = request.getParameter("customerType");
			String is_default=request.getParameter("is_default");
			List<StructureTable> tables=JSONArray.parseArray(columns, StructureTable.class);
			if("yonghubiao".equals(tableName)){
			    Iterator table = tables.listIterator();
			       while (table.hasNext()) {
			    	   StructureTable tab = (StructureTable) table.next();
			           if ("username".equals(tab.getFiledName()) || "password".equals(tab.getFiledName())) {
			        	   table.remove();
			           }
			       }
			}
			return service.insertStructureTableList(tables,projectId,updateTableName,tableName,remarks,tid,tableType,is_default,customerType);
		} catch (Exception e) {
			log.error("系统异常", e);
			return new JsonMessage(false, "创建表失败");
		}
		
	}

	
	@RequestMapping("findTableByProjectName")
	@ResponseBody
	public List<Map<String, Object>> findTableByProjectName(Long projectId){
		try {
			if(projectId==null){
				log.info("查询条件为空");
				return null;
			}
			String sql="select * from project_table where project_id='"+projectId+"'";
			return service.selectBySQL(sql);
		} catch (Exception e) {
			log.error("系统异常", e);
			return null;
		}
		
	}
	
	@RequestMapping("findTableByProjectIdAndType")
	@ResponseBody
	public List<Map<String, Object>> findTableByProjectIdAndType(Long projectId,Integer type,HttpServletRequest request){
		try {
			if(projectId==null){
				log.info("查询条件为空");
				return null;
			}
			String ctId = request.getParameter("ctId");
			String tablename = request.getParameter("tablename");

			StringBuilder sb=new StringBuilder("select * from project_table where project_id='");
			sb.append(projectId).append("' ");
			if(null!=type&&0!=type){
				sb.append(" AND tableType='").append(type).append("' ");
			}
			if(StringUtils.isNotEmpty(tablename) && StringUtils.isNotBlank(tablename)) {
				sb.append(" and (table_name like '%"+PinYinUtil.chineseToPinYin(tablename)+"%' or table_alias like '%"+tablename+"%')");
			}

			if(StringUtils.isNotEmpty(ctId) && StringUtils.isNotBlank(ctId)) {
				sb.append(" and customerType = '"+ctId+"'");
			}
			sb.append(" ORDER BY table_create_time DESC");
			return service.selectBySQL(sb.toString());
		} catch (Exception e) {
			log.error("系统异常", e);
			return null;
		}
		
	}
	
	/**
	 * 按项目主键与表名查询表结构
	 * 返回集合页面
	 * @param projectId  项目主键
	 * @param tableName  表名
	 * @return
	 */
	@RequestMapping("findTableStructureByPnAndTn")
	public ModelAndView findTableStructureByPnAndTn(Long projectId, String tableName){
		ModelAndView mav=new ModelAndView();
		mav.setViewName("databasemanage/table-create-edit");
		try {
			if(projectId==null||StringUtils.isBlank(tableName)){
				log.info("查询条件为空");
				return null;
			}
			mav.addObject("data",service.findTableStructureByPnAndTn(projectId, tableName));
		} catch (Exception e) {
			log.error("系统异常", e);
			return null;
		}
		return mav;
	}

	@RequestMapping("findTableRelation")
	public ModelAndView findTableRelation(Long projectId, String tableName) {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("databasemanage/table-relation");

		String sql = "select e.id,e.table_alias,e.table_name,e.tableType from project_table e where e.project_id = " + projectId;
		List<Map<String,Object>> allTables = service.selectMapBySQL(sql);
		mav.addObject("allTables",allTables);
		mav.addObject("tableName",tableName);
		return mav;
	}
	
	/**
	 * 按项目主键与表名查询表结构
	 * 返回集合
	 * @param projectTableId  项目-表主键
	 * @param tableName  表名
	 * @return
	 */
	@RequestMapping("findTableByPId")
	@ResponseBody
	public List<Map<String, Object>> findTableByPId(Long projectTableId){
		try {
			if(projectTableId==null){
				log.info("查询条件为空");
				return null;
			}
			return service.findTableByPId(projectTableId);
		} catch (Exception e) {
			log.error("系统异常", e);
			return null;
		}
		
	}
	
	
	@RequestMapping("deleteTableDataBase")
	@ResponseBody
	public JsonMessage deleteTableDataBase(HttpServletRequest request,Long tid){
		try {
			service.deleteTableDataBase(tid);
			return new JsonMessage(true, "删除成功");
		} catch (Exception e) {
			log.error("系统异常", e);
			return new JsonMessage(false, "删除失败");
		}
		
	}
	
	/**
	 * 按项目主键与表名查询表结构
	 * 返回集合页面
	 * @param projectId  项目主键
	 * @param tableName  表名
	 * @return
	 */
	@RequestMapping("tableList")
	@ResponseBody
	public List pageformjsp(HttpServletRequest request,Long projectId){
		try {
			String sql="select * from project_table where project_id='"+projectId+"'";
			return service.selectBySQL(sql);
		} catch (Exception e) {
			log.error("系统异常", e);
			return null;
		}
	}
	/**
	 * 按项目主键与表名查询表结构
	 * 返回集合页面
	 * @param projectId  项目主键
	 * @param tableName  表名
	 * @return
	 */
	@RequestMapping("setPingYing")
	@ResponseBody
	public String setPingYing(HttpServletRequest request,String zn){
		try {
			if(zn!=null&&!"".equals(zn)){
				return PinYinUtil.chineseToPinYin(zn);
			}
			return "";
		} catch (Exception e) {
			log.error("系统异常", e);
			return "";
		}
	}
	
	@RequestMapping("findUniqueTable")
	@ResponseBody
	public List pageformjsp(HttpServletRequest request,Long projectId,String tablname){
		try {
			String sql="select * from project_table where project_id='"+projectId+"' and table_name='"+PinYinUtil.chineseToPinYin(tablname)+"'";
			return service.selectBySQL(sql);
		} catch (Exception e) {
			log.error("系统异常", e);
			return null;
		}
	}

	@RequestMapping("editInitViewData")
	@ResponseBody
	public Map<String,Object> editInitViewData(HttpServletRequest request,String tablename,Long projectTableId) {
		Project project = SessionUtil.getProjectName(request);
		long projectId = project.getId();
		tablename = PinYinUtil.chineseToPinYin(tablename);
		Map<String,Object> dataMap = new HashMap<String,Object>();
		List<Map<String,Object>> columns = service.findViewsColumns(projectTableId, tablename);
		List<Map<String,Object>> relations = service.findViewsRelations(projectId,projectTableId);

		dataMap.put("columns",columns);
		dataMap.put("relations",relations);
		return dataMap;
	}

	@RequestMapping("createOrUpdateIsViewColumns")
	@ResponseBody
	public JsonMessage createOrUpdateIsViewColumns(HttpServletRequest request,Long tableId) {

		cn.hy.projectmanage.pojo.Project project = cn.hy.common.utils.SessionUtil.getProjectName(request);
		long projectid = project.getId();

		String columns = request.getParameter("columns");
		String tableName = PinYinUtil.chineseToPinYin(request.getParameter("tablename"));
		String relations = request.getParameter("relations");
		String alias     = request.getParameter("selectColumnAlias");

		List<ViewRelationPojo> views = JSONArray.parseArray(relations,ViewRelationPojo.class);

		List<StructureTable> structureTables = new ArrayList<StructureTable>();
		if(StringUtils.isNotEmpty(columns) && StringUtils.isNotBlank(columns)
				&& StringUtils.isNotEmpty(alias) && StringUtils.isNotBlank(alias)) {
			String [] columnA = columns.split(",");
			String [] aliasC  = alias.split(",");
			for(int i = 0;i<columnA.length;i++) {
				StructureTable structureTable = new StructureTable();


				structureTable.setTableName(tableName);//表名
				structureTable.setFiledName(columnA[i]);//列名
				structureTable.setColumnAlias(aliasC[i]);//列别名
				structureTable.setProjectTableId(tableId);//关联的有名
				structureTable.setColumnSize(50);

				structureTables.add(structureTable);

			}
		}

		boolean success = service.createOrUpdateIsViewColumns(structureTables,tableId,tableName,projectid,views);
		return new JsonMessage(success,"");
	}
}
