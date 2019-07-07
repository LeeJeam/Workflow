<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript">
	var tid = '${id}';
	var task = workflow.getFigure(tid);
	//属性表格定义
	rows = [ {
		"name" : "ID",
		"group" : "节点属性",
		"value" : task.id,
		"field" : "taskId"
	}, {
		"name" : "事件类型",
		"group" : "节点属性",
		"value" : task.timeType,
		"field" : "timeType",
		"editor" : {"type":"combobox","options":{required:true,editable:false,
			"data":[{"text":"timeDate","value":"timeDate"},
			        {"text":"timeDuration","value":"timeDuration"},
			        {"text":"timeCycle","value":"timeCycle"}]}}
	}, {
		"name" : "expression",
		"group" : "节点属性",
		"value" : task.expression,
		"field" : "expression",
		"editor":{
			"type":"validatebox",
			"options":{
				  "required": true
			}
		}
	}, {
		"name" : "依附到",
		"group" : "节点属性",
		"value" : task.attached,
		"field" : "attached",
		"editor":{
			"type":"validatebox",
			"options":{
				  "required": true
			}
		}
	}];
	//保存属性
	function saveGatewayProperties() {
		task.taskId = rows[0].value;
		task.timeType = rows[1].value;
		task.expression = rows[2].value;
		task.attached = rows[3].value;
	}
	//构建属性表格数据
	function populateGatewayProperites() {
		rows[0].value  = task.taskId;
		rows[2].value  = task.timeType;
		rows[2].value  = task.expression;
		rows[3].value  = task.attached;
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