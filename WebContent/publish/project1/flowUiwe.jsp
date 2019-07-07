<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>流程查询</title>
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
	</head>
	<body class="hold-transition skin-blue fixed sidebar-mini" id="chat-box">
		<div class="wrapper">
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
		                            	<h3 class="box-title box-title-name" style="margin-top: 10px;">流程查询</h3>
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
									<table id="dataTable" class="table table-bordered table-hover text-center">
                                         <thead>
                                             <tr>
                                                 <th width="5%">序号</th>
                                                 <th width="10%">流程名称</th>
                                                 <th width="10%">流程类型</th>
                                                 <th width="10%">创建人</th>
                                                 <th width="10%">结束时间</th>
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
			            
			            <div class="modal-footer">
			                <button type="button" class="btn btn-default" id="closemodal" data-dismiss="modal">关闭</button>
			                <button type="button" class="btn btn-primary" onclick="submitUpload();">提交</button>
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
		<script>

		var businessId="";
		var processFlag="process";
		var process_key="";
		var task_Id="";
		function taskHandle(applyform,entityId,processkey){
			businessId=entityId;
			process_key=processkey;
			//task_Id=taskId;
			 $.post("<%=rootPath %>"+"/processController/viewForm.htm", {applyform:applyform}, function(data){
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
			$(function(){
				select(null);
			});
			var dt=undefined;
			function select(selectType){
				$.ajax({
					type:"post",
					url:"<%=rootPath %>/processController/taskSelect.htm",
					data:{"selectType":selectType},
					dataType: 'json',
					success:function(data){
						if(dt==undefined){
							dt=$('#dataTable').dataTable( {
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
							        { data: 'pdfName' },
							        { data: 'typeid'},
							        { data: 'applyName' },
							        { data: 'taskEndTime' },
							        { data: 'taskAssignee' },
							        { data: 'entityId',
							        	"mRender": function(data,type,full){
							        		return '<a href="<%=rootPath%>/flowImage.jsp?processid=' +full.processid + '" class="btn btn-primary btn-xs">查看流程图</a>&nbsp;'	
						                    	+'<a href="#"  class="btn btn-primary btn-xs"  onclick="javascript:taskHandle('+"'"+full.applyform+"','"+full.entityId+"','"+full.processkey+"'"+')">'+'详情</a>&nbsp;'
					                    	+'</td>'
										}
							        	}
							    ]
							} );
						}else{
							dt.fnClearTable();
							dt.fnAddData(data, true); 
						}
					}
				});
			}
		</script>
	</body>
</html>