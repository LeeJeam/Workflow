package cn.hy.releasesmanage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import cn.hy.releasesmanage.pojo.SpacePojo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;

import cn.hy.common.controller.BaseController;
import cn.hy.common.vo.DatatablesViewPage;
import cn.hy.common.vo.PageDataToTable;
import cn.hy.releasesmanage.service.ITableViewService;
/**
 * 表单查看控制器
 * @author lijianbin
 *
 * 2016年1月22日
 */
@Controller
@Scope("prototype")
@RequestMapping("tableView/")
public class TableViewController extends BaseController {

	protected static final Logger log=Logger.getLogger(TableViewController.class);
	@Resource(name = "tableViewService")
	private ITableViewService service;

	/**
	 * 分页查询表单数据
	 * @param request
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(SELECT)
	@ResponseBody
	public DatatablesViewPage select(HttpServletRequest request) {
		try {
			Map<String, String[]> parameterMap = request.getParameterMap();
			Integer offset = 0;
			Integer limit = 10;
			String tableName = "";
			Map<String, String> paramMap = new HashMap<String, String>();
			if (parameterMap != null && !parameterMap.isEmpty()) {
				Set<Entry<String, String[]>> set = parameterMap.entrySet();
				for (Entry<String, String[]> entry : set) {
					String key = entry.getKey();
					if ("offset".equals(key)) {// 开始记录数
						offset = Integer.valueOf(entry.getValue()[0]);
					} else if ("limit".equals(key)) {// 分页数
						limit = Integer.valueOf(entry.getValue()[0]);
					} else if ("tableName".equals(key)) {// 表名
						tableName = entry.getValue()[0];
					} else {// 查询表单数据
						paramMap.put(key, entry.getValue()[0]);
					}
				}
			}
			String relations = paramMap.get("relations");
			String spaces = paramMap.get("spaces");
			paramMap.remove("relations");
			paramMap.remove("spaces");
			paramMap.remove("allowedFlag");
			paramMap.remove("c_port");
			paramMap.remove("u_name");
			paramMap.remove("s_id");
			StringBuffer bufSpace = new StringBuffer();


			if(StringUtils.isNotEmpty(spaces) && StringUtils.isNotBlank(spaces) && !"[]".equals(spaces)) {

				List<SpacePojo> spacePojoList = com.alibaba.fastjson.JSONArray.parseArray(spaces, SpacePojo.class);

				if(spacePojoList != null && !spacePojoList.isEmpty()) {
					for(int i = 0;i<spacePojoList.size();i++) {
						SpacePojo spacePojo = spacePojoList.get(i);
						String start = spacePojo.getStart();
						String end = spacePojo.getEnd();
						String fieldName = spacePojo.getFieldName();
						//String type = spacePojo.getFieldType();

						/*if(type != null && type.equals("datetime")) {
							if(StringUtils.isNotEmpty(start) && StringUtils.isNotBlank(start)) {
								start = "DATE_FORMAT('"+start+"','%y-%m-%d')";
							}
							if(StringUtils.isNotEmpty(end) && StringUtils.isNotBlank(end)) {
								end = "DATE_FORMAT('"+end+"','%y-%m-%d')";
							}
						}*/
						boolean flag = false;
						if(StringUtils.isNotEmpty(start) && StringUtils.isNotBlank(start)) {
							bufSpace.append(fieldName).append(" >= ").append("'" + start +"'");
							flag = true;
						}
						if(StringUtils.isNotEmpty(end) && StringUtils.isNotBlank(end)) {
							if(flag) {
								bufSpace.append(" and ");
							}
							bufSpace.append(fieldName).append(" <= ").append("'" +end +"'");
						}

						if (i >= 0 && i != (spacePojoList.size()-1)) {
							bufSpace.append(" and ");
						}
						paramMap.remove(fieldName + "[]");
					}
				}
			}


			Page<?> page = service.selectEntityByPageSQL(offset, limit, tableName, paramMap,relations,bufSpace);
			return PageDataToTable.change(page);
		} catch (NumberFormatException e) {
			e.printStackTrace();
			return new DatatablesViewPage();
		}
	}
}
