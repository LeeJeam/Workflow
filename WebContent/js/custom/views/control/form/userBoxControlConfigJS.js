var UserBoxControlConfig={};

UserBoxControlConfig={
		/**
		 * 配置数据表
		 */
		dataTable:{
			content: '<div class="form-group-prop user_other_table_div" >'
					+'	<label class="label_property">人员表名</label>'
					+'	<div class="controls">'
					+'		<select id="user_other_table" ref2="tname" ref="userTable" onchange="UserBoxControlConfig.dataTable.otherTableChangeEvent(this)" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control userBoxSelect" selected="selected">'
					+'			<option value=""></option>'
					+'		</select>'
					+'	</div>'
					+'</div>'
					+'<div class="form-group-prop user_other_table_div_c" id="">'
					+'	<label class="label_property">人员表字段</label>'
					+'	<div class="controls">'
					+'		<select id="user_other_table_column" ref="userTableColumn" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
					+'			<option value=""></option>'
					+'		</select>'
					+'	</div>'
					+'</div>'
					
					+'<div class="form-group-prop user_other_table_div" >'
					+'	<label class="label_property">角色表名</label>'
					+'	<div class="controls">'
					+'		<select id="user_other_table_role"  ref2="tname" ref="userTableRole" onchange="UserBoxControlConfig.dataTable.otherTableChangeEvent(this)" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control userBoxSelect" selected="selected">'
					+'			<option value=""></option>'
					+'		</select>'
					+'	</div>'
					+'</div>'
					+'<div class="form-group-prop user_other_table_div_c" id="">'
					+'	<label class="label_property">角色表字段</label>'
					+'	<div class="controls">'
					+'		<select id="user_other_table_column_role"  ref="userTableColumnRole" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
					+'			<option value=""></option>'
					+'		</select>'
					+'	</div>'
					+'</div>'
					
					+'<div class="form-group-prop user_other_table_div" >'
					+'	<label class="label_property">机构表名</label>'
					+'	<div class="controls">'
					+'		<select id="user_other_table_org" ref2="tname" ref="userTableOrg" onchange="UserBoxControlConfig.dataTable.otherTableChangeEvent(this)" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control userBoxSelect" selected="selected">'
					+'			<option value=""></option>'
					+'		</select>'
					+'	</div>'
					+'</div>'
					+'<div class="form-group-prop user_other_table_div_c" id="">'
					+'	<label class="label_property">机构表字段</label>'
					+'	<div class="controls">'
					+'		<select id="user_other_table_column_org"  ref="userTableColumnOrg" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
					+'			<option value=""></option>'
					+'		</select>'
					+'	</div>'
					+'</div>'
					
					+'<div class="text-center">'
					+'	<button class="btn btn-primary btn-xs" onclick="UserBoxControlConfig.bind(1)" id="">绑定</button>'
					+'	<button class="btn btn-primary btn-xs" onclick="UserBoxControlConfig.unbind(1)" id="">撤消绑定</button>'
					+'</div>'
					
					+'<div class="row" id="user_config_interface_div" style="margin-top: 5px;">'
					+'	<div class="prop-mg-lr col-md-12">'
					+'		<div class="form-group-prop">'
					+'			<label class="label_property">人员接口</label>'
					+'			<div class="controls">'
					+'				<input type="text"  id="user_config_interface" data-gv-property="sublabel" class="form-control" placeholder="Label">'
					+'			</div>'
					+'		</div>'
					+'	</div>'
					+' </div>'
					+'<div class="text-center">'
					+'	<button class="btn btn-primary btn-xs" onclick="UserBoxControlConfig.bind(2)" id="">绑定</button>'
					+'	<button class="btn btn-primary btn-xs" onclick="UserBoxControlConfig.unbind(2)" id="">撤消绑定</button>'
					+'</div>',
			content2:'<div class="form-group-prop user_other_table_div" >'
					+'	<label class="label_property">人员表名:</label>'
					+'	<div class="controls" style="padding-top: 6px;">'
					+'  	用户表（yonghubiao）'
					+'	</div>'
					+'</div>'
					+'<div class="form-group-prop user_other_table_div" >'
					+'	<label class="label_property">角色表名:</label>'
					+'	<div class="controls" style="padding-top: 6px;">'
					+'  	角色表（jiaosebiao）'
					+'	</div>'
					+'</div>'
					+'<div class="form-group-prop user_other_table_div" >'
					+'	<label class="label_property">部门表名:</label>'
					+'	<div class="controls" style="padding-top: 6px;">'
					+'  	部门表（bumenbiao）'
					+'	</div>'
					+'</div>'
					+'<hr>'
					+'<div class="row" id="user_config_interface_div" style="margin-top: 5px;">'
					+'	<div class="prop-mg-lr col-md-12">'
					+'		<div class="form-group-prop">'
					+'			<label class="label_property">人员接口</label>'
					+'			<div class="controls">'
					+'				<input type="text"  id="user_config_interface" data-gv-property="sublabel" class="form-control" placeholder="Label">'
					+'			</div>'
					+'		</div>'
					+'	</div>'
					+' </div>'
					+'<div class="text-center">'
					+'	<button class="btn btn-primary btn-xs" onclick="UserBoxControlConfig.bind(2)" id="">绑定</button>'
					+'	<button class="btn btn-primary btn-xs" onclick="UserBoxControlConfig.unbind(2)" id="">撤消绑定</button>'
					+'</div>',
			content3:'<div class="form-group-prop">'
					+'	<label class="label_property">授权人员</label>'
					+'	<div class="controls">'
					+'		<textarea class="textarea form-control" id="userBoxConfigPeopleRange" style="height: 60px; width: 100%;" readonly="readonly"></textarea>'
					+'	</div>'
					+'</div>'
					+'<div class="text-center" style="overflow: hidden; margin-bottom: 5px;">'
					+'	<button class="btn btn-primary btn-xs" onclick="userBoxChooseConfigFun(1)">添加</button>'
					+'	<button class="btn btn-primary btn-xs"  onclick="UserBoxControlConfig.dataTable.clearChooseUserBoxConfig(\'userBoxConfigPeopleRange\',\'userRange\')">清除</button>'
					+'</div>'
					+'<div class="form-group-prop">'
					+'	<label class="label_property">授权角色</label>'
					+'	<div class="controls">'
					+'		<textarea class="textarea form-control" id="userBoxConfigRoleRange" style="height: 60px; width: 100%;" readonly="readonly"></textarea>'
					+'	</div>'
					+'</div>'
					+'<div class="text-center" style="overflow: hidden; margin-bottom: 5px;">'
					+'	<button class="btn btn-primary btn-xs"  onclick="userBoxChooseConfigFun(2)">添加</button>'
					+'	<button class="btn btn-primary btn-xs" onclick="UserBoxControlConfig.dataTable.clearChooseUserBoxConfig(\'userBoxConfigRoleRange\',\'userRoleRange\')">清除</button>'
					+'</div>'
					+'<div class="form-group-prop">'
					+'	<label class="label_property">授权部门</label>'
					+'	<div class="controls">'
					+'		<textarea class="textarea form-control" id="userBoxConfigOrgRange" style="height: 60px; width: 100%;" readonly="readonly"></textarea>'
					+'	</div>'
					+'</div>'
					+'<div class="text-center" style="overflow: hidden; margin-bottom: 5px;">'
					+'	<button class="btn btn-primary btn-xs"  onclick="userBoxChooseConfigFun(3)">添加</button>'
					+'	<button class="btn btn-primary btn-xs" onclick="UserBoxControlConfig.dataTable.clearChooseUserBoxConfig(\'userBoxConfigOrgRange\',\'userOrgRange\')">清除</button>'
					+'</div>',
				content4:'<div class="form-group-prop " id="">'
						+'	<label class="label_property">选人方式</label>'
						+'	<div class="controls">'
						+'		<select id="chooseUserBoxConfigType" onchange="UserBoxControlConfig.dataTable.chooseUserBoxConfigType(this)" ref="userTableColumnOrg" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">'
						+'			<option value="1">多选</option>'
						+'			<option value="2">单选</option>'
						+'		</select>'
						+'	</div>'
						+'</div>',
			otherTableChangeEvent:function(e){
				var value=$(e).find("option:selected").attr("ref");
				
				$.post(basePath+"/form/getdata.htm", {id:value}, function(data){
					var html='<option value=""></option>';
					if(data!=null&&data.length>0){
						for(var i=0;i<data.length;i++){
							html+='<option value="'+data[i].filed_name+'">'+data[i].column_alias+'</option>'
						}
					}
					var column=$(e).parent().parent().next().find("select");
					column.html(html).val($(".hasFocus2:eq(0)").attr(column.attr("ref")));
				},"json");
			},
			otherTableInitValue:function(pid){
				$.post(basePath+"/form/seleteSysByPid.htm", {pid:pid}, function(data){
					var html='<option value=""></option>';
					if(data!=null&&data.length>0){
						for(var i=0;i<data.length;i++){
							html+='<option type="'+(data[i].tableType==null?"":data[i].tableType)+'" ref="'+data[i].id+'" value="'+data[i].table_name+'">'+data[i].table_alias+'</option>'
						}
					}
					$(".userBoxSelect").html(html);
				},"json");
			},
			clearChooseUserBoxConfig:function(selector,p){
				$("#"+selector).val("");
				$(".hasFocus2:eq(0)").attr(p,"");
				$(".hasFocus2:eq(0)").attr(p+"Id","");
			},
			chooseUserBoxConfigType:function(e){
				var v=$(e).val();
				$(".hasFocus2:eq(0)").attr("chooseUserBoxConfigType",v);
			}
		},
		bind:function(f){
			var $focus2=$(".hasFocus2");
			if(f==1){
				if($focus2.attr("data-role")=="userbox"){
					
					$("#user_config_interface_div").hide().next().hide();
					$("#user_config_interface_div").find("input").val("");
					
					$(".user_other_table_div,.user_other_table_div_c").find("select").each(function(){
						$focus2.attr($(this).attr("ref"),$(this).val());
					});
					$focus2.removeAttr("userConfigInterface");
				}
			}else{
				if($focus2.attr("data-role")=="userbox"){
					$(".user_other_table_div,.user_other_table_div_c").hide().next().hide();
					$(".user_other_table_div,.user_other_table_div_c").find("select").val("");
					
					$(".user_other_table_div,.user_other_table_div_c").find("select").each(function(){
						$focus2.removeAttr($(this).val("").attr("ref"));
					});
					
					$focus2.attr("userConfigInterface",$("#user_config_interface").val());
				}
			}
		}
		,
		unbind:function(f){
			var $focus2=$(".hasFocus2");
			if(f==1){
				$(".user_other_table_div,.user_other_table_div_c").find("select").each(function(){
					$focus2.removeAttr($(this).val("").attr("ref"));
				});
				
				$("#user_config_interface_div").show().next().show();
			}else{
				$focus2.removeAttr("userConfigInterface");
				$("#user_config_interface").val("");
				$(".user_other_table_div,.user_other_table_div_c").show().next().show();
			}
		}
		,
		/**
		 * 初始化配置页面
		 */
		initElement:function(pid){
			var html=UserBoxControlConfig.dataTable.content2;
			$("#globalProperty6").html(html);
			var html3=UserBoxControlConfig.dataTable.content4;
			html3+=UserBoxControlConfig.dataTable.content3;
			$("#globalProperty7").html(html3);
			UserBoxControlConfig.dataTable.otherTableInitValue(pid);
			
		}
}