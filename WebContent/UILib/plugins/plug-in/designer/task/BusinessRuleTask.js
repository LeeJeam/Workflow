draw2d.BusinessRuleTask=function(){
	draw2d.Task.call(this);
	this.setTitle("业务规则任务");
	this.setIcon();
};
draw2d.BusinessRuleTask.prototype=new draw2d.Task();
draw2d.BusinessRuleTask.prototype.type="draw2d.BusinessRuleTask";
draw2d.BusinessRuleTask.newInstance=function(businessRuleTaskXMLNode){
	var task = new draw2d.ReceiveTask();
	task.id=businessRuleTaskXMLNode.attr('id');
	task.taskId=businessRuleTaskXMLNode.attr('id');
	return task;
};
draw2d.BusinessRuleTask.prototype.setWorkflow=function(_5019){
	draw2d.Task.prototype.setWorkflow.call(this,_5019);
};
draw2d.BusinessRuleTask.prototype.getContextMenu=function(){
	var menu = draw2d.Task.prototype.getContextMenu.call(this);
  return menu;
};
draw2d.BusinessRuleTask.prototype.setIcon = function(){
	var icon=draw2d.Task.prototype.setIcon.call(this);
	icon.className="business-rule-task-icon";
};
draw2d.BusinessRuleTask.prototype.getStartElementXML=function(){
	var name = this.taskId;
	var xml='<businessRuleTask id="'+this.taskId+'" activiti:ruleVariablesInput="'+this.rulesInput+'" activiti:resultVariables="'+this.rulesOutputs+'"';
		if(this.isclude=='include'){
			xml=xml+' activiti:rules="'+this.rules+'"';
		}else if(this.isclude=='exclude'){
			xml=xml+' activiti:rules="'+this.rules+'" exclude="true"';
		}
		xml=xml+'>\n';
	return xml;
};
draw2d.BusinessRuleTask.prototype.getEndElementXML=function(){
	var xml = '</businessRuleTask>\n';
	return xml;
};

draw2d.BusinessRuleTask.prototype.figureDoubleClick=function(){
	var data = {event:this};
	var event = data.event;
	var tid = event.getId();
	openProperties(tid,'businessRuleTaskProperties');
};

draw2d.BusinessRuleTask.prototype.getContextMenu=function(){
	if(this.workflow.disabled)return null;
	var menu =new draw2d.ContextMenu(100, 50);
	var data = {task:this};
	menu.appendMenuItem(new draw2d.ContextMenuItem("属性", "properties-icon",data,function(x,y)
	{
		var data = this.getData();
		var task = data.task;
		var tid = task.getId();
		if(typeof openBusinessRuleTaskProperties != "undefined"){
			openProperties(tid,'businessRuleTaskProperties');
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

draw2d.BusinessRuleTask.prototype.toXML=function(){
	var xml=this.getStartElementXML();
	xml=xml+this.getEndElementXML();
	return xml;
};
draw2d.BusinessRuleTask.prototype.toBpmnDI=function(){
	var w=this.getWidth();
	var h=this.getHeight();
	var x=this.getAbsoluteX();
	var y=this.getAbsoluteY();
	var xml='<bpmndi:BPMNShape bpmnElement="'+this.taskId+'" id="BPMNShape_'+this.taskId+'">\n';
	xml=xml+'<omgdc:Bounds height="'+h+'" width="'+w+'" x="'+x+'" y="'+y+'"/>\n';
	xml=xml+'</bpmndi:BPMNShape>\n';
	return xml;
};