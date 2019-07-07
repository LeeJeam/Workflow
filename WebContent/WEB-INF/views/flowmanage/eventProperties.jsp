<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<% 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<c:set var="webRoot" value="<%=basePath%>" />

<script type="text/javascript">
	//update-begin--Author:chenxu  Date:20130327 for：流程设计，开始节点，设置发起人表达式存在浏览器兼容问题，在google和360浏览器下，保存不了
	//将event修改为eventFigure
	var eventFigure = workflow.getFigure(nodeid);
	//属性表格定义
	rows = [ {
		"name" : "ID",
		"group" : "节点属性",
		"value" : eventFigure.eventId,
		"field" : "eventId",
		"editor" : "text"
	}, {
		"name" : "名称",
		"group" : "节点属性",
		"value" : eventFigure.eventName,
		"field" : "eventName",
		"editor" : "text"
	}, {
		"name" : "表达式",
		"group" : "发起人",
		"value" : eventFigure.expression,
		"field" : "expression",
		"editor" : "text"
	} ];
	//如果是发布后的流程,只能编辑
	if(session_project_id==""){
		for(var i=0;i<rows.length;i++){
			delete  rows[i].editor;
		}
	}
	//保存属性
	function saveGatewayProperties() {
		eventFigure.eventId = rows[0].value;
		eventFigure.eventName = rows[1].value;
		eventFigure.expression = rows[2].value;
	}
	//构建属性表格数据
	function populateGatewayProperites() {
		rows[0].value = eventFigure.eventId;
		rows[1].value = eventFigure.eventName;
		rows[2].value = eventFigure.expression;
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
