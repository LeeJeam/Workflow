package cn.jx.workmanage.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import cn.hy.common.utils.DateUtil;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.jx.workmanage.service.IApiService;

/**
 * @author lijainbin
 *
 * 2016年9月14日
 */
@Service(value="apiService")
public class ApiServiceImpl implements IApiService {

	private final static Logger log= Logger.getLogger(ApiServiceImpl.class);
	
	@Resource(name="createTableService")
	private ICreateTableService service;
	/**
	 * 同步用户信息
	 * 1同步用户  userName,password
	 * @param param  {"userName":"用户名","editLoginName":"要修改的账号","loginName":"账号","password":"密码","roleName":"角色名称",
	 *                "deptName":"部门名称","ddcode":"钉钉号",
	 *                "tel":"手机号码","isRemove":"是否删除","resetPassword":"重置密码"}
	 * @return
	 */
	@Override
	public JsonMessage insertOrUpdateUser(String param) {
		log.info("参数param:"+param);
		//参数不能为空
		if(StringUtils.isNotBlank(param)){
			JSONObject jsonObject=JSON.parseObject(param);
			String userName=jsonObject.getString("userName");
			String editLoginName=jsonObject.getString("editLoginName");
			String loginName=jsonObject.getString("loginName");
			String password=jsonObject.getString("password");
			String roleName=jsonObject.getString("roleName");
			String deptName=jsonObject.getString("deptName");
			String ddcode=jsonObject.getString("ddcode");
			String tel=jsonObject.getString("tel");
			Boolean isRemove=jsonObject.getBoolean("isRemove");
			Boolean resetPassword=jsonObject.getBoolean("resetPassword");
			if(true==isRemove){//删除
				if(StringUtils.isNotBlank(userName)){
					boolean isok=deleteUser(editLoginName);
					if(isok){
						return new JsonMessage(true, "删除成功");
					}else{
						return new JsonMessage(false, "删除失败");
					}
					
				}else{
					return new JsonMessage(false, "用户名称不能为空");
				}
			}
			if(true==resetPassword){//只单独修改密码
				if(StringUtils.isNotBlank(editLoginName)){
					boolean isok=updatePawword(editLoginName,password);
					if(isok){
						return new JsonMessage(true, "修改密码成功");
					}else{
						return new JsonMessage(false, "修改密码失败");
					}
					
				}else{
					return new JsonMessage(false, "用户名称不能为空");
				}
			}
			if(StringUtils.isNotBlank(userName)&&
					StringUtils.isNotBlank(password)&&
					StringUtils.isNotBlank(roleName)&&
					StringUtils.isNotBlank(deptName)){
				if(StringUtils.isBlank(editLoginName)){//增加一个用户
					//部门主键
					Object did=getDeptIdByDeptName(deptName);
					//增加部门信息
					Object rid=getRoleIdByRoleName(roleName);
					//增加用户
					insertUser(password, userName,loginName, rid.toString(), did.toString(), ddcode, tel, false);
					return new JsonMessage(true, "同步成功");

				}else{//修改用户信息
					Map<String,Object> user=findUser(editLoginName);
					if(null!=user){
						//更改角色信息
						Object roleId=getRoleIdByRoleName(roleName);
						updateUser(password, userName,loginName ,roleId.toString(), ddcode, tel,editLoginName);
						return new JsonMessage(true, "同步成功");
					}
					
				}
			}else{
				return new JsonMessage(false, "用户名、密码、角色名称、部门名称不能为空");
			}
			
		}else{
			return new JsonMessage(false, "参数为空");
		}
		return new JsonMessage(false, "失败");
	}
	
	/**
	 * 同步角色信息
	 * 1同步角色 roleName
	 * @param param  {"roleName":"角色名称","editRoleName":"要修改的角色名称","isRemove":"是否删除"}
	 * @return
	 */
	@Override
	public JsonMessage insertOrUpdateRole(String param) {
		log.info("参数param:"+param);
		//参数不能为空
		if(StringUtils.isNotBlank(param)){
			JSONObject jsonObject=JSON.parseObject(param);
			String editRoleName=jsonObject.getString("editRoleName");
			String roleName=jsonObject.getString("roleName");
			Boolean isRemove=jsonObject.getBoolean("isRemove");
			if(StringUtils.isNotBlank(roleName)){
				if(null!=isRemove&&true==isRemove){
					boolean isok=deleteRole(roleName);
					if(isok){
						return new JsonMessage(true, "删除成功");
					}else{
						return new JsonMessage(false, "删除失败");
					}
				}
				if(StringUtils.isNotBlank(editRoleName)){//修改
					Object rid=getRoleIdByRoleName(editRoleName);
					if(null==rid){
						log.warn("没有该角色,角色名称:"+editRoleName);
						return new JsonMessage(false, "更新失败");
					}
					updateRole(roleName, rid.toString());
					return new JsonMessage(true, "更新成功");
				}else{//保存
					Object isOk=insertRole(roleName, false);
					if(isOk.equals(true)){
						return new JsonMessage(true, "保存成功");
					}
				}
			}else{
				return new JsonMessage(false, "角色名称为空");
			}
			
		}else{
			return new JsonMessage(false, "参数为空");
		}
		return new JsonMessage(false, "失败");
	}
	
	/**
	 * 同步部门信息
	 * 1同步部门 deptName
	 * @param param  {"deptName":"部门名称","parentDeptName":"父级部门名称","editDeptName":"要修改的部门名称","isRemove":"是否删除"}
	 * @return
	 */
	public JsonMessage insertOrUpdateDept(String param){
		log.info("参数param:"+param);
		//参数不能为空
		if(StringUtils.isNotBlank(param)){
			JSONObject jsonObject=JSON.parseObject(param);
			String deptName=jsonObject.getString("deptName");
			String parentDeptName=jsonObject.getString("parentDeptName");
			String editDeptName=jsonObject.getString("editDeptName");
			Boolean isRemove=jsonObject.getBoolean("isRemove");
			if(StringUtils.isNotBlank(deptName)){
				if(null!=isRemove&&true==isRemove){
					boolean isok=deleteDept(deptName);
					if(isok){
						return new JsonMessage(true, "删除成功");
					}else{
						return new JsonMessage(false, "删除失败");
					}
				}
				if(StringUtils.isNotBlank(editDeptName)){//修改
					Object pid=null;
					if(StringUtils.isNotBlank(parentDeptName)){
						pid=getDeptIdByDeptName(parentDeptName);
						if(null==pid){
							log.warn("没有该部门,部门名称:"+parentDeptName);
							return new JsonMessage(false, "更新失败");
						}
					}
					//更新
					updateDept(deptName, pid==null?null:pid.toString(),editDeptName);
					return new JsonMessage(true, "更新成功");
				}else{//保存
					Object pid=null;
					if(StringUtils.isNotBlank(parentDeptName)){
						pid=getDeptIdByDeptName(parentDeptName);
						if(null==pid){
							log.warn("没有该部门,部门名称:"+parentDeptName);
							return new JsonMessage(false, "更新失败");
						}
					}
					//保存
					Object isOk=insertDept(deptName, pid==null?null:pid.toString(), false);
					if(isOk.equals(true)){
						return new JsonMessage(true, "保存成功");
					}
				}
			}else{
				return new JsonMessage(false, "部门名称为空");
			}
			
		}else{
			return new JsonMessage(false, "参数为空");
		}
		return new JsonMessage(false, "失败");
	}
	
	/**
	 * 保存工时
	 * @param param 
	 *        [{"description":"姓名1","flowid":"流程1","time":"工时1","worktype":"流程类型1","flowname":"流程名称1"}
	 *        ,{"description":"姓名2","flowid":"流程2","time":"工时2","worktype":"流程类型2","flowname":"流程名称2"}
	 *        ]
	 * @return
	 */
	@Override
	public JsonMessage insertProjectForm(String param) {
	    if(StringUtils.isNotBlank(param)){
	    	JSONArray array=JSONArray.parseArray(param);
	    	if(null!=array&&!array.isEmpty()){
	    		String savetime=DateUtil.format(new Date(), "yyyy-MM-dd HH:mm:ss");
	    		int size=array.size();
	    		StringBuilder sb=new StringBuilder();
	    		String worktype=null;
	    		Integer flowid=null;
	    		String time=null;
	    		String description=null;
	    		String uid=null;
	    		String flowname=null;
				String projectno = null;
	    		for(int i=0;i<size;i++){
	    			JSONObject json=array.getJSONObject(i);
	    			worktype=json.getString("worktype");
	    			flowid=json.getInteger("flowid");
	    			flowname=json.getString("flowname");
	    			time=json.getString("time");
	    			description=json.getString("description");
					projectno=json.getString("projectno");
	    			uid=findUserIdByName(description);
	    			//拼凑sql语句
	    			if(sb.length()>0){
	    				sb.append(",");
	    			}
	    			sb.append("(")
	    			  .append("'").append(worktype==null?"":worktype).append("',")
	    			  .append("'").append(savetime).append("',")
	    			  .append("'").append(savetime).append("',")
	    			  .append("'").append(time==null?"0":time).append("',")
	    			  .append("'0',")
	    			  .append("'").append(description==null?"":description).append("',")
	    			  .append("'").append(flowid==null?"":flowid).append("',")
	    			  .append("'").append(flowname==null? "":flowname).append("',")
	    			  .append("'").append(uid==null ? "0":uid).append("',")
					.append("'").append(projectno == null ? "" : projectno)	.append("'")
	    			.append(")");
	    		}
	    		if(sb.length()>0){
	    			sb.insert(0, "insert into hys_projectform (workType, starttime, endtime, time, state, description, flowid, flowName,u_id,projectno) values ");
	    		}
	    		//批量保存数据
	    		service.insertBySQL(sb.toString());
	    		return new JsonMessage(true, "保存成功");
	    	}else{
	    		return new JsonMessage(false, "数组为空");
	    	}
	    }else{
	    	return new JsonMessage(false, "参数param值为空");
	    }	
	}
	
	
	/***********************************************************非接口实现方法****************************************************/
	
	/**
	 * 通过部门名称查询部门信息主键
	 * @param deptName 部门名称
	 * @return
	 */
	public String getDeptIdByDeptName(String deptName){
		if(StringUtils.isNotBlank(deptName)){
			List<Map<String,Object>> list=service.selectMapBySQL("SELECT id FROM bumenbiao WHERE name='"+deptName+"'");
			if(null!=list&&!list.isEmpty()){
				return list.get(0).get("id").toString();
			}else{
				log.warn("没有部门名称是"+deptName+"的信息");
			}
		}
		return null;
	}
	
	/**
	 * 插入部门信息
	 * @param deptName 部门名称
	 * @param pid 父级主键
	 * @param isRetrunId 是否返回主键
	 * @return
	 */
	public Object insertDept(String deptName,String pid,Boolean isRetrunId){
		if(StringUtils.isNotBlank(deptName)){
			service.insertBySQL("INSERT INTO bumenbiao(name, pid) VALUES ('"+deptName+"', "+(null==pid?"NULL":("'"+pid+"'"))+")");
			if(isRetrunId){
				return service.getLastInsertId();
			}
			return true;
		}
		return false;
	}
	
	/**
	 * 修改部门信息
	 * @param deptName 部门名称
	 * @param pid 父级主键
	 * @param editDeptName  要修改的部门名称
	 * @return
	 */
	public Object updateDept(String deptName,String pid, String editDeptName){
		if(StringUtils.isNotBlank(deptName)){
			service.updateBySQL("UPDATE  bumenbiao SET name='"+deptName+"', pid="+(null==pid?"NULL":("'"+pid+"'"))+" WHERE name='"+editDeptName+"'");
			return true;
		}
		return false;
	}
	
	/**
	 * 删除部门信息
	 * @param deptName 部门名称
	 * @return
	 */
	public boolean deleteDept(String deptName){
		if(StringUtils.isNotBlank(deptName)){
			service.deleteBySQL("DELETE FROM bumenbiao WHERE name='"+deptName+"'");
			return true;
		}
		return false;
	}
	
	/**
	 * 插入角色信息
	 * @param roleName 角色名称
	 * @param isRetrunId 是否返回主键
	 * @return
	 */
	public Object insertRole(String roleName,Boolean isRetrunId){
		if(StringUtils.isNotBlank(roleName)){
			service.insertBySQL("INSERT INTO jiaosebiao (name) VALUES ('"+roleName+"')");
			if(isRetrunId){
				return service.getLastInsertId();
			}
			return true;
		}
		return false;
	}
	
	/**
	 * 修改角色信息
	 * @param roleName 角色名称
	 * @param id 主键
	 * @return
	 */
	public boolean updateRole(String roleName,String id){
		if(StringUtils.isNotBlank(roleName)){
			service.updateBySQL("UPDATE jiaosebiao SET name='"+roleName+"' WHERE id='"+id+"'");
			return true;
		}
		return false;
	}
	
	/**
	 * 删除角色信息
	 * @param roleName 角色名称
	 * @return
	 */
	public boolean deleteRole(String roleName){
		if(StringUtils.isNotBlank(roleName)){
			service.deleteBySQL("DELETE FROM jiaosebiao WHERE name='"+roleName+"'");
			return true;
		}
		return false;
	}
	
	/**
	 * 通过角色名称获得角色主键
	 * @param roleName  角色名称
	 * @return
	 */
	public Object getRoleIdByRoleName(String roleName){
		if(StringUtils.isNotBlank(roleName)){
			List<Map<String,Object>> list=service.selectMapBySQL("SELECT id FROM jiaosebiao WHERE name='"+roleName+"'");
			if(null!=list&&!list.isEmpty()){
				return list.get(0).get("id");
			}
		}
		return null;
	}
	
	/**
	 * 插入用户信息
	 * @param password  密码
	 * @param userName  用户名
	 * @param loginName 账号
	 * @param roleId    角色主键
	 * @param departId  部门主键
	 * @param ddcode    钉钉
	 * @param tel       电话号码
	 * @param isRetrunId  是否返回主键
	 * @return
	 */
	public Object insertUser(String password,String userName,String loginName,String roleId,String departId,String ddcode,String tel,Boolean isRetrunId){
		StringBuilder sb=new StringBuilder();
		sb.append("INSERT INTO yonghubiao (password, username,loginname ,roleId, departId, ddcode, tel) VALUES (")
		.append("'").append(null==password?"NULL":password).append("',")
		.append("'").append(null==userName?"NULL":userName).append("',")
		.append("'").append(null==loginName?"NULL":loginName).append("',")
		.append("'").append(null==roleId?"NULL":roleId).append("',")
		.append("'").append(null==departId?"NULL":departId).append("',")
		.append("'").append(null==ddcode?"NULL":ddcode).append("',")
		.append("'").append(null==tel?"NULL":tel).append("')");
		
		service.insertBySQL(sb.toString());
		if(isRetrunId){
			return service.getLastInsertId();
		}
		return true;
	}
	
	/**
	 * 更新用户信息
	 * @param password  密码
	 * @param userName  用户名
	 * @param loginName 账号
	 * @param roleId    角色主键
	 * @param ddcode    钉钉
	 * @param tel       电话号码
	 * @param editUserName  要修改的账号
	 * @return
	 */
	public Object updateUser(String password,String userName,String loginName,String roleId,String ddcode,String tel, String editUserName){
		StringBuilder sb=new StringBuilder();
		sb.append("UPDATE yonghubiao SET ")
		.append("password='").append(null==password?"NULL":password).append("',")
		.append("userName='").append(null==userName?"NULL":userName).append("',")
		.append("loginname='").append(null==loginName?"NULL":loginName).append("',")
		.append("roleId='").append(null==roleId?"NULL":roleId).append("',")
		.append("ddcode='").append(null==ddcode?"NULL":ddcode).append("',")
		.append("tel='").append(null==tel?"NULL":tel).append("'")
		.append(" where loginname='").append(editUserName).append("'");
		
		service.updateBySQL(sb.toString());
		return true;
	}
	
	/**
	 * 通过用户名称查询用户数据
	 * @param userName  账号
	 * @return
	 */
	public Map<String,Object> findUser(String editLoginName){
		if(StringUtils.isNotBlank(editLoginName)){
			List<Map<String,Object>> list=service.selectMapBySQL("SELECT id,password,username,roleId,departId,ddcode,tel,loginname FROM yonghubiao WHERE loginname='"+editLoginName+"'");
			if(null!=list&&!list.isEmpty()){
				return list.get(0);
			}
		}
		return null;
	}

	/**
	 * 通过账号删除用户数据
	 * @param loginname  账号
	 * @return
	 */
	public boolean deleteUser(String loginname){
		if(StringUtils.isNotBlank(loginname)){
			service.deleteBySQL("DELETE FROM yonghubiao  WHERE loginname='"+loginname+"'");
			return true;
		}
		return false;
	}
	
	/**
	 * 修改密码
	 * @param loginname 账号
	 * @param password 密码
	 * @return
	 */
	public boolean updatePawword(String loginname,String password){
		if(StringUtils.isNotBlank(loginname)){
			service.deleteBySQL("UPDATE yonghubiao SET password='"+password+"' WHERE loginname='"+loginname+"'");
			return true;
		}
		return false;
	}
	
	
	/**
	 * 更加用户姓名查找用户表主键(绩效表专用)
	 * @param name   用户姓名
	 * @return
	 */
	public String findUserIdByName(String name){
		try {
			if(StringUtils.isNotBlank(name)){
				List<Map<String, Object>> list=service.selectMapBySQL("select u_id from hys_user where name='"+name+"'");
				if(null!=list&&!list.isEmpty()){
					return list.get(0).get("u_id").toString();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	} 

}
