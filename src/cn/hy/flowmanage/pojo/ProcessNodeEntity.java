package cn.hy.flowmanage.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 流程节点表
 * @author lijianbin
 *
 * 2016年7月7日
 */
@Entity
@Table(name = "t_p_processnode")
public class ProcessNodeEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	private String id;

    private String taskname;

    private String processid;

    private String formid;

    private String pagename;

    private String authorityUser;
    
    private String authorityRole;
    
    private Integer isBursar;
    
	
	
	private String msg;//消息内容
	
	private String sendcopyuser;//抄送人
	
	private String signuser; //会签人
	
	private String tasksendcopyuser; //任务抄送人

	public String getTasksendcopyuser() {
		return tasksendcopyuser;
	}

	public void setTasksendcopyuser(String tasksendcopyuser) {
		this.tasksendcopyuser = tasksendcopyuser;
	}

	public String getSignuser() {
		return signuser;
	}

	public void setSignuser(String signuser) {
		this.signuser = signuser;
	}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTaskname() {
        return taskname;
    }

    public void setTaskname(String taskname) {
        this.taskname = taskname == null ? null : taskname.trim();
    }

    public String getProcessid() {
        return processid;
    }

    public void setProcessid(String processid) {
        this.processid = processid == null ? null : processid.trim();
    }

    public String getFormid() {
        return formid;
    }

    public void setFormid(String formid) {
        this.formid = formid == null ? null : formid.trim();
    }

    public String getPagename() {
        return pagename;
    }

    public void setPagename(String pagename) {
        this.pagename = pagename == null ? null : pagename.trim();
    }

    public String getAuthorityUser() {
        return authorityUser;
    }

    public void setAuthorityUser(String authorityUser) {
        this.authorityUser = authorityUser == null ? null : authorityUser.trim();
    }

	public String getAuthorityRole() {
		return authorityRole;
	}

	public void setAuthorityRole(String authorityRole) {
		 this.authorityRole = authorityRole == null ? null : authorityRole.trim();
	}

	public Integer getIsBursar() {
		return isBursar;
	}

	public void setIsBursar(Integer isBursar) {
		this.isBursar = isBursar;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getSendcopyuser() {
		return sendcopyuser;
	}

	public void setSendcopyuser(String sendcopyuser) {
		this.sendcopyuser = sendcopyuser;
	}
	
}