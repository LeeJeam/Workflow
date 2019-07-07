<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript">
	var tid = '${id}';
	var task = workflow.getFigure(tid);
	//属性表格定义
	rows = [ {
		"name" : "ID",
		"group" : "节点属性",
		"value" : task.taskId,
		"field" : "taskId"
	}, {
		"name" : "标签",
		"group" : "节点属性",
		"value" : task.taskName,
		"field" : "taskName",
		"editor" : "text"
	}, {
		"name" : "描述",
		"group" : "节点属性",
		"value" : task.documentation,
		"field" : "documentation",
		"editor" : "textarea"
	}, {
		"name" : "脚本格式",
		"group" : "节点属性",
		"value" : task.scriptFormat,
		"field" : "scriptFormat",
		"editor" : "text"
	}, {
		"name" : "返回变量",
		"group" : "节点属性",
		"value" : task.resultVariable,
		"field" : "resultVariable",
		"editor" : "text"
	}, {
		"name" : "脚本",
		"group" : "节点属性",
		"value" : task.expression,
		"field" : "expression",
		"editor" : "textarea"
	} ];
	//保存属性
	function saveGatewayProperties() {
		task.taskId = rows[0].value;
		task.taskName = rows[1].value;
		task.expression = rows[2].value;
		task.documentation = rows[3].value;
		task.scriptFormat = rows[4].value;
		task.resultVariable = rows[5].value;
	}
	//构建属性表格数据
	function populateGatewayProperites() {
		rows[0].value=task.taskId;
		rows[1].value=task.taskName;
		rows[2].value=task.expression;
		rows[3].value=task.documentation;
		rows[4].value=task.scriptFormat;
		rows[5].value=task.resultVariable;
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