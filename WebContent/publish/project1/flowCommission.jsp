<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>待办工作</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/public.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/jquery.qtip.min.css"  />
	</head>
	<body class="hold-transition skin-blue fixed sidebar-mini" id="chat-box">
		<div class="wrapper">
		<input type="hidden" id="rootPath" value="<%=rootPath %>">
			<jsp:include page="public/header.jsp"></jsp:include>
			<jsp:include page="public/sidebar.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content-header">
					<ol class="breadcrumb">
						<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
						<li class="active">功能列表</li>
					</ol>
				</section>
				<section class="content">
					<div class="row">
						<div class="col-md-12">
							<div class="box box-primary">
								<div class="box-header with-border">
									<form id="searchForm">
		                            	<h3 class="box-title box-title-name" style="margin-top: 10px;">待办工作</h3>
			                            <div class="input-group col-md-2 pull-right">
			                           		<input type="text" id="" name="" class="form-control" placeholder="请输入关键字" />
			                                <span class="input-group-btn">
			                                	<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-search"></i></button>
			                                </span>
			                            </div>
			                            <div class="input-group col-md-2 pull-right selectUive">
			                            	<select class="form-control" name="">
	                                            <option value="">所有类型</option>
		                                        <option value="1">1</option>
	                                        </select>
			                            </div>
		                            </form>
								</div>
								<div class="box-body">
									<table id="function-table-processRunning" class="table table-bordered table-hover text-center">
                                         <thead>
                                             <tr>
                                                 <th width="5%">序号</th>
                                                 <th width="10%">流程名称</th>
                                                 <th width="10%">创建人</th>
                                                 <th width="10%">创建时间</th>
                                                 <th width="10%">流程状态</th>
                                                 <th width="10%">当前节点</th>
                                                 <th width="10%">办理人</th>
                                                 <th width="10%">操作</th>
                                             </tr>
                                         </thead>
                                         <tbody>
                                         </tbody>
                                     </table>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div class="modal fade" id="equipmentDemoAdd">
   <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title">流程表单</h4>
            </div>
            <div class="modal-body" id="modal-body">
            	 
            </div>
            <div class="form-group">
                    <label class="col-lg-4 control-label">审核批注：</label>
                    <div class="col-lg-6">
                    	 <textarea class="textarea" id="commentinfo" placeholder=""></textarea>
                    </div>
                </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" id="closemodal" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="submitUpload();">提交</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="equipmentDemoBackTo">
   <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title">选择退回节点</h4>
            </div>
            <div class="back-body" id="back-body">
            	 
            </div>
        </div>
    </div>
</div>

<div class="modal fade bs-example-modal-lg in" id="workflowTrace" style="z-index: 9999;">
   <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title">跟踪图</h4>
            </div>
            <div class="modal-body" style="z-index: 9999; overflow: hidden;">
            	<div class="trace-body" id="trace-body"></div>
            </div>
        </div>
    </div>
</div>
			<jsp:include page="public/footer.jsp"></jsp:include>
		</div>
		<script src="<%=rootPath %>/publish/project1/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="<%=rootPath %>/publish/project1/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/js/quit.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/demo.js"></script>
		<script src="<%=rootPath %>/publish/project1/js/jquery.qtip.pack.js" ></script>
        <script src="<%=rootPath %>/publish/project1/js/jquery.outerhtml.js" ></script>
		<script type="text/javascript">
		var businessId="";
		var processFlag="process";
		var process_key="";
		var task_Id="";
		var basePath=$("#rootPath").val();
		$(function(){
		/* 	$('#function-table-processcreate').dataTable( {		
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
			} ); */
			
			initProcessRunning();
		});
		function initProcessRunning(){
			$.ajax({
				type:"post",
				url:basePath+"/processController/tasking.htm",
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
					        { data: 'processInstId' },      
					        { data: 'processDefname',"mRender": function(data,type,full){
									return '<a  href="#" data-toggle="modal" data-target="#workflowTrace" onclick="graphTrace('+full.processInstId+')" >'+full.processDefname+ '</a>'
							}},
							{ data: 'varName' },
					        { data: 'taskTime',"mRender":function(data,type,full){
					        	 var javascriptDate = new Date(full.taskTime);
					        	 var Manth =Number(javascriptDate.getMonth())+ Number("1");
					             return javascriptDate.getFullYear() + "-" +Manth + "-" + javascriptDate.getDate();
					        }},
					        { data: 'processDefSuspended' },
					        { data: 'taskName' },
					        { data: 'taskAssignee' },
					        { data: 'operate',"mRender": function(data,type,full){
								if(full.taskAssignee!=null||full.taskAssignee!=""){
									
									return '<a  href="javascript: void(0);" data-toggle="modal" data-target="#equipmentDemoAdd" class="btn btn-primary btn-xs" onclick="taskHandle('+full.businessKey+',\''+full.processkey+'\',\''+full.taskId+'\')" >审批</a>&nbsp;&nbsp;<a href="javascript: void(0);" data-toggle="modal" data-target="#equipmentDemoBackTo"  class="btn btn-primary btn-xs" onclick="taskList('+full.taskId+',\''+full.processInstId+'\')" >退回</a>'
									//return '<a  href=processController/viewForm.htm?taskid='+full.taskId+'&userId=张三&processkey='+full.processkey+'&bussinkey='+full.businessKey+'&processInstId='+full.processInstId+'>办理</a>'
								}
							}}
					    ]
					} );
				}
			});
		}
		function taskHandle(id,processkey,taskId){
			businessId=id;
			process_key=processkey;
			task_Id=taskId;
			 $.post(basePath+"/processController/viewForm.htm", {processkey:processkey}, function(data){
				 $("#modal-body").hide();
				 $("#modal-body").html(data);
				 $("#modal-body").find(".main-sidebar,.main-header,.content-header,.main-footer,#btnSubmit,#btnReset").remove();
				 $("#modal-body").find(".wrapper").removeClass("wrapper");
				 $("#modal-body").find(".content-wrapper").removeClass("content-wrapper");
				 $("#modal-body").find(".content").find(".box").removeClass("box");
				 $("#modal-body").find(".content").find(".box-primary").removeClass("box-primary");
				 $("#modal-body").find(".box-body").removeAttr("style");
				 $("#modal-body").show();
			 },"");
			 return false;
		}
		
		function backTo(backTaskid,taskId){
			 	$.ajax({
			 		type:"post",
			 		cache: false,   
			 		url:basePath+"/processController/backTo.htm",
			 		data:{"taskid" : taskId,"backTaskid" :backTaskid},
			 		dataType:"json",
			 		success:function(data){
			 			alert(data.message);
			 		}
			 	});
			 }  
		function taskList(taskId,processInstId){
		 	$.ajax({
		 		type:"post",
		 		cache: false,   
		 		url:basePath+"/processController/selectTask.htm",
		 		data:{"processInstId" : processInstId,"taskId":taskId},
		 		dataType:"json",
		 		success:function(data){
		 			if(data!=null){
		 				$("#back-body").html(data.message);
		 				 $("#back-body").find(".main-sidebar,.main-header,.content-header,.main-footer,#btnSubmit,#btnReset").remove();
		 				 $("#back-body").find(".wrapper").removeClass("wrapper");
		 				 $("#back-body").find(".content-wrapper").removeClass("content-wrapper");
		 				 $("#back-body").find(".content").find(".box").removeClass("box");
		 				 $("#back-body").find(".content").find(".box-primary").removeClass("box-primary");
		 				 $("#back-body").find(".box-body").removeAttr("style");
		 				 $("#back-body").show();
		 				$("#back-body").show();
		 			}
		 		}
		 	});
		   return false;
		}
		
		function graphTrace(processInstanceId) {
		
		    // 获取图片资源
		    var imageUrl = basePath+"/processController/process-instance.htm?processInstanceId="+ processInstanceId;
		    $.post(basePath+"/processController/trace.htm?processInstanceId=" + processInstanceId, function(infos) {
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
		//         if ($('#workflowTraceDialog').length == 0) {
		//             $('<div/>', {
		//                 id: 'workflowTraceDialog',
		//                 title: '查看流程跟踪图',
		//                 html: "<div><img src='" + imageUrl + "' style='position:absolute; left:200px; top:0px;' />" +
		//                 "<div id='processImageBorder'>" +
		//                 positionHtml +
		//                 "</div>" +
		//                 "</div>"
		//             }).appendTo('body');
		//         } else {
		//             $('#workflowTraceDialog img').attr('src', imageUrl);
		//             $('#workflowTraceDialog #processImageBorder').html(positionHtml);
		//         }
		        
		        $("#trace-body").html("<img src='" + imageUrl + "' style='position:relative; left: 180px; top: -19px;' />" +
		                "<div id='processImageBorder'>" +
		                positionHtml +
		                "</div>");
		         $("#trace-body").show(); 
		       
		    });
		}

</script>
	</body>
</html>