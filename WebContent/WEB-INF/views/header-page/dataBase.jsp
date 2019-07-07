<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	cn.hy.projectmanage.pojo.Project project=cn.hy.common.utils.SessionUtil.getProjectName(request);
%>
<!DOCTYPE html>
<html>
	<head>
		<title>数据结构</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrapValidator/css/bootstrapValidator.min.css">
	</head>
	<body class="hold-transition skin-blue layout-top-nav">
		<div class="wrapper">
			<jsp:include page="/common/header.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content">
					<div class="row">
						<div class="col-md-2">
							<div class="box box-primary" id="conternbodyLeft" style="margin-bottom: 0px;">
				                <div class="box-header with-border">
				                  	<h3 class="box-title">字典类型</h3>
				                  	<div class="box-tools">
				                    	<button title="类型设置" class="btn btn-box-tool" onclick="dataType.loadPage('datasource')" data-toggle="modal" data-target="#functionPage-Sort"><i class="fa fa-cog"></i></button>
				                  	</div>
				                </div>
			                	<div id="box-body" class="box-body no-padding" style="overflow-y:auto; overflow-x: hidden;">
			                		<%--<ul class="nav nav-pills nav-stacked">
			                			<li class="active"><a href="javascript:getfunctions(0);"><i class="fa fa-envelope-o"></i>&nbsp;全部类型</a></li>
			                			<li><a href="javascript:getfunctions(1);"><i class="fa fa-envelope-o"></i>&nbsp;普通表</a></li>
			                			<li><a href="javascript:getfunctions(2);"><i class="fa fa-envelope-o"></i>&nbsp;树形结构表</a></li>
			                			<li><a href="javascript:getfunctions(3);"><i class="fa fa-envelope-o"></i>&nbsp;字典表</a></li>
										<li><a href="javascript:getfunctions(4);"><i class="fa fa-envelope-o"></i>&nbsp;级联表</a></li>
										<li><a href="javascript:getfunctions(5);"><i class="fa fa-envelope-o"></i>&nbsp;多关联表</a></li>
			                		</ul>--%>
			                	</div>
			            	</div>
						</div>
						<div class="col-md-10" style="padding-left: 0px;">
							<div class="box box-primary" style="margin-bottom: 0px;">
								<div class="box-header with-border">
									<h3 class="box-title">数据结构--<small>管理项目数据库的数据表</small></h3>
									<div class="box-tools pull-right">
					                    <button class="btn btn-primary btn-sm" data-toggle="modal" onclick="addDataBasefun()" data-target="#baseAdd">新建数据表</button>
					                </div>
								</div>
								<div class="box-body" id="conternbodyRight" style="overflow-y: auto; overflow-x: hidden;">
									<div class="row">
										<div class="form-group col-md-2" style="margin-bottom: 9px;">
											<select id="pageType" class="form-control input-sm"></select>
										</div>
										<div class="input-group col-md-2">
											<input id="new-event" type="text" class="form-control input-sm" placeholder="请输入页面名称">
											<div class="input-group-btn">
												<button id="add-new-event" type="button" class="btn btn-primary btn-flat btn-sm">搜索</button>
											</div>
										</div>
									</div>
									<table id="dataBaseTable" class="table table-bordered table-hover">
		                                <thead>
		                                    <tr>
		                                        <th width="5%">序号</th>
		                                        <th width="15%">中文名称</th>
		                                        <th width="15%">数据表名称</th>
		                                        <th width="15%">创建时间</th>
		                                        <th width="10%">表类型</th>
		                                        <th width="30%">备注</th>
		                                        <th width="15%">操作</th>
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
		<div class="modal fade" id="baseAdd">
            
        </div>
		<div class="modal fade bs-example-modal-lg" id="baseDemo">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">修改信息</h4>
                    </div>
                    <div class="modal-body">
                    	<form class="form-horizontal" style="overflow: hidden;">
                    		<div class="row">
                                <div class="pull-left col-md-4">
                                    <div class="form-group has-feedback">
                                        <label class="col-lg-3 control-label" style="padding-right: 0px;">表名称：</label>
                                        <div class="col-lg-9">
                                            <input type="text" name="" id="tb-name" value="" class="form-control input-sm" >
                                            <input type="hidden" id="tb-id">
                                            <input type="hidden" id="updateTableName">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2 pull-right text-right">
                                    <button type="button" class="btn btn-primary btn-sm" onclick="submitTables()">保存数据</button>
                                </div>
                            </div>
		                </form>
		                <div id="tcolumn">
		                </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="functionPage-Sort">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">设置类型</h4>
                    </div>
                    <div class="modal-body">
                    	<table class="table table-striped table-hover" id="create-table">
							<thead>
								<tr>
									<th width="10%">编号</th>
									<th width="35%">分类名称</th>
									<th width="35%">创建时间</th>
									<th width="20%">操作</th>
								</tr>
							</thead>
							<tbody>
							    <tr>
									<td><span class="count">1</span></td>
									<td>人员类型</td>
									<td>2016-8-8 15:30:00</td>
									<td>
									    <a href="javascript: void(0);">修改 </a>&nbsp;&nbsp; 
									    <a href="javascript: void(0);">删除</a>
									</td>
								</tr>
								<tr>
									<td><span class="count">1</span></td>
									<td>人员类型</td>
									<td>2016-8-8 15:30:00</td>
									<td>
									    <a href="javascript: void(0);">修改 </a>&nbsp;&nbsp; 
									    <a href="javascript: void(0);">删除</a>
									</td>
								</tr>
							</tbody>
							<tfoot>
				             	<tr>
				             		<td colspan="6" class="text-center"><a href="#">添加一项</a></td>
				             	</tr>
				             </tfoot>
						</table>
                    </div>
                    <div class="modal-footer">
                    	<button type="button" class="btn btn-primary">提交</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
                </div>
            </div>
        </div>
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jquery.form.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
        <script src="<%=rootPath %>/UILib/bootstrapValidator/js/bootstrapValidator.min.js"></script>
		<script src="<%=rootPath %>/js/quit.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/demo.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/jquery-loadmask/jquery.loadmask.min.js"></script>
		<script src="<%=rootPath %>/js/common.js"></script>
		<script type="text/javascript">var projectId="<%=project.getId()%>";</script>
		<script src="<%=rootPath%>/js/custom/views/databasemanage/dataBase.js"></script>

		<script type="text/javascript" src="<%=rootPath%>/js/datadetail.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/header-page/CustomerType.js"></script>

		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">
		<script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
		<script type="text/javascript">
			dataType.loadLeftTypeInfo('datasource');
			dataType.initPageType();
			dataType.searchEvent();
		</script>
	</body>
</html>