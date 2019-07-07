package cn.hy.flowmanage.service.impl;


import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import cn.hy.common.service.impl.BaseService;
import cn.hy.flowmanage.dao.TypeDao;
import cn.hy.flowmanage.pojo.TSType;
import cn.hy.flowmanage.service.ITypeService;
/**
 * @author lijianbin
 *
 * 2016年1月25日
 */
@Service(value="typeService")
public  class TypeServiceImpl extends BaseService<TSType> implements ITypeService {

	protected static final Logger log=Logger.getLogger(TypeServiceImpl.class);
	
	
	@Resource(name="typeDao")
	public void setMapper(TypeDao dao){
		mapper=dao;
	}

	public TypeDao getDao(){
		return (TypeDao)getMapper();
	}

}
