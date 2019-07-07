<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	cn.hy.projectmanage.pojo.Project project=cn.hy.common.utils.SessionUtil.getProjectName(request);
%>
<!DOCTYPE html>
<html>
	<head>
		<title>自定义页面</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/static/css/index.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/static/css/jquery.step.css">
		<style>
			.showImg {				
				overflow: hidden;
			}
			.showImg a {
				border: 1px solid #d2d6de;
				width: 48%;
				height: 200px;
				display: block;
				float: left;
				margin-right: 2%;
			}
			.showIma a:last-child {
				margin-right: 0%;
			}
			.showImg a img {
				width: 100%;
				height: 100%;
				display: block;
			}
			.baseList {
				border: 1px solid #d2d6de;
			}
			.baseList .box-header {
				border-top: 1px solid #d2d6de;
			}
			.activeTh {
				background: #337ab7;
			}
		</style>
	</head>
	<body class="hold-transition skin-blue layout-top-nav">
		<div class="wrapper">
			<jsp:include page="common/header.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content container">
					<div class="row">
						<div class="col-md-12">
							<div class="box box-primary">
								<div class="box-header with-border">
									<h3 class="box-title">创建网页</h3>
								</div>
								<div class="box-body">
									<div class="step-body" id="myStep">
										<div class="step-header" style="width:80%">
											<ul>
												<li><p>流程说明</p></li>
												<li><p>基本信息填写</p></li>
												<li><p>创建数据表</p></li>
												<li><p>流程结束</p></li>
											</ul>
										</div>
										<div class="step-content">
											<div class="step-list">
												<div class="page-panel-title">
													<h3 class="page-panel-title-left">流程说明</h3>
													<h3 class="page-panel-title-right" >注：黄色为需要你配合的环节</h3>
												</div>
												<div class="intro-flow">
													<div class="intro-list">
														<div class="intro-list-left">基本信息填写</div>
														<div class="intro-list-right">
															<span>1</span>
															<div class="intro-list-content">
																该流程可以创建一个增删改查的功能table数据页面。
															</div>
														</div>
													</div>
													<div class="intro-list intro-list-active">
														<div class="intro-list-left">创建数据表</div>
														<div class="intro-list-right">
															<span>2</span>
															<div class="intro-list-content">
																模拟数据库的方式，在网页上创建属于自己的数据表。请注意，如果没有创建数据表的时候，请先返回数据表页面，创建一个数据表，以免在创建功能页面时造成不必要的麻烦
															</div>
														</div>
													</div>												
													<div class="intro-list intro-list-last">
														<div class="intro-list-left">流程结束，进入设计页面</div>
														<div class="intro-list-right">
															<span>3</span>
															<div class="intro-list-content">
																流程结束，进入设计页面。
															</div>
														</div>
													</div>
												</div>
												<div class="footer-btn">
													<button id="applyBtn" class="btn btn-primary btn-sm">开始创建</button>
												</div>
											</div>
											<div class="step-list">
												<div class="page-panel-title">
													<h3 class="page-panel-title-left">基本信息填写</h3>
													<h3 class="page-panel-title-right" >注：填写页面的时候，请不要刷新页面或关闭，以免数据丢失。</h3>
												</div>
												<div style="margin-top: 80px;">
													<form id="defaultForm" method="post" action="" class="form-horizontal">
									                    <fieldset>
									                        <div class="form-group">
									                            <label class="col-lg-2 control-label">网页名称: </label>
									                            <div class="col-lg-8">
									                                <input type="text" class="form-control" id="webName" placeholder="">
									                            </div>
									                        </div>
									                        <div class="form-group">
									                            <label class="col-lg-2 control-label">父级网页: </label>
									                            <div class="col-lg-8">
									                                <input type="text" class="form-control">
									                            </div>
									                        </div>
									                        <div class="form-group">
									                            <label class="col-lg-2 control-label">表单类型: </label>
									                            <div class="col-lg-8">
									                                <select id="formTypeChangeFun"  class="form-control selectOption">
									                                	<option value="2">自定义表单</option>
									                                	<option value="5">流程表单</option>
									                                </select>
									                            </div>
									                        </div>
									                        <!-- <div class="form-group">
									                            <label class="col-lg-2 control-label">选择模板: </label>
									                            <div class="col-lg-8">
																	<div class="showImg">
																		<a href="javascript: void(0);"><img src="img/Template1.png"></a>
																		<a href="javascript: void(0);"><img src="img/Template2.png"></a>
																	</div>
									                                <h5 class="text-right"><a href="javascript: void(0);" data-toggle="modal" data-target="#myModal">重新选择模板&gt;&gt;</a></h5>
									                            </div>
									                        </div> -->
									                    </fieldset>
									                </form>
												</div>
												<div class="footer-btn text-center">
		                							<button id="submitBtn" class="btn btn-primary btn-sm" onclick="foreword(this)">下一步</button>
		                							
												</div>
											</div>
											<div class="step-list">
												<div class="page-panel-title">
													<h3 class="page-panel-title-left">创建数据表</h3>
													<h3 class="page-panel-title-right" >注：填写页面的时候，请不要刷新页面或关闭，以免数据丢失。</h3>
												</div>
												<div style="margin-top: 80px;">
													<div class="col-md-6 col-md-offset-3">
														<div class="box box-solid baseList">
											                <div class="box-header with-border">
											                	<h3 class="box-title">已有数据表列表</h3>
											                  	<div class="box-tools">
											                    	<a id="alertDodal" href="#" style="font-size: 12px; line-height: 30px;">创建新数据表</a>
											                  	</div>
											                </div>
											                <div class="box-body no-padding">
											                  	<table id="baseTable" class="table">
												                    <tbody>
													                    <tr>
														                    <td>人员信息</td>
														                    <td align="right"a><span><i class="fa fa-check"></i></span></td>
													                    </tr>
													                    <tr>
														                    <td>部门信息</td>
														                    <td align="right"a><span><i class="fa fa-check"></i></span></td>
													                    </tr>
													                    <tr>
														                    <td>产品资料</td>
														                    <td align="right"a><span><i class="fa fa-check"></i></span></td>
													                    </tr>
													                    <tr>
														                    <td>日志列表</td>
														                    <td align="right"a><span><i class="fa fa-check"></i></span></td>
													                    </tr>
												                  	</tbody>
												                </table>
											                </div>
											            </div>
													</div>
												</div>
												<div class="footer-btn">
													<button id="submitBtns" class="btn btn-primary btn-sm">下一步</button>
												</div>
											</div>
											<div class="step-list">
												<div class="apply-finish">
													<div class="apply-finish-header">
														<span></span>
														<div class="apply-finish-msg">恭喜您，提交成功！</div>
														<div class="apply-finish-msg1">正在进入页面，请稍等。。。</div>
													</div>
												</div>
											</div>
										</div>
									</div>
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
		                <h4 class="modal-title" id="myModalLabel">选择更多模板</h4>
		            </div>
		            <div class="modal-body">
		                <img style="width: 100%; height: 300px;" src="img/Template2.png">
		            </div>
		            <div class="modal-footer">
		            	<button type="button" class="btn btn-primary" id="imgSave">保存</button>
		                <button type="button" class="btn btn-default" id="imgreset" data-dismiss="modal">取消</button>
		            </div>
		        </div>
		    </div>
		</div>
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/js/quit.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/demo.js"></script>
		<script src="<%=rootPath %>/UILib/static/js/jquery.step.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/select2/select2.min.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/jquery-loadmask/jquery.loadmask.min.js"></script>
		<script src="<%=rootPath %>/js/common.js"></script>
		
		<script src="<%=rootPath %>/js/custom/views/functionpagemanage/pageForm.js"></script>
		<script>
		var projectId="<%=project.getId()%>";
			$(function() {
				$("#alertDodal").click(function (){
					var r=confirm("是不否放弃正在编辑的页面。")
					console.log(r);
				})
				$("#baseTable tr td").find("span").hide();
				$("#baseTable tr td").click(function (){
					$("#baseTable tr").attr("class","").css("color","#333").find("span").hide();
					$(this).parents("tr").addClass("activeTh").css("color","#fff").find("span").show().css("color","#fff");
				});
				var step= $("#myStep").step({
					animate:true,
					initStep:1,
					speed:1000
				});
				$("#preBtn").click(function(event) {
					var yes=step.preStep();
				});
				$("#applyBtn").click(function(event) {
					var yes=step.nextStep();
				});
				$("#submitBtn").click(function(event) {
					if($("#webName").val()==""){
						alert("请输入网页名称");
						return;
					}
					var yes=step.nextStep();
				});
				$("#submitBtns").click(function(event) {
					
					var yes=step.nextStep();
				});
				$("#goBtn").click(function(event) {
					var yes=step.goStep(3);
				});
			});
		</script>
	</body>
</html>