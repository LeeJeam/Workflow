/*managerFlow.prototype={ 
forbiddenOrUsing:function(processid,state) 
{ 
	$.ajax({
		type:"post",
		url:basePath+"/managerFlowController/forbiddenOrUsing.htm",
		data : {
			"processid":processid,
			"type":state
		},
		dataType:"json",
		success:function(data){
				alert(data);
				window.location.href=basePath+"/processController/processList.htm";
		}
	});
}, 
init:function() { 
alert("ShapeBase init"); 
} 
}; */


/**启用或禁用流程**/
function forbiddenOrUsing(processid,state){
	$.ajax({
		type:"post",
		url:basePath+"/managerFlowController/forbiddenOrUsing.htm",
		data : {
			"processid":processid,
			"type":state
		},
		dataType:"json",
		success:function(data){
				alert(data);
				window.location.href=basePath+"/processController/processList.htm";
		}
	});
}
/**部署全部启用的工作流**/
function deployAllFlow(){
	
}
/**编辑工作流**/
function editFlow(processid){
	
}
/**创建流程**/
function createProcess(processid){
	
}