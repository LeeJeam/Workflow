package cn.hy.functionmenumanage.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 项目功能表
 * @author lijianbin
 *
 * 2016年1月25日
 */
@SuppressWarnings("serial")
@Table(name="sys_function")
public class SysFunction implements Serializable{
	@Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String webName;

    private Long projetcId;

    private Long parentId;

    private String modalName;

    private String createDate;
    
    private String type;
    
    private Long projectTableId;
    
    private String url;
    
	private String fileName;
	
	private String templetName;
	
	private String content;

	private String formProperties;

    private String funcType;

    public String getFuncType() {
        return funcType;
    }

    public void setFuncType(String funcType) {
        this.funcType = funcType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWebName() {
        return webName;
    }

    public void setWebName(String webName) {
        this.webName = webName == null ? null : webName.trim();
    }

    public Long getProjetcId() {
        return projetcId;
    }

    public void setProjetcId(Long projetcId) {
        this.projetcId = projetcId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getModalName() {
        return modalName;
    }

    public void setModalName(String modalName) {
        this.modalName = modalName == null ? null : modalName.trim();
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate == null ? null : createDate.trim();
    }

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	public Long getProjectTableId() {
		return projectTableId;
	}

	public void setProjectTableId(Long projectTableId) {
		this.projectTableId = projectTableId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		 this.url = url == null ? null : url.trim();
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		 this.fileName = fileName == null ? null : fileName.trim();
	}

	public String getTempletName() {
		return templetName;
	}

	public void setTempletName(String templetName) {
		this.templetName = templetName == null ? null : templetName.trim();
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content == null ? null : content.trim();
	}

	public String getFormProperties() {
		return formProperties;
	}

	public void setFormProperties(String formProperties) {
		this.formProperties = formProperties;
	}
	
	
   
}