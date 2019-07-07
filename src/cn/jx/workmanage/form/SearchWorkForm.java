package cn.jx.workmanage.form;

import java.io.Serializable;

/**
 * @author lijianbin
 *
 * 2016年8月26日
 */
public class SearchWorkForm implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String id;//流程ID
	private String name;//流程名称
	private String stepName;//当前步骤名称
	private String createTime;//步骤创建时间
	private String endTime;//流程完结时间
	private String receiveTime;//步骤处理时间
	private String createUserName;//流程创建人
	private String stepState;//流程状态
	
	private String taskId;//步骤ID
	private String taskAssignee;//步骤办理人
	private String pageName;//表单名称
	private String taskOwner;//委托人
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStepName() {
		return stepName;
	}
	public void setStepName(String stepName) {
		this.stepName = stepName;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getReceiveTime() {
		return receiveTime;
	}
	public void setReceiveTime(String receiveTime) {
		this.receiveTime = receiveTime;
	}
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	public String getStepState() {
		return stepState;
	}
	public void setStepState(String stepState) {
		this.stepState = stepState;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getTaskAssignee() {
		return taskAssignee;
	}
	public void setTaskAssignee(String taskAssignee) {
		this.taskAssignee = taskAssignee;
	}
	public String getPageName() {
		return pageName;
	}
	public void setPageName(String pageName) {
		this.pageName = pageName;
	}
	public String getTaskOwner() {
		return taskOwner;
	}
	public void setTaskOwner(String taskOwner) {
		this.taskOwner = taskOwner;
	}
	
}
