package cn.hy.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.time.DateUtils;


/**
 * @author lijianbin
 *
 * 2016年1月25日
 */
public class DateUtil extends DateUtils{
	
	/**
	 * 将日期转为字符串
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String format(final Date date, final String pattern){
		return new SimpleDateFormat(pattern).format(date);
	}
	
	
	/**
	 * 将字符串转为日期
	 * @param dataStr
	 * @param pattern
	 * @return
	 */
	public static Date parse(final String dataStr,final String pattern){
		try {
			return new SimpleDateFormat(pattern).parse(dataStr);
		} catch (final ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
}
