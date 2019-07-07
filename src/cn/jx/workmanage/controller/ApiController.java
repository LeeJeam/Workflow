package cn.jx.workmanage.controller;

import javax.annotation.Resource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.hy.common.vo.JsonMessage;
import cn.jx.workmanage.service.IApiService;

/**
 * @author lijainbin
 *
 * 2016年9月14日
 */
@Controller
@Scope("prototype")
@RequestMapping("api/")
public class ApiController {

	
	@Resource(name="apiService")
	private IApiService apiService;
	/**
	 * 同步用户信息
	 * 1同步用户  userName,password
	 * @param param  {"userName":"用户名","editLoginName":"要修改的账号","loginName":"账号","password":"密码","roleName":"角色名称",
	 *                "deptName":"部门名称","ddcode":"钉钉号",
	 *                "tel":"手机号码","isRemove":"是否删除","resetPassword":"重置密码"}
	 * @return
	 */
	@RequestMapping(value="syncUserInfo")
	@ResponseBody
	public JsonMessage syncUserInfo(String param){
		try {
			return apiService.insertOrUpdateUser(param);
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false, "同步失败");
		}
	}
	
	
	/**
	 * 同步角色信息
	 * 1同步角色 roleName
	 * @param param  {"roleName":"角色名称","editRoleName":"要修改的角色名称","isRemove":"是否删除"}
	 * @return
	 */
	@RequestMapping(value="syncRole")
	@ResponseBody
	public JsonMessage syncRole(String param){
		try {
			return apiService.insertOrUpdateRole(param);
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false, "同步失败");
		}
	}
	
	/**
	 * 同步部门信息
	 * 1同步部门 deptName
	 * @param param  {"deptName":"部门名称","parentDeptName":"父级部门名称","editDeptName":"要修改的部门名称","isRemove":"是否删除"}
	 * @return
	 */
	@RequestMapping(value="syncDept")
	@ResponseBody
	public JsonMessage syncDept(String param){
		try {
			return apiService.insertOrUpdateDept(param);
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false, "同步失败");
		}
	}

	@RequestMapping(value="saveWorkingHours")
	@ResponseBody
	public boolean saveWorkingHours(String params) {
		try {
			apiService.insertProjectForm(params);
			return true;
		} catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}

}
