/**
 * 获取功能列表
 * @param id  表主键
 */

function getProcessClient(){
	$.ajax({
		type:"post",
		url:basePath+"/processController/findByProcessList.htm",
		data:{"sql":"select id,processkey,processname,processstate,processxml,typeid,applyform from t_p_process where processstate=1"},
		dataType:"json",
		success:function(data){
			var html="";
			if(data!=null&&data.length>0){
				var length=data.length;
				for(var n=0;n<length;n++){
					if(data[n].processstate=='1'){state="已部署"}
					html+='<div class="liu">'+
                       '<div class="cheng">'+
                       '<div class="liucheng"><h4>'+data[n].processname+'</h4></div>'+
                       '<div class="liucheng tu"><a href="processController/FlowImage.htm?processkey='+data[n].processkey+'"'  +'><img alt="shejitu" src="/CustomFlow/images/shejitu.png"></a>流程设计图</div>'+
                       '<div class="liucheng tu"><a href="processController/createProcess.htm?processkey='+data[n].processkey+'&processId='+data[n].id+''+"&entity="+data[n].applyform  +'"' + '><img alt="shejitu" src="/CustomFlow/images/biaodan.png"></a>流程表单</div>'+
                       '<div class="liucheng tu"><a href="processController/FlowImage.htm?processkey='+data[n].processkey+'"'  +'><img alt="shejitu" src="/CustomFlow/images/shuoming.png"></a>流程说明</div>'+
                       '</div>'+
                       '</div>'
					
				}
			}
			$("#function-table-processcreate").html(html);
		}
	});
}
function edit(funtionId,type){
	if(type=="表格"){
		window.location.href=basePath+"/createDataTable/toEdit.htm?pid="+funtionId;
	}else{
		window.location.href=basePath+"/form/index.htm?t="+funtionId;
	}
}
function ForbiddenOrUsing(proId,type){
	$.ajax({
		type:"post",
		url:basePath+"/processController/ForbiddenOrUsing.htm",
		data:{"processid":proId,"type":type},
		dataType:"json",
		success:function(data){
				alert(data);
				window.location.href=basePath+"/processController/processList.htm";
		}
	});
}

function delPro(proId){
	var select = confirm("此操作将会删除该流程下的所有数据，您确定要删除吗？");
	if(select){
		$.ajax({
			type:"post",
			url:basePath+"/processController/delPro.htm",
			data:{"processId":proId},
			dataType:"json",
			success:function(data){
				if(data=="success"){
					alert("删除成功!");
					window.location.href=basePath+"/processController/processList.htm";
				}else{
					alert("删除失败！");
				}
			}
		});
	}else{
		return -1;
	}
}

function preview(){
	$.ajax({
		type:"post",
		url:basePath+"/work/builder.htm",
		dataType:"json",
		error : function(data) {
			alert(data.message);
		},
		success : function(data) {
			alert(data.message);
		 }
		
	});
}
$(function(){    
	getProcessClient();
});