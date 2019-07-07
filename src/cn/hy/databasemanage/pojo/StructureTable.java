package cn.hy.databasemanage.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 表结构实体
 * @author lijianbin
 *
 *         2016年1月20日
 */
@SuppressWarnings("serial")
@Table(name="structure_table")
public class StructureTable implements Serializable {
	@Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;                  //主键
	private String tableName;         //表名
	private String filedName;         //列名
	private String columnAlias;       //列别名
	private String columnType;        //列类型
	private Integer columnSize;       //列长度
	private Long projectTableId; 
	private String isDefault;
	private Long projectId;

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName == null ? null : tableName.trim();
    }

    public String getFiledName() {
        return filedName;
    }

    public void setFiledName(String filedName) {
        this.filedName = filedName == null ? null : filedName.trim();
    }

    public String getColumnAlias() {
        return columnAlias;
    }

    public void setColumnAlias(String columnAlias) {
        this.columnAlias = columnAlias == null ? null : columnAlias.trim();
    }

    public String getColumnType() {
        return columnType;
    }

    public void setColumnType(String columnType) {
        this.columnType = columnType == null ? null : columnType.trim();
    }

    public Integer getColumnSize() {
        return columnSize;
    }

    public void setColumnSize(Integer columnSize) {
        this.columnSize = columnSize;
    }

	public Long getProjectTableId() {
		return projectTableId;
	}

	public void setProjectTableId(Long projectTableId) {
		this.projectTableId = projectTableId;
	}

	public String getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(String isDefault) {
		this.isDefault = isDefault;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

}
