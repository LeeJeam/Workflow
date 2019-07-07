package cn.hy.flowmanage.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.hy.common.service.impl.BaseService;
import cn.hy.flowmanage.dao.ProcessEntityDao;
import cn.hy.flowmanage.pojo.ProcessEntity;
import cn.hy.flowmanage.service.IProcessEntityService;

/**
 * @author lijianbin
 *
 * 2016年7月7日
 */
@Service("processEntityService")
public class ProcessEntityServiceImpl extends BaseService<ProcessEntity> implements IProcessEntityService {
	
	@Resource(name="processEntityDao")
	public void setMapper(ProcessEntityDao dao){
		mapper=dao;
	}

}
