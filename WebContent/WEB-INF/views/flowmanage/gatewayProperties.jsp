<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript">
	var gateway = workflow.getFigure(nodeid);
	//属性表格定义
	rows = [ {
		"name" : "ID",
		"group" : "网关属性",
		"value" : gateway.gatewayId,
		"field" : "gatewayId"
	}, {
		"name" : "名称",
		"group" : "网关属性",
		"value" : gateway.gatewayName,
		"field" : "gatewayName",
		"editor":{
			"type":"validatebox",
			"options":{
				  "required": true
			}
		}
	} ];
	//保存属性
	function saveGatewayProperties() {
		gateway.gatewayId = rows[0].value;
		gateway.gatewayName = rows[1].value;
	}
	//构建属性表格数据
	function populateGatewayProperites() {
		rows[0].value = gateway.gatewayId;
		rows[1].value = gateway.gatewayName;
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
