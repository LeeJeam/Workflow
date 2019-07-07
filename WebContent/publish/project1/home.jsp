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
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/public.css">
	</head>
	<body class="hold-transition skin-blue fixed sidebar-mini" id="chat-box">
		<div class="wrapper">
			<jsp:include page="public/header.jsp"></jsp:include>
			<jsp:include page="public/sidebar.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content-header">
					<ol class="breadcrumb">
						<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
						<li class="active">功能列表</li>
					</ol>
				</section>
				<section class="content">
					<div class="row">
						<div class="col-md-12">
							<div class="box box-primary">
								<div class="box-header with-border">
									<h3 class="box-title">功能列表</h3>
								</div>
								<div class="box-body">
									<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<jsp:include page="public/footer.jsp"></jsp:include>
		</div>
		<script src="<%=rootPath %>/publish/project1/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/js/quit.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/demo.js"></script>
	</body>
</html>