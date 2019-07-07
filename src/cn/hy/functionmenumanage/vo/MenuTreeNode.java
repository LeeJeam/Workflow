package cn.hy.functionmenumanage.vo;

import java.io.Serializable;
import java.util.List;

/**
 * @author lijianbin
 *
 * 2016年2月1日
 */
@SuppressWarnings("serial")
public class MenuTreeNode extends TreeNode implements Serializable {

	private Boolean isUpdate=false;
	private Boolean isDelete=false;
	private Boolean isInsert=false;
	private Long sysFunctionId;
	
	private List<MenuTreeNode> children;

	public Boolean getIsUpdate() {
		return isUpdate;
	}

	public void setIsUpdate(Boolean isUpdate) {
		this.isUpdate = isUpdate;
	}

	public Boolean getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Boolean isDelete) {
		this.isDelete = isDelete;
	}

	public Boolean getIsInsert() {
		return isInsert;
	}

	public void setIsInsert(Boolean isInsert) {
		this.isInsert = isInsert;
	}

	public List<MenuTreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<MenuTreeNode> children) {
		this.children = children;
	}

	public Long getSysFunctionId() {
		return sysFunctionId;
	}

	public void setSysFunctionId(Long sysFunctionId) {
		this.sysFunctionId = sysFunctionId;
	}

}
