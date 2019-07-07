QueryFlow.prototype={ 
		/**
		 * 查询用户的待办任务列表
		 */
	TaskQueryList:function(businesskey,userId){
		$.ajax({
			type:"post",
			url:basePath+"/queryFlowController/TaskQueryList.htm",
			data : {
				"businesskey":businesskey,
				"userId":userId
			},
			dataType:"json",
			success:function(data){
				
			}
		});
	},
    	/**
		 * 查询流程历史记录
		 */
     getProcessInstance:function(processkey){
		$.ajax({
			type:"post",
			url:basePath+"/queryFlowController/getProcessInstance.htm",
			data : {
				"processkey":processkey,
				
			},
			dataType:"json",
			success:function(data){
				
			}
		});
	},
	/**
	 * 查询流程历史记录
	 */
	processInstanceList:function(processkey){
		$.ajax({
			type:"post",
			url:basePath+"/queryFlowController/processInstanceList.htm",
			data : {
				"processkey":processkey,
				
			},
			dataType:"json",
			success:function(data){
				
			}
		});
	},
	/**
	 * 查看流程设计图
	 */
   flowImage:function(processkey){
		$.ajax({
			type:"post",
			url:basePath+"/queryFlowController/flowImage.htm",
			data : {
				"processkey":processkey,
				
			},
			dataType:"json",
			success:function(data){
				
			}
		 });
	},
	/**
	 * 根据taskId查询流程变量
	 */
	flowImage:function(taskId){
		$.ajax({
			type:"post",
			url:basePath+"/queryFlowController/getProcessVariables.htm",
			data : {
				"taskId":taskId,
				
			},
			dataType:"json",
			success:function(data){
				
			}
		 });
	},
	/**
	 * 根据task对象获取流程实列
	 */
	createProcessInstanceQuery:function(taskId){
		$.ajax({
			type:"post",
			url:basePath+"/queryFlowController/createProcessInstanceQuery.htm",
			data : {
				"taskId":taskId,
				
			},
			dataType:"json",
			success:function(data){
				
			}
		 });
		},

	/**
	 * 查询该流程部署信息
	 */
	getProcessDefinition:function(processDefinitionId){
		$.ajax({
			type:"post",
			url:basePath+"/queryFlowController/getProcessDefinition.htm",
			data : {
				"processDefinitionId":processDefinitionId,
				
			},
			dataType:"json",
			success:function(data){
				
			}
		 });
		},
	/**
	 * 查询签收的任务列表信息
	 */
	toClaimList:function(deploymentId){
		$.ajax({
			type:"post",
			url:basePath+"/queryFlowController/toClaimList.htm",
			data : {
				"deploymentId":deploymentId,
				
			},
			dataType:"json",
			success:function(data){
				
			}
		 });
		},
	/**
	 * 查询已完成历史任务列表信息
	 */
	finishedlist:function(deploymentId){
		$.ajax({
			type:"post",
			url:basePath+"/queryFlowController/toClaimList.htm",
			data : {
				"deploymentId":deploymentId,
			},
			dataType:"json",
			success:function(data){
				
			}
		 });
		}
}


 