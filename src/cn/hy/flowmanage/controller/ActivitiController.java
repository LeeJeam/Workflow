package cn.hy.flowmanage.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import cn.hy.common.controller.BaseController;
import cn.hy.flowmanage.service.IActivitiService;

/**
 * @Description: 绘制流程走势图
 */
@Controller
@Scope("prototype")
@RequestMapping("/activitiController")
public class ActivitiController extends BaseController {

	@Resource(name="activitiService")
	private IActivitiService activitiService;

	/** 
	 * 获取流程图像，已执行节点和流程线高亮显示
	 * @param pProcessInstanceId 流程实例ID
	 */
	@RequestMapping(params = "getActivitiProccessImage")
	public void getActivitiProccessImage(String pProcessInstanceId, HttpServletResponse response){
		try {
			activitiService.viewImg(pProcessInstanceId, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
