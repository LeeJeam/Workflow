var FlowChooseUser = function () {
	
};

var flowChooseUser = new FlowChooseUser();

/**
 * 给会签和委托选人
 * @param username
 * @param flag
 */
FlowChooseUser.prototype.getAllUserToBox=function (username,flag){
		var param={tablename:"yonghubiao"};
		if (typeof(username)!=undefined&&typeof(username)!="undefined"&&username!=""){
			param.column="username";
			param.columnValue=username;
		}
		commRequstFun(basePath+"/formOpration/findOtherTableData.htm", param, function(data){
			$("#ulPeople,#ulPeople1").empty();
			if(data!=null&&data!=""&&data.length>0){
				for(var i=0;i<data.length;i++){
					var html = '<li>'
               	  +'	<a onclick="flowChooseUser.userInfoClickEven(this,'+flag+')" ref="'+data[i].username+'">'
                  +'		<span class="uesr bg-green">'+data[i].username.substring(0,1)+'</span>'
                  +'		<span class="uesrName"><b class="uesrName1">'+data[i].username+'</b><br><b class="uesrName2"></b></span>'
                  +'	</a>'
                  +'</li>'	; 
					$("#ulPeople,#ulPeople1").append(html);
					
				}
			}
			
		 	
	},"json");
	
}

/**
 * 选人项的点击事件
 * @param e
 * @param flag
 */
FlowChooseUser.prototype.userInfoClickEven=function (e,flag){
  	var r=0;
  	
		$("#add-user-demo"+flag).find("li").each(function(){
			var n=$(this).attr("title");
			if($(e).attr("ref")==n){
				r++;
			}
		});
  	
  	if(r>0){
  		return;
  	}
  	if(flag==1){
  		$("#add-user-demo"+flag).find("li").remove();			
  	}
  	var html = '<li id="div4946" title="'+$(e).attr("ref")+'" class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation"  onclick="flowChooseUser.removeUserString(this)" style="cursor:pointer;">×</span>'+$(e).attr("ref")+'</li>';
  	$("#add-user-demo"+flag).append(html);
  }	
/**
 * 删除选中的人员
 * @param e
 */
FlowChooseUser.prototype.removeUserString=function (e){
  	$($(e).parents("li")[0]).remove();
 }
/**
 * 委托
 * @param taskId
 */
FlowChooseUser.prototype.taskOwner=function (taskId){
	flowChooseUserPagePopFun2(1,taskId);
   
}

/**
 * 会签
 * @param id
 * @param processkey
 * @param taskId
 */
FlowChooseUser.prototype.taskSignUser=function (id,processkey,taskId){
	flowChooseUserPagePopFun2(2,taskId);
   
}
/**
 * 抄送
 * @param id
 * @param processkey
 * @param taskId
 */
FlowChooseUser.prototype.taskSendUser=function (id,processkey,taskId){
	flowChooseUserPagePopFun2(3,taskId);
   
}
/**
 * 委托提交选择的人员
 */
FlowChooseUser.prototype.submitUser=function (taskId,usernames){
	
	var url=basePath+"/processController/ownerTask.htm";
	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
	{
		url += "?"+commVariable;
	}
	$.ajax({
		type:"post",
		cache: false,   
		url:url,
		data:{"taskId" : taskId,"userId":usernames},
		dataType:"json",
		success:function(data){
			if(data!=null){
				window.history.back();
			}
		}
	});
  }
/**
 * 搜索人员
 * @param e
 */
FlowChooseUser.prototype.searchProcessUsers=function (e){
	flowChooseUser.getAllUserToBox($(e).val());
  	
  }
/**
 * 会签提交选人的方法
 */
FlowChooseUser.prototype.submitSignUser=function (taskId,usernames,f){
   
	var url=basePath+"/processController/countersignTask.htm";
	if(f=="3"){
		url=basePath+"/processController/copySendUser.htm";
	}
	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
	{
		url += "?"+commVariable;
	}
	$.ajax({
		type:"post",
		cache: false,   
		url:url,
		data:{"taskId":taskId,"userId":usernames},
		dataType:"json",
		success:function(data){
			if(data!=null){
				window.history.back();
			}
		}
	});
  }