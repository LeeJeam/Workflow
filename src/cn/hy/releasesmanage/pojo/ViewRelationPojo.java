package cn.hy.releasesmanage.pojo;

import java.io.Serializable;

/**
 * Created by Administrator on 2016/8/8.
 */
public class ViewRelationPojo implements Serializable {

    private String mtable;

    private String mcolumn;

    private String rtable;

    private String rcolumn;

    private String join;

    public String getJoin() {
        return join;
    }

    public void setJoin(String join) {
        this.join = join;
    }

    public String getMtable() {
        return mtable;
    }

    public String getMcolumn() {
        return mcolumn;
    }

    public void setMcolumn(String mcolumn) {
        this.mcolumn = mcolumn;
    }

    public String getRtable() {
        return rtable;
    }

    public void setRtable(String rtable) {
        this.rtable = rtable;
    }

    public String getRcolumn() {
        return rcolumn;
    }

    public void setRcolumn(String rcolumn) {
        this.rcolumn = rcolumn;
    }

    public void setMtable(String mtable) {
        this.mtable = mtable;


    }
}
