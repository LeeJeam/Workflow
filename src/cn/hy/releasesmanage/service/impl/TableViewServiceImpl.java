package cn.hy.releasesmanage.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.annotation.Resource;

import cn.hy.releasesmanage.pojo.RelationPojo;
import cn.hy.releasesmanage.pojo.WheresPojo;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

import cn.hy.basemanage.dao.CreateTebleUserDao;
import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.impl.BaseService;
import cn.hy.releasesmanage.service.ITableViewService;

/**
 * @author lijianbin
 *
 * 2016年1月22日
 */
@Service(value="tableViewService")
public class TableViewServiceImpl extends BaseService<CreateTebleUser> implements ITableViewService {

	protected static final Logger log=Logger.getLogger(TableViewServiceImpl.class);
	
	@Resource(name="createTebleUserDao")
	public void setMapper(CreateTebleUserDao dao){
		mapper=dao;
	}
	
	public CreateTebleUserDao getDao(){
		return (CreateTebleUserDao)getMapper();
	}


	public Map<String,Object> getWhereMaps(Map<String, String> paramMap) {
		Map<String,Object> whereMap = new HashMap<String,Object>();
		String wheres = paramMap.get("wheres");
		paramMap.remove("wheres");
		if(StringUtils.isNotEmpty(wheres) && StringUtils.isNotEmpty(wheres) && !"[]".equals(wheres)) {
			List<WheresPojo> wheresPojos = com.alibaba.fastjson.JSONArray.parseArray(wheres, WheresPojo.class);
			for(WheresPojo wheresPojo:wheresPojos) {
				whereMap.put(wheresPojo.getName(),wheresPojo.getWhere());
			}
		}
		return whereMap;
	}

	public Page<?> selectEntityByPageSQL(Integer offset,Integer limit, String tableName, Map<String, String> paramMap,String relations,StringBuffer betweens) {
		StringBuilder sb=new StringBuilder("");
		boolean flag = false;

		Map<String,Object> whereMap = getWhereMaps(paramMap);

		if(paramMap!=null&&!paramMap.isEmpty()){
			Set<Entry<String, String>> set=paramMap.entrySet();
			for(Entry<String, String>entry:set){
				String value = " like ",fpercentage="%";
				if(whereMap.get(entry.getKey()) != null) {
					value = String.valueOf(whereMap.get(entry.getKey()));
					fpercentage = "";
				}
				sb.append(" and ").append(entry.getKey()).append(" "+value+"  '"+fpercentage).append(entry.getValue()).append(fpercentage+"' ");
			}
			sb.replace(0, 4, " where ");
			flag = true;
		}


		StringBuffer cols = new StringBuffer();
		if(StringUtils.isNotEmpty(relations) && StringUtils.isNotEmpty(relations) && !"[]".equals(relations)) {

			List<RelationPojo> relationPojos = com.alibaba.fastjson.JSONArray.parseArray(relations, RelationPojo.class);

			if(relationPojos != null && !relationPojos.isEmpty()) {
				for(int i = 0;i<relationPojos.size();i++) {
					RelationPojo relationPojo = relationPojos.get(i);

					cols.append("(select ")
							.append(relationPojo.getColumnname())
							.append(" from ")
							.append(relationPojo.getTablename())
							.append(" where ")
							.append(relationPojo.getId())
							.append(" = ")
							.append("s." + relationPojo.getRelationColumns()).append(" ) " + relationPojo.getRelationColumns());
					if(i != (relationPojos.size()-1)) {
						cols.append(" , ");
					}

				}
			}
		}

		if(betweens != null && StringUtils.isNotBlank(betweens.toString())) {
			sb.append(" and " +betweens + " ");
			if(!flag) {
				sb.replace(0, 4, " where ");
			}

		}
		if(cols.length() > 0 ) {
			sb.insert(0, "SELECT "+cols+",s.* FROM "+tableName +" s");
		} else {
			sb.insert(0, "SELECT * FROM "+tableName);
		}
		System.out.println(sb+"--------------");
		PageHelper.offsetPage(offset, limit);
		return (Page<?>) selectMapBySQL(sb.toString());
	}
}
