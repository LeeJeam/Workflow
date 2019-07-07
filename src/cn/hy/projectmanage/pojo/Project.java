package cn.hy.projectmanage.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * 项目工程表
 * @author lijianbin
 *
 * 2016年1月22日
 */
@SuppressWarnings("serial")
@Table(name="project")
public class Project implements Serializable{
	@Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;
    
    private String projectEnName;
     
    private String moduleId;
    public String getModuleId() {
		return moduleId;
	}

	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName == null ? null : projectName.trim();
    }

	public String getProjectEnName() {
		return projectEnName;
	}

	public void setProjectEnName(String projectEnName) {
		this.projectEnName = projectEnName == null ? null : projectEnName.trim();
	}
    
    
}