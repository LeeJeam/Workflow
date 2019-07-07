package cn.hy.basemanage.service.impl;

import javax.annotation.Resource;

import cn.hy.common.utils.Base64Util;
import cn.hy.functionmenumanage.service.ISysFunctionService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.hy.basemanage.dao.CreateTebleUserDao;
import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.basemanage.service.ICreateTebleUserService;
import cn.hy.common.service.impl.BaseService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author lijianbin
 *
 * 2016年1月14日
 */
@Service(value="createTebleUserService")
public class CreateTebleUserServiceImpl extends BaseService<CreateTebleUser> implements ICreateTebleUserService {

	protected static final Logger log=Logger.getLogger(CreateTebleUserServiceImpl.class);

	@Autowired
	private ISysFunctionService sysFunctionService;
	
	@Resource(name="createTebleUserDao")
	public void setMapper(CreateTebleUserDao dao){
		mapper=dao;
	}
	
	public CreateTebleUserDao getDao(){
		return (CreateTebleUserDao)getMapper();
	}

	@Override
	public Map<String,Object> getFormContent(Long projectId, Long tableId, Integer type) {
		Map<String,Object> dataMap = new HashMap<String,Object>();
		List<Map<String,Object>> lists = sysFunctionService.findByProjectAndTableIdAndType(projectId,tableId,2);
		if(lists != null && !lists.isEmpty()) {
			Object content = lists.get(0).get("content") != null ? lists.get(0).get("content") : "";
			Object webName = lists.get(0).get("web_name");
			String formContent = Base64Util.getFromBase64(content.toString());
			dataMap.put("webName",webName);
			dataMap.put("formContent", formContent);
			return dataMap;
		}
		return null;
	}
}
