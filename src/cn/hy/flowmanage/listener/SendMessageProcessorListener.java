package cn.hy.flowmanage.listener;
import java.util.List;
import java.util.Map;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.TaskService;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;
import org.activiti.engine.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import cn.hy.common.utils.PropertiesUtils;
import cn.hy.common.utils.SpringUtil;
import cn.hy.common.utils.UrlUtil;
import cn.hy.databasemanage.service.ICreateTableService;
public class SendMessageProcessorListener implements JavaDelegate {

	private static final Logger log=LoggerFactory.getLogger(SendMessageProcessorListener.class);

	@Autowired
	private TaskService taskService =ProcessEngines.getDefaultProcessEngine().getTaskService();;
	@Override
	public void execute(DelegateExecution execution) throws Exception {
		//获得事务id
		Task task = taskService.createTaskQuery().processInstanceId(execution.getProcessInstanceId()).singleResult();
        //获取办理人名称
		String assignee =task.getAssignee();
		System.out.println("接口发送消息****************");
		//获取当前节点Id
        ICreateTableService service=(ICreateTableService) SpringUtil.getBean("createTableService");
		List<Map<String, Object>> parameterMap = service.selectBySQL("select * from yonghubiao where username='"+assignee+"'");
		//获取当前节点信息
		//节点人员发送钉钉消息
		List<Map<String, Object>> processNode = service.selectBySQL("select * from t_p_processnode where id='"+execution.getCurrentActivityId()+"'");
		if(parameterMap.size()>0 && processNode!=null){
			    sendMessage(parameterMap,processNode);
		}
		//抄送人员发送钉钉消息
		if(processNode!=null){
			String sendcopyName =(String)processNode.get(0).get("sendcopyuser");
			if(sendcopyName!=null && !"".equals(sendcopyName)){
				String [] arrayname=sendcopyName.split(",");
				for(int i =0 ;i<arrayname.length ;i++){
					List<Map<String, Object>> parameter = service.selectBySQL("select * from yonghubiao where username='"+arrayname[i]+"'");
					sendMessage(parameter,processNode);
				}
			}
		}
	}
	//公共发送消息方法
	public void  sendMessage(List<Map<String, Object>> parameterMap,List<Map<String, Object>> processNode) throws Exception{
		StringBuffer buffer = new StringBuffer("http://"+PropertiesUtils.init("ipAddress")+":"+PropertiesUtils.init("port")+"/RecSendSys/service/app.do?");
		 for(Map<String, Object> map :parameterMap){
				String ddcode =(String) map.get("ddcode");   //钉钉code值
				String tel =(String) map.get("tel");         //电话号码
				String message =(String)processNode.get(0).get("msg");       //获取配置信息
				if(ddcode!=null && !"".equals(ddcode)){ 
					buffer.append("param={\"messageType\":\"1\",\"content\":{\"agentld\":\"7189823\",\"title\":\"测试\",\"body\":\"" + message + "\",\"userCode\":\"" + ddcode + "\"}}");
					log.info("发送*********"+buffer.toString());
					String  str=UrlUtil.getJsonString(buffer.toString());
					JSONObject jsonObject=JSON.parseObject(str);
					if(jsonObject.getBooleanValue("status")){
						log.info("发送钉钉成功");
					}else{
						log.info("发送钉钉失败");
					}
				}
			    if(tel!=null && !"".equals(tel)){
					buffer.append("param={\"messageType\":\"2\",\"content\":{\"telNo\":\"" + tel + "\",\"msg\":\"" + message + "\"}}");
					String  str=UrlUtil.getJsonString(buffer.toString());
					JSONObject jsonObject=JSON.parseObject(str);
					if(jsonObject.getBooleanValue("status")){
						log.info("发送短信成功");
					}else{
						log.info("发送短信失败");
					}
				    
			    }
         }
	}

}