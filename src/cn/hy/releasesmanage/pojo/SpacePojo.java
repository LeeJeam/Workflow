package cn.hy.releasesmanage.pojo;

import java.io.Serializable;

/**
 * Created by Administrator on 2016/7/13.
 */
public class SpacePojo implements Serializable {

    private String start;

    private String end;

    private String fieldName;

    private String fieldType;

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getFieldType() {
        return fieldType;
    }

    public void setFieldType(String fieldType) {
        this.fieldType = fieldType;
    }
}
