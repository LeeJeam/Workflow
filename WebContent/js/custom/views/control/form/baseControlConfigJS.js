var BaseControlConfig={};
BaseControlConfig.projectTableId="";
BaseControlConfig.eventType=['onblur','onchange','onclick','onclose','ondblclick','onfocus','onkeydown','onkeypress','onkeyup'
                         ,'onload','onmousedown','onmousemove','onmouseout','onmouseover',
                         'onmouseup','onsubmit','onselect'];
BaseControlConfig.commProperty={
		/**
		 * 表属性
		 */
		table:{
			content: '<div class="row" id="test-table-column-row">'
					+'	<div class="prop-mg-lr col-md-12">'
					+'		<div class="form-group-prop">'
					+'			<label class="label_property">字段属性</label>'
					+'			<div class="controls">'
					+'				<select id="test-table" onchange="BaseControlConfig.commProperty.table.changeEvent(this)" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
					+'					<option value=""></option>'
					+'				</select>'
					+'			</div>'
					+'		</div>'
					+'	</div>'
					+'</div>',
			initValue:function(){
				$.ajax({
					type:"post",
					url:basePath+"/structureTable/findTableByPId.htm",
					data:{"projectTableId":BaseControlConfig.projectTableId},
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
			},
			changeEvent:function(entity){
				var $this=$(entity);
				var $focus=$(".hasFocus2:eq(0)");
				var value=$this.val();
				var text=$this.find("option:selected").text();
				if($focus.length>0){//含有选中
					var type=$focus.attr("data-role");
					if(type=="button"||type=="radio"||type=="checkbox"){
						if(type!="button"){
							$focus.prev(".control-label").find("srtong").text(text); 
							$focus.find("input").attr("name",value);
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
					    
					    $focus.attr("name",value);
					    if(value=="password"){
					    	$focus.attr("type","password");
					    }
						$('#testlabel').val(text);
					}
					
				    
				} 
			}
		},
		/**
		 * 文本名
		 */
		textName:{
			content: '<div class="row" id="inputlabelrow">'
					+'	<div class="prop-mg-lr col-md-12">'
					+'		<div class="form-group-prop">'
					+'			<label class="label_property">文本名</label>'
					+'			<div class="controls">'
					+'				<input type="text" onkeyup="BaseControlConfig.commProperty.textName.keyUpEvent(this)" id="testlabel" data-gv-property="sublabel" class="form-control" placeholder="Label">'
					+'			</div>'
					+'		</div>'
					+'	</div>'
					+' </div>',
			keyUpEvent:function(entity){
				var $focus=$(".hasFocus2:eq(0)");
				if($focus.length>0){//含有选中
					//下拉框属性
					var $this=$(entity);
				    var value=$this.val();
				    var type=$focus.attr("data-role");
				    if(type=="button"){
				    	$focus.text(value); 
				    }else{
				    	if(type=="radio"||type=="checkbox"){
				    		$focus.prev("label:eq(0)").find("srtong").text(value); 
				    	}else{
				    		if(type=="userbox"||type=="text"){
				    			$focus.parent().parent().prev("label:eq(0)").find("srtong").text(value); 
				    		}else{
				    			$focus.parent().prev("label:eq(0)").find("srtong").text(value); 
				    		}
				    		
				    	}
				    	
				    }
				} 
			}
		},
		/**
		 * 按钮
		 */
		button:{
			content: '<div class="row" id="buttonlabelrow">'
					+'	<div class="prop-mg-lr col-md-12">'
					+'		<div class="form-group-prop">'
					+'			<label class="label_property">名称</label>'
					+'			<div class="controls">'
					+'				<input type="text" onkeyup="BaseControlConfig.commProperty.button.keyUpEvent(this)" id="buttoninput" data-gv-property="sublabel" class="form-control" placeholder="Label">'
					+'			</div>'
					+'		</div>'
					+'	</div>'
					+' </div>',
			keyUpEvent:function(entity){
				var $focus=$(".hasFocus2:eq(0)");
				if($focus.length>0){//含有选中
					$focus.parent().prev().text($(entity).val());
				} 
			}
		},
		/**
		 * 流程变量
		 */
		flowVariable:{
			content: '<div class="row" id="flowVariable_row_div">'
					+'	<div class="prop-mg-lr col-md-12">'
					+'		<div class="form-group-prop">'
					+'			<label class="label_property">流程变量</label>'
					+'			<div class="controls">'
					+'				<input type="text" id="flowVariable" data-gv-property="sublabel" onkeyup="BaseControlConfig.commProperty.flowVariable.keyUpEvent(this)" class="form-control" placeholder="Label">'
					+'			</div>'
					+'		</div>'
					+'	</div>'
					+'</div>',
		    keyUpEvent:function(entity){
		    	var $this=$(entity);
		    	var $focus=$(".hasFocus2:eq(0)");
		    	if($focus.attr("data-role")=="radio"||$focus.attr("data-role")=="checkbox"){
		    		$focus.find("input").attr("flowVariable",$this.val());
		    	}
		    	$focus.attr("flowVariable",$this.val());
		    }
		},
		/**
		 * 是否必填
		 */
		isRequired:{
			content: '<div class="prop-mg-lr col-md-12">'
					+'	<div class="form-group-prop">'
					+'		<label class="label_property">是否必填</label>'
					+'		<div class="controls">'
					+'			<select id="valid-isWrite" onchange="BaseControlConfig.commProperty.stringType.changeEvent(this)" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
					/*+'				<option value=""></option>'*/
					+'				<option value="1">是</option>'
					+'				<option value="2">否</option>'
					+'			</select>'
					+'		</div>'
					+'	</div>'
					+'</div> '
		},
		/**
		 * 是否只读
		 */
		isRead:{
			content: '<div class="prop-mg-lr col-md-12">'
					+'	<div class="form-group-prop">'
					+'		<label class="label_property">是否只读</label>'
					+'		<div class="controls">'
					+'			<select id="valid-isRead" onchange="BaseControlConfig.commProperty.isRead.changeEvent(this)" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
					+'				<option value="1">否</option>'
					+'				<option value="2">是</option>'
					+'			</select>'
					+'		</div>'
					+'	</div>'
					+'</div>',
			changeEvent:function(entity){
				var $this=$(entity);
				var $focus=$(".hasFocus2:eq(0)");
				if($focus.length>0){//含有选中
					var type=$focus.attr("data-role");
					if($this.val()=="1"){
						if(type=="checkbox"||type=="radio"){
							$focus.find("input").removeAttr("readonly");
						}else{
							$focus.removeAttr("readonly");
						}
					}else{
						if(type=="checkbox"||type=="radio"){
							$focus.find("input").attr("readonly","readonly");
						}else{
							$focus.attr("readonly","readonly");
						}
					}
					
				} 
			}
		},
		/**
		 * 是否显示
		 */
		isShow:{
			content: '<div class="prop-mg-lr col-md-12" id="controlIsDisplay">'
					+'	<div class="form-group-prop">'
					+'		<label class="label_property">是否显示</label>'
					+'		<div class="controls">'
					+'			<select id="valid-isShow" onchange="BaseControlConfig.commProperty.isShow.changeEvent(this)" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
					+'				<option value="1">是</option>'
					+'				<option value="2">否</option>'
					+'			</select>'
					+'		</div>'
					+'	</div>'
					+'</div>',
			changeEvent:function(entity){
				var $this=$(entity);
				var $focus=$(".hasFocus2:eq(0)");
				if($focus.length>0){//含有选中
					var type=$focus.attr("data-role");
					$focus.attr("showType",$this.val());
				} 
			}
		},
		/**
		 * 单位
		 */
		unit:{
			content: '<div class="row" id="c_unit">'
				+'	<div class="prop-mg-lr col-md-12">'
				+'		<div class="form-group-prop">'
				+'			<label class="label_property">单位</label>'
				+'			<div class="controls">'
				+'				<input type="text" onkeyup="BaseControlConfig.commProperty.unit.keyUpEvent(this)" id="c_unit_text" data-gv-property="sublabel" class="form-control" placeholder="Label">'
				+'			</div>'
				+'		</div>'
				+'	</div>'
				+' </div>',
			keyUpEvent:function(entity){
		    	var $this=$(entity);
		    	var $focus=$(".hasFocus2:eq(0)");
		    	if($focus.attr("data-role")=="text"){
		    		if($this.val()==""){
		    			$focus.next().text("").hide();
		    		}else{
		    			$focus.next().show().text($this.val());
		    		}
		    	}
		    	
		    }
		},
		/**
		 * 字符长度
		 */
		stringLength:{
			content: '<div id="stringLength" class="prop-mg-lr col-md-12">'
					+'	<div class="form-group-prop">'
					+'		<label class="label_property">字符长度</label>'
					+'		<div class="controls">'
					+'			<input type="text" id="valid-writeLength" onkeyup="BaseControlConfig.commProperty.stringLength.keyUpEvent(this)" data-gv-property="sublabel" class="form-control" value="30" placeholder="只能输入大于0的整数">'
					+'		</div>'
					+'	</div>'
					+'</div>',
			keyUpEvent:function(entity){
				var $this=$(entity);
				if(!/^[1-9][0-9]*$/.test($this.val())){
					$this.val("");
				}
				var $focus=$(".hasFocus2:eq(0)");
				if($focus.length>0){//含有选中
					var type=$focus.attr("data-role");
					if(type!="button"){
						if(type == 'textarea') {
							$focus.attr($this.attr("id"),$this.val());
						} else {
							$focus.attr($this.attr("id"),$this.val());
						}
					}
				} 
			}
		},
		/**
		 * 提示
		 */
		message:{
			content: '<div id="stringMessage" class="prop-mg-lr col-md-12">'
					+'	<div class="form-group-prop">'
					+'		<label class="label_property">提示信息</label>'
					+'		<div class="controls">'
					+'			<input type="text" id="valid-message" onkeyup="BaseControlConfig.commProperty.message.keyUpEvent(this)" data-gv-property="sublabel" class="form-control" placeholder="">'
					+'		</div>'
					+'	</div>'
					+'</div>',
			keyUpEvent:function(entity){
				var $this=$(entity);
				
				var $focus=$(".hasFocus2:eq(0)");
				if($focus.length>0){//含有选中
					var type=$focus.attr("data-role");
					if(type!="button"){
						
							$focus.attr("placeholder",$this.val());
						
					}
				} 
			}
		},
		/**
		 * 备注
		 */
		textRemarks:{
			content: '<div id="textRemarksMessage" class="prop-mg-lr col-md-12">'
					+'	<div class="form-group-prop">'
					+'		<label class="label_property">文本备注</label>'
					+'		<div class="controls">'
					+'			<input type="text" id="textRemarksMessageInput" onkeyup="BaseControlConfig.commProperty.textRemarks.keyUpEvent(this)" data-gv-property="sublabel" class="form-control" placeholder="">'
					+'		</div>'
					+'	</div>'
					+'</div>',
			keyUpEvent:function(entity){
				var $this=$(entity);
				
				var $focus=$(".hasFocus2:eq(0)");
				if($focus.length>0){//含有选中
					var type=$focus.attr("data-role");
					if(type=="checkbox"||type=="radio"){
							$focus.children("small").remove();
							$focus.append("<small>"+$this.val()+"</small>");
						
					}else{
						$focus.parents(".controls:eq(0)").children("small").remove();
						$focus.parents(".controls:eq(0)").append("<small>"+$this.val()+"</small>");
					}
				} 
			}
		},
		/**
		 * 字符类型
		 */
		stringType:{
			content: '<div id="stringType" class="prop-mg-lr col-md-12">'
					+'	<div class="form-group-prop">'
					+'		<label class="label_property">字符类型</label>'
					+'		<div class="controls">'
					+'			<select id="valid-writeType" onchange="BaseControlConfig.commProperty.stringType.changeEvent(this)" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
					+'				<option value=""></option>'
					+'				<option value="1">所有字符都可以</option>'
					+'				<option value="2">整数（最多三位小数）</option>'
					+'				<option value="3">数字</option>'
					+'				<option value="4">数字或英文字母</option>'
					+'				<option value="5">验证电话号码</option>'
					+'				<option value="6">验证邮箱地址</option>'
					+'			</select>'
					+'		</div>'
					+'	</div>'
					+'</div>',
			changeEvent:function(entity){
				var $this=$(entity);
				var $focus=$(".hasFocus2:eq(0)");
				if($focus.length>0){//含有选中
					var type=$focus.attr("data-role");
					if(type!="button"){
						var $id = $this.attr('id');
						var $val = $this.val();
						if($id == 'valid-isWrite') {
							if($val == 1) {
								if(type == 'textarea'||type == 'select'||type == 'date'||type=='textarea') {
									$focus.attr('required','required');
									$focus.parent().prev().find("span").attr("style","");
								} else{
									if(type=="radio"||type=="checkbox"){
										$focus.find("input").attr('required','required');
										$focus.prev().find("span").attr("style","");
									}else{
										$focus.attr('required','required');
										$focus.parent().parent().prev().find("span").attr("style","");
									}
									
								}
							} else {
								if(type == 'textarea'||type == 'select'||type == 'date'||type=='textarea') {
									$focus.removeAttr('required');
									$focus.parent().prev().find("span").attr("style","display:none");
								}else{
									if(type=="radio"||type=="checkbox"){
										$focus.find("input").removeAttr('required');
										$focus.prev().find("span").attr("style","display:none");
									}else{
										$focus.removeAttr('required');
										$focus.parent().parent().prev().find("span").attr("style","display:none");
									}
									
								}
							}
						} else {
							if(type == 'textarea') {
								$focus.attr($this.attr("id"),$this.val());
							} else{
								$focus.attr($this.attr("id"),$this.val());
							}

						}


					}
				} 
			}
		},
		/**
		 * 文本名
		 */
		controlDefaultValue:{
			content: '<div class="row" id="controlDefaultValueRow">'
					+'	<div class="prop-mg-lr col-md-12">'
					+'		<div class="form-group-prop">'
					+'			<label class="label_property">默认值</label>'
					+'			<div class="controls">'
					+'				<input type="text" onkeyup="BaseControlConfig.commProperty.controlDefaultValue.keyUpEvent(this)" id="controlDefaultValueRowInput" data-gv-property="sublabel" class="form-control" placeholder="Label">'
					+'			</div>'
					+'		</div>'
					+'	</div>'
					+' </div>',
			keyUpEvent:function(entity){
				var $focus=$(".hasFocus2:eq(0)");
				if($focus.length>0){//含有选中
					//下拉框属性
					var $this=$(entity);
				    var value=$this.val();
				    var type=$focus.attr("data-role");
				    if(type=="radio"||type=="checkbox"){
			    		$focus.attr("v",value); 
			    	}else{
			    		$focus.val(value);
			    		$focus.attr("v",value);
			    	}
				} 
			}
		},
		/**
		 * 控件事件
		 */
		commEvent:{
			initValue:function(){
				var html="";
				for(var i=0;i<BaseControlConfig.eventType.length;i++){
					html+= '<div class="row">'
						  +' <div class="prop-mg-lr col-md-12">'
						  +'	<div class="form-group-prop">'
						  +'	<label class="label_property" style="">'+BaseControlConfig.eventType[i]+'</label>'
						  +'	<div class="controls">'
						  +'			<select onchange="BaseControlConfig.commProperty.commEvent.eventChange(this,true)" ref="'+BaseControlConfig.eventType[i]+'" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control eventTypeFun" selected="selected">'
						  +'				<option value=""></option>'
						  +'			</select>'
						  +'			<div class="pitch">'
						  +'			</div>'
						  +'		</div>'
						  +'	</div>'
						  +' </div>'
						  +'</div>'
				}
				return html;
			},
			eventChange:function(entity,flag,pageonloadFlag){
				var $this=$(entity);
				if($this.val()!=""){
					var f=0;
					$this.next(".pitch").find(".pitchContent").each(function(){
						if($(this).attr("ref")==$this.val()){
							f++;
						}
					});
					if(f==0){
						var isTF=true;
						if(!flag){
							isTF=false;
						}
						$this.next(".pitch").append('<div ref="'+$this.val()+'" class="pitchContent">'+$this.find("option:selected").text()+'<a href="#"><i class="fa fa-close" onclick="BaseControlConfig.commProperty.commEvent.delEventFun(this,'+isTF+')"></i></a></div>');
					}
					
				}
				BaseControlConfig.commProperty.commEvent.setControlEvent($this.next(".pitch"),flag,pageonloadFlag);
			},
			delEventFun:function(entity,flag){
				var select=$(entity).parent("a").parent(".pitchContent").parent(".pitch").prev();
				select.val("");
				$(entity).parent("a").parent(".pitchContent").remove();
				if($("#propertyZN").text()=="页面"){
					BaseControlConfig.commProperty.commEvent.setControlEvent(select.next(".pitch"),flag,true);
				}else{
					BaseControlConfig.commProperty.commEvent.setControlEvent(select.next(".pitch"),flag);
				}
			},
			setControlEvent:function(pitch,flag,pageonloadFlag){
				var eventFunName="";
				var pitchContents=pitch.find(".pitchContent");
				if(pitchContents!=""&&pitchContents!=null&&pitchContents.length>0){
					for(var i=0;i<pitchContents.length;i++){
						if(i==pitchContents.length-1){
							eventFunName+=$(pitchContents[i]).attr("ref");
						}else{
							eventFunName+=$(pitchContents[i]).attr("ref")+",";
						}
					}
				}
				//判断是否是页面加载后的事件
				if(pageonloadFlag){
					$("#add").attr(pitch.prev().attr("ref"),eventFunName);
					return ;
				}
				//判断是绑定控件事件还是绑定页面操作按钮的事件
				if(flag){
					var $focus=$(".hasFocus2:eq(0)");
					$focus.attr(pitch.prev().attr("ref"),eventFunName);
				}else{
					var ivalue=pitch.parent().prev().find("input").val();
					$("#form_button_input").attr(ivalue,eventFunName);
				}
			}
		},
		commCSS:{
			labelCSS:{
				content: '<div class="prop-mg-lr col-md-12">'
						+'	<div class="form-group-prop">'
						+'		<label class="label_property">label</label>'
						+'		<div class="controls">'
						+'			<select id="labelCSS-select" class="form-control" onchange="BaseControlConfig.commProperty.commCSS.labelCSS.cevent(this)" selected="selected">'
						+'				<option value="">请选择label字段的长度</option>'
						+'				<option value="col-md-1">col-md-1</option>'
						+'				<option value="col-md-2">col-md-2</option>'
						+'				<option value="col-md-3">col-md-3</option>'
						+'				<option value="col-md-4">col-md-4</option>'
						+'				<option value="col-md-5">col-md-5</option>'
						+'				<option value="col-md-6">col-md-6</option>'
						+'				<option value="col-md-7">col-md-7</option>'
						+'				<option value="col-md-8">col-md-8</option>'
						+'				<option value="col-md-9">col-md-9</option>'
						+'				<option value="col-md-10">col-md-10</option>'
						+'				<option value="col-md-11">col-md-11</option>'
						+'				<option value="col-md-12">col-md-12</option>'
						+'			</select>'
						+'		</div>'
						+'	</div>'
						+'</div>',
				cevent:function(e){
					var label=$(".hasFocus2").parent().prev("label");
					var oldc=label.attr("ref");
					label.removeClass(oldc);
					label.attr("ref",$(e).val());
					label.addClass($(e).val());
					if($(e).val()!=""){
						var c=$(e).val().split("-");
						var v=12-c[2];
						var nclass=label.next().attr("class").split(" ")[1];
						label.next().removeClass(nclass);
						label.next().addClass("col-sm-"+v);
					}
					
				}
			},
			contorlCSS:{
				content: '<div class="prop-mg-lr col-md-12">'
						+'	<div class="form-group-prop">'
						+'		<label class="label_property">整体长度</label>'
						+'		<div class="controls">'
						+'			<select id="contorlCSS-select" class="form-control" onchange="BaseControlConfig.commProperty.commCSS.contorlCSS.cevent(this)" selected="selected">'
						+'				<option value="">请选择控件字段的长度</option>'
						+'			</select>'
						+'		</div>'
						+'	</div>'
						+'</div>',
				cevent:function(e){
					var div=$(".hasFocus").parent().parent();
					var oldc=div.attr("ref");
					div.removeClass(oldc);
					div.attr("ref",$(e).val());
					div.addClass($(e).val());
				}
			},
			contorlNextCSS:{
				content: '<div class="prop-mg-lr col-md-12">'
						+'	<div class="form-group-prop">'
						+'		<label class="label_property">控件长度</label>'
						+'		<div class="controls">'
						+'			<select id="contorlNextCSS-select" class="form-control" onchange="BaseControlConfig.commProperty.commCSS.contorlNextCSS.cevent(this)" selected="selected">'
						+'				<option value="">请选择控件字段的长度</option>'
						+'			</select>'
						+'		</div>'
						+'	</div>'
						+'</div>',
				cevent:function(e){
					var div=$(".hasFocus").find("label").next();
					var oldc=div.attr("ref");
					div.removeClass(oldc);
					div.attr("ref",$(e).val());
					div.addClass($(e).val());
				}
			}
		},
		/**
		 * 初始化配置页面
		 */
		initElement:function(pid,selector){
			BaseControlConfig.projectTableId=pid;
			BaseControlConfig.commProperty.table.initValue();
			var html=BaseControlConfig.commProperty.table.content;
			html+=BaseControlConfig.commProperty.textName.content;
			html+=BaseControlConfig.commProperty.flowVariable.content;
			//html+=BaseControlConfig.commProperty.isRequired.content;
			html+=BaseControlConfig.commProperty.isShow.content;
			html+=BaseControlConfig.commProperty.isRead.content;
			//html+=BaseControlConfig.commProperty.stringLength.content;
			//html+=BaseControlConfig.commProperty.stringType.content;
			html+=BaseControlConfig.commProperty.unit.content;
			html+=BaseControlConfig.commProperty.message.content;
			html+=BaseControlConfig.commProperty.textRemarks.content;
			html+=BaseControlConfig.commProperty.button.content;
			html+=BaseControlConfig.commProperty.controlDefaultValue.content;
			$("#"+selector).html(html);
			//时间配置
			DateControl.prototype.setDateFormat("#"+selector);
			//判断是否是流程表单
			if($("#sys_type").val()!="5"){
				$("#flowVariable_row_div").remove();
			}
		}
}