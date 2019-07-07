package cn.hy.functionmenumanage.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 项目系统功能表
 * @author lijianbin
 *
 * 2016年1月28日
 */
@SuppressWarnings("serial")
@Table(name="sys_menu")
public class SysMenu implements Serializable {
	@Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;            //主键  
	   
	private String menuName;    //功能名
	
	private Long sysFunctionId; //对应功能页
	
	private Long parentId;      //父级
	
	private Long projectId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public Long getSysFunctionId() {
		return sysFunctionId;
	}

	public void setSysFunctionId(Long sysFunctionId) {
		this.sysFunctionId = sysFunctionId;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}
	
}
