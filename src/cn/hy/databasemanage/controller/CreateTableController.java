package cn.hy.databasemanage.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;

import cn.hy.common.controller.BaseController;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.databasemanage.vo.TableFiled;
/**
 * 创建数据库
 * @author lijianbin
 *
 *         2016年1月12日
 */
@Controller
@Scope("prototype")
@RequestMapping("createTable/")
public class CreateTableController extends BaseController {

	protected static final Logger log=Logger.getLogger(CreateTableController.class);
	@Resource(name = "createTableService")
	private ICreateTableService service;
	
	@RequestMapping("tableCreate")
	@ResponseBody
	public JsonMessage createTable(HttpServletRequest request){
		try {
			String tableName=request.getParameter("tableName");
			String columns=request.getParameter("columns");
			List<TableFiled> tableFileds=JSONArray.parseArray(columns, TableFiled.class);
			return service.insertTable(tableName, tableFileds);
		} catch (Exception e) {
			log.error("系统异常", e);
			return new JsonMessage(false, "创建表失败");
		}
		
	}
	@RequestMapping("findTableComment")
	@ResponseBody
	public List<Map<String, Object>> findTableComment(String tableName) {
		return service.findTableComment(tableName);
	}
	
	@RequestMapping("selectSQLAndCreateTable")
	@ResponseBody
	public JsonMessage selectSQLAndCreateTable(Long projectId) {
		if(projectId==null){
			return new JsonMessage(false, "参数为空");
		}
		service.createDB(projectId,null,null);
		return new JsonMessage(true, "成功");
	}
	
	
}
