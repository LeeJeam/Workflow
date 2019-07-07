var NewCreateProcess = function () {
	this.taskId="";
	this.chooseUsers="";
	
};

var newCreateProcess = new NewCreateProcess();

/**
 * 关闭填写流程名称框
 */
NewCreateProcess.prototype.canceProcessName = function (){
	$("#previewModal_procee").removeClass("in").hide();
}


/**
 * 提交流程名
 */
NewCreateProcess.prototype.submitProcessName=function (){
	$("#buildProcessChooseUserSubmit,#buildProcessChooseUserClose").show();
	var pname=$.trim($("#process_form_name").val());
	if(pname==""){
		alert("请输入流程名称");
		return;
	}
	if(pname.length>30){
		alert("流程名称不能超过30个字符");
		return;
	}
	
	newCreateProcess.createProcessBySubmit(pname);
}
/**
 * 得到流程列表
 * @param typeId
 */
NewCreateProcess.prototype.getProcessNew=function (typeId){
    if(typeId==undefined){
		typeId="";
	}
	$(".nav-stacked li").click(function (){
		$(".nav-stacked li").attr("class","");
		$(this).addClass("active");
	});
	
	commRequstFun(basePath+"/processController/findByProcessList.htm", {"typeId":typeId},function(data){
			var html="";
			if(data!=null&&data.length>0){
				var length=data.length;
				for(var n=0;n<length;n++){
					if(data[n].processstate=='1'){state="已部署"}
					html+='<div class="liu">'+
                       '<div class="cheng">'+
                       '<div class="liucheng"><a href="#"  onclick="newCreateProcess.taskHandle(\''+data[n].id+'\')"><h4>'+data[n].processname+'</h4></a></div>'+
                       '<div class="liucheng tu"><a href="'+basePath+'/processController/viewImg.htm?processid=' +data[n].id+ '"' +'><img alt="shejitu" src="'+basePath+'/publish/project1/img/shejitu.png"></a>流程设计图</div>'+
                       '<div class="liucheng tu"><a onclick="newCreateProcess.taskHandle(\''+data[n].id+'\')" h="'+basePath+'/processController/viewForm.htm?processId='+data[n].id+ '"'+'><img alt="shejitu" src="'+basePath+'/publish/project1/img/biaodan.png"></a>新建流程</div>'+
                       '<div class="liucheng tu"><a href="#"><img alt="shejitu" src="'+basePath+'/publish/project1/img/shuoming.png"></a>流程说明</div>'+
                       '<div class="liucheng tu"><button class="btn btn-primary" style="margin-top: 10px; margin-left: 15px;" onclick="newCreateProcess.taskHandle(\''+data[n].id+'\')">快速新建</button></div>'+
                       '</div>'+
                       '</div>';
					
				}
			}
			$("#function-table-processcreate").html(html);
		} ,"json")
	
}

/**
 * 创建流程时要弹出填写流程名称的窗口
 * @param processId
 * @returns {Boolean}
 */
NewCreateProcess.prototype.taskHandle=function (processId){
	//businessId=id;
	processIds=processId;
	$("#process_form_name").val("");
	$("#previewModal_procee").addClass("in").show();
	return false;
}
/**
 * 提交流程
 */
NewCreateProcess.prototype.submitProcess=function (){
	 $("#buildProcessChooseUserSubmit,#buildProcessChooseUserClose").hide();
	 var users=$("#popCommFlowUserInput").val();
	 $("#popCommFlowUserInput").val("");
	 if(users!=""){
	 	
	 	commRequstFun(basePath+"/processController/switchTaskCandidates.htm", {assignee:users,taskId:newCreateProcess.taskId}, function(data){
	 	 	
	 	 	chooseUserBoxClose();
	 	 	canceProcessName();
	 	},"");
	 }
	
}

/**
 * 提交流程名称并弹出选人框
 * @param lcmc
 */
NewCreateProcess.prototype.createProcessBySubmit=function (lcmc){

	 commRequstFun(basePath+"/processController/starProcess.htm", {processId:processIds,processname:lcmc}, function(data){
	 	 if(data!=null&&data!=""&&data.length>0){
	 		if(data[0].formname!=null&&data[0].formname!=""){
	 			runningFlow.jumpFlowPage(data[0].processId,data[0].taskId);
	 		}else{
	 			newCreateProcess.taskId=data[0].taskId;
		 		flowChooseUserPagePopFun(data);
	 		}
	 	 	
	 	 }
	 },"json");
}

NewCreateProcess.prototype.getProcessType=function (){
	commRequstFun(basePath+"/processController/findProcessType.htm", "",function(data){
			var html="<ul class='nav nav-pills nav-stacked'>"
						+'<li onclick="newCreateProcess.getProcessNew()"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;全部流程</a></li></ul>';
			if(data!=null&&data.length>0){
				var length=data.length;
				for(var n=0;n<length;n++){
					html+='<ul class="nav nav-pills nav-stacked">'
	                    +'<li onclick="newCreateProcess.getProcessNew('+"'"+data[n].typename+"'"+')"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;'+data[n].typename+ '</a></li></ul>'	
				}
			}
			$("#box-type-body").html(html);
			$(".nav-stacked li:eq(0)").addClass("active");
			$(".nav-stacked li").click(function (){
				$(".nav-stacked li").attr("class","");
				$(this).addClass("active");
			})
		} ,"json");
}