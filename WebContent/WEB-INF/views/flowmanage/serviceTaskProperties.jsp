<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<% 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<c:set var="webRoot" value="<%=basePath%>" />
<style>
	#hq-properties { width: 100%}
	#hq-properties thead tr th { border-right: 1px dotted #ccc; font-size: 12px; background: #fafafa; font-weight: normal; border-bottom: 1px dotted #ccc; border-top: 1px dotted #fff; padding: 5px; }
	#hq-properties tbody tr td { border-right: 1px dotted #ccc; font-size: 12px; background: #fff; font-weight: normal; border-bottom: 1px dotted #ccc; border-top: 1px dotted #fff; padding: 5px; }
	
	#dataTable { width: 100%;}
	#dataTable thead tr th { border-right: 1px dotted #ccc; font-size: 12px; background: #fafafa; font-weight: normal; border-bottom: 1px dotted #ccc; border-top: 1px dotted #fff; padding: 5px; }
	#dataTable tbody tr td { border-right: 1px dotted #ccc; font-size: 12px; background: #fff; font-weight: normal; border-bottom: 1px dotted #ccc; border-top: 1px dotted #fff; padding: 5px; }
</style>
<div id="task-properties-layout" class="easyui-layout" fit="true">
	<div id="task-properties-panel" region="center" border="true">
		<div id="task-properties-accordion" class="easyui-accordion" fit="true" border="false">
			<div id="task" title="节点属性" selected="true" class="properties-menu">
				<table id="task-propertygrid"></table>
			</div>
				<div id="listeners" title="发送设置" selected="true" class="properties-menu" style="overflow: hidden; padding: 1px;">
				<div id="listenerListtb" style="padding: 3px; height: 25px">
					<div style="float: left;">
						<div class="form">
							服务类型:<select id="ClassName" style="width: 53%; padding: 1px" onchange="onClassNameChange();" <c:if test="${empty sessionScope.projetcId}">disabled</c:if>>
											<option value="0">--请选择类--</option>
												<c:forEach items="${listenerList}" var="form" varStatus="s">
												<option value="${form.classurl }"> ${form.classname}</option>
								               </c:forEach>
							</select><br><br>
							<div id="messageDIV"><label style="vertical-align: top;">消息内容:</label><textarea rows="4" id="server_message" name="taskMessage"></textarea> </div>
							<div ><label style="vertical-align: top;">抄送人员:</label><textarea rows="4" id="send_copy_user" <c:if test="${empty sessionScope.projetcId}">readonly</c:if>></textarea> </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
var formdata=${formList};
var tid = '${id}';
var task = workflow.getFigure(tid);
//初始化监听器消息内容
if(null==task.task_message){
	var message="${data.msg}";
	if("null"==message||null==message){
		task.task_message="";
	}else{
		task.task_message=message;
	}
}
//初始化监听器抄送人
if(null==task.task_copy_user){
	var message="${data.sendcopyuser}";
	if("null"==message||null==message){
		task.task_copy_user="";
	}else{
		task.task_copy_user=message;
	}
}
//属性表格定义
rows = [

{
	"name" : "ID",
	"group" : "任务属性",
	"value" : task.taskId,
	"field" : "taskId"
}, {
	"name" : "名称",
	"group" : "任务属性",
	"value" : task.taskName,
	"field" : "taskName",
	"editor":{
		"type":"validatebox",
		"options":{
			  "required": true
		}
	}
}, {
	"name" : "描述",
	"group" : "任务属性",
	"value" : task.documentation,
	"field" : "documentation",
	"editor" : "text"
}
];
//如果是发布后的流程,只能编辑
if(session_project_id==""){
	for(var i=0;i<rows.length;i++){
		delete  rows[i].editor;
	}
}

//保存
function saveTaskProperties() {
	task.taskId = $.trim(rows[0].value);
	task.taskName = rows[1].value;
	
	task.documentation = rows[2].value;
	task.setId($.trim(rows[0].value));
	task.setContent($.trim(rows[1].value));
}
//加载变量
function populateTaskProperites() {
	rows[0].value = task.taskId;
	rows[1].value = task.taskName;
	rows[2].value = task.documentation;
	$('#ClassName').val(task.ClassName);
	$("#server_message").text(task.task_message);
	$("#send_copy_user").text(task.task_copy_user);
	msgShowOrHide();
}
//消息内容的显示与隐藏
function msgShowOrHide(){
	var value=$('#ClassName').val();
	if(value!="0"){
		$("#messageDIV").show();
	}else{
		$("#messageDIV").hide();
	}
}
function onClassNameChange(){  
	var value=$("#ClassName").val();
	task.ClassName=value;
	msgShowOrHide();
 }
//加载属性表格数据
function propertygrid() {
	$("#ClassName").find("option[value='" + task.ClassName+ "']").attr("selected", true);
	$('#task-propertygrid').propertygrid('loadData', rows);
	populateTaskProperites();
}
	//保存监听
	function saveProcessListener() {
		var listenerid = $('#listenerid').val();
		$.ajax({
			url : basePath+"/processController.do?saveProcessListener",
			type : 'POST',
			data : {
				type : 2,
				processNode : '${id}',
				processkey : '${processId}',
				listenerid : listenerid
			},
			dataType : 'json',
			error : function() {
				return "";
			},
			success : function(data) {
				if (data.success) {
					$('#listenerList').datagrid('reload');
				}
			}
		});
	}
	function setProcessListener(index) {
		var row = $('#listenerList').datagrid('getRows')[index];
		$.ajax({
					url : basePath+"/processController.do?setProcessListener",
					type : 'POST',
					data : {
						id : row.id
					},
					dataType : 'json',
					success : function(data) {
						if (data.success) {
							var listener = new draw2d.Task.Listener();
							listener.event = row.TPListerer_listenereven;
							listener.id = row.id;
							listener.serviceType = row.TPListerer_listenertype;
							if (row.TPListerer_listenertype == "javaClass") {
								listener.serviceClass = row.TPListerer_listenervalue;
							} else {
								listener.serviceExpression = row.TPListerer_listenervalue;
							}
							task.listeners.add(listener);
						} else {
							task.deleteListener(row.id);
						}
						reloadlistenerList();
					}
				});
	}

	
	$(function(){
	//创建属性表格
	$('#task-propertygrid').propertygrid({
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
			saveTaskProperties();//自动保存
		}
	});
		propertygrid();

		$("#server_message,#send_copy_user").change(function(){
			task.task_message=$("#server_message").val();
			task.task_copy_user=$("#send_copy_user").val();
		});
	});
</script>