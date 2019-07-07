package cn.hy.flowmanage.form;

import java.io.Serializable;

/**
 * 查询表单实体类
 * @author lijianbin
 *
 * 2016年8月17日
 */
public class ProcessFormBean implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String id;//流程ID
	private String name;//流程名称
	private String createTime;//流程创建时间
	private String createUserName;//流程创建人姓名
	
	private String taskId;
	private String taskName;//当前步骤名称
	private String taskStratTime;//当前步骤创建时间
	private String taskEndTime;//当前步骤结束时间
	private String taskUserName;//当前办理人姓名
	private String taskOwerUserName;//当前委托人
	
	
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
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getTaskStratTime() {
		return taskStratTime;
	}
	public void setTaskStratTime(String taskStratTime) {
		this.taskStratTime = taskStratTime;
	}
	public String getTaskEndTime() {
		return taskEndTime;
	}
	public void setTaskEndTime(String taskEndTime) {
		this.taskEndTime = taskEndTime;
	}
	public String getTaskUserName() {
		return taskUserName;
	}
	public void setTaskUserName(String taskUserName) {
		this.taskUserName = taskUserName;
	}
	public String getTaskOwerUserName() {
		return taskOwerUserName;
	}
	public void setTaskOwerUserName(String taskOwerUserName) {
		this.taskOwerUserName = taskOwerUserName;
	}
	

}
