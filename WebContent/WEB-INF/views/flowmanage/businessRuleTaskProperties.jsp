<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<script type="text/javascript">
    var nodeid = '${id}';
	var eventFigure = workflow.getFigure(nodeid);
	//属性表格定义
	rows = [ {
		"name" : "ID",
		"group" : "节点属性",
		"value" : eventFigure.taskId,
		"field" : "taskId",
		"editor" : "text"
	}, {
		"name" : "输入变量",
		"group" : "节点属性",
		"value" : eventFigure.rulesInput,
		"field" : "rulesInput",
		"editor" : "text"
	}, {
		"name" : "输出变量",
		"group" : "节点属性",
		"value" : eventFigure.rulesOutputs,
		"field" : "rulesOutputs",
		"editor" : "text"
	}, {
		"name" : "选择规则",
		"group" : "节点属性",
		"value" : eventFigure.isclude,
		"field" : "isclude",
		"editor" : "text"
	}, {
		"name" : "规则",
		"group" : "节点属性",
		"value" : eventFigure.rules,
		"field" : "rules",
		"editor" : "text"
	} ];
	//保存属性
	function saveGatewayProperties() {
		eventFigure.taskId = rows[0].value;
		eventFigure.rulesInput = rows[1].value;
		eventFigure.rulesOutputs = rows[2].value;
		eventFigure.isclude = rows[3].value;
		eventFigure.rules = rows[4].value;
	}
	//构建属性表格数据
	function populateGatewayProperites() {
		rows[0].value = eventFigure.taskId;
		rows[1].value = eventFigure.rulesInput;
		rows[2].value = eventFigure.rulesOutputs;
		rows[3].value = eventFigure.isclude;
		rows[4].value = eventFigure.rules;
		gatewaypropertygrid();
	}
	//加载属性表格数据
	function gatewaypropertygrid() {
		$('#gateway-properties').propertygrid('loadData', rows);
	}
	$(function() {
		//创建属性表格
		$('#gateway-properties').propertygrid({
			width : 'auto',
			height : 'auto',
			showGroup : true,
			scrollbarSize : 0,
			border : 0,
			columns : [ [ {
				field : 'name',
				title : '属性名',
				width : 30,
				resizable : false
			}, {
				field : 'value',
				title : '属性值',
				width : 100,
				resizable : false
			}

			] ],
			onAfterEdit : function() {
				saveGatewayProperties();//自动保存
			}
		});
		gatewaypropertygrid();
	});
</script>
<div id="gateway-properties-layout" class="easyui-layout" fit="true">
	<div id="gateway-properties-panel" region="center" border="true">
		<table id="gateway-properties"></table>
	</div>
</div>
