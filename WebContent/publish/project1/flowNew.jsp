<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>新建流程</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/public.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/liucheng.css">
	</head>
	<body class="hold-transition skin-blue">
		<div class="wrapper">
		<input type="hidden" id="rootPath" value="<%=rootPath %>">
			<jsp:include page="public/header.jsp"></jsp:include>
			<jsp:include page="public/sidebar.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content-header">
					<ol class="breadcrumb">
						<li><a href="#"><i class="fa fa-home"></i>首页</a></li>
						<li class="active">功能列表</li>
					</ol>
				</section>
				<section class="content">
					<div class="row">
						<div class="col-md-3">
							<div class="box box-solid">
				                <div class="box-header with-border">
				                  <h3 class="box-title">流程类型</h3>
				                  <div class="box-tools">
				                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				                  </div>
				                </div>
				                <div class="box-body no-padding" id="box-type-body">
				               
				                </div>
				              </div>
						</div>
						<div class="col-md-9">
							<div class="box box-primary">
								<div class="box-header with-border">
									<h3 class="box-title">功能列表</h3>
								</div>
								<div class="box-body" id="function-table-processcreate">
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<jsp:include page="public/footer.jsp"></jsp:include>
		</div>
		<div class="modal fade" id="equipmentDemoAdd">
			<div class="modal-dialog" role="document">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		                    <span aria-hidden="true">×</span>
		                </button>
		                <h4 class="modal-title">流程表单</h4>
		            </div>
		            <div class="modal-body" id="modal-body">
		            	 
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" id="closemodal" data-dismiss="modal">关闭</button>
		                <button type="button" class="btn btn-primary" onclick="submitUpload();">提交</button>
		            </div>
		        </div>
		    </div>
		</div>
		<script src="<%=rootPath %>/publish/project1/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/js/quit.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/demo.js"></script>
<script type="text/javascript">
var basePath=$("#rootPath").val();
$(function(){
	var typeId  = $("#typeid").val();//流程类型
	getProcessType();
	getProcessNew(typeId)
});

function getProcessNew(typeId){
	$(".nav-stacked li").click(function (){
		$(".nav-stacked li").attr("class","");
		$(this).addClass("active");
	});
	$.ajax({
		type:"post",
		url:basePath+"/processController/findByProcessList.htm",
		data:{"typeId":typeId},
		dataType:"json",
		success:function(data){
			var html="";
			if(data!=null&&data.length>0){
				var length=data.length;
				for(var n=0;n<length;n++){
					if(data[n].processstate=='1'){state="已部署"}
					html+='<div class="liu">'+
                       '<div class="cheng">'+
                       '<div class="liucheng"><a href="#" data-toggle="modal" data-target="#equipmentDemoAdd" onclick="taskHandle(\''+data[n].applyform+'\',\''+data[n].processkey+'\',\''+data[n].id+'\')" h="<%=basePath %>/processController/viewForm.htm?processkey='+data[n].processkey+'&processId='+data[n].id+''+"&applyform="+data[n].applyform  +'"' + '><h4>'+data[n].processname+'</h4></a></div>'+
                       '<div class="liucheng tu"><a href="<%=basePath%>flowImage.jsp?processid=' +data[n].id+ '"' +'><img alt="shejitu" src="<%=rootPath %>/publish/project1/img/shejitu.png"></a>流程设计图</div>'+
                       '<div class="liucheng tu"><a data-toggle="modal" data-target="#equipmentDemoAdd" onclick="taskHandle(\''+data[n].applyform+'\',\''+data[n].processkey+'\',\''+data[n].id+'\')" h="<%=basePath %>/processController/viewForm.htm?processkey='+data[n].processkey+'&processId='+data[n].id+''+"&applyform="+data[n].applyform  +'"' + '><img alt="shejitu" src="<%=rootPath %>/publish/project1/img/biaodan.png"></a>流程表单</div>'+
                       '<div class="liucheng tu"><a href="#"><img alt="shejitu" src="<%=rootPath %>/publish/project1/img/shuoming.png"></a>流程说明</div>'+
                       '<div class="liucheng tu"><button class="btn btn-primary" style="margin-top: 10px; margin-left: 15px;" data-toggle="modal" data-target="#equipmentDemoAdd" onclick="taskHandle(\''+data[n].applyform+'\',\''+data[n].processkey+'\',\''+data[n].id+'\')">快速新建</button></div>'+
                       '</div>'+
                       '</div>'
					
				}
			}
			$("#function-table-processcreate").html(html);
		}
	});
}
function taskHandle(applyform,processkey,processId){
	//businessId=id;
	
	 $.post(basePath+"/processController/viewForm.htm", {applyform:applyform}, function(data){
		 $("#modal-body").hide();
		 $("#modal-body").html(data);
		 $("#modal-body").find(".main-sidebar,.main-header,.content-header,.main-footer,#btnSubmit,#btnReset").remove();
		 $("#modal-body").find(".wrapper").removeClass("wrapper");
		 $("#modal-body").find(".content-wrapper").removeClass("content-wrapper");
		 $("#modal-body").find(".content").find(".box").removeClass("box");
		 $("#modal-body").find(".content").find(".box-primary").removeClass("box-primary");
		 $("#modal-body").find(".box-body").removeAttr("style");
		 $("#modal-body").show();
		 $.post(basePath+"/button/updateOrSave.htm", {tableName:$("#modal-body").find("#table-name").val(),id:""}, function(data){
			 if(data.status){
				 var bID=data.message;
				 $("#modal-body").find("input[name=id]").val(bID);
				 $.post(basePath+"/processController/createProcess.htm", {processId:processId,processkey:processkey,bID:bID,}, function(data){
					 if(data.status){
						 alert("启动流程成功");
					 }else{
						 alert("启动流程失败，流程未布转转署");
					 }
				 },"");
			 }
			 
		 },"");
	 },"")
	 return false;
}
function getProcessType(){
	$.ajax({
		type:"post",
		url:basePath+"/processController/findProcessType.htm",
		dataType:"json",
		success:function(data){
			var html="<ul class='nav nav-pills nav-stacked'>"
						+'<li onclick="getProcessNew()"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;全部流程</a></li></ul>';
			if(data!=null&&data.length>0){
				var length=data.length;
				for(var n=0;n<length;n++){
					html+='<ul class="nav nav-pills nav-stacked">'
	                    +'<li onclick="getProcessNew('+"'"+data[n].typename+"'"+')"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;'+data[n].typename+ '</a></li></ul>'	
				}
			}
			$("#box-type-body").html(html);
			$(".nav-stacked li:eq(0)").addClass("active");
			$(".nav-stacked li").click(function (){
				$(".nav-stacked li").attr("class","");
				$(this).addClass("active");
			})
		}
	});	
}
</script>
	</body>
</html>