package cn.hy.flowmanage.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.hy.common.service.impl.BaseService;
import cn.hy.flowmanage.dao.ProcessVariableEntityDao;
import cn.hy.flowmanage.pojo.ProcessVariableEntity;
import cn.hy.flowmanage.service.IProcessVariableEntityService;

/**
 * @author lijianbin
 *
 * 2016年7月7日
 */
@Service("processVariableEntityService")
public class ProcessVariableEntityServiceImpl extends BaseService<ProcessVariableEntity> implements IProcessVariableEntityService {

	@Resource(name="processVariableEntityDao")
	public void setMapper(ProcessVariableEntityDao dao){
		mapper=dao;
	}
}
