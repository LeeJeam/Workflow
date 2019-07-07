package cn.hy.flowmanage.listener;

import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class TestListener implements TaskListener {

	private static final long serialVersionUID = 1L;

	public void notify(DelegateTask delegateTask) {
			System.out.print("任务在等待，延迟10秒会自动处理..........." + delegateTask.getEventName());
	}
	
	public void testhh(String str) throws Exception {
		System.out.println(str);
	}
}