package cn.hy.common.utils;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * 拿取Properties中的文件
 * @author lijianbin
 *
 */
public class PropertiesUtils {

    private static Properties properties;

    private static void initProperties(){
		try {
			if(properties==null)
				properties = SystemPropertyUtil.loadProperties("config/system.properties");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String init(String propertiesName){
		initProperties();
		return properties.getProperty(propertiesName);
	}

    /***
     * 读写数据库配置文件
     *
     * @param url
     * @param user
     * @param pasw
     */
    public static void writeProperties(String url, String user, String pasw, String propertiesPath) {
        try {
            Properties properties = SystemPropertyUtil.loadProperties(propertiesPath);
            properties.setProperty("jdbc_url", url);
            properties.setProperty("jdbc_username", user);
            properties.setProperty("jdbc_password", pasw);

            FileOutputStream outputStream = new FileOutputStream(propertiesPath);
            properties.store(outputStream, "ISO-8859-1");
            outputStream.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static void writeProperties(String propertiesPath,String [] keys,String [] values) {
        try {
            Properties properties = SystemPropertyUtil.loadProperties(propertiesPath);
            if(keys != null && values != null && keys.length == values.length) {
                for(int i = 0;i<keys.length;i++) {
                    properties.setProperty(keys[i],values[i]);
                }
            }

            FileOutputStream outputStream = new FileOutputStream(propertiesPath);
            properties.store(outputStream, "ISO-8859-1");
            outputStream.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
