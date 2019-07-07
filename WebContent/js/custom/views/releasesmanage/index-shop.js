/*发布项目*/
function publish(){
	$.ajax({
		type:"post",
		url:basePath+"/publish/publish.htm",
		data:{},
		dataType:"json",
		success:function(data){
			alert(data);
		}
	});
}

