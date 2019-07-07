package cn.hy.releasesmanage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONArray;

import com.google.gwt.uibinder.elementparsers.HasTextParser;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.hy.basemanage.service.ICreateTebleUserService;
import cn.hy.commForm.pojo.Attachment;
import cn.hy.commForm.pojo.PublishAttachment;
import cn.hy.common.controller.BaseController;
import cn.hy.common.vo.JsonMessage;
import cn.hy.flowmanage.service.IManagerFlowService;

/**
 * 
 * 项目发布后的增删查改方法
 */
@Controller
@Scope("prototype")
@RequestMapping("button/")
public class ButtonController extends BaseController {

	protected static final Logger log = Logger
			.getLogger(ButtonController.class);
	@Resource(name = "createTebleUserService")
	private ICreateTebleUserService service;


	@Autowired
	private IManagerFlowService managerFlow;


//	@RequestMapping(TOADD)
//	/*url:页面链接*/
//	public ModelAndView toAdd(String url){
//		ModelAndView view = new ModelAndView();
//		view.setViewName(url);
//		return view;
//	}
//	
//	@RequestMapping(TOEDIT)
///*	@ResponseBody*/
//	/*data:json格式的数据（ url:页面路径;id：数据id;tableName:关联的数据表名称;form:）*/
//	public ModelAndView toEdit(String data){		
//		ModelAndView view = new ModelAndView();
//		JSONArray jsonArray=JSONArray.fromObject(data);
//		JSONObject json=jsonArray.getJSONObject(0);
//		Integer id=Integer.valueOf(json.get("id").toString());
//		String tableName=json.get("etableName").toString();
//		String pageName=json.get("pageName").toString();
//		String url=json.get("url").toString();
//		String sql="select * from  "+tableName+" where id="+id;
//		List<Map<String ,Object>> maps=service.selectMapBySQL(sql);
//		Map<String ,Object> map=new HashMap<String, Object>();
//		if(maps.size()!=0){
//			map=maps.get(0);
//		}
//		view.addObject("data",map);
//		view.addObject("pageName",pageName);
//		view.addObject("etableName",tableName);
//		view.addObject("id",map.get("id"));
//		view.setViewName(url);
//		return view;
//	}
//
//	@RequestMapping(ADD)
//	@ResponseBody
//	/*data:json格式的字符串，包含相应的数据库表明及相关数据；url:添加成功后的跳转链接*/
//	public Map<String, Object> add(String data)  {	
//		Map<String, Object> map = new HashMap<String, Object>();
//		try{
//			JSONObject json=JSONObject.fromObject(data);
//			Integer id=Integer.valueOf(json.get("id").toString());
//			String tableName=json.get("tableName").toString();
//			String form=json.get("form").toString();
//			
//			JSONObject formData=JSONObject.fromObject(form);
//			
//			String keys="";
//			String values="";
//			try {  
//	           
//	            Iterator it = formData.keys();  //循环读取表单数据
//	            while (it.hasNext()) {  
//	                String key = (String) it.next();  
//	                String value = formData.getString(key);  
//	                if(keys==""){
//	                	keys=key;
//	                	values=value;
//	                }else{
//	                	keys+=","+key;
//	                	values+=","+value;
//	                }
//	            }  
//	        } catch (JSONException e) {  
//	        	map.put("status", false);
//				map.put("error", e.toString());
//	        } 
//			
//			String sql="INSERT "+tableName+ "("+keys+") values( "+values+") where id="+id ;
//			service.insertBySQL(sql);
//			map.put("status", 1);
//		}catch (Exception e){
//			map.put("status", false);
//			map.put("error", e.toString());
//		}
//		
//		return map;
//	}
//
//	@RequestMapping(EDIT)
//	@ResponseBody
//	/*data:json格式的字符串，（包含相应的数据库表明及相关数据；url:添加成功后的跳转链接）*/
//	public Map<String, Object> edit(String data) {
//		Map<String, Object> map = new HashMap<String, Object>();
//		try{
//			JSONArray jsons=JSONArray.fromObject(data);
//			JSONObject json=jsons.getJSONObject(0);
//			Integer id=Integer.valueOf(json.get("id").toString());
//			String tableName=json.get("etableName").toString();
//			String form=json.get("formData").toString();
//			
//			JSONArray formDatas=JSONArray.fromObject(form);
//			JSONObject formData=formDatas.getJSONObject(0);
//			
//			String content="";
//			
//			try {  
//	           
//	            Iterator it = formData.keys();  //循环读取表单数据
//	            while (it.hasNext()) {  
//	                String key = (String) it.next();  
//	                String value = formData.getString(key);  
//	                	if(content==""){
//		                	content=key+"='"+value+"'";
//		                }else{
//		                	content+=","+key+"='"+value+"'";
//		                }
//	                
//	            }  
//	        } catch (JSONException e) {  
//	        	e.printStackTrace();
//	        	map.put("status", false);
//				map.put("error", e.toString());
//	        } 
//			
//			String sql="update "+tableName+ " set "+content+" where id="+id ;
//			service.updateBySQL(sql);
//			map.put("status", 1);
//		}catch (Exception e){
//		    e.printStackTrace();
//			map.put("status", false);
//			map.put("error", e.toString());
//		}
//		
//		return map;
//	}
	/**
	 * 表单添加附件
	 * @param request
	 */
	private void insertAttachment(HttpServletRequest request,Long businessId)
	{
		String atta = request.getParameter("attachments");
		List<PublishAttachment> attachments = JSONArray.parseArray(atta, PublishAttachment.class);
		
		if(attachments!=null && attachments.size()>0)
		{
			
			for(PublishAttachment pa:attachments)
			{
				StringBuffer sb=new StringBuffer();
				sb.append("INSERT INTO t_u_attachment(filename,type,filepath,filesize,selectorid,businessId,tableName) VALUES(");
				sb.append("\""+pa.getFilename()+"\",");
				sb.append("\""+pa.getType()+"\",");
				sb.append("\""+pa.getFilepath()+"\",");
				sb.append("\""+pa.getFilesize()+"\",");
				sb.append("\""+pa.getSelectorid()+"\",");
				sb.append(businessId+",");
				sb.append("\""+pa.getTableName()+"\");");
				System.out.println(sb.toString());
				service.updateBySQL(sb.toString());
			}
			
		}
	}


	@RequestMapping("saveLists")
	@ResponseBody
	public boolean saveLists(HttpServletRequest request) {

		String tablename = request.getParameter("tablename");
		if(StringUtils.isEmpty(tablename) || StringUtils.isEmpty(tablename)) {
			return false;
		}



		String delColumns = request.getParameter("delColumns");
		String delValues = request.getParameter("delValues");
		StringBuffer del  = new StringBuffer();

		String [] delColumn = delColumns.split(",");
		String [] delValue = delValues.split(",");
		if(delColumn.length > 0 && delValue.length >0) {
			del.append("delete  from "  + tablename + " where  1=1 ");
		}
		for(int i = 0;i<delValue.length;i++) {
			if(StringUtils.isNotEmpty(delValue[i]) && StringUtils.isNotBlank(delValue[i])) {
				del.append(" and ").append(delColumn[i]) .append("=").append("'").append(delValue[i]).append("'");
			}
		}
		if(del.length() > 0) {
			service.deleteBySQL(del.toString());
		}

		String columns = request.getParameter("columns");
		String values = request.getParameter("values");

		String value [] = values.split("~");

		StringBuffer sql = new StringBuffer();
		sql.append("insert into " + tablename + "("+columns+") values");

		for(int j = 0;j<value.length;j++) {
			String var23 [] = value[j].split("@");
			for(int i = 0;i<var23.length;i++) {
				if(i == 0) {
					sql.append("(");
				}
				if(i != 0) {
					sql.append(",");
				}
				sql.append("'").append(var23[i]).append("'");
			}
			if(j != (value.length -1)) {
				sql.append("),");
			}
		}

		sql.append(")");
		service.insertBySQL(sql.toString());
		return true;
	}

	@RequestMapping("updateOrSaves")
	@ResponseBody
	public boolean updateOrSaves(HttpServletRequest request){
		String tableName = request.getParameter("tableName");
		String values = request.getParameter("values");
		String columns = request.getParameter("columns");
		String ids = request.getParameter("ids");

		StringBuffer sql = new StringBuffer();

		if(StringUtils.isEmpty(values) || StringUtils.isBlank(values)) {
			return false;
		}
		if(StringUtils.isEmpty(columns) || StringUtils.isBlank(columns)) {
			return false;
		}
		if(StringUtils.isEmpty(tableName) || StringUtils.isEmpty(tableName)) {
			return false;
		}

		sql.append("update " + tableName + " set ");
		String [] column = columns.split(",");
		String [] value = values.split(",");
		for(int i = 0;i<column.length;i++) {
			sql.append(column[i]).append("=").append("'").append(value[i]).append("'");
			if(i != column.length -1) {
				sql.append(",");
			}
		}
		sql.append(" where id in ("+ids+")");

		service.updateBySQL(sql.toString());
		return true;
	}





		/**
         * 更新或者保存
         * @param request
         * @return
         */
	@RequestMapping("updateOrSave")
	@ResponseBody
	public JsonMessage updateOrSave(HttpServletRequest request){	
		try{
			
			Long dataId = null;
			Map<String,String[]> parammap = request.getParameterMap();
			if(!parammap.isEmpty()){
				String id=parammap.get("id")[0];
				String tableName=parammap.get("tableName")[0];
				List<String> keylist=new ArrayList<String>();
				List<String> valuelist=new ArrayList<String>();
				Set<String> set=parammap.keySet();
				for(String key:set){
					if(!("id".equals(key)
						||"tableName".equals(key)
						||"formName".equals(key)
						||"formType".equals(key)
						||"attachments".equals(key)
						||"".equals(key)
						||null==key
						||"allowedFlag".equals(key)
						||"s_id".equals(key)
						||"u_name".equals(key)
						||"c_port".equals(key))){
						keylist.add(key);
						String [] $array = parammap.get(key);
						if($array != null && $array.length > 1) {
							String $strs = "";
							for(int $i = 0;$i < $array.length ;$i++) {
								$strs += $array[$i];
								if($i != ($array.length-1)) {
									$strs += ",";
								}
							}
							valuelist.add($strs);
						} else {
							valuelist.add(parammap.get(key)[0]);
						}

					}
				}
				StringBuilder sb=new StringBuilder();
				if(StringUtils.isNotBlank(id)){//修改
					sb.append("UPDATE ").append(tableName).append(" SET ");
					int size=keylist.size();
					for(int i=0;i<size;i++){
						if(isEmpty(valuelist.get(i))) {
							if(i!=0){
								sb.append(",");
							}
							sb.append(keylist.get(i)).append("='").append(valuelist.get(i)).append("'");
						}
					}
					sb.append(" WHERE id=").append(id);
					service.updateBySQL(sb.toString());
					dataId = Long.parseLong(id);
				}else{//保存
					sb.append("INSERT INTO ").append(tableName).append("(");
					int size=keylist.size();
					//键--数据库字段名
					for(int i=0;i<size;i++){
						if(i!=0){
							sb.append(",");
						}
						sb.append(keylist.get(i));
					}
					sb.append(") VALUES(");
					//值--数据库值
					for(int i=0;i<size;i++){
						if(i!=0){
							sb.append(",");
						}

						if(isEmpty(valuelist.get(i))) {
							sb.append("'").append(valuelist.get(i)).append("'");
						} else {
							sb.append(null+"");
						}
					}
					sb.append(")");

					service.insertBySQL(sb.toString());
					dataId =  service.getLastInsertId();
				}
				insertAttachment(request,dataId);
			}
			String formName = request.getParameter("formName");
			String formType = request.getParameter("formType");
			/*if("5".equals(formType))
			{
				if(StringUtils.isNotEmpty(formName) && StringUtils.isNotBlank(formName))
				{
					String processkey = managerFlow.findProcessByFormName(formName);
					if(StringUtils.isNotEmpty(processkey) && StringUtils.isNotBlank(processkey))
					{
						ActivitiServiceImpl activitiService = new ActivitiServiceImpl();
						activitiService.startFlow(processkey,String.valueOf(dataId), null);// 启动流程
					}

				}
			}*/
			return new JsonMessage(true,dataId+"");
		}catch (Exception e){
			e.printStackTrace();
			return new JsonMessage(false,null);
		}
	}


	private boolean isEmpty(String value) {
		return StringUtils.isNotEmpty(value) && StringUtils.isNotBlank(value);
	}
	
	@RequestMapping(DELETE)
	@ResponseBody                                                                                                                                                                                                     
	public JsonMessage delete(Long id,String tableName){	
		try{
			String [] tables = tableName.split(",");
			for(String table :tables) {
				service.deleteBySQL("delete from "+table+" where id="+id);
			}
			return new JsonMessage(true,"删除成功");
		}catch (Exception e){
			e.getStackTrace();
			return new JsonMessage(false,"删除失败");
		}
	}

	@RequestMapping("getObjectLists")
	@ResponseBody
	/*id:类的id；eTableName：表名，英文*/
	public Map<String, Object> getObjectLists(HttpServletRequest request,String eTableName) {
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			if(StringUtils.isEmpty(eTableName) || StringUtils.isEmpty(eTableName)) {
				return null;
			}
			String var0  = request.getParameter("columns");
			String var1  = request.getParameter("values");
			String orderC = request.getParameter("orderC");

			String [] columns = var0 != null ? var0.split(",") : null;
			String [] values =  var1 != null ? var1.split(",") : null;
			if(columns != null && values != null && columns.length == values.length) {
				StringBuffer sql = new StringBuffer(" select *  from  "+eTableName+ "  where 1=1 ");
				for (int i = 0;i<columns.length;i++) {
					sql.append(" and " + columns[i] + " = '" +values[i]+ "'");
				}
				if(StringUtils.isNotEmpty(orderC) && StringUtils.isNotBlank(orderC)) {
					sql.append(" order by " + orderC);
				} else {
					sql.append(" order by id asc ");
				}

				List<Map<String, Object>> list= service.selectMapBySQL(sql.toString());
				map.put("obj", list);
			}
			map.put("status", 1);
		}catch (Exception e){
			map.put("status", false);
			map.put("error", e.toString());
		}

		return map;
	}


	@RequestMapping("getProjects")
	@ResponseBody
	public List<Map<String,Object>> getProjects(String q) {
		return service.selectBySQL("SELECT * FROM hys_project WHERE project_id LIKE '%"+q+"%' LIMIT 0,5");
	}



	@RequestMapping("getObject")
	@ResponseBody
	/*id:类的id；eTableName：表名，英文*/
	public Map<String, Object> edit(Integer id,String eTableName) {
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			
			String sql="select *  from  "+eTableName+ "  where id="+id ;
			List<Map<String, Object>> list= service.selectMapBySQL(sql);
			Map<String, Object> data=new HashMap<String, Object>();
			if(list.size()>0){
				data=list.get(0);
			}
			map.put("obj", data);
			map.put("status", 1);
		}catch (Exception e){
			map.put("status", false);
			map.put("error", e.toString());
		}
		
		return map;
	}


}
