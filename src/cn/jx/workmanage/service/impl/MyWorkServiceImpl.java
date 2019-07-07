package cn.jx.workmanage.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import cn.hy.common.utils.DateUtil;
import cn.hy.common.vo.DatatablesViewPage;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.jx.workmanage.form.SearchWorkForm;
import cn.jx.workmanage.service.MyWorkService;

/**
 * @author lijianbin
 *
 * 2016年8月15日
 */
@Service("myWorkService")
public class MyWorkServiceImpl implements MyWorkService {

	private static final Logger logger = Logger.getLogger(MyWorkServiceImpl.class);
	
	@Autowired
    protected RuntimeService runtimeService;
    @Autowired
    protected TaskService taskService;
    @Autowired
    protected RepositoryService repositoryService;
    @Autowired
    protected HistoryService historyService;
    
    @Resource(name="createTableService")
    protected ICreateTableService createTableService;
    
    /**
	 * 流程委托
	 * @param keyword   关键字
	 * @param stateType 类型
	 * @param userId    用户ID
	 * @param startRow  开始记录数
	 * @param limit     每页记录数
	 * @return
	 */
    public DatatablesViewPage<?> selectEntrust(String keyword,String stateType,String userId,Integer startRow,Integer limit) {
    	//首先查询委托表,查出最后一步是userId、流程未结束并且未删除的数据,最后查询出流程需要放回页面的数据
    	StringBuilder sb=new StringBuilder();
    	// 委托
    	sb.append("SELECT RES.ID_,RES.PROC_INST_ID_,x.PROC_DEF_ID_,RES.NAME_,RES.OWNER_,")
        .append(" RES.ASSIGNEE_,RES.CREATE_TIME_,x.TASK_DEF_KEY_,x.DUE_DATE_,RES.FORM_KEY_,H.CREATETIME TENANT_ID_")
        .append(" FROM(SELECT e.* FROM(SELECT d.taskid,d.assignee,i.NAME_ PROC_DEF_ID_,  ")
        .append(" i.START_USER_ID_ AS TASK_DEF_KEY_,i.START_TIME_ DUE_DATE_ FROM process_delegate d  ")
        .append(" LEFT JOIN hys_process p ON d.processid = p.id LEFT JOIN act_hi_procinst i ON d.processid = i.ID_ ")
        .append(" WHERE p.is_remove =0 AND i.END_TIME_ IS NULL ORDER BY d.delegateTime DESC ")
        .append(" ) e GROUP BY e.taskid) x  ")
        .append(" LEFT JOIN ACT_RU_TASK AS RES ON x.taskid=RES.ID_ LEFT JOIN HYS_TASK_DEAL H ON H.ID=x.taskid ")
        .append(" WHERE x.assignee = '"+userId+"' ");
       
        //关键字
        if(StringUtils.isNotBlank(keyword)){
        	sb.append(" AND (RES.PROC_INST_ID_ LIKE '%"+keyword+"%'")
    	      .append(" OR x.PROC_DEF_ID_ LIKE '%"+keyword+"%')");
        }
        //类型
        if(StringUtils.isNotBlank(stateType)){
        	if("未接收".equals(stateType)){//流程未接收,处理时间为空
        		sb.append(" AND H.CREATETIME IS NULL");
        	}else if("处理中".equals(stateType)){
        		sb.append(" AND H.CREATETIME IS NOT NULL");
        	}
        	
        }
        sb.append(" ORDER BY RES.ID_ DESC");
        
        String sql=sb.toString();
        List<Task> tasks = taskService.createNativeTaskQuery().sql(sql).listPage(startRow, limit);

        Long count=getCount(sql);
        return new DatatablesViewPage<>(getProcessData(tasks), count, count);
    }

    /**
	 * 流程办结查询
	 * @param keyword   关键字
	 * @param stateType 类型
	 * @param userId    用户ID
	 * @param startRow  开始记录数
	 * @param limit     每页记录数
	 * @return
	 */
	public DatatablesViewPage<SearchWorkForm> selectQuited(String keyword,String stateType,String userId,Integer startRow,Integer limit) {
		//查询待办工作
		StringBuilder sb=new StringBuilder();
		sb.append("SELECT Q.* FROM (SELECT TASK.ID_,A.NAME_ PROC_DEF_ID_,TASK.PROC_INST_ID_,TASK.NAME_,TASK.ASSIGNEE_,TASK.START_TIME_,A.END_TIME_,A.START_USER_ID_  TASK_DEF_KEY_,TASK.FORM_KEY_,H.CREATETIME TENANT_ID_ ")
		.append("FROM ACT_HI_TASKINST TASK LEFT JOIN ACT_HI_PROCINST A ON TASK.PROC_INST_ID_=A.ID_  ")
		.append(" LEFT JOIN HYS_TASK_DEAL H ON H.ID=TASK.ID_ ")
		.append(" LEFT JOIN HYS_PROCESS P ON P.ID=A.ID_ ")
		.append(" WHERE  P.IS_REMOVE =0 AND EXISTS (SELECT RES.ID_ FROM ACT_HI_PROCINST RES ")
		.append("WHERE(EXISTS (SELECT LINK.USER_ID_ FROM ACT_HI_IDENTITYLINK LINK WHERE ")
		.append("USER_ID_ = #{userId} AND LINK.PROC_INST_ID_ = RES.ID_)) AND RES.ID_ = TASK.PROC_INST_ID_) ");
       
        //关键字
        if(StringUtils.isNotBlank(keyword)){
        	sb.append(" AND (A.ID_ LIKE '%"+keyword+"%'")
    	      .append(" OR A.NAME_ LIKE '%"+keyword+"%')");
        }
        //类型
        if(StringUtils.isNotBlank(stateType)){
        	if("未接收".equals(stateType)){//流程未接收,处理时间为空
        		sb.append(" AND H.CREATETIME IS NULL");
        	}else if("处理中".equals(stateType)){
        		sb.append(" AND H.CREATETIME IS NOT NULL");
        	}else if("已结束".equals(stateType)){
        		sb.append(" AND A.END_TIME_ IS NOT NULL");
        	}else if("已归档".equals(stateType)){
        		sb.append(" AND P.IS_PIGEONHOLE =1 ");
        	}
        	
        }
        sb.append(" ORDER BY TASK.START_TIME_ DESC ) Q GROUP BY Q.PROC_INST_ID_ ORDER BY q.START_TIME_ DESC");
        
        //替换值
        String sql=sb.toString().replaceAll("#\\{userId\\}", "'"+userId+"'");
		List<HistoricTaskInstance> tasks=historyService.createNativeHistoricTaskInstanceQuery().sql(sql).listPage(startRow, limit);

		Long count=getCount(sql);
        return new DatatablesViewPage<>(getHistoricTaskInstanceToProcessData(tasks), count, count);

    }
	
	 /**
	 * 流程会签查询
	 * @param keyword   关键字
	 * @param stateType 类型
	 * @param userId    用户ID
	 * @param startRow  开始记录数
	 * @param limit     每页记录数
	 * @return
	 */
	public DatatablesViewPage<?> jointlySign(String keyword,String stateType,String userId,Integer startRow,Integer limit){
		// 会签任务
        StringBuilder sb=new StringBuilder();
        sb.append("SELECT DISTINCT RES.ID_,RES.PROC_INST_ID_,A.NAME_ PROC_DEF_ID_,RES.NAME_,RES.OWNER_,RES.ASSIGNEE_,RES.CREATE_TIME_,RES.FORM_KEY_,")
          .append(" A.START_USER_ID_ AS TASK_DEF_KEY_,A.START_TIME_ DUE_DATE_,H.CREATETIME TENANT_ID_")
          .append(" FROM ACT_RU_TASK AS RES LEFT JOIN act_ru_execution AS E ON RES.EXECUTION_ID_ = E.ID_")
          .append(" LEFT JOIN ACT_HI_PROCINST A ON RES.PROC_INST_ID_ = A.ID_ LEFT JOIN HYS_TASK_DEAL H ON H.ID=RES.ID_ LEFT JOIN HYS_PROCESS P ON P.ID=A.ID_ ")
          .append(" WHERE RES.SUSPENSION_STATE_ = 1 AND E.IS_CONCURRENT_=1 AND (RES.ASSIGNEE_ = #{userId}) AND P.IS_REMOVE =0 ");
       
        //关键字
        if(StringUtils.isNotBlank(keyword)){
        	sb.append(" AND (A.ID_ LIKE '%"+keyword+"%'")
      	      .append(" OR A.NAME_ LIKE '%"+keyword+"%')");
        }
        
        //类型
        if(StringUtils.isNotBlank(stateType)){
        	if("未接收".equals(stateType)){//流程未接收,处理时间为空
        		sb.append(" AND H.CREATETIME IS NULL");
        	}else if("处理中".equals(stateType)){
        		sb.append(" AND H.CREATETIME IS NOT NULL");
        	}else if("已结束".equals(stateType)){
        		sb.append(" AND A.END_TIME_ IS NOT NULL");
        	}else if("已归档".equals(stateType)){
        		sb.append(" AND P.IS_PIGEONHOLE =1 ");
        	}
        	
        }
        sb.append(" ORDER BY RES.ID_ DESC");
        
        //替换值
        String sql=sb.toString().replaceAll("#\\{userId\\}", "'"+userId+"'");
        List<Task> tasks = taskService.createNativeTaskQuery().sql(sql).listPage(startRow, limit);

        Long count=getCount(sql);
        return new DatatablesViewPage<>(getProcessData(tasks), count, count);
	}

	 /**
	 * 流程待办查询
	 * @param keyword   关键字
	 * @param stateType 类型
	 * @param userId    用户ID
	 * @param startRow  开始记录数
	 * @param limit     每页记录数
	 * @return
	 */
	@Override
	public DatatablesViewPage<?> selectWaitWorking(String keyword, String stateType,String userId,Integer startRow,Integer limit) {

        // 待办的任务,不包括委托及会签任务
        StringBuilder sb=new StringBuilder();
        sb.append("SELECT DISTINCT RES.ID_,RES.PROC_INST_ID_,A.NAME_ PROC_DEF_ID_,RES.NAME_,RES.OWNER_,RES.ASSIGNEE_,RES.CREATE_TIME_,")
          .append(" A.START_TIME_ DUE_DATE_,A.START_USER_ID_ TASK_DEF_KEY_,RES.FORM_KEY_,H.CREATETIME TENANT_ID_  FROM ACT_RU_TASK RES ")
          .append(" LEFT JOIN ACT_RU_IDENTITYLINK I ON I.TASK_ID_ = RES.ID_ ")
          .append(" LEFT JOIN ACT_HI_PROCINST A ON A.ID_ = RES.PROC_INST_ID_  ")
          .append(" LEFT JOIN ACT_RU_EXECUTION E ON RES.EXECUTION_ID_ = E.ID_ ")
          .append(" LEFT JOIN HYS_TASK_DEAL H ON H.ID=RES.ID_  ")
          .append(" LEFT JOIN HYS_PROCESS P ON P.ID=A.ID_ ")
          .append(" WHERE RES.SUSPENSION_STATE_ = 1 AND ")
          .append(" E.IS_CONCURRENT_=0 AND P.IS_REMOVE =0 AND (RES.ASSIGNEE_ = #{userId} OR (RES.ASSIGNEE_ IS NULL AND (I.USER_ID_ = #{userId}")
          .append(" OR I.GROUP_ID_ IN (SELECT g.GROUP_ID_ FROM ACT_ID_MEMBERSHIP g WHERE g.USER_ID_ = #{userId}))))");
       
        //关键字
        if(StringUtils.isNotBlank(keyword)){
        	sb.append(" AND (A.ID_ LIKE '%"+keyword+"%'")
        	  .append(" OR A.NAME_ LIKE '%"+keyword+"%')");
        }
        //类型
        if(StringUtils.isNotBlank(stateType)){
        	if("未接收".equals(stateType)){//流程未接收,处理时间为空
        		sb.append(" AND H.CREATETIME IS NULL");
        	}else if("处理中".equals(stateType)){
        		sb.append(" AND H.CREATETIME IS NOT NULL");
        	}else if("已结束".equals(stateType)){
        		sb.append(" AND A.END_TIME_ IS NOT NULL");
        	}else if("已归档".equals(stateType)){
        		sb.append(" AND P.IS_PIGEONHOLE =1 ");
        	}
        	
        }
        sb.append(" ORDER BY RES.CREATE_TIME_ DESC");
        //替换值
        String sql=sb.toString().replaceAll("#\\{userId\\}", "'"+userId+"'");
        
        List<Task> tasks = taskService.createNativeTaskQuery().sql(sql).listPage(startRow, limit);
        long count=getCount(sql);
        return new DatatablesViewPage<>(getProcessData(tasks), count, count);
	}
	
	/**
	 * 分页工作查询
	 * @param isSuperManage 是否是超级管理员
	 * @param startRow      开始记录数
	 * @param limit         每页记录数
	 * @param keyword       关键字
	 * @param stateType     状态类型
	 * @param beginDateStr  开始时间
	 * @param endDateStr    结束时间
	 * @param scope         范围 1全部2我创建的3我经办的
	 * @param userId   登陆用户ID
	 * @return
	 */
	@Override
	public DatatablesViewPage<?> selectwork(Boolean isSuperManage, String searchScope, Integer startRow, Integer limit,
			String keyword, String stateType,String beginDateStr, String endDateStr, Integer scope,
			String userId,String userNameScope) {
		//查询待办工作
		StringBuilder sb=new StringBuilder();
		sb.append("SELECT Q.* FROM (SELECT TASK.ID_,A.NAME_ PROC_DEF_ID_,TASK.PROC_INST_ID_,TASK.NAME_,TASK.OWNER_,TASK.ASSIGNEE_,TASK.START_TIME_,TASK.END_TIME_,A.START_USER_ID_  TASK_DEF_KEY_,TASK.FORM_KEY_,H.CREATETIME TENANT_ID_  ")
		.append("FROM ACT_HI_TASKINST TASK LEFT JOIN ACT_HI_PROCINST A ON TASK.PROC_INST_ID_=A.ID_  LEFT JOIN HYS_TASK_DEAL H ON H.ID=TASK.ID_  LEFT JOIN HYS_PROCESS P ON P.ID=A.ID_ ")
		.append(" WHERE  P.IS_REMOVE =0 AND EXISTS (SELECT RES.ID_ FROM ACT_HI_PROCINST RES ")
		.append("WHERE(EXISTS (SELECT LINK.USER_ID_ FROM ACT_HI_IDENTITYLINK LINK ")
		//加上下面这句只是为了解决绩效中大区经理的查询范围
		.append("LEFT JOIN hys_user  HU ON HU.`name`=LINK.USER_ID_ LEFT JOIN hys_area  HA ON HU.a_id=HA.a_id ")
		
		.append("WHERE #{userId} AND LINK.PROC_INST_ID_ = RES.ID_)) AND RES.ID_ = TASK.PROC_INST_ID_) ");
       
        //关键字
        if(StringUtils.isNotBlank(keyword)){
        	sb.append(" AND (A.ID_ LIKE '%"+keyword+"%'")
    	      .append(" OR A.NAME_ LIKE '%"+keyword+"%')");
        }
        
        //开始时间
		if(StringUtils.isNotBlank(beginDateStr)){
			sb.append(" AND A.START_TIME_ >='"+beginDateStr+" 00:00:00' ");
		}
		//结束时间
		if(StringUtils.isNotBlank(endDateStr)){
			sb.append(" AND A.START_TIME_ <='"+endDateStr+" 23:59:59' ");
		}
		
		//类型
        if(StringUtils.isNotBlank(stateType)){
        	if("未接收".equals(stateType)){//流程未接收,处理时间为空
        		sb.append(" AND H.CREATETIME IS NULL");
        	}else if("处理中".equals(stateType)){
        		sb.append(" AND H.CREATETIME IS NOT NULL");
        	}else if("已结束".equals(stateType)){
        		sb.append(" AND A.END_TIME_ IS NOT NULL");
        	}else if("已归档".equals(stateType)){
        		sb.append(" AND P.IS_PIGEONHOLE =1 ");
        	}
        	
        }
        
        if(2==scope){//我创建的流程
        	sb.append(" AND A.START_USER_ID_='").append(userNameScope).append("' ");
        }
        
        sb.append(" ORDER BY TASK.START_TIME_ DESC ) Q GROUP BY Q.PROC_INST_ID_ ORDER BY Q.START_TIME_ DESC");
        String sql=null;
        String sl="";
        //大区经理查询
        if(StringUtils.isNotBlank(searchScope)){
        	sl+=" AND HA.a_id in ("+searchScope+") ";
        }
        if(3==scope){//我经办的流程
        	sl+=" AND USER_ID_ ='"+userNameScope+"' ";
        }else{
        	//不是大区经理也不是超级管理员
        	if(true!=isSuperManage&&StringUtils.isBlank(searchScope)){
        			sl+=" AND USER_ID_ ='"+userId+"' ";
        	}
        	
        }
	    if(sl!=""){
	    	sl=new StringBuilder(sl).delete(0, 4).toString();
	    }else{
	    	sl=" 1=1 ";
	    }
        sql=sb.toString().replaceAll("#\\{userId\\}", sl);
		List<HistoricTaskInstance> tasks=historyService.createNativeHistoricTaskInstanceQuery().sql(sql).listPage(startRow, limit);
        
		Long count=getCount(sql);
		List<SearchWorkForm> forms=getHistoricTaskInstanceToProcessData(tasks);
		
		if(forms!=null&&!forms.isEmpty()){
			//遍历查询是否是委托任务
			for(SearchWorkForm e:forms){
				Map<String,Object> map=findDelegateByProcessIdAndTaskId(e.getTaskId());
				if(map!=null){
					Object assignee=map.get("assignee");
					if(null!=assignee){
						e.setTaskOwner((String)assignee);
						continue;
					}
				}
				e.setTaskOwner(null);
			}
		}
        return new DatatablesViewPage<>(forms, count, count);
	}
	
	/**
	 * 按创建时间倒序
	 * 更加流程实例主键与节点主键查询是否是委托
	 * @param taskId     节点ID
	 * @return
	 */
	public Map<String,Object> findDelegateByProcessIdAndTaskId(String taskId){
		if(StringUtils.isNotBlank(taskId)){
			List<Map<String,Object>> list=createTableService.selectMapBySQL("SELECT id,processid,taskid,assignee,delegateTime FROM PROCESS_DELEGATE WHERE TASKID='"+taskId+"' ORDER BY DELEGATETIME DESC");
			if(list!=null&&!list.isEmpty()){
				return list.get(0);
			}
		}
		return null;
	}
	
	/**
     * 获取流程封装对象数据
     * @param task
     * @return
     */
	public List<SearchWorkForm> getProcessData(List<Task> tasks) {
		List<SearchWorkForm> list = new ArrayList<>();
		if (null != tasks && !tasks.isEmpty()) {
			// 待办任务信息
			for (Task task : tasks) {
				SearchWorkForm bean = new SearchWorkForm();
				bean.setId(task.getProcessInstanceId());
				bean.setName(task.getProcessDefinitionId());
				bean.setStepName(task.getName());
				bean.setCreateTime(DateUtil.format(task.getCreateTime(), "yyyy-MM-dd HH:mm:ss"));
				bean.setCreateUserName(task.getTaskDefinitionKey());
				bean.setPageName(task.getFormKey());
				bean.setTaskId(task.getId());
				//委托人
				bean.setTaskOwner(task.getOwner());
				// 处理时间
				bean.setReceiveTime(task.getTenantId());
				//状态设置
				if(StringUtils.isBlank(task.getTenantId())){
					bean.setStepState("未接收");
				}else{
					bean.setStepState("处理中");
				}
				
				list.add(bean);
			}
		}

		return list;
	}
	
	/**
	 * 获取流程封装对象数据
	 * @param tasks   
	 * @return
	 */
	public List<SearchWorkForm> getHistoricTaskInstanceToProcessData(List<HistoricTaskInstance> tasks) {
		// 以办结的任务列表
		List<SearchWorkForm> beans = new ArrayList<SearchWorkForm>();
		if (null != tasks && !tasks.isEmpty()) {
			for (HistoricTaskInstance historicTaskInstance : tasks) {
				SearchWorkForm bean = new SearchWorkForm();

				bean.setTaskId(historicTaskInstance.getId());
				bean.setStepName(historicTaskInstance.getName());
				bean.setCreateTime(DateUtil.format(historicTaskInstance.getCreateTime(), "yyyy-MM-dd HH:mm:ss"));
				if (null != historicTaskInstance.getEndTime()) {
					bean.setEndTime(DateUtil.format(historicTaskInstance.getEndTime(), "yyyy-MM-dd HH:mm:ss"));
				}
				bean.setTaskAssignee(historicTaskInstance.getAssignee());
				bean.setPageName(historicTaskInstance.getFormKey());
				bean.setCreateUserName(historicTaskInstance.getTaskDefinitionKey());
				// 设置流程属性
				bean.setId(historicTaskInstance.getProcessInstanceId());
				bean.setName(historicTaskInstance.getProcessDefinitionId());
				// 处理时间
				bean.setReceiveTime(historicTaskInstance.getTenantId());
				//委托人
				bean.setTaskOwner(historicTaskInstance.getOwner());
				
				//状态设置
				if(null==historicTaskInstance.getEndTime()){
					if(StringUtils.isBlank(historicTaskInstance.getTenantId())){
						bean.setStepState("未接收");
					}else{
						bean.setStepState("处理中");
					}
				}else{
					bean.setStepState("已结束");
				}
				
				// 压入集合
				beans.add(bean);
			}
		}
		return beans;
	}
	
	/**
	 * 求总
	 * @param sql
	 * @return
	 */
	public Long getCount(String sql) {
		if (null != sql) {
			List<Map<String, Object>> list = createTableService.selectMapBySQL("SELECT COUNT(1) count FROM (" + sql + ") Z_");
			if (null != list && !list.isEmpty()) {
				return Long.valueOf(list.get(0).get("count").toString());
			}
		}
		return 0L;
	}

	/**
     * 点击主办时插入处理时间,即将流程状态变为"处理中"
     * @param taskId  流程节点ID
     * @return
     */
	@Override
	public JsonMessage insertState(String taskId) {
		try {
			if(StringUtils.isNotBlank(taskId)){
				//检查数据是否重复插入
				List<Map<String, Object>> list=createTableService.selectBySQL("SELECT 1 FROM HYS_TASK_DEAL WHERE ID='"+taskId+"'");
				if(null!=list&&!list.isEmpty()){
					logger.info("该数据已经插入");
				}else{
					//插入一条数据
					createTableService.insertBySQL("INSERT INTO HYS_TASK_DEAL (ID, CREATETIME) VALUES ('"+taskId+"', '"+DateUtil.format(new Date(), "yyyy-MM-dd HH:mm:ss")+"')");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonMessage(false, "失败");
		}
		return new JsonMessage(true, "成功");
	}

	/**
     * 撤销委托
     * @param processId 流程ID
     * @return
     */
	@Override
	public JsonMessage updateBackEntrust(String processId) {
		if(StringUtils.isBlank(processId)){
			return new JsonMessage(false, "processId参数为空");
		}
		try {
			Task task = taskService.createTaskQuery().processInstanceId(processId).singleResult();
			if(null!=task){
				taskService.setAssignee(task.getId(), task.getOwner());
			    return new JsonMessage(true,"撤销成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new JsonMessage(false, "撤销失败");
	}
	
	/**删除流程
	 * @param processId 流程ID
	 * @return
	 */
	public boolean deleteProcess(String processId){
		if(StringUtils.isNotBlank(processId)){
			createTableService.insertBySQL("INSERT INTO hys_process (id, is_remove) VALUES ('"+processId+"', '1')");
			return true;
		}
		return false;
	}

}