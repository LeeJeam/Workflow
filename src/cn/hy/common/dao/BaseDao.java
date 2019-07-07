package cn.hy.common.dao;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;
/**
 * @author lijianbin
 * 公共接口继承类
 */
public interface BaseDao<T> extends Mapper<T>, MySqlMapper<T>, SqlQueryDao<T> {

    
	
}
