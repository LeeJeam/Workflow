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
									<h3 class="box-title">项目发布--<small>发布已完成的功能页面</small></h3>
								</div>
								<div class="box-body" id="conternbodyRight" style="overflow-y: auto; overflow-x: hidden;">
									<div class="row">
										<div class="col-md-6 text-center col-md-offset-3" style="background: #eee; height: 120px; padding: 26px 10px; margin-top: 20px; margin-bottom: 50px;">
											<p>点击发布当前的项目</p>
											<button class="btn btn-primary text-center" onclick="publishProject()" style="margin-right: 5px;">项&nbsp;目&nbsp;发&nbsp;布</button>
											<button class="btn btn-primary text-center" id="project_publish_btu" data-toggle="modal" data-target="#add1" style="display:none;"></button>
										</div>
									</div>
									<section class="invoice" style="margin: 10px; border: none; padding: 0px;">
							          <div class="row">
							            <div class="col-xs-12">
							              <h2 class="page-header">
							                <i class="fa fa-cube"></i> ${sessionScope.project.projectName}--<span style="font-weight: normal; color: #777;">发布记录</span>
							              </h2>
							            </div>
							          </div>							          
							          <div class="row">
							            <div class="col-xs-12 table-responsive">
							              <table class="table table-bordered table-hover" id="data_table">
							                <thead>
							                  <tr>
							                    <th width="5%">序号</th>
							                    <th width="10%">发布人</th>
							                    <th width="18%">发布时间</th>
							                    <th width="30%">发布路径</th>
							                    <th width="30%">访问路径</th>
							                    <th width="7%">操作</th>
							                  </tr>
							                </thead>
							                <tbody>
							                  
							                </tbody>
							              </table>
							            </div>
							          </div>
							        </section>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<jsp:include page="/common/footer.jsp"></jsp:include>
		</div>
		<div class="modal fade" id="add1">
		    <div class="modal-dialog" role="document">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		                <h4 class="modal-title" id="myModalLabel">是否下载项目</h4>
		            </div>
		            <div class="modal-body">
		                <div class="checkbox text-center" ref="checkbox">
		                	<label for="isUploadJar"><input value="yes" type="checkbox" id="isUploadJar"> <span>是否下载jar包 </span></label>
		                </div>
		            </div>
		            <div class="modal-body">
		                <div class="checkbox text-center" ref="checkbox">
		                	<label for="isUploadJs"><input value="yes" type="checkbox" id="isUploadJs"> <span>是否下载包publish/project1/UILib包中的js </span></label>
		                </div>
		            </div>
		            <div class="modal-footer">
						<button type="button" class="btn btn-primary" onclick="uploadProject()">确定</button>
						<button type="button" class="btn btn-default" id="uploadProjectClose" data-dismiss="modal">取消</button>
					</div>
		        </div>
		    </div>
		</div>
		<div id="bgBox" style="width: 100%; height: 100%; background: rgba(0,0,0,0.7); position: absolute; top: 0px; left: 0px; 
			z-index: 9999; display: none; text-align: center;">
				<p style="margin-top: 440px; color: #fff;">正在压缩项目,请等待。。。</p>
			</div>
		<div id="bgBoxPublish" style="width: 100%; height: 100%; background: rgba(0,0,0,0.7); position: absolute; top: 0px; left: 0px; 
			z-index: 9999; display: none; text-align: center;">
				<p style="margin-top: 440px; color: #fff;">正在发布项目,请等待。。。</p>
			</div>
		<script src="<%=rootPath%>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath%>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath%>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="<%=rootPath%>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/js/common.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/file/jquery.uploadify.min.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/filecommon.js"></script>
		<script>
		$(function(){
			setHeight(new Array('conternbodyRight'),(51 + 0 + 50 + 15 + 15 + 45));
			getdata();
		});
		</script>
		<script type="text/javascript">
		var dt=undefined,index=1;
		/**
		 * 查找表单数据
		 */
		function getdata(){
			$.ajax({
				type:"post",
				url:basePath+"/publish/findPublishInfoList.htm",
				dataType: 'json',
				success:function(data){
					index=1;
					if(null==data){
						if(dt!=undefined){
							dt.fnClearTable();
						}
					}else{
						if(dt==undefined){
							
								dt=$('#data_table').dataTable({
								    data: data,
								    paging: true,
									lengthChange: false,
							        searching: false,
									processing: true,
									oLanguage: {
							        	sInfo: "总共：_TOTAL_ 条",
									},
									autoWidth: false,
									bSort:false,
									scrollX: true,
								    columns: [
									    { data: 'id',"mRender": function(data,type,full){
						        			return index++;
									    }},
								        { data: 'login_name' },
								        { data: 'publishDate'},
								        { data: 'publishPath'},
								        { data: 'requestPath'},
								        { data: 'id',"mRender": function(data,type,full){
								        		return	'';
											}
								        	}
								    ]
								} );
								
							}else{
								dt.fnClearTable();
								if(data.length>0){
									dt.fnAddData(data, true); 
								}
							}
						setUploadBtnToFirstTr();
					}
					
				}
			});
		}
		function setUploadBtnToFirstTr(){
			var firstTR=$('#data_table').find("tbody").find("tr:eq(0)");
			if(firstTR.length>0&&firstTR.find("td").length!=1){
				firstTR.find("td:last").html('<div class="action-button"><button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#jsModal" onclick="uploadBtnClick()">下载</button></div>');
			}
		}
		function uploadBtnClick(){
			$("#isUploadJar").get(0).checked=false;
			$("#isUploadJs").get(0).checked=false;
			$("#project_publish_btu").click();
		}
				function publishProject() {
					if(confirm('是否发布?')) {
						$.ajax({
							type: "post",
							url: basePath+'/publish/publish.htm?userid=${sessionScope.userobject.u_id}',
							beforeSend: function () {
								$('#bgBoxPublish').show();
							},
							complete: function () {
								$('#bgBoxPublish').hide();
							},
							success: function (data) {
								//alert("发布成功");
								$('#bgBox').hide();
								if(data=="upload"){
									$("#isUploadJar").get(0).checked=false;
									$("#isUploadJs").get(0).checked=false;
									$("#project_publish_btu").click();
								}
								getdata();
							}
						});
					}
				}

				function exit() {
					if(confirm("您确定要退出吗？")) {
						window.location.href="<%=rootPath %>/login.jsp";
					}
				}
				function uploadProject(){
					$("#uploadProjectClose").click();
					var url=basePath+'/publish/uploadProject.htm?f=1';
					if($("#isUploadJar").get(0).checked){
						url+="&uploadFlag="+$("#isUploadJar").val();
					}
					if($("#isUploadJs").get(0).checked){
						url+="&isUploadJs="+$("#isUploadJs").val();
					}
					$.ajax({
						type: "post",
						url: url,
						beforeSend: function () {
							$('#bgBox').show();
						},
						complete: function () {
							$('#bgBox').hide();
						},
						success: function (data) {
							var dataName=""
							dataName=data.split("\.");
							window.location.href="<%=rootPath %>/DownloadFile?fileurl="+data+"&filename="+dataName[0];
						}
					});
				}
			</script> 
	</body>
</html>