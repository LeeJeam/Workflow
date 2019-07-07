package cn.hy.releasesmanage.service;

import java.util.List;
import java.util.Map;

import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.IService;

public interface IPageDataService extends IService<CreateTebleUser>{
	/**
	 * 根据项目id及父页面名字查询所有子页
	 * @param projectId   项目id
	 * @param pageName    页面名称
	 * @return
	 */
	public Map<String,Object> findPageByPIdAndPn(Long projectId,String pageName);
	/**
	 * 根据项目id查询该项目的所有页面
	 * @param projectId   项目id
	 * @return
	 */
	public List<Map<String,Object>> findPagesByPId(Long projectId);
}
