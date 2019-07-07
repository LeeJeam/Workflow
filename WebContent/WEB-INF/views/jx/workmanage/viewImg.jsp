<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.util.*"%>
<%@ page isELIgnored="false"%>
<%
	String rootPath = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>流程状态</title>
</head>
<body>
	<div align="center">
		<img src="<%=rootPath %>/activitiController.htm?getActivitiProccessImage&pProcessInstanceId=${param.processInstanceId}"/>
	</div>
</body>
</html>