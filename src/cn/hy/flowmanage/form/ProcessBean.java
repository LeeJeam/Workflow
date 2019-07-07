package cn.hy.flowmanage.form;

import java.util.Date;

import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
/**
 * @author lijianbin
 *
 * 2016年1月12日
 */
public class ProcessBean {
										
	// 流程任务
	private String processDefname;
	private String taskTime;
	private String processDefSuspended;
	private String taskName;
    private String varName;
    private String taskAssignee;
    private String taskTaskDefinitionKey;
    private String taskId;
    private String operate;
    private String processInstId;
	private String businessKey;
    private boolean Isuspended;
    private String processkey;
    public String getProcesskey() {
		return processkey;
	}
	public void setProcesskey(String processkey) {
		this.processkey = processkey;
	}
	public boolean isIsuspended() {
		return Isuspended;
	}
	public void setIsuspended(boolean isuspended) {
		Isuspended = isuspended;
	}
    public String getProcessInstId() {
		return processInstId;
	}
	public void setProcessInstId(String processInstId) {
		this.processInstId = processInstId;
	}
	public String getBusinessKey() {
		return businessKey;
	}
	public void setBusinessKey(String businessKey) {
		this.businessKey = businessKey;
	}

	public String getOperate() {
		return operate;
	}
	public void setOperate(String operate) {
		this.operate = operate;
	}
	public String getProcessDefname() {
		return processDefname;
	}
	public void setProcessDefname(String processDefname) {
		this.processDefname = processDefname;
	}
	public String getTaskTime() {
		return taskTime;
	}
	public void setTaskTime(String taskTime) {
		this.taskTime = taskTime;
	}
	public String getProcessDefSuspended() {
		return processDefSuspended;
	}
	public void setProcessDefSuspended(String processDefSuspended) {
		this.processDefSuspended = processDefSuspended;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getVarName() {
		return varName;
	}
	public void setVarName(String varName) {
		this.varName = varName;
	}
	public String getTaskAssignee() {
		return taskAssignee;
	}
	public void setTaskAssignee(String taskAssignee) {
		this.taskAssignee = taskAssignee;
	}
	public String getTaskTaskDefinitionKey() {
		return taskTaskDefinitionKey;
	}
	public void setTaskTaskDefinitionKey(String taskTaskDefinitionKey) {
		this.taskTaskDefinitionKey = taskTaskDefinitionKey;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public ProcessBean(String processDefname, String taskTime,
			String processDefSuspended, String taskName, String varName,
			String taskAssignee, String taskTaskDefinitionKey, String taskId,String operate,String businessKey,String processInstId,String processkey) {
		super();
		this.processDefname = processDefname;
		this.taskTime = taskTime;
		this.processDefSuspended = processDefSuspended;
		this.taskName = taskName;
		this.varName = varName;
		this.taskAssignee = taskAssignee;
		this.taskTaskDefinitionKey = taskTaskDefinitionKey;
		this.taskId = taskId;
		this.operate = operate;
		this.businessKey = businessKey;
		this.processInstId = processInstId;
		this.processkey=processkey;
	}
	public ProcessBean() {
		super();
	}

}
