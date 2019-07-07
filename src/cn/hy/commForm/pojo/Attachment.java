package cn.hy.commForm.pojo;

import java.io.Serializable;
/**
 * 
 * @author zqb
 * @time 2016年5月31日 下午4:20:19
 */
public class Attachment implements Serializable{

	private static final long serialVersionUID = 1L;

	private Integer id;

    private String filename;

    private String type;

    private String filepath;

    private Integer filesize;
    
    private String selectorid;

    private Integer formid;
    private Integer projectId;
   
    private String funNames;

    public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename == null ? null : filename.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath == null ? null : filepath.trim();
    }

    public Integer getFilesize() {
        return filesize;
    }

    public void setFilesize(Integer filesize) {
        this.filesize = filesize;
    }
    
    public String getSelectorid() {
        return selectorid;
    }

    public void setSelectorid(String selectorid) {
        this.selectorid = selectorid == null ? null : selectorid.trim();
    }

	public Integer getFormid() {
		return formid;
	}

	public void setFormid(Integer formid) {
		this.formid = formid;
	}

	public String getFunNames() {
		return funNames;
	}

	public void setFunNames(String funNames) {
		this.funNames = funNames;
	}

   

}