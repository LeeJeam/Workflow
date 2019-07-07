draw2d.ReceiveTask=function(){
	draw2d.Task.call(this);
	this.setTitle("接收任务");
	this.setIcon();
};
draw2d.ReceiveTask.prototype=new draw2d.Task();
draw2d.ReceiveTask.prototype.type="draw2d.ReceiveTask";
draw2d.ReceiveTask.newInstance=function(receiveTaskXMLNode){
	var task = new draw2d.ReceiveTask();
	task.id=receiveTaskXMLNode.attr('id');
	task.taskId=receiveTaskXMLNode.attr('id');
	task.taskName=scriptTaskXMLNode.attr('name');
	task.setContent(scriptTaskXMLNode.attr('name'));
	return task;
};
draw2d.ReceiveTask.prototype.setWorkflow=function(_5019){
	draw2d.Task.prototype.setWorkflow.call(this,_5019);
};
draw2d.ReceiveTask.prototype.getContextMenu=function(){
	var menu = draw2d.Task.prototype.getContextMenu.call(this);
  return menu;
};
draw2d.ReceiveTask.prototype.setIcon = function(){
	var icon=draw2d.Task.prototype.setIcon.call(this);
	icon.className="receive-task-icon";
};
draw2d.ReceiveTask.prototype.getStartElementXML=function(){
	var name = this.taskId;
	var taskName = trim(this.taskName);
	if(taskName != null && taskName != "")
		name = taskName;
	var xml='<receiveTask id="'+this.taskId+'" name="'+name+'">\n';
	return xml;
};
draw2d.ReceiveTask.prototype.getEndElementXML=function(){
	var xml = '</receiveTask>\n';
	return xml;
};

draw2d.ReceiveTask.prototype.figureDoubleClick=function(){
	var data = {event:this};
	var event = data.event;
	var tid = event.getId();
	openProperties(tid,'receiveTaskProperties');
};

draw2d.ReceiveTask.prototype.getContextMenu=function(){
	if(this.workflow.disabled)return null;
	var menu =new draw2d.ContextMenu(100, 50);
	var data = {task:this};
	menu.appendMenuItem(new draw2d.ContextMenuItem("属性", "properties-icon",data,function(x,y)
	{
		var data = this.getData();
		var task = data.task;
		var tid = task.getId();
		if(typeof openProperties != "undefined"){
			openProperties(tid,'receiveTaskProperties');
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

draw2d.ReceiveTask.prototype.toXML=function(){
	var xml=this.getStartElementXML();
	xml=xml+this.getEndElementXML();
	return xml;
};
draw2d.ReceiveTask.prototype.toBpmnDI=function(){
	var w=this.getWidth();
	var h=this.getHeight();
	var x=this.getAbsoluteX();
	var y=this.getAbsoluteY();
	var xml='<bpmndi:BPMNShape bpmnElement="'+this.taskId+'" id="BPMNShape_'+this.taskId+'">\n';
	xml=xml+'<omgdc:Bounds height="'+h+'" width="'+w+'" x="'+x+'" y="'+y+'"/>\n';
	xml=xml+'</bpmndi:BPMNShape>\n';
	return xml;
};