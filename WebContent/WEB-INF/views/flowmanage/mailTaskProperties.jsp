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
		"name" : "接收者",
		"group" : "节点属性",
		"value" : task.toEmail,
		"field" : "toEmail",
		"editor" : "text"
	}, {
		"name" : "发送者",
		"group" : "节点属性",
		"value" : task.fromEmail,
		"field" : "fromEmail",
		"editor" : "text"
	}, {
		"name" : "主题",
		"group" : "节点属性",
		"value" : task.subjectEmail,
		"field" : "subjectEmail",
		"editor" : "text"
	}, {
		"name" : "抄送",
		"group" : "节点属性",
		"value" : task.ccEmail,
		"field" : "ccEmail",
		"editor" : "text"
	}, {
		"name" : "密送",
		"group" : "节点属性",
		"value" : task.bccEmail,
		"field" : "bccEmail",
		"editor" : "text"
	}, {
		"name" : "字符集",
		"group" : "节点属性",
		"value" : task.charsetEmail,
		"field" : "charsetEmail",
		"editor" : "text"
	}, {
		"name" : "html",
		"group" : "节点属性",
		"value" : task.htmlEmail,
		"field" : "htmlEmail",
		"editor" : "textarea"
	}, {
		"name" : "文本",
		"group" : "节点属性",
		"value" : task.textEmail,
		"field" : "textEmail",
		"editor" : "textarea"
	} ];
	//保存属性
	function saveGatewayProperties() {
		task.taskId = rows[0].value;
		task.toEmail = rows[1].value;
		task.fromEmail = rows[2].value;
		task.subjectEmail = rows[3].value;
		task.ccEmail = rows[4].value;
		task.bccEmail = rows[5].value;
		task.charsetEmail = rows[6].value;
		task.htmlEmail = rows[7].value;
		task.textEmail = rows[8].value;
	}
	//构建属性表格数据
	function populateGatewayProperites() {
		rows[0].value=task.taskId;
		rows[1].value=task.toEmail;
		rows[2].value=task.fromEmail;
		rows[3].value=task.subjectEmail;
		rows[4].value=task.ccEmail;
		rows[5].value=task.bccEmail;
		rows[6].value=task.charsetEmail;
		rows[7].value=task.htmlEmail;
		rows[8].value=task.textEmail;
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