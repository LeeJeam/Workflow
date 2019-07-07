package cn.hy.releasesmanage.pojo;

import java.io.Serializable;

/**
 * Created by Administrator on 2016/7/18.
 */
public class RelationPojo implements Serializable {

    private String tablename;

    private String columnname;

    private String id;

    private String relationColumns;

    public String getTablename() {
        return tablename;
    }

    public void setTablename(String tablename) {
        this.tablename = tablename;
    }

    public String getColumnname() {
        return columnname;
    }

    public void setColumnname(String columnname) {
        this.columnname = columnname;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRelationColumns() {
        return relationColumns;
    }

    public void setRelationColumns(String relationColumns) {
        this.relationColumns = relationColumns;
    }
}
