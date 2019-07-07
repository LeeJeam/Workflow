package cn.hy.common.utils;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * 文件创建
 * 
 * @author lijianbin
 *
 *         2016年2月5日
 */
public class FileWriteUtils {
	/**
	 * FileWriter方法追加文件
	 * @param filePath
	 * @param content
	 * @param isAppend
	 */
	public static void append(String filePath, String content, Boolean isAppend) {
		try {
			File file = new File(filePath);
			// 判断目标文件所在的目录是否存在
			if (!file.getParentFile().exists()) {
				// 如果目标文件所在的目录不存在，则创建父目录
				file.getParentFile().mkdirs();
			}
			// 文件不存在则创建
			if (!file.exists()) {
				file.createNewFile();
			}
			// 打开一个写文件器，构造函数中的第二个参数true表示以追加形式写文件
			FileWriter writer = new FileWriter(filePath, isAppend);
			writer.write(content);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
