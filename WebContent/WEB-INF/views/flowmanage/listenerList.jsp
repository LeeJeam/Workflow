<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<% 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<c:set var="webRoot" value="<%=basePath%>" />
<!DOCTYPE html >
<html>
<head>
<title>监听列表</title>
<t:base type="jquery,easyui,tools"></t:base>
</head>
<body style="overflow-y: hidden" scroll="no">
	<t:datagrid actionUrl="processController.do?listenerGrid&typeid=${typeid}&status=1" idField="id" pagination="false" name="listenerList" checkbox="true">
		<t:dgCol field="id" hidden="false" title="id"></t:dgCol>
		<t:dgCol field="listenereven" width="40" title="事件类型"></t:dgCol>
		<t:dgCol field="listenertype" width="40" title="监听类型"></t:dgCol>
		<t:dgCol field="listenervalue" width="40" title="值"></t:dgCol>
	</t:datagrid>
</body>
</html>
