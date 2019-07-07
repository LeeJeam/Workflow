package cn.hy.common.service.impl;

import tk.mybatis.mapper.entity.Example;

import java.util.List;
import java.util.Map;

import cn.hy.common.dao.BaseDao;
import cn.hy.common.service.IService;

public abstract class BaseService<T> implements IService<T> {

    protected BaseDao<T> mapper;

    public BaseDao<T> getMapper() {
		return mapper;
	}

    public T selectByPrimaryKey(Object key) {
        return mapper.selectByPrimaryKey(key);
    }

    public int save(T entity) {
        return mapper.insert(entity);
    }

    public int delete(T entity) {
        return mapper.delete(entity);
    }
    
    public int deleteByPrimaryKey(Object id){
    	return mapper.deleteByPrimaryKey(id);
    }
    
    public int deleteByExample(Example example){
    	return mapper.deleteByExample(example);
    }

    public int updateAll(T entity) {
        return mapper.updateByPrimaryKey(entity);
    }

    public int updateNotNull(T entity) {
        return mapper.updateByPrimaryKeySelective(entity);
    }

    public List<T> selectByExample(Example example) {
        return mapper.selectByExample(example);
    }
    
    public List<T> selectAll(){
    	return mapper.selectAll();
    }
    
    public List<T> select(T entity){
    	return mapper.select(entity);
    }
    
    public int insert(T entity){
    	return mapper.insert(entity);
    }
    
    public int insertSelective(T entity){
    	return mapper.insertSelective(entity);
    }
    
    public int insertUseGeneratedKeys(T entity){
    	return mapper.insertUseGeneratedKeys(entity);
    }
    
    public int updateByPrimaryKey(T entity){
    	return mapper.updateByPrimaryKey(entity);
    }
    
    public int selectCount(T entity){
    	return mapper.selectCount(entity);
    }
    
    public T selectOne(T entity){
    	return mapper.selectOne(entity);
    }
    
    public int selectCountByExample(Example example){
    	return mapper.selectCountByExample(example);
    }
    
    public Integer insertBySQL(String sql){
    	return mapper.insertBySQL(sql);
    }
    
    public Integer updateBySQL(String sql){
    	return mapper.updateBySQL(sql);
    }
    
    public Integer deleteBySQL(String sql){
    	return mapper.deleteBySQL(sql);
    }
    
    public List<Map<String,Object>> selectBySQL(String sql){
    	return mapper.selectBySQL(sql);
    }
    
    public List<Map<String, Object>> selectMapBySQL(String sql){
    	return mapper.selectMapBySQL(sql);
    }
    
    public Long getLastInsertId(){
    	List<Map<String,Object>> t=selectBySQL("select LAST_INSERT_ID() as idx");
		return Long.valueOf(t.get(0).get("idx").toString());
    }
}
