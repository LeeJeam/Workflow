package cn.hy.databasemanage.vo;

import java.io.Serializable;
import java.util.List;

/**
 * @author lijianbin
 *
 *         2016年1月15日
 */
@SuppressWarnings("serial")
public class TableCreateVO implements Serializable {

	private String tableName;// 表名

	private List<TableFiled> columns;// 列集合

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public List<TableFiled> getColumns() {
		return columns;
	}

	public void setColumns(List<TableFiled> columns) {
		this.columns = columns;
	}

}
