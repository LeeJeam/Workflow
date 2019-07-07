//控件组配置
var FormDateConfig = function () {
    
};
var formDateConfig = new FormDateConfig();
/**
 * 日期控件配置
 * @returns {String}
 */
FormDateConfig.prototype.content=function(){
	var html='<div class="form-group-prop" id="">'
			+'	<label class="label_property">标记</label>'
			+'	<div class="controls">'
			+'		<select id="dataRecodeFlag" onchange="formDateConfig.dataRecodeFlagEvent(this)" data-placeholder="Please choose field size"data-gv-property="groupalignment" class="form-control"selected="selected">'
			+'			<option value=""></option>'
			+'			<option value="1">设为开始时间</option>'
			+'			<option value="2">设为结束时间</option>'
			+'		</select>	'
			+'	</div>'
			+'</div>';
	html+='<div class="form-group-prop" id="">'
		+'	<label class="label_property">分组类型</label>'
		+'	<div class="controls">'
		+'  	<input type="text" id="dataRecodeType" data-gv-property="sublabel" onkeyup="formDateConfig.keyUpEvent(this)" class="form-control" placeholder="设值一样为一组">'
		+'	</div>'
		+'</div>';
	return html;
}

FormDateConfig.prototype.init=function(){

	$("#globalProperty9").html(formDateConfig.content());
	
	
}

FormDateConfig.prototype.dataRecodeFlagEvent=function(e){
	var $has=$(".hasFocus2:eq(0)");
	if($has.length>0){
		var dataRecodeFlag=$(e).val();
		if(dataRecodeFlag==""){
			$has.removeAttr("dataRecodeFlag");
		}else{
			$has.attr("dataRecodeFlag",dataRecodeFlag);
		}
		
	}
	
}
FormDateConfig.prototype.keyUpEvent=function(e){

	var $has=$(".hasFocus2:eq(0)");
	if($has.length>0){
		var dataRecodeType=$(e).val();
		
		if(dataRecodeType==""){
			$has.removeAttr("dataRecodeType");
		}else{
			$has.attr("dataRecodeType",dataRecodeType);
		}
	}
	
	
}
