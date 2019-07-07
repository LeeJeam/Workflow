/**
 * Created by Administrator on 2016/7/6.
 */
function SelectControlProperty(pid,selector){
	var $this=this;
	this.dataBaseConfig={
			content: ' <div class="row itemSet" style="display: none">'
					+'<div class="form-group-prop" id="otherTableDiv">'
					+'	<label class="label_property">表名</label>'
					+'	<div class="controls">'
					+'		<select id="otherTable"  data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
					+'			<option value=""></option>'
					+'		</select>'
					+'	</div>'
					+'</div>'
					+'<div class="form-group-prop" id="">'
					+'	<label class="label_property">表字段</label>'
					+'	<div class="controls">'
					+'		<select id="otherTableColumn" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
					+'			<option value=""></option>'
					+'		</select>'
					+'	</div>'
					+'</div>'
					+'<div class="form-group-prop" id="">'
					+'	<label class="label_property">等级</label>'
					+'	<div class="controls">'
					+'		<select id="level_select" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
					+'			<option value=""></option>'
					+'			<option value="1">1级</option>'
					+'			<option value="2">2级</option>'
					+'			<option value="3">3级</option>'
					+'		</select>'
					+'	</div>'
					+'</div>'
					+'<div class="text-center">'
					+'	<button class="btn btn-primary btn-xs" id="bindtableBtn">绑定</button>'
					+'	<button class="btn btn-primary btn-xs" id="unbindtableBtn">撤消绑定</button>'
					+'</div>'
					+'<div class="prop-mg-lr col-md-12" id="endit-itme-div">'
					+'	<div class="form-group-prop">'
					+'		<label class="label_property" style="width: 100%; clear: both;">输入选项</label>'
					+'		<div class="controls" id="commSetItems" style="float: none; width: 91%;">'
					+'		</div>'
					+'		<div class="text-center">'
					+'			<button class="btn btn-primary btn-xs" id="setAddItemBtn" >新增一项</button>'
					+'			<button class="btn btn-primary btn-xs" id="addItemsBtn">保存</button>'
					+'		</div>'
					+'	</div>'
					+'</div>'
					+'</div>',
			otherTableChangeEvent:function(){
				var value=$(this).find("option:selected").attr("ref");
				if($(this).find("option:selected").attr("type")=="4"){
					$("#level_select").parent().show().prev().show();
				}else{
					$("#level_select").val("").parent().hide().prev().hide();
				}
				$.post(basePath+"/form/getdata.htm", {id:value}, function(data){
					var html='<option value=""></option>';
					if(data!=null&&data.length>0){
						for(var i=0;i<data.length;i++){
							html+='<option value="'+data[i].filed_name+'">'+data[i].column_alias+'</option>'
						}
					}
					$("#otherTableColumn").html(html);
					$("#otherTableColumn").val($(".hasFocus2:eq(0)").attr("otherTableColumn"));
				},"json");
			},
			otherTableInitValue:function(){
				$.post(basePath+"/form/seleteSysByPid.htm", {pid:pid}, function(data){
					var html='<option value=""></option>';
					if(data!=null&&data.length>0){
						for(var i=0;i<data.length;i++){
							html+='<option type="'+(data[i].tableType==null?"":data[i].tableType)+'" ref="'+data[i].id+'" value="'+data[i].table_name+'">'+data[i].table_alias+'</option>'
						}
					}
					$("#otherTable").html(html);
				},"json");
			}
	}
	this.writeConfigItems={
			content: ''
			
	}
	this.setAddItem=function(){
		var html=sethtml("","");
		$("#commSetItems").append(html);
	}
	this.addItems=function(){
		$this.unbindtable();
		var html='';
		var seletor='';
		var en=$(".hasFocus2:eq(0)");
		
		var name=en.find("input:eq(0)").attr("name");
		var required = $('#valid-isWrite').val();
		var $required = '';
		if($.isDefined(required) && required == 1) {
			$required = 'required'
		}
		$("#commSetItems").find(".row").each(function(){
			var v=$(this);
			if(en.attr("data-role")=="checkbox"){
				seletor='.checkbox';
				html+='<div class="checkbox" ref="checkbox" ><label><input '+$required+' name="'+name+'" value="'+v.find(".itemValue").val()+'" type="checkbox"> <span>'+v.find(".itemValueDescription").val()+' </span></label></div>';
				
			}else if(en.attr("data-role")=="radio"){
				seletor='.radio';
				html+='<div class="radio" ref="radio" ><label><input '+$required+' type="radio" name="'+name+'" value="'+v.find(".itemValue").val()+'" ><span>'+v.find(".itemValueDescription").val()+'</span></label></div>';
				
			}else if(en.attr("data-role")=="select"){
				html+='<option value="'+v.find(".itemValue").val()+'">'+v.find(".itemValueDescription").val()+'</option>'
			}
		});
		
		en.empty().append(html);
		CheckboxRadioControl.prototype.getRightCofigHtmlBlock.call(arguments,en.attr('data-role'));
	}
	this.sethtml=function(value,description){
		var html='<div class="row setitemrow" >'
			+'<div class="col-md-6" style="padding-right: 0px; padding-left: 0px;">'
	        +	'<input type="text" class="itemValueDescription form-control" data-gv-property="sublabel" value="'+value+'" placeholder="选项描述" >'
			+'</div>'
			+'<div class="col-md-4" style="padding-right: 0px;">'
	         +	'<input type="text" class="itemValue form-control" data-gv-property="sublabel" value="'+description+'"  placeholder="选项值" >'
			+'</div>'
			+'<div class="col-md-2" style="padding-right: 0px;">'
			+	'<div class="input-group-addon" id="deleteItems" style="width: 100%; height: 34px; border: 1px solid #d2d6de; background: #fff; cursor: pointer;">'
	         +     '<i class="fa fa-minus-circle" ></i>'
	          + ' </div>'
			+'</div>'
		+'</div>';
		return html;
	}
	this.bindtable=function(){
		$("#endit-itme-div").hide();
		 $(".hasFocus2:eq(0)").attr("otherTableName",$("#otherTable").val());
		 $(".hasFocus2:eq(0)").attr("otherTableColumn",$("#otherTableColumn").val());
		 $(".hasFocus2:eq(0)").removeAttr("flag");
		 $(".hasFocus2:eq(0)").attr("levelSelect",$("#level_select").val());
	}
	this.unbindtable=function(){
		$("#endit-itme-div").show();
		$(".hasFocus2:eq(0)").removeAttr("flag");
		$(".hasFocus2:eq(0)").removeAttr("otherTableName");
		$(".hasFocus2:eq(0)").removeAttr("otherTableColumn");
		$(".hasFocus2:eq(0)").removeAttr("levelSelect");
		$("#otherTable,#otherTableColumn").val("");
	}
	this.deleteItems=function(){
		if($(this).parent().parent().siblings().length==0){
			alert("至少留一项");
		}else{
			$(this).parent().parent().remove();
		}
	}
	this.initValue=function(){
		var html=$this.dataBaseConfig.content;
		html+=$this.writeConfigItems.content;
		$("#"+selector).html(html);
		$this.dataBaseConfig.otherTableInitValue();
		$("#otherTable").change($this.dataBaseConfig.otherTableChangeEvent);
		$("#bindtableBtn").click($this.bindtable);
		$("#unbindtableBtn").click($this.unbindtable);
		$("#setAddItemBtn").click($this.setAddItem);
		$("#addItemsBtn").click($this.addItems);
		
	}
	
}