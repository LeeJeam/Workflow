<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/common/taglib.jsp" %>
<%
	String rootPath = request.getContextPath();
%>
<html>
<head>
	<title>首页</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

	<c:set value="<%=rootPath %>" var="rootPath"></c:set>
	<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/font-awesome4/css/font-awesome.min.css">
	<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/AdminLTE.css">
	<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/skins/_all-skins.min.css">
	<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.css">

	<script src="<%=rootPath %>/publish/project1/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
	<script src="<%=rootPath %>/publish/project1/UILib/bootstrap/js/bootstrap.min.js"></script>
	<script src="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.min.js"></script>
	<script src="<%=rootPath %>/js/quit.js"></script>
	<script src="<%=rootPath %>/publish/project1/UILib/dist/js/app.min.js"></script>
	<script src="<%=rootPath %>/publish/project1/UILib/dist/js/demo.js"></script>
	


    <script type="text/javascript">
        
    </script>
</head>

<body class="hold-transition skin-blue fixed sidebar-mini" id="chat-box">
<div class="wrapper">
	<header class="main-header">
		<a href="#" class="logo"><span class="logo-lg">流程2</a>
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
			<ul class="sidebar-menu"></ul>
		</section>
	</aside>

	<div class="content-wrapper">
		<section class="content-header">
			<ol class="breadcrumb">
				<li><a href="<%=rootPath%>/home/index.htm"><i class="fa fa-home"></i> 首页</a></li>
			</ol>
		</section>
		<section class="content">
			<div id="rowContent" class="row">
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

	<footer class="main-footer text-center">
		Copyright @ 2017 All right reserved 棒谷网络科技有限公司
	</footer>
	<jsp:include page="/publish/project1/public/commBaseVariable.jsp"></jsp:include>
</div>
</body>
</html>
