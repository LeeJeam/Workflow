<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	cn.hy.projectmanage.pojo.Project project=cn.hy.common.utils.SessionUtil.getProjectName(request);
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
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/select2/select2.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/webflow.css">
		<link rel="stylesheet" href="<%=rootPath %>/js/file/uploadify.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrapValidator/css/bootstrapValidator.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
		<style>
			.tab-pane input { height: 26px!important; font-size: 12px!important; padding: 3px 12px; color: #111;}
			.tab-pane select { height: 26px!important; font-size: 12px!important; padding: 3px 12px; color: #111;}
			.tab-pane lable { font-size: 12px!important;}
			#formSettingCondition .form-group-prop { clear: both; margin-bottom: 0px; overflow: hidden;}
			#formSettingCondition .control-label { float: left; width: 35%;}
			#formSettingCondition .controls { float: right; width: 65%; margin-bottom: 5px;}
			.pageFormBottunSelectCss{background-color:#fff;background-image:none;border:1px solid #ccc;height:26px!important;font-size: 12px!important;padding: 3px 12px;color: #111;margin-left: 10px;width: 72.5%;}
			
			.type_table { width: 100%;}
			.type_table th { font-size: 12px; padding: 3px;}
			.type_table td { font-size: 12px; padding: 3px; vertical-align: middle;}
			.type_table td select { padding: 3px 3px;}
			.type_table td i { cursor: pointer; color: red;}
			.conternt_title { margin:10px 0px 10px 0px; padding: 0px; text-align: center; overflow: hidden;}
			.conternt_title li { list-style: none; float: left; font-size: 12px; background: #d3d3d3; padding: 3px 5px; border: 1px solid #b9b9b9; }
			.conternt_title li:hover { border: 1px solid #3c8dbc; background: #ccebf8;}
			.conternt_title li.active { border: 1px solid #3c8dbc; background: #ccebf8;}
			.conternt_title li a { color: #000000; font-size: 12px;}
			.conternt_body div { display: block;}
			.label_property {padding-top: 5px !important;    font-weight: normal;text-align: right;    margin-bottom: 0;  width:35%;    overflow: hidden;    text-align: left;}
		</style>
		<%@ include file="/WEB-INF/common/commonjs.jsp" %>
		<script type="text/javascript" src="<%=rootPath %>/UILib/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/js/quit.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/demo.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/UILib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/UILib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/UILib/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>
		<script type="text/javascript">var sysfunctionId="${param.t}";var projectTableId="${data.project_table_id}";</script>
		<script type="text/javascript" src="<%=rootPath %>/js/custom/views/functionpagemanage/flow/core.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/custom/views/functionpagemanage/flow/date.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/custom/views/functionpagemanage/flow/form.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/custom/views/releasesmanage/custom-table-view.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrapValidator/js/bootstrapValidator.min.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/datadetail.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/select2/select2.min.js"></script>
		<script src="<%=rootPath %>/js/common.js"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/baseControlConfigJS.js"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/dataSourceControl.js"></script>
		<script src="<%=rootPath %>/js/custom/views/control/BaseControl.js"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/formPageConfig.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/TableControl.js"></script>
		<script src="<%=rootPath %>/js/custom/views/control/DateControl.js"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/FormLayoutControl.js"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/userBoxControlConfigJS.js"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/formControlGroupConfig.js"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/formDateConfig.js"></script>

		<script src="<%=rootPath %>/js/header-page/CustomerType.js"></script>
		<script src="<%=rootPath %>/js/Menu.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/ChoicePage.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/LinkControl.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/CheckboxRadioControl.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/FormInitControlData.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/FormValidatorControl.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/custom/views/control/form/pageTeamConfig.js" type="text/javascript"></script>

		<script src="<%=rootPath%>/js/header-page/PageTable.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/custom/views/utils/GetTablesUtils.js" type="text/javascript"></script>
		<script type="text/javascript">
			var baseUrl = '<%=rootPath %>';
			var navId = '${param.navId}';
		$(document).ready(function() {

			$(".select2").select2();
			setHeight(new Array('conternbodyRight','conternbodyCentern','conternbodyLeft'),(51 + 0 + 50 + 15 + 15 + 45));
			setHeight(new Array('contern_grid'),(51 + 0 + 50 + 15 + 15 + 45));
			$(".caret_title").click(function (){
				if($(this).find("i.fa-caret-right").length==0){
					$(this).next(".caret_contern").slideUp("slow");
					$(this).find("i").attr("class","fa fa-caret-right");
				}else{
					$(this).next(".caret_contern").slideDown("slow");
					$(this).find("i").attr("class","fa fa-caret-down");
				}
			});
			//$(".quality_contern:eq(0)").show();
			$(".quality").click(function (){
				if($(this).find("i.fa-caret-right").length==0){
					$(this).next(".quality_contern").slideUp("slow");
					$(this).find("i").attr("class","fa fa-caret-right");
				}else{
					$(this).next(".quality_contern").slideDown("slow");
					$(this).find("i").attr("class","fa fa-caret-down");
				}
			});
		});
		</script>
	</head>
	<body class="hold-transition skin-blue layout-top-nav sidebar-mini">
		<div class="wrapper">
			<div class="content-wrapper">
				<jsp:include page="/common/header.jsp"></jsp:include>
				<div class="content-wrapper">
					<section class="content" style="padding: 15px 2px;">
						<div class="row">
							<div class="col-md-2" style="padding-left: 0px; padding-right: 0px;">
								<div class="box box-primary" style="margin-bottom: 0px;">
									<div class="box-header with-border">
										<h3 class="box-title">基础控件</h3>
									</div>
									<div class="box-body" id="conternbodyLeft" style="overflow-x: hidden; overflow-y: auto;">									
										<jsp:include page="tabLeft.jsp" />
									</div>
								</div>
							</div>
							<div class="col-md-8" style="padding-left: 5px; padding-right: 5px;">
								<div class="box box-primary" style="margin-bottom: 0px; overflow-y: auto;">
									<div class="box-header with-border">
										<h3 class="box-title" id="formControlTitle">功能列表</h3>
										<div class="box-tools pull-right">
						                    <button id="save" data-url="#" class="btn btn-primary btn-sm">保存</button>
						                    <button id="preview" data-show="false" class="btn btn-primary btn-sm">预览</button>
						                    <button onclick="getFormImportJsp()" data-show="false" class="btn btn-primary btn-sm">对象管理</button>
						                    <button class="btn btn-primary btn-sm" id="delControls" onclick="del()" >删除</button>
						                </div>
									</div>
									<div class="box-body" id="conternbodyCentern" style="overflow-x: hidden; overflow-y: auto;">
										<input type="hidden" id="sys_type" value="${data.type }">
										<div id="ctr" class="center" >
											<c:choose>
									              <c:when test="${!empty data.content }">
									                  ${data.content }
									              </c:when>
									              <c:otherwise>
														<form action="" method="post" id="add">
															<input type="hidden" name="id">
															<input type="hidden" name="formName">
															<input type="hidden" name="formType">
															<input type="hidden" id="form_display_method">
															<input type="hidden" id="form_button_input">
															<input type="hidden" id='table-name' value='${tableName.table_name}'>
															<div class="form-horizontal shadow">
																<div id="design-canvas" class="mcanvas ui-sortable" data-control-count="0">
																	<div class="row ui-sortable" >
																		<div id="contern_grid" class="col-md-12 gv-droppable-grid ui-sortable bg1" data-alignment="Left"></div>
																	</div>
																</div>
															</div>
														</form>
													</c:otherwise>
									          </c:choose>
										</div>	
									</div>
								</div>
							</div>
							<div class="col-md-2" style="padding-left: 0px; padding-right: 0px;">
								<div class="box box-primary" style="margin-bottom: 0px;">
									<div class="box-header with-border">
										<h3 class="box-title">属性--<small id="propertyZN"></small></h3>
									</div>
									<div class="box-body" id="conternbodyRight" style="overflow-x: hidden; overflow-y: auto;">
										<jsp:include page="tabRight.jsp" />
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
			<jsp:include page="/common/footer.jsp"></jsp:include>
		</div>
		
		<div class="modal fade bs-example-modal-lg" id="equipmentDemoAdd">
		</div>
		<div class="modal fade" id="previewModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">表单预览</h4>
					</div>
					<div class="modal-body" id="previewModalBody">
					
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" id="form_btn_cance" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary" id="form_btn_save">保存</button>
						<button type="button" class="btn btn-primary" id="form_btn_submit">提交</button>
						
					</div>
				</div>
			</div>
		</div>
		
	</body>
	<script type="text/javascript">var projectId="<%=project.getId()%>";</script>
</html>