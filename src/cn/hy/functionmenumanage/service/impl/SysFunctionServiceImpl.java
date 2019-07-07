package cn.hy.functionmenumanage.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import cn.hy.basemanage.dao.CreateTebleUserDao;
import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.impl.BaseService;
import cn.hy.common.utils.Base64Util;
import cn.hy.common.utils.DateUtil;
import cn.hy.common.utils.PinYinUtil;
import cn.hy.functionmenumanage.pojo.SysFunction;
import cn.hy.functionmenumanage.service.ISysFunctionService;
import cn.hy.functionmenumanage.vo.TreeNode;

/**
 * @author lijianbin
 *
 * 2016年1月25日
 */
@Service(value="sysFunctionService")
public class SysFunctionServiceImpl extends BaseService<CreateTebleUser> implements ISysFunctionService {

protected static final Logger log=Logger.getLogger(SysFunctionServiceImpl.class);
	
	@Resource(name="createTebleUserDao")
	public void setMapper(CreateTebleUserDao dao){
		mapper=dao;
	}
	
	public CreateTebleUserDao getDao(){
		return (CreateTebleUserDao)getMapper();
	}

	public Long insertEntity(SysFunction entity,Boolean isNeedId) {
		StringBuilder sb=new StringBuilder();
		sb.append("INSERT INTO sys_function (web_name, project_id, parent_id, modal_name, create_date, type, project_table_id,url, file_name,content,customerType,templet_name) VALUES (")
		.append("'").append(entity.getWebName()==null?"":entity.getWebName()).append("'")
		.append(",").append(entity.getProjetcId() == null ? "NULL" : entity.getProjetcId())
		.append(",").append(entity.getParentId()==null?"NULL":entity.getParentId())
		.append(",'").append(entity.getModalName()==null?"":entity.getModalName()).append("'")
		.append(",'").append(DateUtil.format(new Date(), "yyyy-MM-dd")).append("'")
		.append(",'").append(entity.getType() == null ? "" : entity.getType()).append("'")
		.append(",").append(entity.getProjectTableId() == null ? "NULL" : entity.getProjectTableId())
		.append(",'").append(entity.getUrl()==null?"/":PinYinUtil.chineseToPinYin(entity.getUrl())+"/").append("'")
		.append(",'").append(entity.getFileName() == null ? "" : PinYinUtil.chineseToPinYin(entity.getFileName())).append("'")
		.append(",'").append(Base64Util.getBase64(entity.getContent() != null ? entity.getContent() : "") + "'")
		.append(",'").append((entity.getFuncType() != null ? entity.getFuncType() : "")+"'")
		.append(",'").append(entity.getTempletName()==null?"":entity.getTempletName()).append("'").append(")");

		insertBySQL(sb.toString());
		if(isNeedId){
			return getLastInsertId();
		}
		return 1L;
	}
	
	public List<Map<String, Object>> findByProjectIdAndId(Long projectId,Long id,String typeid,String ctId,String webname) {
		StringBuilder sb=new StringBuilder("SELECT sf.id,sf.web_name,sf.project_id,sf.parent_id,sf.modal_name,sf.create_date,sf.type,sf.project_table_id,sf.file_name,sf.url,pt.table_alias ");
		sb.append(" FROM sys_function sf LEFT JOIN project_table pt ON sf.project_table_id = pt.id WHERE sf.type<>3 and sf.project_id=").append(projectId);

		if(StringUtils.isNotEmpty(webname) && StringUtils.isNotBlank(webname)) {
			sb.append(" and (sf.web_name like '%"+webname+"%' or sf.file_name like '%"+PinYinUtil.chineseToPinYin(webname)+"%') ");
		}

		if(StringUtils.isNotEmpty(typeid) && StringUtils.isNotBlank(typeid)){
			sb.append(" AND sf.type='").append(typeid).append("'");
		}
		if(id!=null){
			sb.append(" AND (sf.id=").append(id).append(" OR sf.parent_id=").append(id).append(")");
		}
		if(StringUtils.isNotEmpty(ctId) && StringUtils.isNotBlank(ctId)) {
			sb.append(" and sf.customerType ='"+ctId+"'");
		}

		sb.append("  ORDER BY sf.create_date DESC");
		return selectBySQL(sb.toString());
	}



	public List<TreeNode> findTreeNode(Long projectId) {
		List<Map<String, Object>> listMap=selectBySQL("SELECT id,web_name,parent_id,url,file_name FROM sys_function WHERE project_id="+projectId);
		List<TreeNode> treeNodes=new ArrayList<TreeNode>();
		TreeNode t=new TreeNode();
		t.setId("0");
		t.setpId("0");
		t.setName("(空)");
		t.setText("");
		treeNodes.add(t);
		if(listMap!=null&&!listMap.isEmpty()){
			for(Map<String,Object> map:listMap){
				TreeNode tn=new TreeNode();
				tn.setId(String.valueOf(map.get("id")));
				tn.setpId(String.valueOf(map.get("parent_id")));
				tn.setName(String.valueOf(map.get("web_name")));
				tn.setText(map.get("url")==null?"":(map.get("url")+""+map.get("file_name")));
				treeNodes.add(tn);
			}
		}
		return treeNodes;
	}

	@Override
	public List<TreeNode> findFlowForms(Long projectId) {
		List<Map<String, Object>> listMap=selectBySQL("SELECT id,web_name,parent_id,url,file_name FROM sys_function WHERE type = '5' and project_id="+projectId);
		List<TreeNode> treeNodes=new ArrayList<TreeNode>();
		if(listMap!=null&&!listMap.isEmpty()){
			for(Map<String,Object> map:listMap){
				TreeNode tn=new TreeNode();
				tn.setId(String.valueOf(map.get("id")));
				tn.setpId(String.valueOf(map.get("parent_id")));
				tn.setName(String.valueOf(map.get("web_name")));
				tn.setText(map.get("url")==null?"":(map.get("url")+""+map.get("file_name")));
				treeNodes.add(tn);
			}
		}
		return treeNodes;
	}

	public List<TreeNode> findFromTreeNode(Long projectId,String type,String menuPath,String level,String customerType) {
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT id,web_name,parent_id,url,file_name,customerType FROM sys_function WHERE 1=1 ");
		if(type != null) {
			String [] types = type.split(",");
			if(types.length > 1) {
				sql.append("and type in (" +type+ ")");
			} else {
				sql.append("and type = '" +type+ "'");
			}

		}
		if(StringUtils.isNotEmpty(menuPath) && StringUtils.isNotBlank(menuPath)) {
			String var0 = menuPath.replaceAll("'","\\\\'");
			String fileName  =  PinYinUtil.chineseToPinYin(menuPath);
			String var1 = fileName.replaceAll("'","\\\\'");
			sql.append(" and (web_name like '%"+var0+"%' or file_name like '%"+var1+"%')");
		}
		if(StringUtils.isNotEmpty(customerType) && StringUtils.isNotBlank(customerType)) {
			sql.append( " and customerType = " + customerType);
		}
		if(projectId != null) {
			sql.append(" and project_id=" + projectId);
		}

		List<TreeNode> treeNodes=new ArrayList<TreeNode>();

		TreeNode t=new TreeNode();
		t.setId("0");
		t.setpId("0");
		t.setName("(空)");
		t.setText("");
		treeNodes.add(t);

		if("true".equals(level)) {
			//sql.append(" and customerType is null");

			List<Map<String,Object>> customerTypes = selectBySQL("select * from project_customer_type e where e.type='page'");
			for(Map<String,Object> map:customerTypes) {
				TreeNode prt = new TreeNode();
				prt.setId(String.valueOf(map.get("id")));
				prt.setpId(null);
				prt.setName(String.valueOf(map.get("name")));
				prt.setText("");
				treeNodes.add(prt);
			}
		}
		List<Map<String, Object>> listMap=selectBySQL(sql.toString());
		if(listMap!=null&&!listMap.isEmpty()){
			for(Map<String,Object> map:listMap){
				TreeNode tn=new TreeNode();
				tn.setId(String.valueOf(map.get("id")));
				tn.setpId(String.valueOf(map.get("parent_id") != null ? map.get("parent_id") : map.get("customerType") != null ? map.get("customerType") :""));
				tn.setName(String.valueOf(map.get("web_name")));
				tn.setText(map.get("url")==null?"":(map.get("url")+""+map.get("file_name")));
				treeNodes.add(tn);
			}
		}
		return treeNodes;
	}

	public void updateC(Long id, String content,String modalName,String formProperties) {
		StringBuilder sb=new StringBuilder("UPDATE sys_function SET form_properties='"+formProperties+"', modal_name='"+modalName+"',  content='").append(Base64Util.getBase64(content)).append("' WHERE id=").append(id);
		updateBySQL(sb.toString());
	}

	public void updateC(Long id, String content) {
		StringBuilder sb=new StringBuilder("UPDATE sys_function SET  content='").append(Base64Util.getBase64(content)).append("' WHERE id=").append(id);
		updateBySQL(sb.toString());
	}

	public Map<String, Object> findById(Long id) {
		List<Map<String,Object>> list=selectBySQL("SELECT id,web_name,project_id,parent_id,modal_name,create_date,type,project_table_id,url,file_name,templet_name,content FROM sys_function where id="+id);
	    if(list!=null&&!list.isEmpty()){
	    	Map<String,Object> map=list.get(0);
	    	Object content=map.get("content");
	    	if(content!=null){
	    		map.put("content", Base64Util.getFromBase64(String.valueOf(content)));
	    	}
	    	
	    	return map;
	    }
	    return null;
	}

	public Integer deleteById(Long id) {
		deleteBySQL("DELETE FROM t_u_attachment WHERE formid="+id);
	   return deleteBySQL("DELETE FROM sys_function WHERE ID="+id);
	}

	@Override
	public List<Map<String, Object>> findByProjectAndTableIdAndType(Long projectId, Long tableId, Integer type) {
		StringBuffer sql = new StringBuffer();

		sql.append("SELECT sf.id,sf.web_name,sf.project_id,sf.parent_id,sf.modal_name,sf.create_date,sf.type,sf.project_table_id,sf.file_name,sf.url,sf.content ");
		sql.append(" FROM sys_function sf WHERE sf.project_id = "+projectId+" AND sf.project_table_id = "+tableId+" and sf.type = " + type);
		return selectBySQL(sql.toString());
	}

	@Override
	public List<Map<String, Object>> selectone(Object id) {
		return selectBySQL("select * from sys_function where id="+id);
	}

	@Override
	public boolean updateTableContent(Long id,String content) {
		List<Map<String,Object>> datas = selectone(id);
		if(datas == null && datas.isEmpty()) {
			return false;
		}
		if(datas.get(0) != null && "2".equals(datas.get(0).get("type"))) //判断是不是表单提交
		{
			String pidStr = String.valueOf(datas.get(0).get("pid") != null ? datas.get(0).get("pid") : "0");

			if (StringUtils.isNotEmpty(pidStr) && StringUtils.isNotBlank(pidStr))
			{
				Long pid = Long.parseLong(pidStr);
				List<Map<String,Object>> tabDatas = selectone(pid);

				if(tabDatas != null && !tabDatas.isEmpty())
				{
					String tabContent = Base64Util.getFromBase64(String.valueOf(tabDatas.get(0).get("content") != null ? tabDatas.get(0).get("content") : ""));

					String modalBody = "<div class=\"modal-body\">";
					String secodeStart = "<div class=\"modal-footer\">";

					String first = tabContent.substring(0,tabContent.indexOf(modalBody) + modalBody.length());
					String secode = tabContent.substring(tabContent.indexOf(secodeStart),tabContent.length());

					StringBuffer str = new StringBuffer();
					str.append(first).append(content).append("</div>").append(secode);
					updateC(pid,str.toString());
				}
			}
		}
		return true;
	}

	@Override
	public List<Map<String, Object>> selectProcessForm(Long projectId) {
		String sql="select web_name value,web_name text from sys_function where type=5 and project_id="+projectId;
		return selectBySQL(sql);
	}
	
	
}
