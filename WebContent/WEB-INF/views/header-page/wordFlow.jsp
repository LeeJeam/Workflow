<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>工作流</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
	</head>
	<body class="hold-transition skin-blue layout-top-nav">
		<div class="wrapper">
			<jsp:include page="/common/header.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content">
					<div class="row">
						<div class="col-md-2">
			              <div class="box box-primary">
			                <div class="box-header with-border">
			                  <h3 class="box-title">流程类型</h3>
			                  <div class="box-tools">
			                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
			                  </div>
			                </div>
			                <div class="box-body no-padding">
			                  <ul class="nav nav-pills nav-stacked">
			                    <li class="active"><a href="#"><i class="fa fa-inbox"></i> Inbox</a></li>
			                    <li><a href="#"><i class="fa fa-envelope-o"></i> Sent</a></li>
			                    <li><a href="#"><i class="fa fa-file-text-o"></i> Drafts</a></li>
			                    <li><a href="#"><i class="fa fa-filter"></i> Junk</a></li>
			                    <li><a href="#"><i class="fa fa-trash-o"></i> Trash</a></li>
			                  </ul>
			                </div><!-- /.box-body -->
			              </div><!-- /. box -->
			            </div>
						<div class="col-md-10" style="padding-left: 0px;">
							<div class="box box-primary">
								<div class="box-header with-border">
									<h3 class="box-title">工作流</h3>
									<div class="box-tools pull-right">
					                    <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#baseAdd">创建流程</button>
					                </div>
								</div>
								<div class="box-body">
									<table id="tableDemo" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="5%">序号</th>
                                                <th width="10%">流程名称</th>
                                                <th width="15%">创建时间</th>
                                                <th width="10%">流程状态</th>
                                                <th width="25%">备注</th>
                                                <th width="12%">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td><a href="javascript:void(0);">请假流程</a></td>
                                                <td>2016-6-10 10:03:11</td>
                                                <td><span class="text-red">未启用</span></td>
                                                <td>用于请假的流程</td>
                                                <td>
                                                    <div class="action-button">
                                                    	<a href="#" class="btn btn-primary btn-xs">编辑</a>
                                                        <a href="#" class="btn btn-primary btn-xs">启用</a>
                                                        <a href="#" class="btn btn-primary btn-xs">删除</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td><a href="javascript:void(0);">并行测试</a></td>
                                                <td>2016-6-10 10:03:11</td>
                                                <td><span class="text-green">已启用</span></td>
                                                <td>用于请假的流程</td>
                                                <td>
                                                    <div class="action-button">
                                                    	<a href="#" class="btn btn-primary btn-xs">编辑</a>
                                                        <a href="#" class="btn btn-primary btn-xs">启用</a>
                                                        <a href="#" class="btn btn-primary btn-xs">删除</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td><a href="javascript:void(0);">并行测试</a></td>
                                                <td>2016-6-10 10:03:11</td>
                                                <td><span class="text-green">已启用</span></td>
                                                <td>空</td>
                                                <td>
                                                    <div class="action-button">
                                                        <a href="#" class="btn btn-primary btn-xs">编辑</a>
                                                        <a href="#" class="btn btn-primary btn-xs">启用</a>
                                                        <a href="#" class="btn btn-primary btn-xs">删除</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<jsp:include page="/common/footer.jsp"></jsp:include>
		</div>
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
		<script src="<%=rootPath %>/js/quit.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/demo.js"></script>
		<script>
	        $(document).ready(function (){
	        	$(".nav-stacked li").click(function (){
	        		$(".nav-stacked li").attr("class","");
	        		$(this).addClass("active");
	        	});
	            $("#tableDemo").DataTable({
	                "paging": false,
	                "lengthChange": false,
	                "searching": false,
	                "ordering": false,
	                "info": true,
	                "autoWidth": false
	            });
	        });
        </script>
	</body>
</html>