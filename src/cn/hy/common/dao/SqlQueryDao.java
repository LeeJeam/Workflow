package cn.hy.common.dao;

import java.util.List;
import java.util.Map;

/**
 * @author lijianbin
 *
 */
public interface SqlQueryDao<T>{

	/**
	 * 根据sql语句查询全部数据
	 * @param sql sql原生语句
	 * @return
	 */
	public List<Map<String,Object>> selectBySQL(String _parameter);

	/**
	 * 刪除
	 * 根据sql原生语句通过主键删除一条记录，返回成功删除的条数
	 * @param id 主键
	 * @return
	 */
	public Integer deleteBySQL(String _parameter);

	/**
	 * 插入
	 * 根据sql原生语句插入一条数据库记录，返回成功插入的条数
	 * @param entity 实体对象
	 * @return
	 */
	public Integer insertBySQL(String _parameter);

	/**
	 * 更新
	 * 根据sql原生语句更新一条数据库记录，返回成功更新的条数
	 * @param _parameter
	 * @return
	 */
	public Integer updateBySQL(String _parameter);
	
	/**
	 * 根据sql语句查询全部数据 返回Map
	 * @param _parameter
	 * @return
	 */
	public List<Map<String,Object>> selectMapBySQL(String _parameter);
}
