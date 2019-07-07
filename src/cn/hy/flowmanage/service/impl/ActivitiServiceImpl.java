package cn.hy.flowmanage.service.impl;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.FormService;
import org.activiti.engine.HistoryService;
import org.activiti.engine.IdentityService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.delegate.Expression;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.identity.User;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.persistence.entity.TaskEntity;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Comment;
import org.activiti.engine.task.Task;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import tk.mybatis.mapper.entity.Example;

import com.alibaba.fastjson.JSON;

import cn.hy.basemanage.service.IUserService;
import cn.hy.common.utils.AjaxJson;
import cn.hy.common.utils.PropertiesUtils;
import cn.hy.common.utils.SessionUtil;
import cn.hy.common.utils.SystemPropertyUtil;
import cn.hy.common.utils.activiti.ProcessDiagramGenerator;
import cn.hy.common.vo.JsonMessage;
import cn.hy.flowmanage.pojo.ProcessNodeEntity;
import cn.hy.flowmanage.pojo.ProcessVariableEntity;
import cn.hy.flowmanage.pojo.TSListener;
import cn.hy.flowmanage.service.IActivitiService;
import cn.hy.flowmanage.service.IListenerService;
import cn.hy.flowmanage.service.IProcessEntityService;
import cn.hy.flowmanage.service.IProcessNodeEntityService;
import cn.hy.flowmanage.service.IProcessVariableEntityService;
import cn.hy.functionmenumanage.service.ISysFunctionService;
import cn.hy.projectmanage.pojo.Project;
@Service("activitiService")
public class ActivitiServiceImpl implements IActivitiService {
	private static final Logger logger = Logger.getLogger(ActivitiServiceImpl.class);
	/***activiti引擎服务***/
	@Autowired
    protected RuntimeService runtimeService;
    @Resource(name = "listenerService")
    private IListenerService listenerService;
    @Autowired
    protected TaskService taskService;
    @Autowired
    protected RepositoryService repositoryService;
    @Autowired
    protected IdentityService identityService;
    @Resource
    private IUserService userService;
    @Autowired
    protected HistoryService historyService;
    @Autowired
    protected FormService formService;
	@Resource(name = "sysFunctionService")
	private ISysFunctionService sysFunctionService;
	@Resource(name = "processVariableEntityService")
	private IProcessVariableEntityService processVariableEntityService;
	@Resource(name = "processEntityService")
	private IProcessEntityService processEntityService;
	@Resource(name = "processNodeEntityService")
	private IProcessNodeEntityService processNodeEntityService;
	@Override
	public Deployment deployFlow(String resourceName, InputStream inputStream,
			String name) {
		return this.repositoryService.createDeployment()
				.addInputStream(resourceName + ".bpmn20.xml", inputStream)
				.name(name).deploy();
	}

	public ProcessInstance startFlow(
			String processDefinitionKey,String userId) {
		identityService.setAuthenticatedUserId(userId);
		return runtimeService.startProcessInstanceByKey(processDefinitionKey);
	}

	public String taskRunning(String processkey, String userId) {
		// TODO Auto-generated method stub
		return null;
	}

	public ProcessDefinition createProcessDefinitionQuery(String processkey) {
		return repositoryService.createProcessDefinitionQuery()
				.processDefinitionResourceName(processkey + ".bpmn20.xml")
				.singleResult();
	}

	public List<Task> toClaimList(ProcessDefinition pdf) {
		return taskService.createTaskQuery()
				.deploymentId(pdf.getDeploymentId()).active()
				.orderByTaskCreateTime().desc().list();
		
	}

	public List<HistoricTaskInstance> finishedlist(ProcessDefinition pdf) {
		return historyService.createHistoricTaskInstanceQuery()
				.deploymentId(pdf.getDeploymentId()).finished()
				.orderByTaskCreateTime().desc().list();
	}

	public ProcessInstance ProcessInstanceQuery(Task task) {
		// TODO Auto-generated method stub
		return null;
	}

	public HistoricProcessInstance createHistoricProcessInstanceQuery(
			HistoricTaskInstance historicTaskInstance) {
		return historyService
				// 关联实体
				.createHistoricProcessInstanceQuery()
				.processInstanceId(historicTaskInstance.getProcessInstanceId())
				.singleResult();
	}

	public ProcessDefinition GetProcessDefinition(
			HistoricProcessInstance historicProcessInstance) {
		// TODO Auto-generated method stub
		return null;
	}


	public ProcessInstance getPIByTaskId(String taskId) {
		Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
		return runtimeService.createProcessInstanceQuery().processInstanceId(task.getProcessInstanceId())
				.singleResult();
	}

	public boolean deleteProcess(String processId) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean deleteDeployment(Deployment deployment) {
		// TODO Auto-generated method stub
		return false;
	}

	public Deployment createDeploymentQuery(ProcessNodeEntity tpProcess) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<ProcessInstance> runningtask(String processkey) {
		return processInstanceList(processkey);

	}
	public List<Task> doingtask(String userId) {
			return TaskQueryList(userId);
	}

	public List<Task> getProcessInstanceId(String processInstanceId) {

		return taskService.createTaskQuery()
				.processInstanceId(processInstanceId).active()
				.orderByTaskCreateTime().desc().list();
	}

	public List<HistoricProcessInstance> finishProcessInstance(String processkey) {
		return getProcessInstance(processkey);
	}

	public List<ProcessInstance> processInstanceList(String processkey) {
		return runtimeService.createProcessInstanceQuery()
				.processDefinitionKey(processkey).active()
				.orderByProcessInstanceId().desc().list();
	}

	public void claimHandle(String taskId, String userId) {
		taskService.claim(taskId, userId);
	}

	@Override
	public Class<Object> getEntityDetail(Long id, String taskId) {
		// TODO Auto-generated method stub
		return null;
	}

	public void completeTask(String taskId,  Map<String, Object> variables) {
		taskService.complete(taskId, variables);

	}

	public ProcessDefinition getProcessDefinition(String processDefinitionId) {
		return repositoryService.createProcessDefinitionQuery()
				.processDefinitionId(processDefinitionId).singleResult();
	}

	/**
	 * 根据state字段修改是否挂起
	 */
	public void updateState(String state, String processInstanceId) {
		if (state.equals("active")) {
			runtimeService.activateProcessInstanceById(processInstanceId);
		} else if (state.equals("suspend")) {
			runtimeService.suspendProcessInstanceById(processInstanceId);
		}
	}

	/**
	 * 根据taskId查询流程变量
	 */
	public Map<String, Object> getProcessVariables(String taskId) {
		return taskService.getVariables(taskId);
	}

	/**
	 * 查询该用户下未办理的任务
	 */
	public List<Task> TaskQueryList(String userId) {
		List<Task> tasks = new ArrayList<Task>();
		List<Task> todoTask = taskService.createTaskQuery()
				.taskAssignee(userId).list();
		List<Task> unsignedTasks = taskService.createTaskQuery()
				.taskCandidateUser(userId)
				.list();
		List<Task> groupTasks = taskService.createTaskQuery()
				.taskCandidateGroup(userId)
				.list();
		tasks.addAll(todoTask);
		tasks.addAll(unsignedTasks);
		tasks.addAll(groupTasks);
		return tasks;
	}

	public List<HistoricProcessInstance> getProcessInstance(String processkey) {
		return historyService.createHistoricProcessInstanceQuery()
				.processDefinitionKey(processkey)
				.orderByProcessInstanceEndTime().desc().finished().list();
	}

	@Override
	public void setAuthenticatedUserId(String userId) {
		identityService.setAuthenticatedUserId(userId);
	}

	@Override
	public ProcessDefinition getProcessDefinition(Task task) {
		String processDefinitionId = task.getProcessDefinitionId();
		return getProcessDefinition(processDefinitionId);// 任务对应的流程
	}

	/**
	 * 查询流程定义对象
	 * 
	 * @param processDefinitionId
	 *            流程定义ID
	 * @return
	 */
	/**
	 * 查询实体关联
	 * 
	 * @param task
	 *            任务
	 * @return
	 */
	public String getBusinessKey(Task task) {
		// 查询流程实例
		ProcessInstance pi = runtimeService.createProcessInstanceQuery()
				.processInstanceId(task.getProcessInstanceId()).active()
				.singleResult();
		return pi.getBusinessKey();
	}

	public String getBusinessKey(HistoricProcessInstance historicProcessInstance) {
		return historicProcessInstance.getBusinessKey();// 关联实体的key
	}

	public String getTaskId(HistoricTaskInstance historicTaskInstance) {
		return historicTaskInstance.getId();
	}

	@Override
	public ProcessDefinition getProcessDefinition(
			HistoricTaskInstance historicTaskInstance) {
		HistoricProcessInstance hpi = historyService
				// 关联实体
				.createHistoricProcessInstanceQuery()
				.processInstanceId(historicTaskInstance.getProcessInstanceId())
				.singleResult();
		return getProcessDefinition(hpi.getProcessDefinitionId());
	}

	public List<Comment> getTaskComments(
			HistoricTaskInstance historicTaskInstance) {
		return taskService.getTaskComments(historicTaskInstance.getId());
	}
	@Override
	public Comment addComment(String taskid, ProcessInstance processInstance, String comment) {
		return taskService.addComment(taskid, processInstance.getId(),comment);
	}

	@Override
	public String taskRunning(String processkey, Class<Object> clazz,
			String userId) {
		// TODO Auto-generated method stub
		return null;
	}

	public ProcessInstance createProcessInstanceQuery(Task task) {
		String processInstanceId = task.getProcessInstanceId();
		return runtimeService.createProcessInstanceQuery()
				.processInstanceId(processInstanceId).active().singleResult();
	}

	@Override
	public String taskRunning(String userId) {
		// TODO Auto-generated method stub
		return null;
	}
	public void getMultiInstances(String taskid){
		List<Task> taskResultList = taskService.createTaskQuery().taskId(taskid).list();
		//当前executionId
		String currentExecutionId = taskResultList.get(0).getExecutionId();
		//当前签署总数
		String currentSignCount = StringUtils.defaultString(runtimeService
		        .getVariable(currentExecutionId, "signCount").toString(), "0");
		//签署数+1
		runtimeService.setVariable(currentExecutionId, "signCount",
		        Integer.parseInt(currentSignCount) + 1);
	}
	
	/**
	 * 根据任务ID获取流程定义
	 * 
	 * @param taskId
	 *            任务ID
	 * @return
	 * @throws Exception
	 */
	public ProcessDefinitionEntity findProcessDefinitionEntityByTaskId(
			String taskId){
		// 取得流程定义
		ProcessDefinitionEntity processDefinition = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)
				.getDeployedProcessDefinition(findTaskById(taskId)
						.getProcessDefinitionId());

		return processDefinition;
	}
	
	public ProcessInstance findProcessInstanceByTaskId(String taskId) {
		// 找到流程实例
		ProcessInstance processInstance = runtimeService
				.createProcessInstanceQuery().processInstanceId(
						findTaskById(taskId).getProcessInstanceId())
				.singleResult();
		
		return processInstance;
	}
	public TaskEntity findTaskById(String taskId) {
		TaskEntity task = (TaskEntity) taskService.createTaskQuery().taskId(
				taskId).singleResult();
		return task;
	}

	/**
	 * 获取当前节点信息
	 * 
	 * @param processInstance
	 * @return
	 */
	public Task getCurrentTaskInfo(ProcessInstance processInstance) {
		Task currentTask = null;
		try {
			String activitiId = (String) PropertyUtils.getProperty(processInstance, "activityId");

			currentTask = taskService.createTaskQuery().processInstanceId(processInstance.getId())
					.taskDefinitionKey(activitiId).singleResult();

		} catch (Exception e) {
		}
		return currentTask;
	}
	/**
	 * 设置当前处理人信息
	 * 
	 * @param vars
	 * @param currentTask
	 */
	public void setCurrentTaskAssignee(Map<String, Object> vars, Task currentTask) {
		String assignee = currentTask.getAssignee();
		if (assignee != null) {
			User assigneeUser = identityService.createUserQuery().userId(assignee).singleResult();
			String userInfo = assigneeUser.getFirstName() + " " + assigneeUser.getLastName();
			vars.put("当前处理人", userInfo);
		}
	}
	public void setTaskGroup(Map<String, Object> vars, Set<Expression> candidateGroupIdExpressions) {
		String roles = "";
		for (Expression expression : candidateGroupIdExpressions) {
			String expressionText = expression.getExpressionText();
			if (expressionText.startsWith("$")) {
				expressionText = expressionText.replace("${insuranceType}", "life");
			}
			String roleName = identityService.createGroupQuery().groupId(expressionText).singleResult().getName();
			roles += roleName;
		}
		vars.put("任务所属角色", roles);
	}
	/**
	 * 导入监听类自动加载新数据
	 * 
	 * @param request
	 * @return
	 */
	public JsonMessage getClassListener(HttpServletRequest request) {
		String selectText = request.getParameter("selectText");
		List<TSListener> listenerList = listenerService.selectAll();
		StringBuffer buffer = new StringBuffer();
		buffer.append(
				"<select id=\"ClassName\"  style=\"width: 53%; padding: 1px\" onchange=\"onClassNameChange();\">");
		buffer.append("<option value =\"0\" >请选择</option>");
		for (TSListener listener : listenerList) {
			if (listener.getClassname().equals(selectText)) {
				buffer.append("<option value =\"" + listener.getClassurl() + "\" selected=\"selected\" >"
						+ listener.getClassname() + "</option>");
			} else {
				buffer.append(
						"<option value =\"" + listener.getClassurl() + "\">" + listener.getClassname() + "</option>");
			}
		}
		buffer.append("</select>");
		return new JsonMessage(true, buffer.toString());
	}
	/**
	 * 上传java监听类
	 * 
	 * @param request
	 * @return
	 */
	public String uploadClass(HttpServletRequest request) {
		AjaxJson j = new AjaxJson();
		try {
			int bytesum = 0;
			int byteread = 0;
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			MultipartFile file1 = multipartRequest.getFile("file");
			// 将java文件上传到classes文件夹中
			String savePath = request.getSession().getServletContext().getRealPath("/") + file1.getOriginalFilename();
			file1.getOriginalFilename();
			InputStream inputStream = file1.getInputStream();
			FileOutputStream fs = new FileOutputStream(savePath);
			byte[] buffer = new byte[1444];
			while ((byteread = inputStream.read(buffer)) != -1) {
				bytesum += byteread; // 字节数 文件大小
				System.out.println(bytesum);
				fs.write(buffer, 0, byteread);
			}
			inputStream.close();
			// Runtime.getRuntime().exec("cmd.exe /c javac
			// "+savePath);//编译java文件
			// Runtime.getRuntime().exec("cmd.exe /c del "+savePath);
			String taskid = request.getParameter("taskid");
			String classname = file1.getOriginalFilename().substring(0, file1.getOriginalFilename().indexOf("."));
			String jarurl = request.getSession().getServletContext().getRealPath("/") + file1.getOriginalFilename();
			// 保存class文件名称和路径到数据库中
			TSListener Listener = new TSListener();
			Listener.setClassname(classname);
			Listener.setClassurl("cn.hy.flowmanage.listener.CommonEventListener");
			Listener.setState(null);
			Listener.setJarurl(jarurl);
			Listener.setTaskid(taskid);
			listenerService.save(Listener);
			/* j.setMsg("添加成功!"); */
		} catch (Exception e) {
			j.setMsg("添加失败!");
			throw new RuntimeException(e);
		}
		return "成功";
	}
	
	/**
	 * 添加流程变量
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/addOrupdateVariable")
	public String addOrupdateVariable(HttpServletRequest request,String formkey) {
		String taskid = request.getParameter("taskid");
		String formid = "";
		/*try {
			if(StringUtils.isNotEmpty(formkey) && StringUtils.isNotBlank(formkey)) {
				formid = new String(formkey.getBytes("ISO-8859-1"),"UTF-8");
			}
		} catch(Exception e) {
			e.printStackTrace();
		}*/
		try {
			formid = java.net.URLDecoder.decode(request.getParameter("formkey"), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		String processId = request.getParameter("processId");
		//查询流程和变量
		Example example=new Example(ProcessVariableEntity.class);
		example.createCriteria().andEqualTo("procesnodeid", taskid);
		List<ProcessVariableEntity> entities = processVariableEntityService.selectByExample(example);
		if (entities != null&&!entities.isEmpty()) {
			//所有流程变量数组
			request.setAttribute("variabledata", JSON.toJSONString(entities, true));
		}else{
			request.setAttribute("variabledata", "[]");
		}
		Project project=SessionUtil.getProjectName(request);
		//查询表单的所有流程变量
		List<Map<String, Object>> list = sysFunctionService.selectMapBySQL("SELECT form_properties FROM sys_function WHERE project_id="+project.getId()+" AND web_name='"+formid+"'");
		if (list.size() > 0) {
			String form_properties = (String) list.get(0).get("form_properties");
			if (StringUtils.isNotBlank(form_properties)) {
				String[] properties = form_properties.split(",");
				List<String> formProperties = Arrays.asList(properties);
				request.setAttribute("formProperties", formProperties);
			}
		}
		request.setAttribute("formid", formid);
		request.setAttribute("processid", processId);
		request.setAttribute("taskid", taskid);
		return "flowmanage/processpro";
	}

	/**
	 * 保存流程变量
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/saveVariable")
	@ResponseBody
	public JsonMessage saveVariable(HttpServletRequest request,ProcessVariableEntity entity,String formkey) {
		try {
			ProcessNodeEntity processNodeEntity = processNodeEntityService.selectByPrimaryKey(entity.getProcesnodeid());
			if(processNodeEntity!=null){//流程节点已经存在
				if(!formkey.equals(processNodeEntity.getFormid())){//如果表单数据已经改变
					processNodeEntity.setFormid(formkey);
					//更新表单数据
					processNodeEntityService.updateByPrimaryKey(processNodeEntity);
					//删除节点表单变量
					Example example=new Example(ProcessVariableEntity.class); 
					example.createCriteria().andEqualTo("procesnodeid", entity.getProcesnodeid());
					//执行删除语句
					processVariableEntityService.deleteByExample(example);
				}
			}
			//查询是否已经存在该变量
			Example example=new Example(ProcessVariableEntity.class); 
			example.createCriteria().andEqualTo("procesnodeid", entity.getProcesnodeid());
			List<ProcessVariableEntity> entities=processVariableEntityService.selectByExample(example);
			boolean isInsert=true;
			if(entities!=null&&!entities.isEmpty()){//已经存在则遍历
				for(ProcessVariableEntity e:entities){
					//变量名称一样
					if(entity.getVariablename().equals(e.getVariablename())){
						//修改变量值
						e.setVariableval(entity.getVariableval());
						isInsert=false;
						//更新数据
						processVariableEntityService.updateByPrimaryKey(e);
						break;
					}
				}
			}
			//插入数据
			if(isInsert){
				processVariableEntityService.insert(entity);
			}
			return new JsonMessage(true,"保存成功");
		} catch (Exception e) {
			e.getStackTrace();
			return new JsonMessage(false,"保存失败");
		}
	}
	/**
	 * 删除流程变量
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/delVariable")
	@ResponseBody
	public JsonMessage delVariable(HttpServletRequest request,String id) {
		try {
			processVariableEntityService.deleteByPrimaryKey(id);
			return new JsonMessage(true,"删除成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false,"删除失败");
		}
	}
	/**
	 * 按节点主键查询流程变量
	 * @param nodeId  节点主键
	 * @return
	 */
	@RequestMapping("/getVariables")
	@ResponseBody
	public List<ProcessVariableEntity> getVariables(String nodeId) {
		try {
			Example example=new Example(ProcessVariableEntity.class);
			example.createCriteria().andEqualTo("procesnodeid", nodeId);
			return processVariableEntityService.selectByExample(example);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
		
	}
	
	/**
	 * 流程：配置接口
	 */
	/*********************************************************************/
	/**
	 * 打开配置页面窗口
	 * @return
	 */
	@RequestMapping("/openInteface")
	public String openInteface(HttpServletRequest request){
		try {
			String flag=PropertiesUtils.init("isPublishFlag");
			if("true".equals(flag)){//发布后的项目
				List<Map<String, Object>> list = sysFunctionService.selectBySQL("SELECT * FROM sys_inteface");
			    if(list!=null&&!list.isEmpty()){
			    	request.setAttribute("data", list.get(0));
			    }
			}else{//发布前的项目
				Object userId=SessionUtil.getLoginUser(request).get("u_id");
				Long projectId=SessionUtil.getProjectName(request).getId();
				List<Map<String, Object>> list = sysFunctionService.selectBySQL("SELECT * FROM sys_inteface WHERE project_id="+projectId+" AND user_id="+userId);
			    if(list!=null&&!list.isEmpty()){
			    	request.setAttribute("data", list.get(0));
			    }
			}
		} catch (Exception e) {
			
		}
		return "flowmanage/inteface";
	}
	
	/**
	 * 打开配置页面窗口
	 * @return
	 */
	@RequestMapping("/saveInteface")
	@ResponseBody
	public JsonMessage saveInteface(HttpServletRequest request,String id,String userInteface,String groupInteface,String deptInteface){
		try {
			String flag=PropertiesUtils.init("isPublishFlag");
			if("true".equals(flag)){//发布后的项目
				if(StringUtils.isNotBlank(id)){//更新
					sysFunctionService.updateBySQL("UPDATE sys_inteface SET user_inteface='"+userInteface+"',group_inteface='"+groupInteface+"',dept_inteface='"+deptInteface+"' WHERE id="+id);
				}else{
					StringBuilder sb=new StringBuilder()
							.append("INSERT INTO sys_inteface (user_inteface, group_inteface,dept_inteface) VALUES ('")
							.append(userInteface).append("','")
							.append(groupInteface).append("','")
							.append(deptInteface).append("')");
					sysFunctionService.insertBySQL(sb.toString());
				}
			}else{
				if(StringUtils.isNotBlank(id)){//更新
					sysFunctionService.updateBySQL("UPDATE sys_inteface SET user_inteface='"+userInteface+"',group_inteface='"+groupInteface+"',dept_inteface='"+deptInteface+"' WHERE id="+id);
				}else{
					StringBuilder sb=new StringBuilder()
							.append("INSERT INTO sys_inteface (project_id, user_id, user_inteface, group_inteface,dept_inteface) VALUES (")
							.append(SessionUtil.getProjectName(request).getId()).append(",")
							.append(SessionUtil.getLoginUser(request).get("u_id")).append(",'")
							.append(userInteface).append("','")
							.append(groupInteface).append("','")
							.append(deptInteface).append("')");
					sysFunctionService.insertBySQL(sb.toString());
				}
			}
		} catch (Exception e) {
			return new JsonMessage(false,"提交失败");
		}
		return new JsonMessage(true,"提交成功");
	}

	
	/**
	 * 流程：页面配置接口
	 */
	/*********************************************************************/
	/**
	 * 打开页面配置窗口
	 * @return
	 */
	@RequestMapping("/openPageInteface")
	public String openPageInteface(HttpServletRequest request){
		try {
			Object userId=SessionUtil.getLoginUser(request).get("u_id");
			Long projectId=SessionUtil.getProjectName(request).getId();
			List<Map<String, Object>> list = sysFunctionService.selectBySQL("SELECT * FROM sys_pageinteface WHERE project_id="+projectId+" AND user_id="+userId);
		    if(list!=null&&!list.isEmpty()){
		    	request.setAttribute("data", list.get(0));
		    }
		} catch (Exception e) {
			
		}
		return "flowmanage/pageInteface";
	}
	
	/**
	 * 打开页面配置窗口
	 * @return
	 */
	@RequestMapping("/savePageInteface")
	@ResponseBody
	public JsonMessage savePageInteface(HttpServletRequest request,String id,String pageInteface){
		try {
			if(StringUtils.isNotBlank(id)){//更新
				sysFunctionService.updateBySQL("UPDATE sys_pageinteface SET page_inteface='"+pageInteface+"' WHERE id="+id);
			}else{
				StringBuilder sb=new StringBuilder()
						.append("INSERT INTO sys_pageinteface (project_id, user_id, page_inteface) VALUES (")
						.append(SessionUtil.getProjectName(request).getId()).append(",")
						.append(SessionUtil.getLoginUser(request).get("u_id")).append(",'")
						.append(pageInteface).append("')");
				sysFunctionService.insertBySQL(sb.toString());
			}
		} catch (Exception e) {
			return new JsonMessage(false,"提交失败");
		}
		return new JsonMessage(true,"提交成功");
	}
	@Override
	public JsonMessage ownerTask(String taskId, String userId) {
		Task task =taskService.createTaskQuery().taskId(taskId).singleResult();  //查询task对象
		if(task!=null){
			ProcessInstance processInstance = getPIByTaskId(task.getId());
			if(processInstance!=null){
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");    //插入委托信息
				StringBuilder sb=new StringBuilder()
				.append("INSERT INTO process_delegate (processid, taskid, assignee,delegateTime) VALUES (")
				.append(task.getProcessInstanceId()).append(",")
				.append(taskId).append(",'")
				.append(task.getAssignee()).append("','")
				.append(sdf.format(new Date())).append("')");
		         sysFunctionService.insertBySQL(sb.toString());
		         //设置委托人
				 taskService.setAssignee(taskId,userId);
				 return new JsonMessage(true,"委托成功");
			}else{
				 return new JsonMessage(false,"流程已结束不能委托！");
			}
		}else{
			 return new JsonMessage(false,"流程任务节点不存在！");
		}
	}

	@Override
	public void viewImg(String processInstanceId, HttpServletResponse response) throws Exception {

		logger.info("[开始]-获取流程图图像");
		// 设置页面不缓存
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		try {
			//  获取历史流程实例
			HistoricProcessInstance historicProcessInstance = historyService.createHistoricProcessInstanceQuery()
					.processInstanceId(processInstanceId).singleResult();

			if (historicProcessInstance == null) {
				logger.info("获取流程实例ID[" + processInstanceId + "]对应的历史流程实例失败！");
			} else {
				// 获取流程定义
				ProcessDefinitionEntity processDefinition = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)
						.getDeployedProcessDefinition(historicProcessInstance.getProcessDefinitionId());

				// 获取流程历史中已执行节点，并按照节点在流程中执行先后顺序排序
				List<HistoricActivityInstance> historicActivityInstanceList = historyService.createHistoricActivityInstanceQuery()
						.processInstanceId(processInstanceId).orderByHistoricActivityInstanceStartTime().asc().list();

				// 已执行的节点ID集合
				List<String> executedActivityIdList = new ArrayList<String>();
				int index = 1;
				logger.info("获取已经执行的节点ID");
				for (HistoricActivityInstance activityInstance : historicActivityInstanceList) {
					executedActivityIdList.add(activityInstance.getActivityId());
					logger.info("第[" + index + "]个已执行节点=" + activityInstance.getActivityId() + " : " +activityInstance.getActivityName());
					index++;
				}

				// 获取流程图图像字符流
				InputStream imageStream = ProcessDiagramGenerator.generateDiagram(processDefinition, "png", executedActivityIdList);

				response.setContentType("image/png");
				OutputStream os = response.getOutputStream();
				int bytesRead = 0;
				byte[] buffer = new byte[8192];
				while ((bytesRead = imageStream.read(buffer, 0, 8192)) != -1) {
					os.write(buffer, 0, bytesRead);
				}
				os.close();
				imageStream.close();
			}
			logger.info("[完成]-获取流程图图像");
		} catch (Exception e) {
			logger.error("【异常】-获取流程图失败！" + e.getMessage());
		}
	
	} 
}