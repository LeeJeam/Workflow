package cn.hy.dictionarymanage.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import cn.hy.common.controller.BaseController;
import cn.hy.common.utils.SessionUtil;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.projectmanage.pojo.Project;

/**
 * 数据字典
 * @author lijianbin
 *
 * 2016年6月30日
 */
@Controller
@Scope("prototype")
@RequestMapping("dictionary/")
public class DictionaryController extends BaseController{

	protected static final Logger log=Logger.getLogger(DictionaryController.class);
	@Resource(name = "createTableService")
	private ICreateTableService service;


	@RequestMapping(INDEX)
	public ModelAndView index(HttpServletRequest request,String flag){
		ModelAndView view = new ModelAndView();
		view.addObject("flag","diciondary");
		view.setViewName("dictionarymanage/dictionary");
		return view;
	}
	
	
	
	/**
	 * 按项目查询字段表
	 * @param request
	 * @return
	 */
	@RequestMapping(SELECTALL)
	@ResponseBody
	public List<Map<String, Object>> selectall(HttpServletRequest request) {
		try {
			Project project=SessionUtil.getProjectName(request);
			if(null!=project){
				StringBuilder sb=new StringBuilder("SELECT d.id,d.`name`,d.project_table_id,t.table_alias ")
				.append("FROM data_dictionary d LEFT JOIN project_table t ON d.project_table_id = t.id WHERE d.projectid=")
				.append(project.getId());
				return service.selectMapBySQL(sb.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	/**
	 * 更新或者保存数据字典
	 * @param request
	 * @return
	 */
	@RequestMapping("saveOrUpdate")
	@ResponseBody
	public JsonMessage saveOrUpdate(HttpServletRequest request) {
		try {
			String id=request.getParameter("id");
			String name=request.getParameter("name");
			String projecttableId=request.getParameter("projecttableId");
			if(StringUtils.isNotBlank(id)){//更新
				StringBuilder sb=new StringBuilder("UPDATE data_dictionary SET  name='")
				.append(name==null?"":name).append("', project_table_id='").append(projecttableId==null?"":projecttableId)
				.append("' WHERE id=").append(id);
				service.updateBySQL(sb.toString());
			}else{//插入
				Project project=SessionUtil.getProjectName(request);
				if(null!=project){
					StringBuilder sb=new StringBuilder("INSERT INTO data_dictionary (name, project_table_id, projectid) VALUES ('")
					.append(name==null?"":name).append("',").append(projecttableId==null?"NULL":projecttableId).append(",").append(project.getId())
					.append(")");
					service.insertBySQL(sb.toString());
				}else{
					return new JsonMessage(false, "提交失败");
				}
			}
			return new JsonMessage(true, "提交成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new JsonMessage(false, "提交失败");
	}
	
	/**
	 * 删除数据字典
	 * @param request
	 * @return
	 */
	@RequestMapping(DELETE)
	@ResponseBody
	public JsonMessage delete(String id) {
		try {
			if(StringUtils.isNotBlank(id)){
				service.updateBySQL("DELETE FROM data_dictionary WHERE id="+id);
				return new JsonMessage(true, "删除成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new JsonMessage(false, "删除失败");
	}
	
	
	/**
	 * 查找数据字典
	 * @param request
	 * @return
	 */
	@RequestMapping(SELECTONE)
	public ModelAndView selectone(HttpServletRequest request,String id) {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("dictionarymanage/dictionary-edit");
		try {
			if(StringUtils.isNotBlank(id)){
				List<Map<String,Object>> list=service.selectMapBySQL("SELECT id,name,project_table_id,projectid FROM data_dictionary WHERE id="+id);
			    if(null!=list&&!list.isEmpty()){
			    	mav.addObject("data", list.get(0));
			    }
			}
			Project project=SessionUtil.getProjectName(request);
			if(null!=project){
				List<Map<String,Object>> list=service.selectMapBySQL("SELECT id,table_alias,tableType FROM project_table WHERE project_id="+project.getId()+"   AND tableType<>1 ORDER BY tableType ");
				mav.addObject("tabledata", list);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mav;
	}
}
