var workflow;
var processDefinitionId="";//流程主键ID
var processDefinitionName = "";
var processDefinitionVariables = "";
var nodeid="";
var rows="";
//根据Id获取流程XML
function openProcessDef(id) {
	$.ajax({
		url : basePath+"/processController/getProcessXml.htm",
		dataType : 'xml',
		data : {
			processId : id
		},
		error : function(data) {
			return "";
		},
		success : function(data)
		{
			parseProcessDescriptor(data);

		}
	});
}
//编辑流程时初始化流程图
function createCanvas(processid,disabled) {
	processDefinitionId =processid;
	try {
		workflow = new draw2d.MyCanvas("paintarea");
		workflow.scrollArea = document.getElementById("designer-area");
		if (disabled)
			workflow.setDisabled();
		//update-begin--Author:chenxu  Date:20130327 for：流程设计，开始节点，设置发起人表达式存在浏览器兼容问题，在google和360浏览器下，保存不了
		if (typeof processDefinitionId != "undefined" && processDefinitionId != "0" && processDefinitionId !='null')
		{	//update-end--Author:chenxu  Date:20130327 for：流程设计，开始节点，设置发起人表达式存在浏览器兼容问题，在google和360浏览器下，保存不了
			openProcessDef(processDefinitionId);
		} else {
			var id = "P"+Sequence.create();
			workflow.process.category = 'http://www.haoyuntech.com';
			workflow.process.id = id;
			workflow.process.name = id;
			var startObj = new draw2d.Start();
			startObj.setId("start");
			workflow.addFigure(startObj, 200, 50);
			var endObj = new draw2d.End();
			endObj.setId("end");
			workflow.addFigure(endObj, 200, 400);
		}
	} catch (e) {
		alert(e.message);
	}
}
//添加流程元素模型
function addModel(name, x, y, icon) {
	var model = null;
	if (icon != null && icon != undefined)
		model = eval("new draw2d." + name + "('" + icon + "')");
	else
		model = eval("new draw2d." + name + "()");
	model.generateId();
	workflow.addModel(model, x, y);
}
//删除流程元素模型
function deleteModel(id) {
	var task = workflow.getFigure(id);
	workflow.removeFigure(task);
}
//打开属性页面
function openProperties(id, turnpage) {
	var processId = workflow.process.id;
	$('#properties-panel').panel('refresh', basePath+'/processController/processProperties.htm?turn=' + turnpage + '&id=' + id + '&processId=' + processId + '&processDefinitionId=' + processDefinitionId);
}

function stopEditing(target){
	var t = $(target);
	if (!t.length){return}
	var grid=$.data(target, 'propertygrid');
	if(grid==undefined){
		return;
	}
	var opts = grid.options;
	var index = opts.editIndex;
	if (index == undefined){return;}
	var ed = t.datagrid('getEditors', index)[0];
	if (ed){
		ed.target.blur();
		if (t.datagrid('validateRow', index)){
			t.datagrid('endEdit', index);
		} else {
			t.datagrid('cancelEdit', index);
		}
	}
	opts.editIndex = undefined;
}
//上一步
function redo() {
	workflow.getCommandStack().redo();
}
//下一步
function undo() {
	workflow.getCommandStack().undo();
}
//保存流程
//update-begin--Author:chenxu  Date:20130426 for：流程保存提示消息，跑到层后面了【流程创建成功】，且一直存在，除非刷新页面
function saveProcessDef()
{
	gridname='processList';
	if(typeof(workflow.process.type) == "undefined" || workflow.process.type == 0)
	{
		alert("请选择流程类型");
	}
	else{
		var params = "";
		var nodes = [];
		var lines="";
		var xml = workflow.toXML();
		var processId = workflow.process.id;
		var descriptor = $(xml);
		var removeDate =JSON.stringify(removedata);
		var userTasks = descriptor.find('userTask');
		var manualTasks = descriptor.find('manualTask');
		var serviceTasks = descriptor.find('serviceTask');
		var scriptTasks = descriptor.find('scriptTask');
		var receiveTasks = descriptor.find('receiveTask');
		var businessRuleTasks = descriptor.find('businessRuleTask');
		var line = descriptor.find('sequenceFlow');
		line.each(function(i) {
			var  flowid =$(this).attr('id')
			var flowline = workflow.getLine(flowid);
			lines = lines + "id=" + flowline.id + "###condition" + flowline.condition + "@@@";
		});
		userTasks.each(function(i) {
			var formkey = $(this).attr('activiti:formKey');
			var tid = $(this).attr('id');
			var nodeName = $(this).attr('name');
			var ClassName =$(this).attr('ClassName');
			var isBursar = trim($(this).find('documentation').text());
			var task=workflow.getFigure(tid);
			nodes.push({"id":tid,"nodeName":nodeName,"formkey":(formkey==undefined?"":formkey),"isBursar":isBursar,"msg":task.task_message,"sendcopyuser":task.task_copy_user,"signuser":task.signUsersExpression,"tasksendcopyuser":task.copySendUsersExpression});
		});
		manualTasks.each(function(i) {
			var tid = $(this).attr('id');
			var nodeName = $(this).attr('name');
			var isBursar = trim($(this).find('documentation').text());
			var task=workflow.getFigure(tid);
			nodes.push({"id":tid,"nodeName":nodeName,"formkey":"","isBursar":isBursar,"msg":task.task_message,"sendcopyuser":task.task_copy_user,"signuser":task.signUsersExpression,"tasksendcopyuser":task.copySendUsersExpression});
		});
		serviceTasks.each(function(i) {
			var tid = $(this).attr('id');
			var flag = $(this).attr('activiti:type');
			var nodeName = "";
			if (flag == 'mail') {
				nodeName = "邮件任务";
			} else {
				nodeName = $(this).attr('name');
			}
			var isBursar = trim($(this).find('documentation').text());
			var task=workflow.getFigure(tid);
			nodes.push({"id":tid,"nodeName":nodeName,"formkey":"","isBursar":isBursar,"msg":task.task_message,"sendcopyuser":task.task_copy_user,"signuser":task.signUsersExpression,"tasksendcopyuser":task.copySendUsersExpression});
		});
		scriptTasks.each(function(i) {
			var tid = $(this).attr('id');
			var nodeName = $(this).attr('name');

			var isBursar = trim($(this).find('documentation').text());
			var task=workflow.getFigure(tid);
			nodes.push({"id":tid,"nodeName":nodeName,"formkey":"","isBursar":isBursar,"msg":task.task_message,"sendcopyuser":task.task_copy_user,"signuser":task.signUsersExpression,"tasksendcopyuser":task.copySendUsersExpression});
		});
		receiveTasks.each(function(i) {
			var tid = $(this).attr('id');
			var nodeName = $(this).attr('name');

			var isBursar = trim($(this).find('documentation').text());
			var task=workflow.getFigure(tid);
			nodes.push({"id":tid,"nodeName":nodeName,"formkey":"","isBursar":isBursar,"msg":task.task_message,"sendcopyuser":task.task_copy_user,"signuser":task.signUsersExpression,"tasksendcopyuser":task.copySendUsersExpression});
		});
		businessRuleTasks.each(function(i) {
			var tid = $(this).attr('id');
			var nodeName = "业务规则";

			var isBursar = trim($(this).find('documentation').text());
			var task=workflow.getFigure(tid);
			nodes.push({"id":tid,"nodeName":nodeName,"formkey":"","isBursar":isBursar,"msg":task.task_message,"sendcopyuser":task.task_copy_user,"signuser":task.signUsersExpression,"tasksendcopyuser":task.copySendUsersExpression});
		});
		$.ajax({
			url : basePath+"/processController/saveProcess.htm",
			type : 'POST',
			data : {
				processDescriptor : xml,//流程定义XML
				processName : workflow.process.name,//流程对象名称
				processkey : workflow.process.id,//流程对象ID
				typeid: workflow.process.type,//流程类型Id
				formid: workflow.process.documentation,//流程类型Id
				params : params,//
				nodes : JSON.stringify(nodes),//流程节点
				//lines : lines,
				processDefinitionId : processDefinitionId,//流程ID
				removeDate:removeDate

			},
			dataType : 'json',
			error : function(data) {
				alert(data.message);
			},
			success : function(data) {
				if(data.status){
					if(session_project_id!=null && session_project_id!=""){
						alert(data.message);
						window.location.href=basePath+"/processController/processList.htm";
					}else{
						deployFlow(processId);
					}
				}else{
					alert(data.message);
				}

			}

		});
	}
}

function deployFlow(processId){
	$.ajax({
		type:"post",
		url:basePath+"/processController/deployFlow.htm",
		data:{"processid":processId},
		dataType:"json",
		success:function(data){
			alert(data.message);
			window.location.href=basePath+"/processController/processList.htm";
		}
	});
}

//update-end--Author:chenxu  Date:20130426 for：流程保存提示消息，跑到层后面了【流程创建成功】，且一直存在，除非刷新页面

//导出流程
function exportProcessDef(obj) {
	//obj.href="${ctx}/wf/procdef/procdef!exportProcessDef.action?procdefId="+processDefinitionId+"&processName="+processDefinitionName;
}
//流程图绘制
function parseProcessDescriptor(data) {
	var BPMNShape = ($.browser.webkit) ? 'BPMNShape' : 'bpmndi\\:BPMNShape';
	var BPMNEdge = ($.browser.webkit) ? 'BPMNEdge' : 'bpmndi\\:BPMNEdge';
	var executionListener = ($.browser.webkit) ? 'activiti\\:executionListener' : 'executionListener';
	var Bounds = ($.browser.webkit) ? 'Bounds' : 'omgdc\\:Bounds';
	var waypoint = ($.browser.webkit) ? 'waypoint' : 'omgdi\\:waypoint';
	var taskListener = ($.browser.webkit) ? 'taskListener' : 'activiti\\:taskListener';
	var formProperty = ($.browser.webkit) ? 'formProperty' : 'activiti\\:formProperty';
	var field = ($.browser.webkit) ? 'activiti\\:field' : 'field';
	var expression = ($.browser.webkit) ? 'expression' : 'activiti\\:expression';
	var intag = ($.browser.webkit) ? 'in' : 'activiti\\:in';
	var outtag = ($.browser.webkit) ? 'out' : 'activiti\\:out';
	var descriptor = $(data);
	var definitions = descriptor.find('definitions');
	var process = descriptor.find('process');
	var startEvent = descriptor.find('startEvent');
	var endEvent = descriptor.find('endEvent');
	var manualTasks = descriptor.find('manualTask');
	var userTasks = descriptor.find('userTask');
	var serviceTasks = descriptor.find('serviceTask');
	var scriptTasks = descriptor.find('scriptTask');
	var receiveTasks = descriptor.find('receiveTask');
	var exclusiveGateway = descriptor.find('exclusiveGateway');
	var parallelGateway = descriptor.find('parallelGateway');
	var timerBoundary = descriptor.find('boundaryEvent');
	var callActivitys = descriptor.find('callActivity');
	var businessRuleTasks = descriptor.find('businessRuleTask');
	var lines = descriptor.find('sequenceFlow');

	var shapes = descriptor.find(BPMNShape);
	var edges = descriptor.find(BPMNEdge);
	workflow.process.category = definitions.attr('targetNamespace');
	workflow.process.id = process.attr('id');
	workflow.process.name = process.attr('name');
	var documentation = trim(descriptor.find('process > documentation').text());
	if (documentation != null && documentation != "")
		workflow.process.documentation = documentation;
	var extentsion = descriptor.find('process > extensionElements');
	if (extentsion != null) {
		var listeners = extentsion.find('activiti\\:executionListener');
		workflow.process.setListeners(parseListeners(listeners, "draw2d.Process.Listener", "draw2d.Process.Listener.Field"));
	}
	$.each(processDefinitionVariables, function(i, n) {
		var variable = new draw2d.Process.variable();
		variable.name = n.name;
		variable.type = n.type;
		variable.scope = n.scope;
		variable.defaultValue = n.defaultValue;
		variable.remark = n.remark;
		workflow.process.addVariable(variable);
	});
	startEvent.each(function(i) {
		var start = new draw2d.Start();
		start.id = $(this).attr('id');
		start.eventId = $(this).attr('id');
		start.eventName = $(this).attr('name');
		var expression = $(this).attr('activiti:initiator');
		if (expression == null || expression == 'null') {
			expression = "";
		}
		start.expression = expression;
		shapes.each(function(i) {
			var id = $(this).attr('bpmnElement');
			if (id == start.id) {
				var x = parseInt($(this).find(Bounds).attr('x'));
				var y = parseInt($(this).find(Bounds).attr('y'));
				var w = parseInt($(this).find(Bounds).attr('width'));
				var h = parseInt($(this).find(Bounds).attr('height'));
				start.setDimension(w, h);
				workflow.addFigure(start, x, y);
				return false;
			}
		});
	});
	endEvent.each(function(i) {
		var end = new draw2d.End();
		end.id = $(this).attr('id');
		end.eventId = $(this).attr('id');
		end.eventName = $(this).attr('name');
		shapes.each(function(i) {
			var id = $(this).attr('bpmnElement');
			if (id == end.id) {
				var x = parseInt($(this).find(Bounds).attr('x'));
				var y = parseInt($(this).find(Bounds).attr('y'));
				var w = parseInt($(this).find(Bounds).attr('width'));
				var h = parseInt($(this).find(Bounds).attr('height'));
				end.setDimension(w, h);
				workflow.addFigure(end, x, y);
				return false;
			}
		});
	});
	userTasks.each(function(i) {
		var task = new draw2d.UserTask();
		var tid = $(this).attr('id');
		task.id = tid;
		var tname = $(this).attr('name');
		var assignee = $(this).attr('activiti:assignee');
		var candidataUsers = $(this).attr('activiti:candidateUsers');
		var candidataGroups = $(this).attr('activiti:candidateGroups');
		var formKey = $(this).attr('activiti:formKey');
		if (assignee != null && assignee != "") {
			task.isUseExpression = true;
			task.assigneeType = "assignee";
			task.assigneeExpression = assignee;
		}
		if (candidataUsers != null && candidataUsers != "") {
			task.isUseExpression = true;
			task.candidateUsersType = "candidateUsers";
			task.candidateUsersExpression = candidataUsers;
		}
		if (candidataGroups != null && candidataGroups != "") {
			if(candidataGroups.indexOf("部门")!=-1){
				task.isUseExpression = true;
				task.candidateUsersType = "candidatedeptGroups";
				task.candidateUsersExpression = candidataGroups;
			}else if(candidataGroups.indexOf("角色")!=-1){
				task.isUseExpression = true;
				task.candidateUsersType = "candidateroleGroups";
				task.candidateUsersExpression = candidataGroups;
			}
		}
		if (formKey != null && formKey != "") {
			task.formKey = formKey;
		}
		var taskListener = $(this).find('extensionElements').find("[event]");
		if (taskListener.length > 0){
			task.ExecuteType= taskListener.attr("event");
			task.ClassName = taskListener.attr("class");
		}
		var documentation = trim($(this).find('documentation').text());
		if (documentation != null && documentation != ""){
			task.documentation = documentation;
		}
		var $multiInstanceLoopCharacteristics = $(this).find("multiInstanceLoopCharacteristics");
		if($multiInstanceLoopCharacteristics.length>0){
			var completionCondition=$multiInstanceLoopCharacteristics.find("completionCondition").text();
			if (completionCondition!=""&&completionCondition!=undefined) {
				completionCondition=completionCondition.split("=");
				if(completionCondition.length>1){
					var end=completionCondition[1].lastIndexOf("}");
					task.bursar=completionCondition[1].substring(0,end);
				}
			}
		}
		task.taskId = tid;
		task.taskName = tname;
		//if (tid != tname)
		task.setContent(tname);
		var forms = $(this).find('extensionElements').find('activiti\\:formProperty');
		task.setForms(parseForms(forms, "draw2d.Task.Form"));
		var performersExpression = $(this).find('potentialOwner').find('resourceAssignmentExpression').find('formalExpression').text();
		if (performersExpression.indexOf('user(') != -1) {
			task.performerType = "candidateUsers";
		} else if (performersExpression.indexOf('group(') != -1) {
			task.performerType = "candidateGroups";
		}
		var performers = performersExpression.split(',');
		$.each(performers, function(i, n) {
			var start = 0;
			var end = n.lastIndexOf(')');
			if (n.indexOf('user(') != -1) {
				start = 'user('.length;
				var performer = n.substring(start, end);
				task.addCandidateUser({
					sso : performer
				});
			} else if (n.indexOf('group(') != -1) {
				start = 'group('.length;
				var performer = n.substring(start, end);
				task.addCandidateGroup(performer);
			}
		});
		shapes.each(function(i) {
			var id = $(this).attr('bpmnElement');
			if (id == task.id) {
				var x = parseInt($(this).find(Bounds).attr('x'));
				var y = parseInt($(this).find(Bounds).attr('y'));
				var w = parseInt($(this).find(Bounds).attr('width'));
				var h = parseInt($(this).find(Bounds).attr('height'));
				task.setDimension(w, h);
				workflow.addModel(task, x, y);
				return false;
			}
		});
	});

	manualTasks.each(function(i) {
		var task = new draw2d.ManualTask();
		var tid = $(this).attr('id');
		task.id = tid;
		var tname = $(this).attr('name');
		var assignee = $(this).attr('activiti:assignee');
		var candidataUsers = $(this).attr('activiti:candidateUsers');
		var candidataGroups = $(this).attr('activiti:candidateGroups');
		var formKey = $(this).attr('activiti:formKey');
		if (assignee != null && assignee != "") {
			task.isUseExpression = true;
			task.performerType = "assignee";
			task.expression = assignee;
		} else if (candidataUsers != null && candidataUsers != "") {
			task.isUseExpression = true;
			task.performerType = "candidateUsers";
			task.expression = candidataUsers;
		} else if (candidataGroups != null && candidataGroups != "") {
			task.isUseExpression = true;
			task.performerType = "candidateGroups";
			task.expression = candidataGroups;
		}
		if (formKey != null && formKey != "") {
			task.formKey = formKey;
		}
		var documentation = trim($(this).find('documentation').text());
		if (documentation != null && documentation != "")
			task.documentation = documentation;
		task.taskId = tid;
		task.taskName = tname;
		//if (tid != tname)
		task.setContent(tname);
		var listeners = $(this).find('extensionElements').find('activiti\\:taskListener');
		task.setListeners(parseListeners(listeners, "draw2d.Task.Listener", "draw2d.Task.Listener.Field"));
		var performersExpression = $(this).find('potentialOwner').find('resourceAssignmentExpression').find('formalExpression').text();
		if (performersExpression.indexOf('user(') != -1) {
			task.performerType = "candidateUsers";
		} else if (performersExpression.indexOf('group(') != -1) {
			task.performerType = "candidateGroups";
		}
		var performers = performersExpression.split(',');
		$.each(performers, function(i, n) {
			var start = 0;
			var end = n.lastIndexOf(')');
			if (n.indexOf('user(') != -1) {
				start = 'user('.length;
				var performer = n.substring(start, end);
				task.addCandidateUser({
					sso : performer
				});
			} else if (n.indexOf('group(') != -1) {
				start = 'group('.length;
				var performer = n.substring(start, end);
				task.addCandidateGroup(performer);
			}
		});
		shapes.each(function(i) {
			var id = $(this).attr('bpmnElement');
			if (id == task.id) {
				var x = parseInt($(this).find(Bounds).attr('x'));
				var y = parseInt($(this).find(Bounds).attr('y'));
				var w = parseInt($(this).find(Bounds).attr('width'));
				var h = parseInt($(this).find(Bounds).attr('height'));
				task.setDimension(w, h);
				workflow.addModel(task, x, y);
				return false;
			}
		});
	});

	serviceTasks.each(function(i) {
		var flag = $(this).attr('activiti:type');
		if (flag == 'mail') {
			var task = new draw2d.MailTask();
			var tid = $(this).attr('id');
			task.id = tid;
			var elements = $(this).find('activiti\\:field');
			elements.each(function(i) {
				if ($(this).attr('name') == 'to') {
					task.toEmail = $(this).attr('expression');
				}
				if ($(this).attr('name') == 'from') {
					task.fromEmail = $(this).attr('expression');
				}
				if ($(this).attr('name') == 'subject') {
					task.subjectEmail = $(this).attr('expression');
				}
				if ($(this).attr('name') == 'cc') {
					task.ccEmail = $(this).attr('expression');
				}
				if ($(this).attr('name') == 'bcc') {
					task.bccEmail = $(this).attr('expression');
				}
				if ($(this).attr('name') == 'charset') {
					task.charsetEmail = $(this).attr('expression');
				}
				if ($(this).attr('name') == 'html') {
					task.htmlEmail = trim($(this).find('activiti\\:expression').text());
				}
				if ($(this).attr('name') == 'text') {
					task.textEmail = trim($(this).find('activiti\\:expression').text());
				}

			});

			task.taskId = tid;

			shapes.each(function(i) {
				var id = $(this).attr('bpmnElement');
				if (id == task.id) {
					var x = parseInt($(this).find(Bounds).attr('x'));
					var y = parseInt($(this).find(Bounds).attr('y'));
					workflow.addModel(task, x, y);
					return false;
				}
			});
		} else {
			var task = new draw2d.ServiceTask();
			var tid = $(this).attr('id');
			task.id = tid;
			var ClassName =$(this).attr('activiti:class');
			task.ClassName=ClassName;
			var tname = $(this).attr('name');
			var assignee = $(this).attr('activiti:assignee');
			var candidataUsers = $(this).attr('activiti:candidateUsers');
			var candidataGroups = $(this).attr('activiti:candidateGroups');
			var formKey = $(this).attr('activiti:formKey');
			if (assignee != null && assignee != "") {
				task.isUseExpression = true;
				task.performerType = "assignee";
				task.expression = assignee;
			} else if (candidataUsers != null && candidataUsers != "") {
				task.isUseExpression = true;
				task.performerType = "candidateUsers";
				task.expression = candidataUsers;
			} else if (candidataGroups != null && candidataGroups != ""){
				task.isUseExpression = true;
				task.performerType = "candidateGroups";
				task.expression = candidataGroups;
			}
			if (formKey != null && formKey != "") {
				task.formKey = formKey;
			}
			var documentation = trim($(this).find('documentation').text());
			if (documentation != null && documentation != "")
				task.documentation = documentation;
			task.taskId = tid;
			task.taskName = tname;
			//if (tid != tname)
			task.setContent(tname);
			var listeners = $(this).find('extensionElements').find('activiti\\:taskListener');
			task.setListeners(parseListeners(listeners, "draw2d.Task.Listener", "draw2d.Task.Listener.Field"));
			var performersExpression = $(this).find('potentialOwner').find('resourceAssignmentExpression').find('formalExpression').text();
			if (performersExpression.indexOf('user(') != -1) {
				task.performerType = "candidateUsers";
			} else if (performersExpression.indexOf('group(') != -1) {
				task.performerType = "candidateGroups";
			}
			var performers = performersExpression.split(',');
			$.each(performers, function(i, n) {
				var start = 0;
				var end = n.lastIndexOf(')');
				if (n.indexOf('user(') != -1) {
					start = 'user('.length;
					var performer = n.substring(start, end);
					task.addCandidateUser({
						sso : performer
					});
				} else if (n.indexOf('group(') != -1) {
					start = 'group('.length;
					var performer = n.substring(start, end);
					task.addCandidateGroup(performer);
				}
			});
			shapes.each(function(i) {
				var id = $(this).attr('bpmnElement');
				if (id == task.id) {
					var x = parseInt($(this).find(Bounds).attr('x'));
					var y = parseInt($(this).find(Bounds).attr('y'));
					var w = parseInt($(this).find(Bounds).attr('width'));
					var h = parseInt($(this).find(Bounds).attr('height'));
					task.setDimension(w, h);
					workflow.addModel(task, x, y);
					return false;
				}
			});
		}

	});

	scriptTasks.each(function(i) {
		var task = new draw2d.ScriptTask();
		var tid = $(this).attr('id');
		task.id = tid;
		var tname = $(this).attr('name');
		var scriptFormat = $(this).attr('scriptFormat');
		var resultVariable = $(this).attr('activiti:resultVariable');
		task.scriptFormat = scriptFormat;
		task.resultVariable = resultVariable;
		var documentation = trim($(this).find('documentation').text());
		if (documentation != null && documentation != "")
			task.documentation = documentation;
		var script = trim($(this).find('script').text());
		if (script != null && script != "")
			task.expression = script;
		task.taskId = tid;
		task.taskName = tname;
		//if (tid != tname)
		task.setContent(tname);

		shapes.each(function(i) {
			var id = $(this).attr('bpmnElement');
			if (id == task.id) {
				var x = parseInt($(this).find(Bounds).attr('x'));
				var y = parseInt($(this).find(Bounds).attr('y'));
				var w = parseInt($(this).find(Bounds).attr('width'));
				var h = parseInt($(this).find(Bounds).attr('height'));
				task.setDimension(w, h);
				workflow.addModel(task, x, y);
				return false;
			}
		});
	});

	receiveTasks.each(function(i) {
		var task = new draw2d.ReceiveTask();
		var tid = $(this).attr('id');
		task.id = tid;
		var tname = $(this).attr('name');
		task.taskId = tid;
		task.taskName = tname;
		//if (tid != tname)
		task.setContent(tname);

		shapes.each(function(i) {
			var id = $(this).attr('bpmnElement');
			if (id == task.id) {
				var x = parseInt($(this).find(Bounds).attr('x'));
				var y = parseInt($(this).find(Bounds).attr('y'));
				var w = parseInt($(this).find(Bounds).attr('width'));
				var h = parseInt($(this).find(Bounds).attr('height'));
				task.setDimension(w, h);
				workflow.addModel(task, x, y);
				return false;
			}
		});
	});

	exclusiveGateway.each(function(i) {
		var gateway = new draw2d.ExclusiveGateway();
		var gtwid = $(this).attr('id');
		var gtwname = $(this).attr('name');
		gateway.id = gtwid;
		gateway.gatewayId = gtwid;
		gateway.gatewayName = gtwname;
		shapes.each(function(i) {
			var id = $(this).attr('bpmnElement');
			if (id == gateway.id) {
				var x = parseInt($(this).find(Bounds).attr('x'));
				var y = parseInt($(this).find(Bounds).attr('y'));
				var w = parseInt($(this).find(Bounds).attr('width'));
				var h = parseInt($(this).find(Bounds).attr('height'));
				gateway.setDimension(w, h);
				workflow.addModel(gateway, x, y);
				return false;
			}
		});
	});
	parallelGateway.each(function(i) {
		var gateway = new draw2d.ParallelGateway();
		var gtwid = $(this).attr('id');
		var gtwname = $(this).attr('name');
		gateway.id = gtwid;
		gateway.gatewayId = gtwid;
		gateway.gatewayName = gtwname;
		shapes.each(function(i) {
			var id = $(this).attr('bpmnElement');
			if (id == gateway.id) {
				var x = parseInt($(this).find(Bounds).attr('x'));
				var y = parseInt($(this).find(Bounds).attr('y'));
				var w = parseInt($(this).find(Bounds).attr('width'));
				var h = parseInt($(this).find(Bounds).attr('height'));
				gateway.setDimension(w, h);
				workflow.addModel(gateway, x, y);
				return false;
			}
		});
	});

	timerBoundary.each(function(i) {

		if ($(this).find('timeDate').text() != '') {
			var timeBoundaryevent = new draw2d.TimerBoundary("plug-in/designer/icons/timer.png");
			var boundaryId = $(this).attr('id');
			var cancelActivity = $(this).attr('cancelActivity');
			var attachedToRef = $(this).attr('attachedToRef');
			timeBoundaryevent.id = boundaryId;
			timeBoundaryevent.boundaryId = boundaryId;
			timeBoundaryevent.cancelActivity = cancelActivity;
			timeBoundaryevent.attached = attachedToRef;
			timeBoundaryevent.timeType = 'timeDate';
			timeBoundaryevent.expression = $(this).find('timeDate').text();
		} else if ($(this).find('timeDuration').text() != '') {
			var timeBoundaryevent = new draw2d.TimerBoundary("plug-in/designer/icons/timer.png");
			var boundaryId = $(this).attr('id');
			var cancelActivity = $(this).attr('cancelActivity');
			var attachedToRef = $(this).attr('attachedToRef');
			timeBoundaryevent.id = boundaryId;
			timeBoundaryevent.boundaryId = boundaryId;
			timeBoundaryevent.cancelActivity = cancelActivity;
			timeBoundaryevent.attached = attachedToRef;
			timeBoundaryevent.timeType = 'timeDuration';
			timeBoundaryevent.expression = $(this).find('timeDuration').text();
		} else if ($(this).find('timeCycle').text() != '') {
			var timeBoundaryevent = new draw2d.TimerBoundary("plug-in/designer/icons/timer.png");
			var boundaryId = $(this).attr('id');
			var cancelActivity = $(this).attr('cancelActivity');
			var attachedToRef = $(this).attr('attachedToRef');
			timeBoundaryevent.id = boundaryId;
			timeBoundaryevent.boundaryId = boundaryId;
			timeBoundaryevent.cancelActivity = cancelActivity;
			timeBoundaryevent.attached = attachedToRef;
			timeBoundaryevent.timeType = 'timeCycle';
			timeBoundaryevent.expression = $(this).find('timeCycle').text();
		} else {
			var timeBoundaryevent = new draw2d.ErrorBoundary("plug-in/designer/icons/error.png");
			var boundaryId = $(this).attr('id');
			var attachedToRef = $(this).attr('attachedToRef');
			timeBoundaryevent.id = boundaryId;
			timeBoundaryevent.boundaryId = boundaryId;
			timeBoundaryevent.attached = attachedToRef;
			timeBoundaryevent.expression = $(this).find('errorEventDefinition').attr('errorRef');
		}
		shapes.each(function(i) {
			var id = $(this).attr('bpmnElement');
			if (id == timeBoundaryevent.id) {
				var x = parseInt($(this).find(Bounds).attr('x'));
				var y = parseInt($(this).find(Bounds).attr('y'));
				var w = parseInt($(this).find(Bounds).attr('width'));
				var h = parseInt($(this).find(Bounds).attr('height'));
				timeBoundaryevent.setDimension(w, h);
				workflow.addModel(timeBoundaryevent, x, y);
				return false;
			}
		});
	});

	callActivitys.each(function(i) {
		var callActivity = new draw2d.CallActivity("plug-in/designer/icons/callactivity.png");
		var subProcessId = $(this).attr('id');
		var name = $(this).attr('name');
		var callSubProcess = $(this).attr('calledElement');
		callActivity.id = subProcessId;
		callActivity.subProcessId = subProcessId;
		callActivity.callSubProcess = callSubProcess;
		callActivity.name = name;
		var flag = $(this).find('extensionElements');
		if (flag != null) {
			callActivity.insource = $(this).find(intag).attr('source');
			callActivity.intarget = $(this).find(intag).attr('target');
			callActivity.outsource = $(this).find(outtag).attr('source');
			callActivity.outtarget = $(this).find(outtag).attr('target');
		}
		shapes.each(function(i) {
			var id = $(this).attr('bpmnElement');
			if (id == callActivity.id) {
				var x = parseInt($(this).find(Bounds).attr('x'));
				var y = parseInt($(this).find(Bounds).attr('y'));
				var w = parseInt($(this).find(Bounds).attr('width'));
				var h = parseInt($(this).find(Bounds).attr('height'));
				callActivity.setDimension(w, h);
				workflow.addModel(callActivity, x, y);
				return false;
			}
		});
	});

	businessRuleTasks.each(function(i) {
		var task = new draw2d.BusinessRuleTask();
		var tid = $(this).attr('id');
		var valueInput = $(this).attr('activiti:ruleVariablesInput');
		var valueOutput = $(this).attr('activiti:resultVariables');
		var rules = $(this).attr('activiti:rules');
		var exclude = $(this).attr('exclude');
		if (rules != null && rules != '') {
			task.rules = rules;
			if (exclude != null && exclude != '') {
				task.isclude = 'exclude';
			} else {
				task.isclude = 'include';
			}
		} else {
			task.isclude = '';
		}
		task.id = tid;
		task.taskId = tid;
		task.rulesInput = valueInput;
		task.rulesOutputs = valueOutput;
		shapes.each(function(i) {
			var id = $(this).attr('bpmnElement');
			if (id == task.id) {
				var x = parseInt($(this).find(Bounds).attr('x'));
				var y = parseInt($(this).find(Bounds).attr('y'));
				var w = parseInt($(this).find(Bounds).attr('width'));
				var h = parseInt($(this).find(Bounds).attr('height'));
				task.setDimension(w, h);
				workflow.addModel(task, x, y);
				return false;
			}
		});
	});

	lines.each(function(i) {
		var lid = $(this).attr('id');
		var name = $(this).attr('name');
		var condition = $(this).find('conditionExpression').text();
		var sourceRef = $(this).attr('sourceRef');
		var targetRef = $(this).attr('targetRef');
		var source = workflow.getFigure(sourceRef);
		var target = workflow.getFigure(targetRef);
		edges.each(function(i) {
			var eid = $(this).attr('bpmnElement');
			if (eid == lid) {
				var startPort = null;
				var endPort = null;
				var points = $(this).find(waypoint);
				var len = points.length;
				var startX = $(points[0]).attr('x');
				var startY = $(points[0]).attr('y');
				var endX = $(points[len - 1]).attr('x');
				var endY = $(points[len - 1]).attr('y');
				var sports = source.getPorts();
				for ( var i = 0; i < sports.getSize(); i++) {
					var s = sports.get(i);
					var x = parseInt(s.getAbsoluteX());
					var y = parseInt(s.getAbsoluteY());

					if (x == startX && y == startY) {
						startPort = s;
						break;
					}
				}

				var tports = target.getPorts();

				for ( var i = 0; i < tports.getSize(); i++) {
					var t = tports.get(i);
					var x = parseInt(t.getAbsoluteX());
					var y = parseInt(t.getAbsoluteY());
					if (x == endX && y == endY) {
						endPort = t;

						break;
					}
				}
				if (startPort != null && endPort != null) {

					var cmd = new draw2d.CommandConnect(workflow, startPort, endPort);
					var connection = new draw2d.DecoratedConnection();

					connection.id = lid;
					connection.lineId = lid;
					connection.lineName = name;
					connection.setLabel(name);
					if (condition != null && condition != "") {
						connection.condition = condition;
					}
					cmd.setConnection(connection);
					workflow.getCommandStack().execute(cmd);
				}
				return false;
			}
		});
	});
	if (typeof setHightlight != "undefined") {
		setHightlight();
	}
	populateProcessProperites();
}
/**
 * 监听器转换
 * @param listeners
 * @param listenerType
 * @param fieldType
 * @returns {draw2d.ArrayList}
 */
function parseListeners(listeners, listenerType, fieldType) {
	var parsedListeners = new draw2d.ArrayList();
	listeners.each(function(i) {

		var listener = eval("new " + listenerType + "()");
		listener.event = $(this).attr('event');
		listener.id = $(this).attr('id');
		var expression = $(this).attr('delegateExpression');
		var clazz = $(this).attr('class');
		if (expression != null && expression != "") {
			listener.serviceType = 'expression';
			listener.serviceExpression = expression;
		} else if (clazz != null && clazz != "") {
			listener.serviceType = 'javaClass';
			listener.serviceClass = clazz;
		}
		var fields = $(this).find('activiti\\:field');
		fields.each(function(i) {
			var field = eval("new " + fieldType + "()");
			field.name = $(this).attr('name');
			var string = $(this).find('activiti\\:string').text();
			var expression = $(this).find('activiti\\:expression').text();
			if (string != null && string != "") {
				field.type = 'string';
				field.value = string;
			} else if (expression != null && expression != "") {
				field.type = 'expression';
				field.value = expression;
			}
			listener.setField(field);
		});
		parsedListeners.add(listener);
	});
	return parsedListeners;
}
function parseForms(forms, formType) {
	var parsedForms = new draw2d.ArrayList();
	forms.each(function(i) {
		var form = eval("new " + formType + "()");
		form.id = $(this).attr('id');
		var name = $(this).attr('name');
		form.name = name;
		var type = $(this).attr('type');
		form.type = type;
		var value = $(this).attr('value');
		form.value = value;
		var exp = $(this).attr('exp');
		form.exp = exp;
		var remark = $(this).attr('remark');
		form.remark = remark;
		parsedForms.add(form);
	});
	return parsedForms;
}
