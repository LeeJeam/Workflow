package cn.hy.flowmanage.pojo;
// default package


import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;

import javax.persistence.Table;

/**
 * 通用类型字典表
 *  @author  张代浩
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "t_s_Listener")
public class TSListener implements java.io.Serializable {
    
	@Id
    @Column(name = "id")
    private String id;
	//类型名称
	private String classname;
	//类型编码
	private String classurl;
	//字典项编码
	private String state;
	//jar包类路径
	private String jarurl;
	//taskId名称
	private String taskid;
	public String getJarurl() {
		return jarurl;
	}
	public void setJarurl(String jarurl) {
		this.jarurl = jarurl;
	}
	public String getTaskid() {
		return taskid;
	}
	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Column(name = "classname", length = 200)
	public String getClassname() {
		return classname;
	}
	public void setClassname(String classname) {
		this.classname = classname;
	}
	@Column(name = "classurl", length = 500)
	public String getClassurl() {
		return classurl;
	}
	public void setClassurl(String classurl) {
		this.classurl = classurl;
	}
	@Column(name = "state", length = 20)
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}


}