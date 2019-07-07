/**
 * Created by Administrator on 2016/7/6.
 */
var FormPageConfig={
		pageButton:{
			content: '<div class="checkbox search_btn page_search_btn" style="margin-top: 0px;">'
					+'		<label>'
					+'			<input value="submit" ref="submit" type="checkbox" id="form_button_input_submit" onclick="FormPageConfig.pageButton.configClickEvent(this)"> 提交'
					+'		</label>'
					+'</div>'
					+'<div class="checkbox search_btn page_search_btn" style="margin-top: 0px;">'
					+'		<label>'
					+'			<input value="save" ref="save" type="checkbox" id="form_button_input_save" onclick="FormPageConfig.pageButton.configClickEvent(this)"> 保存'
					+'		</label>'
					+'</div>'
					+'<div class="checkbox search_btn page_search_btn" style="margin-top: 0px;">'
					+'		<label>'
					+'			<input value="cance" ref="cance" type="checkbox" id="form_button_input_cance" onclick="FormPageConfig.pageButton.configClickEvent(this)"> 取消'
					+'		</label>'
					+'</div>',
			clickContent:'<div class="hide">'
						+'	<span style="font-size:12px;">点击事件</span>'
						+'  <select onchange="BaseControlConfig.commProperty.commEvent.eventChange(this,false)" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="eventTypeFun pageFormBottunSelectCss" selected="selected">'
						+'  	<option value=""></option>'
						+'  </select>'
						+'  <div class="pitch">'
						+'  </div>'
						+'</div>'
				,
			configClickEvent:function(entity){
				var $this=$(entity);
				var formButtonInputValue="";
				if($this.get(0).checked){
					$this.parent().next().removeClass("hide");
				}else{
					$this.parent().next().addClass("hide");
				}
				if($("#form_button_input_submit").get(0).checked){
					formButtonInputValue+=$("#form_button_input_submit").val()+",";
				}else{
					$("#form_button_input").removeAttr("submit");
					$("#form_button_input_submit").parent().next().find("select").val("").next().empty();
				}
				if($("#form_button_input_save").get(0).checked){
					formButtonInputValue+=$("#form_button_input_save").val()+",";
				}else{
					$("#form_button_input").removeAttr("save");
					$("#form_button_input_save").parent().next().find("select").val("").next().empty();
				}
				if($("#form_button_input_cance").get(0).checked){
					formButtonInputValue+=$("#form_button_input_cance").val()+",";
				}else{
					$("#form_button_input").removeAttr("cance");
					$("#form_button_input_cance").parent().next().find("select").val("").next().empty();
				}
				$("#form_button_input").val(formButtonInputValue);
			}
		},
		pageDisplayMethod:{
			content: '<div class="radio" style="margin-top: 0px;">'
					+'	<label>'
					+'		<input value="max" onclick="FormPageConfig.pageDisplayMethod.pdmClickEvent(this)" type="radio" name="form_display_method_checkbox" style="margin-top: -2px;"> 大窗口'
					+'	</label>'
					+'</div>'
					+'<div class="radio">'
					+'	<label>'
					+'		<input value="default" onclick="FormPageConfig.pageDisplayMethod.pdmClickEvent(this)" type="radio" name="form_display_method_checkbox" checked="checked" style="margin-top: -2px;"> 默认窗口'
					+'	</label>'
					+'</div>'
					+'<div class="radio" style="margin-bottom: 0px;">'
					+'	<label>'
					+'		<input value="page" onclick="FormPageConfig.pageDisplayMethod.pdmClickEvent(this)" type="radio" name="form_display_method_checkbox" style="margin-top: -2px;"> 页面'
					+'	</label>'
					+'</div>',
			pdmClickEvent:function(entity){
				var value=$(entity).val();
				$("#form_display_method").val(value);
			}
			
		},
		pageOnload:{
			content: '<div class="row"> '
					+'	<div class="prop-mg-lr col-md-12">	'
					+'		<div class="form-group-prop">	'
					+'			<label class="label_property" style="">onload</label>	'
					+'			<div class="controls">			'
					+'				<select id="page_onload_event" onchange="BaseControlConfig.commProperty.commEvent.eventChange(this,\'\',true)" ref="onload" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control eventTypeFun" selected="selected">'
					+'					<option value=""></option>'
					+'				</select>	'		
					+'				<div class="pitch"></div>		'
					+'			</div>	'
					+'		</div> '
					+'	</div>'
					+'</div>',
			setPageOnloadClooseValue:function(){
				var fonloadvalue=$("#add").attr("onload");
				var $pe=$("#page_onload_event");
				$pe.next().empty();
				if(fonloadvalue!=""&&fonloadvalue!=undefined&&fonloadvalue!=null){
					var bfun=fonloadvalue.split(",");
					if(bfun!=""&&bfun!=null&&bfun.length>0){
						var selectValues=$pe.find("option");
						selectValues.each(function(){
							var $option=$(this);
							
							for(var v=0;v<bfun.length;v++){
								if($option.attr("value")==bfun[v]){
									$pe.next().append('<div ref="'+bfun[v]+'" class="pitchContent">'+$option.text()+'<a href="#"><i class="fa fa-close" onclick="BaseControlConfig.commProperty.commEvent.delEventFun(this,false)"></i></a></div>');
								}
								
							}
						});
						
					}
				}
			}
		},
		formTittle:{
			content:'<div id="form_tittle" class="prop-mg-lr col-md-12">	<div class="form-group-prop">		<label class="label_property">标题名称</label>		<div class="controls">			<input type="text" id="write_form_tittle" onkeyup="FormPageConfig.formTittle.keyupevent(this)" data-gv-property="sublabel" class="form-control" value="" placeholder="">		</div>	</div></div>',
			keyupevent:function(e){
				var v=$(e).val();
				$("#add").attr("tittle",v);
				$("#formControlTitle").text(v);
			}
		},
		setPageDisplayMethodValue:function(){
			if($("#form_display_method").val()==""){
				$("#form_display_method").val($("input[name=form_display_method_checkbox]:checked").val());
			}else{
				$("input[name=form_display_method_checkbox]").each(function(){
					var $this=$(this);
					if($this.val()==$("#form_display_method").val()){
						$this.get(0).checked=true;
					}
				});
			}
		},
		setPageChooseValue:function(){
			var fbi=$("#form_button_input").val().split(",");
			$("#form_button_input_submit").get(0).checked=false;
			$("#form_button_input_save").get(0).checked=false;
			$("#form_button_input_cance").get(0).checked=false;
			$("#form_button_input_submit,#form_button_input_save,#form_button_input_cance").parent().next().addClass("hide").find("select").val("");
			$("#form_button_input_submit,#form_button_input_save,#form_button_input_cance").parent().next().find(".pitch").empty();
			if(fbi!=""&&fbi!=null&&fbi.length>0){
				for(var i=0;i<fbi.length;i++){
					if(fbi[i]!=""){
						var inputB=$("#form_button_input_"+fbi[i]);
						inputB.get(0).checked=true;
						var s=inputB.parent().next().removeClass("hide");
						//得到已配置按钮的点击方法
						var btnAttr = $("#form_button_input").attr(fbi[i]);
						var bfun="";
						if(btnAttr!=""&&btnAttr!=undefined){
							bfun=btnAttr.split(",");
						}
						//var bfun= !!btnAttr ? btnAttr.attr(fbi[i]).split(",") : "";
						if(bfun!=""&&bfun!=null&&bfun.length>0){
							var selectValues=inputB.parent().next().find("select").find("option");
							selectValues.each(function(){
								var $option=$(this);
								
								for(var v=0;v<bfun.length;v++){
									if($option.attr("value")==bfun[v]){
										s.find(".pitch").append('<div ref="'+bfun[v]+'" class="pitchContent">'+$option.text()+'<a href="#"><i class="fa fa-close" onclick="BaseControlConfig.commProperty.commEvent.delEventFun(this,false)"></i></a></div>');
									}
									
								}
							});
							
						}
					}
					
				}
			}
		},
		commSetPageButtonAndDisplayMethodFun:function(e,b,formId){
			if(typeof(e)!=undefined&&typeof(e)!="undefined"&&e!="")
			{
				var bi=$(e).find("#form_button_input").val();
				//预览时要显示的form页面按钮
				var binput=!!bi ? bi.split(",") : '';
				$(b).find("#form_btn_cance,#form_btn_save,#form_btn_submit").hide();
				if(binput!=""&&binput!=null&&binput.length>0){
					for(var i = 0;i<binput.length;i++){
						if(binput[i]!=""){
							$(b).find("#form_btn_"+binput[i]).show();
						}
					}
				}
			}else{
				//预览时要显示的form页面按钮
				var binput=!!$("#form_button_input").val() ? $("#form_button_input").val().split(",") : '';
				$("#form_btn_cance,#form_btn_save,#form_btn_submit").hide();
				if(binput!=""&&binput!=null&&binput.length>0){
					for(var i = 0;i<binput.length;i++){
						if(binput[i]!=""){
							$("#form_btn_"+binput[i]).show();
						}
					}
				}
			}
			
			//预览时form页面显示的方式
			var dm=$("#form_display_method").val();
			if(dm==""||dm=="default"||dm=="page"){
				$("#previewModal").removeClass("bs-example-modal-lg").find(".modal-dialog").removeClass("modal-lg");
			}else{
				$("#previewModal").addClass("bs-example-modal-lg").find(".modal-dialog").addClass("modal-lg");
			}
			var submitfun = $("#"+formId).find("#form_button_input").attr("submit");
			var savefun   = $("#"+formId).find("#form_button_input").attr("save");

			$(b).find("#form_btn_submit").attr("onclick","formSubmit(1,'"+formId+"','"+submitfun+"')");
			$(b).find("#form_btn_save").attr("onclick","formSubmit(0,'"+formId+"','"+savefun+"')");
			$(b).find("#form_btn_cance").attr("onclick",$("#form_button_input").attr("cance"));
		},
		initValue:function(){
			$("#globalProperty").html(FormPageConfig.pageButton.content);
			$("#globalProperty2").html(FormPageConfig.pageDisplayMethod.content);
			//if($("#sys_type").val()=="5"){
				$("#globalProperty3").html(FormPageConfig.formTittle.content);
			//}
			$(".page_search_btn").append(FormPageConfig.pageButton.clickContent);
			$("#globalProperty5").html(FormPageConfig.pageOnload.content);
			FormPageConfig.pageOnload.setPageOnloadClooseValue();
			FormPageConfig.setPageChooseValue();
			FormPageConfig.setPageDisplayMethodValue();
		}
}