<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	String username=  (String)request.getSession().getAttribute("username");
%>

<!DOCTYPE html>
<html>
	<head>
		<title>工作查询</title>
		<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
         <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap/css/bootstrap.min.css">
	    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/font-awesome4/css/font-awesome.min.css">
	    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/AdminLTE.css">
	    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/skins/_all-skins.min.css">
	    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.css">
	    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/public.css">
	    <link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/layer/skin/layer.css">
	    <style type="text/css">
	     .add_hide{display: none;}
	    </style>
	    <script src="<%=rootPath %>/publish/project1/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
	    <script src="<%=rootPath %>/publish/project1/UILib/bootstrap/js/bootstrap.min.js"></script>
	    <script src="<%=rootPath %>/publish/project1/UILib/dist/js/app.min.js"></script>
	    <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.js"></script>
    
        <script src="<%=rootPath %>/publish/project1/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="<%=rootPath %>/publish/project1/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
        <script src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
        <script src="<%=rootPath %>/publish/project1/UILib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
        <script src="<%=rootPath %>/publish/project1/js/jx/workmanage/search_word.js"></script>
        <script src="<%=rootPath %>/publish/project1/js/jx/workmanage/my_word.js"></script>
        <script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/layer/layer.js"></script>
        <script type="text/javascript">
        	var loginUserId="<%=username%>";
        	var basePath="<%=rootPath%>";
        </script>
	</head>
	
	<body class="hold-transition sidebar-mini skin-blue">
		
		<div class="wrapper">
			
		    <header class="main-header">
		        <a href="#" class="logo"><span class="logo-lg">大区绩效系统</a>
		        <nav class="navbar navbar-static-top">
		            <div class="navbar-custom-menu">
		                <ul class="nav navbar-nav">
		                    <li class="dropdown user user-menu">
		                        <a href="#" class="dropdown-toggle" title="用户名">
		                            <img src="<%=rootPath %>/img/user1.png" class="user-image" />
		                            <span class="hidden-xs" id="usernamespan"><%=request.getSession().getAttribute("username") %></span>
									<span class="hidden-xs" style="display:none" id="rolenamespan"><%=request.getSession().getAttribute("jname") %></span>
									<span class="hidden-xs" style="display:none" id="bumennamespan"><%=request.getSession().getAttribute("bname") %></span>
		                        </a>
		                    </li>
		                    <li>
		                        <a href="<%=rootPath %>/publish/project1/login.jsp" id="quit" title="退出系统"><i class="fa fa-power-off"></i></a>
		                    </li>
		                </ul>
		            </div>
		        </nav>
		    </header>

	    <aside class="main-sidebar">
	        <section class="sidebar">
	            <ul class="sidebar-menu"></ul>
	        </section>
	    </aside>
			
		    <div class="content-wrapper">
		        <section class="content-header">
		            <ol class="breadcrumb">
		                <li><a href="<%=rootPath %>/views/index.jsp"><i class="fa fa-home"></i> 首页</a></li>
		                <li class="active">工作查询</li>
		            </ol>
		        </section>
		        <section class="content">
		            <div class="row">
		                <div class="col-md-12">
		                	<div class="box box-primary">
		                		<form id="searchForm">
			                		<div class="box-header with-border">
			                            <h3 class="box-title box-title-name">工作查询</h3>
			                            <div class="input-group col-md-2 pull-right">
			                           		<input type="text" name="keyword" class="form-control" placeholder="编号/名称/姓名" />
			                                <span class="input-group-btn">
			                                    <button type="button" id="search" class="btn btn-primary btn-flat"><i class="fa fa-search"></i></button>
			                                </span>
			                            </div>
			                            <div id="userBox" class="input-group col-md-2 pull-right selectUive add_hide">
			             					<div class="input-group">
			                                	<input type="text" id="userNameScope" name="userNameScope" class="form-control" placeholder="请选择人员" readonly onclick="getusers('userNameScope')"/>
			                                    <input type="hidden" id="userIdScope" name="userIdScope">
			                                    <span class="input-group-addon"><i class="fa fa-user-plus" onclick="getusers('userNameScope')"></i></span>
			                            	</div>
		                                </div>
			                            <div class="input-group col-md-1 pull-right selectUive">
			                            	<select id="scope" name="scope" class="form-control">
	                                            <option value="1">全部人员</option>
	                                            <option value="2">指定创建人</option>
	                                            <option value="3">指定经办人</option>
	                                        </select>
			                            </div>
			                            <div class="input-group col-md-1 pull-right selectUive">
			                            	<select id="stateType" name="stateType" class="form-control">
				                                <option value="">所有状态</option>
												<option value="未接收">未接收</option>
												<option value="未处理">未处理</option>
												<option value="处理中">处理中</option>
												<option value="已结束">已结束</option>
												<option value="已归档">已归档</option>
				                            </select>
			                            </div>
			                            <div class="input-group col-md-1 pull-right selectUive">
										    <input type="data" id="endDateStr" name="endDateStr" class="form-control" placeholder="流程结束时间" />
										</div>
			                            <div class="input-group col-md-1 pull-right selectUive">
										    <input type="data" id="beginDateStr" name="beginDateStr" class="form-control" placeholder="流程开始时间" />
										</div>
			                        </div>
		                        </form>
		                        <div class="box-body">
		                            <table id="dataTable" class="table table-hover table-bordered table-striped text-center">
										<thead>
											<tr>
												<th>编号</th>
												<th>名称</th>
												<th>当前步骤</th>
												<th>当前审核人</th>
												<th>当前停留时间</th>
												<th>结束时间</th>
												<th>创建人</th>
												<th>状态</th>
												<th>操作</th>
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
		
        <jsp:include page="/common/userName1.jsp"></jsp:include>
        <jsp:include page="/publish/project1/public/commBaseVariable.jsp"></jsp:include>
	</body>
</html>