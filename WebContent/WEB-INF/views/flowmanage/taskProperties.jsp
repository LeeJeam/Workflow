
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
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
	<div id="task-properties-panel" region="center" fit="true" border="true">
		<div id="task-properties-accordion" class="easyui-accordion" fit="true" border="false">
			<div id="task" title="节点属性" selected="true" class="properties-menu">
				<table id="task-propertygrid"></table>
			</div>
			<div id="main-config" title="人员配置" class="properties-menu" style="overflow: hidden;">
				<div class="datagrid-toolbar" style="height: auto">
					<table width="100%" id="main-properties" cellpadding="3" cellspacing="0" border="0">
						<tr>
							<td width="18%" align="right">类&nbsp;型</td>
							<td width="82%">
								<select id="assigneeType" name="assigneeType"  style="width: 68%;" onclick="doPerformerTypeChange(this.value);">
									<option value="">请选择</option>
									<option value="assignee">审核人</option>
								</select>
								<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-search" onclick="xuanze();">选择</a>
							</td>
							</tr>
							<tr>
							<td align="right">审核人</td>
							<td><input type="text" id="assigneeExpression" name="assigneeExpression" style="width: 97%;" /></td>
						</tr>
							<tr>
							<td width="18%" align="right">类&nbsp;型</td>
							<td width="82%">
								<select id="candidateUsersType" name="candidateUsersType"  style="width: 68%;" onchange="doPerformerTypeChange(this.value);">
									<option value="">请选择</option>
									<option value="candidateUsers">选人范围</option>
									<option value="candidatedeptGroups">部门范围</option>
									<option value="candidateroleGroups">角色范围</option>
								</select>
								<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-search" onclick="usersxuanze();">选择</a>
							</td>
							</tr>
							<tr>
							<td width="18%" align="right">范&nbsp;围</td>
							<td><input type="text" id="candidateUsersExpression" name="candidateUsersExpression" style="width: 97%;" /></td>
						</tr>
						<tr>
							<td width="18%" align="right">类&nbsp;型</td>
							<td width="82%">
								<select id="signUsersType" name="signUsersType"  style="width: 68%;" onclick="doPerformerTypeChange(this.value);">
									<option value="">请选择</option>
									<option value="signUsers">会签人</option>
								</select>
								<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-search" onclick="signusers();">选择</a>
							</td>
							</tr>
							<tr>
							<td width="18%" align="right">会签人</td>
							<td><input type="text" id="signUsersExpression" name="signUsersExpression" style="width: 97%;" /></td>
						</tr>
							<tr>
							<td width="18%" align="right">类&nbsp;型</td>
							<td width="82%">
								<select id="copySendUsersType" name="copySendUsersType"  style="width: 68%;" onclick="doPerformerTypeChange(this.value);">
									<option value="">请选择</option>
									<option value="copySendUsers">抄送人</option>
								</select>
								<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-search" onclick="copysendusers();">选择</a>
							</td>
							</tr>
							<tr>
							<td width="18%" align="right">抄送人</td>
							<td><input type="text" id="copySendUsersExpression" name="copySendUsersExpression" style="width: 97%;" /></td>
						</tr>
<!-- 							<tr> -->
<!-- 							<td width="18%" align="right">类&nbsp;型</td> -->
<!-- 							<td width="82%"> -->
<!-- 								<select id="candidateGroupsType" name="candidateGroupsType" style="width: 68%;" onclick="doPerformerTypeChange('candidateGroups');"> -->
<!-- 									<option value="candidateGroups">部门范围</option> -->
<!-- 									<option value="candidateGroups">角色范围</option> -->
<!-- 								</select> -->
<!-- 								<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-search" onclick="groupxuanze();">选择</a> -->
<!-- 							</td> -->
<!-- 						</tr> -->
<!-- 						<tr> -->
<!-- 							<td align="right">候选组</td> -->
<!-- 							<td><input type="text" id="candidateGroupsExpression" name="candidateGroupsExpression" onclick="doPerformerTypeChange('candidateGroups');"  style="width: 97%;" /></td> -->
<!-- 						</tr> -->
					</table>
				</div>
				<div id="task-candidate-panel" fit="true" class="easyui-panel" style="overflow: hidden; width: 290px; height: 220px; padding: 1px;"></div>
			</div>
<!-- 			<div id="huiqian" title="会签" selected="true" class="properties-menu"> -->
<!-- 				<table id="hq-properties"></table> -->
<!-- 			</div> -->
				<!-- <div id="listeners" title="执行监听器" style="overflow: hidden; padding: 1px;">
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
							服务类型:<select id="ClassName" style="width: 53%; padding: 1px" onchange="onClassNameChange();">
											<option value="0">--请选择类--</option>
												<c:forEach items="${listenerList}" var="form" varStatus="s">
												<option value="${form.classurl }"> ${form.classname}</option>
								               </c:forEach>
							</select><br><br>
							<div id="messageDIV"><label style="vertical-align: top;">消息内容:</label><textarea rows="4" id="server_message" name="taskMessage"></textarea> </div>
							<div ><label style="vertical-align: top;">抄送人员:</label><textarea rows="4" id="send_copy_user"></textarea> </div>
						</div>
					</div>
				</div>
			</div> -->
 			<div id="variableProperties" title="流程变量" style="overflow: hidden; padding: 1px;"> 
 				<div id="variableListtb" style=" background: #efefef; padding: 5px 2px; overflow: hidden;">
 					<div style="float: left; ">
					   <c:if test="${! empty sessionScope.projectId}">
						 <a href="#" class="easyui-linkbutton" plain="true" icon="icon-add" onclick="variableAdd()">添加</a>
					   </c:if>
 					</div> 
 				</div>  
 			    <div id="varableList">
 			     <table id="dataTable">
	                   <thead>
							<tr>
							    <th width="15%">序号</th>
								<th width="15%">名称</th>
								<th width="50%">值</th>
								<th width="20%">操作</th>
							</tr>
	                    </thead>
	                    <tbody>
	                 </tbody>
	               </table>
	            </div>
 			</div> 
		</div>
	</div>
</div>
<script type="text/javascript">
var formdata=${formList};
var task = workflow.getFigure(nodeid);//当前节点对象
//初始化会签人
if(null==task.signUsersExpression){
	var signuser="${data.signuser}";
	if("null"==signuser||null==signuser){
		task.signUsersExpression="";
	}else{
		task.signUsersExpression=signuser;
	}
}

//初始化抄送人
if(null==task.copySendUsersExpression){
	var tasksendcopyuser="${data.tasksendcopyuser}";
	if("null"==tasksendcopyuser||null==tasksendcopyuser){
		task.copySendUsersExpression="";
	}else{
		task.copySendUsersExpression=tasksendcopyuser;
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
}, {
	"name" : "启动表单",
	"group" : "表单属性",
	"value" : task.formKey,
	"field" : "formKey",
	"editor" : {"type":"combobox","options":{required:true,editable:false,"data":formdata}}
}
];

//如果是发布后的流程,只能编辑
if(session_project_id==""){
	for(var i=0;i<rows.length;i++){
		delete  rows[i].editor;
	}
}


var rows2 = [
{
	"name" : "会签人数",
	"group" : "任务属性",
	"value" : task.bursar,
	"field" : "bursar",
	"editor":{
			"type":"validatebox",
			"options":{
				  "validType": "digits"
			}
		}
}
];

function switchTaskCandidatesList(performerType) {
	if (performerType == 'candidatedeptGroups') {
		if(deptInteface!=""){
			task_candidate_panel.panel("refresh",basePath+"/processController/processProperties.htm?turn=candidateUsersConfig&checkbox=false&isMultiple=true&isGrouple=true");
		}
	}else if (performerType == 'candidateroleGroups') {
		if(groupInteface!=""){
			task_candidate_panel.panel("refresh",basePath+"/processController/processProperties.htm?turn=candidateUsersConfig&checkbox=false&isMultiple=true&isGrouple=false");
		}
	}else if(performerType =="candidateUsers"){
		if(userInteface!=""){
			task_candidate_panel.panel("refresh",basePath+"/processController/processProperties.htm?turn=candidateUsersConfig&checkbox=true&isMultiple=true&isGrouple=false");
		}
	}else if(performerType =="assignee"){
		if(userInteface!=""){
			task_candidate_panel.panel("refresh",basePath+"/processController/processProperties.htm?turn=candidateUsersConfig&checkbox=true&isMultiple=false&isGrouple=false");
		}
	}else if(performerType =="signUsers"){
		if(userInteface!=""){
			task_candidate_panel.panel("refresh",basePath+"/processController/processProperties.htm?turn=candidateUsersConfig&checkbox=true&isMultiple=true&isGrouple=false");
		}
	}else if(performerType =="copySendUsers"){
		if(userInteface!=""){
			task_candidate_panel.panel("refresh",basePath+"/processController/processProperties.htm?turn=candidateUsersConfig&checkbox=true&isMultiple=true&isGrouple=false");
		}
	}
}

//保存
function saveTaskProperties() {
	task.taskId = $.trim(rows[0].value);
	task.taskName = rows[1].value;
	task.formKey = rows[3].value;
	task.documentation = rows[2].value;
	task.bursar = rows2[0].value;
	task.setId($.trim(rows[0].value));
	task.setContent($.trim(rows[1].value));
	task.assigneeExpression=$("#candidateUsersExpression").val();
	task.candidateUsersExpression=$("#candidateUsersExpression").val();
	task.candidateGroupsExpression=$("#candidateGroupsExpression").val();
	task.signUsersExpression=$("#signUsersExpression").val();
	task.copySendUsersExpression=$("#copySendUsersExpression").val();

	
}
//加载变量
function populateTaskProperites() {
	rows[0].value = task.taskId;
	rows[1].value = task.taskName;
	rows[2].value = task.documentation;
	rows[3].value = task.formKey;
	rows2[0].value = task.bursar;
	$("#assigneeExpression").val(task.assigneeExpression);
	$("#candidateUsersExpression").val(task.candidateUsersExpression);
	$('#ClassName').val(task.ClassName);
    $('#ExecuteType').val(task.ExecuteType); 
	$("#performerType").val(task.performerType);
	$.trim($('#expression').val(task.expression));
	$("#copySendUsersExpression").val(task.copySendUsersExpression);
	$("#signUsersExpression").val(task.signUsersExpression);
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
function onExecuteTypeChange(){
	 var value=$("#ExecuteType").val();
	 task.ExecuteType=value;
}
function onClassNameChange(obj){  
	var value=$("#ClassName").val();
	task.ClassName=value;
	msgShowOrHide();
 }
//加载属性表格数据
function propertygrid() {
	$('#hq-properties').propertygrid('loadData', rows2);
	$("#ClassName").find("option[value='" + task.ClassName+ "']").attr("selected", true);
	$("#ExecuteType").find("option[value='" + task.ExecuteType+ "']").attr("selected", true);
	$("#assigneeType").find("option[value='" + task.assigneeType+ "']").attr("selected", true);
	$("#signUsersType").find("option[value='" + task.signUsersType+ "']").attr("selected", true);
	$("#copySendUsersType").find("option[value='" + task.copySendUsersType+ "']").attr("selected", true);
	$("#candidateUsersType").find("option[value='" + task.candidateUsersType+ "']").attr("selected", true);
	$('#task-propertygrid').propertygrid('loadData', rows);
	populateTaskProperites();
}
	  




	function variableLoad(){
		var procesnodeid= task.id
		$.ajax({
			type:"post",
			url:basePath+"/processController/getVariables.htm",
			data:{"nodeId":procesnodeid},
			dataType:"json",
			success:function(data){
				var html="";
				if(data!=null&&data.length>0){
					var length=data.length;
					for(var n=0;n<length;n++){
							html+='<tr>	<td>'+(n+1)+'</td>'
							+'<td>'+data[n].variablename+'</td>'
							+'<td>'+data[n].variableval+'</td>'
							+'<td><a href="javascript:deleteVariable('+data[n].id+')">删除</a></td></tr>'
	           
					}
				}
				$("#varableList tbody").html(html);				
			}
		});
	}

	function variableAdd(){
		var formkey=task.formKey;
		//节点编号
		var taskid= task.taskId;
		var processId ='${processId}';
		var url='<%=basePath%>/processController/addOrupdateVariable.htm?formkey='+encodeURI(encodeURI(formkey))+'&taskid='+taskid+'&processId='+processId
		createwindow('添加',url,400,150);
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

	/**
	 * 删除流程变量。
	 */
	function deleteVariable(id)
	{
		$.messager.confirm("确认", "确定删除该记录吗?", function(r)
		{
			if(r)
			{   $.ajax({
				type:"post",
				url:basePath+"/processController/delVariable.htm",
				data:{"id":id},
				async:true,
				success:function(data){
					if(data.status){
						variableLoad();
						alert(data.message);
					}else{
						alert(data.message);
					}
				}
			});
			}
		});
	}
	function doPerformerTypeChange(value){
		switchTaskCandidatesList(value);
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
	
	//创建属性表格
	$('#hq-properties').propertygrid({
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
		variableLoad();
		task_candidate_panel = $('#task-candidate-panel').panel({
			border : false
		});
		propertygrid();
		
		var ptype = '';
		if($("#performerType").val() != '')
		{
			ptype = $("#performerType").val();
		}
		$("#performerType").val(ptype);

		switchTaskCandidatesList(ptype);
		
	});
</script>