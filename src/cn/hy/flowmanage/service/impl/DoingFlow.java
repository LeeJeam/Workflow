package cn.hy.flowmanage.service.impl;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.ActivitiException;
import org.activiti.engine.FormService;
import org.activiti.engine.HistoryService;
import org.activiti.engine.IdentityService;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.Expression;
import org.activiti.engine.form.TaskFormData;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.impl.ProcessEngineImpl;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.bpmn.behavior.UserTaskActivityBehavior;
import org.activiti.engine.impl.db.DbSqlSession;
import org.activiti.engine.impl.db.DbSqlSessionFactory;
import org.activiti.engine.impl.db.ListQueryParameterObject;
import org.activiti.engine.impl.identity.Authentication;
import org.activiti.engine.impl.javax.el.ExpressionFactory;
import org.activiti.engine.impl.javax.el.ValueExpression;
import org.activiti.engine.impl.juel.ExpressionFactoryImpl;
import org.activiti.engine.impl.juel.RootPropertyResolver;
import org.activiti.engine.impl.juel.SimpleContext;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.HistoricTaskInstanceEntity;
import org.activiti.engine.impl.persistence.entity.IdentityLinkEntity;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.persistence.entity.TaskEntity;
import org.activiti.engine.impl.pvm.PvmActivity;
import org.activiti.engine.impl.pvm.PvmTransition;
import org.activiti.engine.impl.pvm.delegate.ActivityBehavior;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.impl.pvm.process.ProcessDefinitionImpl;
import org.activiti.engine.impl.pvm.process.TransitionImpl;
import org.activiti.engine.impl.task.TaskDefinition;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Comment;
import org.activiti.engine.task.IdentityLink;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.hy.common.utils.DDSendMessage;
import cn.hy.common.utils.DateUtil;
import cn.hy.common.utils.PropertiesUtils;
import cn.hy.common.utils.SessionUtil;
import cn.hy.common.utils.SystemPropertyUtil;
import cn.hy.common.vo.JsonMessage;
import cn.hy.flowmanage.form.ProcessBean;
import cn.hy.flowmanage.form.ProcessFormBean;
import cn.hy.flowmanage.pojo.ProcessBussinEntity;
import cn.hy.flowmanage.pojo.ProcessEntity;
import cn.hy.flowmanage.pojo.ProcessNodeEntity;
import cn.hy.flowmanage.pojo.UserProcessbean;
import cn.hy.flowmanage.service.IActivitiService;
import cn.hy.flowmanage.service.IDoingFlow;
import cn.hy.flowmanage.service.IProcessBussinEntityService;
import cn.hy.flowmanage.service.IProcessEntityService;
import cn.hy.flowmanage.service.IProcessNodeEntityService;
import cn.hy.flowmanage.service.IProcessVariableEntityService;
import cn.hy.functionmenumanage.vo.TreeNode;
@Service("doingFlow")
public  class DoingFlow implements IDoingFlow {
	/*** activiti引擎服务 ***/
	protected static RepositoryService repositoryService;
	protected static TaskService taskService;
	protected static IdentityService identityService;
	protected static RuntimeService runtimeService;
	protected static HistoryService historyService;
	protected static FormService formService;
	public static final int I_NO_OPERATION = 0;  
	public static final int I_DONE = 1;  
    public static final int I_TASK_NOT_FOUND = 2;  
	public static final int I_ROLLBACK = 3;  
	public static String Message="通过";
	public static String BackTo="退回";
	static {
		 repositoryService = ProcessEngines.getDefaultProcessEngine().getRepositoryService();
		 taskService = ProcessEngines.getDefaultProcessEngine().getTaskService();
		 identityService = ProcessEngines.getDefaultProcessEngine().getIdentityService();
		 runtimeService = ProcessEngines.getDefaultProcessEngine().getRuntimeService();
		 historyService = ProcessEngines.getDefaultProcessEngine().getHistoryService();
		 formService =ProcessEngines.getDefaultProcessEngine().getFormService();
	}
	@Resource(name = "processEntityService")
	private IProcessEntityService processEntityService;
	@Resource(name = "activitiService")
	private IActivitiService activitiService;
	@Resource(name = "processBussinEntityService")
	private IProcessBussinEntityService processBussinEntityService;
	@Resource(name = "processNodeEntityService")
	private IProcessNodeEntityService processNodeEntityService;
	@Resource(name = "processVariableEntityService")
	private IProcessVariableEntityService processVariableEntityService;
	/**
	 * 启动流程实列
	 */
	public ProcessInstance startFlow(
			String processDefinitionKey) {
		identityService.setAuthenticatedUserId(processDefinitionKey);
		return runtimeService.startProcessInstanceByKey(processDefinitionKey);
	
	}
	/**
	 * 办理流程任务
	 */
	public void completeTask(String taskId,  Map<String, Object> variables) {
		taskService.complete(taskId, variables);
	}
	/**
	 * 根据状态字段修改是否挂起
	 */
	public void updateState(String state, String processInstanceId) {
		if (state.equals("active")) {
			runtimeService.activateProcessInstanceById(processInstanceId);
		} else if (state.equals("suspend")) {
			runtimeService.suspendProcessInstanceById(processInstanceId);
		}
	}
	/**
	 * 审批批注信息
	 * @paramter processInstance
	 * @paramter taskId
	 */
	public void addComment(ProcessInstance processInstance,String taskId,String message){
	    if(processInstance != null) {
	    	   Task task = taskService.createTaskQuery().taskId(taskId).singleResult(); //获取Task任务
	    	   if(task!=null){
		    	   Authentication.setAuthenticatedUserId(task.getAssignee());  //设置用户ID
			       activitiService.addComment(taskId, processInstance,message);
	    	   }
	     }
	}
	/**
	 * 从当前任务 任意回退至已审批任务 
	 * @param currentTaskId
	 * @param backToTaskId
	 * @return
	 */
    public static int dbBackTo(String currentTaskId, String backToTaskId)  
    {  
        int result = DoingFlow.I_NO_OPERATION;  
        SqlSession sqlSession = getSqlSession();  
        TaskEntity currentTaskEntity = getCurrentTaskEntity(currentTaskId);  
        HistoricTaskInstanceEntity backToHistoricTaskInstanceEntity = getHistoryTaskEntity(backToTaskId);  
        if (currentTaskEntity == null || backToHistoricTaskInstanceEntity == null)  
        {  
            return DoingFlow.I_TASK_NOT_FOUND;  
        }  
        String processDefinitionId = currentTaskEntity.getProcessDefinitionId();  
        String executionId = currentTaskEntity.getExecutionId();  
        String currentTaskEntityId = currentTaskEntity.getId();  
        String backToHistoricTaskInstanceEntityId = backToHistoricTaskInstanceEntity.getId();  
        String backToTaskDefinitionKey = backToHistoricTaskInstanceEntity.getTaskDefinitionKey();  
        String backToAssignee = backToHistoricTaskInstanceEntity.getAssignee();  
        boolean success = false;  
        try  
        {  
        	/* 第一步 完成历史TASK覆盖当前TASK 
        	* 用hi_taskinst修改当前ru_task 
        	* ru_task.ID_=hi_taskinst.ID_ 
        	* ru_task.NAME_=hi_taskinst.NAME_ 
        	* ru_task.TASK_DEF_KEY_=hi_taskinst.TASK_DEF_KEY_ 
        	*/  
            StepOne_use_hi_taskinst_to_change_ru_task(sqlSession, currentTaskEntity, backToHistoricTaskInstanceEntity);  
            /* 第二步 
            * 修改当前任务参与人列表 
            * ru_identitylink 用ru_task.ID_去ru_identitylink 索引 
            * ru_identitylink.TASK_ID_=hi_taskinst.ID_ 
            * ru_identitylink.USER_ID=hi_taskinst.ASSIGNEE_ 
            */
            StepTwo_change_ru_identitylink(sqlSession, currentTaskEntityId, backToHistoricTaskInstanceEntityId,  
                backToAssignee);  
             
            /* 第三步修改流程记录节点 把ru_execution的ACT_ID_ 改为hi_taskinst.TASK_DEF_KEY_ */
            StepThree_change_ru_execution(sqlSession, executionId, processDefinitionId, backToTaskDefinitionKey);  
            success = true;  
        }  
        catch (Exception e)  
        {  
            throw new ActivitiException("dbBackTo Exception", e);  
        }  
        finally  
        {  
            if (success)  
            {  
                sqlSession.commit();  
                result = DoingFlow.I_DONE;  
            }  
            else  
            {  
                sqlSession.rollback();  
                result = DoingFlow.I_ROLLBACK;  
            }  
            sqlSession.close();  
        }  
        return result;  
    }  
  
    private static void StepThree_change_ru_execution(SqlSession sqlSession, String executionId,  
            String processDefinitionId, String backToTaskDefinitionKey) throws Exception  
    {  
        List<ExecutionEntity> currentExecutionEntityList = sqlSession.selectList("selectExecution", executionId);  
        if (currentExecutionEntityList.size() > 0)  
        {  
            ActivityImpl activity = getActivitiImp(processDefinitionId, backToTaskDefinitionKey);  
            Iterator<ExecutionEntity> execution = currentExecutionEntityList.iterator();  
            while (execution.hasNext())  
            {  
                ExecutionEntity e = execution.next();  
                e.setActivity(activity);  
                p(sqlSession.update("updateExecution", e));  
            }  
        }  
    }  
  
    private static void StepTwo_change_ru_identitylink(SqlSession sqlSession, String currentTaskEntityId,  
            String backToHistoricTaskInstanceEntityId, String backToAssignee) throws Exception  
    {  
        ListQueryParameterObject para = new ListQueryParameterObject();  
        para.setParameter(currentTaskEntityId);  
        List<IdentityLinkEntity> currentTaskIdentityLinkEntityList = sqlSession.selectList("selectIdentityLinksByTask",  
            para);  
        if (currentTaskIdentityLinkEntityList.size() > 0)  
        {  
            Iterator<IdentityLinkEntity> identityLinkEntityList = currentTaskIdentityLinkEntityList.iterator();  
            IdentityLinkEntity identityLinkEntity;  
            TaskEntity tmpTaskEntity;  
            tmpTaskEntity = new TaskEntity();  
            tmpTaskEntity.setId(backToHistoricTaskInstanceEntityId);  
            while (identityLinkEntityList.hasNext())  
            {  
                identityLinkEntity = identityLinkEntityList.next();  
                identityLinkEntity.setTask(tmpTaskEntity);  
                identityLinkEntity.setUserId(backToAssignee);  
                Map<String, Object> parameters = new HashMap<String, Object>();  
                parameters.put("id", identityLinkEntity.getId());  
                sqlSession.delete("deleteIdentityLink", parameters);  
                sqlSession.insert("insertIdentityLink", identityLinkEntity);  
            }  
        }  
    }  
  
    private static void StepOne_use_hi_taskinst_to_change_ru_task(SqlSession sqlSession, TaskEntity currentTaskEntity,  
            HistoricTaskInstanceEntity backToHistoricTaskInstanceEntity) throws Exception  
    {  
        sqlSession.delete("deleteTask", currentTaskEntity);  
        currentTaskEntity.setName(backToHistoricTaskInstanceEntity.getName());  
        currentTaskEntity.setTaskDefinitionKey(backToHistoricTaskInstanceEntity.getTaskDefinitionKey());  
        currentTaskEntity.setId(backToHistoricTaskInstanceEntity.getId());  
        currentTaskEntity.setAssignee(backToHistoricTaskInstanceEntity.getAssignee());
        sqlSession.insert("insertTask", currentTaskEntity);  
    }  
  
    public static void p(Object o)  
    {  
        System.out.println(o);  
    }  
  
    private static ActivityImpl getActivitiImp(String processDefinitionId, String taskDefinitionKey)  
    {  
        RepositoryService repositoryService = ProcessEngines.getDefaultProcessEngine().getRepositoryService();
        ProcessDefinitionEntity processDefinition = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)  
                .getDeployedProcessDefinition(processDefinitionId);  
        List<ActivityImpl> activitiList = processDefinition.getActivities();  
        boolean b;  
        Object activityId;  
        for (ActivityImpl activity : activitiList)  
        {  
            activityId = activity.getId();  
            b = activityId.toString().equals(taskDefinitionKey);  
            if (b)  
            {  
                return activity;  
            }  
        }  
        return null;  
    }  
  
    private static TaskEntity getCurrentTaskEntity(String id)  
    {  
        return (TaskEntity) ProcessEngines.getDefaultProcessEngine().getTaskService().createTaskQuery().taskId(id).singleResult();  
    }  
  
    private static HistoricTaskInstanceEntity getHistoryTaskEntity(String id)  
    {  
        return (HistoricTaskInstanceEntity) ProcessEngines.getDefaultProcessEngine().getHistoryService().createHistoricTaskInstanceQuery()  
                .taskId(id).singleResult();  
    }  
  
    private static SqlSession getSqlSession()  
    {  
        ProcessEngineImpl processEngine = (ProcessEngineImpl) ProcessEngines.getDefaultProcessEngine();
        DbSqlSessionFactory dbSqlSessionFactory = (DbSqlSessionFactory) processEngine.getProcessEngineConfiguration()  
                .getSessionFactories().get(DbSqlSession.class);  
        SqlSessionFactory sqlSessionFactory = dbSqlSessionFactory.getSqlSessionFactory();  
        return sqlSessionFactory.openSession();  
    } 
    
	/**
	 * 已部署后的流程列表
	 * @param request
	 * @param typeId 流程类型ID
	 * @return
	 */

	public List<Map<String, Object>> findByProcessList(HttpServletRequest request, String typeId,String flowName) {
		try {
			List<Map<String, Object>> selectMapBySQL = null;
			StringBuilder sb = new StringBuilder();
			if (StringUtils.isNoneBlank(typeId)) {// 默认查出全部流程
				sb.append("select * from t_p_process where typeid='").append(typeId).append("' ");
			} else {
				sb.append("select * from t_p_process where 1=1 ");
			}

			if(StringUtils.isNotEmpty(flowName) && StringUtils.isNotBlank(flowName)) {
				sb.append(" and processname like '%" + flowName + "%'");
			}
			if (SessionUtil.getProjectName(request) != null) {
				sb.append(" and  projectid='").append(SessionUtil.getProjectName(request).getId()).append("' ");
			} else {
				sb.append(" and forbiddenorusing = 1 and processstate=1 ");
			}
			selectMapBySQL = processEntityService.selectMapBySQL(sb.toString());
			for (Map<String, Object> map : selectMapBySQL) {
				String forbiddenorusing = String.valueOf(map.get("forbiddenorusing"));
				if (forbiddenorusing.equals("1") || forbiddenorusing.equals("已启用")) {
					map.put("forbiddenorusing", "已启用");
				} else {
					map.put("forbiddenorusing", "未启用");
				}
			}
			return selectMapBySQL;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 新建工作查看流程表单
	 * @param processId
	 * @param fName
	 * @param request
	 * @return
	 * 
	 */
	public ModelAndView viewForm(String processId,String fName,
			HttpServletRequest request){
		if (StringUtils.isNoneEmpty(processId)) {
			ProcessEntity entity = processEntityService.selectByPrimaryKey(processId);
			   return new ModelAndView(entity.getPagename());
		   }else{
			   return new ModelAndView(fName);
		}
	}
	/**
	 * 填写启动表单后选择审核人，并启动流程。
	 * @param processId  流程模板ID
	 * @param bID        业务数据ID
	 * @param processname 流程名称  
	 * @param request
	 * @return
	 */
	public List<Map<String, Object>>   starProcess(String processId,String processname,HttpServletRequest request){
		String username = (String) request.getSession().getAttribute("username");
	    // 启动流程
		ProcessInstance processInstance =activitiService.startFlow(processId,username);
		ProcessEntity tpProcess = processEntityService.selectByPrimaryKey(processId);
		request.setAttribute("tpProcess", tpProcess);
		//插入流程实列历史记录表更新流程名称数据
		processEntityService.updateBySQL("UPDATE ACT_HI_PROCINST SET NAME_='" + processname + "'  WHERE ID_='" + processInstance.getId() + "'");
		List<Map<String, Object>> paramter =new ArrayList<Map<String,Object>>();  //流程变量信息
		if(processInstance!=null){    //获取流程实列对象
		   Task	 task = taskService.createTaskQuery().processInstanceId(processInstance.getId()).singleResult();
		   taskService.setAssignee(task.getId(), username);
		   if(task!=null){            //判断任务对象是否为空
			   Map<String, Object> map =new HashMap<String,Object>();
			   map.put("taskId",task.getId());
			   map.put("processId", processInstance.getId());
			   if(task.getFormKey()!=null && !"".equals(task.getFormKey())){  //判断节点表单是否为空
				   map.put("formname",task.getFormKey());
			     }else{                                                      //节点表单为空字符串
			    	 map.put("formname","");
			     }
			   paramter.add(map);
		   }
		}
		//是否是发布后的项目
		String flag=PropertiesUtils.init("isPublishFlag");
		//发布后的项目名称
		String webName=PropertiesUtils.init("web_name");
		//必须是发布后的项目同时必须要是"大区绩效项目"
		if("true".equals(flag)&&"daqujixiaoxitong".equals(webName)){
			//保存流程表(保存流程是否被删除，是否归档数据)
			processEntityService.insertBySQL("INSERT INTO hys_process (id, is_remove, is_pigeonhole) VALUES ('"+processInstance.getId()+"', 0, 0)");
		}
		return paramter;
	}
	
	/**
	 * 启动流程后通过流程实列获取当前任务节点配置人员、候选人、用户组信息
	 * @param processInstance  流程实列对象
	 * @param isOpen 是否打开窗口 true ：打开 false:不打开
	 * @return
	 */
   public List<TreeNode> switchTaskCandidatesList(ProcessInstance processInstance,boolean isOpen){
	       List<TreeNode> list=new ArrayList<>();
		   String id = processInstance.getActivityId();
		   String pid = processInstance.getId();
		   TaskQuery tq =taskService.createTaskQuery().processInstanceId(pid);
		   Task currentTask = tq.taskDefinitionKey(id).singleResult();	
		   if(currentTask==null){
			   return list;
		   }
		   if(currentTask.getAssignee()!=null && !"".equals(currentTask.getAssignee())){
				TreeNode user=new TreeNode();
				user.setId(currentTask.getId());
				user.setName(currentTask.getAssignee());
				user.setTaskId(currentTask.getId());
				user.setType("assignee");
				user.setOpen(isOpen);
				list.add(user);
				taskService.setAssignee(currentTask.getId(),null);
				//删除审核人信息
			}
			List<IdentityLink> userList = taskService.getIdentityLinksForTask(currentTask.getId());
		    if(userList.size()>0){
				for(int i=0 ;i<userList.size(); i++){
					TreeNode user=new TreeNode();
					if(userList.get(i).getGroupId()!=null &&  !"".equals(userList.get(i).getGroupId())){
						user.setId(i+"-candidateGroups");
						user.setName(userList.get(i).getGroupId());
						user.setType("candidateGroups");
						user.setTaskId(userList.get(i).getTaskId());
						user.setOpen(isOpen);
						list.add(user);
						//删除用户组信息
						taskService.deleteCandidateGroup(userList.get(i).getTaskId(), userList.get(i).getGroupId());
					}
					if("candidate".equals(userList.get(i).getType()) && "".equals(userList.get(i).getGroupId())){
						user.setId(String.valueOf(i));
						user.setName(userList.get(i).getUserId());
						user.setType("candidateUsers");
						user.setTaskId(userList.get(i).getTaskId());
						user.setOpen(isOpen);
						list.add(user);
						//删除多用户操作
						taskService.deleteCandidateUser(userList.get(i).getTaskId(), userList.get(i).getUserId());
					}
			   }
		    }
	       return list;
	   
   }

/**
 * 提交选择框中选中人，并设置到下一级节点办理人。
 */
//   public JsonMessage switchTaskCandidates(String assignee,String candidateUsers, String taskCandidateGroup,String taskId,HttpServletRequest request) {
//	 	    if(taskId==null && "".equals(taskId)){
//	 	    	 return new JsonMessage(false, "流程任务不存在！");
//	 	      }
//	 		 //通过taskId获取流程实列对象 
//	 		ProcessInstance processInstance = activitiService.getPIByTaskId(taskId);
//	 	    if(processInstance==null){
//	 			return new JsonMessage(false, "流程实列对象不存在！");
//	 		   }else{
//	 			   try {
//	 				  if((assignee==null && "".equals(assignee)) && (candidateUsers==null && "".equals(candidateUsers))){
//	 					 return new JsonMessage(false, "没有选择审核人！");
//	 				  }
//		 			//提交选择候选人数据
//			 		 if(candidateUsers!=null && !"".equals(candidateUsers)){
//			 			 String [] candidateUserArray =candidateUsers.split(",");
//			 				 for(int i= 0 ;i<candidateUserArray.length ;i ++){
//			 					 if(candidateUserArray[i]!=null && !"".equals(candidateUserArray[i])){
//			 						 taskService.setAssignee(taskId, candidateUserArray[i]);
//			 						//  DDSendMessage.SendMessage("("+processInstance.getProcessDefinitionName()+")"+ processInstance.getId(),candidateUserArray[i], candidateUserArray[i]);
//			 					 }
//			 			      }
//			 		//提交选人用户组信息	
//			 		 }else if(taskCandidateGroup!=null  && !"".equals(taskCandidateGroup)){
//			 			 String [] taskCandidateGroupArray =taskCandidateGroup.split(",");
//			 				 for(int i= 0 ;i<taskCandidateGroupArray.length ;i ++){
//			 					 if(taskCandidateGroupArray[i]!=null && !"".equals(taskCandidateGroupArray[i])){
//			 						 taskService.addCandidateGroup(taskId, taskCandidateGroupArray[i]);
//			 						 // DDSendMessage.SendMessage("("+processInstance.getProcessDefinitionName()+")"+ processInstance.getId(),taskCandidateGroupArray[i], taskCandidateGroupArray[i]);
//			 					 }
//			 				 }
//			 			//提交选择审核人
//			 		 }else if(assignee!=null  && !"".equals(assignee)){
//			 			 String [] assigneeArray =assignee.split(",");
//			 			 for(int i= 0 ;i<assigneeArray.length ;i ++){
//			 				 if(assigneeArray[i]!=null && !"".equals(assigneeArray[i])){
//			 			          taskService.setAssignee(taskId,assigneeArray[i]);
//			 					 // DDSendMessage.SendMessage("("+processInstance.getProcessDefinitionName()+")"+ processInstance.getId(),"121661090016072660", "121661090016072660");
//			 				 }
//			 			 }
//			 		   }
//			 	  } catch (Exception e) {
//			 		  e.printStackTrace();
//			 		  return new JsonMessage(false,"提交失败");
//			 	}
//	 			  return new JsonMessage(true,"提交成功");
//		 	}
//		 		
//    }
	 		 
     /**
	   * 会签接口
	   * @param taskId 任务ID
	   * @param users 会签用户
	   */
    public JsonMessage countersignTask(String taskId,String userId){
	    if( StringUtils.isEmpty(taskId)){
	    	  return new JsonMessage(true,"失败");
	    }
	    Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
	    if( task == null ){
	    	  return new JsonMessage(true,"失败");
	    }
	    for(String user:userId.split(",") ){
	      TaskEntity subTask = (TaskEntity)taskService.newTask();
	      subTask.setParentTaskId(taskId); //上级Task
	      subTask.setName( task.getName() + "-"+user+"会签");
	      subTask.setAssignee(user); //会签用户
	      subTask.setProcessDefinitionId( task.getProcessDefinitionId() );
	      subTask.setProcessInstanceId( task.getProcessInstanceId() );
	      subTask.setDescription("会签");
	      subTask.setTaskDefinitionKey(task.getTaskDefinitionKey());
	      subTask.setFormKey(task.getFormKey());
	      taskService.saveTask(subTask);
	      //标示流程历史记录信息
	      if(task.getProcessInstanceId()!=null && !"".equals(task.getProcessInstanceId())){
			    processEntityService.updateBySQL("UPDATE ACT_HI_TASKINST SET PROC_INST_ID_='" + task.getProcessInstanceId() + "'  WHERE ID_='" + subTask.getId() + "'");
	      }
	    }
	    return new JsonMessage(true,"会签成功");
    }
    /**
     * 保存会签意见
     */
    public JsonMessage saveSignMessage(String userId,String taskId,String message){
		if(message!=null && !"".equals(message)){
			ProcessInstance processInstance = activitiService.getPIByTaskId(taskId);
			if (processInstance != null) {
				Authentication.setAuthenticatedUserId(userId);
				addComment(processInstance,taskId,message);// 保存会签意见
				taskService.complete(taskId);              //审核结束会签任务
				return new JsonMessage(true,"提交成功！");
			}else{
				return new JsonMessage(false,"流程不存在！");
			}
		}else{
			return new JsonMessage(false,"会签意见不能为空！");
		}
    }
    //获取会签意见展示
    public List<Comment>  getSignMessage(String processInstanceId){
    	return taskService.getProcessInstanceComments(processInstanceId);
    }
    
    /**
	   * 抄送接口
	   * @param taskId 任务ID
	   * @param users 会签用户
	   */
   public JsonMessage copySendUser(String taskId,String userId){
	    if(StringUtils.isEmpty(taskId)){
	    	  return new JsonMessage(true,"任务ID不存在！");
	    }
	    Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
	    if( task == null ){
	    	  return new JsonMessage(true,"任务为空！");
	    }
	    if(userId!=null && !"".equals(userId)){  //新增任务为抄送任务所有抄送人可见
		      TaskEntity subTask = (TaskEntity)taskService.newTask();
		      subTask.setName(task.getName()+"-抄送");
		      subTask.setProcessDefinitionId( task.getProcessDefinitionId() );
		      subTask.setProcessInstanceId( task.getProcessInstanceId() );
		      subTask.setDescription("抄送");
		      subTask.setTaskDefinitionKey(task.getTaskDefinitionKey());
		  	  taskService.saveTask(subTask);
		  	  for(String user:userId.split(",") ){
			    	taskService.addCandidateUser(subTask.getId(), user);	
			  }
	    }
	    return new JsonMessage(true,"抄送成功");
   }

    
    /** 
   	 * 查询待办件
   	 * @throws UnsupportedEncodingException
   	 */
	public List<ProcessBean> taskList(HttpServletRequest request) {
		// 通过用户名查询查询任务信息
		List<ProcessBean> objects = new ArrayList<ProcessBean>();
		String userId = (String) request.getSession().getAttribute("username");
		request.setAttribute("userId", userId);
		List<Task> tasks = activitiService.doingtask(userId);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		// 根据流程的业务ID查询实体并关联
		for (Task task : tasks) {
			ProcessBean process = new ProcessBean();
			ProcessInstance processInstance = activitiService.createProcessInstanceQuery(task);
			if (processInstance != null) {
				ProcessDefinition processDefintion = activitiService
						.getProcessDefinition(processInstance.getProcessDefinitionId());
				String startUser =historyService.createHistoricProcessInstanceQuery().
						processInstanceId(processInstance.getId()).singleResult().getStartUserId();
				process.setVarName(startUser);// 申请人
				String processname = historyService.createHistoricProcessInstanceQuery().processInstanceId(processInstance.getId()).singleResult().getName();
				if(processname!=null && !"".equals(processname)){
					process.setProcessDefname(processname);
				}else{
					process.setProcessDefname(processDefintion.getName());
				}
				if (!processInstance.isSuspended()) {
					process.setProcessDefSuspended("正常");
				} else {
					process.setProcessDefSuspended("已挂起");
				}
				process.setIsuspended(processInstance.isSuspended());
				process.setTaskAssignee(task.getAssignee());
				process.setTaskId(task.getId());
				process.setTaskTaskDefinitionKey(task.getTaskDefinitionKey());
				process.setTaskTime(sdf.format(task.getCreateTime()));
				process.setTaskName(task.getName());
				process.setBusinessKey(processInstance.getBusinessKey());
				process.setProcesskey(processDefintion.getKey());
				process.setProcessInstId(processInstance.getId());

				objects.add(process);
			}

		}
		return objects;
	}
	  
		/**
		 *查看审核待办件表单
		 * 
		 * @param id
		 * @param taskid
		 * @param request
		 * @return
		 * @throws UnsupportedEncodingException
		 */
	public List taskViewForm(String taskId,HttpServletRequest request){
		//根据taskId查询表单名称
		String pageName="";
		List<HashMap> list=new ArrayList<HashMap>();
		HashMap m=new HashMap();
		//根据xml中formData查询表单名称
		if(taskId!=null &&!"null".equals(taskId)&& !"undefined".equals(taskId)){
			TaskFormData formData = formService.getTaskFormData(taskId);
			if(formData!=null){
				pageName =formData.getFormKey();
			}
		}
		m.put("pageName", pageName);
		list.add(m);
		return list;
	}

	/**
	 * 流程跟踪图功能
	 * 
	 * @param processInstanceId
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> traceProcess(String processInstanceId) throws Exception{

		Execution execution = runtimeService.createExecutionQuery().executionId(processInstanceId).singleResult();// 执行实例
		Object property = PropertyUtils.getProperty(execution, "activityId");
		String activityId = "";
		if (property != null) {
			activityId = property.toString();
		}
		ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
				.processInstanceId(processInstanceId).singleResult();
		ProcessDefinitionEntity processDefinition = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)
				.getDeployedProcessDefinition(processInstance.getProcessDefinitionId());
		List<ActivityImpl> activitiList = processDefinition.getActivities();// 获得当前任务的所有节点

		List<Map<String, Object>> activityInfos = new ArrayList<Map<String, Object>>();
		for (ActivityImpl activity : activitiList) {

			boolean currentActiviti = false;
			String id = activity.getId();

			// 当前节点
			if (id.equals(activityId)) {
				currentActiviti = true;
			}

			Map<String, Object> activityImageInfo = packageSingleActivitiInfo(activity, processInstance,
					currentActiviti);

			activityInfos.add(activityImageInfo);
		}
		return activityInfos;
	}
	
	public void loadByProcessInstance(String processInstanceId, HttpServletResponse response) throws Exception {
		InputStream resourceAsStream = null;
		ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
				.processInstanceId(processInstanceId).singleResult();
		ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
				.processDefinitionId(processInstance.getProcessDefinitionId()).singleResult();
		String resourceName = processDefinition.getDiagramResourceName();
		resourceAsStream = repositoryService.getResourceAsStream(processDefinition.getDeploymentId(), resourceName);
		byte[] b = new byte[1024];
		int len = -1;
		while ((len = resourceAsStream.read(b, 0, 1024)) != -1) {
			response.getOutputStream().write(b, 0, len);
		}
	}
	/**
	 * 封装输出信息，
	 * 
	 * @param activity
	 * @param processInstance
	 * @param currentActiviti
	 * @return
	 */
	public  Map<String, Object> packageSingleActivitiInfo(ActivityImpl activity, ProcessInstance processInstance,
			boolean currentActiviti) throws Exception {
		Map<String, Object> vars = new HashMap<String, Object>();
		Map<String, Object> activityInfo = new HashMap<String, Object>();
		activityInfo.put("currentActiviti", currentActiviti);
		activityInfo.put("x", activity.getX());
		activityInfo.put("y", activity.getY());
		activityInfo.put("width", activity.getWidth());
		activityInfo.put("height", activity.getHeight());

		vars.put("actname", activity.getProperties().get("name"));
		ActivityBehavior activityBehavior = activity.getActivityBehavior();

		if (activityBehavior instanceof UserTaskActivityBehavior) {
			Task currentTask = null;
			/*
			 * 当前节点的task
			 */
			if (currentActiviti) {
				currentTask = activitiService.getCurrentTaskInfo(processInstance);
			}
			/*
			 * 当前任务的分配角色
			 */
			UserTaskActivityBehavior userTaskActivityBehavior = (UserTaskActivityBehavior) activityBehavior;
			TaskDefinition taskDefinition = userTaskActivityBehavior.getTaskDefinition();
			Set<Expression> candidateGroupIdExpressions = taskDefinition.getCandidateGroupIdExpressions();
			if (!candidateGroupIdExpressions.isEmpty()) {
				// 任务的处理角色
				activitiService.setTaskGroup(vars, candidateGroupIdExpressions);
				// 当前处理人
				if (currentTask != null) {
					activitiService.setCurrentTaskAssignee(vars, currentTask);
				}
			}
		}
		activityInfo.put("vars", vars);
		return activityInfo;
	}
	/**
	 * 显示该流程已经办理过的任务节点
	 * 
	 * @param processInstId
	 * @return
	 */
	public JsonMessage select(String processInstId, String taskId) {
		List<HistoricTaskInstance> historicTaskInstanceList = historyService.createHistoricTaskInstanceQuery()
				.processInstanceId(processInstId).orderByHistoricActivityInstanceStartTime().asc().list();
		StringBuffer menuString = new StringBuffer();
		for (HistoricTaskInstance instance : historicTaskInstanceList) {
			menuString.append(" <li><a href=\"#\" onclick=\"backTo(\'" + instance.getId() + "\',\'" + taskId + "\')\">"
					+ instance.getName() + "</a></li>");
		}
		return new JsonMessage(true, menuString.toString());
	}
	/**
	 * 流程历史记录
	 * @param processInstanceId  流程实列ID
	 * @return
	 */

	 public  List<UserProcessbean> signRegisterInfo(String processInstanceId){
		 List<UserProcessbean> Processbeans = new ArrayList<UserProcessbean>();// 保存历史记录信息
		 HistoricProcessInstance processInstance= historyService.createHistoricProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
			List<HistoricTaskInstance> historicTaskInstanceList = historyService
				    .createHistoricTaskInstanceQuery().processInstanceId(processInstanceId).orderByTaskCreateTime().asc().list();
			for (HistoricTaskInstance historicTaskInstance : historicTaskInstanceList) {// 获取所有历史活动节点信息
				UserProcessbean processbean = new UserProcessbean();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				if (historicTaskInstance.getEndTime() != null) {
					String EndTime = sdf.format(historicTaskInstance.getEndTime());
					processbean.setTaskEndTime(EndTime);
				}
				if (historicTaskInstance.getStartTime() != null) {
					String StartTime = sdf.format(historicTaskInstance.getStartTime());
					processbean.setTaskCreateTime(StartTime);
				}
				 processbean.setTaskAssignee(historicTaskInstance.getAssignee());
				 processbean.setTaskName(historicTaskInstance.getName());
				 processbean.setStates("运行中");
				 List<Comment> comments= taskService.getProcessInstanceComments(processInstanceId);
				 for(Comment coment: comments){
					 if(historicTaskInstance.getId().equals(coment.getTaskId()) 
							           && coment.getType().equals("comment")){
						 processbean.setResult(coment.getFullMessage()!=null?coment.getFullMessage():""); 
					 }
				 }
				 String startUser =processInstance.getStartUserId();
				 processbean.setApplyName(startUser);// 申请人
				 Processbeans.add(processbean);
			}
	       return Processbeans;
	 }
		/**
		 * 获取流程模板默认会签人、抄送人
		 * @param taskId  流程任务ID
		 * @return
		 */
	     public List<TreeNode> getSignUser(String taskId,String type){
	    	 List<TreeNode> list=new ArrayList<>();
			if(taskId!=null && !"".equals(taskId)){
				  TaskFormData formData = formService.getTaskFormData(taskId);
				  String nodeId =formData.getTask().getTaskDefinitionKey();
				  ProcessNodeEntity  entity=processNodeEntityService.selectByPrimaryKey(nodeId);
				  if(entity!=null){
				    if(type.equals("signUser")){
				    	String signUser = entity.getSignuser();
				    	if(signUser!=null && !"".equals(signUser)){
					    	  String [] signUserArray =signUser.split(",");
					    	  for(int i=0 ;i<signUserArray.length; i++){
					    		TreeNode user=new TreeNode();
					    		user.setName(signUserArray[i]);
				    			user.setId(signUserArray[i]+type);
								user.setType(type);
								user.setTaskId(taskId);
								user.setOpen(true);
								list.add(user);
					    	  }
					       }
				    }
				    if(type.equals("copySendUser")){
				    	String copySendUser = entity.getTasksendcopyuser();
				    	if(copySendUser!=null && !"".equals(copySendUser)){
					    	  String [] copySendUserArray =copySendUser.split(",");
					    	  for(int i=0 ;i<copySendUserArray.length; i++){
					    		TreeNode user=new TreeNode();
					    		user.setName(copySendUserArray[i]);
				    			user.setId(copySendUserArray[i]+type);
								user.setType(type);
								user.setTaskId(taskId);
								user.setOpen(true);
								list.add(user);
					    	  }
					       }
				    }
				  }
			  }
			  return list;
		 }
		/**
		 * 审核待办件功能
		 * 
		 * @param processId  流程实列ID
		 * @param taskId    任务ID
		 * @param bID    业务ID
		 */
		public JsonMessage complete(String taskId,String bID,String users,HttpServletRequest request) {
			try {
			   if(StringUtils.isNoneEmpty(taskId) && !"undefined".equals(taskId)){
				    ProcessInstance processInstance = activitiService.getPIByTaskId(taskId);
				    if(processInstance!=null){   //审批批注信息
				    	addComment(processInstance,taskId,DoingFlow.Message);
				    }
				    List<Task> subTask =taskService.getSubTasks(taskId);    //查询会签子任务
			        if(subTask.size()>0 ){//该任务存在会签子任务
			    	   for(Task signTask :subTask){
			    		   taskService.complete(signTask.getId());
			    	   }
			    	}
			        List<Task> copyTask =taskService.createTaskQuery().taskDescription("抄送").list();
			        if(copyTask!=null ){//该任务存在抄送任务
			        	for(Task copytask :copyTask){
			        		 taskService.complete(copytask.getId());
				    	}
				    }
					taskService.complete(taskId,formData(taskId,request,bID));  //执行该任务complete方法
					cleanTaskCandidates(processInstance.getId(),users);   //设置下一步审核人并清除activity表中已经管理人员的信息
					return new JsonMessage(true,"提交成功!");
				}
			} catch (Exception e) {
				e.printStackTrace();
				return new JsonMessage(false,"提交失败!");
			}
			return null;
			
		}
		/**
		 * 还原主办人的会签任务列表
		 * @param taskId
		 */
//		public void restoreSign(Task signTask){
//		    	if(signTask.getExecutionId()!=null && !"".equals(signTask.getExecutionId())){  //流程运行时对象ID
//		    		Execution execution =runtimeService.createExecutionQuery().executionId(signTask.getExecutionId()).singleResult();//获取流程运行时对象
//		    		 if(execution!=null){
//	    				if(execution.getParentId()!=null && !"".equals(execution.getParentId())){
//			    			HistoricTaskInstance taskParent =historyService.createHistoricTaskInstanceQuery().executionId(execution.getParentId()).singleResult(); //父节点ID查询历史任务表
//				    		if(taskParent!=null){  //任务历史表中查询是否会签子任务
//				    			List<HistoricTaskInstance> taskInstances =historyService.createHistoricTaskInstanceQuery().taskParentTaskId(taskParent.getId()).list(); 
//				    			for(HistoricTaskInstance task: taskInstances){
//				    				  TaskEntity entity = (TaskEntity)taskService.newTask();  //将历史表会签任务拷贝到待办件中
//				    				  entity.setParentTaskId(task.getParentTaskId()); //上级Task
//				    				  entity.setName(task.getName());
//				    				  entity.setAssignee(task.getAssignee()); //会签用户
//				    				  entity.setProcessDefinitionId( task.getProcessDefinitionId() );
//				    				  entity.setProcessInstanceId( task.getProcessInstanceId() );
//				    				  entity.setDescription("会签");
//				    				  entity.setTaskDefinitionKey(task.getTaskDefinitionKey());
//				    				  entity.setFormKey(task.getFormKey());
//				    			      taskService.saveTask(entity);
//				    		 }
//			    	      }
//			    	   }
//		    		 }
//		    	
//		    }			
//		}

		/**
		 * 获取表单流程变量值
		 * @param taskId
		 * @param request
		 * @return
		 */
	   public Map<String, Object> formData(String taskId,HttpServletRequest request,String bID){
	    	    Map<String, Object> variables = new HashMap<String, Object>();
	    	    if(bID!=null && !"".equals(bID)){
		    	    	TaskFormData formData = formService.getTaskFormData(taskId);
						String processNodeId =formData.getTask().getTaskDefinitionKey();
						//获取表单中流程参数信息
						 ProcessNodeEntity  processNode=processNodeEntityService.selectByPrimaryKey(processNodeId);
						 if(StringUtils.isNotEmpty(processNodeId) && !"undefined".equals(processNodeId)){
							 if(processNode!=null){
								 //获取流程变量名称
								  List<Map<String, Object>> variableList =processVariableEntityService.selectBySQL("select variablename,variableval from process_variable where processid='" + processNode.getProcessid() + "' and procesnodeid='" + processNodeId + "'");
							       for(Map<String, Object> variable :variableList){
							    	//页面传给Map数组信息对比查询所有流程名称匹配
							    	 Map<String, String[]> parammap = request.getParameterMap();
								     if (!parammap.isEmpty()){
									     for (String key : parammap.keySet()) {
									    	 //判断页面流程变量名与数据库名是否相同相同放入Map参数中
									        if(key.equals(variable.get("variablename").toString())){
										           variables.put(key,parammap.get(key)[0]);
									          }
								       
									      }
									  } 
							      }
							   }
					    }
	    	     }
				 return variables;
	     }
	    /**
	     * 设置下一步审核人并清除activity表中已经管理人员的信息
	     */
	    public void cleanTaskCandidates(String processInstanceId,String users){
	    	List<Task> taskList=taskService.createTaskQuery().processInstanceId(processInstanceId).list(); //获取新Task记录
			if(taskList.size()>0){
				Task newTask = taskList.get(0);
				newTask.setAssignee(users);   //执行完complete将下一步Task审核人设置为选中人
				List<IdentityLink> userList = taskService.getIdentityLinksForTask(newTask.getId());//删除activity遗留表中记录
			    if(userList.size()>0){   //判断用户组表中信息是否为空
				   for(IdentityLink link :userList){
					   if(link.getGroupId()!=null &&  !"".equals(link.getGroupId())){ //判断activity遗留表是否候选者用户组
						     taskService.deleteCandidateGroup(link.getTaskId(), link.getGroupId()); //删除用户组信息
				         }
				       if("candidate".equals(link.getType()) && "".equals(link.getGroupId())){//判断activity遗留表是否候选者用户
					        taskService.deleteCandidateUser(link.getTaskId(), link.getUserId()); //删除候选者信息
					    }
				   }
			    }
			}
	    }
		/**
		 *  流程认领功能
		 *  @param taskId 任务ID
		 *  @param userId 用户ID
		 */
		public void claimTask(String taskId,String userId){
			activitiService.claimHandle(taskId, userId);
		}
		
		
		/**
		 *  流程委托功能
		 *  @param taskId 任务ID
		 *  @param userId 用户ID
		 */
		public void ownerHandle(String taskId,String userId){
			activitiService.ownerTask(taskId, userId);
		}
		/**
		 * 
		 * 已完结的任务
		 * @return
		 */
		public List<UserProcessbean> taskSelect(HttpServletRequest request)
				throws Exception {
			List<UserProcessbean> Processbeans = new ArrayList<UserProcessbean>();// 待审核任务
			String userId = String.valueOf(request.getSession().getAttribute("username"));
			// 根据登陆用户查询流程
			List<HistoricProcessInstance> list = historyService.createHistoricProcessInstanceQuery().involvedUser(userId).list();
			//以办结的任务列表
			if(null!=list&&!list.isEmpty()){
				for(HistoricProcessInstance historicProcessInstance:list){
					String Key = historicProcessInstance.getBusinessKey();
					List<HistoricTaskInstance> tasks=historyService.createHistoricTaskInstanceQuery().processInstanceId(historicProcessInstance.getId()).orderByTaskCreateTime().desc().list();
					UserProcessbean processbean = new UserProcessbean();
					if(null!=tasks&&!tasks.isEmpty()){
						//节点属性
						HistoricTaskInstance task=tasks.get(0);
						processbean.setTaskId(task.getId());
						processbean.setTaskName(task.getName());
						processbean.setTaskAssignee(task.getAssignee());
						processbean.setTaskCreateTime(DateUtil.format(task.getCreateTime(), "yyyy-MM-dd HH:mm:ss"));
						processbean.setStates("结束");
						if(null!=task.getEndTime()){
							processbean.setTaskEndTime(DateUtil.format(task.getEndTime(), "yyyy-MM-dd HH:mm:ss"));
						}
				    }
					//设置流程属性
					ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
							.processDefinitionId(historicProcessInstance.getProcessDefinitionId()).singleResult();
					processbean.setProcessid(historicProcessInstance.getId());
					String processname =historicProcessInstance.getName();
					String startUser =historicProcessInstance.getStartUserId();
					processbean.setEntityId(Key);
					processbean.setApplyName(startUser);// 申请人
					if(processname!=null && !"".equals(processname)){
						processbean.setPdfName(processname);
					}else{
						processbean.setPdfName(processDefinition.getName());
					}
					List<Map<String, Object>> selectBySQL = processEntityService
					.selectBySQL("SELECT id,typeid,pageName FROM t_p_process WHERE  id='"
							+ processDefinition.getKey() + "'");
					if (selectBySQL.size() > 0) {
						String processid = String.valueOf(selectBySQL.get(0).get("id"));
						String typeid = String.valueOf(selectBySQL.get(0).get("typeid"));
						String forname = String.valueOf(selectBySQL.get(0).get("pageName"));
						processbean.setEntityId(Key);
						processbean.setApplyform(forname);
						processbean.setTypeid(typeid);
						processbean.setProcesskey(processid);// 用于查看流程图
					}
			
					//压入集合
					Processbeans.add(processbean);
				}
			}
			return Processbeans;
			
			
			
			
//			for (HistoricProcessInstance historicProcessInstance : list) {// 已审核记录
//				String Key = historicProcessInstance.getBusinessKey();
//				List<HistoricActivityInstance> historicActivityInstanceList = historyService
//						.createHistoricActivityInstanceQuery().processInstanceId(historicProcessInstance.getId()).finished().orderByHistoricActivityInstanceStartTime().asc().list();
//				for (HistoricActivityInstance historicActivityInstance : historicActivityInstanceList) {// 判断流程是否已经结束
//					UserProcessbean processbean = new UserProcessbean();
//					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//					if (historicActivityInstance.getEndTime() != null) {
//						String EndTime = sdf.format(historicActivityInstance.getEndTime());
//						processbean.setTaskEndTime(EndTime);
//					}
//					if (historicActivityInstance.getStartTime() != null) {
//						String StartTime = sdf.format(historicActivityInstance.getStartTime());
//						processbean.setTaskCreateTime(StartTime);
//					}
//					if (historicActivityInstance.getActivityName().equals("End")) {// 流程走到结束节点
//						processbean.setTaskName("任务结束");
//						processbean.setTaskAssignee("已完结");
//						processbean.setStates("结束");
//					} else if (historicActivityInstance.getActivityName().equals("Start1")) {
//						processbean.setTaskName("任务开始");
//						processbean.setStates("开始");
//						processbean.setTaskAssignee(historicProcessInstance.getStartUserId());
//					} else {
//						processbean.setTaskName(historicActivityInstance.getActivityName());
//						processbean.setStates("进行中");
//						processbean.setTaskAssignee(historicActivityInstance.getAssignee());
//					}
//					String startUser =historicProcessInstance.getStartUserId();
//					processbean.setApplyName(startUser);// 申请人
//					processbean.setEntityId(Key);
//					processbean.setProcessid(historicProcessInstance.getId());
//					processbean.setTaskId(historicActivityInstance.getTaskId());
//					ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
//							.processDefinitionId(historicProcessInstance.getProcessDefinitionId()).singleResult();
//					//通过流程历史实列获取流程名称
//					String processname =historicProcessInstance.getName();
//					if(processname!=null && !"".equals(processname)){
//						processbean.setPdfName(processname);
//					}else{
//						processbean.setPdfName(processDefinition.getName());
//					}
//					List<Map<String, Object>> selectBySQL = processEntityService
//							.selectBySQL("SELECT id,typeid,pageName FROM t_p_process WHERE  id='"
//									+ processDefinition.getKey() + "'");
//					if (selectBySQL.size() > 0) {
//						String processid = String.valueOf(selectBySQL.get(0).get("id"));
//						String typeid = String.valueOf(selectBySQL.get(0).get("typeid"));
//						String forname = String.valueOf(selectBySQL.get(0).get("pageName"));
//						processbean.setEntityId(Key);
//						processbean.setApplyform(forname);
//						processbean.setTypeid(typeid);
//						processbean.setProcesskey(processid);// 用于查看流程图
//					}
//					Processbeans.add(processbean);
//				}
//				
//			}
//			return Processbeans;
		}
		
		/**
		 * 回退到上一步
		 * @param procInstId
		 * @param user
		 * @return
		 */
		public JsonMessage undoTask(String procInstId){
			    List<Task> activeTasks = taskService.createTaskQuery()
			        .processInstanceId(procInstId).active().list();
			    if(activeTasks == null ){
			    	return new JsonMessage(false,"流程活动任务不存在，无法回退!");
			    }
			    Task task = activeTasks.get(0); //当前任务节点
			    if(task == null ){
			    	return new JsonMessage(false,"无法获取当前任务，无法回退!");
			    }
			    List<Task> subTask =taskService.getSubTasks(task.getId());
			    
			    if(subTask.size()>0){
			    	return new JsonMessage(false,"会签任务节点，无法回退!");      			    	
			    }
			    if(task.getParentTaskId()!=null && !"".equals(task.getParentTaskId())){
			    	return new JsonMessage(false,"会签任务，无法回退!");      	
			    }
			    List<HistoricTaskInstance> histTaskList = historyService.createHistoricTaskInstanceQuery().finished().orderByHistoricTaskInstanceEndTime().desc().listPage(0, 1);
			    HistoricTaskInstance histTask = (histTaskList==null||histTaskList.isEmpty())?null:histTaskList.get(0);
			    if( histTask == null )
			    	return new JsonMessage(false,"历史任务不存在，无法回退!");
			   
			    if( histTask.getAssignee() == null)
			    	return new JsonMessage(false,"其它操作用户已完成了新任务，无法回退!");
			         //流程转向
			    if(task!=null)
			    	Authentication.setAuthenticatedUserId(task.getAssignee());  //退回用户ID
				    addComment(activitiService.getPIByTaskId(task.getId()),task.getId(),DoingFlow.BackTo);// 保存退回意见
			        String newTaskId =turnTransition(task,histTask,null);
			    
			        return new JsonMessage(true,newTaskId); 
	   }
		/**
		 * 判断是否会签抄送
		 * @param taskId
		 */
		public JsonMessage isFlag(String taskId){
			    Task task =taskService.createTaskQuery().taskId(taskId).singleResult();
		    	if(task.getParentTaskId()!=null && !"".equals(task.getParentTaskId())){
		    		return new JsonMessage(false,"sign");
		    	}
		    	List<IdentityLink> userList = taskService.getIdentityLinksForTask(taskId);
		    	if(userList.size()>0){
		    		return new JsonMessage(false,"copy");
				}
		    	 return new JsonMessage(true,"pass");
		    }
		
		/**
	     * 流程转向操作
	     * 
	     * @param task Task 当前任务
	     * @param targetActivityId 目标节点任务ID
	     * @param variables 流程变量
	     */ 
	    protected String turnTransition(Task task,HistoricTaskInstance histTask, Map<String, Object> variables){ 
	    if( task == null || !(task instanceof TaskEntity))
	         return "";
	        // 当前节点 
	        ActivityImpl currActivity = getActivityImpl(task, null); 
	        // 清空当前流向 
	        List<PvmTransition> oriPvmTransitionList = clearTransition(currActivity); 
	        // 创建新流向 
	        TransitionImpl newTransition = currActivity.createOutgoingTransition(); 
	        // 目标节点 
	        ActivityImpl targetActivity = getActivityImpl(task, histTask.getTaskDefinitionKey()); 
	        // 设置新流向的目标节点 
	        newTransition.setDestination( targetActivity ); 
	        // 执行转向任务 
	        taskService.complete(task.getId(), variables); 
	        //获取新Task
	        TaskQuery query = taskService.createTaskQuery().active().processInstanceId(task.getProcessInstanceId());
	        Task newTask=query.singleResult();
	        if( newTask != null ){
	          //新任务从流程定义恢复，原签收人从历史任务中得到
	          taskService.claim(newTask.getId(), histTask.getAssignee() );
	        }
	        // 删除目标节点新流入 
	        targetActivity.getIncomingTransitions().remove(newTransition); 
	        // 还原以前流向 
	        restoreTransition(currActivity, oriPvmTransitionList); 
	        return newTask.getId()+","+histTask.getId();
	    } 
	    /**
	     * 活动节点
	     */
	    protected ActivityImpl getActivityImpl(Task task, String activityId ){
	      if( task == null )
	        return null;
	    if( StringUtils.isEmpty(activityId) )
	        activityId = task.getTaskDefinitionKey();
	      //流程定义
	    ProcessDefinitionEntity processDef = (ProcessDefinitionEntity)
	        ((RepositoryServiceImpl) repositoryService)
	                .getDeployedProcessDefinition( task.getProcessDefinitionId()  );
	    if( processDef == null )
	      return null;
	   
	    return ((ProcessDefinitionImpl)processDef).findActivity(activityId);
	    }

	    /**
	     * 当前活动Task
	     * @param processId 流程实例ID
	     */
	    protected Task getCurrentTask( String processId ){
	      TaskQuery query = taskService.createTaskQuery();
	      query.active();
	      query.processInstanceId(processId).listPage(0,1);
	     
	      return query.singleResult();
	    }

	    /** 
	     * @param taskId 
	     *            当前任务ID 
	     * @param variables 
	     *            流程变量 
	     * @param activityId 
	     *            流程转向执行任务节点ID<br> 
	     *            此参数为空，默认为提交操作 
	     * @throws Exception 
	     */  
	    public void commitProcess(String taskId, Map<String, Object> variables,  
	            String activityId) throws Exception {  
	        if (variables == null) {  
	            variables = new HashMap<String, Object>();  
	        }  
	        // 跳转节点为空，默认提交操作  
	        if (activityId==null) {  
	            taskService.complete(taskId, variables);  
	        } else {// 流程转向操作  
	            turnTransition(taskId, activityId, variables);  
	        }  
	    }  
	  
	    /** 
	     * 清空指定活动节点流向 
	     *  
	     * @param activityImpl 
	     *            活动节点 
	     * @return 节点流向集合 
	     */  
	    private List<PvmTransition> clearTransition(ActivityImpl activityImpl) {  
	        // 存储当前节点所有流向临时变量  
	        List<PvmTransition> oriPvmTransitionList = new ArrayList<PvmTransition>();  
	        // 获取当前节点所有流向，存储到临时变量，然后清空  
	        List<PvmTransition> pvmTransitionList = activityImpl  
	                .getOutgoingTransitions();  
	        for (PvmTransition pvmTransition : pvmTransitionList) {  
	            oriPvmTransitionList.add(pvmTransition);  
	        }  
	        pvmTransitionList.clear();  
	  
	        return oriPvmTransitionList;  
	    }  
	  
	    /** 
	     * 还原指定活动节点流向 
	     *  
	     * @param activityImpl 
	     *            活动节点 
	     * @param oriPvmTransitionList 
	     *            原有节点流向集合 
	     */  
	    private void restoreTransition(ActivityImpl activityImpl,  
	            List<PvmTransition> oriPvmTransitionList) {  
	        // 清空现有流向  
	        List<PvmTransition> pvmTransitionList = activityImpl  
	                .getOutgoingTransitions();  
	        pvmTransitionList.clear();  
	        // 还原以前流向  
	        for (PvmTransition pvmTransition : oriPvmTransitionList) {  
	            pvmTransitionList.add(pvmTransition);  
	        }  
	    }  
	  
	    /** 
	     * 流程转向操作 
	     *  
	     * @param taskId 
	     *            当前任务ID 
	     * @param activityId 
	     *            目标节点任务ID 
	     * @param variables 
	     *            流程变量 
	     * @throws Exception 
	     */  
	    private void turnTransition(String taskId, String activityId,  
	            Map<String, Object> variables) throws Exception {  
	        // 当前节点  
	        ActivityImpl currActivity = findActivitiImpl(taskId, null);  
	        // 清空当前流向  
	        List<PvmTransition> oriPvmTransitionList = clearTransition(currActivity);  
	  
	        // 创建新流向  
	        TransitionImpl newTransition = currActivity.createOutgoingTransition();  
	        // 目标节点  
	        ActivityImpl pointActivity = findActivitiImpl(taskId, activityId);  
	        // 设置新流向的目标节点  
	        newTransition.setDestination(pointActivity);  
	  
	        // 执行转向任务  
	        taskService.complete(taskId, variables);  
	        // 删除目标节点新流入  
	        pointActivity.getIncomingTransitions().remove(newTransition);  
	  
	        // 还原以前流向  
	        restoreTransition(currActivity, oriPvmTransitionList);  
	    }  
	  

	    /** 
	     * ***************************************************************************************************************************************************<br> 
	     * ************************************************以下为查询流程驳回节点核心逻辑***************************************************************************<br> 
	     * ***************************************************************************************************************************************************<br> 
	     */  
	  
	    /** 
	     * 迭代循环流程树结构，查询当前节点可驳回的任务节点 
	     *  
	     * @param taskId 
	     *            当前任务ID 
	     * @param currActivity 
	     *            当前活动节点 
	     * @param rtnList 
	     *            存储回退节点集合 
	     * @param tempList 
	     *            临时存储节点集合（存储一次迭代过程中的同级userTask节点） 
	     * @return 回退节点集合 
	     */  
	    public List<ActivityImpl> iteratorBackActivity(String taskId,  
	            ActivityImpl currActivity, List<ActivityImpl> rtnList,  
	            List<ActivityImpl> tempList) throws Exception {  
	        // 查询流程定义，生成流程树结构  
	        ProcessInstance processInstance = findProcessInstanceByTaskId(taskId);  
	  
	        // 当前节点的流入来源  
	        List<PvmTransition> incomingTransitions = currActivity  
	                .getIncomingTransitions();  
	        // 条件分支节点集合，userTask节点遍历完毕，迭代遍历此集合，查询条件分支对应的userTask节点  
	        List<ActivityImpl> exclusiveGateways = new ArrayList<ActivityImpl>();  
	        // 并行节点集合，userTask节点遍历完毕，迭代遍历此集合，查询并行节点对应的userTask节点  
	        List<ActivityImpl> parallelGateways = new ArrayList<ActivityImpl>();  
	        // 遍历当前节点所有流入路径  
	        for (PvmTransition pvmTransition : incomingTransitions) {  
	            TransitionImpl transitionImpl = (TransitionImpl) pvmTransition;  
	            ActivityImpl activityImpl = transitionImpl.getSource();  
	            String type = (String) activityImpl.getProperty("type");  
	            /** 
	             * 并行节点配置要求：<br> 
	             * 必须成对出现，且要求分别配置节点ID为:XXX_start(开始)，XXX_end(结束) 
	             */  
	            if ("parallelGateway".equals(type)) {// 并行路线  
	                String gatewayId = activityImpl.getId();  
	                String gatewayType = gatewayId.substring(gatewayId  
	                        .lastIndexOf("_") + 1);  
	                if ("START".equals(gatewayType.toUpperCase())) {// 并行起点，停止递归  
	                    return rtnList;  
	                } else {// 并行终点，临时存储此节点，本次循环结束，迭代集合，查询对应的userTask节点  
	                    parallelGateways.add(activityImpl);  
	                }  
	            } else if ("startEvent".equals(type)) {// 开始节点，停止递归  
	                return rtnList;  
	            } else if ("userTask".equals(type)) {// 用户任务  
	                tempList.add(activityImpl);  
	            } else if ("exclusiveGateway".equals(type)) {// 分支路线，临时存储此节点，本次循环结束，迭代集合，查询对应的userTask节点  
	                currActivity = transitionImpl.getSource();  
	                exclusiveGateways.add(currActivity);  
	            }  
	        }  
	  
	        /** 
	         * 迭代条件分支集合，查询对应的userTask节点 
	         */  
	        for (ActivityImpl activityImpl : exclusiveGateways) {  
	            iteratorBackActivity(taskId, activityImpl, rtnList, tempList);  
	        }  
	  
	        /** 
	         * 迭代并行集合，查询对应的userTask节点 
	         */  
	        for (ActivityImpl activityImpl : parallelGateways) {  
	            iteratorBackActivity(taskId, activityImpl, rtnList, tempList);  
	        }  
	  
	        /** 
	         * 根据同级userTask集合，过滤最近发生的节点 
	         */  
	        currActivity = filterNewestActivity(processInstance, tempList);  
	        if (currActivity != null) {  
	            // 查询当前节点的流向是否为并行终点，并获取并行起点ID  
	            String id = findParallelGatewayId(currActivity);  
	            if (id==null) {// 并行起点ID为空，此节点流向不是并行终点，符合驳回条件，存储此节点  
	                rtnList.add(currActivity);  
	            } else {// 根据并行起点ID查询当前节点，然后迭代查询其对应的userTask任务节点  
	                currActivity = findActivitiImpl(taskId, id);  
	            }  
	  
	            // 清空本次迭代临时集合  
	            tempList.clear();  
	            // 执行下次迭代  
	            iteratorBackActivity(taskId, currActivity, rtnList, tempList);  
	        }  
	        return rtnList;  
	    }  
	  
	    /** 
	     * 反向排序list集合，便于驳回节点按顺序显示 
	     *  
	     * @param list 
	     * @return 
	     */  
	    public List<ActivityImpl> reverList(List<ActivityImpl> list) {  
	        List<ActivityImpl> rtnList = new ArrayList<ActivityImpl>();  
	        // 由于迭代出现重复数据，排除重复  
	        for (int i = list.size(); i > 0; i--) {  
	            if (!rtnList.contains(list.get(i - 1)))  
	                rtnList.add(list.get(i - 1));  
	        }  
	        return rtnList;  
	    }  
	  
	    /** 
	     * 根据当前节点，查询输出流向是否为并行终点，如果为并行终点，则拼装对应的并行起点ID 
	     *  
	     * @param activityImpl 
	     *            当前节点 
	     * @return 
	     */  
	    private String findParallelGatewayId(ActivityImpl activityImpl) {  
	        List<PvmTransition> incomingTransitions = activityImpl  
	                .getOutgoingTransitions();  
	        for (PvmTransition pvmTransition : incomingTransitions) {  
	            TransitionImpl transitionImpl = (TransitionImpl) pvmTransition;  
	            activityImpl = transitionImpl.getDestination();  
	            String type = (String) activityImpl.getProperty("type");  
	            if ("parallelGateway".equals(type)) {// 并行路线  
	                String gatewayId = activityImpl.getId();  
	                String gatewayType = gatewayId.substring(gatewayId  
	                        .lastIndexOf("_") + 1);  
	                if ("END".equals(gatewayType.toUpperCase())) {  
	                    return gatewayId.substring(0, gatewayId.lastIndexOf("_"))  
	                            + "_start";  
	                }  
	            }  
	        }  
	        return null;  
	    }  
	  
	    /** 
	     * 根据流入任务集合，查询最近一次的流入任务节点 
	     *  
	     * @param processInstance 
	     *            流程实例 
	     * @param tempList 
	     *            流入任务集合 
	     * @return 
	     */  
	    private ActivityImpl filterNewestActivity(ProcessInstance processInstance,  
	            List<ActivityImpl> tempList) {  
	        while (tempList.size() > 0) {  
	            ActivityImpl activity_1 = tempList.get(0);  
	            HistoricActivityInstance activityInstance_1 = findHistoricUserTask(  
	                    processInstance, activity_1.getId());  
	            if (activityInstance_1 == null) {  
	                tempList.remove(activity_1);  
	                continue;  
	            }  
	  
	            if (tempList.size() > 1) {  
	                ActivityImpl activity_2 = tempList.get(1);  
	                HistoricActivityInstance activityInstance_2 = findHistoricUserTask(  
	                        processInstance, activity_2.getId());  
	                if (activityInstance_2 == null) {  
	                    tempList.remove(activity_2);  
	                    continue;  
	                }  
	  
	                if (activityInstance_1.getEndTime().before(  
	                        activityInstance_2.getEndTime())) {  
	                    tempList.remove(activity_1);  
	                } else {  
	                    tempList.remove(activity_2);  
	                }  
	            } else {  
	                break;  
	            }  
	        }  
	        if (tempList.size() > 0) {  
	            return tempList.get(0);  
	        }  
	        return null;  
	    }  
	  
	    /** 
	     * 查询指定任务节点的最新记录 
	     *  
	     * @param processInstance 
	     *            流程实例 
	     * @param activityId 
	     * @return 
	     */  
	    private HistoricActivityInstance findHistoricUserTask(  
	            ProcessInstance processInstance, String activityId) {  
	        HistoricActivityInstance rtnVal = null;  
	        // 查询当前流程实例审批结束的历史节点  
	        List<HistoricActivityInstance> historicActivityInstances = historyService  
	                .createHistoricActivityInstanceQuery().activityType("userTask")  
	                .processInstanceId(processInstance.getId()).activityId(  
	                        activityId).finished()  
	                .orderByHistoricActivityInstanceEndTime().desc().list();  
	        if (historicActivityInstances.size() > 0) {  
	            rtnVal = historicActivityInstances.get(0);  
	        }  
	  
	        return rtnVal;  
	    }  
	  
	  
	    /** 
	     * 根据任务ID获得任务实例 
	     *  
	     * @param taskId 
	     *            任务ID 
	     * @return 
	     * @throws Exception 
	     */  
	    public TaskEntity findTaskById(String taskId) throws Exception {  
	        TaskEntity task = (TaskEntity) taskService.createTaskQuery().taskId(  
	                taskId).singleResult();  
	        if (task == null) {  
	            throw new Exception("任务实例未找到!");  
	        }  
	        return task;  
	    }  
	  
	    /** 
	     * 根据流程实例ID和任务key值查询所有同级任务集合 
	     *  
	     * @param processInstanceId 
	     * @param key 
	     * @return 
	     */  
	    public List<Task> findTaskListByKey(String processInstanceId, String key) {  
	        return taskService.createTaskQuery().processInstanceId(  
	                processInstanceId).taskDefinitionKey(key).list();  
	    }  
	  
	    /** 
	     * 根据任务ID获取对应的流程实例 
	     *  
	     * @param taskId 
	     *            任务ID 
	     * @return 
	     * @throws Exception 
	     */  
	    public ProcessInstance findProcessInstanceByTaskId(String taskId)  
	            throws Exception {  
	        // 找到流程实例  
	        ProcessInstance processInstance = runtimeService  
	                .createProcessInstanceQuery().processInstanceId(  
	                        findTaskById(taskId).getProcessInstanceId())  
	                .singleResult();  
	        if (processInstance == null) {  
	            throw new Exception("流程实例未找到!");  
	        }  
	        return processInstance;  
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
	            String taskId) throws Exception {  
	        // 取得流程定义  
	        ProcessDefinitionEntity processDefinition = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)  
	                .getDeployedProcessDefinition(findTaskById(taskId)  
	                        .getProcessDefinitionId());  
	  
	        if (processDefinition == null) {  
	            throw new Exception("流程定义未找到!");  
	        }  
	  
	        return processDefinition;  
	    }  
	  
	    /** 
	     * 根据任务ID和节点ID获取活动节点 <br> 
	     *  
	     * @param taskId 
	     *            任务ID 
	     * @param activityId 
	     *            活动节点ID <br> 
	     *            如果为null或""，则默认查询当前活动节点 <br> 
	     *            如果为"end"，则查询结束节点 <br> 
	     *  
	     * @return 
	     * @throws Exception 
	     */  
	    public ActivityImpl findActivitiImpl(String taskId, String activityId)  
	            throws Exception {  
	        // 取得流程定义  
	        ProcessDefinitionEntity processDefinition = findProcessDefinitionEntityByTaskId(taskId);  
	  
	        // 获取当前活动节点ID  
	        if (activityId==null) {  
	            activityId = findTaskById(taskId).getTaskDefinitionKey();  
	        }  
	  
	        // 根据流程定义，获取该流程实例的结束节点  
	        if (activityId.toUpperCase().equals("END")) {  
	            for (ActivityImpl activityImpl : processDefinition.getActivities()) {  
	                List<PvmTransition> pvmTransitionList = activityImpl  
	                        .getOutgoingTransitions();  
	                if (pvmTransitionList.isEmpty()) {  
	                    return activityImpl;  
	                }  
	            }  
	        }  
	  
	        // 根据节点ID，获取对应的活动节点  
	        ActivityImpl activityImpl = ((ProcessDefinitionImpl) processDefinition)  
	                .findActivity(activityId);  
	  
	        return activityImpl;  
	    }



	/**
	 * 下一个任务节点信息,
	 *
	 * 如果下一个节点为用户任务则直接返回,
	 *
	 * 如果下一个节点为排他网关, 获取排他网关Id信息, 根据排他网关Id信息和execution获取流程实例排他网关Id为key的变量值,
	 * 根据变量值分别执行排他网关后线路中的el表达式, 并找到el表达式通过的线路后的用户任务信息
	 * @param activityImpl     流程节点信息
	 * @param activityId       当前流程节点Id信息
	 * @param elString         排他网关顺序流线段判断条件, 例如排他网关顺序留线段判断条件为${money>1000}, 若满足流程启动时设置variables中的money>1000, 则流程流向该顺序流信息
	 * @param processInstanceId  流程实例Id信息
	 * @return
	 */
	private TaskDefinition nextTaskDefinition(ActivityImpl activityImpl, String activityId, String [] values, String processInstanceId,String [] keys){

		PvmActivity ac = null;
		Object s = null;

		//如果遍历节点为用户任务并且节点不是当前节点信息
		if("userTask".equals(activityImpl.getProperty("type")) && !activityId.equals(activityImpl.getId())){
			//获取该节点下一个节点信息
			TaskDefinition taskDefinition = ((UserTaskActivityBehavior)activityImpl.getActivityBehavior()).getTaskDefinition();
			return taskDefinition;
		}else{
			//获取节点所有流向线路信息
			List<PvmTransition> outTransitions = activityImpl.getOutgoingTransitions();
			List<PvmTransition> outTransitionsTemp = null;
			for(PvmTransition tr : outTransitions){
				ac = tr.getDestination(); //获取线路的终点节点
				//如果流向线路为排他网关
				if("exclusiveGateway".equals(ac.getProperty("type")))
				{
					outTransitionsTemp = ac.getOutgoingTransitions();

					//如果排他网关只有一条线路信息
					if(outTransitionsTemp.size() == 1)
					{
						return nextTaskDefinition((ActivityImpl)outTransitionsTemp.get(0).getDestination(), activityId, values, processInstanceId,keys);
					}
					else if(outTransitionsTemp.size() > 1)//如果排他网关有多条线路信息
					{
						for(PvmTransition tr1 : outTransitionsTemp){
							s = tr1.getProperty("conditionText");  //获取排他网关线路判断条件信息

							if(isCondition(s.toString().trim(), values, keys)) //判断el表达式是否成立
							{
								return nextTaskDefinition((ActivityImpl)tr1.getDestination(), activityId, values, processInstanceId,keys);
							}
						}
					}
				}
				else if("userTask".equals(ac.getProperty("type")))
				{
					return ((UserTaskActivityBehavior)((ActivityImpl)ac).getActivityBehavior()).getTaskDefinition();
				}
			}
			return null;
		}
	}

	/**
	 * 查询流程启动时设置排他网关判断条件信息
	 * @param gatewayId          排他网关Id信息, 流程启动时设置网关路线判断条件key为网关Id信息
	 * @param processInstanceId  流程实例Id信息
	 * @return
	 */
	public String getGatewayCondition(String gatewayId, String processInstanceId) {
		Execution execution = runtimeService.createExecutionQuery().processInstanceId(processInstanceId).singleResult();
		return runtimeService.getVariable(execution.getId(), gatewayId).toString();
	}

	/**
	 * 根据key和value判断el表达式是否通过信息
	 * @param  key    el表达式key信息
	 * @param  el     el表达式信息
	 * @param  values  el表达式传入值信息
	 * @return
	 */
	public boolean isCondition(String el, String [] values,String [] keys) {
		ExpressionFactory factory = new ExpressionFactoryImpl();
		SimpleContext context = new SimpleContext();

		for(int i = 0;i<keys.length;i++) {
			context.setVariable(keys[i], factory.createValueExpression(values[i], String.class));
		}



		ValueExpression e = factory.createValueExpression(context, el, boolean.class);
		return (Boolean) e.getValue(context);
	}



	public List<TreeNode>  getFlowApprovalPerson(String taskId,String [] keys,String [] values) {
		ActivityImpl activityImpl = null;
		ProcessDefinitionEntity processDefinitionEntity = null;
		TaskDefinition definition = null;

		String processInstanceId = taskService.createTaskQuery().taskId(taskId).singleResult().getProcessInstanceId();
		String definitionId = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult().getProcessDefinitionId();
		processDefinitionEntity = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService).getDeployedProcessDefinition(definitionId);
		ExecutionEntity execution = (ExecutionEntity) runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();

		String activitiId = execution.getActivityId();//当前流程节点Id信息


		List<ActivityImpl> activitiList = processDefinitionEntity.getActivities(); //获取流程所有节点信息
		for(ActivityImpl activity : activitiList){//遍历所有节点信息
			String id = activity.getId();
			if (activitiId.equals(id)) {
				activityImpl = activity;
			}
		}

		if(values != null && values.length > 0) { //有流程分支
			definition = nextTaskDefinition(activityImpl, activitiId, values, taskId,keys);
		} else {
			definition = nextTaskDefinition(activityImpl, activityImpl.getId(), null, processInstanceId,null);
		}

		List<TreeNode> treeNodes = new ArrayList<TreeNode>();
		if(definition != null) {
			Expression expression = definition.getAssigneeExpression();
			Set<Expression> groupIdExpressions = definition.getCandidateGroupIdExpressions();
			Set<Expression> userIdExpressions = definition.getCandidateUserIdExpressions();

			if(expression != null) { //审批人
				String name = expression.getExpressionText();
				TreeNode user=new TreeNode();
				user.setName(name);
				user.setType("assignee");
				user.setOpen(true);
				treeNodes.add(user);
			}

			if(groupIdExpressions != null && groupIdExpressions.size() > 0) {
				Iterator<Expression> iterator = groupIdExpressions.iterator();
				while (iterator.hasNext()) {
					Expression expression1 = iterator.next();
					TreeNode user=new TreeNode();
					user.setName(expression1.getExpressionText());
					user.setOpen(true);
					user.setType("candidateGroups");
					treeNodes.add(user);
				}
			}

			if(userIdExpressions != null && userIdExpressions.size() > 0) {
				Iterator<Expression> iterator = userIdExpressions.iterator();
				while (iterator.hasNext()) {
					Expression expression1 = iterator.next();
					TreeNode user=new TreeNode();
					user.setName(expression1.getExpressionText());
					user.setOpen(true);
					user.setType("candidateUsers");
					treeNodes.add(user);
				}
			}
		} else {
			TreeNode user=new TreeNode();
			user.setOpen(false);
			treeNodes.add(user);
		}
		return treeNodes;
	}

}
