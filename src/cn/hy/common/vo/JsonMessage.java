package cn.hy.common.vo;

import java.io.Serializable;

/**
 * 用户返回页面信息使用
 * 
 * @author lijianbin
 *
 *         2016年1月15日
 */
@SuppressWarnings("serial")
public class JsonMessage implements Serializable {

	private Boolean status;// 状态

	private String message;// 消息

	public JsonMessage() {
	}

	public JsonMessage(Boolean status, String message) {
		this.status = status;
		this.message = message;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
