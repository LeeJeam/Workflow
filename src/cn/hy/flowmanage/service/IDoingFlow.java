package cn.hy.flowmanage.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.persistence.entity.TaskEntity;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Comment;
import org.activiti.engine.task.Task;
import org.springframework.web.servlet.ModelAndView;

import cn.hy.common.vo.JsonMessage;
import cn.hy.flowmanage.form.ProcessBean;
import cn.hy.flowmanage.pojo.UserProcessbean;
import cn.hy.functionmenumanage.vo.TreeNode;
public interface IDoingFlow {

	/**
	 * 启动流程实列
	 */
	public ProcessInstance startFlow(
			String processDefinitionKey);
	/**
	 * 办理流程任务
	 */
	public void completeTask(String taskId,  Map<String, Object> variables);
	/**
	 * 根据状态字段修改是否挂起
	 */
	public void updateState(String state, String processInstanceId);
	/**
	 * 处理该任务下的备注信息
	 * @param taskid
	 * @param processInstance
	 * @param flag
	 * @param comment
	 * @return
	 */
	public void addComment(ProcessInstance processInstance,String taskId,String message);

	
	public List<Map<String, Object>> findByProcessList(HttpServletRequest request, String typeId,String name);
	
	
	public ModelAndView viewForm(String processId,String fName,
			HttpServletRequest request);
	
	public  List<Map<String, Object>> starProcess(String processId,String processname,HttpServletRequest request);
    
    public List<TreeNode> switchTaskCandidatesList(ProcessInstance processInstance,boolean isOpen);
   
//    public JsonMessage switchTaskCandidates(String assignee,String candidateUsers, String taskCandidateGroup, String taskId,HttpServletRequest request);
    public JsonMessage countersignTask(String taskId,String userId) throws Exception;
    
    public List<ProcessBean> taskList(HttpServletRequest request);
    
    public List taskViewForm(String taskId,HttpServletRequest request);
    
    public List<Map<String, Object>> traceProcess(String processInstanceId) throws Exception ;
    
    public void loadByProcessInstance(String processInstanceId, HttpServletResponse response) throws Exception;
    public JsonMessage select(String processInstId, String taskId);
    public  List<UserProcessbean> signRegisterInfo(String processInstanceId);
    
    public JsonMessage complete(String taskId,String bID,String users,
			HttpServletRequest request);
    public ActivityImpl findActivitiImpl(String taskId, String activityId)  
            throws Exception;
    public List<ActivityImpl> iteratorBackActivity(String taskId,  
            ActivityImpl currActivity, List<ActivityImpl> rtnList,  
            List<ActivityImpl> tempList) throws Exception;
    public List<ActivityImpl> reverList(List<ActivityImpl> list);
    
    public void commitProcess(String taskId, Map<String, Object> variables,  
            String activityId) throws Exception;
    
    public ProcessInstance findProcessInstanceByTaskId(String taskId)  
            throws Exception;
    public TaskEntity findTaskById(String taskId) throws Exception;
    public List<Task> findTaskListByKey(String processInstanceId, String key);
    public ProcessDefinitionEntity findProcessDefinitionEntityByTaskId(  
            String taskId) throws Exception;
    /**
	 * 抄送
	 * @param procInstId
	 * @param user
	 * @return
	 */
    public JsonMessage copySendUser(String taskId,String userId);
    /**
  	 * 回退到上一步
  	 * @param procInstId
  	 * @param user
  	 * @return
  	 */
	public JsonMessage undoTask( String procInstId);
	public JsonMessage isFlag(String taskId);
    public List<UserProcessbean> taskSelect(HttpServletRequest request)
			throws Exception ;
    /**
     * 保存会签意见
     */
    public JsonMessage saveSignMessage(String userId,String taskId,String message);
    /**
     * 显示默认会签人
     * @param processInstanceId
     * @return
     */
    public List<TreeNode> getSignUser(String taskId,String type);


    /***
     * 获取下一步审批人
     * @param taskId
     * @param
     * @param keys
     * @return
     */
    public  List<TreeNode> getFlowApprovalPerson(String taskId,String [] keys,String [] values);
}
