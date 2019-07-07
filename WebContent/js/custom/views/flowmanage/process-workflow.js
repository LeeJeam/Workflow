/**
 * 获取功能列表
 * @param id  表主键
 */
var dt=undefined;
var n=1;
function getProcess(typeId,val){
	n=1;
	$(".nav-stacked li").click(function (){
		$(".nav-stacked li").attr("class","");
		$(this).addClass("active");
	});
	$.ajax({
		type:"post",
		url:basePath+"/processController/findByProcessList.htm",
		data:{"typeId":typeId,flowname:val},
		dataType: 'json',
		success:function(data){
			if(data!=null){
			if(dt==undefined){
				dt=$('#dataTable').dataTable({
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
					      { data: 'id',"mRender": function(data,type,full){
		        			return n++;
					}},
				        { data: 'id' },
				        { data: 'processname'},
				        { data: 'typeid'},
				        { data: 'forbiddenorusing'},
				        { data: 'documentation' },
				        { data: 'deal',
				        	"mRender": function(data,type,full){
				        		var deal = '';
				        		if(full.forbiddenorusing=='已启用'){
				        			 deal = '禁用';
				        		}else{
				        			 deal = '启用';
				        		}
				        		var html='<a href="'+basePath+'/processController/index.htm?processid=' +full.id  + '" class="btn btn-primary btn-xs">编辑</a>&nbsp;'
			                    	+'<a onclick="viewIMG(\''+full.id+'\')" class="btn btn-primary btn-xs">查看流程图</a>&nbsp;';
								if(session_project_id!=""){
									html+='<button class="btn btn-primary btn-xs" onclick="javascript:ForbiddenOrUsing('+"'"+full.id+"','"+full.typeid+"','"+full.forbiddenorusing+"'"+')">'+deal+'</button>&nbsp;'
										+'<button class="btn btn-primary btn-xs" onclick="javascript:delPro('+"'"+full.id+"','"+full.typeid+"'"+')">删除</button>&nbsp;'
								}
								return html;
							}
				        	}
				    ]
				} );
			}else{
				dt.fnClearTable();
				if(data.length>0){
					dt.fnAddData(data, true); 
				}
			}
			}
		}
	});
	
	
}

/**
 * 流程历史
 * @param runId   流程主键
 */
function viewIMG(runId){
	var myleft=(screen.availWidth-800)/2;
    window.open(basePath+"/processController/viewImg.htm?processid="+runId,"","status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,width=800,height=500,left="+myleft+",top=50");
}

function getProcessClient(){
	$.ajax({
		type:"post",
		url:basePath+"/processController/findByProcessList.htm",
		data:{"sql":"select id,processname,processstate,processxml,typeid,applyform from t_p_process where processstate=1"},
		dataType:"json",
		success:function(data){
			var html="";
			if(data!=null&&data.length>0){
				var length=data.length;
				for(var n=0;n<length;n++){
					if(data[n].processstate=='1'){state="已部署"}
						html+='<tr>	<td>'+data[n].id+'</td>'
						+'<td>'+data[n].processname+'</td>'+
						'<td>'+state+'</td>'+
						'<td>'+data[n].typeid+'</td>'
                    	+'<td>'
                    	+'<a href="'+basePath+'/processController/createProcess.htm?processkey='+data[n].processkey+'&processId='+data[n].id+''+"&entity="+data[n].applyform  +'"' + 'class="btn btn-primary btn-xs">新建流程</a>&nbsp;'
                    	+'<a href="'+basePath+'/processController/FlowImage.htm?processkey='+data[n].processkey+'"'  +'class="btn btn-primary btn-xs">流程设计图</a>&nbsp;'
                    	+'<a href="'+basePath+'/processController/taskRunning.htm?processid='+data[n].id+'&applyform='+data[n].applyform+'&processkey='+data[n].processkey+'"'  + 'class="btn btn-primary btn-xs">流程查询</a>&nbsp;'
                    	+'<a href="'+basePath+'/processController/tasking.htm?userId=张三&processkey='+data[n].processkey+''+"&processId="+data[n].id +''+"&applyform="+data[n].applyform  +'"'+ 'class="btn btn-primary btn-xs">张三办理</a>&nbsp;'
                    	+'<a href="'+basePath+'/processController/tasking.htm?userId=李四&processkey='+data[n].processkey+''+"&processId="+data[n].id +''+"&applyform="+data[n].applyform +'"'+ 'class="btn btn-primary btn-xs">李四办理</a>&nbsp;'	
                    	
				}
			}
			$("#function-table-processcreate tbody").html(html);
		}
	});
}
function edit(funtionId,type){
	if(type=="表格"){
		window.location.href=basePath+"/createDataTable/toEdit.htm?pid="+funtionId;
	}else{
		window.location.href=basePath+"/form/index.htm?t="+funtionId;
	}
}
function ForbiddenOrUsing(proId,typeid,type){
	$.ajax({
		type:"post",
		url:basePath+"/processController/ForbiddenOrUsing.htm",
		data:{"processid":proId,"type":type},
		dataType:"json",
		success:function(data){
				alert(data);
				window.location.href=basePath+"/processController/processList.htm?typeid=";
		}
	});
}

function delPro(proId,typeid){
	var select = confirm("此操作将会删除该流程下的所有数据，您确定要删除吗？");
	if(select){
		$.ajax({
			type:"post",
			url:basePath+"/processController/delPro.htm",
			data:{"processId":proId},
			dataType:"json",
			success:function(data){
				if(data.status){
					getProcess(typeid);
					alert("删除成功!");
				}else{
					alert("删除失败！");
				}
			}
		});
	}else{
		return -1;
	}
}

function preview(){
	$.ajax({
		type:"post",
		url:basePath+"/work/builder.htm",
		dataType:"json",
		error : function(data) {
			alert(data.message);
		},
		success : function(data) {
			alert(data.message);
		 }
		
	});
}
function editprocess(processid){//编辑流程
	window.location.href=basePath+"/processController/editFlow.htm?processid="+processid;
}
function getProcessType(){
	$.ajax({
		type:"post",
		url:basePath+"/processController/findProcessType.htm",
		dataType:"json",
		success:function(data){
			var html="<ul class='nav nav-pills nav-stacked'>"
						+'<li onclick="getProcess()"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;全部流程</a></li>';
			if(data!=null&&data.length>0){
				var length=data.length;
				for(var n=0;n<length;n++){
					html+='<li onclick="getProcess('+"'"+data[n].typename+"'"+');dataType.setFlowType(\''+data[n].typename+'\')"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;'+data[n].typename+ '</a></li>'
				}
				html+='</ul>';
			}
			$("#box-body").html(html);
			$(".nav-stacked li:eq(0)").addClass("active");
			$(".nav-stacked li").click(function (){
				$(".nav-stacked li").attr("class","");
				$(this).addClass("active");
			})
		}
	});	
}


/**
 * 打开人员配置接口
 */
function openSettingModal(){
	$("#settinf_info").modal("show");
	$("#settinf_info").load(basePath+"/processController/openInteface.htm");
}
/**
 * 打开页面配置接口
 */

function openPageModal(){
	$("#Page-Sort").modal("show");
	$("#Page-Sort").load(basePath+"/processController/openPageInteface.htm");
}
/**
 * 弹出窗口的保存事件
 */
function intemodal(){
	var userInteface=$("#userInte").val();
}
$(function(){    
	var i  = $("#typeid").val();//流程类型
	getProcess(i);
	//getProcessClient();
	getProcessType();
});