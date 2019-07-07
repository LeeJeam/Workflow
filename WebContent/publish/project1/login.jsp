<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	//清除session
	request.getSession().invalidate();
%>
<!DOCTYPE html>
<html>
	<head>
		<title>登录</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/login.css">
		<script src="<%=rootPath %>/publish/project1/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
	    <script src="<%=rootPath %>/publish/project1/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath%>/js/datadetail.js"></script>
		<script>
		$(window).keydown(function (event) {
			if(event.keyCode == 13) {
				loginIn();
			}
		});
		function loginIn() {
				var username = $("#username").val();
				var password = $("#password").val();
				if(!username) {
					alert('请输入用户名!');
					return;
				}
				if(!password) {
					alert('请输入密码!');
					return;
				}
				var c_url=basePath+ "/login/loginInAfterDeploy.htm";
				
				$.getAjaxData(c_url,{username:username,password:password}, function (data) {
					if(data.success) {
						var url='<%=rootPath %>/home/index.htm';
						if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
						{
							url += "?allowedFlag=true&c_port=8088&u_name="+data.u_name+"&s_id="+data.s_id;
						}
						window.location.href =  url;
						
					} else {
						alert('用户名和密码错误!');
						return;
					}
				})
			};
    </script>
	</head>
	<body>
		<div id="text1" class="login_box">
			<h4 class="text-center" style="font-family: 微软雅黑; color: #fff; margin-bottom: 20px; font-size: 30px;";>绩效OL</h4>
			<div style="background: rgba(255,255,255,0.8); border: 1px solid #dedede; padding: 30px 40px 50px; border-radius: 5px;">
				<h4 class="text-center" style="font-family: 微软雅黑; color: #888; font-size: 16px; margin-bottom: 20px;";>用户登录</h4>
				<div class="form-group has-feedback">
					<input id="username" name="username" class="form-control" placeholder="用户名">
					<span class="fa fa-user form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
					<input type="password" id="password" name="password" class="form-control" placeholder="密码">
					<span class="glyphicon glyphicon-lock form-control-feedback"></span>
				</div>
				<div class="row">
					<div class="col-xs-4">
						<button onclick="loginIn()" class="btn btn-primary btn-block btn-flat" style="font-weight: 600;">登录</button>
					</div>
				</div>
			</div>
		</div>
	</body>
	<jsp:include page="/publish/project1/public/commBaseVariable.jsp"></jsp:include>
</html>
