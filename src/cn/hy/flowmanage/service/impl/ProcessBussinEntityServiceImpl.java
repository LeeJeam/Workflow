package cn.hy.flowmanage.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.hy.common.service.impl.BaseService;
import cn.hy.flowmanage.dao.ProcessBussinEntityDao;
import cn.hy.flowmanage.dao.ProcessEntityDao;
import cn.hy.flowmanage.pojo.ProcessBussinEntity;
import cn.hy.flowmanage.pojo.ProcessEntity;
import cn.hy.flowmanage.service.IProcessBussinEntityService;
import cn.hy.flowmanage.service.IProcessEntityService;

/**
 * @author lijianbin
 *
 * 2016年7月7日
 */
@Service("processBussinEntityService")
public class ProcessBussinEntityServiceImpl extends BaseService<ProcessBussinEntity> implements IProcessBussinEntityService {
	
	@Resource(name="processBussinEntityDao")
	public void setMapper(ProcessBussinEntityDao dao){
		mapper=dao;
	}

}
