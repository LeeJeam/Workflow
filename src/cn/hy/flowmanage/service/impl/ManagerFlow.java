package cn.hy.flowmanage.service.impl;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import cn.hy.common.utils.DateUtil;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ActivitiException;
import org.activiti.engine.HistoryService;
import org.activiti.engine.IdentityService;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.activiti.image.impl.DefaultProcessDiagramGenerator;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;

import cn.hy.common.utils.Base64Util;
import cn.hy.common.utils.PinYinUtil;
import cn.hy.common.utils.PropertiesUtils;
import cn.hy.common.utils.SessionUtil;
import cn.hy.common.utils.SystemPropertyUtil;
import cn.hy.common.vo.JsonMessage;
import cn.hy.flowmanage.pojo.ProcessEntity;
import cn.hy.flowmanage.pojo.ProcessNodeEntity;
import cn.hy.flowmanage.pojo.ProcessVariableEntity;
import cn.hy.flowmanage.pojo.TSType;
import cn.hy.flowmanage.service.IListenerService;
import cn.hy.flowmanage.service.IManagerFlowService;
import cn.hy.flowmanage.service.IProcessEntityService;
import cn.hy.flowmanage.service.IProcessNodeEntityService;
import cn.hy.flowmanage.service.IProcessVariableEntityService;
import cn.hy.flowmanage.service.ITypeService;
import cn.hy.functionmenumanage.service.ISysFunctionService;
import tk.mybatis.mapper.entity.Example;

/**
 * 创建流程： 1.新增流程 2.编辑流程 3.查看流程图 4.禁用/启用 5.删除流程 6.部署
 * 
 * @author nmc
 *
 */
@Service("managerFlow")
public class ManagerFlow implements IManagerFlowService {
	/*** activiti引擎服务 ***/
	protected static RepositoryService repositoryService;
	protected static TaskService taskService;
	protected static IdentityService identityService;
	protected static RuntimeService runtimeService;
	protected static HistoryService historyService;
	static {
		repositoryService = ProcessEngines.getDefaultProcessEngine().getRepositoryService();
		taskService = ProcessEngines.getDefaultProcessEngine().getTaskService();
		identityService = ProcessEngines.getDefaultProcessEngine().getIdentityService();
		runtimeService = ProcessEngines.getDefaultProcessEngine().getRuntimeService();
		historyService = ProcessEngines.getDefaultProcessEngine().getHistoryService();
	}
	@Resource(name = "processEntityService")
	private IProcessEntityService processEntityService;
	@Resource(name = "processNodeEntityService")
	private IProcessNodeEntityService processNodeEntityService;
	@Resource(name = "processVariableEntityService")
	private IProcessVariableEntityService processVariableEntityService;
	
	@Resource(name = "sysFunctionService")
	private ISysFunctionService sysFunctionService;
	@Resource(name = "listenerService")
	private IListenerService listenerService;
	
	@Resource(name = "typeService")
	private ITypeService typeService;
	
	private Statement getStatement() {
		/**
		 * 连接数据库
		 */
		Statement stmt = null;
		try {
			Properties properties = SystemPropertyUtil.loadProperties("config/dataSource.properties");
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection(properties.getProperty("jdbc_url"),
					properties.getProperty("jdbc_username"), properties.getProperty("jdbc_password"));
			stmt = con.createStatement();
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		return stmt;
	}

	/**
	 * 保存设计器设计的流程（未部署）
	 * @param request
	 * @param processDescriptor     流程XML数据
	 * @param nodes            流程节点数据
	 * @param processName      流程名称
	 * @param processkey       流程主键
	 * @param typeid           类型
	 * @param documentation    流程描述
	 * @param removeDate       要删除的节点数据
	 * @return
	 * @throws Exception
	 */
	@Override
	public boolean saveProcess(HttpServletRequest request, String processDescriptor, String nodes, String processName,
			String processkey, String typeid,String documentation, String removeDate, String formid) {
		// 将xml内容加密
		String processXml = Base64Util.getBase64(processDescriptor);
		// 查数据库是否已存在记录，存在则更新
		if (documentation == "" || documentation == null) {// 备注
			documentation = "无";
		}
		try {
			//查询是否是更新数据
			ProcessEntity pe = processEntityService.selectByPrimaryKey(processkey);
			// 保存流程
			if (pe != null) {// 更新
				pe.setProcessname(processName);
				pe.setProcessxml(processXml);
				pe.setTypeid(typeid);
				pe.setDocumentation(documentation);
				pe.setFormid("启动表单");
				pe.setPagename("qidongbiaodan");
				// 更新记录
				processEntityService.updateByPrimaryKey(pe);
			} else {// 插入
				pe = new ProcessEntity();
				pe.setId(processkey);
				pe.setProcessname(processName);
				pe.setProcessxml(processXml);
				pe.setTypeid(typeid);
				pe.setProjectid(String.valueOf(SessionUtil.getProjectName(request).getId()));
				pe.setDocumentation(documentation);
				pe.setProcessstate(0);
				pe.setForbiddenorusing(1);
				pe.setFormid("启动表单");
				pe.setPagename("qidongbiaodan");
				processEntityService.insert(pe);
			}
			Long project_id=SessionUtil.getProjectName(request).getId();
			// 是否已经往功能表插入了流程数据
			 String query = "select * from sys_function where type=3 and web_name in ('新建工作','待办工作','完结工作') and project_id="+project_id ;
			 List<Map<String, Object>> list = processEntityService.selectMapBySQL(query);
			if (list.size()==0) {// 未插入数据
				String Sql = "INSERT INTO sys_function ( web_name,project_id,type,url,file_name,templet_name) VALUES"
						+ "('新建工作', " + "'" + project_id+ "', '3', '/', 'xinjiangongzuo', 'processClient')" 
						+ " ,('待办工作', " + "'"+ project_id + "', '3', '/', 'daibangongzuo', 'runningFlow')"
						+ " ,('完结工作', " + "'" + project_id+ "', '3', '/', 'wanjiegongzuo', 'taskSelect')";
				//绩效系统使用
//				String Sql = "INSERT INTO sys_function ( web_name,project_id,type,url,file_name,templet_name) VALUES"
//						+ "('新建工作', " + "'" + project_id+ "', '3', '/', 'xinjiangongzuo', 'processClient')" 
//						+ "('我的工作', " + "'" + project_id+ "', '3', '/', 'wodegongzuo', 'endWord')" 
//						+ " ,('查询工作', " + "'"+ project_id + "', '3', '/', 'chaxungongzuo', 'workFlowViwe')";
				processEntityService.insertBySQL(Sql);
			}
			// 流程节点数据
			if (StringUtils.isNotBlank(nodes)) {
				List<HashMap> l=JSONArray.parseArray(nodes, HashMap.class);
				if(l!=null&&!l.isEmpty()){
					for(Map map:l){
						String tid = (String)map.get("id");
						String name = (String)map.get("nodeName");
						String formkey=(String)map.get("formkey");
						String msg=(String)map.get("msg");
						String sendcopyuser=(String)map.get("sendcopyuser");
						String signuser=(String)map.get("signuser");
						String tasksendcopyuser=(String)map.get("tasksendcopyuser");
						int isBursar=0;
						if(map.get("isBursar")!=null && !"".equals(map.get("isBursar"))){
							String bursar =(String.valueOf(map.get("isBursar"))).trim();
						    isBursar=Integer.valueOf(bursar);
						}
						String page=null;
						if(StringUtils.isNotBlank(formkey)){
							page=getPageName(request,formkey);
						}
						
						//查看节点是否已经存在,存在则更新,否则插入
						ProcessNodeEntity entity=processNodeEntityService.selectByPrimaryKey(tid);
						if(entity!=null){//更新节点
							entity.setProcessid(pe.getId());
							entity.setTaskname(name);
							entity.setFormid(formkey);
							entity.setPagename(page);
							entity.setIsBursar(isBursar);
							entity.setMsg(msg);
							entity.setSendcopyuser(sendcopyuser);
							entity.setSignuser(signuser);
							entity.setTasksendcopyuser(tasksendcopyuser);
							processNodeEntityService.updateByPrimaryKey(entity);
						}else{//插入新节点
							entity = new ProcessNodeEntity();
							entity.setProcessid(pe.getId());
							entity.setId(tid);
							entity.setTaskname(name);
							entity.setFormid(formkey);
							entity.setPagename(page);
							entity.setIsBursar(isBursar);
							entity.setMsg(msg);
							entity.setSendcopyuser(sendcopyuser);
							entity.setSignuser(signuser);
							entity.setTasksendcopyuser(tasksendcopyuser);
							processNodeEntityService.insert(entity);
						}
					
					}
				}
			}
			
			//移除节点数据
			if(StringUtils.isNotBlank(removeDate)){
				List<HashMap> jsonArray=JSONArray.parseArray(removeDate,HashMap.class);
				if(!jsonArray.isEmpty()){
					for(HashMap<String,Object> map:jsonArray){
						Object id=map.get("id");
						//删除节点数据
						processNodeEntityService.deleteByPrimaryKey(id);
						//删除节点表单变量数据
						Example example=new Example(ProcessVariableEntity.class);
						example.createCriteria().andEqualTo("procesnodeid", id);
						//执行删除语句
						processVariableEntityService.deleteByExample(example);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * 编辑流程
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@Override
	public String editFlow(HttpServletRequest request, HttpServletResponse response) {
		String str = "";
		try {
			Map<String, Object> variables = new HashMap<String, Object>();
			TaskQuery claimQuery = taskService.createTaskQuery().processDefinitionKey("leave")
					.taskCandidateUser("admin").active().orderByTaskId().desc().orderByTaskCreateTime().desc();
			List<Task> unsignedTasks = claimQuery.listPage(0, 1);
			taskService.complete(unsignedTasks.get(0).getId());// 与正在执行的认为管理相关的Service
			System.out.println("message 流程办理，流程ID：" + unsignedTasks.get(0).getId());
			str = "message 流程办理，流程ID：" + unsignedTasks.get(0).getId();
		} catch (ActivitiException e) {

		}
		return str;
	}

	/**
	 * 禁用/启用流程
	 * 
	 * @param processid
	 * @param type
	 * @return
	 * @throws Exception
	 */
	@Override
	public String ForbiddenOrUsing(String processid, String type) throws Exception {
		String msg = "";
		Statement stmt = getStatement();
		try {
			if (type.equals("1") || type.equals("已启用")) {// 已启用，要禁用
				int i = stmt.executeUpdate("UPDATE t_p_process SET forbiddenorusing=0 WHERE id ='" + processid + "'");
				if (i == 1) {
					msg = "流程已禁用！";
				} else {
					msg = "流程禁用失败！";
				}
			} else {// 已禁用，要启用
				int i = stmt.executeUpdate("UPDATE t_p_process SET forbiddenorusing=1 WHERE id ='" + processid + "'");
				if (i == 1) {
					msg = "流程已启用！";
				} else {
					msg = "流程启用失败！";
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			stmt.close();
		}
		return msg;
	}

	/**
	 * 查看流程图
	 * 
	 * @param processkey
	 * @param response
	 * @throws Exception
	 */
	@Override
	public void FlowImage(String piid, HttpServletResponse response) throws Exception {
		// ProcessDefinition processfinition =
		// repositoryService.createProcessDefinitionQuery().processDefinitionKey(processkey).singleResult();
		BpmnModel bpmnModel = repositoryService.getBpmnModel(piid);
		InputStream resourceAsStream = new DefaultProcessDiagramGenerator().generatePngDiagram(bpmnModel);
		// InputStream resourceAsStream =
		// repositoryService.getProcessDiagram(processfinition.getId());
		byte[] b = new byte[1024];
		int len = -1;
		while ((len = resourceAsStream.read(b, 0, 1024)) != -1) {
			response.getOutputStream().write(b, 0, len);
		}
	}

	/**
	 * 删除流程相关信息
	 * 
	 * @param processId   流程主键
	 * @return
	 */
	@Override
	public void deleteProcess(String processId) {
		//删除activity工作流程
		ProcessEntity processEntity=processEntityService.selectByPrimaryKey(processId);
		repositoryService.createDeploymentQuery().processDefinitionKey(processEntity.getId()).singleResult();
		
		//删除流程表
		processEntityService.deleteByPrimaryKey(processId);
		
		//删除流程节点表
		Example exampleNode=new Example(ProcessNodeEntity.class);
		exampleNode.createCriteria().andEqualTo("processid", processId);
		processNodeEntityService.deleteByExample(exampleNode);
		
		//删除流程节点表
		Example exampleVariable=new Example(ProcessVariableEntity.class);
		exampleVariable.createCriteria().andEqualTo("processid", processId);
		processNodeEntityService.deleteByExample(exampleVariable);
	}

	/**
	 * 部署全部启用的流程
	 */
	@Override
	public void deployFlows() {
		Statement stmt = getStatement();
		ResultSet rs = null;
		try {
			rs = stmt.executeQuery(
					"select id,processxml,processname from t_p_process where processstate=0 and forbiddenorusing = 1");
			while (!rs.isClosed() && rs.next()) {
				String processkey = rs.getString(1);
				String processxml = rs.getString(2);
				String processname = rs.getString(3);

				processxml = Base64Util.getFromBase64(processxml);// 解密
				InputStream in = new java.io.ByteArrayInputStream(processxml.getBytes("utf-8"));
				// 部署
				this.repositoryService.createDeployment().addInputStream(processkey + ".bpmn20.xml", in)
						.name(processname).deploy();

				execute("update t_p_process set processstate=1 where id='" + processkey + "'");
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				rs.close();
				stmt.close();
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		return;
	}

	public void execute(String sql) {
		Statement stmt = getStatement();
		try {
			stmt.execute(sql);
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				stmt.close();
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
	}

	/**
	 * 部署一个流程
	 * 
	 * @param processid
	 * @return
	 */
	@Override
	public boolean deployFlow(String processid) {
		Statement stmt = getStatement();
		Deployment deploy = null;
		try {
			ResultSet rs = stmt.executeQuery(
					"select id,processxml,processname from t_p_process where id='" + processid + "'");
			while (rs.next()) {
				String processkey = rs.getString(1);
				String processname = rs.getString(3);
				String processxml = rs.getString(2);
				processxml = Base64Util.getFromBase64(processxml);// 解密
				InputStream in = new java.io.ByteArrayInputStream(processxml.getBytes("utf-8"));
				// 部署
				deploy = this.repositoryService.createDeployment().addInputStream(processkey + ".bpmn20.xml", in)
						.name(processname).deploy();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * 删除流程
	 * 
	 * @param formName
	 * @return
	 */
	@Override
	public String findProcessByFormName(String formName) {
		Statement stmt = getStatement();
		try {
			ResultSet rs = stmt.executeQuery("SELECT id FROM t_p_process WHERE applyform='" + formName + "'");
			if (rs.next()) {
				String processkey = rs.getString(1);
				return processkey;
			}
		} catch (Exception e) {
			System.out.println(e);
		}
		return null;
	}

	/**
	 * 公共运行导入jar包的方法
	 * 
	 * @param tablename
	 * @return
	 */

	public String getListenerProperty(String taskid) {
		Statement stmt = getStatement();
		try {
			ResultSet rs = stmt.executeQuery("SELECT jarurl FROM t_s_listener WHERE taskid='" + taskid + "'");
			if (rs.next()) {
				String jarurl = rs.getString(1);
				return jarurl;
			}
		} catch (Exception e) {
			System.out.println(e);
		}
		return null;
	}
	
	
	public String getPageName(HttpServletRequest request,Object webname){
		 Long projectId=SessionUtil.getProjectName(request).getId();
		 List<Map<String, Object>> list = processEntityService.selectMapBySQL("SELECT file_name FROM sys_function WHERE project_id="+projectId+" AND web_name='"+webname+"'");
		 if(list!=null&&!list.isEmpty()){
			 Object o=list.get(0).get("file_name");
			 if(null!=o){
				 return o.toString();
			 }
		 }
		 return null;
	}
	
	public String index(HttpServletRequest request) {
		 try {
			 
			String flag=PropertiesUtils.init("isPublishFlag");
			String sql=null;
			if("true".equals(flag)){//发布后的项目
				sql="SELECT * FROM sys_inteface";
			}else{
				Object userId=SessionUtil.getLoginUser(request).get("u_id");
				Long projectId=SessionUtil.getProjectName(request).getId();
				sql="SELECT * FROM sys_inteface WHERE project_id="+projectId+" AND user_id="+userId;
			}
			
			List<Map<String, Object>> list = sysFunctionService.selectBySQL(sql);
		    if(list!=null&&!list.isEmpty()){
		    	Map<String,Object> map=list.get(0);
		    	request.setAttribute("userInteface", map.get("user_inteface"));
		    	request.setAttribute("groupInteface", map.get("group_inteface"));
		    	request.setAttribute("deptInteface", map.get("dept_inteface"));
		    }
		} catch (Exception e) {
			e.getStackTrace();
		}
		return "flowmanage/submenu-workflow";
	}
	public  String getPageList(HttpServletRequest request){
		Object userId=SessionUtil.getLoginUser(request).get("u_id");
		Long projectId=SessionUtil.getProjectName(request).getId();
		List<Map<String, Object>> list = sysFunctionService.selectBySQL("SELECT * FROM sys_pageinteface WHERE project_id="+projectId+" AND user_id="+userId);
		 if(list!=null&&!list.isEmpty()){
		    	Map<String,Object> map=list.get(0);
		    	request.setAttribute("pageInteface", map.get("page_inteface"));
		    }
		 return "flowmanage/taskProperties";
		
	}
	
	public JsonMessage delPro(String processId) {
		try {
			if(StringUtils.isNotBlank(processId)){//删除逐渐不为空
				deleteProcess(processId);
			}else{
				return new JsonMessage(false,"失败成功");
			}
		} catch (Exception e) {
			e.getStackTrace();
			return new JsonMessage(false,"失败成功");
		}
		return new JsonMessage(true,"删除成功");
	}
	
	public String processProperties(HttpServletRequest request, String turn, String checkbox, String processId,String id,String isMultiple,String isGrouple) {
		try {
			if(processId!=null && !"".equals(processId)){   //流程ID是否为空，为空默认ID=0
				request.setAttribute("processId", processId);
			}else{
				request.setAttribute("processId", 0);
			}
			ProcessEntity processEntity = processEntityService.selectByPrimaryKey(processId);
			if (processEntity != null) {   //判断流程模板对象是否为空
				request.setAttribute("processDefinitionId", processEntity.getId());
				request.setAttribute("typeId", processEntity.getTypeid());
			}
				request.setAttribute("isMultiple", isMultiple);
				request.setAttribute("isGrouple", isGrouple);
				request.setAttribute("checkbox", checkbox);
			    request.setAttribute("formid","启动表单");
		    List<Map<String,Object>> formdata=sysFunctionService.selectProcessForm(SessionUtil.getProjectName(request).getId());
		    if(formdata!=null && formdata.size()>0){    //查询表单集合数据
		    	request.setAttribute("formList",JSON.toJSONString(formdata));
		    }
		    if(id!=null && !"".equals(id)){   //节点ID是否为空
				request.setAttribute("data", processNodeEntityService.selectByPrimaryKey(id));
				request.setAttribute("id", id);
			}
			List<Map<String,Object>> proTypeList = typeService.selectBySQL("select * from t_s_type where projectId ="+SessionUtil.getProjectName(request).getId());
			if(proTypeList.size()>0){       //流程类型集合，为空默认新增普通类型记录
				request.setAttribute("proTypeList",proTypeList);
			}else{
			   StringBuffer insert = new StringBuffer();
               insert.append("insert into t_s_type(typecode,typename,createdate,projectId) values");
               insert.append("('").append(PinYinUtil.chineseToPinYin("普通类型")).append("','").append("普通类型").append("','").append(DateUtil.format(new Date(), "yyyy-MM-dd HH:mm:ss")).append("','").append(SessionUtil.getProjectName(request).getId()).append("')");
               typeService.insertBySQL(insert.toString());
   			   List<Map<String,Object>> typeList = typeService.selectBySQL("select * from t_s_type where projectId ="+SessionUtil.getProjectName(request).getId());
               request.setAttribute("proTypeList", typeList);
			}
			if(listenerService.selectAll().size()>0){  //监听器类型集合是否为空判断
				request.setAttribute("listenerList", listenerService.selectAll());
			}
		} catch (Exception e) {
			e.getStackTrace();
		}
		return "flowmanage/" + turn;
	}
   
}

