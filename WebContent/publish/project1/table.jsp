<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>表格</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/AdminLTE.css">
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
							<div class="box box-primary collapsed-box">
								<div class="box-header with-border">
				                	<h3 class="box-title">搜索区域</h3>
				                 	<div class="box-tools pull-right">
				                    	<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				                    	<button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
				                  	</div>
				                </div>
								<div class="box-body">
									<div class="form-group col-md-2">
				                      	<label for="exampleInputEmail1">人员查询</label>
				                      	<input type="type" class="form-control" placeholder="请输入关键字">
				                    </div>
				                    <div class="form-group col-md-2">
				                      	<label for="exampleInputEmail1">人员查询</label>
				                      	<input type="type" class="form-control" placeholder="请输入关键字">
				                    </div>
				                    <div class="form-group col-md-2">
				                      	<label for="exampleInputEmail1">人员查询</label>
				                      	<input type="type" class="form-control" placeholder="请输入关键字">
				                    </div>
				                    <div class="form-group col-md-2">
				                      	<label for="exampleInputEmail1">人员查询</label>
				                      	<input type="type" class="form-control" placeholder="请输入关键字">
				                    </div>
				                    <div class="form-group col-md-2">
				                      	<button class="btn btn-primary btn-sm" style="margin-top: 27px;">搜索</button>
				                    </div>
								</div>
							</div>
							<div class="box box-primary">
								<div class="box-header with-border">
									<h3 class="box-title">功能列表</h3>
									<div class="box-tools pull-right">
				                    	<button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#add1">新增弹窗一</button>
				                    	<button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#add2">新增弹窗二</button>
				                    	<button class="btn btn-primary btn-sm">新增页面</button>
				                  	</div>
								</div>
								<div class="box-body">
									<br><br><br><br><br><br><br><br><br><br><br><br><br><br>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<jsp:include page="public/footer.jsp"></jsp:include>
		</div>
		<div class="modal fade" id="add1">
		    <div class="modal-dialog" role="document">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		                <h4 class="modal-title" id="myModalLabel">普通弹窗</h4>
		            </div>
		            <div class="modal-body">
		                123123
		            </div>
		            <div class="modal-footer">
						<button type="button" class="btn btn-primary">提交</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
		        </div>
		    </div>
		</div>
		<div class="modal fade bs-example-modal-lg" id="add2">
		    <div class="modal-dialog modal-lg" role="document">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		                <h4 class="modal-title" id="myModalLabel">大弹窗</h4>
		            </div>
		            <div class="modal-body">
		                12312
		            </div>
		            <div class="modal-footer">
						<button type="button" class="btn btn-primary">提交</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
		        </div>
		    </div>
		</div>
		<script src="<%=rootPath %>/publish/project1/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/js/quit.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/demo.js"></script>
	</body>
</html>