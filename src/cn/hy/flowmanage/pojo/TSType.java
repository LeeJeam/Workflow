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
@Table(name = "t_s_type")
public class TSType implements java.io.Serializable {
    
	@Id
    @Column(name = "id")
    private String id;
	//类型名称
	private String typename;
	//类型编码
	private String typecode;
	//字典项编码
	private String typegroupcode;
	//有效标识（0：无效 1：有效）
	private String yxbz;
//	private List<TPProcess> TSProcesses = new ArrayList();
    private String projectId;
    @Column(name = "projectId", length = 50)
	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}




	public String getTypegroupcode() {
		return typegroupcode;
	}

	@Column(name = "typegroupcode", length = 50)
	public void setTypegroupcode(String typegroupcode) {
		this.typegroupcode = typegroupcode;
	}


	@Column(name = "typename", length = 50)
	public String getTypename() {
		return this.typename;
	}

	public void setTypename(String typename) {
		this.typename = typename;
	}

	@Column(name = "typecode", length = 50)
	public String getTypecode() {
		return this.typecode;
	}

	public void setTypecode(String typecode) {
		this.typecode = typecode;
	}
	
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "TSType")
//	public List<TPProcess> getTSProcesses() {
//		return this.TSProcesses;
//	}
//
//	public void setTSProcesses(List<TPProcess> TSProcesses) {
//		this.TSProcesses = TSProcesses;
//	}



	@Column(name = "yxbz", length = 1)
	public String getYxbz() {
		return yxbz;
	}

	public void setYxbz(String yxbz) {
		this.yxbz = yxbz;
	}

}