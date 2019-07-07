<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>工作流程</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrapValidator/css/bootstrapValidator.min.css">
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
		<script src="<%=rootPath %>/js/quit.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/demo.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/jquery-loadmask/jquery.loadmask.min.js"></script>
		<script src="<%=rootPath %>/js/common.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>
		<script src="<%=rootPath %>/js/custom/views/flowmanage/process-workflow.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrapValidator/js/bootstrapValidator.min.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jquery.form.js"></script>

		<script type="text/javascript" src="<%=rootPath%>/js/datadetail.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/header-page/CustomerType.js"></script>

		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">
		<script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
		<script>
			var session_project_id="${sessionScope.projectId}";
		$(document).ready(function() {
            setHeight(new Array('box-body'),(51 + 5 + 46 + 15 + 15 + 45));
            setHeight(new Array('conternbodyRight'),(51 + 5 + 90 + 15 + 15));
            var type=$("#typeid").val();
            getProcess();
			dataType.setDataType('flowprocess');
			dataType.searchEvent();
		});
		</script>
	</head>
	<body class="hold-transition skin-blue layout-top-nav">
		<div class="wrapper">
			<jsp:include page="/common/header.jsp"></jsp:include>
			<div class="content-wrapper">
			<input type="hidden" value="${ typeid}" name="typeid" id="typeid">
				<section class="content">
					<div class="row">
						<div class="col-md-2">
			              <div class="box box-primary" id="conternbodyLeft" style="margin-bottom: 0px;">
			                <div class="box-header with-border">
			                  <h3 class="box-title">流程类型</h3>
			                  <div class="box-tools">
			                    <button title="类型设置" class="btn btn-box-tool" onclick="dataType.loadPage('flowprocess')" data-toggle="modal" data-target="#functionPage-Sort"><i class="fa fa-cog"></i></button>
			                  </div>
			                </div>
			                <div id="box-body" class="box-body no-padding" style="overflow-y: auto; overflow-x: hidden;">
			                  
			                </div>
			              </div>
			            </div>
						<div class="col-md-10" style="padding-left: 0px;">
							<div class="box box-primary" style="margin-bottom: 0px;">
								<div class="box-header with-border">
									<h3 class="box-title">工作流程--<small>管理项目中的工作流</small></h3>
									<div class="box-tools pull-right">
										<a href="javascript:openSettingModal();" class="btn btn-primary btn-sm">人员接口配置</a>
										<c:if test="${! empty sessionScope.projectId}">
										<a href="javascript:openPageModal();" class="btn btn-primary btn-sm">页面接口配置</a>
										<a href="<%=rootPath %>/processController/index.htm" class="btn btn-primary btn-sm">创建流程</a>
										</c:if>
									</div>		
								</div>
								<div class="box-body" id="conternbodyRight" style="overflow-y: auto; overflow-x: hidden;">
										<div class="row">
										<div class="form-group col-md-3" style="margin-bottom: 9px;">
											<div class="input-group">
												<input id="new-event" type="text" class="form-control input-sm" placeholder="请输入页面名称">
												<div class="input-group-btn">
													<button id="add-new-event" type="button" class="btn btn-primary btn-flat btn-sm">搜索</button>
												</div>
											</div>
										</div>

									</div>
		               				<table id="dataTable" class="table table-bordered table-hover">
					                    <thead>
											<tr>
												<th width="5%">序号</th>
												<th width="10%">流程ID</th>
												<th width="15%">流程名称</th>
												<th width="10%">流程类型</th>
												<th width="10%">流程状态</th>
												<th width="25%">备注</th>
												<th width="25%">操作</th>
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
			<jsp:include page="/common/footer.jsp"></jsp:include>
		</div>
		<div class="modal fade" id="functionPage-Sort">

        </div>
		<div class="modal fade" id="settinf_info"></div>
		
		<div class="modal fade" id="Page-Sort"></div>
	</body>
</html>
		
		
		
		
		
		
		
		
		
		
