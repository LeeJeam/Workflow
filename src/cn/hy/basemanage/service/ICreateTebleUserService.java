package cn.hy.basemanage.service;

import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.IService;

import java.util.List;
import java.util.Map;

/**
 * @author lijianbin
 *
 * 2016年1月14日
 */
public interface ICreateTebleUserService extends IService<CreateTebleUser>{

    /***
     *
     * @param projectId
     * @param tableId
     * @param type
     * @return
     */
    public Map<String,Object> getFormContent(Long projectId,Long tableId,Integer type);

	
	
}
