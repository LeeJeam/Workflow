var RunningFlow = function () {
	this.businessId="";
	this.process_key="";
	this.task_Id="";
	this.formPageName="";
	this.isLast="";
	this.isClickNextApplyUserFlag="";
};

var runningFlow = new RunningFlow();

/**
 * 运行流程
 * @param jsons
 * @param flag
 */
RunningFlow.prototype.queryProcessNextUsers = function (){
	
	var formid=$("#nextApplyUser").attr("formid");
	var jsons = {};
	jsons = {
		processkey : runningFlow.process_key,
		taskId : runningFlow.task_Id,
		flag : true,
		comment : ""
	};
	// 检查是有配置流程变量的控件
	var lcblmc=[];
	jsons.lcblmc="";
	try{
		runningFlow.isClickNextApplyUserFlag=1;
		$('#'+formid).bootstrapValidator('validate');
		var bl=$('#'+formid).data('bootstrapValidator').getInvalidFields().length;
		if(bl>0){
			return ;
		}
		
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
	}catch(e){
		
	}
	
	
	commRequstFun(basePath+"/processController/queryProcessNextUsers.htm", jsons, function(data){
			
			if(data!=null&&data!=""&&data.length>0&&data[0].open==true){
				//改变任务ID为下一步的任务ID
				//runningFlow.task_Id=data[0].taskId;
				flowChooseUserPagePopFun(data);
		 	 }
			runningFlow.isLast="";
			try{
				if(data[0].open==false){
					alert("已是最后一步，不需选人");
					$("#submitProcessBth").show();
			 		$("#nextApplyUser,#chooseNextUserDisplayInput").hide();
			 		runningFlow.isLast="yes";
				}else{
					if(data==null||data==""||data.length==0){
						alert("当前步未配置审核人！");
					}
				}
			}catch(e){
				
			}
			
			
	},"json");
	
}

/**
 * 运行流程
 * @param jsons
 * @param flag
 */
RunningFlow.prototype.runningFlowProcess = function (jsons,flag){
	runningFlow.isClickNextApplyUserFlag="";
	
	
	if(runningFlow.isLast!="yes"){
		var users=$("#chooseNextUserDisplayInput").val();
		if(users==""){
			alert("请选择审核人");
			return;
		}
		jsons.users=users
	}else{
		jsons.users="";
	}
	
	var d=jsons;
	if(flag==1){
		d={taskId:runningFlow.task_Id}
	}
	
	commRequstFun(basePath+"/processController/complete.htm", d, function(data){
			
			if(runningFlow.isLast=="yes"){
				var btn =  $('form[table-name]:last').find('#form_button_input');
				var method =  !!btn.attr("save") ? btn.attr("save") : btn.attr("submit");
				if(!!method) {
					try {
						method = method.substring(0,method.indexOf("("));
						var func = eval(method);
						if(!!func) {
							func(jsons.processkey,jsons.bID,d.taskId);
						}
					}catch (e) {console.log(e);}
				}
				
			}
			
			
			//存流程关联表单的信息
			if(jsons!=""&&jsons!=null){
				var fjp={};
				fjp.proccessId=runningFlow.process_key;
				fjp.taskId=jsons.taskId;
				fjp.formName=runningFlow.formPageName;
				fjp.bid=jsons.bID;
				commRequstFun(basePath+"/formOpration/insertFormJoinProcess.htm", fjp, function(data){
					
					
				},"json");
			}
			
			$("#form_btn_cance_back").click();
			
	},"json");
	
}

/**
 * 查询流程待办数据
 */
RunningFlow.prototype.initProcessRunning=function (){
	var u=basePath+"/processController/tasking.htm";
	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
	{
		u += "?"+commVariable;
	}
	$.ajax({
		type:"post",
		url:u,
		data:{"userId":"张三"},
		dataType: 'json',
		success:function(data){
			$('#function-table-processRunning').DataTable( {
			    data: data,
			    paging: true,
				lengthChange: false,
		        searching: false,
				processing: true,
				oLanguage: {
		        	sInfo: "总共：_TOTAL_ 条",
				},
				autoWidth: false,
				bSort:false,
				scrollX: true,
			    columns: [
			        { data: 'taskId' },      
			        { data: 'processDefname',"mRender": function(data,type,full){
							return '<a  href="#" data-toggle="modal" data-target="#workflowTrace" onclick="runningFlow.graphTrace('+full.processInstId+')" >'+full.processDefname+ '</a>'
					}},
					{ data: 'varName' },
			        { data: 'taskTime'},
			        { data: 'processDefSuspended' },
			        { data: 'taskName' },
			        { data: 'taskAssignee' },
			        { data: 'operate',"mRender": function(data,type,full){
						if(full.taskAssignee!=null&&full.taskAssignee!=""){
							return '&nbsp;&nbsp;<a  href="javascript: void(0);"  class="btn btn-primary btn-xs" onclick="runningFlow.jumpFlowPage(\''+full.processInstId+'\',\''+full.taskId+'\')" >审批</a>&nbsp;&nbsp;<a href="javascript: void(0);" class="btn btn-primary btn-xs" onclick="runningFlow.undoTask('+full.taskId+',\''+full.processInstId+'\')" >回退</a>'
						}else{
							return '&nbsp;&nbsp;<a  href="javascript: void(0);"  class="btn btn-primary btn-xs" onclick="runningFlow.jumpFlowPage(\''+full.processInstId+'\',\''+full.taskId+'\')" >查看</a>'
						}
					}}
			    ]
			} );
		}
	});
}
RunningFlow.prototype.jumpFlowPage=function (processkey,taskId){
	
	var u=basePath+"/pageToPage/toFlowCommPage.htm?processkey="+processkey+"&taskId="+taskId;
	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
	{
		u += "&"+commVariable;
	}
	window.location.href=u;
}
/**
 * 提交选择的下一步审核人
 */
RunningFlow.prototype.submitChooseUser=function (){
	 var users=$("#popCommFlowUserInput").val();
	 $("#popCommFlowUserInput").val("");
	
	 $("#chooseNextUserDisplayInput").val(users);
	 $("#submitProcessBth").show();
	// $("#nextApplyUser").hide();
	 
	
}
/**
 * 提交流程
 */
RunningFlow.prototype.submitProcess=function (formSelect){
	runningFlow.isClickNextApplyUserFlag="";
	if(runningFlow.isLast!="yes"){
		var users=$("#chooseNextUserDisplayInput").val();
		if(users==""){
			alert("请选择审核人");
			return;
		}
	}
	
	formSubmit(1,formSelect);
}
/**
 * 打开选人框
 * @param formSelect
 */
RunningFlow.prototype.openUserWin=function (formSelect){
	formSubmit(1,formSelect);
}

/**
 * 选人框用到的树
 * @param selecter
 * @param data
 * @param fn
 */
RunningFlow.prototype.treeT=function (selecter,data,fn){
	   /**
      * 开始 - 树目录结构参数设置
      */
     var setting = {
         data: {
             simpleData: {
                 enable: true,
                 idKey: "id",
                 pIdKey: "pId",
                 rootPId: ""
             }
         },
         callback: {
             onClick: fn
         }
     };
     $.fn.zTree.init($(selecter), setting, data);
 }
/**
 * 待办跳转页面
 * @param id
 * @param processkey
 * @param taskId
 * @returns {Boolean}
 */
RunningFlow.prototype.taskHandle=function (processkey,taskId){
	runningFlow.process_key=processkey;
	runningFlow.task_Id=taskId;
	var sign="";
	var uu1=basePath+"/processController/isFlag.htm";
	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
	{
		uu1 += "?"+commVariable;
	}
	//查询流程是否有回退
	$.ajax({
			type:"post",
			url:uu1,
			data:{taskId:taskId},
			async : false, 
			
			success:function(data){
				
				if(!data.status){
					sign=data.message;
					
				}
			}
			
	});
	
	var uu=basePath+"/formOpration/queryFormJoinProcess.htm";
		if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
	{
		uu += "?"+commVariable;
	}
	$("#content,#rightmenu .textBox").empty();
	//$(".content").append(FlowCommPage.style);
		var i=0;
		var f=0;
	//查询流程执行的历史表单
	$.ajax({
			type:"post",
			url:uu,
			data:{proccessId:processkey},
			async : false, 
			success:function(data){
				
				if(data!=null&&data.length>0){
					i=data.length;
					for(var v=0;v<data.length;v++){
						
						//判断是否是同一个
						if(taskId==data[v].taskId){
							if(v>0){
								runningFlow.getProcessJoinForm(data[v].formName,data[v].bid,v,true,taskId,processkey,"");
							}else{
								runningFlow.getProcessJoinForm(data[v].formName,data[v].bid,v,false,taskId,processkey,1);
							}
							f++;
						}else{
							runningFlow.getProcessJoinForm(data[v].formName,data[v].bid,v,true,taskId,processkey,"");
						}
					}
				}
			}
			
	});
	if(f==0){
		//返回当前需要跑的表单名称
		 commRequstFun(basePath+"/processController/taskViewForm.htm", {processId:processkey,taskId:taskId}, function(data){
		 	
		 	if(data!=null&&data!=""&&data.length>0){
		 			var pageName=data[0].pageName;
		 			runningFlow.formPageName=data[0].pageName;
		 			
		 			var ff=false;
		 			
	 				if(sign=="sign"){
	 					ff=true;
						$("#signRemarsWrite").show().find("textarea").val("");
						$("#flowOprationBtnFooter").remove();
						
						
					}
	 				/*if(sign=="copy"){
	 					$("#flowOprationBtnFooter").remove();
	 				}*/
		 			if(pageName!=null&&pageName!=""){
		 				
		 				runningFlow.getProcessJoinForm(pageName,null,i,ff,taskId,processkey,"");
		 			}else{
		 				
		 				//$(".content").append(FlowCommPage.content2);
		 				$("#submitProcessBth").attr("onclick","runningFlow.runningFlowProcess('',1)");
		 					
		 				
		 			}
		 			
					
		 			runningFlow.getHistoryData(processkey);
		 		
		 	}
			$("#form_btn_cance_back").click(function(){
			   window.history.back();
			  // window.location.href=window.location.href;
			});
		 },"json");
	
	}
	
	return false;
}
/**
 * 得到流程走过的步骤历史数据
 * @param processkey
 */
RunningFlow.prototype.getHistoryData=function (processkey){
	var url=basePath+"/processController/signRegisterInfo.htm";
	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
	{
		url += "?"+commVariable;
	}
		$.ajax({
			type:"post",
			url:url,
			data:{processInstanceId:processkey},
			async : false, 
			success:function(da){
				$(".content").append(FlowCommPage.flowContent);
				$(".flowPath").find("tbody").empty();
				$("#flowPath_table_tr").text("流程流水号："+processkey);
				if(da!=""||da!=null||da.length>0){
					for(var v=0;v<da.length;v++){
						var stepName="第"+(v+1)+"步";
						var taskName=da[v].taskName;
						var user=da[v].taskAssignee;
						var btime=da[v].taskCreateTime;
						var etime=da[v].taskEndTime;
						var result=da[v].result!=null?da[v].result:"";
						var html="";
						html+='<tr>';
						html+='  <td  width="10%" align="center">'+stepName+'</td>';
						html+='  <td width="20%">'+taskName+'</td>';
						html+='  <td width="20%">'+user+'</td>';
						html+='  <td width="25%">开始时间：'+btime+'</td>';
						html+='  <td width="25%">结果：'+result+'</td>'; 
						html+='</tr>'
						$(".flowPath").find("tbody").append(html);
					}
					
				}
			}
		});
}
//得到已经走过的表单关联流程的数据
RunningFlow.prototype.getProcessJoinForm=function (pageName,bid,i,flag,taskId,processkey,isBackFlag){
	i=i+1;
	var u=basePath+"/formOpration/getFlowCommPage.htm";
	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
	{
		u += "?"+commVariable;
	}
	$.ajax({
		type:"post",
		url:u,
		data:{fName:pageName},
		
		async : false, 

		success:function(formdata){
			var popPage=$(formdata).find(".pop-modal");
			var addElement=$(formdata).find("#add").attr("id","add_"+i).attr("processkey",processkey);
			addElement.find("#contern_grid").removeAttr("style");
			var formimpotElement=$(formdata).find("#formimpot").attr("id","formimpot_"+i);
			var title="";
			if(typeof(addElement.attr("tittle"))==undefined||typeof(addElement.attr("tittle"))=="undefined"){
				title="";
			}else{
				title=addElement.attr("tittle");
			}
			var fcp=$(flowPageContent.formItem(title,"item"+i));
			//fcp.find(".box-title").text(addElement.attr("tittle"));
			var wdiv=fcp.find(".box-body");
			wdiv.append(addElement).append(formimpotElement).append(popPage);
			$("#content").append(fcp);
			$("#rightmenu").find(".textBox").append(flowPageContent.formMenuItem(title,i));
			if(flag){
				$("#nextApplyUser").attr("formid","");
				formCommInit("add_"+i,bid);
				
				if(isBackFlag!=1){
					addElement.find("input,select,textarea,button").attr("disabled","disabled");
					addElement.find(".userboxdiv").removeAttr("onclick");
				}
				
			}else{
				$("#nextApplyUser").attr("formid","add_"+i);
				$("#submitProcessBth").attr("onclick","runningFlow.submitProcess('add_"+i+"')");
				formCommInit("add_"+i,bid);
				//$(".content").append(FlowCommPage.content2);
				if(i-1!=0){
					var html='<button type="button" class="btn btn-primary btn-sm" style="margin:0 3px;" onclick="flowChooseUser.taskOwner('+taskId+')">委托</button>';
					html+='&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-sm" onclick="flowChooseUser.taskSignUser('+null+',\''+processkey+'\',\''+taskId+'\')">会签</button>';
					html+='&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-sm" onclick="flowChooseUser.taskSendUser('+null+',\''+processkey+'\',\''+taskId+'\')">抄送</button>';

					html+='&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-sm" onclick="runningFlow.undoTask(\''+taskId+'\',\''+processkey+'\')">回退</button>';
					

					$("#nextApplyUser").after(html);
				}
				
				$("#lastApplyForm").text(title);

				
				$("#rightmenu").find("li:last").find("a").click();
			}
			//FormPageBtnInit.prototype.initReadLabelBindDataToTable.call(arguments,bid,"add_"+i,processkey);// 只读控件绑定数据，从其他控件中获取
			FormPageBtnInit.prototype.isReadInitData.call(arguments,bid,"add_"+i,processkey);// 只读控件绑定数据，从其他控件中获取


		}
	});
};
/**
 * 回退
 * @param processInstId
 * @param taskId
 */
RunningFlow.prototype.undoTask=function (taskId,processInstId){
	var url=basePath+"/processController/undoTask.htm";
   	$.ajax({
 		type:"post",
 		url:url,
 		data:{"processInstId" : processInstId},
 		dataType:"json",
 		success:function(data){ 
 			if(data.status){
 				 alert("退回成功");
 				var ts=data.message.split(",");
 				 commRequstFun(basePath+"/formOpration/updateFormJoinProcess.htm", {proccessId:processInstId,newTaskID:ts[0],oldTaskID:ts[1]}, function(data){
 				 	
 				 	
 				 },"json");
 				
 				
 			    
 				window.location.href=basePath+"/home/index.htm";
 				
 			}else{
 				alert(data.message);
 			}
 			
 		}
 	});
 }  
/**
 * 获取流程图
 * @param processInstanceId
 */
RunningFlow.prototype.graphTrace=function (processInstanceId) {
	
    // 获取图片资源
    var imageUrl = basePath+"/processController/process-instance.htm?processInstanceId="+ processInstanceId;
    commRequstFun(basePath+"/processController/trace.htm",{processInstanceId:processInstanceId}, function(infos) {
        var positionHtml = "";
      
        // 生成图片
        var varsArray = new Array();
        $.each(infos, function(i, v) {
            var $positionDiv = $('<div><b>' +v.vars.actname +'<b></div>', {
                'class': 'activity-attr'
            }).css({
                position: 'absolute',
                left: (v.x + 199),
                top: (v.y - 1),
                width: (v.width - 2),
                height: (v.height - 2),
                backgroundColor: 'black',
                opacity: 0,
                zIndex: $.fn.qtip.zindex - 1
            });

            // 节点边框
            var $border = $('<div><b>' +v.vars.actname + '</b></div>', {
                'class': 'activity-attr-border'
            }).css({
                position: 'absolute',
                left: (v.x + 199),
                top: (v.y - 1),
                width: (v.width - 4),
                height: (v.height - 3),
                zIndex: $.fn.qtip.zindex - 2
            });

            if (v.currentActiviti) {
                $border.addClass('ui-corner-all-12').css({
                    border: '3px solid red'
                });
            }
            positionHtml += $positionDiv.outerHTML() + $border.outerHTML();
        });
        
        $("#trace-body").html("<img src='" + imageUrl + "' style='position:relative; left: 180px; top: -19px;' />" +
                "<div id='processImageBorder'>" +
                positionHtml +
                "</div>");
         $("#trace-body").show(); 
       
    });
}

/**
 * 提交会签
 * @param jsons
 * @param flag
 */
RunningFlow.prototype.submitSign = function (){
	if($("#signRemarsWriteTextarea").val()==""){
		alert("请输入会签意见！");
		return;
	}
	commRequstFun(basePath+"/processController/saveSignMessage.htm", {taskId:runningFlow.task_Id,message:$("#signRemarsWriteTextarea").val(),userId:$("#usernamespan").text()}, function(data){
			
		if(data.status){
			
			window.history.back();
		}else{
			alert(data.message);
		}
			
			
	},"json");
	
}
