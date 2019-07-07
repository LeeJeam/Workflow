package cn.hy.flowmanage.listener;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.event.ActivitiEvent;
import org.activiti.engine.delegate.event.ActivitiEventListener;

public class NodeEventListener implements ActivitiEventListener{
	public boolean isFailOnException() {
		System.out.println("isfailonexception");
		return false;
	}
	public void onEvent(ActivitiEvent event) {
		System.out.println(event.getProcessInstanceId()+"进入事件");
	}
   public void execute(DelegateExecution execution) throws Exception {  
         Thread.sleep(10000);  
         System.out.print("进入前 variavles=" + execution.getVariables());  
         execution.setVariable("day", 3);  
         System.out.print("进入后variavles==" + execution.getVariables());     
    }  
}
