//控件组配置
var FormControlGroupConfig = function () {
    
};
var formControlGroupConfig = new FormControlGroupConfig();
/**
 * 控件组的配置信息的内容
 * @returns {String}
 */
FormControlGroupConfig.prototype.content=function(){
	var html='<div class="form-group-prop" id="">'
			+'	<label class="label_property">表名</label>'
			+'	<div class="controls">'
			+'		<select id="formControlGroupTableName" onchange="formControlGroupConfig.otherTableChangeEvent(this)" data-placeholder="Please choose field size"data-gv-property="groupalignment" class="form-control"selected="selected">'
			+'			<option value=""></option>'
			+'		</select>	'
			+'	</div>'
			+'</div>';
	html+='<div class="form-group-prop" id="">'
		+'	<label class="label_property">表字段</label>'
		+'	<div class="controls">'
		+'		<select id="formControlGroupTableColumn" onchange="formControlGroupConfig.otherTableColumnChangeEvent(this)" data-placeholder="Please choose field size"data-gv-property="groupalignment" class="form-control"selected="selected">'
		+'			<option value=""></option>'
		+'		</select>	'
		+'	</div>'
		+'</div>';
	return html;
}
/**
 * 控件组配置信息的初始化
 * @param pid
 */
FormControlGroupConfig.prototype.init=function(pid){

	$("#globalProperty8").html(formControlGroupConfig.content());
	formControlGroupConfig.otherTableInitValue(pid);
	
}
/**
 * 表名的初始化
 * @param pid
 */
FormControlGroupConfig.prototype.otherTableInitValue=function(pid){
	$.post(basePath+"/form/seleteSysByPid.htm", {pid:pid,flag:6}, function(data){
		var html='<option value=""></option>';
		if(data!=null&&data.length>0){
			for(var i=0;i<data.length;i++){
				html+='<option type="'+(data[i].tableType==null?"":data[i].tableType)+'" ref="'+data[i].id+'" value="'+data[i].table_name+'">'+data[i].table_alias+'</option>'
			}
		}
		$("#formControlGroupTableName").html(html);
	},"json");
}
/**
 * 表名的改变事件
 */
FormControlGroupConfig.prototype.otherTableChangeEvent=function(e){
	var value=$(e).val();
	
	$.post(basePath+"/form/getdata.htm", {id:$(e).find("option:selected").attr("ref")}, function(data){
		var html='<option value=""></option>';
		if(data!=null&&data.length>0){
			for(var i=0;i<data.length;i++){
				if(data[i].filed_name!="guanlianshujuid"&&data[i].filed_name!="shujuleixing"){
					html+='<option value="'+data[i].filed_name+'">'+data[i].column_alias+'</option>';
				}
				
			}
		}
		$("#formControlGroupTableColumn").html(html);
		$("#formControlGroupTableColumn").val($(".hasFocus2:eq(0)").attr("formcontrolgrouptablecolumn"));
		$(".hasFocus2:eq(0)").attr("formcontrolgrouptablecolumn",$("#formControlGroupTableColumn").val());
		$(".hasFocus2:eq(0)").attr("formcontrolgrouptablename",value);
		$(".hasFocus2:eq(0)").parents(".formControlGroup:eq(0)").find("input,select,textarea").attr("formcontrolgrouptablename",value);
		
	},"json");
}
/**
 * 表字段的改变事件
 */
FormControlGroupConfig.prototype.otherTableColumnChangeEvent=function(e){
	var value=$(e).val();
	
	$(".hasFocus2:eq(0)").attr("formcontrolgrouptablecolumn",value);
	$(".hasFocus2:eq(0)").attr("formcontrolgrouptablename",$("#formControlGroupTableName").val());
	
	
	
	var $this=$(e);
	var $focus=$(".hasFocus2:eq(0)");
	var value=$this.val();
	var text=$this.find("option:selected").text();
	if($focus.length>0){//含有选中
		var type=$focus.attr("data-role");
		if(type=="button"||type=="radio"||type=="checkbox"){
			if(type!="button"){
				$focus.prev(".control-label").find("srtong").text(text); 
				$focus.find("input").removeAttr("name").attr("formcontrolgrouptablecolumn",value).attr("formcontrolgrouptablename",$("#formControlGroupTableName").val());
				$('#testlabel').val(text);
			}
			return;
		}else{
			//下拉框属性
			if(type=="userbox"||type=="text"){
				$focus.parent().parent().prev("label:eq(0)").find("srtong").text(text); 
			}else{
				$focus.parent().prev("label:eq(0)").find("srtong").text(text); 
			}
		    
		    $focus.removeAttr("name");
		    if(value=="password"){
		    	$focus.attr("type","password");
		    }
			$('#testlabel').val(text);
		}
		
	    
	} 
}