<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/common/taglib.jsp" %>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	cn.hy.projectmanage.pojo.Project project=cn.hy.common.utils.SessionUtil.getProjectName(request);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>系统功能</title>
<link rel="stylesheet" href="<%=rootPath %>/js/plugins/datatables/dataTables.bootstrap.css">
<link rel="stylesheet" href="<%=rootPath %>/js/plugins/select2/select2.min.css">
<link rel="stylesheet" href="<%=rootPath %>/js/plugins/create/zzsc.css">
<link rel="stylesheet" href="<%=rootPath %>/js/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
<%@ include file="/WEB-INF/common/commoncss.jsp" %>


<link rel="stylesheet" href="<%=rootPath %>/css/public.css">
<link rel="stylesheet" href="<%=rootPath %>/js/plugins/sweetalert/sweetalert.css">


</head>

<body class="skin-blue sidebar-mini">
<div class="wrapper">

	<jsp:include page="/WEB-INF/common/header.jsp" />

	<div class="content-wrapper">
		<section class="content">
			<div class="row">
				<div class="col-md-offset-2 col-md-8">
					<div id="msform">
						<ul id="progressbar">
							<li class="active">创建网页</li>
							<li>创建数据表</li>
							<li>进入设计</li>
						</ul>
						<div class="menu">
							<h2 class="fs-title">创建网页</h2>
							<form id="defaultForm" method="post" action="" class="form-horizontal">
			                    <fieldset>
			                        <div class="form-group">
			                            <label class="col-lg-2 control-label">网页名称: </label>
			                            <div class="col-lg-10">
			                                <input type="text" class="form-control" placeholder="" id="web-name" />
			                            </div>
			                        </div>
			                        <div class="form-group">
			                            <label class="col-lg-2 control-label">父级网页: </label>
			                            <div class="col-lg-10">
			                                <input type="text" class="form-control tree-menu" readonly="readonly" id="parent-id" />
			                                <div class="tree-submenu" id="tree-function">
			                                	<div class="box box-default box-solid">
									                <div class="box-header with-border">
									                	<h3 class="box-title">全部网页</h3>
									                </div>
									                <div class="box-body" style="display: block;">
									                	<div class="tree" >
															<ul class="ztree" id="tree">
																
															</ul>
														</div>
									                </div>
									        	</div>
			                                </div>
			                            </div>
			                        </div>
			                        <div class="form-group">
			                            <label class="col-lg-2 control-label">表单类型: </label>
			                            <div class="col-lg-10">
			                                <select id="formTypeChangeFun"  class="form-control selectOption">
			                                	<option value="2">自定义表单</option>
			                                	<option value="5">流程表单</option>
			                                </select>
			                            </div>
			                        </div>
			                    </fieldset>
			                </form>
							<a class="btn bg-blue margin next action-button fr" onclick="foreword(this)">下一步</a>
							<div class="cler"></div>
						</div>
						<div class="menu">
							<h2 class="fs-title">创建数据表</h2>
							<form id="defaultForm" method="post" action="" class="form-horizontal">
			                    <fieldset>
			                        <div class="row">
			                        	<div class="col-md-12">
			                        		<div class="tab-pane active" id="activity">
						                        <div id="templatemo_services" class="section1">                                 
						                            <div class="row">
						                                <div class="col-md-12">
						                                    <div class="row">
						                                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-offset-3">
						                                            <div class="blok text-center">
						                                                <div class="hexagon-a">
						                                                    <a class="hlinktop btn1" href="javascript: void(0);">
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
						                                                <h4>重新建数据表</h4>
						                                            </div>
						                                        </div>
						                                        <div class="col-xs-6 col-sm-6 col-md-3">
						                                            <div class="blok text-center">
						                                                <div class="hexagon-a">
						                                                    <a class="hlinktop btn2" href="javascript: void(0);">
						                                                        <div class="hexa-a">
						                                                            <div class="hcontainer-a">
						                                                                <div class="vertical-align-a">
						                                                                    <span class="texts-a"><i class="fa fa-wrench"></i></span>
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
						                                                <h4>选择已有数据表</h4>
						                                            </div>
						                                        </div>                                                
						                                    </div>
						                                </div>
						                            </div>                                  
						                        </div>
						                    </div>
			                        		<div class="systemBox">
			                        			<div class="box box-primary">
													<div class="box-body">
														<div class="col-md-3">
															<input type="text" id="table-name" class="form-control" placeholder="在这里填写数据名称">
														</div>
														<a href="javascript: void(0);" class="btn btn-primary" id="add-row" onclick="CreateTB()">新增一行</a>
														<p></p>
														<table class="table table-striped table-hover" id="create-table">
															<thead>
																<tr>
																	<th>编号</th>
																	<th>名称</th>
																	<th>列名</th>
																	<th>类型</th>
																	<th>长度</th>
																	<th width="150">操作</th>
																</tr>
															</thead>
															<tbody>
															</tbody>
														</table>
													</div>
												</div>
			                        		</div>
			                        		<div class="pageBox">
			                        			<div class="box box-primary">
													<div class="box-body">
														<form id="defaultForm" method="post" action="" class="form-horizontal">
										                    <fieldset>
										                        <div class="form-group">
										                            <label class="col-lg-2 control-label">所属数据库: </label>
										                            <div class="col-lg-10">
										                                <select id="belong-database" class="form-control select2 select2-hidden-accessible" style="width: 100%;" tabindex="-1" aria-hidden="true">
											                        		<option value=""><--选择数据库--></option>
											                        	</select>
										                            </div>
										                        </div>			                    
										                    </fieldset>
										                </form>
													</div>
												</div>
			                        		</div>
			                        	</div>
			                        </div>
			                    </fieldset>
			                </form>
		                	<a href="#" class="btn bg-blue margin next action-button fr" onclick="foreword(this)">下一步</a>
		                	<a href="#" class="btn bg-orange margin previous action-button fr" onclick="reback(this)">上一步</a>
			                <div class="cler"></div>
						</div>
						<div class="menu">
							<h2 class="fs-title">进入设计</h2>
	      					<div class="sweet-alert showSweetAlert visible" style="display: block;">
							    <div class="sa-icon sa-success animate">
							    	<span class="sa-line sa-tip animateSuccessTip"></span>
							      	<span class="sa-line sa-long animateSuccessLong"></span>
							      	<div class="sa-placeholder"></div>
							      	<div class="sa-fix"></div>
							    </div>
							    <h2>Good!</h2>
							    <p>恭喜完成以上操作，点击进入进行页面操作。</p>
							    <div class="sa-button-container">
							    	<a style="cursor: pointer;" class="confirm btn bg-olive margin action-button" onclick="goin()">进入</a>
							    </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
      
	<jsp:include page="/WEB-INF/common/footer.jsp" />
      
</div>
<%@ include file="/WEB-INF/common/commonjs.jsp" %>
<script src="<%=rootPath %>/js/plugins/select2/select2.min.js"></script>
<script src="<%=rootPath %>/js/plugins/sweetalert/sweetalert.min.js"></script>
<script type="text/javascript" src="<%=rootPath %>/js/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>
<script src="<%=rootPath %>/js/custom/views/functionpagemanage/submenu-shop-page.js"></script>
<script type="text/javascript">
  paramJSON.type="${param.type}";
  $("#formTypeChangeFun").val("${param.type}");
  var projectId="<%=project.getId()%>";
  paramJSON.projetcId=projectId;
  paramJSON.templetName="custom-table-view";
 
</script>
</body>
</html>