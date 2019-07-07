package cn.hy.releasesmanage.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import cn.hy.basemanage.dao.CreateTebleUserDao;
import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.impl.BaseService;
import cn.hy.releasesmanage.service.IPageDataService;


@Service(value="pageDataServiceService")
public class PageDataServiceImpl extends BaseService<CreateTebleUser> implements IPageDataService {

	protected static final Logger log=Logger.getLogger(PageDataServiceImpl.class);
	@Resource(name="createTebleUserDao")
	public void setMapper(CreateTebleUserDao dao){
		mapper=dao;
	}

	public CreateTebleUserDao getDao(){
		return (CreateTebleUserDao)getMapper();
	}
    
	public Map<String, Object> findPageByPIdAndPn(Long projectId,
			String pageName) {
		String sql = "SELECT pagedata.* FROM pagedata WHERE pagedata.page_name=  '"+pageName+"' and pagedata.project_id="+projectId;
		List<Map<String,Object>> list= selectMapBySQL(sql);
		if(list.size()!=0){
			return list.get(0);
		}
		return null;
	}

	public List<Map<String,Object>> findPagesByPId(Long projectId){
		String sql = "SELECT * FROM sys_function WHERE project_id ="+projectId;
		List<Map<String,Object>> list= selectMapBySQL(sql);
		return list;
	}
	

}
