package cn.hy.releasesmanage.controller;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import cn.hy.common.utils.SystemPropertyUtil;
import cn.hy.flowmanage.service.IManagerFlowService;
import cn.hy.flowmanage.service.impl.ManagerFlow;

import java.util.Properties;


public class DeplyFlow extends HttpServlet {
	private static final long serialVersionUID = 1L;


	@Override
	public void init(ServletConfig config) throws ServletException {
		try {
			Properties properties = SystemPropertyUtil.loadProperties("config/system.properties");
			String flowIsDeploy = properties.getProperty("flowIsDeploy");
			if("true".equals(flowIsDeploy)) {
				IManagerFlowService managerFlow = new ManagerFlow();
				managerFlow.deployFlows();
			}
		} catch (Exception ex){
			ex.printStackTrace();
		}
	}
}
