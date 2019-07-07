package cn.hy.common.utils;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

/**
 * 
 * @ClassName: SystemPropertyUtil
 * @Description: 操作properties配置文件的工具类
 */
public class SystemPropertyUtil {
	// 配置文件的路径
	private String profilepath;

	private Properties props;

	/**
	 * 通过构造方法传入配置文件路径
	 * 
	 * @param path
	 */
	public SystemPropertyUtil(final String path){
		try {
			this.profilepath = path;
			props = loadProperties(path);
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
	
	/**
	 * 读取配置文件中相应键的值
	 * 
	 * @param key
	 *            主键
	 * @return String
	 */
	public String getKeyValue(final String key) {
		return props.getProperty(key);
	}

	/**
	 * 更新（或插入）一对properties信息(主键及其键值) 如果该主键已经存在，更新该主键的值； 如果该主键不存在，则插件一对键值。
	 * 
	 * @param keyName
	 *            键名
	 * @param keyValue
	 *            键值
	 */
	public boolean writeProperties(final String keyName, final String keyValue) {
		return updateProperties(keyName, keyValue);
	}

	/**
	 * 更新properties文件的键值对 如果该主键已经存在，更新该主键的值； 如果该主键不存在，则插件一对键值。
	 * 
	 * @param keyName
	 *            键名
	 * @param keyValue
	 *            键值
	 */
	public boolean updateProperties(final String keyName, final String keyValue) {
		props.setProperty(keyName, keyValue);
		return save();
	}

	/**
	 * 删除配置文件中的指定键值对
	 * 
	 * @param keyname
	 */
	public boolean removeKey(final String keyname) {
		props.remove(keyname);
		return save();
	}
	
	private boolean save(){
		OutputStream out = null;
		try {
			out = new FileOutputStream(profilepath);
			props.store(out, null);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		} finally{
			if(out!=null){
				try {
					out.close();
				} catch (IOException e) {
				}
			}
		}
	}
	
	/**
	 * 根据主键key读取主键的值value
	 * 
	 * @param filePath
	 *            配置文件路径
	 * @param key
	 *            键名
	 */
	public static String readValue(final String filePath, final String key) {
		try {
			Properties props = loadProperties(filePath);
			return props.getProperty(key);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 获取输入流
	 * @param path
	 * @return
	 */
	public static InputStream getResourceAsStream(final String path){
		ClassLoader classLoader = null;
		InputStream input=null;
		try {
			classLoader = Thread.currentThread().getContextClassLoader();
			input = classLoader.getResourceAsStream(path);
		} catch (Exception e) {
		}
		
		if(input==null){
			classLoader = SystemPropertyUtil.class.getClassLoader();
			input = classLoader.getResourceAsStream(path);
		}
		
		if(input==null){
			try {
				input = new FileInputStream(path);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		if(input==null){
			try {
				input = new URL(path).openStream();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return input;
	}

	/**
	 * 加载属性文件
	 * @param path
	 * @return
	 * @throws IOException
	 */
	public static Properties loadProperties(final String path) throws IOException{
		Properties props = new Properties();
		InputStream input = null;
		try {
			input = getResourceAsStream(path);
			props.load(input);
		} finally {
			if(input!=null){
				try {
					input.close();
				} catch (IOException e) {
				}
			}
		}
		return props;
	}
	
	/**
	 * 根据属性文件设置系统属性
	 * @param path
	 * @throws IOException
	 */
	public static void setSystemProperties(final String path) throws IOException{
		Properties props = loadProperties(path);
		setSystemProperties(props.entrySet());
	}
	
	/**
	 * 根据集合设置系统属性
	 * @param map
	 */
	public static void setSystemProperties(final Map<String,String> map) {
		Set<Entry<String, String>> set = map.entrySet();
		for (Entry<String, String> entry : set) {
			System.setProperty(entry.getKey(), entry.getValue());
		}
	}
	
	/**
	 * 根据集合设置系统属性
	 * @param set
	 */
	public static void setSystemProperties(final Set<Entry<Object, Object>> set) {
		for (Entry<Object, Object> entry : set) {
			System.setProperty(ObjecttoString(entry.getKey()), ObjecttoString(entry.getValue()));
		}
	}
	
	/**
	 * Object转成String类型
	 * @param obj 要转换的对象
	 * @return
	 */
	public static String ObjecttoString(final Object obj){
		String value=null;
		if(obj!=null){
			if(obj instanceof String)
				value = (String)obj;
			else{
				try {
					value = obj.toString();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return value;
	}
}