package cn.hy.flowmanage.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.hy.common.service.impl.BaseService;
import cn.hy.flowmanage.dao.ProcessNodeEntityDao;
import cn.hy.flowmanage.pojo.ProcessNodeEntity;
import cn.hy.flowmanage.service.IProcessNodeEntityService;

/**
 * @author lijianbin
 *
 * 2016年7月7日
 */
@Service("processNodeEntityService")
public class ProcessNodeEntityServiceImpl extends BaseService<ProcessNodeEntity> implements IProcessNodeEntityService {

	@Resource(name="processNodeEntityDao")
	public void setMapper(ProcessNodeEntityDao dao){
		mapper=dao;
	}
}
