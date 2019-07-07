package cn.hy.common.service;

import tk.mybatis.mapper.entity.Example;

import java.util.List;
import java.util.Map;

/**
 * 通用接口
 */
public interface IService<T> {

	public int save(T entity);

	public int delete(T entity);
    
	public int deleteByPrimaryKey(Object id);
	
	public int deleteByExample(Example example);

	public int updateAll(T entity);

	public int updateNotNull(T entity);
    
    public int updateByPrimaryKey(T entity);

    public List<T> selectByExample(Example example);
    
    public List<T> selectAll();
    
    public T selectByPrimaryKey(Object key);
    
    public List<T> select(T entity);
    
    public int insert(T entity);

    public int insertSelective(T entity);
    
    public int insertUseGeneratedKeys(T entity);
    
    public int selectCount(T entity);
    
    public T selectOne(T entity);
    
    public int selectCountByExample(Example example);
    
    public Integer insertBySQL(String sql);
    
    public Integer updateBySQL(String sql);
    
    public Integer deleteBySQL(String sql);
    
    public List<Map<String, Object>> selectBySQL(String sql);
    
    public List<Map<String, Object>> selectMapBySQL(String sql);
    
    /**
     * 返回数据库最后插入记录的主键
     * @return
     */
    public Long getLastInsertId();

}
