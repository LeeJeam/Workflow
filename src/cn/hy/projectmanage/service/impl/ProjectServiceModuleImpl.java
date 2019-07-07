package cn.hy.projectmanage.service.impl;



import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import cn.hy.common.service.impl.BaseService;
import cn.hy.projectmanage.dao.ProjectModuleDao;
import cn.hy.projectmanage.pojo.ProjectModule;
import cn.hy.projectmanage.service.IProjectModuleService;


/**
 * @author lijianbin
 *
 * 2016年1月22日
 */
@Service("projectModuleService")

public class ProjectServiceModuleImpl extends BaseService<ProjectModule> implements IProjectModuleService {

	protected static final Logger log=Logger.getLogger(ProjectServiceModuleImpl.class);
	@Resource(name="projectModuleDao")
	public void setMapper(ProjectModuleDao dao){
		mapper=dao;
	}
	
	public ProjectModuleDao getDao(){
		return (ProjectModuleDao)getMapper();
	}


	
	
}
