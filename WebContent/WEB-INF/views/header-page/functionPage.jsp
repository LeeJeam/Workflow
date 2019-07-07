<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	cn.hy.projectmanage.pojo.Project project=cn.hy.common.utils.SessionUtil.getProjectName(request);
%>
<!DOCTYPE html>
<html>  
	<head>
		<title>功能节点</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
		<%--<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/zTree/zTree/demo.css">--%>
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/indexShop.css">
		<script type="text/javascript">
			function forwardPageTable(flag){
				var navId = $("#conternbodyLeft").find(".nav").find(".active").attr("ref");
				var url   = '<%=rootPath %>/header/forward.htm?flag=' + flag;
				if(!!navId) {
					url = url + "&navId="+navId;
				}

				window.location.href = url;
			}
		</script>
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
				                  	<h3 class="box-title">页面类型</h3>
				                  	<div class="box-tools">
				                    	<button title="类型设置" class="btn btn-box-tool" onclick="dataType.loadPage('page')" data-toggle="modal" data-target="#functionPage-Sort"><i class="fa fa-cog"></i></button>
				                  	</div>
				                </div>
			                	<div id="box-body" class="box-body no-padding" style="overflow-y:auto; overflow-x: hidden;">
			                		 <%--<ul class="nav nav-pills nav-stacked">
			                			<li onclick="getProcess()" class="active"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;全部类型</a></li>
			                			<li onclick="getProcess('行政管理类')"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;表格类</a></li>
			                			<li onclick="getProcess('关键业务类')"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;流程表单</a></li>
			                			<li onclick="getProcess('财务管理类')"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;自定义表单</a></li>
			                		</ul>--%>
			                	</div>
			            	</div>
						</div>
						<div class="col-md-10" style="padding-left: 0px;">
							<div class="box box-primary" style="margin-bottom: 0px;">
								<div class="box-header with-border">
									<h3 class="box-title">功能节点--<small>管理项目中的功能页面节点</small></h3>
									<div class="box-tools pull-right">
					                    <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#functionPage-Add">创建页面</button>
					                    <!-- <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#functionPage-User1">选人框一</button>
					                    <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#functionPage-User2">选人框二</button>
					                    <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#functionPage-User3">选人框三</button> -->
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
                                            <th width="15%">页面名称</th>
                                            <th width="15%">页面类型</th>
                                            <th width="12%">所属数据表</th>
                                            <th width="12%">创建时间</th>
                                            <th width="22%">路径</th>
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
		<div class="modal fade" id="functionPage-Add">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">创建页面</h4>
                    </div>
                    <div class="modal-body">
                    	<div class="tab-pane active" id="activity">
                            <div id="templatemo_services" class="section1">                                 
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="blok text-center">
                                                    <div class="hexagon-a">
                                                        <a class="hlinktop" onclick="forwardPageTable('pageTable')" href="#">
                                                            <div class="hexa-a">
                                                                <div class="hcontainer-a">
                                                                    <div class="vertical-align-a">
                                                                        <span class="texts-a"><i class="fa fa-table"></i></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="hexagon">
                                                        <a class="hlinkbott" href="javascript: void(0);">
                                                            <div class="hexa">
                                                                <div class="hcontainer">
                                                                    <div class="vertical-align">
                                                                        <span class="texts"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <h4>创建表格页面</h4>
                                                    <h5>功能描述：主要用于创建一个表格的数据统计页面。</h5>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="blok text-center">
                                                    <div class="hexagon-a">
                                                        <a class="hlinktop" onclick="forwardPageTable('pageForm')" href="#">
                                                            <div class="hexa-a">
                                                                <div class="hcontainer-a">
                                                                    <div class="vertical-align-a">
                                                                        <span class="texts-a"><i class="fa fa-file-o"></i></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="hexagon">
                                                        <a class="hlinkbott" href="javascript: void(0);">
                                                            <div class="hexa">
                                                                <div class="hcontainer">
                                                                    <div class="vertical-align">
                                                                        <span class="texts"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <h4>自定义表单页面</h4>
                                                    <h5>功能描述：主要用于创建一个提交表单页面。</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                  
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
        
        
        <div class="modal fade" id="functionPage-Sort">

        </div>
        
        <jsp:include page="/common/userName1.jsp"></jsp:include>
        
        <div class="modal fade" id="functionPage-User2">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">设置类型</h4>
                    </div>
                    <div class="modal-body userBox">
                    	<div class="cler">
	                    	<div class="fl userBox1">
								<div class="nav-tabs-custom">
									<ul class="nav nav-tabs">
										<li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">用户人员</a></li>
										<li class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">用户角色</a></li>
										<li class=""><a href="#tab_3" data-toggle="tab" aria-expanded="false">特殊群组</a></li>
									</ul>
									<div class="tab-content">
										<div class="tab-pane active" id="tab_1">
											<div class="input-group">
												<input id="new-event1" type="text" class="form-control input-sm" placeholder="">
												<div title="搜索" class="input-group-addon" style="cursor: pointer;"><i class="fa fa-search"></i></div>
											</div>
											<ul id="treeDemo" class="ztree ztreeList1"></ul>
										</div>
										<div class="tab-pane" id="tab_2">
											<div class="input-group">
												<input id="new-event2" type="text" class="form-control input-sm" placeholder="">
												<div title="搜索" class="input-group-addon" style="cursor: pointer;"><i class="fa fa-search"></i></div>
											</div>
											fgfdgdfgdfg
										</div>
										<div class="tab-pane" id="tab_3">
											<div class="input-group">
												<input id="new-event3" type="text" class="form-control input-sm" placeholder="">
												<div title="搜索" class="input-group-addon" style="cursor: pointer;"><i class="fa fa-search"></i></div>
											</div>
											sdfsdff
										</div>
									</div>
								</div>
	                    	</div>
	                    	<div class="fl userBox2">
	                    		<div class="btn-group-vertical">
									<button type="button" class="btn btn-default btn-sm" style="margin-bottom: 15px;"><i class="fa fa-chevron-right"></i></button>
									<button type="button" class="btn btn-default btn-sm"><i class="fa fa-chevron-left"></i></button>
		                        </div>
	                    	</div>
	                    	<div class="fr userBox3">
	                    		<div class="userBox3-head">
	                    			<div class="checkbox fl" style="margin: 0px;">
			                          <label title="全选">
			                            <input type="checkbox"> 全选
			                          </label>
			                        </div>
		                    		<div class="fr" title="清空">
			                    		<a href="javascript: void(0);">清空</a>
				                    </div>
	                    		</div>
	                    		<div class="userBox3-body">
	                    			<div class="checkbox"><label><input type="checkbox"> 随意勾选 1</label></div>
	                    			<div class="checkbox"><label><input type="checkbox"> 随意勾选 1-1</label></div>
	                    			<div class="checkbox"><label><input type="checkbox"> 随意勾选 1-2</label></div>
	                    			<div class="checkbox"><label><input type="checkbox"> 随意勾选 1-3</label></div>
	                    			<div class="checkbox"><label><input type="checkbox"> 随意勾选 1-4</label></div>
	                    			<div class="checkbox"><label><input type="checkbox"> 随意勾选 1-5</label></div>
	                    		</div>
	                    	</div>
                    	</div>
                    </div>
                    <div class="modal-footer">
                    	<button type="button" class="btn btn-primary">提交</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="functionPage-User3">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">设置经办权限<small class="text-red">(经办权限为"部门"、"角色"、"人员"三种权限类型)</small></h4>
                    </div>
                    <div class="modal-body">
                    	<table width="100%">
                    		<tr>
                    			<td width="15%" valign="middle" align="center"><b>授权范围:<br>(人员)</b></td>
                    			<td width="50%">
                    				<textarea class="textarea" style="height: 90px; width: 100%;"></textarea>
                    			</td>
                    			<td width="20%" valign="bottom" style="padding-left: 10px;">
                    				<a href="#">选择</a>
                    				<a href="#">选择</a>
                    			</td>
                    		</tr>
                    		<tr>
                    			<td width="15%" valign="middle" align="center"><b>授权范围:<br>(部门)</b></td>
                    			<td width="50%">
                    				<textarea class="textarea" style="height: 90px; width: 100%;"></textarea>
                    			</td>
                    			<td width="20%" valign="bottom" style="padding-left: 10px;">
                    				<a href="#">选择</a>
                    				<a href="#">选择</a>
                    			</td>
                    		</tr>
                    		<tr>
                    			<td width="15%" valign="middle" align="center"><b>授权范围:<br>(角色)</b></td>
                    			<td width="50%">
                    				<textarea class="textarea" style="height: 90px; width: 100%;"></textarea>
                    			</td>
                    			<td width="20%" valign="bottom" style="padding-left: 10px;">
                    				<a href="#">选择</a>
                    				<a href="#">选择</a>
                    			</td>
                    		</tr>
                    	</table>
                    </div>
                    <div class="modal-footer">
                    	<button type="button" class="btn btn-primary">提交</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
                </div>
            </div>
        </div>
        <%@ include file="/WEB-INF/common/commonjs.jsp" %>
		<script src="<%=rootPath %>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
		<script src="<%=rootPath %>/js/quit.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/demo.js"></script>
		<script src="<%=rootPath %>/js/custom/views/functionpagemanage/functionPage.js"></script>
        <script src="<%=rootPath %>/js/common.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/UILib/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/UILib/plugins/zTree/jquery.ztree.excheck-3.5.js"></script>

		<script type="text/javascript" src="<%=rootPath%>/js/datadetail.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/header-page/CustomerType.js"></script>

		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">
        <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
        <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>

		<script type="text/javascript">
            var basePath = '<%=rootPath %>';
            var projectId="<%=project.getId()%>";
        </script>
		<script>
		$(document).ready(function() {
            setHeight(new Array('box-body'),(51 + 5 + 46 + 15 + 15 + 45));
            setHeight(new Array('conternbodyRight'),(51 + 5 + 90 + 15 + 15));

			var navId = '${param.navId}';
			dataType.loadLeftTypeInfo('page','','','',navId);
			dataType.initPageType();
			dataType.searchEvent();
		});
		var setting = {
				check: {
					enable: true
				},
				data: {
					simpleData: {
						enable: true
					}
				}
			};

			var zNodes =[
				{ id:1, pId:0, name:"随意勾选 1", open:true},
				{ id:11, pId:1, name:"随意勾选 1-1", open:true},
				{ id:12, pId:1, name:"随意勾选 1-2", open:true},
				{ id:13, pId:1, name:"随意勾选 1-3", open:true},
				{ id:14, pId:1, name:"随意勾选 1-4", open:true},
				{ id:15, pId:1, name:"随意勾选 1-5", open:true},
				{ id:16, pId:1, name:"随意勾选 1-6", open:true},
				{ id:17, pId:1, name:"随意勾选 1-7", open:true},
				{ id:18, pId:1, name:"随意勾选 1-8", open:true},
				{ id:2, pId:0, name:"随意勾选 2", checked:true, open:true},
				{ id:22, pId:2, name:"随意勾选 2-2", open:true},
				{ id:23, pId:2, name:"随意勾选 2-3"},
				{ id:24, pId:2, name:"随意勾选 2-4"},
				{ id:25, pId:2, name:"随意勾选 2-5"},
				{ id:26, pId:2, name:"随意勾选 2-6"},
				{ id:27, pId:2, name:"随意勾选 2-7"},
				{ id:28, pId:2, name:"随意勾选 2-8"},
				{ id:29, pId:2, name:"随意勾选 2-9"},
			];
			
			var code;
			
			function setCheck() {
				var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
				py = $("#py").attr("checked")? "p":"",
				sy = $("#sy").attr("checked")? "s":"",
				pn = $("#pn").attr("checked")? "p":"",
				sn = $("#sn").attr("checked")? "s":"",
				type = { "Y":py + sy, "N":pn + sn};
				zTree.setting.check.chkboxType = type;
				showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
			}
			function showCode(str) {
				if (!code) code = $("#code");
				code.empty();
				code.append("<li>"+str+"</li>");
			}
			
			$(document).ready(function(){
				$.fn.zTree.init($("#treeDemo"), setting, zNodes);
				setCheck();
				$("#py").bind("change", setCheck);
				$("#sy").bind("change", setCheck);
				$("#pn").bind("change", setCheck);
				$("#sn").bind("change", setCheck);
			});
		</script>
	</body>
</html>