draw2d.ServiceTask=function(){
	draw2d.Task.call(this);
	this.setTitle("服务任务");
	this.setIcon();
};
draw2d.ServiceTask.prototype=new draw2d.Task();
draw2d.ServiceTask.prototype.type="draw2d.ServiceTask";
draw2d.ServiceTask.newInstance=function(serviceTaskXMLNode){
	var task = new draw2d.ServiceTask();
	task.id=serviceTaskXMLNode.attr('id');
	task.taskId=serviceTaskXMLNode.attr('id');
	task.taskName=serviceTaskXMLNode.attr('name');
	task.setContent(serviceTaskXMLNode.attr('name'));
	return task;
};
draw2d.ServiceTask.prototype.setWorkflow=function(_5019){
	draw2d.Task.prototype.setWorkflow.call(this,_5019);
};
draw2d.ServiceTask.prototype.getContextMenu=function(){
	var menu = draw2d.Task.prototype.getContextMenu.call(this);
  return menu;
};
draw2d.ServiceTask.prototype.setIcon = function(){
	var icon=draw2d.Task.prototype.setIcon.call(this);
	icon.className="service-task-icon";
};
draw2d.ServiceTask.prototype.getStartElementXML=function(){
	var name = this.taskId;
	var taskName = trim(this.taskName);
	if(taskName != null && taskName != "")
		name = taskName;
	var xml='<serviceTask id="'+this.taskId+'" name="'+name+'" ';
	
	if(this.isUseExpression){
		if(this.performerType=='assignee'){
			xml=xml+'activiti:assignee="'+this.expression+'" ';
		}else if(this.performerType=='candidateUsers'){
			xml=xml+'activiti:candidateUsers="'+this.expression+'" ';
		}else if(this.performerType=='candidateGroups'){
			xml=xml+'activiti:candidateGroups="'+this.expression+'" ';
		}
	}
	if(this.formKey != null && this.formKey != ""){
		xml=xml+'activiti:formKey="'+this.formKey+'" ';
	}
	xml=xml+'activiti:class="'+this.ClassName+'" ';  
	xml=xml+'>\n';
	return xml;
};
draw2d.ServiceTask.prototype.getEndElementXML=function(){
	var xml = '</serviceTask>\n';
	return xml;
};
draw2d.ServiceTask.prototype.getDocumentationXML=function(){
	if(this.documentation==null||this.documentation=='')return '';
	var xml='<documentation>';
	xml=xml+this.documentation;
	xml=xml+'</documentation>';
	return xml;
};
draw2d.ServiceTask.prototype.getExtensionElementsXML=function(){
	if(this.listeners.getSize()==0&&this.forms.getSize()==0)return '';
	var xml = '<extensionElements>\n';
	xml=xml+this.getFormsXML();
	xml=xml+this.getListenersXML();
	xml=xml+'</extensionElements>\n';
	return xml;
};
draw2d.ServiceTask.prototype.getListenersXML=function(){
	var xml = '';
	for(var i=0;i<this.listeners.getSize();i++){
		var listener = this.listeners.get(i);
		xml=xml+listener.toXML();
	}
	return xml;
};

draw2d.ServiceTask.prototype.getFormsXML=function(){
	var xml = '';
	for(var i=0;i<this.forms.getSize();i++){
		var form = this.forms.get(i);
		xml=xml+form.toXML();
	}
	return xml;
};

draw2d.ServiceTask.prototype.figureDoubleClick=function(){
	var data = {event:this};
	var event = data.event;
	var tid = event.getId();
	openProperties(tid,'serviceTaskProperties');
};
draw2d.ServiceTask.prototype.getContextMenu=function(){
	if(this.workflow.disabled)return null;
	var menu =new draw2d.ContextMenu(100, 50);
	var data = {task:this};
	menu.appendMenuItem(new draw2d.ContextMenuItem("属性", "properties-icon",data,function(x,y)
	{
		var data = this.getData();
		var task = data.task;
		var tid = task.getId();
		if(typeof openProperties != "undefined"){
			openProperties(tid,'serviceTaskProperties');
		}
	}));
	menu.appendMenuItem(new draw2d.ContextMenuItem("删除", "icon-remove",data,function(x,y)
	{
		var data = this.getData();
		var task = data.task;
		var tid = task.getId();
		var wf = task.getWorkflow();
		wf.getCommandStack().execute(new draw2d.CommandDelete(task));
	}));
	
	return menu;
};
draw2d.ServiceTask.prototype.getPerformersBPMNXML=function(){
	var xml = '';
	if(this.performerType=='candidateUsers'){
		if(this.candidateUsers.getSize()!=0){
			xml=xml+'<potentialOwner>\n';
			xml=xml+'<resourceAssignmentExpression>\n';
			xml=xml+'<formalExpression>\n';
			xml=xml+'<![CDATA[';
			for(var i=0;i<this.candidateUsers.getSize();i++){
				var user = this.candidateUsers.get(i);
				xml=xml+'user('+user.sso+'),';
			}
			xml=xml.substring(0, xml.length-1);
			xml=xml+']]>\n';
			xml=xml+'</formalExpression>\n';
			xml=xml+'</resourceAssignmentExpression>\n';
			xml=xml+'</potentialOwner>\n';
		}
	}else if(this.performerType=='candidateGroups'){
		if(this.candidateGroups.getSize()!=0){
			xml=xml+'<potentialOwner>\n';
			xml=xml+'<resourceAssignmentExpression>\n';
			xml=xml+'<formalExpression>\n';
			xml=xml+'<![CDATA[';
			for(var i=0;i<this.candidateGroups.getSize();i++){
				var group = this.candidateGroups.get(i);
				xml=xml+'group('+group+'),';
			}
			xml=xml.substring(0, xml.length-1);
			xml=xml+']]>\n';
			xml=xml+'</formalExpression>\n';
			xml=xml+'</resourceAssignmentExpression>\n';
			xml=xml+'</potentialOwner>\n';
		}
	}
	return xml;
};
draw2d.ServiceTask.prototype.toXML=function(){
	var xml=this.getStartElementXML();
	xml=xml+this.getDocumentationXML();
	xml=xml+this.getExtensionElementsXML();
	xml=xml+this.getPerformersBPMNXML();
	xml=xml+this.getEndElementXML();
	return xml;
};
draw2d.ServiceTask.prototype.toBpmnDI=function(){
	var w=this.getWidth();
	var h=this.getHeight();
	var x=this.getAbsoluteX();
	var y=this.getAbsoluteY();
	var xml='<bpmndi:BPMNShape bpmnElement="'+this.taskId+'" id="BPMNShape_'+this.taskId+'">\n';
	xml=xml+'<omgdc:Bounds height="'+h+'" width="'+w+'" x="'+x+'" y="'+y+'"/>\n';
	xml=xml+'</bpmndi:BPMNShape>\n';
	return xml;
};