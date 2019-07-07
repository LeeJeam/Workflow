package cn.hy.flowmanage.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.hy.flowmanage.service.IProcessEntityService;

/**
 * @author lijianbin
 *
 * 2016年7月13日
 */
@Controller
@Scope("prototype")
@RequestMapping("imitate")
public class ImitateController {

	@Resource(name = "processEntityService")
	private IProcessEntityService processEntityService;
	
	@RequestMapping("/findUserpre")
	@ResponseBody
	public List<Map<String,Object>> findUserpre(){
		return processEntityService.selectMapBySQL("select  u_id as id,name from user");
	}
	
	@RequestMapping("/findRolepre")
	@ResponseBody
	public List<Map<String,Object>> findRolepre(){
		return processEntityService.selectMapBySQL("select id,name from role");
	}
	@RequestMapping("/findDeptpre")
	@ResponseBody
	public List<Map<String,Object>> findDept(){
		return processEntityService.selectMapBySQL("select id,name from dept");
	}
	@RequestMapping("/findUser")
	@ResponseBody
	public List<Map<String,Object>> findUser(){
		return processEntityService.selectMapBySQL("select  id,username as name from yonghubiao");
	}
	
	@RequestMapping("/findRole")
	@ResponseBody
	public List<Map<String,Object>> findRole(){
		return processEntityService.selectMapBySQL("select id,name from jiaosebiao");
	}
	@RequestMapping("/findPage")
	@ResponseBody
	public List<Map<String,Object>> findPage(){
		return processEntityService.selectMapBySQL("select id,name from bumenbiao");
	}
}
