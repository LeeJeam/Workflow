package cn.hy.common.utils;

import cn.hy.databasemanage.enums.ColumnFiledEnums;

/**
 * 创建数据库表是长度是否必需
 * @author lijianbin
 *
 * 2016年1月28日
 */
public class NeedLengthUtil {

	public static boolean isNeed(String c){
		if(c.equals(ColumnFiledEnums.DATE.getCode())){
			return false;
		}else{
			return true;
		}
	}
}
