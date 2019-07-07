<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String rootPath = request.getContextPath();
String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <c:set value="<%=rootPath %>" var="rootPath"></c:set>
	<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/font-awesome4/css/font-awesome.min.css">
    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/AdminLTE.css">
    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/skins/_all-skins.min.css">
    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.css">
    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/public.css">
	<link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/liucheng.css">
	<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/plugins/datatables/dataTables.bootstrap.css">
	<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrapValidator/css/bootstrapValidator.min.css">
	<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">
	<link rel="stylesheet" href="<%=rootPath %>/js/file/uploadify.css">
    <script src="<%=rootPath %>/publish/project1/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/quit.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/dist/js/app.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/dist/js/demo.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrapValidator/js/bootstrapValidator.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/filecommon.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/file/jquery.uploadify.min.js"></script>
    <script type="text/javascript" src="${rootPath}/js/custom/views/releasesmanage/TablePageInit.js"></script>
    <script type="text/javascript" src="${rootPath}/js/custom/views/control/form/formPageConfig.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/custom/views/releasesmanage/table-view.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/custom/views/releasesmanage/button.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/jquery.form.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/datadetail.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/plugins/slimScroll/jquery.slimscroll.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/custom/views/functionpagemanage/flow/date.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/common.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/formCommJs.js"></script>
    <script type="text/javascript" src="${rootPath}/js/custom/views/control/form/flowCommPage.js"></script>
    <script src="<%=rootPath %>/publish/project1/UILib/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>
    <script src="<%=rootPath %>/publish/project1/UILib/plugins/zTree/jquery.ztree.excheck-3.5.js"></script>
    
    <script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/form/bootstrap-validator.js"></script>
    <script type="text/javascript" src="${rootPath}/js/custom/views/releasesmanage/FormPageBtnInit.js"></script>
    <script type="text/javascript">
        
    </script>
</head>
<body class="hold-transition skin-blue fixed sidebar-mini" id="chat-box">
<div class="wrapper">
	<input type="hidden" id="rootPath" value="<%=rootPath %>">
    <header class="main-header">
        <a href="#" class="logo"><span class="logo-lg">$PROJECT_NAME</a>
        <nav class="navbar navbar-static-top">
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" title="用户名">
                            <img src="<%=rootPath %>/img/user1.png" class="user-image" />
                            <span class="hidden-xs" id="usernamespan"><%=request.getSession().getAttribute("username") %></span>
							<span class="hidden-xs" style="display:none" id="rolenamespan"><%=request.getSession().getAttribute("jname") %></span>
							<span class="hidden-xs" style="display:none" id="bumennamespan"><%=request.getSession().getAttribute("bname") %></span>
                        </a>
                    </li>
                    <li>
                        <a href="<%=rootPath %>/publish/project1/login.jsp" id="quit" title="退出系统"><i class="fa fa-power-off"></i></a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <aside class="main-sidebar">
        <section class="sidebar">
            <ul class="sidebar-menu">
                <li class="header">功能菜单</li>
                <c:if test="${!empty menudata }">
                    <c:forEach items="${menudata }" var="data" varStatus="status">
                        <li class="treeview <c:if test="${data.id==parentId}">active</c:if>" ref="${data.id}">
                <a href="javascript:void(0)" <c:if test="${empty data.children}">onclick="gotopage('${data.url}','${data.id}')"</c:if>>
                <i class="fa fa-circle-o text-green"></i>
                <span>${data.menu_name }</span>
                <c:if test="${!empty data.children}">
                    <i class="fa fa-angle-left pull-right"></i>
                </c:if>
                </a>
                <c:if test="${data.id == menuId}">
                    <c:set value="<li><i class='fa'></i>${data.menu_name}</li>" var="menuHeader"></c:set>
                </c:if>
                <c:if test="${!empty data.children }">
                    <ul class="treeview-menu">
                        <c:forEach items="${data.children }" var="children" varStatus="status">
                            <li><a href="javascript:gotopage('${children.url}','${children.id}')"><i class="fa fa-circle-o"></i> ${children.menu_name }
                                <c:if test="${!empty children.children}">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </c:if>
                            </a>
                                <c:if test="${!empty children.children}">
                                    <ul class="treeview-menu">
                                        <c:forEach items="${children.children }" var="child" varStatus="status">
                                            <li><a href="javascript:gotopage('${child.url}','${child.id}')"><i class="fa fa-circle-o"></i>${child.menu_name }</a></li>
                                        </c:forEach>
                                    </ul>
                                </c:if>
                            </li>
                        </c:forEach>
                    </ul>
                </c:if>
                </li>
                </c:forEach>
                </c:if>
            </ul>
        </section>
    </aside>
		
	<div class="content-wrapper">
		<input type="hidden" id="rootPath" value="<%=rootPath %>">
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
	<jsp:include page="/common/footer.jsp"></jsp:include>
	<jsp:include page="/publish/project1/public/commBaseVariable.jsp"></jsp:include>
</div>
	
<div class="modal fade" id="userWin">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="chooseUserBoxClose()" ><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">人员查询</h4>
            </div>
            <div class="modal-body" style="height: 360px; overflow-y: auot;">
            	<style>
					.treeAdd { magin: 0px; padding: 0 0 10px 5px; overflow: hidden; border: 1px solid #eee;}
					.treeAdd li { float: left; list-style: none; margin: 10px 10px 0 5px;}
					.treeAdd li a { background: #3c8dbc; color: #fff; padding: 5px; border-radius: 5px;}
					.treeAdd li a span { color: #fff; font-weight: 600; font-size: 16px; margin-left: 5px;}
					.treeAdd li a span:hover { opacity: 0.8;}
				</style>
				<p class="text-yellow" style="margin-bottom: 5px;">已选择下一步办理人员列表</p>
				<ul class="treeAdd" id="user_tree_add">
					
				</ul>
               	<ul id="user_win_tree" class="ztree"></ul>
            </div>
            <div class="modal-footer">
				<button type="button" class="btn btn-default btn-sm" id="buildProcessChooseUserClose" onclick="chooseUserBoxClose()" >取消</button>
                <button type="button" class="btn btn-primary btn-sm" id="buildProcessChooseUserSubmit" onclick="submitProcess()" >提交</button>
			</div>
        </div>
    </div>
</div>
	
<div class="modal fade" id="previewModal_procee" style="z-index: 1049;">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
        	<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="canceProcessName()">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title">流程名称</h4>
            </div>
            <div class="modal-body">            	
            	 <div class="form-group has-feedback" style="overflow: hidden; padding: 20px 0; margin-bottom: 0;">
              		<label class="col-sm-2 control-label text-right" style="margin-top: 6px;">名称：</label>
              		<div class="col-sm-9">
                		<input type="text" class="form-control"  id="process_form_name" placeholder="流程名称不能超过30个字符" data-bv-field="tableName">
                	</div>
            	</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" id="form_btn_cance_pname" onclick="canceProcessName()" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary btn-sm"  onclick="submitProcessName()">提交</button>
            </div>
    	</div>
	</div>
</div>

<script type="text/javascript">
var processIds="";
var createProcessFlag="createProcessFlag";

$(function(){
	var typeId  = $("#typeid").val();//流程类型
	getProcessType();
	getProcessNew(typeId)
});
function canceProcessName(){
	$("#previewModal_procee").removeClass("in").hide();

}
function submitProcessName(){
	$("#buildProcessChooseUserSubmit,#buildProcessChooseUserClose").show();
	var pname=$.trim($("#process_form_name").val());
	if(pname==""){
		alert("请输入流程名称");
		return;
	}
	if(pname.length>30){
		alert("流程名称不能超过30个字符");
		return;
	}
	
	createProcessBySubmit(pname);
}
function getProcessNew(typeId){
    if(typeId==undefined){
		typeId="";
	}
	$(".nav-stacked li").click(function (){
		$(".nav-stacked li").attr("class","");
		$(this).addClass("active");
	});
	
	commRequstFun(basePath+"/processController/findByProcessList.htm", {"typeId":typeId},function(data){
			var html="";
			if(data!=null&&data.length>0){
				var length=data.length;
				for(var n=0;n<length;n++){
					if(data[n].processstate=='1'){state="已部署"}
					html+='<div class="liu">'+
                       '<div class="cheng">'+
                       '<div class="liucheng"><a href="#"  onclick="taskHandle(\''+data[n].id+'\')"><h4>'+data[n].processname+'</h4></a></div>'+
                       '<div class="liucheng tu"><a href="<%=basePath%>/processController/viewImg.htm?processid=' +data[n].id+ '"' +'><img alt="shejitu" src="<%=rootPath %>/publish/project1/img/shejitu.png"></a>流程设计图</div>'+
                       '<div class="liucheng tu"><a onclick="taskHandle(\''+data[n].id+'\')" h="<%=basePath %>/processController/viewForm.htm?processId='+data[n].id+ '"'+'><img alt="shejitu" src="<%=rootPath %>/publish/project1/img/biaodan.png"></a>新建流程</div>'+
                       '<div class="liucheng tu"><a href="#"><img alt="shejitu" src="<%=rootPath %>/publish/project1/img/shuoming.png"></a>流程说明</div>'+
                       '<div class="liucheng tu"><button class="btn btn-primary" style="margin-top: 10px; margin-left: 15px;" onclick="taskHandle(\''+data[n].id+'\')">快速新建</button></div>'+
                       '</div>'+
                       '</div>';
					
				}
			}
			$("#function-table-processcreate").html(html);
		} ,"json")
	
}
function taskHandle(processId){
	//businessId=id;
	processIds=processId;
	$("#process_form_name").val("");
	$("#previewModal_procee").addClass("in").show();
	return false;
}
/**
 * 打开人员选择窗口
 */
function openUserWin(){
	formSubmit(1);
}
function chooseUserBoxClose(){
	$("#userWin").removeClass("in").hide();
}
function submitProcess(){
	 $("#buildProcessChooseUserSubmit,#buildProcessChooseUserClose").hide();
	 var userList=$("#user_tree_add").find("li");
	 var assignee="";
	 var candidateUsers="";
	 var taskCandidateGroup="";
	 if(userList.length>0){
	 	for(var i=0;i<userList.length;i++){
	 		if($(userList[i]).attr("type")=="assignee"){
	 			assignee+=$(userList[i]).attr("title")+","
	 		}else if($(userList[i]).attr("type")=="candidateUsers"){
	 			candidateUsers+=$(userList[i]).attr("title")+","
	 		}else{
	 			taskCandidateGroup+=$(userList[i]).attr("title")+",";
	 		}
	 	}
	 	commRequstFun(basePath+"/processController/switchTaskCandidates.htm", {assignee:assignee,candidateUsers:candidateUsers,taskCandidateGroup:taskCandidateGroup,taskId:$(userList[0]).attr("taskId")}, function(data){
	 	 	
	 	 	chooseUserBoxClose();
	 	 	canceProcessName();
	 	},"");
	 }
	
}
function treeT(selecter,data,fn){
		   /**
             * 开始 - 树目录结构参数设置
             */
            var setting = {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pId",
                        rootPId: ""
                    }
                },
                callback: {
                    onClick: fn
                }
            };
            $.fn.zTree.init($(selecter), setting, data);
}

function createProcessBySubmit(lcmc){

	 commRequstFun(basePath+"/processController/starProcess.htm", {processId:processIds,processname:lcmc}, function(data){
	 	 if(data!=null&&data!=""&&data.length>0&&data[0].open==true){
	 	 
	 	 	treeT($("#user_win_tree"),data,function(event, treeId, treeNode, clickFlag) {
	 	 		if(treeNode.type=="assignee"||treeNode.type=="candidateUsers"){
	 	 			var flag=0;
				 	$("#user_tree_add").find("li").each(function(){
				 		if($(this).attr("ref")==treeNode.id){
				 			flag++;
				 		}
				 	});
				 	if(flag==0){
				 		$("#user_tree_add").empty().append('<li title="'+treeNode.name+'" type="'+treeNode.type+'" taskId="'+treeNode.taskId+'" ref="'+treeNode.id+'"><a href="javascript:void(0);">'+treeNode.name+'<span onclick="delChooseUserFun(this)">x</span></a></li>');
				 	}
	 	 		}else{
	 	 			/**$.post(basePath+"/processController/starProcess.htm", {processId:processIds,bID:bID}, function(data){
	 	 				
	 	 			});*/
	 	 		}
				 	
			});
			var treehtml=$("#user_win_tree").html();
			$("#user_tree_add").empty();
			$("#userWin").addClass("in").show();
	 	 }
	 	 
		
	 },"json");
}
function getProcessType(){
	commRequstFun(basePath+"/processController/findProcessType.htm", "",function(data){
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
		} ,"json");
}
</script>	
	</body>
</html>