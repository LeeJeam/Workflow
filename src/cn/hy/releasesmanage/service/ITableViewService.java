package cn.hy.releasesmanage.service;

import java.util.Map;

import com.github.pagehelper.Page;

import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.IService;


/**
 * @author lijianbin
 *
 * 2016年1月22日
 */
public interface ITableViewService extends IService<CreateTebleUser>{

	/**
	 * 分页查询数据
	 * @param offset      开始记录数
	 * @param limit       分页数
	 * @param tableName   查询表名
	 * @param paramMap    查询表单参数
	 * @return
	 */
	public Page<?> selectEntityByPageSQL(Integer offset,Integer limit, String tableName, Map<String, String> paramMap,String relations,StringBuffer betweens);

}
