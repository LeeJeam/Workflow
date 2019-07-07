package cn.hy.basemanage.service.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import cn.hy.basemanage.dao.UserDao;
import cn.hy.basemanage.pojo.User;
import cn.hy.basemanage.service.IUserService;
import cn.hy.common.service.impl.BaseService;
/**
 * @author lijianbin
 *
 * 2016年1月13日
 */
@Service("userService")
public class UserServiceImpl extends BaseService<User> implements IUserService {

	protected static final Logger log=Logger.getLogger(UserServiceImpl.class);
	
	@Resource(name="userDao")
	public void setMapper(UserDao dao){
		mapper=dao;
	}
	
	public UserDao getDao(){
		return (UserDao)getMapper();
	}
	
}
