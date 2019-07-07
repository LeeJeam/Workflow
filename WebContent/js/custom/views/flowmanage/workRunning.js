function start(id){
	$.ajax({
		type : 'post',
		url : basePath+'/work/start.htm',
		data:{'id':id},
		datatype : 'json',
		success : function(data) {
			if(data!=null || data!=undefined){
				alert("申请成功!，申请流程ID为"+data);
				window.location.href=basePath+"/work/taskRunning.htm";
			}else{
				alert("申请失败!");
			}
		}
		});
}
function deleteProcess(workId){
	if (confirm("确定要删除吗？")) {
		$.ajax({
			type : 'post',
			url : basePath+'/work/del.htm',
			data:{'workId':workId},
			datatype : 'json',
			success : function(data) {
				if(data==1){
					alert("删除成功!");
					window.location.href=basePath+"/work/running.htm";
				}else{
					alert("删除失败!");
				}
			}
			});
	}
}