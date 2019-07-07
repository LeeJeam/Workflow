package cn.hy.databasemanage.vo;

import java.io.Serializable;
import java.util.List;
/**
 * @author lijianbin
 *
 * 2016年1月12日
 */
@SuppressWarnings("serial")
public class CreateTable implements Serializable {

	private String tableName; //表名
	
	private List<TableFiled> tableFileds;
	
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public List<TableFiled> getTableFileds() {
		return tableFileds;
	}
	public void setTableFileds(List<TableFiled> tableFileds) {
		this.tableFileds = tableFileds;
	}
	@Override
	public String toString() {
		return "CreateTable [tableName=" + tableName + ", tableFileds="
				+ tableFileds + "]";
	}
}
