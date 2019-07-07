var en="";
var commSet={};
/**
 * 创建表
 * @param tableName  表名
 * @param jsonparam  列属性JSON集合
 */
function getTableStructure(){
	$.ajax({
		type:"post",
		url:basePath+"/structureTable/findTableByPId.htm",
		data:{"projectTableId":projectTableId},
		dataType:"json",
		success:function(data){
			if(data!=null){
				var length=data.length;
				if(length>0){
					var html="";
					$("#add").attr("table-name",data[0].table_name);
					for(var i=0;i<length;i++){
						html+='<option value="'+data[i].filed_name+'">'+data[i].column_alias+'</option>';
					}
					$("#test-table").append(html);
				}
			}
		}
	});
}
function labelSelect(e){
	$(e).val()
	var label=$(".hasFocus").find("label");
	var oldc=$(".hasFocus").find("label").attr("ref");
	
}
function controlSelect(e){
	
}
/**
 * 公共控件的选中操作是否隐藏相关的选项
 * @param flag
 */
function commConfigPropertyFun(flag){
	var selector="#controlEvent,#baseConfigProperty,#controlCSS";
	if(flag){
		
		$("#dataSource").show().prev().show().find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
	}
	$(selector).prev().show().find("i").removeClass("fa-caret-down").addClass("fa-caret-right");
	$("#baseConfigProperty").show().prev().find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
	$("#globalProperty4").show().prev().find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
	$("#btn-group").hide();
	$("#dateformat").parent().parent().hide();
	
}
/**
 * 显示页面相关配置属性项
 */
function pagePropertyDisplayMethod(){
	$("#propertyZN").text("页面");
	$(".hasFocus").removeClass("hasFocus");
	$(".quality,.quality_contern").hide();
	$("#globalProperty,#globalProperty2,#globalProperty5").show().prev().show().find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
	$("#delControls").attr("disabled","disabled");
	//显示页面按钮配置的事件方法
	FormPageConfig.setPageChooseValue();
	//显示页面onload配置的事件方法
	FormPageConfig.pageOnload.setPageOnloadClooseValue();
	FormPageConfig.setPageDisplayMethodValue();
	//if($("#sys_type").val()=="5"){
		$("#globalProperty3").show().prev().show().find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
		$("#write_form_tittle").val($("#add").attr("tittle"));
		//$("#globalProperty4").show().prev().show().find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
	/*}else{
		$("#globalProperty3").hide().prev().hide();
	}*/
	
}
/***
 * 查询条件当鼠标点击时添加事件
 */
function selectColumnsMouseSelect() {
    $('#ctr').delegate('.form-group', 'click mouseleave',
        function (selector) {
    		$(this).css("position","relative");
            if(selector.type == 'click') {
                var $del = '<div class="del-c"  onclick="del()" style="width:20px;height:20px;border-radius: 50%;top:2px;right:3px;position: absolute; text-align: center; cursor: pointer;"><i style="font-size: 18px; color: #a94442;" class="fa fa-close"></i></div>';
                $(this).append($del);
                $(this).addClass("has-error");
            } else {
                $(this).find('.del-c').remove();
                $(this).removeClass('has-error');
            }
        });
}
//初始化事件下拉方法
function getFunNames(){
	   $.post(basePath+"/formUploadOp/getFunNames.htm", {"formid":sysfunctionId}, function(data){
		      $(".eventTypeFun").empty();
		      $(".eventTypeFun").append("<option value=''></option>");
			  if(data!=null&&data!=""&&data.length>0){
				  for(var i = 0;i<data.length;i++){
				  	  var json=data[i].funNames;
					  json=eval("("+json+")");
					  if(json.length>0){
						  
							for(var v=0;v<json.length;v++){
								var html='<option value="'+json[v].name+'(this)">'+json[v].text+'</option>';
								$(".eventTypeFun").append(html);
							}
						}
				  }
			  }
			//刚进来只显示页面属性
		    pagePropertyDisplayMethod();
		  },"json");
}
$(function(){
	$("#formControlTitle").text($("#add").attr("tittle"));
	selectColumnsMouseSelect();
	//加载控件样式配置属性
	//$("#controlCSS").append(BaseControl.getBtnBackgroundColorHtml());
	//加载控件的基本配置属性
	BaseControlConfig.commProperty.initElement(projectTableId,"baseConfigProperty");
	//加载下拉复选单选的数据源配置属性
	new SelectControlProperty(projectId,"dataSource").initValue();
	//加载控件事件配置属性
	$("#controlEvent").html(BaseControlConfig.commProperty.commEvent.initValue());
	//加载form配置页面的相关配置属性
	FormPageConfig.initValue();
	
	//加载时间控件选值范围的配置属性
	formDateConfig.init();
	//加载选人框
	UserBoxControlConfig.initElement(projectId);
	
	//控件组
	formControlGroupConfig.init(projectId);
	//页面块属性
	pageTeamConfig.init();
	//按钮配置颜色
	 $("#btn-group .fc-color-picker").delegate('li','click',function(){
         var clazz = $(this).find('a').attr('ref');
         var $focus=$(".hasFocus:eq(0)");
         $focus.find("button").css({'background':clazz});
     });
	
	//存储刚加载进来的表单导入js的方法	
	 getFunNames();
	
	/*$("#jsselect").find("option").each(function(){
		var json= $(this).text();
		if(json!=""){
			json=eval("("+json+")");
			if(json.length>0){
				for(var i=0;i<json.length;i++){
					var html='<option value="'+json[i].name+'()">'+json[i].text+'</option>';
					$(".eventTypeFun").append(html);
				}
			}
			
		}
		
	});*/
	
	
	$(document).on("click","#ctr,.box-header",function(event){
		pagePropertyDisplayMethod();
	});
	
	function commContorLabelClick(e){
		
		
	}
    /**
	 * 控件的选中操作注册输入框下拉框时间文本框按钮
	 */
	$(document).on("click","#design-canvas .form-control,.control-label,.cbinput,.cbinput_label,.form-button",function(event){ //设置左边选项卡的切换
		
		var $this=$(this);
		if($this.context.tagName=="LABEL"){
			if($this.next().attr("data-role")=="checkbox"||$this.next().attr("data-role")=="radio"){
				$this=$(this).next();
			}else if($this.next().attr("data-role") == 'link'){
				$this=$(this).next().find("a");
			}else if($this.next().attr("data-role") == 'button'){
				$this=$(this).next().find("button:eq(0)");
			}else{
				$this=$(this).next().find(".form-control");
			}
			
		}
		
		$("#delControls").removeAttr("disabled");
		var propertyZN="";
		$(".quality,.quality_contern").hide();

		var dtype=$this.attr("data-role");
		formLayout.showQuality(dtype);
		$("#baseConfigProperty,#globalProperty4").children().show();

		$("#buttonlabelrow").hide();
		if(dtype=="text"){
			propertyZN="输入框";
			commConfigPropertyFun(false);
		}else if(dtype=="select"){
			propertyZN="下拉框";
			commConfigPropertyFun(true);
			$("#stringType,#stringLength,#stringMessage").hide();
		}else if(dtype=="checkbox"){
			propertyZN="复选框";
			commConfigPropertyFun(true);
			$("#stringType,#stringLength,#stringMessage").hide();
		}else if(dtype=="radio"){
			propertyZN="单选框";
			commConfigPropertyFun(true);
			$("#stringType,#stringLength,#stringMessage").hide();
		}else if(dtype=="date"){
			propertyZN="时间";
			commConfigPropertyFun(false);
			$("#globalProperty9").show().prev().show().find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
			$("#stringType,#stringLength").hide();
			$("#dateformat").parent().parent().show();
		}else if(dtype=="upload"){
			propertyZN="上传";
			$("#baseConfigProperty").show().prev().show().find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
			$("#baseConfigProperty").children().hide();
			$("#inputlabelrow,#btn-group,#textRemarksMessage").show();
		}else if(dtype=="textarea"){
			propertyZN="文本框";
			commConfigPropertyFun(false);
		}else if(dtype=="datatable-group"){
			propertyZN="表格"
		}else if(dtype=="button"){
			propertyZN="按钮";
			commConfigPropertyFun(false);
			$("#baseConfigProperty").children().hide();
			$("#inputlabelrow,#btn-group,#buttonlabelrow,#controlIsDisplay").show();
		}else if(dtype=="userbox"){
			propertyZN="选人框";
			commConfigPropertyFun(false);
			$("#globalProperty6,#globalProperty7").show().prev().show().find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
			$("#inputlabelrow,#btn-group").show();
			
		} else if(dtype == 'link') {
			propertyZN="超链接";
			commConfigPropertyFun(false);
			$("#baseConfigProperty").children().hide();
			$("#inputlabelrow").show();
		}
		
		
		
		
		
		
		
		$("#propertyZN").text(propertyZN);
		var ref = $this.attr('data-role');
		if(typeof(ref) != 'undefined' && 'datatable-group' == ref) {
			TableControl.loadConfig($this);
		}
		$("#tabUI").find("li:eq(0)").removeClass("active");
		$("#tabUI").find("li:eq(1)").addClass("active");

		$("#tabUI").find("li:eq(1)").find("a").attr("aria-expanded", true);
		$("#tabUI").find("li:eq(0)").find("a").removeAttr("aria-expanded");

		$("#formSettingCondition").addClass("active");
		$("#formSettingGeneral").removeClass("active");

		$("#controlEvent").find(".pitch").empty();
		
		for(var i=0;i<BaseControlConfig.eventType.length;i++){
			var funEntity=$this;
			var dfunname="";
			var ev=funEntity.attr(BaseControlConfig.eventType[i]);
			var evArray=[];
			if(ev!=""&&ev!=null){
				evArray=ev.split(",");
			}
			var select=$("#controlEvent").find("select[ref="+BaseControlConfig.eventType[i]+"]").val("");
			if(evArray.length>0){
				for(var v=0;v<evArray.length;v++){
					select.find("option").each(function(){
						if($(this).attr("value")==evArray[v]){
							dfunname += evArray[v]+",";
							select.next(".pitch").append('<div ref="'+evArray[v]+'" class="pitchContent">'+$(this).text()+'<a href="#"><i class="fa fa-close" onclick="BaseControlConfig.commProperty.commEvent.delEventFun(this,true)"></i></a></div>');
						}
					});
					
				}
				
			}
			if(dfunname!=""){
				dfunname=dfunname.substring(0, dfunname.lastIndexOf(","));
				funEntity.attr(BaseControlConfig.eventType[i],dfunname);
			}else{
				funEntity.removeAttr(BaseControlConfig.eventType[i]);
			}
		}
		
		
		//$("#add").find(".checkbox,.radio").unbind("click");
		//$("#add").find(".checkbox,.radio").click(commSet.commSetItem);
		
		
		
		//if(!$this.hasClass("hasFocus2")){
			if($this.attr("data-role")=="userbox"){
				
				$("#userBoxConfigPeopleRange").val($this.attr("userRange")==undefined ? "" : $this.attr("userRange"));
				$("#userBoxConfigRoleRange").val($this.attr("userRoleRange")==undefined ? "" : $this.attr("userRoleRange"));
				$("#userBoxConfigOrgRange").val($this.attr("userOrgRange")==undefined ? "" : $this.attr("userOrgRange"));
				
				$("#user_config_interface").val($this.attr("userConfigInterface")==undefined ? "":$this.attr("userConfigInterface"));
				$("#chooseUserBoxConfigType").val($this.attr("chooseUserBoxConfigType"));
			
			}
			//设置提示信息显示
			var message=$this.attr("placeholder");
			if(typeof(message)!=undefined&&typeof(message)!="undefined"&&message!=null){
				$("#valid-message").val(message);
			}else{
				$("#valid-message").val("");
			}
			
			if($this.attr("data-role")=="text"){
				$("#c_unit").show().find("#c_unit_text").val($this.next().text());
			}else{
				$("#c_unit").hide().find("#c_unit_text").val("");
			}
			$(".hasFocus2").removeClass("hasFocus2");
	        $this.addClass("hasFocus2");
	        var text="";
	        //首先清空文本备注里的值
	        $("#textRemarksMessageInput").val("");
	        //默认值
	        $("#controlDefaultValueRowInput").val($this.attr("v")==undefined ? "":$this.attr("v"));
	        if($this.attr("data-role")=="radio"||$this.attr("data-role")=="checkbox"){
	        	
	        	
	        	text=$this.prev("label:eq(0)").find("srtong").text();
	        	//判断是否是只读
	        	if($this.find("input:eq(0)").attr("readonly")=="readonly"){
	        		$("#valid-isRead").val("2")
	        	}else{
	        		$("#valid-isRead").val("1")
	        	}
	        	if($this.children("small").length>0){
	        		$("#textRemarksMessageInput").val($this.children("small:eq(0)").text());
	        	}
	        }else{
	        	if($this.parents(".controls").children("small").length>0){
	        		$("#textRemarksMessageInput").val($this.parents(".controls").children("small:eq(0)").text());
	        	}
	        	if($this.attr("data-role")=="text"||$this.attr("data-role")=="userbox"){
	        		text=$this.parent().parent().prev("label:eq(0)").find("srtong").text();
	        	}else{
	        		text=$this.parent().prev("label:eq(0)").find("srtong").text();
	        	}
	        	//判断是否是只读
	        	if($this.attr("readonly")=="readonly"){
	        		$("#valid-isRead").val("2")
	        	}else{
	        		$("#valid-isRead").val("1")
	        	}
	        }
	        var name=$this.attr("name");
	        var type=$this.attr("data-role");
	       
			if(type == 'radio' || type == 'checkbox') {
				name = $this.find("input:eq(0)").attr('name');
			}
	        $("#test-table").val(name==undefined?"":name);
	        $("#testlabel").val(text);
	       
	        if($this.find(".checkbox,.radio").length==0){
	        	$(".itemSet").hide();
	        	$("#commSetItems").find("input").val("");
	        }else{
	        	//$this.find(".checkbox,.radio,.selectOption").click();
				var required = $this.find("input:eq(0)").attr("required");
				$("#valid-isWrite").val($.isDefined(required) ? 1 : 2);
	        }
	        if($this.attr("data-role")=="select"){
	    		commSet.commSetItem($this,true);
	        	$(".itemSet").show();
	        	$("#level_select").parent().show().prev().show();
	        }
	        if($this.attr("data-role")=="radio"||$this.attr("data-role")=="checkbox"){
	        	commSet.commSetItem($this,true);
	        	 if($this.find("input:eq(0)").length>0){
	 				var required = $this.find("input:eq(0)").attr("required");
	 	        	$("#valid-isWrite").val($.isDefined(required) ? 1 : 2);
	 	        }
	        }else{
	        	var required = $this.attr("required");
	        	$("#valid-isWrite").val($.isDefined(required) ? 1 : 2);
	        	$("#valid-writeType").val($this.attr("valid-writeType"));
	        	$("#valid-writeLength").val($.isDefined($this.attr("valid-writeLength")) ? $this.attr("valid-writeLength") : 30);
	        }
	       
	        
			if($this.find("textarea:eq(0)").length > 0) {
				var $textarea = $this.find("textarea:eq(0)");
				var required = $textarea.attr("required");
				$("#valid-isWrite").val($.isDefined(required) ? 1 : 2);

				$("#valid-writeType").val($textarea.attr("valid-writeType"));
				$("#valid-writeLength").val($.isDefined($textarea.attr("valid-writeLength")) ? $textarea.attr("valid-writeLength") : 30);
			}
			
			if($this.attr('data-role') != 'radio' && $this.attr('data-role') != 'checkbox' && $.isDefined($this.attr('data-role'))) {
				$('#stringLength').show(); //字符串长度
				$('#stringType').show();//输入字符类型
			}

			var $dataControlType = $this.attr('data-role');
			if($dataControlType == 'date' || $dataControlType == 'time'	|| $dataControlType == 'datetime'||$dataControlType == 'button'||$dataControlType == 'upload') {
				$('#stringLength').hide(); //字符串长度
				$('#stringType').hide();//输入字符类型
			}
			if($dataControlType=="button"){
				var bt=$this.parent().prev().text();
				$("#buttoninput").val(bt);
				$("#testlabel").val($this.text());
			}
			if($dataControlType == 'textarea') {
				$('#stringLength').show(); //字符串长度
				$('#stringType').show();//输入字符类型
			}
			if($this.attr("showType")!=""&&$this.attr("showType")!=null){
				$("#valid-isShow").val($this.attr("showType"));
			}else{
				$("#valid-isShow").val("1");
			}
			
			if($this.attr("data-role")=="radio"||$this.attr("data-role")=="checkbox"){
				$("#level_select").parent().hide().prev().hide();
				if($this.find("input").attr("flowVariable")!=""&&$this.find("input").attr("flowVariable")!=null){
					$("#flowVariable").val($this.find("input").attr("flowVariable"));
				}else{
					$("#flowVariable").val("");
				}
			}
			
			if($this.attr("flowVariable")!=""&&$this.attr("flowVariable")!=null){
				$("#flowVariable").val($this.attr("flowVariable"));
			}else{
				$("#flowVariable").val("");
			}
			var dateC=$this;
			if(dateC.length>0&&dateC.attr("data-role")=="date"&&dateC.attr("format")!=null&&dateC.attr("format")!=""){
				$("#dateformat").val(dateC.attr("format"));
			}else{
				$("#dateformat").val("");
			}
			if(dateC.length>0&&dateC.attr("data-role")=="date"){
				$("#dataRecodeFlag").val(typeof(dateC.attr("dataRecodeFlag"))==undefined?"":dateC.attr("dataRecodeFlag"));
				$("#dataRecodeType").val(typeof(dateC.attr("dataRecodeType"))==undefined?"":dateC.attr("dataRecodeType"));
			}
		//}
		//$("#labelCSS-select").val($(".hasFocus2").parent().prev().attr("ref"));
		//$("#contorlCSS-select").val($(".hasFocus2").parent().parent().attr("ref"));
		//$("#contorlNextCSS-select").val($(".hasFocus").find("label").next().attr("ref"));
		$(".form-group").removeClass("hasFocus");
		$this.parents(".form-group:eq(0)").addClass("hasFocus");
		formLayout.setHasFocus();

		var datarole = $this.attr("data-role");
		var datarolegroup = $($this).attr("data-role-flag");
		choice.init(datarole,$("#baseConfigProperty"),datarolegroup);
		linkControl.initPage(datarole,$("#baseConfigProperty"));

		CheckboxRadioControl.prototype.getRightCofigHtmlBlock.call(arguments,datarole);
		FormInitControlData.init(datarole);
		FormValidatorControl.init(datarole);


		//判断是不是控件组里面的
		if($this.parents(".formControlGroup").length>0){
			$("#test-table-column-row").hide();
			$("#globalProperty8").show().prev().show().find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
			$("#formControlGroupTableName").val($this.attr("formcontrolgrouptablename")).change();
		}else{
			$("#globalProperty8").hide().prev().hide();
		}
		
		event.stopPropagation();
		
	});

	
	
	
	/**
	 * 第一个为父容器，父容器除外
	 * 容器的选中操作
	 */
	$(document).on("click","#design-canvas .gv-droppable-grid:gt(0)",function(e){
		$(".pageTeam").removeClass("pageTeam");
		var $focus=$(".hasFocus:eq(0)");
		//含有选中
		if($focus.length>0){
			//去掉选中
			$focus.removeClass("hasFocus");
		}
		if($(this).attr("ref")=="fcgflag"){
			
			$("#delControls").removeAttr("disabled");
			$(this).next().find(".form-button").click();
		}else{
			//加上选中样式
			$(this).addClass("hasFocus");
		}
		if($(this).attr("ref")=="pageTeam"){
			$("#pageOnlyFlag").val($(this).attr("refid"));
			$("#delControls").removeAttr("disabled");
			$("#propertyZN").text("页面块");
			$(this).addClass("pageTeam");
			$(".quality,.quality_contern").hide();
			$("#globalProperty10").show().prev().show().find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
			$("#pageTeamTitleInput").val($(this).prev("h3").text());
			$("#pageTeamShow").val($(this).parent().attr("isshow"));
		}
		//停止冒泡
		e.stopPropagation();
		
	})
	
	
	
	/**
	 * 保存页面
	 */
	$("#save").click(function(){
		formConfigSaveFun(false);
	});
	
	function formConfigSaveFun(flag){
		var $content=$("#ctr").clone();
		$content.find("#add").find("input[type='radio'],input[type='checkbox']").removeAttr("checked");
		$content.find("#add").find(".fileupload").each(function(i){
			var $this=$(this);
			$this.attr("id","fileQueue_"+i);
			$this.find("input[type=file]").attr("id","uploadify_"+i);
		});
		$content.find("#add").find("input[data-role=date]").each(function(i){
			var $this=$(this);
			$this.attr("id","data_"+i);
			
		});
		var jsons={};
		var jsonstr="";
		//检查是有配置流程变量的控件
		$("#add").find("input[flowVariable],select[flowVariable]").each(function(){
			var flowVariable=$(this).attr("flowVariable");
			if(flowVariable!=""&&flowVariable!=null){
				jsons[flowVariable]="";
			}
			
		});
		for(var key in jsons)
		{
			jsonstr+=key+",";
		}
		$content.find(".hasFocus").removeClass("hasFocus");
		$content.find(".hasFocus2").removeClass("hasFocus2");
		$.ajax({
			type:"post",
			url:basePath+"/sysFunction/update.htm",
			data:{"id":sysfunctionId,"content":$content.html(),"modalName":$("#formid").val(),formProperties:jsonstr},
			dataType:"json",
			success:function(data){
				if(flag){
					return;
				}
				if(data.status){
					alert("保存成功");
					var url = basePath+"/header/forward.htm?flag=functionPage";
					if(!!navId) {
						url += "&navId="+navId;
					}
					window.location.href = url;
				}else{
					alert(data.message);
				}
			}
		});
	}
	
	
	$("#itemValue").keyup(function(){
		var newEN=$(this);
		en.find("input").val(newEN.val());
	});
	$("#itemDiscription").keyup(function(){
		var newEN=$(this);
		en.find("label").find("span").text(newEN.val());
	});
	
});
/**
 * 设置checkbox和radio显示信息
 */
commSet.commSetItem=function (e,flag){
	en=$(this);
	if(flag){
		en=$(e);
	}
	$(".itemSet").show();
	var html='';
	$('#stringLength').hide(); //字符串长度
	$('#stringType').hide();//输入字符类型
	
	if(en.attr("ref")=="select"){
		en.find("option").each(function(){
			var v=$(this);
			html+=sethtml(v.text(),v.attr("value"));
		});
	}else{
		$("#commSetItems").empty();
		en.children().each(function(){
			var v=$(this);
			html+=sethtml(v.find("span").text(),v.find("input").val());
		});
	}
	$("#commSetItems").html(html);
	//绑定字典表的标识
	var flag=$(".hasFocus2:eq(0)").attr("flag");
	if(flag!=undefined&&flag!=""){
		$("#dataTypeSelect").val(flag);
		$("#endit-itme-div").hide();
		$("#chext1").click();
	}else{
		$("#dataTypeSelect").val("");
		$("#endit-itme-div").show();
	}
	//绑定生成表的标识
	var otherTableName=$(".hasFocus2:eq(0)").attr("otherTableName");
	if(otherTableName!=undefined&&otherTableName!=""){
		$("#otherTable").val(otherTableName);
		$("#otherTable").change();
		$("#otherTableColumn").val($(".hasFocus2:eq(0)").attr("otherTableColumn"));
		$("#level_select").val($(".hasFocus2:eq(0)").attr("levelselect"));
		$("#endit-itme-div").hide();
		$("#chext2").click();
	}else{
		$("#otherTable,#otherTableColumn,#level_select").val("");
		$("#endit-itme-div").show();
	}
	if($("#otherTable").find("option:selected").attr("type")=="4"){
		$("#level_select").parent().show().prev().show();
	}else{
		$("#level_select").val("").parent().show().prev().show();
	}
}
function sethtml(value,description){
	var html='<div class="row setitemrow" style="margin-bottom: 5px;" >'
		+'<div class="col-md-6" style="padding-right: 0px; padding-left: 0px;">'
        +	'<input type="text" class="itemValueDescription form-control" data-gv-property="sublabel" value="'+value+'" placeholder="选项描述" >'
		+'</div>'
		+'<div class="col-md-5" style="padding-right: 0px; padding-left: 5px;">'
         +	'<input type="text" class="itemValue form-control" data-gv-property="sublabel" value="'+description+'"  placeholder="选项值" >'
		+'</div>'
		+'<div class="col-md-1" style="padding-right: 0px; padding-left: 5px;">'
		+	'<div class="input-group-addon" onclick="deleteItems(this)" style="width: 100%; height: 18px; border: 1px solid #d2d6de; background: #fff; cursor: pointer; padding: 5px;">'
         +     '<i class="fa fa-minus-circle" ></i>'
          + ' </div>'
		+'</div>'
	+'</div>';
	return html;
}
function setAddItem(){
	var html=sethtml("","");
	$("#commSetItems").append(html);
}

/**
 * 删除复选框单选框下拉项
 * @param e
 */
function deleteItems(e){
	if($(e).parent().parent().siblings().length==0){
		alert("至少留一项");
	}else{
		$(e).parent().parent().remove();
	}
	
}
/**
 * 绑定字典表
 */
function bindtable(){
	var chext=$("input[name=chext]:checked").val();
	if($("#dataTypeSelect").val()==""&&chext=="1"){
		return;
	}
	$("#endit-itme-div").hide();
	if(chext==1){
		$.post(basePath+"/formOpration/findDataConfigByType.htm", {type:$("#dataTypeSelect").val()}, function(data){
			  if(data!=null&&data.length>0){
				
				  var html='';
					var seletor='';
					var name=en.find("input:eq(0)").attr("name");
					var required = $('#valid-isWrite').val();
					var $required = '';
					if($.isDefined(required) && required == 1) {
						$required = 'required'
					}
					$(".hasFocus:eq(0)").attr("flag",$("#dataTypeSelect").val());
					if(en.attr("ref")=="select"){
						html+='<option value=""></option>';
					}
					for(var i=0;i<data.length;i++){
						if(en.attr("ref")=="checkbox"){
							seletor='.checkbox';
							html+='<div class="checkbox"  ref="checkbox" ><label><input '+$required+' name="'+name+'" value="'+data[i].id+'" type="checkbox" > <span>'+data[i].name+' </span></label></div>';
							
						}else if(en.attr("ref")=="radio"){
							seletor='.radio';
							html+='<div class="radio" ref="radio" ><label><input '+$required+' type="radio" name="'+name+'" value="'+data[i].id+'" ><span>'+data[i].name+'</span></label></div>';
							
						}else if(en.attr("ref")=="select"){
							html+='<option value="'+data[i].id+'">'+data[i].name+'</option>'
						}
					}
					
					if(en.attr("ref")!="select"){
						en.parent().empty().append(html);
						en=$(".hasFocus2:eq(0)").find(seletor+":eq(0)");
					}else{
						en.empty().append(html);
					}
					
			  }
		 },"json");
		$(".hasFocus2:eq(0)").removeAttr("otherTableName");
		$(".hasFocus2:eq(0)").removeAttr("otherTableColumn");
	}else{
		 $(".hasFocus2:eq(0)").attr("otherTableName",$("#otherTable").val());
		 $(".hasFocus2:eq(0)").attr("otherTableColumn",$("#otherTableColumn").val());
		 $(".hasFocus2:eq(0)").removeAttr("flag");
	}
	 
}
function getFormImportJsp(){
	$('#equipmentDemoAdd').modal('show');
	$.post(basePath+"/formOpration/getFormImportJsp.htm", {formid:sysfunctionId}, function(data){
		$("#equipmentDemoAdd").html(data);
	},"");

}