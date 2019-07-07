<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<script type="text/javascript">
	var subProcess = workflow.getFigure(nodeid);
	//属性表格定义
	rows = [ {
		"name" : "ID",
		"group" : "调用活动",
		"value" : subProcess.subProcessId,
		"field" : "subProcessId",
		"editor" : "text"
	}, {
		"name" : "名称",
		"group" : "调用活动",
		"value" : subProcess.name,
		"field" : "name",
		"editor" : "text"
	}, {
		"name" : "名称",
		"group" : "调用子流程",
		"value" : subProcess.callSubProcess,
		"field" : "callSubProcess",
		"editor" : "text"
	}, {
		"name" : "源变量",
		"group" : "传入变量",
		"value" : subProcess.insource,
		"field" : "insource",
		"editor" : "text"
	}, {
		"name" : "目标变量",
		"group" : "传入变量",
		"value" : subProcess.intarget,
		"field" : "intarget",
		"editor" : "text"
	}, {
		"name" : "源变量",
		"group" : "传出变量",
		"value" : subProcess.outsource,
		"field" : "outsource",
		"editor" : "text"
	}, {
		"name" : "目标变量",
		"group" : "传出变量",
		"value" : subProcess.outtarget,
		"field" : "outtarget",
		"editor" : "text"
	} ];
	//保存属性
	function saveSubProProperties() {
		subProcess.subProcessId = rows[0].value;

		subProcess.name = rows[1].value;
		subProcess.callSubProcess = rows[2].value;
		subProcess.insource = rows[3].value;
		subProcess.intarget = rows[4].value;
		subProcess.outsource = rows[5].value;
	}
	//构建属性表格数据
	function populateSubProProperites() {
		rows[0].value = subProcess.subProcessId;
		rows[1].value = subProcess.name;
		rows[2].value = subProcess.callSubProcess;
		rows[3].value = subProcess.insource;
		rows[4].value = subProcess.intarget;
		rows[5].value = subProcess.outsource;
		rows[6].value = subProcess.outtarget;
		subPropropertygrid();
	}
	//加载属性表格数据
	function subPropropertygrid() {
		$('#subpro-properties').propertygrid('loadData', rows);
	}
	$(function() {
		//创建属性表格
		$('#subpro-properties').propertygrid({
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
			} ] ],
			onAfterEdit : function() {

				saveSubProProperties();//自动保存
			}
		});
		subPropropertygrid();
	});
</script>
<div id="subpro-properties-layout" class="easyui-layout" fit="true">
	<div id="subpro-properties-panel" region="center" border="true">
		<table id="subpro-properties"></table>
	</div>
</div>
