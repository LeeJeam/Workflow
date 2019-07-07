$(function() {
	/*
	 * var dataId=$("#iptid").val();//业务数据ID var
	 * etableName=$("#iptEtableName").val();//表单对应的表名 initparam(dataId,
	 * etableName);
	 */
	formCommInit();
	// 设置点击隐藏树
	clickOtherHideTree();
	if ($("#example-advanced").length > 0) {
		initTreeTable();
	}
	
});
// 保存状态
var entityBCZT = 0;
function formCommInit(formIDFlag, bID,style,operation) {
	
	
	var formID = "add";
	if (typeof (formIDFlag) != undefined && formIDFlag != ""
			&& formIDFlag != null) {
		formID = formIDFlag
	}
	
	
	//绩效订制默认当前人
	$("#" + formID).find("input[name=zhubanren],input[name=shenqingren1],input[name=shenqingren]").val($("#usernamespan").text());
	$("#" + formID).find("input[name=zhubanbumen],input[name=suoshubumen1],input[name=suoshubumen],input[name=banlibumen]").val($("#bumennamespan").text()=='null'?"":$("#bumennamespan").text());

	//赋默认值
	if(typeof(bID)!=undefined&&typeof(bID)!="undefined"&&bID!=null&&bID!=""){
		$("#" + formID).find("input[type=text],select,textarea").each(function(){
			var v=$(this).attr("v");
			if(typeof(v)!=undefined&&typeof(v)!="undefined"&&v!=null){
				$(this).val(v);
			}
		});
		$("#" + formID).find(".cbinput").each(function(){
			var v=$(this).attr("v");
			var $t=$(this);
			var type=$t.attr("data-role");
			if(type=="radio"||type=="checkbox"){
				if(typeof(v)!=undefined&&typeof(v)!="undefined"&&v!=null){
					$t.find("input").each(function(){
						if($(this).val()==v){
							$(this).get(0).checked=true;
						}
					});
				}
			}
			
		});
	}
	
	
	//给选人框添加点击事件
	$("#" + formID).find(".userboxdiv").attr("onclick","userBoxDisplayFun(this)");
	
	$("#" + formID).find("input[data-role=date]").each(function() {

		initDatetimepicker2($(this).attr("id"), $(this).attr("format"));
	});
	$("#from_cancel,#modal_close").click(function() {
		d = "";
	});
	var tableName = $('#' + formID).attr('table-name');
	var data = {};
	data.tableName = tableName;
	commValidatorForm(data, formID);
	initFormElement(formID);

	$("#" + formID).find(".fileupload").each(function() {
		var $this = $(this);
		var uID = $this.find("input[type=file]").attr("id");
		var fID = $this.attr("id");
		upload(uID, fID, null, $("#" + formID).find("#table-name").val());

	});
	$("#addBtn").click(function() {
		initFormElement(formID);
	});
	/**
	 * 判断是否是流程办理调用
	 */
	if (typeof (processFlag) != 'undefined' && processFlag == "process") {

		initparam(bID, "", "false", formID);
	}

	/**
	 * 给时间控件添加值的开始和结束范围
	 */
	$("#" + formID).find("input[data-role=date][datarecodeflag=1]").each(function(){
		var beginTime=$(this);
		var beginType=beginTime.attr("datarecodetype");
		$("#" + formID).find("input[data-role=date][datarecodeflag=2]").each(function(){
			var endTime=$(this);
			var endType=beginTime.attr("datarecodetype");
			if(typeof(beginType)!=undefined&&beginType!=""&&
			   typeof(endType)!=undefined&&endType!=""&&beginType==endType){
				betweenDate(beginTime,endTime,{language:'zh-CN',format:beginTime.attr("format"),todayBtn:1,autoclose: 1,startView: 2});
			}
		});
	});
	
	//给上传文件添加样式
	$(".fileupload").addClass("file_style");
	// 初始化页面配置的按钮和显示方式
	var formSelector = $("#"+formID);
	var footSelector;
	if(!!style) {
		footSelector = $(formSelector).parent().siblings('.modal-footer');
	} else {
		footSelector = $(formSelector).parents('.box-body').siblings('.box-footer');
	}
	FormPageConfig.commSetPageButtonAndDisplayMethodFun(formSelector,footSelector,formID);


	// 且不为编辑，删除时执行
	/*if(!(!!operation && (operation == 'edit' || operation == 'data_edit') || (operation == 'isView' || operation == 'data_isView'))) { //当为修改时不执行此方法
		FormPageBtnInit.prototype.modifyCallBack.call(arguments,formID);
	}*/
	if('modal' != style) { // 不是弹出框时执行
		formPageInit.init($("#"+formID));
	}

	if(!bID) {
		FormPageBtnInit.prototype.modifyCallBack.call(arguments,formID);

		FormPageBtnInit.prototype.initRadioClickEvent.call(arguments,formID);
	}

}
var d = {};



function setSelectOption(data, $this) {
	if (data.success) {
		var rows = data.rows;
		var options = '<option></option>';
		for (var i = 0; i < rows.length; i++) {
			options += '<option value="' + rows[i].id + '">' + rows[i].text
					+ '</option>';
		}
		$($this).html(options);
	}
}
var regexp01 = /^(([1-9][0-9]*|[1-9][0-9]*(\.\d{1,3})|[0](\.\d{1,3}))|([1-9]*)|([0]{1}))?$/;
function initparam(id, tableName, isView, formid) {
	if (typeof (formid) == undefined || formid == "" || formid == null) {
		formid = "add";
	}
	initFormElement(formid);
	$("#" + formid).find(".uploadify-queue-item").remove();
	$("#" + formid).find(".uploadFile").remove();
	$("#" + formid).find(".fileupload").each(
			function() {
				var $this = $(this);
				var uID = $this.children().attr("id");
				var fID = $this.attr("id");
				if (id != "") {
					loadattachment2(uID, !!isView && isView == "true", fID, id,
							$("#" + formid).find("#table-name").val());
				}
			});
	if (!!isView && isView == "true") {
		$("#" + formid).find(".fileupload").hide();
		
		// 如果是详情把提交按钮隐藏
		$("#form_btn_cance").next().hide().next().hide();
	} else {
		$("#" + formid).find(".fileupload").show();
		/*var bv=$("#" + formid).("#form_button_input").val();
		bv=bv.split(",");
		for(var i=0;i<bv.length;i++){
			$("#form_btn_"+bv[i]).show();
		}*/
		
	}
	if (typeof (tableName) == 'undefined' || tableName == ""
			|| tableName == null || tableName == "null") {
		tableName = $("#" + formid).find('#table-name').val();
	}
	d = id;
	if ("" != id) {
		commRequstFun(basePath + "/formOpration/findTableByid.htm", {
			"id" : id,
			"tableName" : tableName
		}, function(data) {
			if (null != data) {

				$("#" + formid).formSetValue(data, formid);
			}
		}, "json");

		// 检查是否绑定表
		// 检查是否绑定其它表
		$("#" + formid).find(".form-control[othertablename][othertablecolumn],.cbinput[othertablename][othertablecolumn]").each(
			function() {
				var $this = $(this);
				var tn = $this.attr("othertablename");
				var tc = $this.attr("othertablecolumn");
				var ctablename = $("#" + formid).attr('table-name');
				if (!!ctablename && !!tn && tn == ctablename) {
					commSetSIValue(basePath+ "/formOpration/findOtherTableData.htm",$this, {
								tablename : tn,
								id : id,
								operation : "!="
							}, tc, formid);
				}
			});
	}
}

/**
 * 表单验证
 *
 * @param data
 */
function commValidatorForm(data, formid) {
	if (typeof (formid) == undefined || formid == "" || formid == null) {
		formid = "add";
	}
	var validators = {};
	$("#" + formid).find("input,select,textarea").each(function() {
				var $this = $(this);
				var validEN = {};
				if($this.attr("type")=="radio"||$this.attr("type")=="checkbox"){
					if($this.parents(".cbinput:eq(0)").attr("showtype")=="2"){
						var r=$this.attr("required");
						if (typeof(r)!=undefined&&typeof(r)!="undefined"){
							$this.attr("data-required","required");
						}
						$this.removeAttr("required");
						return true;
					}
				}else{
					if($this.attr("showtype")=="2"){
						var r=$this.attr("required");
						if (typeof(r)!=undefined&&typeof(r)!="undefined"){
							$this.attr("data-required","required");
						}
						$this.removeAttr("required");
						return true;
					}
				}
				if ($this.attr("name") != ""&& $this.attr("type") != 'hidden'&& $this.attr("showtype")!="2") {



					if (!!$this.attr('required') && $this.attr('data-role') == 'date') {
						$($this).on('changeDate show', function(e) {
							$("#" + formid).bootstrapValidator('revalidateField', $($this).attr('name'));
						});
					}
					if ($.isDefined($this.attr("required"))) {
						validEN.notEmpty = {
							message : '必填!'
						};
					}
					if ($this.attr("valid-writeType") == "2") {
						validEN.regexp = {
							regexp : regexp01,
							message : '请输入整数,最多三位小数'
						};
					} else if ($this.attr("valid-writeType") == "3") {
						validEN.regexp = {
							regexp : /^[0-9]*$/,
							message : '请输入数字'
						};
					} else if ($this.attr("valid-writeType") == "4") {
						validEN.regexp = {
							regexp : /^[0-9a-zA-Z]*$/,
							message : '请输入数字或英文'
						};
					} else if ($this.attr('valid-writeType') == 5) // 电话号码
					{
						validEN.phone = {
							country : 'US',
							message : '请输入有效的电话号码'
						};
					} else if ($this.attr('valid-writeType') == 6) // 邮箱
					{
						validEN.emailAddress = {
							message : '请输入有效的邮箱地址'
						};
					} else if ($this.attr('valid-writeType') == 7) { //自定义正则
						var regex = $this.attr('data-regex');
						var message = $this.attr('data-message');
						if(!!regex) {
							validEN.regexp = {
								regexp:eval(regex),
								message:message
							}
						}
					}

					if ($.isDefined($this.attr("valid-writeLength"))) {
						var min = !!$this.attr("data-min") ? $this.attr("data-min") : 0;
						var message = '';
						if(min > 0) {
							message = "字符长度应大于" + min + '个字,且'
						}
						validEN.stringLength = {
							min : min,
							max : $this.attr("valid-writeLength"),
							message : message + '最长不能超过' + $this.attr("valid-writeLength")+ '个字'
						};
					}
					var $name = $this.attr("name");
					if(!!$name && !jQuery.isEmptyObject(validEN)) {
						validators[$name] = {
							validators : validEN
						};
					}
				}else{
					if($this.attr("showtype")=="2"){
						var r=$this.attr("required");
						if (typeof(r)!=undefined&&typeof(r)!="undefined"){
							$this.attr("data-required","required");
							$this.removeAttr("required");
						}
					}
					
				}
			});

		$('#' + formid).bootstrapValidator({
				feedbackIcons : {
					valid : 'glyphicon glyphicon-ok',
					invalid : 'glyphicon glyphicon-remove',
					validating : 'glyphicon glyphicon-refresh'
				},
				excluded : [ ':disabled' ],
				fields : validators
			}).on('success.form.bv',function(e) {
				
				

				/**
				 * 判断是不是跑流程时点击下一步审核人的验证
				 */
				if (typeof (processFlag) != 'undefined'&& "process" == processFlag&& runningFlow.isClickNextApplyUserFlag==1) {
					
					return false;
				}
				$('#' + formid).find(".formControlGroup").find("input,select,textarea").removeAttr("name");
				$('#' + formid).find("input[data-removeName]").removeAttr("name");
				e.preventDefault();
				var $form = $(e.target);
				data.attachments = JSON.stringify(attachmentJSON);
				var jsons = {};
				if (typeof (processFlag) != 'undefined'&& "process" == processFlag) {
					jsons = {
						processkey : runningFlow.process_key,
						taskId : runningFlow.task_Id,
						flag : true,
						comment : ""
					};
					// 检查是有配置流程变量的控件
					var lcblmc=[];
					jsons.lcblmc="";
					$("#" + formid).find("input[flowVariable]").each(function() {
							var $this = $(this);
							if ($this.attr("type") == "radio"|| $this.attr("type") == "checkbox") {
								if ($this.get(0).checked == true) {
									var flowVariable = $this.attr("flowVariable");
									if (flowVariable != ""&& flowVariable != null) {
										jsons[flowVariable] = $this.val();
										lcblmc.push(flowVariable);
									}
								}
							} else {
								var flowVariable = $this.attr("flowVariable");
								if (flowVariable != ""&& flowVariable != null) {
									jsons[flowVariable] = $this.val();
									lcblmc.push(flowVariable);
								}
							}

						});
					// 检查是有配置流程变量的控件
					$("#" + formid).find("select[flowVariable]").each(function() {
						var $this = $(this);
						var flowVariable = $this
								.attr("flowVariable");
						if (flowVariable != ""
								&& flowVariable != null) {
							jsons[flowVariable] = $this.val();
							lcblmc.push(flowVariable);
						}
					});
					if(lcblmc.length>0){
						jsons.lcblmc=lcblmc.join(",");
					}
					
				}
				d = "";
				data.bczt = entityBCZT;
				var url=basePath + "/button/updateOrSave.htm"
				if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
				{
					url += "?"+commVariable;
				}
				$form.ajaxSubmit({
							url : url,
							type : 'post',
							data : data,
							async : false, 
							datatype : 'json',
							success : function(data) {
								
								if (data.status) {
									attachmentJSON = [];

									var pageInit = new FormPageBtnInit();

									pageInit.saveControlApp(data.message,formid,runningFlow.process_key);
									pageInit.updateChildrenData(formid,runningFlow.process_key,data.message);
									pageInit.saveFormulateFunc('saveWorkContent',runningFlow.process_key);
									/**
									 * 返回调用保存后的回调函数
									 */
									if (typeof (formEventCallBackFun) != 'undefined'&&typeof (formEventCallBackFun) != undefined&&formEventCallBackFun!="") {
										var splits = formEventCallBackFun.split(",");
										for(var s in splits) {
											try{
												var split = splits[s].substring(0,splits[s].indexOf("("));
												eval(""+split+"(data,formid)");
											}catch(e){
												
											}
											
										}
									}

									//$('#' + formid).resetForm();
									$("#" + formid).data("bootstrapValidator").resetForm(true);
									$('#' + formid).find('input[name="id"]').val('');
									// alert(entityBCZT=='0'?"保存成功":"提交成功");


									/**
									 * 判断是不是新建流程时的提交表单
									 */
									if (typeof (createProcessFlag) != 'undefined'&& "createProcessFlag" == createProcessFlag&& entityBCZT == '1') {
										var bID = data.message;
										// 此方法在新建流程模板里面
										//createProcessBySubmit(bID);
									} else {
										
										$($('#' + formid).parents(".in")[0]).find("#modal_close").click();
									}

									/**
									 * 判断是不是跑流程表单
									 */
									if (typeof (processFlag) != 'undefined'&& "process" == processFlag&& entityBCZT == '1') {
										var bID = data.message;
										jsons.bID = bID;
										runningFlow.runningFlowProcess(jsons);
									} else {
										if ($("#example-advanced").length > 0) {
											initTreeTable();
										} else {
											dtable.draw();// 更新表格数据
										}
									}
									
								} else {
									alert("操作失败");
								}
								$(".modal-footer,.box-footer").find("button").removeAttr("disabled");
							}
						});
					}).on('error.form.bv', function (e) {
						
						$(".modal-footer,.box-footer").find("button").removeAttr("disabled");
					});

	$('#previewModal,#previewModal2').on('hidden.bs.modal', function() {
		$("#" + formid).data("bootstrapValidator").resetForm(true);
	});

	var formIds = !!formid ? formid.split('_') : '';
	if(!!formIds && formIds.length >= 2) {
		if(!isNaN(formIds[0])) {
			$('#'+formIds[0]).on('hidden.bs.modal', function() {
				$("#" + formid).data("bootstrapValidator").resetForm(true);
			});

		}
	}

	$("#form_btn_cance").click(function() {
		$("#modal_close").click();
	})
}
var formEventCallBackFun;
function formSubmit(bczt, formIDFlag,callBack) {
	/*
	 * if(typeof(runningFormProcessFlag) != 'undefined' &&
	 * "runningFormProcessFlag" == runningFormProcessFlag) { openUserWin();
	 * }else{
	 */
	entityBCZT = bczt;
	var formid = "add";
	if (typeof (formIDFlag) != undefined && formIDFlag != ""
			&& formIDFlag != null) {
		formid = formIDFlag
	}
	$(".modal-footer,.box-footer").find("button").attr("disabled","disabled");
	formEventCallBackFun=callBack;
	$("#" + formid).submit();
	// }

}
function delChooseUserFun(entity) {
	$(entity).parent().parent().remove();
}

/**
 * 时间区域选择
 * 
 * @param selector1
 *            开始时间jquery选择器表达式
 * @param selector2
 *            结束时间jquery选择器表达式
 * @param startTime
 *            最小开始时间
 * @param endTime
 *            最大结束时间
 * @param options
 *            继承datetimepicker参数
 */
function betweenDate(ele1, ele2, options, startTime, endTime) {
	options = $.extend({
		readOnly : true
	}, options);
	$(ele1).datetimepicker(options).on('changeDate', function(ev) {
		$(ele2).datetimepicker("setStartDate", ev.date);
	});
	if ("" != startTime && undefined != startTime && null != startTime) {
		$(ele1).datetimepicker('setStartDate', startTime);
	}

	$(ele2).datetimepicker(options).on('changeDate', function(ev) {
		$(ele1).datetimepicker("setEndDate", ev.date);
	});
	if ("" != endTime && undefined != endTime && null != endTime) {
		$(ele2).datetimepicker('setEndDate', endTime);
	}
}
function initDatetimepicker2(eleId, format) {
	if (!!eleId) {
		dtpicker("input[id='" + eleId + "']", {
			language : 'zh-CN',
			format : format,
			todayBtn : 1,
			autoclose : 1,
			startView : 2,
			minView : 2
		});
	}
}

function initDatetimepicker(eleId, format) {
	if (!!eleId) {
		dtpicker("input[name='" + eleId + "']", {
			language : 'zh-CN',
			format : format,
			todayBtn : 1,
			autoclose : 1,
			startView : 2,
			minView : 2
		});
	}
}

function dtpicker(selector, options) {
	try {
		options = $.extend({
			readOnly : true,
			minView : 2
		}, options);
		$(selector).datetimepicker(options);
	} catch (ex) {
	}
}

function getElementById(selector) {
	var type = $.type(selector);
	if (type === "string") {
		return $(/^#.+/.test(selector) ? selector : "#" + selector);
	} else if (type === "object" && !selector.jquery) {
		return $(selector);
	}
	return selector;
}
/**
 * 为表单赋值
 */
$.fn.formSetValue = function(data, formid) {

	FormPageBtnInit.prototype.radioCheckboxInit.call(arguments,formid); //给需要控制隐藏和显示的控件绑定事件


	this.each(function() {
		var input, name;
		if (data == null || data.length == 0) {
			this.reset();
			return;
		}
		for (var i = 0; i < this.length; i++) {
			input = this.elements[i];
			// checkbox的name可能是name[]数组形式
			name = (input.type == "checkbox") ? input.name.replace(/(.+)\[\]$/,
					"$1") : input.name;
			if (data[0][name] == undefined)
				continue;

			switch (input.type) {
			case "checkbox":
				if (data[0][name] == "") {
					input.checked = false;
				} else {
					// 数组查找元素
					if (data[0][name].indexOf(input.value) > -1) {
						input.checked = true;
					} else {
						input.checked = false;
					}
				}
				break;
			case "radio":
				if (data[0][name].toString() == ""
						|| data[0][name].toString() == null) {
					input.checked = false;
				} else if (input.value == data[0][name].toString()) {
					input.checked = true;
					//$(input).click();
				}
				break;
			case "select-one":
				var vals = data[0][name];
				$(input).val(vals);
				break;
			case "select-multiple":// 多选框赋值
				var vals = data[0][name].split(",");
				if (vals.length != 0) {
					for (var k = 0; k < vals.length; k++) {
						for (var j = 0; j < input.length; j++) {
							if (vals[k] == input[j].value) {
								input[j].selected = "selected";
							}
						}

					}
					$(input).trigger('change');
				}

				break;
			case "button":
				break;
			default:
				input.value = data[0][name];

			}

		}

	});
	if (data != null && data != undefined && data.length > 0) {
		$("select[levelselect=1]").each(
				function() {
					var $level = $(this);
					var $level2 = $("select[othertablename="+ $level.attr("othertablename")+ "][levelselect=2]");
					var $level3 = $("select[othertablename="+ $level.attr("othertablename")+ "][levelselect=3]");
					if ($level2.length > 0) {
						$level2.empty();
					}
					if ($level3.length > 0) {
						$level3.empty();
					}
					if ($level.attr("name") != "") {
						$level.val(data[0][$level.attr("name")]);
					}
					if ($level.val() != "" && $level2.length > 0) {
						$level.change();
						$level2.val(data[0][$level2.attr("name")]);
					}
					if ($level2.val() != "" && $level3.length > 0) {
						$level2.change();
						$level3.val(data[0][$level3.attr("name")]);
					}
				});
	}

	// 判断表单有没有树
	var pid = $("#" + formid).find("#pidinput");
	if (pid.length > 0) {
		if (pid.val() == "0") {
			$("#" + formid).find("#pidnameinput").val("");
			return;
		}
		commRequstFun(basePath + "/formOpration/findTableByid.htm", {"id" : pid.val(),"tableName" : $("#" + formid).find("#table-name").val()}, function(data) {
			if (null != data && data.length > 0) {

				$("#" + formid).find("#pidnameinput").val(data[0].name);

			}
		}, "json");
	}


	var formPageBtnInit = new FormPageBtnInit();

	formPageBtnInit.modifyCallBack(formid);//修改和查看详情时调用页面初始化方法
	formPageBtnInit.modifyInitControlGoupData(data[0].id,formid);//初骀化控件组
	formPageBtnInit.setControlDisabled(formid); //设置选中后需要触发的事件


};
/**
 * 检查是否绑定表 检查是否绑定事件 检查是否绑定其它表
 */
function initFormElement(formid) {

	if (typeof (formid) == undefined || formid == "" || formid == null) {
		formid = "add";
	}
	// 检查是否有隐藏的控件
	$("#" + formid).find(".form-control[showtype],div[data-role=radio][showtype],div[data-role=checkbox][showtype]").each(function() {
		var $this = $(this);
		var showtype = $this.attr("showtype");
		if (showtype == "2") {
			
			var dataRole=$this.attr("data-role");
			if(dataRole=="userbox"||dataRole=="text"){
				var v=$this.parent().parent();
				//$this.attr("disabled","disabled");
				if(v.siblings("div").length==0){
					v.parent().hide();
				}else{
					v.hide().prev().hide();
				}
			} else if (dataRole=="checkbox"||dataRole=="radio"){
				var v =$this;
				//$this.find("input").attr("disabled","disabled");
				if(v.siblings("div").length==0){
					v.parent().hide();
				}else{
					v.hide().prev().hide();
				}
			}else{
				//$this.attr("disabled","disabled");
				var v = $this.parent();
				if(v.siblings("div").length==0){
					v.parent().hide();
				}else{
					v.hide().prev().hide();
				}
			}
		}
	});
	// 检查是否绑定其它表
	$("#" + formid).find(".form-control[othertablename][othertablecolumn],.cbinput[othertablename][othertablecolumn]").each(function() {
						var $this = $(this);
						var tn = $this.attr("othertablename");
						var tc = $this.attr("othertablecolumn");
						var dd = {
							tablename : tn
						};
						if ($this.attr("levelselect") != null&& $this.attr("levelselect") != ""&& $this.attr("levelselect") != undefined) {
							dd.level = $this.attr("levelselect");
							if ($("select[othertablename=" + tn+ "][levelselect=2]").length > 0) {
								$("select[othertablename=" + tn+ "][levelselect=2]").empty();
							}
							if ($("select[othertablename=" + tn+ "][levelselect=3]").length > 0) {
								$("select[othertablename=" + tn+ "][levelselect=3]").empty();
							}
							if (dd.level == "1" || dd.level == 1) {
								commSetSIValue(basePath+ "/formOpration/findOtherTableData.htm",$this, dd, tc, formid);
								$this.change(function() {
									queryLever(basePath+ "/formOpration/findOtherTableData.htm",$("select[othertablename="+ tn+ "][levelselect=2]"),
											{
												tablename : tn,
												level : 2,
												pid : $this.val()
											});
									});
							}
							if (dd.level == "2" || dd.level == 2) {

								$this.change(function() {
									queryLever(basePath+ "/formOpration/findOtherTableData.htm",$("select[othertablename="+ tn+ "][levelselect=3]"),
											{
												tablename : tn,
												level : 3,
												pid : $this.val()
											});
									});
							}
						} else {
							commSetSIValue(basePath+ "/formOpration/findOtherTableData.htm",$this, dd, tc, formid);
						}

					});
	// 检查是否绑定事件
	$("#" + formid).find(".form-control[eventname][eventfun]").each(function() {
		var $this = $(this);
		$this.attr($this.attr("eventname"), $this.attr("eventfun"));
	});
	// 检查是否绑定表
	$("#" + formid).find(".form-control[flag]").each(
			function() {
				var $this = $(this);
				var flag = $this.attr("flag");
				commSetSIValue(basePath+ "/formOpration/findDataConfigByType.htm", $this, {type : flag}, 'name', formid);
			})

}
function queryLever(url, $this, data) {
	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
	{
		url += "?"+commVariable;
	}
	$.ajax({
		type : "post",
		url : url,
		data : data,

		async : false,

		success : function(formdata) {
			var data = formdata;
			if (data != null && data.length > 0) {

				var html = "";
				html += '<option value=""></option>';
				for (var v = 0; v < data.length; v++) {
					html += '<option value="' + data[v].id + '">'
							+ data[v]["name"] + '</option>';
				}
				$this.empty().html(html);

			}

		}
	});

}
function commSetSIValue(url, $this, data, columnName, formid) {
	var type = $this.attr("data-role");
	var name = $this.find("input:eq(0)").attr("name");
	var required = $this.find("input:eq(0)").attr("required");
	var $required = '';
	if ($.isDefined(required) && required == "required") {
		$required = 'required'
	}
	commRequstFun(url, data, function(data) {

		if (data != null && data.length > 0) {

			var html = "";

			if (type == "select") {
				html += '<option value=""></option>';
				for (var v = 0; v < data.length; v++) {
					html += '<option value="' + data[v].id + '">'
							+ data[v][columnName] + '</option>';
				}
				$this.empty().html(html);
				if (d != "" && d != null) {
					$this.val(d[$this.find("select").attr("name")]);
				}
			} else {
				for (var v = 0; v < data.length; v++) {

					html += '<div class="' + type
							+ '"  ref="checkbox" ><label><input ' + $required;

					html += ' name="' + name + '" value="' + data[v].id
							+ '" type="' + type + '" > <span>'
							+ data[v][columnName] + ' </span></label></div>';
				}
				$this.empty().html(html);
			}

		} else {
			$this.empty().html("");
		}
		commRequstFun(basePath + "/formOpration/findTableByid.htm", {
			"id" : d,
			"tableName" : $("#" + formid).find("#table-name").val()
		}, function(data) {
			if (null != data) {

				$("#" + formid).formSetValue(data, formid);
			}
		}, "json");
	}, "json");
}

/*******************************************************************************
 * 文件导入导出功能
 * 
 * @type {{fileImport: Function, fileExport: Function}}
 */
var FileImportAndExport = {
	fileImport : function() {
		var tableName = $("#worktable").attr('data-tablename');

		var var0 = [];
		$("#worktable thead tr th").each(function() {
			var ref = $(this).attr('ref');
			if (!(!!ref && ref == 'none')) {
				var json = {};
				json.id = $(this).attr("id");
				json.text = $(this).text();
				var0.push(json);
			}
		});
		var params = {
			"tableName" : tableName
		};
		if (var0.length > 0) {
			params.columns = JSON.stringify(var0);
		}
		if (relations.length > 0) {
			params.relations = JSON.stringify(relations);
		}
		if (attachmentJSON.length > 0) {
			params.attachments = JSON.stringify(attachmentJSON);
		}
		commRequstFun(basePath + "/excel/import.htm", params, function(data) {
			if (data.success) {
				$("#importClose").click();
				dtable.draw();// 更新表格数据
				attachmentJSON = [];
				upload("importUploadify", 'importFileQueue', "*.xls;*.xlsx;");
				$('.uploadify-queue-item').remove();
				alert('导入成功');
			} else {
				alert('导入失败!');
			}
		});
	},
	fileExport : function() {
		var var0 = [];
		var var1 = [];
		$("#worktable thead tr th").each(function() {
			var ref = $(this).attr('ref');
			if (!(!!ref && ref == 'none')) {
				var0.push($(this).text());
				var1.push($(this).attr('id'));
			}
		});
		var tableName = $("#worktable").attr('data-tablename');
		var columns = var1.join(',');
		var title = var0.join(',');
		var url= basePath + '/excel/export.htm?tableName='+ tableName + '&columns=' + columns + '&title='+ encodeURI(encodeURI(title)) + "&relations="+ JSON.stringify(relations)
		if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
		{
			url += "&"+commVariable;
		}
		window.location.href =url;
	}
};
/**
 * 初始化树
 */
function findFormTreeNodes(tname) {
	$("#findFormTreeNodesdivul").show();
	$.getTree(basePath + "/formOpration/findFormTreeNode.htm", {
		"tablename" : tname,
		"pid" : $("#add").find("input[name=id]").val()
	}, $("#findFormTreeNodesul"), function(event, treeId, treeNode, clickFlag) {
		$("#pidnameinput").val(treeNode.name);
		$("#pidinput").val(treeNode.id);
		$("#findFormTreeNodesdivul").hide();

	}, function() {
		// $("li#findFormTreeNodesul_"+$("#add").find("input[name=id]").val()).remove();
	});
	return false;
}
/**
 * 字典管理隐藏树
 */
function hideFormTreeNodes() {
	$("#findFormTreeNodesdivul").hide();
}
/**
 * 字典管理树的隐藏操作
 */
function clickOtherHideTree() {
	$("#data_base_add_btn").click(function() {
		$("#findFormTreeNodesdivul").hide();
		$("#pidnameinput").val("");
		$("#pidinput").val("0");
		$(".modal-title").text("新增");
		$("#form_btn_save,#form_btn_submit").show();
		$("#add").find("input[name=id]").val("");
	});
	$("#pidnameinput").siblings().click(hideFormTreeNodes);
	$("#pidnameinput").parent().parent().siblings().click(hideFormTreeNodes);
	$("#pidnameinput").parents(".modal-body").siblings().click(
			hideFormTreeNodes);
	// 详情按钮事件
	$("#data_base_view_btn").click(
			function() {
				if ($("tr.selected").length == 0) {
					alert("请选择一行数据");
					return false;
				}
				$(".modal-title").text("详情");

				if ($("#example-advanced").length > 0) {
					initparam($("tr.selected:eq(0)").attr("data-tt-id"), "","false", "add");
				} else {
					initparam($("tr.selected:eq(0)").find("input[name=id]").val(), "", "false", "add");
				}
				$("#form_btn_save,#form_btn_submit").hide();
			});
	// 删除按钮事件
	$("#data_base_delete_btn").click(function() {
		if ($("tr.selected").length == 0) {
			alert("请选择一行数据");
			return false;
		}
		if (confirm("确认要删除？")) {
			if ($("#example-advanced").length > 0) {
				del($("tr.selected:eq(0)").attr("data-tt-id"));
			} else {
				del($("tr.selected:eq(0)").find("input[name=id]").val());
			}
			window.location.href = window.location.href;
		}

	});
	// 修改按钮事件
	$("#data_base_edit_btn").click(
		function() {
			if ($("tr.selected").length == 0) {
				alert("请选择一行数据");
				return false;
			}
			$(".modal-title").text("修改");
			$("#form_btn_save,#form_btn_submit").show();
			if ($("#example-advanced").length > 0) {
				initparam($("tr.selected:eq(0)").attr("data-tt-id"), "","false", "add");
			} else {
				initparam($("tr.selected:eq(0)").find("input[name=id]").val(), "", "false", "add");
			}

		});
}

function initTreeTable() {

	var url=basePath + "/formOpration/findFormTreeNodeTable.htm";
	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
	{
		url += "?"+commVariable;
	}
	$.ajax({
			type : "post",
			url : url,
			data : {
				"tablename" : $("#add").find('#table-name').val()
			},
			dataType : "json",
			success : function(data) {

				var html = '   <caption>'
						+ '     <a href="#" onclick="jQuery(\'#example-advanced\').treetable(\'expandAll\'); return false;">展开所有            </a>'
						+ '    <a href="#" onclick="jQuery(\'#example-advanced\').treetable(\'collapseAll\'); return false;">  收缩所有</a>'
						+ '  </caption>' + '  <thead>' + '    <tr>';
				$("#example-advanced").find("th").each(function() {
							var $th = $(this);
							html += '<th id="' + $th.attr("id") + '">'+ $th.text() + '</th>'
					});

				html += '    </tr>' + '  </thead>' + '  <tbody>';

				if (data != null && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						var ob = data[i];
						if (ob.pid == 0) {
							html += "<tr data-tt-id='" + ob.id + "'>";
						} else {
							html += "<tr data-tt-id='" + ob.id+ "' data-tt-parent-id='" + ob.pid+ "'>";
						}

						$("#example-advanced").find("th").each(function(i) {
							var $th = $(this);
							if ($th.attr("id") == "name") {
								html += "<td><span class='"+ ob.dtype+ "'>"+ ob[$th.attr("id")]+ "</span></td>";
							} else {
								if ($th.attr("id") == "pid") {
									html += "<td>"+ (ob["pname"] == undefined ? "": ob["pname"])+ "</td>";
								} else {
									html += "<td>"+ ob[$th.attr("id")]+ "</td>";
								}

							}

						});
						html += "</tr>";

					}
					html += ' </tbody>';
					$("#example-advanced").empty();
					$("#example-advanced").html(html);

				}
				initTreeTableCommFun();
			}
		});
}

function initTreeTableCommFun() {

	$("#example-advanced").treetable({
		expandable : true
	});

	// Highlight selected row
	$("#example-advanced tbody tr").mousedown(function() {
		$("tr.selected").removeClass("selected");
		$(this).addClass("selected");
	});

	// Drag & Drop Example Code
	$("#example-advanced .file, #example-advanced .folder").draggable({
		helper : "clone",
		opacity : .75,
		refreshPositions : true, // Performance?
		revert : "invalid",
		revertDuration : 300,
		scroll : true
	});

	$("#example-advanced .folder").each(function() {
		$(this).parents("tr").droppable({
			accept : ".file, .folder",
			drop : function(e, ui) {
				var droppedEl = ui.draggable.parents("tr");
				$("#example-advanced").treetable("move", droppedEl.data("ttId"),$(this).data("ttId"));
			},
			hoverClass : "accept",
			over : function(e, ui) {
				var droppedEl = ui.draggable.parents("tr");
				if (this != droppedEl[0]
						&& !$(this).is(".expanded")) {
					$("#example-advanced").treetable("expandNode",$(this).data("ttId"));
				}
			}
		});
	});
}


