

function goSubmit(){
	$("#form").ajaxSubmit({
		type : 'post',
		url : basePath+'/leave/saveLeave.htm',
		datatype : 'json',
		success : function(data) {
			if(data=1){
				alert("提交成功!");
				window.location.href=basePath+"/leave/running.htm";
			}else{
				alert("提交失败!");
			}
		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {
			alert("error");
		},
		beforeSubmit : function(formData, jqForm, options) {
			return true; // 调用下方的校验方法
		}
		});
}

function start(id){
	alert(id);
	$("#form").ajaxSubmit({
		type : 'post',
		url : basePath+'/leave/deleteProcess.htm',
		data:{'id':id},
		datatype : 'json',
		success : function(data) {
			if(data=1){
				alert("删除成功!");
				//window.location.href=basePath+"/leave/running.htm";
			}else{
				alert("删除失败!");
			}
		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {
			alert("error");
		},
		beforeSubmit : function(formData, jqForm, options) {
			return true; // 调用下方的校验方法
		}
		});
}
