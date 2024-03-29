draw2d.ParallelGateway=function(){
	var _url=basePath+"/UILib/plugins/plug-in/designer/icons/gateway.parallel.png";
	draw2d.ResizeImage.call(this,_url);
	this.rightOutputPort=null;
	this.leftOutputPort=null;
	this.topOutputPort=null;
	this.bottomOutputPort=null;
	this.gatewayId=null;
	this.gatewayName=null;
	this.setDimension(40,40);
};

draw2d.ParallelGateway.prototype=new draw2d.Node();
draw2d.ParallelGateway.prototype.type="draw2d.ParallelGateway";
draw2d.ParallelGateway.prototype.generateId=function(){
	this.id="P"+Sequence.create();
	this.gatewayId=this.id;
	this.gatewayName=this.id;
};
draw2d.ParallelGateway.prototype.createHTMLElement=function(){
	var item = draw2d.ResizeImage.prototype.createHTMLElement.call(this);
	return item;
};
draw2d.ParallelGateway.prototype.setDimension=function(w, h){
	draw2d.ResizeImage.prototype.setDimension.call(this, w, h);
};
draw2d.ParallelGateway.prototype.setWorkflow=function(_4fe5){
	draw2d.ResizeImage.prototype.setWorkflow.call(this,_4fe5);
	this.resizeable=false;//不让改变大小
	if(_4fe5!==null&&this.rightOutputPort===null){
		this.rightOutputPort=new draw2d.MyOutputPort();
		this.rightOutputPort.setMaxFanOut(1);
		this.rightOutputPort.setWorkflow(_4fe5);
		this.rightOutputPort.setName("rightOutputPort");
		//this.rightOutputPort.setBackgroundColor(new draw2d.Color(245,115,115));
		this.addPort(this.rightOutputPort,this.width,this.height/2);
	}
	if(_4fe5!==null&&this.leftOutputPort===null){
		this.leftOutputPort=new draw2d.MyOutputPort();
		this.leftOutputPort.setMaxFanOut(1);
		this.leftOutputPort.setWorkflow(_4fe5);
		this.leftOutputPort.setName("leftOutputPort");
		//this.leftOutputPort.setBackgroundColor(new draw2d.Color(245,115,115));
		this.addPort(this.leftOutputPort,0,this.height/2);
	}
	if(_4fe5!==null&&this.topOutputPort===null){
		this.topOutputPort=new draw2d.MyOutputPort();
		this.topOutputPort.setMaxFanOut(1);
		this.topOutputPort.setWorkflow(_4fe5);
		this.topOutputPort.setName("topOutputPort");
		//this.topOutputPort.setBackgroundColor(new draw2d.Color(245,115,115));
		this.addPort(this.topOutputPort,this.width/2,0);
	}
	if(_4fe5!==null&&this.bottomOutputPort===null){
		this.bottomOutputPort=new draw2d.MyOutputPort();
		this.bottomOutputPort.setMaxFanOut(1);
		this.bottomOutputPort.setWorkflow(_4fe5);
		this.bottomOutputPort.setName("bottomOutputPort");
		//this.bottomOutputPort.setBackgroundColor(new draw2d.Color(245,115,115));
		this.addPort(this.bottomOutputPort,this.width/2,this.height);
	}
};

draw2d.ParallelGateway.prototype.figureDoubleClick=function(){
	var data = {event:this};
	var event = data.event;
	nodeid = event.getId();
	openProperties(nodeid,'gatewayProperties');
};
draw2d.ParallelGateway.prototype.getContextMenu=function(){
	if(this.workflow.disabled)return null;
	var menu =new draw2d.ContextMenu(100, 50);
	var data = {event:this};
	menu.appendMenuItem(new draw2d.ContextMenuItem("Properties", "properties-icon",data,function(x,y)
	{
		var data = this.getData();
		var event = data.event;
		nodeid = event.getId();
		if(typeof openProperties != "undefined"){
			openProperties(nodeid,'gatewayProperties');
		}
	}));
	
	return menu;
};
draw2d.ParallelGateway.prototype.toXML=function(){
	var name = this.gatewayId;
	var newName = trim(this.gatewayName);
	if(newName != null && newName != "")
		name = newName;
	var xml='<parallelGateway id="'+this.gatewayId+'" name="'+name+'"></parallelGateway>\n';
	return xml;
};
draw2d.ParallelGateway.prototype.toBpmnDI=function(){
	var w=this.getWidth();
	var h=this.getHeight();
	var x=this.getAbsoluteX();
	var y=this.getAbsoluteY();
	var xml='<bpmndi:BPMNShape bpmnElement="'+this.gatewayId+'" id="BPMNShape_'+this.gatewayId+'">\n';
	xml=xml+'<omgdc:Bounds height="'+h+'" width="'+w+'" x="'+x+'" y="'+y+'"/>\n';
	xml=xml+'</bpmndi:BPMNShape>\n';
	return xml;
};	
