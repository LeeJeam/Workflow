package cn.hy.common.utils;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * spring 工具类,用于取出在spring容器中的对象
 * @author lijianbin
 *
 * 2016年8月24日
 */
@Component
public class SpringUtil implements ApplicationContextAware{

	@Autowired
	private static ApplicationContext applicationContext;
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext)throws BeansException {
		SpringUtil.applicationContext = applicationContext;
	}

	public static ApplicationContext getApplicationContext() {
		return applicationContext;
	}

	/**
	 * 在Spring容器取对象
	 * @param beanId
	 * @return
	 * @throws BeansException
	 */
	public static Object getBean(String beanId)throws BeansException{
		return applicationContext.getBean(beanId);
	}
}
