/**
 * 用户任务对象
 */
draw2d.UserTask=function(){
	draw2d.Task.call(this);
	this.setTitle("用户任务");
	this.setIcon();
};
draw2d.UserTask.prototype=new draw2d.Task();
draw2d.UserTask.prototype.type="draw2d.UserTask";
draw2d.UserTask.newInstance=function(userTaskXMLNode){
	var task = new draw2d.UserTask();
	task.id=userTaskXMLNode.attr('id');
	task.taskId=userTaskXMLNode.attr('id');
	task.taskName=userTaskXMLNode.attr('name');
	task.setContent(userTaskXMLNode.attr('name'));
	return task;
};
draw2d.UserTask.prototype.setWorkflow=function(_5019){
	draw2d.Task.prototype.setWorkflow.call(this,_5019);
};
draw2d.UserTask.prototype.getContextMenu=function(){
	var menu = draw2d.Task.prototype.getContextMenu.call(this);
  return menu;
};
draw2d.UserTask.prototype.setIcon = function(){
	var icon=draw2d.Task.prototype.setIcon.call(this);
	icon.className="user-task-icon";
};
draw2d.UserTask.prototype.getStartElementXML=function(){
	var name = this.taskId;
	var taskName = trim(this.taskName);
	if(taskName != null && taskName != "")
		name = taskName;
	    var xml='<userTask id="'+this.taskId+'" name="'+name+'" ';
	    if(this.assigneeExpression!=null && this.assigneeExpression!=""){
	    	xml=xml+'activiti:assignee="'+this.assigneeExpression+'" '
	    }
	    if(this.candidateUsersExpression!=null && this.candidateUsersExpression!="" && this.candidateUsersType=="candidateUsers"){
	    	xml=xml+'activiti:candidateUsers="'+this.candidateUsersExpression+'" '
	    }
	    if(this.candidateUsersExpression!=null && this.candidateUsersExpression!="" && this.candidateUsersType=="candidatedeptGroups"){
	    	xml=xml+'activiti:candidateGroups="'+this.candidateUsersExpression+'" '
	    }
	    if(this.candidateUsersExpression!=null && this.candidateUsersExpression!="" && this.candidateUsersType=="candidateroleGroups"){
	    	xml=xml+'activiti:candidateGroups="'+this.candidateUsersExpression+'" '
	    }
		//xml=xml+'activiti:assignee="'+this.assigneeExpression+'" '+'activiti:candidateUsers="'+this.candidateUsersExpression+'" '+'activiti:candidateGroups="'+this.candidateGroupsExpression+'" ';
	
	if(this.bursar!=null && this.bursar !=""){
		xml=xml+'activiti:assignee="${assignee}" ';
	}

	if(this.formKey != null && this.formKey != ""){
		xml=xml+'activiti:formKey="'+this.formKey+'" ';
	}
	xml=xml+'>\n';
	return xml;
};
draw2d.UserTask.prototype.getEndElementXML=function(){
	var xml = '</userTask>\n';
	return xml;
};
draw2d.UserTask.prototype.getDocumentationXML=function(){
	var xml='<documentation>';
	xml=xml+this.bursar;
	xml=xml+'</documentation>';
	return xml;
};
draw2d.UserTask.prototype.getExtensionElementsXML=function(){
	if(""!=this.ExecuteType&&""!=this.ClassName){
		var xml = '<extensionElements>\n';
		xml= xml+' <activiti:taskListener event="'+this.ExecuteType+'"'+' class="'+this.ClassName+'"'+'>\n';
		/*xml= xml+'   <activiti:field name="'+this.MethodName+'"'+'>\n';
		xml= xml+'      <activiti:string>'+this.value+'</activiti:string>\n';
		xml= xml+'   </activiti:field>\n';*/
		xml= xml+'  </activiti:taskListener>\n';
		xml=xml+'</extensionElements>\n';
		return xml;
	}
	return "";
};
draw2d.UserTask.prototype.getListenersXML=function(){
	var xml ='';
	for(var i=0;i<this.listeners.getSize();i++){
		var listener = this.listeners.get(i);
		xml=xml+listener.toXML();
	}
	return xml;
};

draw2d.UserTask.prototype.getMultiInstanceLoopCharacteristicsXML=function(){
	this.isUseExpression=true;
	var xml = '';
	xml = xml+ '<multiInstanceLoopCharacteristics  isSequential="false"  activiti:collection="${assigneeList}" activiti:elementVariable="assignee">\n'  
	xml = xml+ '<completionCondition>${nrOfCompletedInstances >='+this.bursar+'}</completionCondition>\n'  
	xml = xml+ '</multiInstanceLoopCharacteristics>\n'  
	return xml;
};

draw2d.UserTask.prototype.getFormsXML=function(){
	var xml = '';
	for(var i=0;i<this.forms.getSize();i++){
		var form = this.forms.get(i);
		xml=xml+form.toXML();
	}
	return xml;
};
draw2d.UserTask.prototype.getPerformersBPMNXML=function(){
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
draw2d.UserTask.prototype.toXML=function(){
	var xml=this.getStartElementXML();
	xml=xml+this.getExtensionElementsXML();
	if(this.bursar!=""){
		xml=xml+this.getMultiInstanceLoopCharacteristicsXML();
	}
	xml=xml+this.getPerformersBPMNXML();
	xml=xml+this.getEndElementXML();
	return xml;
};
draw2d.UserTask.prototype.toBpmnDI=function(){
	var w=this.getWidth();
	var h=this.getHeight();
	var x=this.getAbsoluteX();
	var y=this.getAbsoluteY();
	var xml='<bpmndi:BPMNShape bpmnElement="'+this.taskId+'" id="BPMNShape_'+this.taskId+'">\n';
	xml=xml+'<omgdc:Bounds height="'+h+'" width="'+w+'" x="'+x+'" y="'+y+'"/>\n';
	xml=xml+'</bpmndi:BPMNShape>\n';
	return xml;
};