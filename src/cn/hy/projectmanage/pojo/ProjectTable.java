package cn.hy.projectmanage.pojo;

import java.io.Serializable;

/**
 * 项目与表间关系
 * 
 * @author lijianbin
 *
 *         2016年1月20日
 */
@SuppressWarnings("serial")
public class ProjectTable implements Serializable {
	
	private Long id;              //主键
	private String tableName;     //表名
	private String projectName;   //项目名
	private String tableAlias;    //表别名

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getTableAlias() {
		return tableAlias;
	}

	public void setTableAlias(String tableAlias) {
		this.tableAlias = tableAlias;
	}

	@Override
	public String toString() {
		return "ProjectTable [id=" + id + ", tableName=" + tableName + ", projectName=" + projectName + ", tableAlias=" + tableAlias + "]";
	}

}
