package cn.hy.flowmanage.pojo;

import java.io.Serializable;
import java.util.Date;
/**
 * 当前用户已处理和未处理的流程
 * @author nmc
 *
 */
public class UserProcessbean implements Serializable{

	private static final long serialVersionUID = 8642821044949428745L;

	private String taskId;
	private String pdfName;
	private String applyName;
	private String taskCreateTime;
	private String taskName;
	private String states = "待审核";
	private String taskEndTime ;
	private String taskAssignee;
	private String result;
	private String processid;
	private String typeid;
	private String applyform;
	private String entityId;
	private String processkey;
	
	
	public String getProcesskey() {
		return processkey;
	}
	public void setProcesskey(String processkey) {
		this.processkey = processkey;
	}
	public String getEntityId() {
		return entityId;
	}
	public void setEntityId(String entityId) {
		this.entityId = entityId;
	}
	public String getApplyform() {
		return applyform;
	}
	public void setApplyform(String applyform) {
		this.applyform = applyform;
	}
	public String getTypeid() {
		return typeid;
	}
	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}
	public String getProcessid() {
		return processid;
	}
	public void setProcessid(String processid) {
		this.processid = processid;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getPdfName() {
		return pdfName;
	}
	public void setPdfName(String pdfName) {
		this.pdfName = pdfName;
	}
	public String getApplyName() {
		return applyName;
	}
	public void setApplyName(String applyName) {
		this.applyName = applyName;
	}
	public String getTaskCreateTime() {
		return taskCreateTime;
	}
	public void setTaskCreateTime(String taskCreateTime) {
		this.taskCreateTime = taskCreateTime;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getStates() {
		return states;
	}
	public void setStates(String states) {
		this.states = states;
	}
	
	public String getTaskEndTime() {
		return taskEndTime;
	}
	public void setTaskEndTime(String taskEndTime) {
		this.taskEndTime = taskEndTime;
	}
	public String getTaskAssignee() {
		return taskAssignee;
	}
	public void setTaskAssignee(String taskAssignee) {
		this.taskAssignee = taskAssignee;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	
	
	
}
