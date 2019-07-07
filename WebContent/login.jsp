<%@page import="cn.hy.common.utils.PropertiesUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	String flag = PropertiesUtils.init("isPublishFlag");
	//如果是发布后的项目
	if("true".equals(flag)){
		//跳转至发布后主页
		response.sendRedirect(rootPath+"/publish/project1/login.jsp");
		return;
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<title>主页</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/css/login.css">
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath%>/js/datadetail.js"></script>
		<script type="text/javascript" >
			var basePath = "<%=rootPath %>";
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
				$.getAjaxData(basePath + "/login/loginIn.htm",{username:username,password:password}, function (data) {
					if(data.success) {
						window.location.href = basePath + '/header/forward.htm?flag=index';
					} else {
						alert('用户名和密码错误!');
						return;
					}
				})
			}

			$(window).keydown(function (event) {
				if(event.keyCode == 13) {
					loginIn();
				}
			})
		</script>
	</head>
	<body>
		<h1 style="color: #fff; text-align: center; padding-top: 20px; font-size: 36px; font-family: 微软雅黑; letter-spacing: 3px; text-shadow: #999 0 2px 0;"><b>FLOWSys</b>项目流程快速开发框架</h1>
		<div class="contern-main">
			<form action="#">
				<div class="login-photo"><img src="<%=rootPath %>/img/login/userName.png" /></div>
				<h3 class="login-title">用户登录</h3>
				<div class="form-group">
					<input type="text" id="username" name="username" class="input1" autofocus="autofocus" />
					<input type="password" id="password" name="password" class="input2" />
					<button type="button" class="input3" onclick="loginIn()">登 录</button>
				</div>
			</form>
		</div>

	</body>
</html>