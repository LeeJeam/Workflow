package cn.hy.flowmanage.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 流程表
 * 
 * @author lijianbin
 *
 *         2016年7月7日
 */
@Entity
@Table(name = "t_p_process")
public class ProcessEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	private String id;

	private String processname;

	private Integer processstate;

	private String typeid;

	private String projectid;

	private Integer forbiddenorusing;

	private String documentation;

	private String processxml;
	
	private String formid;
	
	private String pagename;
	
	private String bussineid;

	public String getBussineid() {
		return bussineid;
	}

	public void setBussineid(String bussineid) {
		this.bussineid = bussineid;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public String getProcessname() {
		return processname;
	}

	public void setProcessname(String processname) {
		this.processname = processname == null ? null : processname.trim();
	}

	public Integer getProcessstate() {
		return processstate;
	}

	public void setProcessstate(Integer processstate) {
		this.processstate = processstate;
	}

	public String getTypeid() {
		return typeid;
	}

	public void setTypeid(String typeid) {
		this.typeid = typeid == null ? null : typeid.trim();
	}

	public String getProjectid() {
		return projectid;
	}

	public void setProjectid(String projectid) {
		this.projectid = projectid == null ? null : projectid.trim();
	}

	public Integer getForbiddenorusing() {
		return forbiddenorusing;
	}

	public void setForbiddenorusing(Integer forbiddenorusing) {
		this.forbiddenorusing = forbiddenorusing;
	}

	public String getDocumentation() {
		return documentation;
	}

	public void setDocumentation(String documentation) {
		this.documentation = documentation == null ? null : documentation.trim();
	}

	public String getProcessxml() {
		return processxml;
	}

	public void setProcessxml(String processxml) {
		this.processxml = processxml == null ? null : processxml.trim();
	}

	public String getFormid() {
		return formid;
	}

	public void setFormid(String formid) {
		this.formid = formid;
	}

	public String getPagename() {
        return pagename;
    }

    public void setPagename(String pagename) {
        this.pagename = pagename == null ? null : pagename.trim();
    }

	
}