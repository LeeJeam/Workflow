/**
 * 节点连线
 */
draw2d.DecoratedConnection=function(){
	draw2d.Connection.call(this);
	var decorator = new draw2d.ArrowConnectionDecorator();
	var black = new draw2d.Color(0,0,0);
	decorator.setBackgroundColor(black);
	this.setTargetDecorator(decorator);
	this.setRouter(new draw2d.ManhattanConnectionRouter());
	this.setLineWidth(1);
	this.setColor(black);
	this.lineId=null;
	this.lineName=null;
	this.condition=null;
	this.listeners=new draw2d.ArrayList();
	this.label=null;
};
draw2d.DecoratedConnection.prototype=new draw2d.Connection();
draw2d.DecoratedConnection.prototype.type="DecoratedConnection";
draw2d.DecoratedConnection.prototype.getConditionXML=function(){
	var xml = '';
	if(this.condition != null&&this.condition!=''){
		xml = '<conditionExpression xsi:type="tFormalExpression"><![CDATA['+this.condition+']]></conditionExpression>\n';
	}
	return xml;
}
draw2d.DecoratedConnection.prototype.toXML=function(){
	var sourceId = null;
	var type=this.getSource().getParent().type;
	if(type=='draw2d.Start'){
		sourceId = this.getSource().getParent().eventId;
	}	
	else if(type=='draw2d.ExclusiveGateway'){
		sourceId = this.getSource().getParent().gatewayId;
	}else if(type=='draw2d.ParallelGateway'){
		sourceId = this.getSource().getParent().gatewayId;
	}else if(type=='draw2d.TimerBoundary'){
		sourceId = this.getSource().getParent().boundaryId;
	}else if(type=='draw2d.ErrorBoundary'){
		sourceId = this.getSource().getParent().boundaryId;
	}else if(type=='draw2d.CallActivity'){
		sourceId = this.getSource().getParent().subProcessId;
	}else{
		sourceId = this.getSource().getParent().taskId;
	}
	var targetId = null;
	type=this.getTarget().getParent().type;
	if(type=='draw2d.End'){
		targetId = this.getTarget().getParent().eventId;
	}else if(type=='draw2d.ExclusiveGateway'){
		targetId = this.getTarget().getParent().gatewayId;
	}else if(type=='draw2d.ParallelGateway'){
		targetId = this.getTarget().getParent().gatewayId;
	}else if(type=='draw2d.TimerBoundary'){
		targetId = this.getTarget().getParent().boundaryId;
	}else if(type=='draw2d.ErrorBoundary'){
		targetId = this.getTarget().getParent().boundaryId;
	}else if(type=='draw2d.CallActivity'){
		targetId = this.getTarget().getParent().subProcessId;
	}else{
		targetId = this.getTarget().getParent().taskId;
	}
	var name="";
	var lineName = trim(this.lineName);
	if(lineName != null && lineName != "")
		name = lineName;
	var xml = '<sequenceFlow id="'+this.lineId+'" name="'+name+'" sourceRef="'+sourceId+'" targetRef="'+targetId+'">\n';
	xml = xml+this.getConditionXML();
	xml+=this.getListenersXML();
	xml = xml+'</sequenceFlow>\n';
	return xml;
};
draw2d.DecoratedConnection.prototype.setLabel=function(text){
	if(this.label == null){
		this.label=new draw2d.Label(text);
		this.label.setFontSize(8);
		this.label.setAlign("center");
		//this.label.setBackgroundColor(new draw2d.Color(230,230,250));
		//this.label.setBorder(new draw2d.LineBorder(1));
		this.addFigure(this.label,new draw2d.ManhattanMidpointLocator(this));
	}else{
		this.label.setText(text);
	}
};
draw2d.DecoratedConnection.prototype.toBpmnDI=function(){
	var xml='<bpmndi:BPMNEdge bpmnElement="'+this.lineId+'" id="BPMNEdge_'+this.lineId+'">\n';
//	var startX = this.getSource().getAbsoluteX();
//	var startY = this.getSource().getAbsoluteY();
//	var endX = this.getTarget().getAbsoluteX();
//	var endY = this.getTarget().getAbsoluteY();
	var points=this.getPoints();
	for(var i=0;i<points.size;i++){
		xml=xml+'<omgdi:waypoint x="'+points.get(i).x+'" y="'+points.get(i).y+'" />\n';
	}
	xml=xml+'</bpmndi:BPMNEdge>\n';
	return xml;
};
draw2d.DecoratedConnection.prototype.onDoubleClick=function(){
	nodeid= this.getId();
	openProperties(nodeid,'flowProperties');
};
draw2d.DecoratedConnection.prototype.getContextMenu=function(){
	if(this.workflow.disabled)return null;
	var menu =new draw2d.ContextMenu(100, 50);
	var data = {line:this};
	menu.appendMenuItem(new draw2d.ContextMenuItem("属性", "properties-icon",data,function(x,y)
	{
		var data = this.getData();
		var line = data.line;
		nodeid = line.getId();
		if(typeof openFlowProperties != "undefined"){
			openProperties(nodeid,'flowProperties');
		}
	}));
	menu.appendMenuItem(new draw2d.ContextMenuItem("删除", "icon-remove",data,function(x,y)
	{
		var data = this.getData();
		var line = data.line;
		var lid = line.getId();
		var wf = line.getWorkflow();
		wf.getCommandStack().execute(new draw2d.CommandDelete(line));
		//wf.removeFigure(line);
	}));
	
	return menu;
};
draw2d.DecoratedConnection.prototype.getListenersXML=function(){
//	var xml = '';
//	var xml = '<extensionElements>\n';
//	xml= xml+' <activiti:executionListener event="'+this.ExecuteType+'"'+' class="'+this.ClassName+'"'+'>\n';
//	/*xml= xml+'   <activiti:field name="'+this.MethodName+'"'+'>\n';
//	xml= xml+'      <activiti:string>'+this.value+'</activiti:string>\n';
//	xml= xml+'   </activiti:field>\n';*/
//	xml= xml+'  </activiti:executionListener>\n';
//     xml=xml+'</extensionElements>\n';
//	return xml;
	
	var xml = '';
	for(var i=0;i<this.listeners.getSize();i++){
		var listener = this.listeners.get(i);
		xml=xml+listener.toXML();
	}
	return xml;
};
draw2d.DecoratedConnection.prototype.getListener=function(id){
	for(var i=0;i<this.listeners.getSize();i++){
		var listener = this.listeners.get(i);
		if(listener.getId()=== id){
			return listener;
		}
	}
};
draw2d.DecoratedConnection.prototype.deleteListener=function(id){
	var listener = this.getListener(id);
	this.listeners.remove(listener);
};
draw2d.DecoratedConnection.prototype.setListener=function(listener){
	this.listeners.add(listener);
};