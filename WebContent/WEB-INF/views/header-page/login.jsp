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
		<link rel="stylesheet" href="<%=rootPath %>/css/login.css">
	</head>
	<body>
		<h1 style="color: #fff; text-align: center; padding-top: 20px; font-size: 36px; font-family: 微软雅黑; letter-spacing: 3px; text-shadow: #999 0 2px 0;">项目自定义生成器</h1>
		<div class="contern-main">
			<form action="#">
				<div class="login-photo"><img src="<%=rootPath %>/img/user1.png" /></div>
				<h3 class="login-title">用户登录</h3>
				<div class="form-group">
					<input type="text" id="" value="" name="" class="input1" autofocus="" />
					<input type="password" id="" value="" name="" class="input2" />
					<button type="submit" class="input3">登录</button>
				</div>
			</form>
		</div>
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
	</body>
</html>