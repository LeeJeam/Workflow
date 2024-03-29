draw2d.End=function(){
_url=basePath+"/UILib/plugins/plug-in/designer/icons/endevent.png";
draw2d.ResizeImage.call(this,_url);
this.rightInputPort=null;
this.leftInputPort=null;
this.topInputPort=null;
this.bottomInputPort=null;
this.resizeable=false;//不让改变大小
this.eventId='end';
this.eventName='End';
this.setDimension(30,30);
};
draw2d.End.prototype=new draw2d.Node();
draw2d.End.prototype.type="draw2d.End";
draw2d.End.prototype.generateId=function(){
	this.id="end";
	this.taskId=this.id;
};
draw2d.End.prototype.createHTMLElement=function(){
	var item = draw2d.ResizeImage.prototype.createHTMLElement.call(this);
	return item;
};
draw2d.End.prototype.setDimension=function(w, h){
	draw2d.ResizeImage.prototype.setDimension.call(this, w, h);
};
draw2d.End.prototype.setWorkflow=function(_505d){
	draw2d.ResizeImage.prototype.setWorkflow.call(this,_505d);
	if(_505d!==null&&this.rightInputPort===null){
		this.rightInputPort=new draw2d.MyInputPort();
		this.rightInputPort.setName("RightInputPort");
		this.rightInputPort.setWorkflow(_505d);
		this.rightInputPort.setBackgroundColor(new draw2d.Color(115,115,245));
		this.addPort(this.rightInputPort,this.width,this.height/2);
	}
	if(_505d!==null&&this.leftInputPort===null){
		this.leftInputPort=new draw2d.MyInputPort();
		this.leftInputPort.setName("leftInputPort");
		this.leftInputPort.setWorkflow(_505d);
		this.leftInputPort.setBackgroundColor(new draw2d.Color(115,115,245));
		this.addPort(this.leftInputPort,0,this.height/2);
	}
	if(_505d!==null&&this.topInputPort===null){
		this.topInputPort=new draw2d.MyInputPort();
		this.topInputPort.setName("RightInputPort");
		this.topInputPort.setWorkflow(_505d);
		this.topInputPort.setBackgroundColor(new draw2d.Color(115,115,245));
		this.addPort(this.topInputPort,this.width/2,0);
	}
	if(_505d!==null&&this.bottomInputPort===null){
		this.bottomInputPort=new draw2d.MyInputPort();
		this.bottomInputPort.setName("RightInputPort");
		this.bottomInputPort.setWorkflow(_505d);
		this.bottomInputPort.setBackgroundColor(new draw2d.Color(115,115,245));
		this.addPort(this.bottomInputPort,this.width/2,this.height);
	}
};
draw2d.End.prototype.figureDoubleClick=function(){
	var data = {event:this};
	var event = data.event;
	nodeid= event.getId();
	openProperties(nodeid,'eventProperties');
};
draw2d.End.prototype.getContextMenu=function(){
	if(this.workflow.disabled)return null;
	var menu =new draw2d.ContextMenu(100, 50);
	var data = {event:this};
	menu.appendMenuItem(new draw2d.ContextMenuItem("属性", "properties-icon",data,function(x,y)
	{
		var data = this.getData();
		var event = data.event;
		nodeid = event.getId();
		if(typeof openProperties != "undefined"){
			openProperties(nodeid,'eventProperties');
		}
	}));
	
	return menu;
};
draw2d.End.prototype.toXML=function(){
	var xml='<endEvent id="'+this.eventId+'" name="'+this.eventName+'">';
//	 xml+= '<extensionElements>\n';
//		xml= xml+' <activiti:executionListener event="'+this.ExecuteType+'"'+' class="'+this.ClassName+'"'+'>\n';
//		/*xml= xml+'   <activiti:field name="'+this.MethodName+'"'+'>\n';
//		xml= xml+'      <activiti:string>'+this.value+'</activiti:string>\n';
//		xml= xml+'   </activiti:field>\n';*/
//		xml= xml+'  </activiti:executionListener>\n';
//	    xml=xml+'</extensionElements>\n';
	    xml=xml+'</endEvent>\n'
	return xml;
};
draw2d.End.prototype.toBpmnDI=function(){
	var w=this.getWidth();
	var h=this.getHeight();
	var x=this.getAbsoluteX();
	var y=this.getAbsoluteY();
	var xml='<bpmndi:BPMNShape bpmnElement="'+this.eventId+'" id="BPMNShape_'+this.eventId+'">\n';
	xml=xml+'<omgdc:Bounds height="'+h+'" width="'+w+'" x="'+x+'" y="'+y+'"/>\n';
	xml=xml+'</bpmndi:BPMNShape>\n';
	return xml;
};
