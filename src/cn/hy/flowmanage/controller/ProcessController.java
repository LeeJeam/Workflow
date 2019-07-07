
package cn.hy.flowmanage.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.hy.common.utils.PinYinUtil;
import cn.hy.common.utils.SessionUtil;
import cn.hy.common.vo.FunctionDataTypeVo;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.projectmanage.pojo.Project;

import com.alibaba.fastjson.JSONArray;

import org.activiti.engine.FormService;
import org.activiti.engine.HistoryService;
import org.activiti.engine.IdentityService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.hy.basemanage.service.IUserService;
import cn.hy.common.controller.BaseController;
import cn.hy.common.utils.Base64Util;
import cn.hy.common.vo.JsonMessage;
import cn.hy.flowmanage.form.ProcessBean;
import cn.hy.flowmanage.pojo.ProcessEntity;
import cn.hy.flowmanage.pojo.ProcessVariableEntity;
import cn.hy.flowmanage.pojo.UserProcessbean;
import cn.hy.flowmanage.service.IActivitiService;
import cn.hy.flowmanage.service.IDoingFlow;
import cn.hy.flowmanage.service.IListenerService;
import cn.hy.flowmanage.service.IManagerFlowService;
import cn.hy.flowmanage.service.IProcessBussinEntityService;
import cn.hy.flowmanage.service.IProcessEntityService;
import cn.hy.flowmanage.service.IProcessNodeEntityService;
import cn.hy.flowmanage.service.IProcessVariableEntityService;
import cn.hy.flowmanage.service.ITypeService;
import cn.hy.flowmanage.service.impl.DoingFlow;
import cn.hy.functionmenumanage.service.ISysFunctionService;
import cn.hy.functionmenumanage.vo.TreeNode;

@Controller
@Scope("prototype")
@RequestMapping("processController")
public class ProcessController extends BaseController {
    protected static final Logger log = Logger.getLogger(ProcessController.class);

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
     * 流程：发布前模块（保存、编辑、删除、启用、查看、流程属性）
     */
    /*********************************************************************/
    /**
     * 保存流程（未部署）
     *
     * @param request
     * @param processDescriptor 流程XML数据
     * @param nodes             流程节点数据
     * @param processName       流程名称
     * @param processkey        流程主键
     * @param typeid            类型
     * @param documentation     流程描述
     * @param removeDate        要删除的节点数据
     * @return
     * @throws Exception
     */
    @RequestMapping("/saveProcess")
    @ResponseBody
    public JsonMessage saveProcess(HttpServletRequest request, String processDescriptor, String nodes, String processName,
                                   String processkey, String typeid, String documentation, String removeDate, String formid) throws Exception {
        boolean saveProcess = managerFlow.saveProcess(request, processDescriptor, nodes, processName, processkey, typeid, documentation, removeDate, formid);
        if (saveProcess) {
            return new JsonMessage(true, "保存成功");
        } else {
            return new JsonMessage(false, "保存失败");
        }
    }

    /**
     * 创建流程与编辑流程
     *
     * @param request
     * @return
     */
    @RequestMapping("/index")
    public String index(HttpServletRequest request) {
        return managerFlow.index(request);
    }

    /**
     * 删除流程数据
     *
     * @param processId 流程ID
     * @return
     */
    @RequestMapping("/delPro")
    @ResponseBody
    public JsonMessage delPro(String processId) {
        return managerFlow.delPro(processId);
    }

    /**
     * 启用禁用流程
     *
     * @param processid 流程ID
     * @param in
     * @param type      流程类型
     * @return
     */
    @RequestMapping("/ForbiddenOrUsing")
    @ResponseBody
    public String ForbiddenOrUsing(String processid, String type) throws Exception {
        return managerFlow.ForbiddenOrUsing(processid, type);
    }

    @RequestMapping("/processList")
    public ModelAndView processList(HttpServletRequest request, String typeid) {
        request.setAttribute("typeid", typeid);
        return new ModelAndView("header-page/processList");
    }

    /**
     * 查看流程图
     *
     * @return
     */
    @RequestMapping("/viewImg")
    public String viewImg() {
        return "flowmanage/flowImage";
    }

    /**
     * 查询流程配置属性信息
     *
     * @param request
     * @param turn       返回页面
     * @param checkbox   流程类型
     * @param processId  流程ID
     * @param isMultiple
     * @return
     */
    @RequestMapping("/processProperties")
    public String processProperties(HttpServletRequest request, String turn, String checkbox, String processId, String id, String isMultiple,String isGrouple) {
        return managerFlow.processProperties(request, turn, checkbox, processId, id, isMultiple,isGrouple);
    }
    /**
     * 流程：部署模块
     */
    /*********************************************************************/
    /**
     * 部署全部启用的流程
     */
    @RequestMapping("/deployFlows")
    @ResponseBody
    public void deployFlows() {
        managerFlow.deployFlows();
        return;
    }

    /**
     * 依据流程ID部署一个流程
     */
    @RequestMapping("/deployFlow")
    @ResponseBody
    public JsonMessage deployFlow(String processid) {
        boolean deployFlow = managerFlow.deployFlow(processid);
        if (deployFlow) {
            return new JsonMessage(true, "保存成功");
        } else {
            return new JsonMessage(false, "保存失败");
        }
        
    }

    /**
     * 流程：新建工作模块
     */
    /*********************************************************************/
    /**
     * 已部署后的流程列表
     *
     * @param request
     * @param typeId  流程类型ID
     * @return
     */
    @RequestMapping("findByProcessList")
    @ResponseBody
    public List<Map<String, Object>> findByProcessList(HttpServletRequest request, String typeId) {
        String flowName = request.getParameter("flowname");
        return doingFlow.findByProcessList(request, typeId,flowName);
    }

    /**
     * 查询已部署后的流程的类型
     *
     * @param sql
     * @return
     */
    @RequestMapping("findProcessType")
    @ResponseBody
    public List<Map<String, Object>> findProcessType(HttpServletRequest request) {
        try {
            Project project = SessionUtil.getProjectName(request);
            if(project == null) {
            	return typeService.selectMapBySQL("select * from t_s_type e ");
            } else {
            	return typeService.selectMapBySQL("select * from t_s_type e where e.projectId = " + project.getId());
            }
           
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("modifyProcessType")
    @ResponseBody
    public Map<String, Object> modifyProcessType(HttpServletRequest request,String infos, String deleteId, String updateId) {
        Map<String,Object> dataMap = new HashMap<String,Object>();
        try{
            Project project = SessionUtil.getProjectName(request);

            if (StringUtils.isNotEmpty(deleteId) && StringUtils.isNotBlank(deleteId)) {
                StringBuffer del = new StringBuffer();
                del.append("delete from t_s_type where ID in(" + deleteId + ")");
                service.deleteBySQL(del.toString());
            }

            if(StringUtils.isNotEmpty(infos) && StringUtils.isNotBlank(infos)) {
                StringBuffer insert = new StringBuffer();
                insert.append("insert into t_s_type(typecode,typename,createdate,projectId) values");

                List<FunctionDataTypeVo> vos = JSONArray.parseArray(infos, FunctionDataTypeVo.class);
                int size = vos.size();
                boolean insertFlag = false;

                for(int i = 0;i<size;i++) {
                    FunctionDataTypeVo vo = vos.get(i);
                    if(vo.getId() == null) {
                        insert.append("('").append(PinYinUtil.chineseToPinYin(vo.getName())).append("','").append(vo.getName()).append("','").append(vo.getCreateDate()).append("','").append(project.getId()).append("'),");
                        insertFlag = true;
                    }
                }
                if(insertFlag) {
                    service.insertBySQL(insert.substring(0,insert.lastIndexOf(",")));
                }

                boolean updateFlag = false;

                if(StringUtils.isNotEmpty(updateId) && StringUtils.isNotBlank(updateId)) {

                    StringBuffer upd = new StringBuffer("update t_s_type set ");
                    String [] columns = {"typecode","typename","createdate"};
                    for(int i = 0;i<columns.length;i++) {
                        upd.append(columns[i]).append(" =  case id ");
                        for(int j = 0;j<size;j++) {
                            FunctionDataTypeVo vo = vos.get(j);
                            if(vo.getId() != null) {
                                if(updateId.indexOf(vo.getId()) >-1) {
                                    updateFlag = true;
                                    if(i == 0) {
                                        upd.append(" when " + vo.getId() + " then '" + PinYinUtil.chineseToPinYin(vo.getName())+"'");
                                    } else if(i == 1) {
                                        upd.append(" when " + vo.getId() + " then '" +vo.getName()+"'");
                                    }else {
                                        upd.append(" when " + vo.getId() + " then '" + vo.getCreateDate()+"'");
                                    }
                                }
                            }

                        }
                        upd.append(" end ");
                        if(i !=(columns.length-1)) {
                            upd.append(",");
                        }
                    }
                    if(updateFlag) {
                        upd.append(" where id in ("+updateId+")");
                        service.updateBySQL(upd.toString());
                    }

                }
                dataMap.put("success",true);
            }
        } catch (Exception ex) {
            dataMap.put("success",false);
            ex.printStackTrace();
        }
        return dataMap;

    }

    /**
     * 获取已经部署的流程XML
     * @param request
     * @param response
     * @param processId  流程ID
     */
    @RequestMapping("getProcessXml")
    @ResponseBody
    public void getProcessXml(HttpServletRequest request, HttpServletResponse response, String processId) {
        response.setContentType("text/xml;charset=UTF-8");
        ProcessEntity processEntity = processEntityService.selectByPrimaryKey(processId);
        String retstr = "";
        try {
            if (processEntity != null) {
                retstr = Base64Util.getFromBase64(processEntity.getProcessxml().toString());
            }
            response.getWriter().write(retstr);
        } catch (Exception e1) {
            e1.printStackTrace();
        }
    }

    /**
     * 新建工作查看流程表单
     *
     * @param processId
     * @param fName
     * @param request
     * @return
     * @throws UnsupportedEncodingException
     */
//    @RequestMapping("/viewForm")
//    public ModelAndView viewForm(String processId, String fName,
//                                 HttpServletRequest request) {
//        return doingFlow.viewForm(processId, fName, request);
//    }

    /**
     * 填写启动表单后选择审核人，并启动流程。
     *
     * @param processId   流程模板ID
     * @param bID         业务数据ID
     * @param processname 流程名称
     * @param request
     * @return
     */
    @RequestMapping("/starProcess")
    @ResponseBody
    public List<Map<String, Object>>  starProcess(String processId, String processname, HttpServletRequest request) {
        return doingFlow.starProcess(processId, processname, request);
    }

    /**
     * 启动流程后通过流程实列获取当前任务节点配置人员、候选人、用户组信息
     *
     * @param processInstance 流程实列对象
     * @param isOpen          是否打开窗口 true ：打开 false:不打开
     * @return
     */
    public List<TreeNode> switchTaskCandidatesList(ProcessInstance processInstance, boolean isOpen) {
        return doingFlow.switchTaskCandidatesList(processInstance, isOpen);
    }


//    /**
//     * 提交选择框中选中人，并设置到下一级节点办理人。
//     */
//    @RequestMapping("/switchTaskCandidates")
//    @ResponseBody
//    public JsonMessage switchTaskCandidates(String assignee, String candidateUsers, String taskCandidateGroup, String taskId, HttpServletRequest request) {
//        return doingFlow.switchTaskCandidates(assignee, candidateUsers, taskCandidateGroup, taskId, request);
//    }

  

    /**
     * 会签
     *
     * @param taskId 任务ID
     * @param users  会签用户
     * @throws Exception 
     */
    @RequestMapping("/countersignTask")
    @ResponseBody
    public JsonMessage countersignTask(String taskId, String userId) throws Exception {
       return  doingFlow.countersignTask(taskId, userId);
    }
    /**
     * 保存会签意见
     *
     * @param taskId 任务ID
     * @param message  会签意见
     */
    @RequestMapping("/saveSignMessage")
    @ResponseBody
    public JsonMessage saveSignMessage(String userId,String taskId,String message){
    	 return  doingFlow.saveSignMessage(userId,taskId, message);
    }

    /**
     * 流程：待办件工作模块
     */
    /*********************************************************************/
    /**
     * 查询待办件
     *
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("/tasking")
    @ResponseBody
    public List<ProcessBean> taskList(HttpServletRequest request) throws UnsupportedEncodingException {
    	System.out.println("task===name==="+ request.getSession().getAttribute("username"));
        return doingFlow.taskList(request);
    }

    /**
     * 查看审核待办件表单
     *
     * @param id
     * @param taskid
     * @param request
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("/taskViewForm")
    @ResponseBody
    public List taskViewForm(String taskId, HttpServletRequest request) throws UnsupportedEncodingException {
    	  return doingFlow.taskViewForm(taskId, request);
    }

    /**
     * 流程跟踪图功能
     *
     * @param processInstanceId
     * @return
     * @throws Exception
     */
    @RequestMapping("/trace")
    @ResponseBody
    public List<Map<String, Object>> traceProcess(String processInstanceId) throws Exception {
        return doingFlow.traceProcess(processInstanceId);
    }

    @RequestMapping("/process-instance")
    public void loadByProcessInstance(String processInstanceId, HttpServletResponse response) throws Exception {
        doingFlow.loadByProcessInstance(processInstanceId, response);
    }

    /**
     * 待办件退回功能
     *
     * @param taskid     当前taskId
     * @param backTaskid 要退回taskId
     */
    @RequestMapping("/backTo")
    @ResponseBody
    public JsonMessage backTo(String taskid, String backTaskid, HttpServletRequest request) {
        try {
            DoingFlow.dbBackTo(taskid, backTaskid);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new JsonMessage(true, "退回完成！  ");
    }

    /**
     * 显示该流程已经办理过的任务节点
     *
     * @param processInstId
     * @return
     */
    @RequestMapping("/selectTask")
    @ResponseBody
    public JsonMessage select(String processInstId, String taskId) {
        return doingFlow.select(processInstId, taskId);
    }

    /**
     * 流程模板配置默认会签人,抄送人
     *
     * @param taskId　　任务ID
     * @param type  会签人类型、抄送人类型
     */
    @RequestMapping("/getSignUser")
    @ResponseBody
    public List<TreeNode> getSignUser(String taskId,String type) {
        return doingFlow.getSignUser(taskId,type);
    }
    /**
     * 流程历史记录
     *
     * @param processInstanceId 流程实列ID
     * @return
     */
    @RequestMapping("/signRegisterInfo")
    @ResponseBody
    public List<UserProcessbean> signRegisterInfo(String processInstanceId) {
        return doingFlow.signRegisterInfo(processInstanceId);
    }
    
	/**
	 * 审核待办件功能
	 * 
	 * @param processId  流程实列ID
	 * @param taskId    任务ID
	 * @param bID    业务ID
	 */
	@RequestMapping("/complete")
	@ResponseBody
	public JsonMessage complete(String taskId,String bID,String  users,
			HttpServletRequest request) {
		return doingFlow.complete(taskId, bID,users,request);
		
	}

    /**
     * 回退到上一步
     *
     * @param procInstId
     * @param user
     * @return
     */
    @RequestMapping("/undoTask")
    @ResponseBody
    public JsonMessage undoTask(String procInstId) {
        return doingFlow.undoTask(procInstId);
    }
    /**
     * 委托
     * @param procInstId
     * @return
     */
    @RequestMapping("/ownerTask")
    @ResponseBody
    public JsonMessage ownerTask(String taskId, String userId) {
        return activitiService.ownerTask(taskId,userId);
    }
    
    /**
     * 判断是否有会签任务
     */
    @RequestMapping("/isFlag")
    @ResponseBody
    public JsonMessage isFlag(String taskId){
    	return doingFlow.isFlag(taskId);
    }

    /**
     * 流程：完结工作模块
     */
    /*********************************************************************/

    /**
     * 已完结的任务
     *
     * @return
     */
    @RequestMapping("/taskSelect")
    @ResponseBody
    public List<UserProcessbean> taskSelect(HttpServletRequest request)
            throws Exception {
        return doingFlow.taskSelect(request);
    }

    /**
     * 流程：监听器功能
     */
    /*********************************************************************/
    /**
     * 导入监听类自动加载新数据
     *
     * @param request
     * @return
     */
    @RequestMapping("/getClassListener")
    @ResponseBody
    public JsonMessage getClassListener(HttpServletRequest request) {
        return activitiService.getClassListener(request);
    }

    /**
     * 上传java监听类
     *
     * @param request
     * @return
     */
    @RequestMapping("/uploadClass")
    @ResponseBody
    public String uploadClass(HttpServletRequest request) {
        return activitiService.uploadClass(request);
    }

    /**
     * 流程：设置流程变量
     */
    /*********************************************************************/

    /**
     * 添加流程变量
     *
     * @param request
     * @return
     */
    @RequestMapping("/addOrupdateVariable")
    public String addOrupdateVariable(HttpServletRequest request, String formkey) {
        return activitiService.addOrupdateVariable(request, formkey);
    }

    /**
     * 保存流程变量
     *
     * @param request
     * @return
     */
    @RequestMapping("/saveVariable")
    @ResponseBody
    public JsonMessage saveVariable(HttpServletRequest request, ProcessVariableEntity entity, String formkey) {
        return activitiService.saveVariable(request, entity, formkey);
    }

    /**
     * 删除流程变量
     *
     * @param request
     * @return
     */
    @RequestMapping("/delVariable")
    @ResponseBody
    public JsonMessage delVariable(HttpServletRequest request, String id) {
        return activitiService.delVariable(request, id);
    }

    /**
     * 按节点主键查询流程变量
     *
     * @param nodeId 节点主键
     * @return
     */
    @RequestMapping("/getVariables")
    @ResponseBody
    public List<ProcessVariableEntity> getVariables(String nodeId) {
        return activitiService.getVariables(nodeId);

    }

    /**
     * 流程：配置接口
     */
    /*********************************************************************/
    /**
     * 打开配置页面窗口
     *
     * @return
     */
    @RequestMapping("/openInteface")
    public String openInteface(HttpServletRequest request) {
        return activitiService.openInteface(request);
    }

    /**
     * 打开配置页面窗口
     *
     * @return
     */
    @RequestMapping("/saveInteface")
    @ResponseBody
    public JsonMessage saveInteface(HttpServletRequest request, String id, String userInteface, String groupInteface,String deptInteface) {
        return activitiService.saveInteface(request, id, userInteface, groupInteface,deptInteface);
    }

    /**
     * 流程：配置接口
     */
    /*********************************************************************/
    /**
     * 打开页面窗口
     *
     * @return
     */
    @RequestMapping("/openPageInteface")
    public String openPageInteface(HttpServletRequest request) {
        return activitiService.openPageInteface(request);
    }

    /**
     * 打开配置页面窗口
     *
     * @return
     */
    @RequestMapping("/savePageInteface")
    @ResponseBody
    public JsonMessage savePageInteface(HttpServletRequest request, String id, String pageInteface) {
        return activitiService.savePageInteface(request, id, pageInteface);
    }
    
    
    
    
   /****************************************************************************************************/ 
    /**
     * 查询可回退节点
     * @param taskId
     * @return
     * @throws Exception
     */
    
    public List<ActivityImpl> findBackAvtivity(String taskId) throws Exception {  
        List<ActivityImpl> rtnList = null;  
         Task task =taskService.createTaskQuery().taskId(taskId).singleResult();
        if (task.getParentTaskId()!=null) {// 会签任务节点，不允许驳回  
            rtnList = new ArrayList<ActivityImpl>();  
        } else {  
        	 rtnList = doingFlow.iteratorBackActivity(taskId, doingFlow.findActivitiImpl(taskId,  
                    null), new ArrayList<ActivityImpl>(),  
                    new ArrayList<ActivityImpl>());  
        }  
        return doingFlow.reverList(rtnList);  
    }  
  
    /** 
     * 审批通过(驳回直接跳回功能需后续扩展) 
     *  
     * @param taskId 
     *            当前任务ID 
     * @param variables 
     *            流程存储参数 
     * @throws Exception 
     */  
    @RequestMapping("/passProcess")
    public void passProcess(String taskId, Map<String, Object> variables)  
            throws Exception {  
        List<Task> tasks = taskService.createTaskQuery().taskId(taskId)  
                .taskDescription("jointProcess").list();  
        for (Task task : tasks) {// 级联结束本节点发起的会签任务  
        	doingFlow.commitProcess(task.getId(), null, null);  
        }  
        doingFlow.commitProcess(taskId, variables, null);  
    }  
  
    /** 
     * 驳回流程 
     *  
     * @param taskId 
     *            当前任务ID 
     * @param activityId 
     *            驳回节点ID 
     * @param variables 
     *            流程存储参数 
     * @throws Exception 
     */  
    @RequestMapping("/backProcess")
    public void backProcess(String taskId, String activityId,  
            Map<String, Object> variables) throws Exception {  
        if (activityId==null) {  
            throw new Exception("驳回目标节点ID为空！");  
        }  
  
        // 查询本节点发起的会签任务，并结束  
        List<Task> tasks = taskService.createTaskQuery().taskId(taskId)  
                .taskDescription("jointProcess").list();  
        for (Task task : tasks) {  
        	doingFlow.commitProcess(task.getId(), null, null);  
        }  
  
        // 查找所有并行任务节点，同时驳回  
        List<Task> taskList = doingFlow.findTaskListByKey(doingFlow.findProcessInstanceByTaskId(  
                taskId).getId(), doingFlow.findTaskById(taskId).getTaskDefinitionKey());  
        for (Task task : taskList) {  
        	doingFlow.commitProcess(task.getId(), variables, activityId);  
        }  
    }  
  
    /** 
     * 取回流程 
     *  
     * @param taskId 
     *            当前任务ID 
     * @param activityId 
     *            取回节点ID 
     * @throws Exception 
     */  
    @RequestMapping("/callBackProcess")
    public void callBackProcess(String taskId, String activityId)  
            throws Exception {  
        if (activityId==null) {  
            throw new Exception("目标节点ID为空！");  
        }  
  
        // 查找所有并行任务节点，同时取回  
        List<Task> taskList = doingFlow.findTaskListByKey(doingFlow.findProcessInstanceByTaskId(  
                taskId).getId(), doingFlow.findTaskById(taskId).getTaskDefinitionKey());  
        for (Task task : taskList) {  
        	doingFlow.commitProcess(task.getId(), null, activityId);  
        }  
    }  
  
    /** 
     * 中止流程(特权人直接审批通过等) 
     *  
     * @param taskId 
     */  
    @RequestMapping("/endProcess")
    public void endProcess(String taskId) throws Exception {  
        ActivityImpl endActivity = doingFlow.findActivitiImpl(taskId, "end");  
        doingFlow.commitProcess(taskId, null, endActivity.getId());  
    }  
  
    /** 
     * 转办流程 
     *  
     * @param taskId 
     *            当前任务节点ID 
     * @param userCode 
     *            被转办人Code 
     */  
    @RequestMapping("/transferAssignee")
    public void transferAssignee(String taskId, String userCode) {  
        taskService.setAssignee(taskId, userCode);  
    }  
  
    /** 
     * 抄送 
     *  
     * @param taskId 
     *            当前任务节点ID 
     * @param userCode 
     *            抄送人Code 
     */  
    @RequestMapping("/copySendUser")
    @ResponseBody
    public JsonMessage copySendUser(String taskId, String userId) {  
    	return doingFlow.copySendUser(taskId, userId);  
    }  
    /** 
     * 挂起
     *  
     * @param state 
     *            当前状态
     * @param processInstanceId 
     *            流程实列ID
     */  
    @RequestMapping("/updateState")
	public void updateState(String state, String processInstanceId) {
		if (state.equals("active")) {
			runtimeService.activateProcessInstanceById(processInstanceId);
		} else if (state.equals("suspend")) {
			runtimeService.suspendProcessInstanceById(processInstanceId);
		}
	}



    @RequestMapping("/queryProcessNextUsers")
    @ResponseBody
    public List<TreeNode> queryProcessNextUsers(HttpServletRequest request,String lcblmc,String taskId) {

        if(StringUtils.isNotEmpty(lcblmc) || StringUtils.isNotEmpty(lcblmc)) {
            String [] keys = lcblmc.split(",");
            String [] values = new String[keys.length];
            for(int i = 0;i<keys.length;i++) {
                values[i] = request.getParameter(keys[i]);
            }
            return doingFlow.getFlowApprovalPerson(taskId,keys,values);
        } else {
            return doingFlow.getFlowApprovalPerson(taskId,null,null);
        }

    }


}