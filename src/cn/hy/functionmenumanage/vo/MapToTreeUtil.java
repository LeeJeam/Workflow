package cn.hy.functionmenumanage.vo;

import java.util.*;
import java.util.Map.Entry;
import org.apache.commons.lang3.StringUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * @author lijianbin
 *
 * 2016年1月30日
 */
public class MapToTreeUtil {

	/**
	 * 将对象装换成树
	 * @param list  对象集合，必须是菜单表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static List<Map<String,Object>> listToTreeList(List<Map<String,Object>> list){
		//为空返回
		if(list==null||list.isEmpty()){
			return null;
		}
		List<Map<String,Object>> menus = new ArrayList<Map<String,Object>>();
		Map<Object,Map<String,Object>> tmpTree = new LinkedHashMap<Object, Map<String,Object>>();
		int size=list.size();
		//转换成Map
		for (int i=0;i<size;i++) {
			tmpTree.put(list.get(i).get("id"), list.get(i));
		}
		for (Entry<Object, Map<String, Object>> entry:tmpTree.entrySet()) {
			Object i=entry.getKey();
			Map<String, Object> s=tmpTree.get(i);
			//是否有父级
			Object pid=s.get("pid");
			if(pid!=null){
				//父级对象
				Map<String, Object> p=tmpTree.get(pid);
				//子集
				List<Map<String,Object>> c=(List<Map<String, Object>>) p.get("children");
				if(c==null){
					c=new ArrayList<Map<String,Object>>();
					p.put("children", c);
				}
				//保存子集
				c.add(s);
			}else{
				menus.add(s);
			}
		}
		return menus;
	}
	
	/**
	 * 将对象装换成树
	 * @param jsonArray  对象集合，必须是菜单表
	 * @return
	 */
	public static List<MenuTreeNode> listToTreeEntity(JSONArray jsonArray){
		//为空返回
		if(jsonArray==null||jsonArray.isEmpty()){
			return null;
		}
		List<MenuTreeNode> menus = new ArrayList<MenuTreeNode>();
		Map<String,MenuTreeNode> tmpTree = new HashMap<String, MenuTreeNode>();
		int size=jsonArray.size();
		//转换成Map
		for (int i=0;i<size;i++) {
			JSONObject jsonObject=jsonArray.getJSONObject(i);
			MenuTreeNode node=new MenuTreeNode();
			node.setId(jsonObject.optString("id"));
			node.setName(jsonObject.optString("name"));
			String pId=jsonObject.optString("pId");
			if(pId.toString().equals("null")){
				node.setpId(null);
			}else{
				node.setpId(pId);
			}
			node.setText(jsonObject.optString("text"));
			Long sysFunctionId=jsonObject.optLong("sysFunctionId");
			if(sysFunctionId==0){
				node.setSysFunctionId(null);
			}else{
				node.setSysFunctionId(sysFunctionId);
			}
			node.setText(jsonObject.optString("text"));
			node.setIsDelete(jsonObject.optBoolean("isDelete"));
			node.setIsUpdate(jsonObject.optBoolean("isUpdate"));
			node.setIsInsert(jsonObject.optBoolean("isInsert"));
			tmpTree.put(jsonObject.optString("id"), node);
		}
		for (Entry<String, MenuTreeNode> entry:tmpTree.entrySet()) {
			Object i=entry.getKey();
			MenuTreeNode s=tmpTree.get(i);
			//是否有父级
			String pid=s.getpId();
			if(StringUtils.isNotBlank(pid)){
				//父级对象
				MenuTreeNode p=tmpTree.get(pid);
				//子集
				List<MenuTreeNode> c=p.getChildren();
				if(c==null){
					c=new ArrayList<MenuTreeNode>();
					p.setChildren(c);
				}
				//保存子集
				c.add(s);
			}else{
				menus.add(s);
			}
		}
		return menus;
	}
}
