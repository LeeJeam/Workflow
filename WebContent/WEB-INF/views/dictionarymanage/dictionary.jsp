<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>字典管理</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/jquery-master/jquery.jgrowl.css">
		
	</head>
	<body class="hold-transition skin-blue layout-top-nav">
		<div class="wrapper">
			<jsp:include page="/common/header.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content">
					<div class="row">
						<div class="col-md-2" style="padding-right: 0px;">
							<div class="box box-primary" style="margin-bottom: 0px;">
								<div class="box-header with-border">
									<h3 class="box-title">字典管理</h3>
									<div class="box-tools pull-right">
					                    <button title="类型设置" class="btn btn-box-tool" data-toggle="modal" data-target="#functionPage-Sort"><i class="fa fa-cog"></i></button>
					                </div>
								</div>
								<div class="box-body no-padding" id="conternbodyLeft" style="overflow-y: auto; overflow-x: hidden;">
									<ul class="nav nav-pills nav-stacked">
			                			<li onclick="getProcess()" class="active"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;全部类型</a></li>
			                			<li onclick="getProcess('行政管理类')"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;表格类</a></li>
			                			<li onclick="getProcess('关键业务类')"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;流程表单</a></li>
			                			<li onclick="getProcess('财务管理类')"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;自定义表单</a></li>
			                		</ul>
								</div>
							</div>
						</div>
						<div class="col-md-10">
							<div class="box box-primary" style="margin-bottom: 0px;">
								<div class="box-header with-border">
									<h3 class="box-title">字典管理--<small>管理项目中的基础字典数据</small></h3>
									<div class="box-tools pull-right">
					                    <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#baseDemo" onclick="edit()">添加页面</button>
					                </div>
								</div>
								<div class="box-body" id="conternbodyRight" style="overflow-y: auto; overflow-x: hidden;">
									<div class="row">
										<div class="form-group col-md-2" style="margin-bottom: 9px;">
											<select class="form-control input-sm">
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											</select>
										</div>
										<div class="input-group col-md-2">
											<input id="new-event" type="text" class="form-control input-sm" placeholder="请输入页面名称">
											<div class="input-group-btn">
												<button id="add-new-event" type="button" class="btn btn-primary btn-flat btn-sm">搜索</button>
											</div>
										</div>
									</div>
									<table id="data_table" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="5%">序号</th>
                                                <th width="40%">字典名称</th>
                                                <th width="35%">对应数据表</th>
                                                <th width="10%">操作</th>
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
		<div class="modal fade" id="baseDemo">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">修改字典信息</h4>
                    </div>
                    <div id="tcolumn">
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
        
        
        <div id="dummyNav"></div>
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
        <script src="<%=rootPath %>/UILib/bootstrapValidator/js/bootstrapValidator.min.js"></script>
        <script src="<%=rootPath %>/UILib/plugins/jQuery/jquery.form.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/js/common.js"></script>
		<script src="<%=rootPath %>/js/custom/views/dictionarymanage/dictionary.js"></script>
		<script src="<%=rootPath %>/UILib/jquery-master/jquery.jgrowl.js"></script>
        <script type="text/javascript">
			if(typeof console === "undefined") {
			    console = { log: function() { } };
			}
			(function($){
				$(function(){
					$.jGrowl.defaults.closerTemplate = "";
					$.jGrowl.defaults.appendTo = "div#dummyNav";
					$.jGrowl("关注人员刷卡报警提示", {
						header: '<i class="icon fa fa-warning"></i>慧园社区A栋',
					});					
				});
			})(jQuery);
		</script>
	</body>
</html>