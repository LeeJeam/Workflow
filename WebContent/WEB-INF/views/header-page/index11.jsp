<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>主页</title>
	  	<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
	</head>
	<body class="hold-transition skin-blue layout-top-nav">
		<div class="wrapper">
			<jsp:include page="common/header.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content container">
						<div class="row" style="padding: 180px 0;">
			                <div class="col-md-6">
			                    <div class="box box-solid">
			                        <div class="box-header with-border">
			                            <i class="fa fa-text-width"></i>
			                            <h3 class="box-title">重新开始创建</h3>
			                        </div>
			                        <div class="box-body">
			                            <blockquote>
			                                <div class="input-group">
			                                    <input id="project-name" class="form-control" placeholder="在这里创建一个新项目">
			                                    <div class="input-group-btn">
			                                        <a class="btn btn-primary" onclick="create()">创建</a>
			                                    </div>
			                                </div>
			                            </blockquote>
			                        </div>
			                    </div>
			                </div>
			                <div class="col-md-6">
			                    <div class="box box-solid">
			                        <div class="box-header with-border">
			                            <i class="fa fa-text-width"></i>
			                            <h3 class="box-title">选择已有项目</h3>
			                        </div>
			                        <div class="box-body clearfix">
			                            <blockquote class="text-center">
			                                <p>
			                                    <button class="btn btn-primary btn-flat" data-toggle="modal" data-target="#myModal">打开已有项目</button>
			                                </p>
			                            </blockquote>
			                        </div>
			                    </div>
			                </div>
			            </div>
				</section>
			</div>
			<jsp:include page="common/footer.jsp"></jsp:include>
		</div>
		<div class="modal fade" id="myModal">
		    <div class="modal-dialog" role="document">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		                <h4 class="modal-title" id="myModalLabel">选择已有项目</h4>
		            </div>
		            <div class="modal-body">
		                <ol style=" line-height: 24px;" id="projectUI"></ol>
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		            </div>
		        </div>
		    </div>
		</div>
		<%@ include file="/WEB-INF/common/commonjs.jsp" %>
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/js/quit.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/demo.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/custom/views/projectmanage/index.js"></script>
	</body>
</html>