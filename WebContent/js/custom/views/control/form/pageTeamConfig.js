var PageTeamConfig = function () {
	
	
};

var pageTeamConfig = new PageTeamConfig();




/**
 * 配页面块属性内容
 */
PageTeamConfig.prototype.content=function (){
	var c='<div class="row" id="">	'
		 +'  	   <div class="prop-mg-lr col-md-12">	'	
		 +'		<div class="form-group-prop">	'		
		 +'				<label class="label_property">页面块标题</label>	'		
		 +'				<div class="controls">			'	
		 +'				<input type="text" id="pageTeamTitleInput" data-gv-property="sublabel" onkeyup="pageTeamConfig.titleEvent(this)" class="form-control" placeholder="Label">	'		
		 +'			</div>		'
		 +'		</div>	'
		 +'	</div>'
		 +'</div>'
		 +'<div class="row" id="">	'
		 +'<div class="prop-mg-lr col-md-12">		'
		 +'	<div class="form-group-prop">		'	
		 +'		<label class="label_property">是否显示</label>		'	
		 +'		<div class="controls">			'
		 +'			<select id="pageTeamShow" onchange="pageTeamConfig.isShowEvent(this)" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">				<option value="1">是</option>				<option value="2">否</option>			</select>'		
		 +'			</div>		'
		 +'	</div>	'
		 +'</div>'
		 +'</div>'
		 +'<div class="row" id="">	'
		 +'<div class="prop-mg-lr col-md-12">		'
		 +'	<div class="form-group-prop">		'	
		 +'		<label class="label_property">唯一标识</label>		'	
		 +'		<div class="controls">			'
		 +'				<input type="text" id="pageOnlyFlag" data-gv-property="sublabel" readonly="readonly" class="form-control" placeholder="Label">	'		
		 +'			</div>		'
		 +'	</div>	'
		 +'</div>'
		 +'</div>'
	return c;
}
PageTeamConfig.prototype.titleEvent=function (e){
	$(".pageTeam:eq(0)").prev("h3").text($(e).val());
}
PageTeamConfig.prototype.isShowEvent=function (e){
	$(".pageTeam:eq(0)").parent().attr("isshow",$(e).val());
}
PageTeamConfig.prototype.init=function (){
	$("#globalProperty10").html(pageTeamConfig.content());
}