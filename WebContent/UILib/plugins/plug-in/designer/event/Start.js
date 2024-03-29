draw2d.Start=function(){
	var _url=basePath+"/UILib/plugins/plug-in/designer/icons/startevent.png";
	draw2d.ResizeImage.call(this,_url);
	this.rightOutputPort=null;
	this.leftOutputPort=null;
	this.topOutputPort=null;
	this.resizeable=false;//不让改变大小
	this.bottomOutputPort=null;
	this.eventId='start1';
	this.eventName='Start1';
	this.expression='applyUserId';
	this.setDimension(30,30);
};
draw2d.Start.prototype=new draw2d.Node();
draw2d.Start.prototype.type="draw2d.Start";
draw2d.Start.prototype.generateId=function(){
	this.id="start1";
	this.eventId=this.id;
};
draw2d.Start.prototype.createHTMLElement=function(){
	var item = draw2d.ResizeImage.prototype.createHTMLElement.call(this);
	return item;
};
draw2d.Start.prototype.setDimension=function(w, h){
	draw2d.ResizeImage.prototype.setDimension.call(this, w, h);
};
draw2d.Start.prototype.setWorkflow=function(_4fe5){
	draw2d.ResizeImage.prototype.setWorkflow.call(this,_4fe5);
	if(_4fe5!==null&&this.rightOutputPort===null){
		this.rightOutputPort=new draw2d.MyOutputPort();
		this.rightOutputPort.setMaxFanOut(1);
		this.rightOutputPort.setWorkflow(_4fe5);
		this.rightOutputPort.setName("rightOutputPort");
		this.rightOutputPort.setBackgroundColor(new draw2d.Color(245,115,115));//定义连接点的颜色
		this.addPort(this.rightOutputPort,this.width,this.height/2);
	}
	if(_4fe5!==null&&this.leftOutputPort===null){
		this.leftOutputPort=new draw2d.MyOutputPort();
		this.leftOutputPort.setMaxFanOut(1);
		this.leftOutputPort.setWorkflow(_4fe5);
		this.leftOutputPort.setName("leftOutputPort");
		this.leftOutputPort.setBackgroundColor(new draw2d.Color(245,115,115));
		this.addPort(this.leftOutputPort,0,this.height/2);
	}
	if(_4fe5!==null&&this.topOutputPort===null){
		this.topOutputPort=new draw2d.MyOutputPort();
		this.topOutputPort.setMaxFanOut(1);
		this.topOutputPort.setWorkflow(_4fe5);
		this.topOutputPort.setName("topOutputPort");
		this.topOutputPort.setBackgroundColor(new draw2d.Color(245,115,115));
		this.addPort(this.topOutputPort,this.width/2,0);
	}
	if(_4fe5!==null&&this.bottomOutputPort===null){
		this.bottomOutputPort=new draw2d.MyOutputPort();
		this.bottomOutputPort.setMaxFanOut(1);
		this.bottomOutputPort.setWorkflow(_4fe5);
		this.bottomOutputPort.setName("bottomOutputPort");
		this.bottomOutputPort.setBackgroundColor(new draw2d.Color(245,115,115));
		this.addPort(this.bottomOutputPort,this.width/2,this.height);
	}
};
draw2d.Start.prototype.figureDoubleClick=function(){
	var data = {event:this};
	var event = data.event;
	nodeid= event.getId();
	openProperties(nodeid,'eventProperties');
};
draw2d.Start.prototype.getContextMenu=function(){
	
	if(this.workflow.disabled)return null;
	var menu =new draw2d.ContextMenu(100, 50);
	var data = {event:this};
	menu.appendMenuItem(new draw2d.ContextMenuItem("属性", "properties-icon",data,function(x,y)
	{
		var data = this.getData();
		var event = data.event;
		nodeid= event.getId();
		if(typeof openProperties != "undefined"){
			openProperties(nodeid,'eventProperties');
		}
	}));
	
	return menu;
};
draw2d.Start.prototype.toXML=function(){
	var xml='<startEvent id="'+this.eventId+'" name="'+this.eventName+'" activiti:initiator="'+this.expression+'">';
//	 xml+= '<extensionElements>\n';
//	xml= xml+' <activiti:executionListener event="'+this.ExecuteType+'"'+' class="'+this.ClassName+'"'+'>\n';
//	/*xml= xml+'   <activiti:field name="'+this.MethodName+'"'+'>\n';
//	xml= xml+'      <activiti:string>'+this.value+'</activiti:string>\n';
//	xml= xml+'   </activiti:field>\n';*/
//	xml= xml+'  </activiti:executionListener>\n';
//    xml=xml+'</extensionElements>\n';
    xml=xml+'</startEvent>\n'
	return xml;
};
draw2d.Start.prototype.toBpmnDI=function(){
	var w=this.getWidth();
	var h=this.getHeight();
	var x=this.getAbsoluteX();
	var y=this.getAbsoluteY();
	var xml='<bpmndi:BPMNShape bpmnElement="'+this.eventId+'" id="BPMNShape_'+this.eventId+'">\n';
	xml=xml+'<omgdc:Bounds height="'+h+'" width="'+w+'" x="'+x+'" y="'+y+'"/>\n';
	xml=xml+'</bpmndi:BPMNShape>\n';
	return xml;
};	
