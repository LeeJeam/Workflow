<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	cn.hy.projectmanage.pojo.Project project=cn.hy.common.utils.SessionUtil.getProjectName(request);
%>
<!DOCTYPE html>
<html>
	<head>
		<title>对象管理</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
		<link rel="stylesheet" href="<%=rootPath %>/js/file/uploadify.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
	</head>
	<body class="hold-transition skin-blue layout-top-nav">
		<div class="wrapper">
			<jsp:include page="/common/header.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content container">
					<div class="row">
						<div class="col-md-12">
							<div class="box box-primary" style="margin-bottom: 0px;">
								<div class="box-header with-border">
									<h3 class="box-title">对象管理--<small>JS对象封装管理</small></h3>
									<div class="box-tools pull-right">
					                    <!-- <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#jsModal" onclick="edit()">导入文件</button> -->
					                </div>
								</div>
								<div class="box-body" id="conternbodyRight" style="overflow-y: auto; overflow-x: hidden;">
									<table id="data_table" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="5%">序号</th>
                                                <th width="35%">原文件名称</th>
                                                <th width="35%">上传后文件名称</th>
                                                <th width="25%">页面名称</th>
                                            </tr>
                                        </thead>
                                    </table>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<jsp:include page="/common/footer.jsp"></jsp:include>
		</div>
		<div class="modal fade" id="jsModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
						<h4 class="modal-title">修改信息</h4>
					</div>
					<div id="tcolumn"></div>
				</div>
			</div>
		</div>
	<script src="<%=rootPath%>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath%>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath%>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="<%=rootPath%>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/js/common.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/file/jquery.uploadify.min.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/filecommon.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/custom/views/jsmanage/jsmanage.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>
		<script type="text/javascript">var projectId="<%=project.getId()%>";</script>
	</body>
</html>