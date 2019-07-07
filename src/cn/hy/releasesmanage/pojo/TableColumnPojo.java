package cn.hy.releasesmanage.pojo;

import java.io.Serializable;

/**
 * Created by Administrator on 2016/7/20.
 */
public class TableColumnPojo implements Serializable {

    private String id;

    private String text;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
