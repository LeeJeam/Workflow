function start(id){
	$.ajax({
		type : 'post',
		url : basePath+'/leave/start.htm',
		data:{'id':id},
		datatype : 'json',
		success : function(data) {
			if(data!=null || data!=undefined){
				alert("申请成功!，申请流程ID为"+data);
				window.location.href=basePath+"/leave/taskList.htm";
			}else{
				alert("申请失败!");
			}
		}
		});
}
