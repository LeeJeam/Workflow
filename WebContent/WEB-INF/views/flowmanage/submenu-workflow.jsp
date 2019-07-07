<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String rootPath = request.getContextPath();
 	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
 	String processid =	request.getParameter("processid");
%>
<!DOCTYPE html>
<html>
<head>
<title>流程设计器</title>
<script type="text/javascript" src="<%=rootPath%>/UILib/plugins/plug-in/designer/easyui/jquery-1.7.2.min.js"></script>
<link id="easyuiTheme" rel="stylesheet" href="<%=rootPath%>/UILib/plugins/plug-in/designer/easyui/easyui.css" type="text/css"></link>
<link rel="stylesheet" href="<%=rootPath%>/UILib/plugins/plug-in/designer/easyui/icon.css" type="text/css"></link>
<script type="text/javascript" src="<%=rootPath%>/UILib/plugins/plug-in/designer/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=rootPath%>/UILib/plugins/plug-in/designer/easyui/locale/easyui-lang-zh_CN.js"></script>
<link href="<%=rootPath%>/UILib/plugins/plug-in/designer/designer.css" type="text/css" rel="stylesheet" />
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/draw2d/wz_jsgraphics.js"></script>
<script src='<%=rootPath%>/UILib/plugins/plug-in/designer/draw2d/mootools.js'></script>
<script src='<%=rootPath%>/UILib/plugins/plug-in/designer/draw2d/moocanvas.js'></script>
<script src='<%=rootPath%>/UILib/plugins/plug-in/designer/draw2d/draw2d.js'></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/MyCanvas.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/ResizeImage.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/event/Start.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/event/End.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/connection/MyInputPort.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/connection/MyOutputPort.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/connection/DecoratedConnection.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/task/Task.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/task/UserTask.js"></script>
<!-- 手动任务 -->
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/task/ManualTask.js"></script>
<!-- 服务任务 -->
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/task/ServiceTask.js"></script>
<!-- 分支 -->
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/gateway/ExclusiveGateway.js"></script>
<!-- 同步 -->
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/gateway/ParallelGateway.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/boundaryevent/TimerBoundary.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/boundaryevent/ErrorBoundary.js"></script>  
<!-- 调用活动-->
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/subprocess/CallActivity.js"></script>
<!-- 脚本任务 -->
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/task/ScriptTask.js"></script>
<!-- 邮件任务 -->
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/task/MailTask.js"></script>
<!-- 接收任务 -->
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/task/ReceiveTask.js"></script>
<!-- 业务任务 -->
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/task/BusinessRuleTask.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/designer.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/mydesigner.js"></script>
<link rel="stylesheet" href="<%=rootPath%>/UILib/plugins/plug-in/tools/css/common.css" type="text/css"></link>
<!-- 弹出框 -->
<script type="text/javascript" src="<%=rootPath%>/UILib/plugins/plug-in/lhgDialog/lhgdialog.min.js"></script>
<!-- 依赖弹出框,tip方法 -->
<script type="text/javascript" src="<%=rootPath%>/UILib/plugins/plug-in/tools/curdtools.js"></script>
<script type="text/javascript" src="<%=rootPath%>/UILib/plugins/plug-in/designer/easyui/validatebox-extend.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/common.js"></script>
<script type="text/javascript">
$(function() {
	//项目主键,发布后没有此值
	session_project_id="${sessionScope.projectId}";
	try {
		_task_obj = $('#task');
		_task_context_menu = $('#task-context-menu').menu({});
		$('.easyui-linkbutton').draggable({
					proxy : function(source) {
						var n = $('<div class="draggable-model-proxy"></div>');
						n.html($(source).html()).appendTo('body');
						return n;
					},
					deltaX : 0,
					deltaY : 0,
					revert : true,
					cursor : 'auto',
					onStartDrag : function() {
						$(this).draggable('options').cursor = 'not-allowed';
					},
					onStopDrag : function() {
						$(this).draggable('options').cursor = 'auto';
					}
				});
		$('#paintarea').droppable({
			accept : '.easyui-linkbutton',
			onDragEnter : function(e, source) {
				$(source).draggable('options').cursor = 'auto';
			},
			onDragLeave : function(e, source) {
				$(source).draggable('options').cursor = 'not-allowed';
			},
			onDrop : function(e, source) {
				$(this).removeClass('over');
				var wfModel = $(source).attr('wfModel');

				var shape = $(source).attr('shape');
				if (wfModel) {
					var x = $(source).draggable('proxy').offset().left;
					var y = $(source).draggable('proxy').offset().top;
					var xOffset = workflow.getAbsoluteX();
					var yOffset = workflow.getAbsoluteY();
					var scrollLeft = workflow.getScrollLeft();
					var scrollTop = workflow.getScrollTop();
					addModel(wfModel, x - xOffset + scrollLeft, y- yOffset + scrollTop, shape);
				}
			}
		});
		// $('#paintarea').bind('contextmenu',function(e){
		// alert(e.target.tagName);
		// });

	} catch (e) {

	}
});
//-->
</script>
</head>
<body id="designer" class="easyui-layout">
    <c:if test="${!empty sessionScope.projectId}">
	<div region="west" split="true" iconCls="palette-icon" title="流程元素" style="width: 110px;">
		<div class="easyui-accordion" fit="true" border="false">
			<div id="event" title="事件" iconCls="palette-menu-icon" class="palette-menu">
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="start-event-icon" wfModel="Start">开始</a> <br> 
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="end-event-icon" wfModel="End">结束</a> <br>
			</div>
			<div id="task" title="任务" iconCls="palette-menu-icon" selected="true" class="palette-menu">
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="user-task-icon" wfModel="UserTask">用户任务</a> <br> 
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="manual-task-icon" wfModel="ManualTask">手动任务</a> <br> 
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="service-task-icon" wfModel="ServiceTask">服务任务</a> <br> 
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="script-task-icon" wfModel="ScriptTask">脚本任务</a> <br> 
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="mail-task-icon" wfModel="MailTask">邮件任务</a> <br> 
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="receive-task-icon" wfModel="ReceiveTask">接收任务</a> <br> 
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="business-rule-task-icon" wfModel="BusinessRuleTask">业务规则</a> <br> 
				<!-- <a href="#" class="easyui-linkbutton" plain="true" iconCls="subprocess-icon">子流程</a> <br>  -->
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="callactivity-icon" wfModel="CallActivity">调用活动</a> <br>
			</div>
			<div id="gateway" title="网关" iconCls="palette-menu-icon" class="palette-menu">
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="parallel-gateway-icon" wfModel="ParallelGateway">并行网关</a> <br>
			    <a href="#" class="easyui-linkbutton" plain="true" iconCls="exclusive-gateway-icon" wfModel="ExclusiveGateway">排他网关</a> <br>
			</div>
		
			<div id="boundary-event" title="边界事件" iconCls="palette-menu-icon" class="palette-menu">
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="timer-boundary-event-icon" wfModel="TimerBoundary">时间边界</a> <br> 
				<a href="#" class="easyui-linkbutton" plain="true" iconCls="error-boundary-event-icon" wfModel="ErrorBoundary">错误边界</a> <br>
			</div>
			
		</div>
	</div>
	</c:if>
	<div id="process-panel" region="center" style="padding: 1px" split="true" iconCls="process-icon" title="流程">
		<div id="process-definition-tab" border="false">
			<div id="designer-area" title="设计" style="POSITION: absolute; width: 100%; height: 100%; padding: 0; border: none; overflow: auto;">
				<div id="paintarea" style="POSITION: absolute; WIDTH: 2000px; HEIGHT: 2000px"></div>
			</div>
			<div id="xml-area" title="源码" style="width: 100%; height: 100%; overflow: hidden; overflow-x: hidden; overflow-y: hidden;">
				<textarea id="descriptorarea" rows="38" style="width: 100%; height: 100%; padding: 0; border: none; font-size: 12px" readonly="readonly"></textarea>
			</div>
		</div>
	</div>
	<!-- toolbar -->
	<!-- update-begin--Author:chenxu  Date:20130408 for：修改流程时，流程类型不能显示 -->
	<div id="toolbar-panel" region="north" border="false" style="background: #d8e4fe;" >
		<input type="hidden" name="processId" id="processId" value="0"> 
		<a href="<%=rootPath %>/header/forward.htm?flag=processList"><img width="20" height="18" title="返回上一页" src="<%=rootPath%>/UILib/plugins/plug-in/designer/img/home.png" class="buttonStyle" /></a>
		<img width="20" height="18" title="保存流程" src="<%=rootPath%>/UILib/plugins/plug-in/designer/img/save.png" onclick="saveProcessDef();" class="buttonStyle" />
		<c:if test="${!empty sessionScope.projectId}">
		<img width="20" height="18" title="上一步" src="<%=rootPath%>/UILib/plugins/plug-in/designer/img/back.png" onclick="undo()" class="buttonStyle" />
		<img width="20" height="18" title="下一步" src="<%=rootPath%>/UILib/plugins/plug-in/designer/img/next.png" onclick="redo()" class="buttonStyle" /> 
		<img width="20" height="18" title="导出" src="<%=rootPath%>/UILib/plugins/plug-in/designer/img/printer.png" onclick="exportProcessDef(this)" class="buttonStyle" />
		</c:if>
	</div>
	<div region="east" id="properties-panel" href="<%=rootPath %>/processController/processProperties.htm?turn=processProperties&processId=<%=processid%>" split="true" iconCls="properties-icon" title="流程属性" style="padding: 1px; width: 280px;"></div>
	<!-- update-end--Author:chenxu  Date:20130408 for：修改流程时，流程类型不能显示 -->
	<!-- task context menu -->
	<div id="task-context-menu" class="easyui-menu" style="width: 120px;">
		<div id="properties-task-context-menu" iconCls="properties-icon">属性</div>
		<div id="delete-task-context-menu" iconCls="icon-remove">删除</div>
	</div>
	<!-- form configuration window -->
	<div id="form-win" title="表单配置" style="width: 720px; height: 300px;"></div>
	<!-- form configuration window -->
	<div id="variable-win" title="变量配置" style="width: 720px; height: 300px;"></div>
	<!-- listener configuration window -->
	<div id="listener-win" title="监听配置" style="width: 720px; height: 300px;"></div>
	<!-- candidate configuration window -->
	<div id="task-candidate-win" title="任务配置" style="width: 720px; height: 300px;"></div>
	<script type="text/javascript">
		$('#process-definition-tab').tabs({
			fit : true,
			onSelect : function(title) {
				if (title == '设计') {
				} else if (title == '源码') {
					$('#descriptorarea').val(workflow.toXML());
				}
			}
		});
		createCanvas('<%=processid%>', false);
		var userInteface="${userInteface}";
		var groupInteface="${groupInteface}";
		var deptInteface="${deptInteface}";
	</script>
</body>
</html>