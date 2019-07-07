<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
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
    
    
    <script src="<%=rootPath %>/publish/project1/js/jquery.qtip.pack.js" ></script>
    <script src="<%=rootPath %>/publish/project1/js/jquery.outerhtml.js" ></script>

    <script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/form/bootstrap-validator.js"></script>
    <script type="text/javascript" src="${rootPath}/js/custom/views/releasesmanage/FormPageBtnInit.js"></script>
    	<style>
    	.msgList { position: relative; padding: 5px 10px;}
.tips { position: absolute; right: 2px; top: 3px; background: red; width: 8px; height: 8px; display: block; border-radius: 50%;}

#menu {
	width: 160px;
	height: auto;
	position: fixed;
	top: 15%;
	right: 10px;
	margin-top: -40px;
	z-index: 100;
}
#menu .textBox {
	list-style-type: none;
	background: url("img/timeIma/time-bg.png") repeat-y scroll transparent;
	background-position: 10px 0;
	margin: 50px 0;
	padding: 0;
}
#menu .textBox li {
	position: relative;
	margin-bottom: 45px;
}
#menu .textBox li a {
	text-decoration: none;
	color: #666;
}
#menu .textBox li a:hover {
	color: #999;
}
#menu .textBox li .number {
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
#menu .textBox li .time-text {
	margin-left: 40px;
}
#menu .textBox li .time-text span {
	display: block;
	padding-top: 4px;
}
#menu .textBox li .active .number {
	background-color: #0073b7;
	color: #fff;
}
#menu .textBox li .active .time-text span {
	color: #0073b7;
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
	background: url("img/timeIma/time-bg.png") repeat-y scroll transparent;
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
				<a href="#" class="logo"><span class="logo-lg"><b>Flow</b>HYS</span></a>
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
			                    <a href="<%=rootPath %>/publish/login.jsp" id="quit" title="退出系统"><i class="fa fa-power-off"></i></a>
			                </li>
						</ul>
					</div>
				</nav>
			</header>
			<aside class="main-sidebar">
				<section class="sidebar">
					<ul class="sidebar-menu">
						<li class="header">功能菜单</li>
						<li class="treeview">
							<a href="#"><i class="fa fa-leaf"></i><span>自定义一</span><i class="fa fa-angle-left pull-right"></i></a>
							<ul class="treeview-menu">
								<li><a href="#"><i class="fa fa-circle-o"></i> 子页面一</a></li>
								<li><a href="#"><i class="fa fa-circle-o"></i> 子页面二</a></li>
								<li><a href="#"><i class="fa fa-circle-o"></i> 子页面三</a></li>
							</ul>
						</li>
						<li>
							<a href="#"><i class="fa fa-leaf"></i><span>自定义二</span><i class="fa fa-angle-left pull-right"></i></a>
							<ul class="treeview-menu">
								<li><a href="#"><i class="fa fa-circle-o"></i> 子页面一</a></li>
								<li><a href="#"><i class="fa fa-circle-o"></i> 子页面二</a></li>
								<li><a href="#"><i class="fa fa-circle-o"></i> 子页面三</a></li>
							</ul>
						</li>
						<li>
							<a href="#"><i class="fa fa-leaf"></i><span>表单管理</span><i class="fa fa-angle-left pull-right"></i></a>
							<ul class="treeview-menu">
								<li><a href="table.jsp"><i class="fa fa-circle-o"></i> 表单页面</a></li>
								<li><a href="tableTree.jsp"><i class="fa fa-circle-o"></i> 树表单页面</a></li>
								<li><a href="form.jsp"><i class="fa fa-circle-o"></i> 表单展示</a></li>
							</ul>
						</li>
						<li>
							<a href="#"><i class="fa fa-leaf"></i><span>流程管理</span><i class="fa fa-angle-left pull-right"></i></a>
							<ul class="treeview-menu">
								<li><a href="flowNew.jsp"><i class="fa fa-circle-o"></i> 新建流程</a></li>
								<li><a href="flowCommission.jsp"><i class="fa fa-circle-o"></i> 代办工作</a></li>
								<li><a href="flowUiwe.jsp"><i class="fa fa-circle-o"></i> 流程查询</a></li>
							</ul>
						</li>
						<li>
							<a href="#"><i class="fa fa-leaf"></i><span>用户管理</span><i class="fa fa-angle-left pull-right"></i></a>
							<ul class="treeview-menu">
								<li><a href="userManageBasis.jsp"><i class="fa fa-circle-o"></i> 基础信息</a></li>
								<li><a href="userManageRole.jsp"><i class="fa fa-circle-o"></i> 用户角色</a></li>								
							</ul>
						</li>
					</ul>
				</section>
			</aside>
			<div class="content-wrapper">
				<section class="content-header">
		            <ol class="breadcrumb">
						<li><a href="#"><i class="fa fa-home"></i> 首页</a></li><li><a href="#"> 新建工作</a></li>
						<li class="active">业务支持派工流程</li>
					</ol>
		        </section>
		        <section class="content">
		            <div class="row">
		                <div class="col-md-8 col-md-offset-2">
		                	


<div id="menu" class="hidden-xs">
	<ul class="textBox">
		 
			<li>
				<a onclick="clickState(this,1)" href="javascript: void(0);" class="active">
					<div class="number">1</div>
					<div class="time-text">
						<span>申请人填写</span>
					</div>
				</a>
			</li>
    	 
			<li>
				<a onclick="clickState(this,2)" href="javascript: void(0);">
					<div class="number">2</div>
					<div class="time-text">
						<span>大区受理</span>
					</div>
				</a>
			</li>
    	 
			<li>
				<a onclick="clickState(this,3)" href="javascript: void(0);">
					<div class="number">3</div>
					<div class="time-text">
						<span>支持结果</span>
					</div>
				</a>
			</li>
    	 
			<li>
				<a onclick="clickState(this,4)" href="javascript: void(0);">
					<div class="number">4</div>
					<div class="time-text">
						<span>支持服务评价</span>
					</div>
				</a>
			</li>
    	 
			<li>
				<a onclick="clickState(this,5)" href="javascript: void(0);">
					<div class="number">5</div>
					<div class="time-text">
						<span>支持工作审核确认</span>
					</div>
				</a>
			</li>
    	
	</ul>
</div>
<script>
$(document).ready(function (){
      
    });
    
function clickState(a,index){
	var menu = $("#menu");    
	var curLink = menu.find(".active");
        curLink.removeClass("active");
       	$(a).addClass("active");
 	document.getElementById('item'+index).scrollIntoView();
 	document.documentElement.scrollTop =document.documentElement.scrollTop-60;
}
</script>

							<div id="content">
								<div class="item" id="item1">
									<div class="box box-primary box-solid">
									    <div class="box-header with-border">
									        <h3 class="box-title excutetitle">一、申请人填写（业务）</h3><div class="box-tools pull-right"><button class="btn btn-box-tool msgList" data-widget="collapse"><i class="fa fa-minus"></i> <span class="hidden-xs">收展</span></button></div>
									        <div class="box-tools pull-right hidden-lg hidden-md hidden-sm">
									            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
									        </div>
									    </div>
									    <div class="box-body">
									                                        
									    </div>
								  </div>
								</div>
								<div class="item" id="item2">
									<div class="box box-primary box-solid">
									    <div class="box-header with-border">
									        <h3 class="box-title excutetitle">二、大区受理（大区经理）</h3><div class="box-tools pull-right"><button class="btn btn-box-tool msgList" data-widget="collapse"><i class="fa fa-minus"></i> <span class="hidden-xs">收展</span></button></div>
									        <div class="box-tools pull-right hidden-lg hidden-md hidden-sm">
									            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
									        </div>
									    </div>
									    <div class="box-body">
											
								        </div>
								    </div>
								</div>
								<div class="item" id="item3">
									<div class="box box-primary box-solid">
								        <div class="box-header with-border">
								            <h3 class="box-title excutetitle">三、支持结果（大区技术）</h3><div class="box-tools pull-right"><button class="btn btn-box-tool msgList" data-widget="collapse"><i class="fa fa-minus"></i> <span class="hidden-xs">收展</span></button></div>
								            <div class="box-tools pull-right hidden-lg hidden-md hidden-sm">
								                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
								            </div>
								        </div>
								        <div class="box-body">
								            
								        </div>
								    </div>
								</div>
								<div class="item" id="item4">
									<div class="box box-primary box-solid">
								        <div class="box-header with-border">
								            <h3 class="box-title excutetitle">四、支持服务评价（业务）</h3><div class="box-tools pull-right"><button class="btn btn-box-tool msgList" data-widget="collapse"><i class="fa fa-minus"></i> <span class="hidden-xs">收展</span></button></div>
								            <div class="box-tools pull-right hidden-lg hidden-md hidden-sm">
								                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
								            </div>
								        </div>
								        <div class="box-body">
								                                          
								        </div>
								    </div>
								</div>
								<div class="item" id="item5">
									<div class="box box-primary box-solid">
								        <div class="box-header with-border">
								            <h3 class="box-title excutetitle">五、支持工作审核确认（大区经理）</h3><div class="box-tools pull-right"><button class="btn btn-box-tool msgList" data-widget="collapse"><i class="fa fa-minus"></i> <span class="hidden-xs">收展</span></button></div>
								            <div class="box-tools pull-right hidden-lg hidden-md hidden-sm">
								                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
								            </div>
								        </div>
								        <div class="box-body">
								                                
								        </div>
								    </div>
								</div>
							</div>
		                </div>
		            </div>
		        </section>
			</div>
			<div id="btnFooter" class="btnFooter ">
			<div class="fl hidden-xs">
				<b style="margin-left: 10px;">主办 (第1步：申请人填写)</b>
			</div>
			<div class="fr">
				<div id="chooseNextUser" class="fl">
				    <div class="fr" style="width: 150px; margin-top: 9px; margin-right: 5px;">
						<input type="text" id="regiondoname" name="regiondoname" class="form-control input-sm" placeholder="下一步主办人" readonly="readonly" style="background: rgb(255, 255, 255);">
						<input type="hidden" id="regiondoid" name="regiondoid">
					</div>
				    <div class="fr hidden-xs" style="margin-right: 5px;">
						<b>下一步主办人（<b id="regiondo">大区经理</b>）：</b>
					</div>
				</div>
				<div class="fr">
				    <input type="button" id="chooseNextUserbutton" value="提交" class="btn btn-primary btn-sm" onclick="submit();"> 
					<input type="button" id="chooseReback" value="回退" class="btn btn-danger hidden btn-sm" onclick="myretreat()"> 
					<input type="button" id="chooseEntrust" value="委托" class="btn btn-warning hidden btn-sm" onclick="change()"> 
					<input type="button" value="取消" class="btn btn-default btn-sm" onclick="cancelFlow()">
				</div>
			</div>
		</div>
		</div>
	</body>
</html>