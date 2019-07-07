<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<style type="text/css">
 .layout-panel {position: absolute;overflow: scroll;}
.panel-header, .panel-body {border-color: #fff;}
</style>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/draw2d/wz_jsgraphics.js"></script>
<script src='<%=rootPath%>/UILib/plugins/plug-in/designer/draw2d/mootools.js'></script>
<script src='<%=rootPath%>/UILib/plugins/plug-in/designer/draw2d/moocanvas.js'></script>
<script src='<%=rootPath%>/UILib/plugins/plug-in/designer/draw2d/draw2d.js'></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/MyCanvas.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/boundaryevent/TimerBoundary.js"></script>
<script src="<%=rootPath%>/UILib/plugins/plug-in/designer/boundaryevent/ErrorBoundary.js"></script>  
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
<script type="text/javascript" src="<%=rootPath%>/js/common.js"></script>
</head>
<body id="designer" class="easyui-layout">
	<div id="process-panel" region="center" style="padding: 1px" split="true" iconCls="process-icon" title="流程">
		<div id="process-definition-tab" border="true">
			<div id="designer-area"  title="设计" style="POSITION: absolute;  padding: 0; border: none;">
				<div id="paintarea" style="POSITION: absolute; WIDTH: 0px; HEIGHT: 0px"></div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		createCanvas('<%=processid%>', false);
	</script>
</body>
</html>

