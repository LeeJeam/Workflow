<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/common/taglib.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix='fmt' uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
String rootPath = request.getContextPath();
String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <c:set value="<%=rootPath %>" var="rootPath"></c:set>
    <link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/font-awesome4/css/font-awesome.min.css">
    <link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/dist/css/AdminLTE.css">
    <link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/dist/css/skins/_all-skins.min.css">
    <link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/quit/sweetalert.css">
    <link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">


    <%@ include file="/WEB-INF/common/commonjs.jsp" %>
	<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
	<script src="<%=rootPath %>/UILib/plugins/bootstrap/js/bootstrap.min.js"></script>
	<script src="<%=rootPath %>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
	<script src="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
	<script type="text/javascript">

$(function(){
	$('#function-table-processcreate').dataTable( {		
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
	} );
});
</script>

    <script type="text/javascript">
        function gotopage(url,$id){
           if(""!=url&&"null"!=url){
                window.location.href = "${rootPath}/pageToPage/index.htm?pagename="+url+"&menuId="+$id;
           }
        }
    </script>
</head>
<body class="hold-transition skin-blue fixed sidebar-mini" id="chat-box">
<div class="wrapper">
    <header class="main-header">
        <a href="#" class="logo"><span class="logo-lg"><b>Flow</b>HYS</span></a>
        <nav class="navbar navbar-static-top">
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" title="用户名">
                            <img src="<%=rootPath %>/images/user1.png" class="user-image" />
                            <span class="hidden-xs">Admin</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" id="quit" title="退出系统"><i class="fa fa-power-off"></i></a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    	<aside class="main-sidebar">
		<section class="sidebar">
			<ul class="sidebar-menu">
				<li class="header">功能页面</li>
				<li class="treeview active">
					<a href="#">
						<i class="fa fa-leaf"></i>
						<span>工作管理</span>
						<i class="fa fa-angle-left pull-right"></i>
					</a>
					<ul class="treeview-menu">
						<li><a href="<%=rootPath %>/pageToPage/index.htm?pagename=zhangsifeng"><i class="fa fa-circle-o"></i> 新建工作</a></li>
						<li><a href="#"><i class="fa fa-circle-o"></i> 待办工作</a></li>
						<li><a href="#"><i class="fa fa-circle-o"></i> 工作查询</a></li>
					</ul>
				</li>
				<li class="treeview">
					<a href="#">
						<i class="fa fa-leaf"></i>
						<span>我的项目</span>
						<i class="fa fa-angle-left pull-right"></i>
					</a>
				</li>
				<li class="treeview">
					<a href="#">
						<i class="fa fa-leaf"></i>
						<span>我的绩效</span>
						<i class="fa fa-angle-left pull-right"></i>
					</a>
				</li>
				<li class="treeview">
					<a href="#">
						<i class="fa fa-leaf"></i>
						<span>人员管理</span>
						<i class="fa fa-angle-left pull-right"></i>
					</a>
				</li>
			</ul>
		</section>
	</aside>

    <aside class="main-sidebar">
		<section class="sidebar">
			<ul class="sidebar-menu">
				<li class="header">功能页面</li>
				<li class="treeview active">
					<a href="#">
						<i class="fa fa-leaf"></i>
						<span>工作管理</span>
						<i class="fa fa-angle-left pull-right"></i>
					</a>
					<ul class="treeview-menu">
						<li><a href="<%=rootPath %>/pageToPage/index.htm?pagename=zhangsifeng"><i class="fa fa-circle-o"></i> 新建工作</a></li>
						<li><a href="#"><i class="fa fa-circle-o"></i> 待办工作</a></li>
						<li><a href="#"><i class="fa fa-circle-o"></i> 工作查询</a></li>
					</ul>
				</li>
				<li class="treeview">
					<a href="#">
						<i class="fa fa-leaf"></i>
						<span>我的项目</span>
						<i class="fa fa-angle-left pull-right"></i>
					</a>
				</li>
				<li class="treeview">
					<a href="#">
						<i class="fa fa-leaf"></i>
						<span>我的绩效</span>
						<i class="fa fa-angle-left pull-right"></i>
					</a>
				</li>
				<li class="treeview">
					<a href="#">
						<i class="fa fa-leaf"></i>
						<span>人员管理</span>
						<i class="fa fa-angle-left pull-right"></i>
					</a>
				</li>
			</ul>
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
			                             <div class="input-group col-md-2 pull-right">
										<select class="form-control" id="selectType" onchange="selectChange()">
				                        		<option value="0">已处理</option>
					                        	<option value="1">未处理</option>
				                        </select>
									</div>
			                        </div>
		                        </form>
		                        <div class="box-body">
		                            <table id="dataTable" class="table table-hover table-bordered table-striped text-center">
										<thead>
											<tr>
												<th>流程ID</th>
												<th>流程名称</th>
												<th>申请人</th>
												<th>申请时间</th>
												<th>当前节点</th>
												<th>流程状态</th>
												<th>审批时间</th>
												<th>批注</th>
												<th>处理人</th>
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
</div>
<div class="modal fade" id="equipmentDemoAdd">
</div>
</div>
	<footer class="main-footer">
	    <div style=" text-align: center;">Copyright @ 2017 All right reserved 棒谷网络科技有限公司</div>
	</footer>


<script type="text/javascript">

$(function(){
	select(null);
});
function selectChange(){
	type = $("#selectType").val();
	if(type==1){//未处理
		select("taskTodeal");
	}
	if(type==0){//已处理
		select("taskFinshed");
	}
}
var dt=undefined;
function select(selectType){
	$.ajax({
		type:"post",
		url:"<%=rootPath %>/processController/taskSelect.htm",
		data:{"selectType":selectType},
		dataType: 'json',
		success:function(data){
			if(dt==undefined){
				dt=$('#dataTable').dataTable( {
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
					    { data: 'taskId' },
				        { data: 'pdfName' },
				        { data: 'applyName'},
				        { data: 'taskCreateTime' },
				        { data: 'taskName' },
				        { data: 'states' },
				        { data: 'taskEndTime' },
				        { data:  'pZ'},
				        { data: 'taskAssignee' }
				    ]
				} );
			}else{
				dt.fnClearTable();
				dt.fnAddData(data, true); 
			}
		}
	});
}
</script>
</body>
</html>
