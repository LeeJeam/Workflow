<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/common/taglib.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	cn.hy.projectmanage.pojo.Project project=cn.hy.common.utils.SessionUtil.getProjectName(request);
%>
<!DOCTYPE html>
<html>
<head>
	<title>主页</title>
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
	<link rel="stylesheet" href="<%=rootPath %>/js/custom/views/plugIn/jquery-autocomplete/autocomplete.css">




    <script src="<%=rootPath %>/publish/project1/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.js"></script>
    <script src="<%=rootPath %>/publish/project1/UILib/bootstrap/js/bootstrap.min.js"></script>
    <script src="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.min.js"></script>
    <script src="<%=rootPath %>/js/quit.js"></script>
    <script src="<%=rootPath %>/publish/project1/UILib/dist/js/app.min.js"></script>
    <script src="<%=rootPath %>/publish/project1/UILib/dist/js/demo.js"></script>

    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrapValidator/css/bootstrapValidator.min.css">
    <script src="<%=rootPath %>/publish/project1/UILib/bootstrapValidator/js/bootstrapValidator.min.js"></script>

    <!--table-->
    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/plugins/datatables/dataTables.bootstrap.css">
    <script src="<%=rootPath %>/publish/project1/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="<%=rootPath %>/publish/project1/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
    <!---->
    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>

    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>

    <link rel="stylesheet" href="<%=rootPath %>/js/file/uploadify.css">
    <script type="text/javascript" src="<%=rootPath %>/js/filecommon.js"></script>
    <script src="<%=rootPath %>/js/file/jquery.uploadify.min.js" type="text/javascript"></script>


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
    
    <script type="text/javascript" src="${rootPath}/js/custom/views/control/flowJS/flowChooseUser.js"></script>
    <script type="text/javascript" src="${rootPath}/js/custom/views/control/flowJS/runningFlow.js"></script>
    <script type="text/javascript" src="${rootPath}/js/custom/views/control/flowJS/flowPageContent.js"></script>
    
    
    <script src="<%=rootPath %>/publish/project1/js/jquery.qtip.pack.js" ></script>
    <script src="<%=rootPath %>/publish/project1/js/jquery.outerhtml.js" ></script>

	<script type="text/javascript" src="<%=rootPath %>/js/custom/views/plugIn/jquery-autocomplete/autocomplete.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/custom/views/plugIn/jquery-autocomplete/browser.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/form/bootstrap-validator.js"></script>
    <script type="text/javascript" src="${rootPath}/js/custom/views/releasesmanage/FormPageBtnInit.js"></script>
    <style>
    	.msgList { position: relative; padding: 5px 10px;}
		.tips { position: absolute; right: 2px; top: 3px; background: red; width: 8px; height: 8px; display: block; border-radius: 50%;}
		
		#rightmenu {
			width: 160px;
			height: auto;
			position: fixed;
			top: 20%;
			right: 10px;
			margin-top: -40px;
			z-index: 100;
		}
		#rightmenu .textBox {
			list-style-type: none;
			background: url("../img/timeIma/time-bg.png") repeat-y scroll transparent;
			background-position: 10px 0;
			margin: 50px 0;
			padding: 0;
		}
		#rightmenu .textBox li {
			position: relative;
			margin-bottom: 45px;
		}
		#rightmenu .textBox li a {
			text-decoration: none;
			color: #666;
		}
		#rightmenu .textBox li a:hover {
			color: #999;
		}
		#rightmenu .textBox li .number {
			border-radius: 50%;
			position: absolute;
			background: #999;
			width: 28px;
			height: 28px;
			line-height: 28px;
			text-align: center;
			font-size: 16px;
			color: #eee;
		}
		#rightmenu .textBox li .time-text {
			margin-left: 40px;
		}
		#rightmenu .textBox li .time-text span {
			display: block;
			padding-top: 4px;
		}
		#rightmenu .textBox li .active .number {
			background-color: #0073b7;
			color: #fff;
		}
		#rightmenu .textBox li .time-text p {
			display: block;
			overflow: hidden; white-space: nowrap; padding-top: 4px;
		}
		
		#menu-mobile {
			position: absolute;
			right: -5px;
			top: 20px;
			padding: 20px 0;
			display: none;
		}
		#menu-mobile .textBox {
			list-style-type: none;
			background: url("../img/timeIma/time-bg.png") repeat-y scroll transparent;
			background-position: 10px 0;
			padding: 0;
		}
		#menu-mobile .textBox li {
			position: relative;
			margin-bottom: 45px;
		}
		#menu-mobile .textBox li:last-child {
			margin-bottom: 0;
		}
		#menu-mobile .textBox li a {
			text-decoration: none;
			color: #777;
		}
		#menu-mobile .textBox li a:hover {
			color: #999;
		}
		#menu-mobile .textBox li .number {
			border-radius: 50%;
			background: #d2d6de;
			width: 28px;
			height: 28px;
			line-height: 28px;
			text-align: center;
			font-size: 16px;
		}
		#menu-mobile .textBox li .active .number {
			background-color: #0073b7;
			color: #fff;
		}
		
		
		a {
			cursor: pointer;
		}
    	
		.btnFooter {
			width: 100%;
			height: 46px;
			line-height: 46px;
			-webkit-box-shadow: 10px 3px 20px #999;
			box-shadow: 10px 3px 20px #999;
			background: #5fafdd;
			position: fixed;
			bottom: 0px;
			left: 0;
			z-index: 9999;
			padding-right:10px;
			overflow: hidden;
			color: #fff;
			margin-left: 230px;
			padding-right: 240px;
		}
		@media (max-width: 767px) {
			.btnFooter { width: 100%; height: 46px; padding-right: 20px; margin-left: 0px;}
		}
	</style>
	</head>
	<body class="skin-blue fixed sidebar-mini">
		<div class="wrapper">
			<header class="main-header">
				<a href="#" class="logo"><span class="logo-lg"><b><%=project.getProjectEnName()%></b></span></a>
				<nav class="navbar navbar-static-top">
					<div class="navbar-custom-menu">
						<ul class="nav navbar-nav">
							<li class="dropdown user user-menu">
								<a href="#" class="dropdown-toggle" title="用户名">
									<img src="<%=rootPath%>/img/user1.png" class="user-image" />
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
						
					</ul>
				</section>
			</aside>
			<div class="content-wrapper">
				<section class="content-header">
		            <ol class="breadcrumb">
						<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
						<li><a href="#">
							<c:choose>
								<c:when test="${param.titleFlag == 1}">
									我的工作
								</c:when>
								<c:when test="${param.titleFlag == 2}">
									工作查询
								</c:when>
								<c:otherwise>新建工作</c:otherwise>
							</c:choose>
						</a></li>
						<li class="active">${flowName}</li>
					</ol>
		        </section>
		        <section class="content">
		            <div class="row">
		                <div class="col-md-8 col-md-offset-2">
		                	


							<div id="rightmenu" class="hidden-xs">
								<ul class="textBox">
									 
										<li>
											<a onclick="clickState(this,1)" href="javascript: void(0);" class="active">
												<div class="number">1</div>
												<div class="time-text">
													<p>申请人填写</p>
												</div>
											</a>
										</li>
							    	 
										
							    	
								</ul>
							</div>
							
							<div id="content">
								
								
							</div>
							<div class="box box-solid" id="signRemarsWrite" style="display: none">
								<div class="box-header with-border">
									<h3 class="box-title excutetitle">会签意见</h3>
								</div>
								<div class="box-body">
									<div class="col-md-8 col-md-offset-2 text-right">
										<textarea autofocus="autofocus" class="form-control" id="signRemarsWriteTextarea" placeholder="请在这里输入会签意见" style="height: 110px; margin: 20px 0 10px;"></textarea>
										<button class="btn btn-primary btn-sm btn-flat" id="submitSignInfo" onclick="runningFlow.submitSign()">提 交</button>
									</div>
								</div>
							</div>
		                </div>
		            </div>
		        </section>
		        
			</div>
			
			
			
			<div  class="btnFooter " id="flowOprationBtnFooter">
				<div class="fl hidden-xs">
					<b style="margin-left: 10px;" id="lastApplyForm"></b>
				</div>
				<div class="fr">
					<div id="chooseNextUser" class="fl">
					    <div class="fr" style="width: 150px; margin-top: 9px; margin-right: 5px;">
							<input type="text" id="chooseNextUserDisplayInput"  class="form-control input-sm" readonly="readonly" placeholder="下一步主办人"/>
						</div>
					    <div class="fr hidden-xs" style="margin-right: 5px;">
							
						</div>
					</div>
					<div class="fr" id="flowOprationBtn">
						<button type="button" class="btn btn-primary btn-sm" id="submitProcessBth"  onclick="">提交</button>
						<button type="button" class="btn btn-primary btn-sm" id="nextApplyUser" onclick="runningFlow.queryProcessNextUsers()">下一步办理人</button>
						<button type="button" class="btn btn-default btn-sm" id="form_btn_cance_back" data-dismiss="modal">取消</button>
						
					   
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="userWin">
		    <div class="modal-dialog" role="document">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
						<button type="button" class="btn btn-default btn-sm" id="form_btn_cance_flow" data-dismiss="modal">取消</button>
		                <button type="button" class="btn btn-primary btn-sm" id="" onclick="runningFlow.submitProcess()">提交</button>
					</div>
		        </div>
		    </div>
		</div>	
		<jsp:include page="/publish/project1/public/commBaseVariable.jsp"></jsp:include>
		<jsp:include page="/common/userName1.jsp"></jsp:include>
	</body>
	<div id="flow_comm_wrap_form_div"></div>
	<script>
		var processkey='${processkey}';
		var taskId='${taskId}';   
		var processFlag="process";
		var isView='${isView}';
		function clickState(a,index){
			var menu = $("#rightmenu");    
			var curLink = menu.find(".active");
		        curLink.removeClass("active");
		       	$(a).addClass("active");
		 	document.getElementById('item'+index).scrollIntoView();
		 	document.documentElement.scrollTop =document.documentElement.scrollTop-60;
		}
		$(function(){
			
			runningFlow.taskHandle(processkey,taskId);
			if(isView=='true'){
				$("#flowOprationBtnFooter").remove();
			}
		});
	</script>
</html>