package cn.hy.flowmanage.service.impl;


import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import cn.hy.common.service.impl.BaseService;
import cn.hy.flowmanage.dao.ListenerDao;
import cn.hy.flowmanage.pojo.TSListener;
import cn.hy.flowmanage.service.IListenerService;

/**
 * @author lijianbin
 *
 * 2016年1月25日
 */
@Service(value="listenerService")
public  class ListenerServiceImpl extends BaseService<TSListener> implements IListenerService {

	protected static final Logger log=Logger.getLogger(ListenerServiceImpl.class);
	
	
	@Resource(name="listenerDao")
	public void setMapper(ListenerDao dao){
		mapper=dao;
	}

	public ListenerDao getDao(){
		return (ListenerDao)getMapper();
	}

}
