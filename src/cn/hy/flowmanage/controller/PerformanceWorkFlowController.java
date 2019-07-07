package cn.hy.flowmanage.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.FormService;
import org.activiti.engine.HistoryService;
import org.activiti.engine.IdentityService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.hy.basemanage.service.IUserService;
import cn.hy.common.controller.BaseController;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.flowmanage.form.ProcessBean;
import cn.hy.flowmanage.service.IActivitiService;
import cn.hy.flowmanage.service.IDoingFlow;
import cn.hy.flowmanage.service.IListenerService;
import cn.hy.flowmanage.service.IManagerFlowService;
import cn.hy.flowmanage.service.IProcessBussinEntityService;
import cn.hy.flowmanage.service.IProcessEntityService;
import cn.hy.flowmanage.service.IProcessNodeEntityService;
import cn.hy.flowmanage.service.IProcessVariableEntityService;
import cn.hy.flowmanage.service.ITypeService;
import cn.hy.functionmenumanage.service.ISysFunctionService;
@Controller
@Scope("prototype")
@RequestMapping("performanceWorkFlowController")
public class PerformanceWorkFlowController  extends BaseController{
	    protected static final Logger log = Logger.getLogger(PerformanceWorkFlowController.class);
	    @Resource(name = "typeService")
	    private ITypeService typeService;
	    @Resource(name = "sysFunctionService")
	    private ISysFunctionService sysFunctionService;
	    @Autowired
	    protected RuntimeService runtimeService;
	    @Resource(name = "listenerService")
	    private IListenerService listenerService;
	    @Autowired
	    protected TaskService taskService;
	    @Autowired
	    protected RepositoryService repositoryService;
	    @Autowired
	    protected IdentityService identityService;
	    @Resource
	    private IUserService userService;
	    @Autowired
	    protected HistoryService historyService;
	    @Autowired
	    protected FormService formService;

	    @Resource(name = "processEntityService")
	    private IProcessEntityService processEntityService;
	    @Resource(name = "processNodeEntityService")
	    private IProcessNodeEntityService processNodeEntityService;
	    @Resource(name = "processVariableEntityService")
	    private IProcessVariableEntityService processVariableEntityService;
	    @Resource(name = "doingFlow")
	    private IDoingFlow doingFlow;
	    @Resource(name = "managerFlow")
	    private IManagerFlowService managerFlow;
	    @Resource(name = "activitiService")
	    private IActivitiService activitiService;
	    @Resource(name = "processBussinEntityService")
	    private IProcessBussinEntityService processBussinEntityService;
	    @Resource(name = "createTableService")
	    private ICreateTableService service;
	    /**
	     * 待办工作查询
	     * @param request
	     * @return
	     */
	    @RequestMapping("/waitWorking")
	    @ResponseBody
		public List<ProcessBean> waitWorking(HttpServletRequest request,String keyword,String stateType) {
			// 通过用户名查询查询任务信息
			List<ProcessBean> objects = new ArrayList<ProcessBean>();
			String userId = (String) request.getSession().getAttribute("username");
			request.setAttribute("userId", userId);
			List<Task> tasks = activitiService.doingtask(userId);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			// 根据流程的业务ID查询实体并关联
			for (Task task : tasks) {
				ProcessBean process = new ProcessBean();
				ProcessInstance processInstance = activitiService.createProcessInstanceQuery(task);
				if (processInstance != null) {
					ProcessDefinition processDefintion = activitiService
							.getProcessDefinition(processInstance.getProcessDefinitionId());
					String startUser =historyService.createHistoricProcessInstanceQuery().
							processInstanceId(processInstance.getId()).singleResult().getStartUserId();
					process.setVarName(startUser);// 申请人
					List<Map<String, Object>>  bussinsList =processBussinEntityService.selectBySQL("select processname from process_bussiness where processid='" + processInstance.getId() + "' and processname is not null");
					if(bussinsList.size()>0){
						String processname =(String)bussinsList.get(0).get("processname");
						process.setProcessDefname(processname);
					}else{
						process.setProcessDefname(processDefintion.getName());
					}
					if (!processInstance.isSuspended()) {
						process.setProcessDefSuspended("正常");
					} else {
						process.setProcessDefSuspended("已挂起");
					}
					process.setIsuspended(processInstance.isSuspended());
					process.setTaskAssignee(task.getAssignee());
					process.setTaskId(task.getId());
					process.setTaskTaskDefinitionKey(task.getTaskDefinitionKey());
					process.setTaskTime(sdf.format(task.getCreateTime()));
					process.setTaskName(task.getName());
					process.setBusinessKey(processInstance.getBusinessKey());
					process.setProcesskey(processDefintion.getKey());
					process.setProcessInstId(processInstance.getId());
					objects.add(process);
				}

			}
			return objects;
		}
	    
	    /**
	     * 办结工作查询
	     * @param request
	     * @return
	     */
	    @RequestMapping("/overWorking")
	    @ResponseBody
		public List<ProcessBean> overWorking(HttpServletRequest request,String keyword,String stateType) {
	    	String userId = (String) request.getSession().getAttribute("username");
	    	List<ProcessBean> objects = new ArrayList<ProcessBean>();
		   List<HistoricTaskInstance>  historyTask =historyService.createHistoricTaskInstanceQuery().taskAssignee(userId).list();
		   SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			for (HistoricTaskInstance task : historyTask) {
				ProcessBean process = new ProcessBean();
				ProcessInstance processInstance =runtimeService.createProcessInstanceQuery().processInstanceId(task.getProcessInstanceId()).singleResult();
				if (processInstance != null) {
					ProcessDefinition processDefintion = activitiService
							.getProcessDefinition(processInstance.getProcessDefinitionId());
					String startUser =historyService.createHistoricProcessInstanceQuery().
							processInstanceId(processInstance.getId()).singleResult().getStartUserId();
					process.setVarName(startUser);// 申请人
					List<Map<String, Object>>  bussinsList =processBussinEntityService.selectBySQL("select processname from process_bussiness where processid='" + processInstance.getId() + "' and processname is not null");
					if(bussinsList.size()>0){
						String processname =(String)bussinsList.get(0).get("processname");
						process.setProcessDefname(processname);
					}else{
						process.setProcessDefname(processDefintion.getName());
					}
					if (!processInstance.isSuspended()) {
						process.setProcessDefSuspended("正常");
					} else {
						process.setProcessDefSuspended("已挂起");
					}
					process.setIsuspended(processInstance.isSuspended());
					process.setTaskAssignee(task.getAssignee());
					process.setTaskId(task.getId());
					process.setTaskTaskDefinitionKey(task.getTaskDefinitionKey());
					process.setTaskTime(sdf.format(task.getCreateTime()));
					process.setTaskName(task.getName());
					process.setBusinessKey(processInstance.getBusinessKey());
					process.setProcesskey(processDefintion.getKey());
					process.setProcessInstId(processInstance.getId());
					objects.add(process);
				}

			}
			return objects;
	    }
	    
	    /**
	     * 委托工作查询
	     * @param request
	     * @return
	     */
	    @RequestMapping("/offerWorking")
	    @ResponseBody
		public List<ProcessBean> offerWorking(HttpServletRequest request,String keyword,String stateType) {
	    	String userId = (String) request.getSession().getAttribute("username");
	    	List<Task> tasks = taskService.createTaskQuery().taskOwner(userId).list();
	    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    	List<ProcessBean> objects = new ArrayList<ProcessBean>();
	    	// 根据流程的业务ID查询实体并关联
			for (Task task : tasks) {
				ProcessBean process = new ProcessBean();
				ProcessInstance processInstance = activitiService.createProcessInstanceQuery(task);
				if (processInstance != null) {
					ProcessDefinition processDefintion = activitiService
							.getProcessDefinition(processInstance.getProcessDefinitionId());
					String startUser =historyService.createHistoricProcessInstanceQuery().
							processInstanceId(processInstance.getId()).singleResult().getStartUserId();
					process.setVarName(startUser);// 申请人
					List<Map<String, Object>>  bussinsList =processBussinEntityService.selectBySQL("select processname from process_bussiness where processid='" + processInstance.getId() + "' and processname is not null");
					if(bussinsList.size()>0){
						String processname =(String)bussinsList.get(0).get("processname");
						process.setProcessDefname(processname);
					}else{
						process.setProcessDefname(processDefintion.getName());
					}
					if (!processInstance.isSuspended()) {
						process.setProcessDefSuspended("正常");
					} else {
						process.setProcessDefSuspended("已挂起");
					}
					process.setIsuspended(processInstance.isSuspended());
					process.setTaskAssignee(task.getAssignee());
					process.setTaskId(task.getId());
					process.setTaskTaskDefinitionKey(task.getTaskDefinitionKey());
					process.setTaskTime(sdf.format(task.getCreateTime()));
					process.setTaskName(task.getName());
					process.setBusinessKey(processInstance.getBusinessKey());
					process.setProcesskey(processDefintion.getKey());
					process.setProcessInstId(processInstance.getId());
					objects.add(process);
				}

			}
		   return null;
		}
	    
	    
	    /**																																																															
	     * 会签工作查询
	     * @param request
	     * @return
	     */
	    @RequestMapping("/accountWorking")
	    @ResponseBody
		public List<ProcessBean> accountWorking(HttpServletRequest request,String keyword,String stateType) {
		   return null;
		}
	    
}
