package cn.hy.flowmanage.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 流程变量表
 * 
 * @author lijianbin
 *
 *         2016年7月7日
 */
@Entity
@Table(name = "process_variable")
public class ProcessVariableEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	private Integer id;

	private String processid;

	private String procesnodeid;

	private String variablename;

	private String variableval;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProcessid() {
		return processid;
	}

	public void setProcessid(String processid) {
		this.processid = processid == null ? null : processid.trim();
	}

	public String getProcesnodeid() {
		return procesnodeid;
	}

	public void setProcesnodeid(String procesnodeid) {
		this.procesnodeid = procesnodeid == null ? null : procesnodeid.trim();
	}

	public String getVariablename() {
		return variablename;
	}

	public void setVariablename(String variablename) {
		this.variablename = variablename == null ? null : variablename.trim();
	}

	public String getVariableval() {
		return variableval;
	}

	public void setVariableval(String variableval) {
		this.variableval = variableval == null ? null : variableval.trim();
	}
}