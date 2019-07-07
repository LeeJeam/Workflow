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
	}];
	//保存属性
	function saveGatewayProperties() {
		task.taskId = rows[0].value;
		task.taskName = rows[1].value;
	}
	//构建属性表格数据
	function populateGatewayProperites() {
		rows[0].value  = task.taskId;
		rows[1].value  = task.taskName;
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