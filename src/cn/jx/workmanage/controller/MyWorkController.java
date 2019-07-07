package cn.jx.workmanage.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.hy.common.utils.SpringUtil;
import cn.hy.common.vo.DatatablesViewPage;
import cn.hy.common.vo.JsonMessage;
import cn.jx.workmanage.service.MyWorkService;

/**
 * 流程————我的工作管理
 * @author lijianbin
 *
 * 2016年8月15日
 */
@Controller
@Scope("prototype")
@RequestMapping("myWork/")
public class MyWorkController {
	
	@Resource(name="myWorkService")
	private MyWorkService myWorkService;
	
	/**
	 * 代办工作
	 * @return
	 */
	@RequestMapping(value="waitDo")
	public String waitDo(){
		return "jx/workmanage/daiban";
	}
	
	/**
	 * 办结工作
	 * @return
	 */
	@RequestMapping(value="overWork")
	public String overWork(){
		return "jx/workmanage/banjie";
	}
	
	/**
	 * 委托工作
	 * @return
	 */
	@RequestMapping(value="offerWork")
	public String offerWork(){
		return "jx/workmanage/weituo";
	}
	
	/**
	 * 会签工作
	 * @return
	 */
	@RequestMapping(value="accountWord")
	public String accountWord(){
		return "jx/workmanage/huiqian";
	}
	
	/**
	 * 查看流程进度图
	 * @return
	 */
	@RequestMapping(value="viewImg")
	public String viewImg(){
		return "jx/workmanage/viewImg";
	}
	
	
	
    /**
     * 委托工作查询
     * @param request
     * @return
     */
    @RequestMapping("selectEntrust")
    @ResponseBody
	public DatatablesViewPage<?> selectEntrust(HttpServletRequest request,Integer startRow,String keyword,String stateType,Integer limit) {
    	String username=  (String)request.getSession().getAttribute("username");
    	return myWorkService.selectEntrust(keyword, stateType,username,startRow,limit);
    }
    
    /**
     * 办结工作查询
     * @param request
     * @return
     */
    @RequestMapping("selectQuited")
    @ResponseBody
	public DatatablesViewPage<?> selectQuited(HttpServletRequest request,Integer startRow,String keyword,String stateType,Integer limit){
    	String username=  (String)request.getSession().getAttribute("username");
    	return myWorkService.selectQuited(keyword, stateType,username,startRow,limit);
    }
    
    /**																																																															
     * 会签工作查询
     * @param request
     * @return
     */
    @RequestMapping("jointlySign")
    @ResponseBody
	public DatatablesViewPage<?> jointlySign(HttpServletRequest request,Integer startRow,String keyword,String stateType,Integer limit){
    	String username=  (String)request.getSession().getAttribute("username");
    	return myWorkService.jointlySign( keyword, stateType,username,startRow,limit);
    }
    
    /**
     * 待办工作查询
     * @param request
     * @return
     */
    @RequestMapping("waitWorking")
    @ResponseBody
	public DatatablesViewPage<?> waitWorking(HttpServletRequest request,Integer startRow,String keyword,String stateType,Integer limit) {
    	String username=  (String)request.getSession().getAttribute("username");
    	return myWorkService.selectWaitWorking( keyword, stateType,username,startRow,limit);
    }
    
    /**
	 * 分页全部工作查询
	 * @param request
	 * @param startRow      开始记录数
	 * @param keyword       关键字
	 * @param stateType     状态类型
	 * @param beginDateStr  开始时间
	 * @param endDateStr    结束时间
	 * @param userId        用户主键
	 * @param scope         范围 1全部2我创建的3我经办的
	 * @param userNameScope   人员姓名
	 * @return
	 */
    @RequestMapping("selectwork")
    @ResponseBody
	public DatatablesViewPage<?> selectwork(HttpServletRequest request, Integer startRow, Integer limit,String keyword, String stateType, String beginDateStr,
			String endDateStr, Integer scope, String userNameScope, Integer userId, Boolean isOk) {
    	String username=  (String)request.getSession().getAttribute("username");
    	AuthorityController controller=(AuthorityController) SpringUtil.getBean("authorityController");
    	return myWorkService.selectwork(controller.isSuperAdmin(request), controller.searchScope(request), startRow, limit, keyword, stateType, beginDateStr, endDateStr, scope, username,userNameScope);
    }
    
    /**
     * 点击主办时插入处理时间,即将流程状态变为"处理中"
     * @param taskId  流程节点ID
     * @return
     */
    @RequestMapping("insertState")
    @ResponseBody
    public JsonMessage insertState(String taskId){
    	return myWorkService.insertState(taskId);
    }
    
    /**
     * 撤销委托
     * @param processId 流程ID
     * @return
     */
    @RequestMapping("backEntrust")
    @ResponseBody
	public JsonMessage updateBackEntrust(String processId) {
    	return myWorkService.updateBackEntrust(processId);
    }

	/**
     * 删除流程(挂起)
     * @param processId 流程ID
     * @return 
     * @return
     */
    @RequestMapping("deleteProcess")
    @ResponseBody
	public JsonMessage deleteProcess(String processId) {
    	 try {
			myWorkService.deleteProcess(processId);
			return new JsonMessage(true, "删除成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
    	 return new JsonMessage(false, "删除失败");
    }

}
