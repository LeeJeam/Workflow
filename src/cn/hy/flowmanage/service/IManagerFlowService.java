package cn.hy.flowmanage.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.hy.common.vo.JsonMessage;

/**
 * 
 * @author nmc/lxz
 * 
 */

public  interface IManagerFlowService {
	
	/**
	 * 保存设计器设计的流程（未部署）
	 * @param request
	 * @param processDescriptor     流程XML数据
	 * @param nodes            流程节点数据
	 * @param processName      流程名称
	 * @param processkey       流程主键
	 * @param typeid           类型
	 * @param documentation    流程描述
	 * @param removeDate       要删除的节点数据
	 * @param formid           表单主键
	 * @return
	 * @throws Exception
	 */
	public boolean saveProcess(HttpServletRequest request,String processDescriptor, String lines,String processName, String processkey, String typeid,String documentation, String removeDate, String formid);

	/**
	 * 部署一个流程
	 * @return
	 */
	public boolean deployFlow(String processid);

	/**
	 * 编辑流程
	 * @param request
	 * @param response
	 * @return
	 */
	public String editFlow(HttpServletRequest request, HttpServletResponse response);

	/**
	 * 启用或禁用流程
	 * @param processid
	 * @param type
	 * @return
	 * @throws Exception
	 */
	public String ForbiddenOrUsing(String processid, String type) throws Exception;

	/**
	 * 查看流程图
	 * @param processkey
	 * @param response
	 * @throws Exception
	 */
	public void FlowImage(String piid, HttpServletResponse response)throws Exception;

	/**
	 * 删除流程相关信息
	 * 
	 * @param processId   流程主键
	 * @return
	 */
	public void deleteProcess(String processId);

	/**
	 * 部署启用的全部流程
	 */
	public void deployFlows();

	/***
	 * 根据form查询流程信息
	 * @param formName
	 * @return
	 */
	public String findProcessByFormName(String formName);
	
	/**
	 * 创建流程与编辑流程
	 * @param request
	 * @return
	 */
	public String index(HttpServletRequest request);
	
	/**
	 * 删除流程数据
	 * @param processId   流程ID
	 * @return
	 */
	public JsonMessage delPro(String processId);
	
	
	public String processProperties(HttpServletRequest request, String turn, String checkbox, String processId,String id,String isMultiple,String isGrouple);

}
