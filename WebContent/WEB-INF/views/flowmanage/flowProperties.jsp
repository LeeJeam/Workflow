<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<% 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<c:set var="webRoot" value="<%=basePath%>" />

<script type="text/javascript">
	//流程对象
	var line = workflow.getLine(nodeid);
	
	//属性表格定义
	rows = [

	{
		"name" : "节点",
		"group" : "任务属性",
		"value" : line.lineId,
		"field" : "taskId"
	}, {
		"name" : "名称",
		"group" : "任务属性",
		"value" : line.lineName,
		"field" : "taskName",
		"editor" : "text"
	}, {
		"name" : "表达式",
		"group" : "任务属性",
		"value" : line.condition,
		"field" : "documentation",
		"editor" : "text"
	}
	];
	//保存属性
	function saveFlowProperties() {
		line.lineId =rows[0].value;
		line.lineName=rows[1].value;
		line.condition =  rows[2].value;
	}
	//加载属性表格数据
	function flowpropertygrid() {
	    rows[0].value = line.lineId;
		rows[1].value = line.lineName;
		rows[2].value = line.condition;
	}
	$("input").blur(function(){
		saveFlowProperties(true);
	 });
	$(function() {

	//加载属性表格数据
	function propertygrid() {
		$('#flow-propertygrid').propertygrid('loadData', rows);
	}
	//创建属性表格
	$('#flow-propertygrid').propertygrid({
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
			saveFlowProperties();//自动保存
		}
	});
	propertygrid();
	
	});
</script>
<div id="flow-properties-layout" class="easyui-layout" fit="true">
	<div id="flow-properties-panel" region="center" border="true">
		<div id="flow-properties-accordion" class="easyui-accordion" fit="true" border="false">
			<div id="flow" style="padding: 1px;" title="流程属性面板" class="properties-menu">
			<table id="flow-propertygrid"></table>
			</div>
			<div id="listeners" title="执行监听器" style="overflow: hidden; padding: 1px;">
				<div id="listenerListtb" style="padding: 3px; height: 25px">
					<div style="float: left;">
						<div class="form">
							执行类型:<select id="ExecuteType" style="width: 53%; padding: 1px" onchange="onExecuteTypeChange();">
											<option value="">--请选择类型--</option>
											<option value="create">进入节点时 </option>
											<option value="complete">离开节点时 </option>
											<option value="all"> 全部</option>
											<option value="assignment">执行人 </option>
											</option>
							</select><br><br>
							关联类名:<select id="ClassName" style="width: 53%; padding: 1px" onchange="onClassNameChange();">
											<option value="0">--请选择类--</option>
												<c:forEach items="${listenerList}" var="form" varStatus="s">
												<option value="${form.classurl }"> ${form.classname}</option>
								               </c:forEach>
							</select><br><br>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</div>
<script type="text/javascript">
	//保存监听
	function saveFlowListener() {
		var listenerid = $('#listenerid').val();
		$.ajax({
			url : "processController.do?saveProcessListener",
			type : 'POST',
			data : {
				type : 1,
				processNode : '${id}',
				processkey : '${processId}',
				listenerid : listenerid
			},
			dataType : 'json',
			success : function(data) {
				if (data.success) {
					$('#flowlistenerList').datagrid('reload');
				}
			}
		});

	}
	function setFlowListener(index) {
		var row = $('#flowlistenerList').datagrid('getRows')[index];
				$.ajax({
					url : "processController.do?setProcessListener",
					type : 'POST',
					data : {
						id : row.id
					},
					dataType : 'json',
					success : function(data) {
						if (data.success) {

							var listener = new draw2d.DecoratedConnection.Listener();
							listener.id = row.id;
							listener.serviceType = row.TPListerer_listenertype;
							if (row.TPListerer_listenertype == "javaClass") {
								listener.serviceClass = row.TPListerer_listenervalue;
							} else {
								listener.serviceExpression = row.TPListerer_listenervalue;
							}

							line.listeners.add(listener);
						} else {
							line.deleteListener(row.id);
						}
						reloadflowlistenerList();
					}
				});

	}
</script>

