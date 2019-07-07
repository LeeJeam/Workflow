function toAddMethod(url){
	window.location.href=basePath+"/button/toadd.htm";
}
function addMethod(data,url){
	$("#add").ajaxSubmit({
		type : 'post',
		url : basePath+"/button/add.htm",
		datatype : 'json',
		data:{"data":data,"url":url},
		success : function(data) {
			if(data.success){
				window.location.href=url;
			}
		},
		error : function(XmlHttpRequest, textStatus,errorThrown) {
		}
	});
}
function toEditMethod(id){

	var da = [];
	da.push({
		"id" : id,
		"url" : $('#iptFormPageName').val(),//表单名
		"etableName":$('#iptEtableName').val(),
		"pageName":$('#iptPageName').val() //修改后的跳转链接
	});
	var data = JSON.stringify(da);
	
	window.location.href=basePath+"/button/toEdit.htm?data="+data;
	
	
	
}
function EditMethod(){
	var data=[];
	var formData=[];
	var id=$("#iptid").val();
	var url=$('#iptPageName').val();//表格页面名
	var list= $("#add input[type='text']");
	var o={};
	for(var i=0;i<list.length;i++){
		var name=list[i].name;
		var val=list[i].value;
		
		o[name] = val;	
	}
	formData.push(o);
	data.push({
		"id":id,
		"url" : url,
		"etableName":$('#iptEtableName').val(),
		"formData": formData //表单数据
	});
	 var str2 = JSON.stringify(data) 
	$.ajax({
		type:"post",
		url : basePath+"/button/edit.htm",
		data:{"data": JSON.stringify(data)},
		dataType:"json",
		success:function(data){
			if(data.status){
				window.location.href=basePath+"/pageToPage/index.htm?pagename="+url;
			}
		},
		error : function(XmlHttpRequest, textStatus,errorThrown) {
		}
	});
}