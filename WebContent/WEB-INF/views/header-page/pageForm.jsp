<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrapValidator/css/bootstrapValidator.min.css">

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
			<jsp:include page="/common/header.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content container">
					<div class="row">
						<div class="box box-primary" id="conternbodyRight" style="margin-bottom: 0px; overflow-y: auto; overflow-x: hidden;">
							<div class="box-header with-border">
								<h3 class="box-title">创建网页</h3>
							</div>
							<div class="box-body no-padding">
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
											<div style="margin-top: 60px;">
												<form id="defaultForm" method="post" action="" class="form-horizontal">
								                    <fieldset>
								                        <div class="form-group">
								                            <label class="col-lg-2 control-label">网页名称: </label>
								                            <div class="col-lg-8">
								                                <input type="text" id="webName" class="form-control" placeholder="">
								                            </div>
								                        </div>
								                        <div class="form-group">
								                            <label class="col-lg-2 control-label">父级网页: </label>
															<div class="col-lg-8">
																<input type="hidden" name="parentId" id="parentId">
																<input type="text" name="menuurl" id="menuurl" class="form-control" onclick="menu.showPathModal(this)" readonly style="width: 100%;background:#fff;cursor:pointer">
															</div>
								                        </div>
														<div class="form-group">
															<label class="col-lg-2 control-label">页面类型: </label>

															<div class="col-lg-8">
																<select id="pageType" class="form-control"></select>
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
												<button id="submitBtnUp" class="btn btn-warning btn-sm">上一步</button>
	                							<button id="submitBtn" class="btn btn-primary btn-sm" onclick="foreword(this)">下一步</button>
	                							
											</div>
										</div>
										<div class="step-list">
											<div class="page-panel-title">
												<h3 class="page-panel-title-left">创建数据表</h3>
												<h3 class="page-panel-title-right" >注：填写页面的时候，请不要刷新页面或关闭，以免数据丢失。</h3>
											</div>
											<div style="margin-top: 60px;">
												<div class="col-md-8 col-md-offset-2" id="page_commHasTable">
													<div class="box box-solid baseList">
										                <div class="box-header with-border">
										                	<h3 class="box-title">已有数据表列表</h3>
										                  	<div class="box-tools">
										                    	<a id="" href="#" data-toggle="modal" onclick="addDataBasefun()" data-target="#baseAdd" style="font-size: 12px; line-height: 30px;">创建新数据表</a>
										                  	</div>
										                </div>
														<div class="box-body">
															<div class="col-md-4" style="padding-left: 0px; padding-right: 0px;">
																<ul id="type" class="nav nav-pills nav-stacked" style="border: 1px solid #ccc; height: 340px; overflow-y: auto;">
																	<li  onclick="getfunctions();dataType.setLeftTypeId('')" class="active">
																		<a href="#"><i class="fa fa-list-ul"></i>&nbsp;全部类型</a>
																	</li>
																</ul>
															</div>
															<div class="col-md-8" style="padding-right: 0px; padding-left: 10px;">
																<div class="input-group" style="margin-bottom: 10px;">
																	<input id="new-event" type="text" class="form-control input-sm" placeholder="请输入页面名称">
																	<div class="input-group-btn">
																		<button id="add-new-event" type="button" class="btn btn-primary btn-flat btn-sm">搜索</button>
																	</div>
																</div>
																<div style="height: 300px; overflow-y: auto; border: 1px solid #ccc;">
																	<table id="baseTable" class="table" style="margin-bottom: 0px;">
																		<tbody>
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
										            </div>
												</div>
												<div class="col-md-8 col-md-offset-2" id="alertTable" style="display:none;">
													<input type="hidden" id="page_commSetTableName">
													<input type="hidden" id="tb-name">
													<input type="hidden" id="tb-id">
                                           			<input type="hidden" id="updateTableName">
													<div class="box box-solid baseList">
										                <div class="box-header with-border">
										                	<h3 class="box-title">表字段</h3>
										                  	<div class="box-tools">
										                    	<a id="alertDodal" onclick="reFun()" href="#" style="font-size: 12px; line-height: 30px;">返回</a>
										                  	</div>
										                </div>
										                <div id="create-table-filedset" class="box-body no-padding" style="max-height: 260px; overflow-y: auto;">
										                  	<table class="table table-striped table-hover" id="create-table">
																<thead>
																	<tr><th width="6%">编号</th>
																		<th>字段名称</th>
																		<th>列名</th>
																		<th>类型</th>
																		<th>长度</th>
																		<th width="12%">操作</th>
																	</tr>
																</thead>
																<tbody>
																</tbody>
																<tfoot>
													            	<tr>
													            		<td colspan="6" class="text-center" onclick="CreateTB()"><a href="#">添加一项</a></td>
													            	</tr>
													            </tfoot>
															</table>
										                </div>
										            </div>
												</div>
											</div>
											
											<div class="footer-btn">
												<button id="submitBtnUps" class="btn btn-warning btn-sm">上一步</button>
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
				</section>
			</div>
			<jsp:include page="/common/footer.jsp"></jsp:include>
		</div>
		<div class="modal fade" id="baseAdd">
            
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
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jquery.form.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrapValidator/js/bootstrapValidator.min.js"></script>
		<script src="<%=rootPath %>/js/quit.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/demo.js"></script>
		<script src="<%=rootPath %>/UILib/static/js/jquery.step.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/select2/select2.min.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/jquery-loadmask/jquery.loadmask.min.js"></script>
		<script src="<%=rootPath %>/js/common.js"></script>
		<script src="<%=rootPath%>/js/datadetail.js"></script>
		<script src="<%=rootPath%>/js/header-page/PageTable.js"></script>
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
		<script src="<%=rootPath %>/UILib/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>
		<script src="<%=rootPath %>/js/custom/views/functionpagemanage/pageForm.js"></script>
		<script src="<%=rootPath%>/js/custom/views/databasemanage/dataBase.js"></script>
		<script src="<%=rootPath %>/js/common.js"></script>
		<script type="text/javascript">var projectId="<%=project.getId()%>";</script>

		<script type="text/javascript" src="<%=rootPath%>/js/custom/views/control/BaseControl.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/Menu.js"></script>

		<script type="text/javascript" src="<%=rootPath%>/js/header-page/CustomerType.js"></script>

		<script>
		 var isCreateTableFlag=0;
		 var baseUrl = basePath;
		 var navId   = '${navId}';
		$(document).ready(function() {
			setHeight(new Array('conternbodyRight'),(51 + 0 + 50 + 15 + 15));

			dataType.initSelectPageType('page','#pageType',navId);
			dataType.loadLeftTypeInfo('datasource',$("#type"),PageTable.loadTableData,true);
			dataType.searchEvent('datasource',true);
		});
		var step;
			$(function() {
				//PageTable.loadTreeNet();
				 $.post(basePath+"/structureTable/tableList.htm", {projectId:projectId}, function(data){
					 if(data!=null&&data.length>0){
						 var html="";
						for(var i=0;i<data.length;i++){
							html+=""
							+	"<tr ref='"+data[i].id+"'>"
			                   + "<td >"+data[i].table_alias+"</td>"
			                  + '<td align="right"a><span><i class="fa fa-check"></i></span></td>'
		                    +"</tr>";
						}
						$("#baseTable").find("tbody").html(html);
					 }
					/*  $("#alertDodal").click(function (){
							var r=confirm("是不否放弃正在编辑的页面。")
							console.log(r);
						}) */
						$("#baseTable tr td").find("span").hide();
						$("#baseTable tr td").click(function (){
							$("#baseTable tr").attr("class","").css("color","#333").find("span").hide();
							$(this).parents("tr").addClass("activeTh").css("color","#fff").find("span").show().css("color","#fff");
						});
						step= $("#myStep").step({
							animate:true,
							initStep:1,
							speed:1000
						});
						$("#submitBtnUps,#submitBtnUp").click(function(event) {
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
							
							saveForm();
						});
						$("#goBtn").click(function(event) {
							var yes=step.goStep(3);
						});
				 },"json");
			});
			function saveForm(){
				if(isCreateTableFlag==1){
					$.ajax({
						type:"post",
						url:basePath+"/structureTable/findUniqueTable.htm",
						data:{projectId:projectId,tablname:$("#tb-name").val()},
						dataType:"json",
						success:function(data){
							if(data!=null&&data.length>0){
								var id=data[0].id;
								$("#tb-id").val(id);
								$("#updateTableName").val(data[0].table_name)
								submitTables2(id);
							}
						}
					});
				}else{
					saveForm2($("tr.activeTh").attr("ref"));
				}
			}
			function saveForm2(projectTableId){
				if(!projectTableId) {
					alert('请选择数据表!');
					return false;
				}
				var yes=step.nextStep();


				$.ajax({
					type:"post",
					url:basePath+"/sysFunction/add.htm",
					data:{webName:$("#webName").val(),projetcId:projectId,type:$("#formTypeChangeFun").val(),fileName:$("#webName").val(),projectTableId:projectTableId,parentId:$("#parentId").val(),"templetName":"custom-table-view",funcType:$('#pageType').val()},
					dataType:"json",
					success:function(data){
						if(data.status){

							var url = basePath+"/form/submenu-shop-custom.htm?t="+data.message;
							if(!!navId) {
								url += "&navId="+navId;
							}
							window.location.href = url;
						}else{
							
						}
					}
				});
			}
			
		</script>
	</body>
</html>