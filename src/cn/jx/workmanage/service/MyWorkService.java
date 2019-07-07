package cn.jx.workmanage.service;

import cn.hy.common.vo.DatatablesViewPage;
import cn.hy.common.vo.JsonMessage;

/**
 * 
 * @author lijianbin
 *
 * 2016年8月15日
 */
public interface MyWorkService {

	/**
	 * 委托查询
	 * @param keyword   关键字
	 * @param stateType 类型
	 * @param userId    用户ID
	 * @param startRow  开始记录数
	 * @param limit     每页记录数
	 * @return
	 */
	public DatatablesViewPage<?> selectEntrust(String keyword,String stateType,String userId,Integer startRow,Integer limit);

	/**
	 * 办结查询
	 * @param keyword   关键字
	 * @param stateType 类型
	 * @param userId    用户ID
	 * @param startRow  开始记录数
	 * @param limit     每页记录数
	 * @return
	 */
	public DatatablesViewPage<?> selectQuited(String keyword,String stateType,String userId,Integer startRow,Integer limit);

	/**
	 * 会签查询
	 * @param keyword   关键字
	 * @param stateType 类型
	 * @param userId    用户ID
	 * @param startRow  开始记录数
	 * @param limit     每页记录数
	 * @return
	 */
	public DatatablesViewPage<?> jointlySign(String keyword,String stateType,String userId,Integer startRow,Integer limit);

	/**
	 * 待办查询
	 * @param keyword   关键字
	 * @param stateType 类型
	 * @param userId    用户ID
	 * @param startRow  开始记录数
	 * @param limit     每页记录数
	 * @return
	 */
	public DatatablesViewPage<?> selectWaitWorking(String keyword,String stateType,String userId,Integer startRow,Integer limit);
	/**
	 * 分页工作查询
	 * @param isSuperManage 是否是超级管理员
	 * @param startRow      开始记录数
	 * @param limit         每页记录数
	 * @param keyword       关键字
	 * @param stateType     状态类型
	 * @param userId        用户主键
	 * @param beginDateStr  开始时间
	 * @param endDateStr    结束时间
	 * @param scope         范围 1全部2我创建的3我经办的
	 * @param userNameScope  人员姓名
	 * @return
	 */
	public DatatablesViewPage<?> selectwork(Boolean isSuperManage, String searchScope,Integer startRow, Integer limit, String keyword, String stateType,String beginDateStr,String endDateStr,Integer scope,String userId,String userNameScope);

	/**
     * 点击主办时插入处理时间,即将流程状态变为"处理中"
     * @param taskId  流程节点ID
     * @return
     */
	public JsonMessage insertState(String taskId);

	/**
     * 撤销委托
     * @param processId 流程ID
     * @return
     */
	public JsonMessage updateBackEntrust(String processId);

	/**删除流程
	 * @param processId 流程ID
	 * @return
	 */
	public boolean deleteProcess(String processId);
	
}
