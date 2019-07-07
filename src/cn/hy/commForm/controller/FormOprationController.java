package cn.hy.commForm.controller;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONArray;

import cn.hy.commForm.controller.tool.JarClassFileLoader;
import cn.hy.common.controller.BaseController;
import cn.hy.common.utils.Base64Util;
import cn.hy.common.utils.PinYinUtil;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.databasemanage.vo.TableFiled;
import cn.hy.functionmenumanage.vo.TreeNode;
/**
 * 
 * @author zqb
 * @time 2016年5月13日 下午4:05:07
 */
@Controller
@Scope("prototype")
@RequestMapping("formOpration/")
public class FormOprationController extends BaseController {

	protected static final Logger log=Logger.getLogger(FilerUploadOpController.class);
	@Resource(name = "createTableService")
	private ICreateTableService service;
	
	/**
	 * 公共的发布之后数据表格编缉单条数据时为form表单赋值
	 * @param tableName
	 * @param id
	 * @return
	 */
	@RequestMapping("findTableByid")
	@ResponseBody
	public List<Map<String, Object>> findTableByid(String tableName,String id) {
		if(StringUtils.isEmpty(tableName) && StringUtils.isBlank(tableName)){
			return null;
		}
		if(StringUtils.isEmpty(id) && StringUtils.isBlank(id)) {
			return null;
		}
		String sql="select * from "+tableName+" where id="+id;
		return service.selectBySQL(sql);
	}
	
	/**
	 * 配form字段绑定数据字典表查询
	 * @param type
	 * @return
	 */
	@RequestMapping("findDataConfigByType")
	@ResponseBody
	public List<Map<String, Object>> findDataConfigByType(String type) {
		String sql="select * from t_d_dataconfig where type='"+type+"'";
		return service.selectBySQL(sql);
	}
	
	/**
	 * 配form字段绑生成的表查询
	 * @param tablename
	 * @return
	 */
	@RequestMapping("findOtherTableData")
	@ResponseBody
	public List<Map<String, Object>> findOtherTableData(String tablename,String id,String operation,Integer level,Integer pid,String column,String columnValue) {
		String sql="select * from "+tablename;
		sql+=" where 1=1";
		if(StringUtils.isNotEmpty(id) && StringUtils.isNotBlank(id)) {
			sql += " and id " + operation + "'" +id+ "'" ;
		}
		if(level!=null&&!"".equals(level)){
			sql+=" and lever="+level;
		}
		if(pid!=null){
			sql+=" and pid="+pid;
		}
		if(column!=null&&!"".equals(column)){
			sql+=" and "+column+" like '%"+(columnValue==null?"":columnValue)+"%'";
		}
		return service.selectBySQL(sql);
	}
	
	/**
	 * 查询特定表下的树
	 * @param tablename
	 * @return
	 */
	@RequestMapping("findChooseUser")
	@ResponseBody
	public List<Map<String, Object>> findChooseUser(String tablename,String column,String columnValue,String searchValue) {
		
		try{
			List<Map<String, Object>> list=new ArrayList<Map<String, Object>>();
			
			if(columnValue!=null&&!"".equals(columnValue)&&columnValue.split(",").length>0){
				String cs[]=columnValue.split(",");
				List<Map<String, Object>> plist=null;
				String sql="select y.* from yonghubiao y";
				if("jiaosebiao".equals(tablename)){
					sql+=" left join jiaosebiao j on y.roleId=j.id";
				}
				if("bumenbiao".equals(tablename)){
					sql+=" left join bumenbiao b on y.departId=b.id";
					String s="";
					for(int i = 0 ; i< cs.length ; i++){
						if(i==cs.length-1){
							s+="'"+cs[i]+"'";
						}else{
							s+="'"+cs[i]+"',";
						}
						
					}
					plist = service.selectBySQL("select * from bumenbiao where name in ("+s+")");
					
				}
				sql+=" where 1=1";
				if(!"".equals(searchValue)&&searchValue!=null){
					sql+=" and y.username like '%"+searchValue+"%'";
				}
				if("bumenbiao".equals(tablename)){
					if(plist!=null&&plist.size()>0){
						
						for(int i = 0 ; i< plist.size() ; i++){
							String sql2=sql;
							Map<String, Object> m=new HashMap<String, Object>();
							m.put("id",plist.get(i).get("id")+"_0");
							m.put("name", cs[i]);
							m.put("pId", (plist.get(i).get("pid")==null?"":plist.get(i).get("pid")+"_0"));
							m.put("dflag", "parent");
							list.add(m);
							
							if("bumenbiao".equals(tablename)){
								sql2+=" and b.id='"+plist.get(i).get("id")+"'";
							}
							List<Map<String, Object>> childrens=service.selectBySQL(sql2);
							if(childrens!=null&&childrens.size()>0){
								for(Map<String, Object> map:childrens){
									Map<String, Object> map2=new HashMap<String, Object>();
									map2.put("id", map.get("id"));
									map2.put("name",  map.get("username"));
									map2.put("pId", plist.get(i).get("id")+"_0");
									map2.put("dflag", "user");
									list.add(map2);
								}
							}
						}
					}else{
						for(int i = 0 ; i< cs.length ; i++){
							Map<String, Object> m=new HashMap<String, Object>();
							m.put("id", "1_"+i);
							m.put("name", cs[i]);
							m.put("pid", "");
							m.put("dflag", "parent");
							list.add(m);
						}
					}
					
				}else{
					for(int i = 0 ; i< cs.length ; i++){
						Map<String, Object> m=new HashMap<String, Object>();
						m.put("id", "1_"+i);
						m.put("name", cs[i]);
						m.put("pid", "");
						m.put("dflag", "parent");
						list.add(m);
						
						if("jiaosebiao".equals(tablename)){
							sql+=" and j.name='"+cs[i]+"'";
						}
						if("bumenbiao".equals(tablename)){
							sql+=" and b.name='"+cs[i]+"'";
						}
						List<Map<String, Object>> childrens=service.selectBySQL(sql);
						if(childrens!=null&&childrens.size()>0){
							for(Map<String, Object> map:childrens){
								Map<String, Object> map2=new HashMap<String, Object>();
								map2.put("id", map.get("id"));
								map2.put("name",  map.get("username"));
								map2.put("pId", "1_"+i);
								map2.put("dflag", "user");
								list.add(map2);
							}
						}
					}
				}
				
			}
			
			return list;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
		
	}
	
	/**
	 * 返回form表单添加插件页面
	 * @param request
	 * @param formid
	 * @return
	 */
	@RequestMapping("getFormImportJsp")
    public String getFormImportJsp(HttpServletRequest request,String formid) {
		String flag = request.getParameter("flag");
		String sql="select p.project_en_name from sys_function s,project p where s.project_id=p.id and s.id="+formid;
		List<Map<String, Object>> list=service.selectBySQL(sql);
		request.setAttribute("projectName", list.get(0).get("project_en_name"));
		List<Map<String, Object>> jsList=service.selectBySQL("select * from t_u_attachment where type='js' and formid="+formid);
		request.setAttribute("jsList", jsList);
		List<Map<String, Object>> jarList=service.selectBySQL("select * from t_u_attachment where type='jar' and formid="+formid);
		request.setAttribute("jarList", jarList);
		if(flag != null && flag.equals("table")) {
			return "functionpagemanage/tableImportInfo";
		}
        return "functionpagemanage/formImportInfo";
    }
	
	/**
	 * 公共运行导入jar包的方法
	 * @param tablename
	 * @return
	 */
	@RequestMapping("runImportClassFun")
	@ResponseBody
	public List runImportClassFun(HttpServletRequest request,String jarname,String jarFunName,String runSqlFlag,String sql) {
		try {
			if("true".equals(runSqlFlag)){
				return service.selectBySQL(sql);
			}else{
				JarClassFileLoader.funName=jarFunName;
				JarClassFileLoader.runClassMethod(request.getSession().getServletContext().getRealPath("/")+"\\formAtt\\"+jarname);
				return new ArrayList();
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	private String getChildrenID(String tablename,String pid){
		StringBuffer s = new StringBuffer();
		List<Map<String, Object>> clist=service.selectBySQL("select * from "+tablename+" where pid="+pid);
		if(clist!=null&&clist.size()>0)
		{
			for(Map map:clist)
			{
				s.append(map.get("id")+",");
				s.append(getChildrenID(tablename, map.get("id")+""));
			}
		}
		return s.toString();
	}
	/**
	 * 获得项目功能树
	 */
	@RequestMapping("findFormTreeNode")
	@ResponseBody
	public List<TreeNode> findFromTreeNode(String tablename,String pid) {
		if(tablename==null||"".equals(tablename)){
			return new ArrayList<TreeNode>();
		}
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT * FROM "+tablename+" WHERE 1=1 ");
		if(pid!=null&&!"".equals(pid)){
			sql.append(" and id not in ("+getChildrenID(tablename, pid)+pid+")");
		}
		try {
			List<Map<String, Object>> listMap=service.selectBySQL(sql.toString());
			List<TreeNode> treeNodes=new ArrayList<TreeNode>();
			if(listMap!=null&&!listMap.isEmpty()){
				for(Map<String,Object> map:listMap){
					TreeNode tn=new TreeNode();
					tn.setId(String.valueOf(map.get("id")));
					tn.setpId(String.valueOf(map.get("pid")));
					tn.setName(String.valueOf(map.get("name")));
					treeNodes.add(tn);
				}
			}
			return treeNodes;
		}catch(Exception e){
			e.printStackTrace();
			return new ArrayList<TreeNode>();
		}
	}
	
	
	/**
	 * 用递归获得项目功能树
	 */
	private void getChildrenIDtoin(String tablename,Map map2,List<Map<String, Object>> commlist){
		List<Map<String, Object>> clist=service.selectBySQL("select * from "+tablename+" where pid="+map2.get("id"));
		if(clist!=null&&clist.size()>0)
		{
			for(Map map:clist)
			{
				List<Map<String, Object>> uq=service.selectBySQL("select * from "+tablename+" where id="+map.get("pid"));
				if(uq!=null&&uq.size()>0){
					map.put("pname", uq.get(0).get("name"));
				}else{
					map.put("pname", "--");
				}
				commlist.add(map);
				getChildrenIDtoin(tablename, map, commlist);
			}
			map2.put("dtype", "folder");
		}else{
			map2.put("dtype", "file");
		}
	}
	
	/**
	 * 用递归获得项目功能树
	 */
	@RequestMapping("findFormTreeNodeTable")
	@ResponseBody
	public List findFormTreeNodeTable(String tablename,String pid) {
		List<Map<String, Object>> clist=new ArrayList<Map<String, Object>>();
		Map<String, Object> m=new HashMap<String, Object>();
		m.put("id", "");
		m.put("pid", "");
		m.put("name", "(空)");
		m.put("lever", "");
		clist.add(m);
		if(tablename==null||"".equals(tablename)){
			return clist;
		}
		try {
			List<Map<String, Object>> parendList=service.selectBySQL("select * from "+tablename+" where pid=0");
			if(parendList!=null&&parendList.size()>0){
				for(Map map:parendList){
					clist.add(map);
					getChildrenIDtoin(tablename, map, clist);
				}
			}
			
			return clist;
		}catch(Exception e){
			e.printStackTrace();
			return clist;
		}
	}
	
	/**
	 * 公共的返回流程嵌套表单的页面
	 * @param request
	 * @return
	 */
	@RequestMapping("getFlowCommPage")
    public String getFlowCommPage(HttpServletRequest request) {
		String pagename=request.getParameter("fName");
		
		pagename=PinYinUtil.chineseToPinYin(pagename);
		
		System.out.print("============================="+pagename+"====================");
        return pagename;
    }
	
	
	/**
	 * 插入流程和表单的关联信息
	 */
	@RequestMapping("insertFormJoinProcess")
	@ResponseBody
	public String insertFormJoinProcess(HttpServletRequest request) {
		try{
			Map<String,String[]> parammap = request.getParameterMap();
			Set<String> set=parammap.keySet();
			StringBuffer sql = new StringBuffer("");
			sql.append("INSERT into form_join_proccess (");
			StringBuffer columns= new StringBuffer("");
			List clist=new ArrayList();
			for(String key:set){
				clist.add(key);
			}
			for(int i = 0;i<clist.size();i++){
				if(i!=clist.size()-1){
					sql.append(clist.get(i)+",");
					columns.append("'"+parammap.get(clist.get(i))[0]+"',");
				}else{
					sql.append(clist.get(i)+") VALUE(");
					columns.append("'"+parammap.get((String)clist.get(i))[0]+"')");
				}
			}
			sql.append(columns.toString());
			System.out.print(sql.toString());
			service.insertBySQL(sql.toString());
		}catch(Exception e){
			e.printStackTrace();
		}
		return "";
	}
	/**
	 * 更新流程和表单的关联信息
	 */
	@RequestMapping("updateFormJoinProcess")
	@ResponseBody
	public String updateFormJoinProcess(HttpServletRequest request) {
		try{
			String newTaskID=request.getParameter("newTaskID");
			String oldTaskID=request.getParameter("oldTaskID");
			String proccessId=request.getParameter("proccessId");
			String sql = "update form_join_proccess set taskId='"+newTaskID+"' where taskId='"+oldTaskID+"' and proccessId='"+proccessId+"'";
			System.out.print(sql);
			service.updateBySQL(sql);
		}catch(Exception e){
			e.printStackTrace();
		}
		return "";
	}
	/**
	 * 插入流程和表单的关联信息
	 */
	@RequestMapping("queryFormJoinProcess")
	@ResponseBody
	public List queryFormJoinProcess(HttpServletRequest request) {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		try{
			
			String pid=request.getParameter("proccessId");
			StringBuffer sql = new StringBuffer("");
			sql.append("select *  from form_join_proccess where proccessId='"+pid+"'");
			
			
			String tid = request.getParameter("tid");
			String s = "select *  from form_join_proccess where proccessId='"+pid+"' and taskId='"+tid+"'";
					
					
			list=service.selectBySQL(s);
			
			if(list!=null&&list.size()>0){
				Map<String, Object> map=list.get(0);
				sql.append("  and id <= "+map.get("id"));
			}
			
			list=service.selectBySQL(sql.toString());
			return list;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
		
	}
}
