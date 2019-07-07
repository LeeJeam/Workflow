package cn.jx.workmanage.service;

import cn.hy.common.vo.JsonMessage;

/**
 * @author lijainbin
 *
 * 2016年9月14日
 */
public interface IApiService {

	/**
	 * 同步用户信息
	 * 1同步用户  userName,password
	 * @param param  {"userName":"用户名","editLoginName":"要修改的账号","loginName":"账号","password":"密码","roleName":"角色名称",
	 *                "deptName":"部门名称","ddcode":"钉钉号",
	 *                "tel":"手机号码","isRemove":"是否删除","resetPassword":"重置密码"}
	 * @return
	 */
	public JsonMessage insertOrUpdateUser(String param);

	/**
	 * 同步角色信息
	 * 1同步角色 roleName
	 * @param param  {"roleName":"角色名称","editRoleName":"要修改的角色名称","isRemove":"是否删除"}
	 * @return
	 */
	public JsonMessage insertOrUpdateRole(String param);
	/**
	 * 同步部门信息
	 * 1同步部门 deptName
	 * @param param  {"deptName":"部门名称","parentDeptName":"父级部门名称","editDeptName":"要修改的部门名称","isRemove":"是否删除"}
	 * @return
	 */
	public JsonMessage insertOrUpdateDept(String param);
	
	/**
	 * 保存工时
	 * @param param 
	 *        [{"description":"姓名1","flowid":"流程1","time":"工时1","worktype":"流程类型1","flowname":"流程名称1"}
	 *        ,{"description":"姓名2","flowid":"流程2","time":"工时2","worktype":"流程类型2","flowname":"流程名称2"}
	 *        ]
	 * @return
	 */
	public JsonMessage insertProjectForm(String param);
}
