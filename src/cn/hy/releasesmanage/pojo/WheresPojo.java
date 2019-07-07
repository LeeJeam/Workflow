package cn.hy.releasesmanage.pojo;

import java.io.Serializable;

/**
 * Created by Administrator on 2016/8/3.
 */
public class WheresPojo implements Serializable {

    private String name;

    private String where;


    public String getWhere() {
        return where;
    }

    public void setWhere(String where) {
        this.where = where;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
