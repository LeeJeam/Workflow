<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<% 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<c:set var="webRoot" value="<%=basePath%>" />

<!DOCTYPE html>
<html>
<head>
<title>添加流程变量</title>
<t:base type="jquery,easyui,tools"></t:base>
<script type="text/javascript">
	var processNodeId = '${id}';
	var processId = '${processId}';
	function xuanze() {
		var ids = getlistenerListSelections("listenerid") + "";
		var events = getlistenerListSelections("listenereven") + "";
		var types = getlistenerListSelections("listenertype") + "";
		var values = getlistenerListSelections("listenervalue") + "";
		var len = (ids.split(",")).length;
		var eventstmp = events.split(",");
		var typestmp = types.split(",");
		var valuestmp = values.split(",");
		for (var i = 0; i < len; i++) {
			var listener = new draw2d.Task.Listener();
			listener.event = eventstmp[i];
			listener.serviceType = typestmp[i];
			if (typestmp[i] == 'javaClass') {
				listener.serviceClass = valuestmp[i];
			} else if (typestmp[i] == 'expression') {
				listener.serviceExpression = valuestmp[i];
			}
			task.listeners.add(listener);
		}
		loadTaskListeners();
		_listener_win.window('close');
	}
</script>
</head>
<body style="overflow-y: hidden" scroll="no">
	<t:formvalid layout="div" dialog="false" action="userController.do?save" formid="formobj">
		<fieldset class="step">
			<legend> 基本信息 </legend>
			<div class="form">
				<label class="form"> 监听 </label> 
				<input name="listenerid" type="hidden" value="${listenerid}" id="listenerid">
			    <input name="listenereven" value="${listenereven }" id="listenereven" readonly="readonly" />
				<t:choose url="processController.do?chooseListener" hiddenName="listenerid" hiddenid="id" name="listenerList" icon="icon-choose" title="监听列表" textname="listenereven"></t:choose>
			</div>
		</fieldset>
	</t:formvalid>
	<!--  
	<t:datagrid actionUrl="processController.do?getlisteners" idField="listenerid" pagination="false" name="listenerList" checkbox="true">
	<t:dgCol field="listenerid" hidden="false" title="listenerid"></t:dgCol>
	<t:dgCol field="listenereven" width="40" title="事件类型"></t:dgCol>
	<t:dgCol field="listenertype" width="40" title="监听类型"></t:dgCol>
	<t:dgCol field="listenervalue" width="40" title="值"></t:dgCol>
	</t:datagrid>
	-->
</body>
</html>

