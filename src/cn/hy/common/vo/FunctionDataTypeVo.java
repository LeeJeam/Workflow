package cn.hy.common.vo;

import java.io.Serializable;

/**
 * Created by Administrator on 2016/8/10.
 */
public class FunctionDataTypeVo implements Serializable {

    private String id;

    private String name;

    private String createDate;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
