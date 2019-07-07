    
DoingFlow.prototype={ 
    /**启动流程**/
	startFlow:function(businesskey,processDefinitionKey){
		$.ajax({
			type:"post",
			url:basePath+"/doingFlowController/startFlow.htm",
			data : {
				"businesskey":businesskey,
				"processDefinitionKey":processDefinitionKey
			},
			dataType:"json",
			success:function(data){
				
			}
		});
	},
	/**办理流程任务**/
    completeTask:function(taskId){
    	$.ajax({
    		type:"post",
    		url:basePath+"/doingFlowController/completeTask.htm",
    		data : {
    			"taskId":taskId,
    		},
    		dataType:"json",
    		success:function(data){
    			
    		}
    	});
		
	}, 
	/**修改流程状态字段**/
	updateState:function(state,processInstanceId){
		$.ajax({
			type:"post",
			url:basePath+"/doingFlowController/updateState.htm",
			data : {
				"state":state,
				"processInstanceId":processInstanceId
			},
			dataType:"json",
			success:function(data){
				
			}
		});
		
	},
	/** 处理该任务下的备注信息**/
	addComment:function(taskid,flag,comment){
		$.ajax({
			type:"post",
			url:basePath+"/doingFlowController/addComment.htm",
			data : {
				"taskid":taskid,
				"flag":flag,
				"comment":comment,
			},
			dataType:"json",
			success:function(data){
				
			}
		});
		
	},	
	deployFlow:function(processid){
		$.ajax({
			type:"post",
			url:basePath+"/processController/deployFlow.htm",
			data : {
				"processid":processid,
			},
			dataType:"json",
			success:function(data){
				alert(data);
			}
		});
		
	}	
}



