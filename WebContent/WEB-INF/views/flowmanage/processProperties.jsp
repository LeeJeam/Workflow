<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/common/taglib.jsp"%>
<script type="text/javascript">
	var formdata=${formList};
	//流程对象
	var process = workflow.process;
	//属性表格定义
	rows = [ {
		"name" : "标识",
		"group" : "流程",
		"value" : process.id,
		"field" : "id"
	}, {
		"name" : "名称",
		"group" : "流程",
		"value" : process.name,
		"field" : "name",
		"editor":{
			"type":"validatebox",
			"options":{
				  "required": true
			}
		}
	}, {
		"name" : "命名空间",
		"group" : "流程",
		"value" : process.category,
		"field" : "category",
		"editor" : "text"
	},{
		"name" : "启动表单",
		"group" : "流程",
		"value" : "${formid}",
		"editor" : {type:'combobox',options:{data:formdata,valueField: "value", textField: "text"}}
	} ];

   //如果是发布后的流程,只能编辑
	if(session_project_id==""){
		for(var i=0;i<rows.length;i++){
			delete  rows[i].editor;
		}
	}
	//保存属性
	function saveProcessProperties() {
		process.type = $("#typeid").val();
		process.id = rows[0].value;
		process.name = rows[1].value;
		process.category = rows[2].value;
		process.documentation = rows[3].value;
	}
	//构建属性表格数据
	function populateProcessProperites() {
		rows[0].value = process.id;
		rows[1].value = process.name;
		rows[2].value = process.category;
		rows[3].value = process.documentation;
		propertygrid();
	}
	//加载属性表格数据
	function propertygrid() {
		$('#general-properties').propertygrid('loadData', rows);
		$("#typeid").find("option[value='" + process.type + "']").attr(
				"selected", true);
		process.type = $("#typeid").val();
	}

	$(function() {
		//创建属性表格
		$('#general-properties').propertygrid({
			width : 'auto',
			height : 'auto',
			showGroup : false,
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
				saveProcessProperties();//自动保存
			}
		});
		propertygrid();
		
	});

	/**
	 * 触发流程类型改变事件。
	 */
	function onProcessTypeChange() {
		process.type = $("#typeid").val();
	}
</script>
<div id="process-properties-layout" class="easyui-layout" fit="true">
	<div id="process-properties-panel" region="center" border="true">
		<div id="task-properties-accordion" class="easyui-accordion"
			fit="true" border="false">
			<div id="general" style="padding: 1px;" title="流程属性面板"
				class="properties-menu">
				<div id="task-properties-toolbar-panel" region="north"
					border="false"
					style="padding: 3px; height: 25px; background: #E1F0F2;">
					流程类型 <select id="typeid" style="width: 79%; padding: 1px"
						onchange="onProcessTypeChange();" <c:if test="${empty sessionScope.projectId}">disabled</c:if>>
						<c:forEach items="${proTypeList}" var="type">
							<option value="${type.typename}"
								<c:if test="${type.typename==typeId}">selected="selected"</c:if>>
								${type.typename}</option>
						</c:forEach>

					</select>
				</div>
				<table id="general-properties"></table>
			</div>

		</div>
	</div>
</div>
<script type="text/javascript">
	//保存监听
	function saveProcessListener() {
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
					$('#eventlistenerList').datagrid('reload');

				}
			}
		});

	}
	function setProcessListener(index) {
		var row = $('#eventlistenerList').datagrid('getRows')[index];
		$.ajax({
					url : "processController.do?setProcessListener",
					type : 'POST',
					data : {
						id : row.id
					},
					dataType : 'json',
					success : function(data) {
						if (data.success) {
							var listener = new draw2d.Process.Listener();
							listener.event = row.TPListerer_listenereven;
							listener.id = row.id;
							listener.serviceType = row.TPListerer_listenertype;
							if (row.TPListerer_listenertype == "javaClass") {
								listener.serviceClass = row.TPListerer_listenervalue;
							} else {
								listener.serviceExpression = row.TPListerer_listenervalue;
							}
							process.listeners.add(listener);
						} else {
							process.deleteListener(row.id);
						}
						reloadeventlistenerList();
					}
				});
	}
</script>
