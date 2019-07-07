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
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/UILib/quit/sweetalert.min.js"></script>
		<script src="<%=rootPath %>/js/quit.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/demo.js"></script>
		<style>
		.home-icon { margin: 0px; padding: 0px;}
		.home-icon li { list-style: none; margin: 15px 0;}
		.home-icon li a { display: block; width: 84px; height: 84px; text-align: center; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5); border-radius: 10px; margin: 0 auto;}
		.home-icon li a:hover {
			/* transform: rotate(30deg);
			-ms-transform: rotate(30deg);
			-webkit-transform: rotate(30deg); */
			transition: 0.5s;
			-ms-transition: 0.5s;
			-webkit-transition: 0.5s;
			filter:alpha(opacity=80);-moz-opacity:0.8;-khtml-opacity: 0.8;opacity: 0.8;
		}
		.home-icon li a i { font-size: 36px; color: #fff; line-height: 84px;}
		.home-icon li a i:hover { font-size: 48px; transition: 0.5s; -ms-transition: 0.5s; -webkit-transition: 0.5s; }
		.home-icon li p { color: #333; margin: 10px 0; text-align: center; font-size: 14px;}
		.icon-bg1 { background: #f690fe; }
		.icon-bg2 { background: #6cd2c7; }
		.icon-bg3 { background: #edaf64; }
		.icon-bg4 { background: #ec8681; }
		.icon-bg5 { background: #ec719f; }
		.icon-bg6 { background: #d5c65f; }
		.icon-bg7 { background: #77cc88; }
		.icon-bg8 { background: #b492e8; }
		.icon-bg9 { background: #75a7ee; }
		.icon-bg10 { background: #eb8e6c; }
		.icon-bg11 { background: #1f95db; }
		.icon-bg12 { background: #63e4be; }
		</style>
	</head>
	<body class="hold-transition skin-blue layout-top-nav">
		<div class="wrapper">
			<jsp:include page="/common/header.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content container">
					<div class="row">
						<div class="box box-primary">
							<div class="box-header with-border">
								<h3 class="box-title">功能展示--<small>管理系统项目的工具栏菜单</small></h3>
								<div class="box-tools">
			                    	<button class="btn btn-box-tool"><i class="fa fa-gear"></i></button>
								</div>
							</div>
                            <div class="box-body">
                                <ul class="home-icon">
                                	<li class="col-md-2"><a href="#" class="icon-bg1"><i class="fa fa-sitemap"></i></a><p>系統菜单</p></li>
                                	<li class="col-md-2"><a href="#" class="icon-bg2"><i class="fa fa-puzzle-piece"></i></a><p>功能节点</p></li>
                                	<li class="col-md-2"><a href="#" class="icon-bg3"><i class="fa fa-database"></i></a><p>数据结构</p></li>
                                	<li class="col-md-2"><a href="#" class="icon-bg4"><i class="fa fa-align-left"></i></a><p>工作流程</p></li>
                                	<li class="col-md-2"><a href="#" class="icon-bg5"><i class="fa fa-automobile"></i></a><p>对象管理</p></li>
                                	<li class="col-md-2"><a href="#" class="icon-bg6"><i class="fa fa-automobile"></i></a><p>插件管理</p></li>
                                	<li class="col-md-2"><a href="#" class="icon-bg7"><i class="fa fa-map-o"></i></a><p>字典管理</p></li>
                                	<li class="col-md-2"><a href="#" class="icon-bg8"><i class="fa fa-folder-open"></i></a><p>项目发布</p></li>
                                	<li class="col-md-2"><a href="#" class="icon-bg9"><i class="fa fa-user"></i></a><p>个人信息</p></li>
                                	<li class="col-md-2"><a href="#" class="icon-bg10"><i class="fa fa-cog"></i></a><p>项目设置</p></li>
                                	<li class="col-md-2"><a href="#" class="icon-bg11"><i class="fa fa-user-plus"></i></a><p>用户管理</p></li>
                                </ul>
                            </div>
						</div>
					</div>
				</section>
			</div>
			<jsp:include page="/common/footer.jsp"></jsp:include>
		</div>
	</body>
</html>