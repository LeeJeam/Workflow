/**
 * 序列化表单,过滤空值
 * 返回JSON
 */
$.fn.serializeObject = function(o) {
	if (o == undefined) {
		o = {};
	}
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
		} else {
			var value=this.value;
			if(value!=""){
				o[this.name] = this.value;
			}
		}
	});
	return o;
};
	
var model;
//tab切换对应的数据
function tabLoad(index,element){
	if($(element).parents("li").hasClass("active")){
		return;
	}
	if(index==1){
		$("#one_tab").load(basePath+"/myWork/waitDo.htm?r="+Math.random(),function(){
			addActive(element);
		});
	}else if(index==2){
		$("#one_tab").load(basePath+"/myWork/overWork.htm?r="+Math.random(),function(){
			addActive(element);
		});
	}else if(index==3){
		$("#one_tab").load(basePath+"/myWork/offerWork.htm?r="+Math.random(),function(){
			addActive(element);
		});
	}else if(index==4){
		$("#one_tab").load(basePath+"/myWork/accountWord.htm?r="+Math.random(),function(){
			addActive(element);
		});
	}
};
function addActive(element){
	var $this=$(element).parents("li");
	$this.siblings().removeClass("active");
	$this.addClass("active");
}
/**
 * 停留时间换算
 * @param createTime        创建时间
 * @param receiveTime       接收时间
 * @param receiveEndTime    完成时间
 */
function stopTime(createTime,receiveTime,receiveEndTime){
	if(receiveEndTime!=null&&receiveEndTime!=""){
		return "0分";
	}else{
		if(receiveTime!=null&&receiveTime!=""){
			return getStopTimeStr(receiveTime,null);
		}else{
			return getStopTimeStr(createTime,null);
		}
	}
}

function toDate(time){
	 var s = time.split(" ");
	var s1 = s[0].split("-"); 
	var s2 = s[1].split(":"); 
	return new Date(s1[0],s1[1]-1,s1[2],s2[0],s2[1],s2[2]);
}

/**
 * 返回停留时间
 * @param beginTime  开始时间
 * @param endTime    结束时间
 * @returns {String}
 */
function getStopTimeStr(beginTime,endTime){
	var date1=toDate(beginTime);
	var date2;
	if(endTime==null||endTime==""){
		date2=new Date();
	}else{
		date2=toDate(endTime);
	}
	var second=(date2.getTime()-date1.getTime())/1000;
	if(second>0){
		var day = Math.floor((second / 3600) / 24);
		var hour = Math.floor((second / 3600) % 24);
		var minute = Math.floor((second / 60) % 60);
		var html="";
		if(day!=0){
			html+=day+"天";
		}
		if(hour!=0){
			html+=hour+"小时";
		}
		html+=minute+"分";
		return html;
	}else{
		return "0分";
	}
}

/**
 * 撤销委托
 * @param runId   流程主键
 */
function backEntrust(procInstId) {
	$.post(basePath+"/myWork/backEntrust.htm", {"processId":procInstId},function(data) {
		if(data.status){
			reload();
			alert(data.message);
		}else{
			alert(data.message);
		}
	},"json");
}

/**
 * 催办
 * 
 * @param runId
 *            流程主键
 */
function urgency(runId,element){
	$.post(basePath+"/myWork/urgency.do", {"runId":runId},function(data) {
		if(data.status){
			$(element).remove();
			alert(data.message);
		}else{
			alert(data.message);
		}
	},"json");
}

/**
 * 流程历史
 * @param runId   流程主键
 */
function footPoint(runId){
	//自定页
	layer.open({
	  type: 2,
	  title: '流程跟踪图',
	  shadeClose: true,
	  shade: 0.8,
	  area: ['800px', '90%'],
	  content: basePath+"/myWork/viewImg.htm?processInstanceId="+runId
	}); 
}

/**
 * 删除流程
 * @param runId   流程主键
 */
function del(runId){
	var isDel=confirm("该操作会将所有流程相关的信息删除,确定要删除?");
	if(isDel){
		$.post(basePath+"/myWork/deleteProcess.htm", {"processId":runId},function(data) {
			if(data.status){
				reload();
				alert(data.message);
			}else{
				alert(data.message);
			}
		},"json");
	}
	
}

/**
 * 重新加载本页面
 */
function reload(){
	//本页开始记录数
	start = dt.fnSettings()._iDisplayStart; 
	//数据总数
	total = dt.fnSettings().fnRecordsDisplay();
	if ((total - start) == 1) {
		if (start > 0) {//回到上一页
			$("ul.pagination li.previous").click();
		}else{//表单重画
			dt.fnDraw();
		}
	}else{//刷新当前页
		$("ul.pagination li.active").click();
	}
}

/**
 * 待办
 * @param processId   流程实例ID
 * @param taskId      节点ID
 * @param receiveTime    处理时间
 */
function todo(processId,taskId,receiveTime){
	//同时不为空
	if(processId!=null&&taskId!=null){
		//跳转地址
		var url=basePath+"/pageToPage/toFlowCommPage.htm?processkey="+processId+"&taskId="+taskId;
		if(receiveTime!=null&&receiveTime!=""){
			window.location.href=url;
		}else{
			$.getJSON(basePath+"/myWork/insertState.htm", {"taskId":taskId},function(json){
				  window.location.href=url;
			});
		}
		
	}
}

function detail(processId,taskId,titleFlag){
	window.location.href=basePath+"/pageToPage/toFlowCommPage.htm?isView=true&processkey="+processId+"&taskId="+taskId+"&titleFlag="+titleFlag;
}

function accountant(processId,taskId,titleFlag){
	window.location.href=basePath+"/pageToPage/toFlowCommPage.htm?isView=true&processkey="+processId+"&taskId="+taskId+"&titleFlag="+titleFlag;
}