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
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/UILib/quit/sweetalert.min.js"></script>
		<script src="<%=rootPath %>/js/quit.js"></script>		
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/demo.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
    	<script src="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
	</head>
	<body class="hold-transition skin-blue layout-top-nav">
		<div class="wrapper">
			<jsp:include page="/common/header.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content container">
					<div class="row" style="margin-bottom: 0px;">
						<div class="nav-tabs-custom" style="margin-bottom: 0px;">
							<ul class="nav nav-tabs">
								<li class="active"><a href="#tab_1" data-toggle="tab">代办工作</a></li>
								<li><a href="#tab_2" data-toggle="tab">办结工作</a></li>
								<li><a href="#tab_3" data-toggle="tab">委托工作</a></li>
								<li><a href="#tab_4" data-toggle="tab">会签工作</a></li>
							</ul>
							<div class="tab-content">
								<div class="tab-pane active" id="tab_1" style="height: 600px;">
									<div class="box-body" style="padding: 0 10px;">
									    <form id="searchForm">
									    	<div class="col-md-12">
												<div class="row">
													<div class="input-group col-md-2 pull-right">
														<input type="text" name="keyword" class="form-control input-sm" placeholder="编号/名称/姓名">
														<span class="input-group-btn">
											   				<button type="button" id="search" class="btn btn-primary btn-flat btn-sm"><i class="fa fa-search"></i></button>
														</span>
									             	</div>
									             	<div class="input-group col-md-2 pull-right selectUive">
									              		<select name="stateType" class="form-control input-sm">
									                        <option value="">全部状态</option>
									                        <option value="未接收">未接收</option>
									                        <option value="处理中">处理中</option>
									                        <option value="已结束">已结束</option>
									                        <option value="已归档">已归档</option>
									                    </select>
									             	</div>
									     		</div>
									        </div>
									    </form>
									</div>
									<div class="box-body" style="margin-top: 0px;">
									    <table id="dataTable" class="table table-bordered table-hover">
									        <thead>
									            <tr>
									                <th>编号</th>
									                <th>名称</th>
									                <th>当前步骤</th>
									                <th>到达/接收</th>
									                <th>已停留</th>
									                <th>创建人</th>
									                <th>状态</th>
									                <th>操作</th>
									            </tr>
									        </thead>
									        <tbody>
									        	<tr>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        	</tr>
									        	<tr>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        		<td>as</td>
									        	</tr>
									        </tbody>
									    </table>
									</div>
								</div>
								<div class="tab-pane" id="tab_2">
								  123
								</div>
								<div class="tab-pane" id="tab_3">
								  14234
								</div>
								<div class="tab-pane" id="tab_4">
									14234
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<jsp:include page="/common/footer.jsp"></jsp:include>
		</div>
		<script>
			$(document).ready(function (){
				$('#dataTable').DataTable({					
					"paging": true,
					"lengthChange": false,
					"searching": false,
					"ordering": false,
					'oLanguage': {
			        	'sInfo': "总共：_TOTAL_ 条",
					},
					"autoWidth": false,
					'bSort':false,
					'autoWidth': false,
				});
			});
		</script>
	</body>
</html>