package cn.hy.databasemanage.vo;

import java.io.Serializable;

/**
 * @author lijianbin
 *
 *         2016年1月12日
 */
@SuppressWarnings("serial")
public class TableFiled implements Serializable {

	private String filedName; // 字段名称
	private String alias;     // 字段别名
	private String filedType;// 字段类型
	private Integer filedSize;//字段长度

	public String getFiledName() {
		return filedName;
	}

	public void setFiledName(String filedName) {
		this.filedName = filedName;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getFiledType() {
		return filedType;
	}

	public void setFiledType(String filedType) {
		this.filedType = filedType;
	}

	public Integer getFiledSize() {
		return filedSize;
	}

	public void setFiledSize(Integer filedSize) {
		this.filedSize = filedSize;
	}

	@Override
	public String toString() {
		return "TableFiled [filedName=" + filedName + ", alias=" + alias + ", filedType=" + filedType + ", filedSize=" + filedSize + "]";
	}

}
