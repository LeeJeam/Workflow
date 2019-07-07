package cn.hy.commForm.pojo;

import java.io.Serializable;
/**
 * 
 * @author zqb
 * @time 2016年6月12日 下午4:16:36
 */
public class PublishAttachment implements Serializable{

	private static final long serialVersionUID = 1L;

	private Integer id;

    private String filename;

    private String type;

    private String filepath;

    private Integer filesize;
    
    private String selectorid;

    private String tableName;
   

   
	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
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


}