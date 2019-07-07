package cn.hy.flowmanage.service;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.delegate.Expression;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.persistence.entity.TaskEntity;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Comment;
import org.activiti.engine.task.Task;
import cn.hy.common.vo.JsonMessage;
import cn.hy.flowmanage.pojo.ProcessNodeEntity;
import cn.hy.flowmanage.pojo.ProcessVariableEntity;

/**
 * 
 * @author nmc/lxz
 * 
 */

public interface IActivitiService {
	/**
	 * 部署流程
	 * 
	 * @param resourceName
	 *            流程资源名称
	 * @param inputStream
	 *            （画完模板生成的xml）
	 * @param name
	 *            流程名称(如请假流程)
	 * @return
	 */
	public Deployment deployFlow(String resourceName, InputStream inputStream,
			String name);

	/**
	 * 启动流程
	 * 
	 * @param entityId
	 *            与activiti表的关联key（相当于businessKey）
	 * @param processDefinitionKey
	 * @param variables
	 * @return
	 */
	public ProcessInstance startFlow(
			String processDefinitionKey, String userId);

	/**
	 * 读取运行中的流程实例
	 * 
	 * @param processkey
	 *            相当于businessKey
	 * @param clazz
	 *            模板实体（如请假模板有请假实体）
	 * @return
	 */
	public String taskRunning(String userId);

	/**
	 * 关联实体到activiti
	 * 
	 * @param userId
	 */
	public void setAuthenticatedUserId(String userId);

	/**
	 * 读取运行中的流程
	 * 
	 * @param processkey
	 * @param clazz
	 * @param userId
	 * @return
	 */
	public String taskRunning(String processkey, Class<Object> clazz,
			String userId);

	/**
	 * 查询流程定义
	 * 
	 * @param processkey
	 * @return
	 */
	public ProcessDefinition createProcessDefinitionQuery(String processkey);

	/**
	 * 查询该流程待签收任务(全部待审核任务)
	 * 
	 * @param pdf
	 * @return
	 */
	public List<Task> toClaimList(ProcessDefinition pdf);

	/**
	 * 查询该流程对应已审核任务(全部已审核任务)
	 * 
	 * @param pdf
	 * @return
	 */
	public List<HistoricTaskInstance> finishedlist(ProcessDefinition pdf);

	/**
	 * 任务对应的流程
	 * 
	 * @param task
	 * @return
	 */
	public ProcessDefinition getProcessDefinition(Task task);

	/**
	 * 已审核记录对应的历史流程实例
	 * 
	 * @param historicTaskInstance
	 * @return
	 */
	public HistoricProcessInstance createHistoricProcessInstanceQuery(
			HistoricTaskInstance historicTaskInstance);

	/**
	 * 查询已完成任务对应的流程
	 * 
	 * @param historicProcessInstance
	 * @return
	 */
	/**
	 * 获取审核结果和批注信息
	 * 
	 * @param historicTaskInstance
	 * @return
	 */
	public List<Comment> getTaskComments(
			HistoricTaskInstance historicTaskInstance);

	public ProcessDefinition getProcessDefinition(
			HistoricTaskInstance historicTaskInstance);

	/**
	 * 根据taskId得到ProcessInstance
	 */
	/**
	 * 获取关联实体
	 * 
	 * @param historicProcessInstance
	 * @return
	 */
	public String getBusinessKey(HistoricProcessInstance historicProcessInstance);

	/**
	 * 获取taskid
	 * 
	 * @param historicTaskInstance
	 * @return
	 */
	public String getTaskId(HistoricTaskInstance historicTaskInstance);

	public ProcessInstance getPIByTaskId(String taskId);

	/**
	 * 删除流程以及与其关联的数据
	 * 
	 * @param processId
	 *            流程ID
	 * @return
	 */
	public boolean deleteProcess(String processId);

	/**
	 * 删除部署的流程
	 * 
	 * @param deployment
	 * @return
	 */
	public boolean deleteDeployment(Deployment deployment);

	/**
	 * 查询流程部署
	 * 
	 * @param tpProcess
	 *            流程模板实体，Processkey属性可以查询到流程部署
	 * @return
	 */
	public Deployment createDeploymentQuery(ProcessNodeEntity tpProcess);

	/**
	 * 查询当前已办理代办件
	 * 
	 * @param userId
	 *            当前用户ID
	 * @param processkey当前流程key值
	 * @param processId当前流程ID
	 */
	public List<ProcessInstance> runningtask(String processkey);

	/**
	 * 查询当前未办理代办件
	 * 
	 * @param userId
	 *            当前用户ID
	 * @param processkey当前流程key值
	 * @param processId当前流程ID
	 */
	public List<Task> doingtask(String userId);

	/**
	 * 查询所有运行流程数据
	 * 
	 * @param processkey当前流程key值
	 */
	public List<ProcessInstance> processInstanceList(String processkey);

	/**
	 * 签收信息
	 * 
	 * @param taskId
	 *            任务ID
	 */
	public void claimHandle(String taskId, String userId);

	/**
	 * 完成审批当前待办件任务
	 * 
	 *            当前用户ID
	 * @param processId当前流程ID
	 */

	 public void completeTask(String taskId, Map<String, Object> variables);
    

	/**
	 * 读取业务表单详细数据
	 * 
	 * @param 业务ID
	 * @param taskId
	 *            任务ID
	 * @return
	 */
	public Class<Object> getEntityDetail(Long id, String taskId);

	public ProcessDefinition getProcessDefinition(String processDefinitionId);

	/**
	 * 执行流程挂起、激活流程实例
	 * 
	 * @param state
	 *            流程状态是否挂起或者激活。
	 * @param processDefinitionId
	 *            流程定义ID
	 */
	public void updateState(String state, String processDefinitionId);

	/**
	 * 获取流程变量
	 * 
	 * @param taskId
	 *            根据任务ID获取流程相关变量
	 */
	public Map<String, Object> getProcessVariables(String taskId);

	/**
	 * 获取任务列表 processInstanceId 流程实列ID
	 */
	public List<Task> TaskQueryList(String userId);

	/**
	 * 获取已完成任务列表 processkey 流程实列key
	 */
	public List<HistoricProcessInstance> finishProcessInstance(String processkey);

	/**
	 * 根据流程实列Id获取所有任务
	 * 
	 * @param processInstanceId
	 *            流程实列ID
	 * @return
	 */
	public List<Task> getProcessInstanceId(String processInstanceId);
	/**
	 * 根据TASKID查询流程实例
	 * @param task
	 * @return
	 */
	public ProcessInstance createProcessInstanceQuery(Task task);

	public Comment addComment(String taskid, ProcessInstance processInstance,String comment);
	/**
	 * 自动新增会签记录数
	 * @param taskid
	 */
	public void getMultiInstances(String taskid);
	
	/**
	 * 根据任务ID获取流程定义
	 * 
	 * @param taskId
	 *            任务ID
	 * @return
	 * @throws Exception
	 */
	public ProcessDefinitionEntity findProcessDefinitionEntityByTaskId(String taskId);
	
	public ProcessInstance findProcessInstanceByTaskId(String taskId);
	public TaskEntity findTaskById(String taskId);
	/*
	 * 委托
	 */
   
	public JsonMessage ownerTask(String taskId,String userId);
	/**
	 * 获取当前节点信息
	 * 
	 * @param processInstance
	 * @return
	 */
	public Task getCurrentTaskInfo(ProcessInstance processInstance);
	/**
	 * 设置当前处理人信息
	 * 
	 * @param vars
	 * @param currentTask
	 */
	public void setCurrentTaskAssignee(Map<String, Object> vars, Task currentTask); 
		
	public void setTaskGroup(Map<String, Object> vars, Set<Expression> candidateGroupIdExpressions);
	
	public JsonMessage getClassListener(HttpServletRequest request);
	
	public String uploadClass(HttpServletRequest request) ;
	
	public String addOrupdateVariable(HttpServletRequest request,String formkey);
	public JsonMessage saveVariable(HttpServletRequest request,ProcessVariableEntity entity,String formkey);
	
	public JsonMessage delVariable(HttpServletRequest request,String id);
	
	public List<ProcessVariableEntity> getVariables(String nodeId);
	
	public String openInteface(HttpServletRequest request);
	
	public JsonMessage saveInteface(HttpServletRequest request,String id,String userInteface,String groupInteface,String deptInteface);
    
	public String openPageInteface(HttpServletRequest request);
	public JsonMessage savePageInteface(HttpServletRequest request,String id,String pageInteface);
	
	/**
	 * 流程跟踪图
	 * @param processInstanceId   流程实例id
	 * @param response
	 * @throws Exception
	 */
	public void viewImg(String processInstanceId, HttpServletResponse response) throws Exception;
}
