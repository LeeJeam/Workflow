<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%String rootPath = request.getContextPath();%>
<!DOCTYPE html>
<html>
	<head>
		<title>系统菜单</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
        <link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
        <link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
        <link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
        <link rel="stylesheet" href="<%=rootPath %>/css/reset.css">

        <link rel="stylesheet" href="<%=rootPath%>/js/tabletree/css/screen.css" media="screen" />
        <link rel="stylesheet" href="<%=rootPath%>/js/tabletree/css/jquery.treetable.css" />
        <link rel="stylesheet" href="<%=rootPath%>/js/tabletree/css/jquery.treetable.theme.default.css" />

		<script type="text/javascript" src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/UILib/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.js"></script>

		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
		<script type="text/javascript" src="<%=rootPath %>/UILib/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>

        <script src="<%=rootPath%>/js/tabletree/js/jquery-ui.js"></script>
        <script src="<%=rootPath%>/js/tabletree/js/jquery.treetable.js"></script>

        <script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/BaseControl.js"></script>
        <script src="<%=rootPath %>/js/common.js"></script>
        <script type="text/javascript" src="<%=rootPath%>/js/datadetail.js" ></script>
        <script type="text/javascript" src="<%=rootPath%>/js/Menu.js" ></script>
		<script type="text/javascript" src="<%=rootPath%>/js/header-page/CustomerType.js"></script>


		<script type="text/javascript" src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>

		<script type="text/javascript">
			var baseUrl = '<%=rootPath %>';
			var projectId = '${projectId}';
			$(document).ready(function() {
				setHeight(new Array('conternbodyRight'),(51 + 0 + 94 + 15 + 18));


				menu.init();
				menu.documentClickEvent();

			});
		</script>
	</head>
	<body class="hold-transition skin-blue layout-top-nav">
		<div class="wrapper">
			<jsp:include page="/common/header.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content container">
					<div class="row">
						<div class="box box-primary" style="margin-bottom: 0px; ">
							<div class="box-header with-border">
								<h3 class="box-title">系统菜单--<small>管理系统项目的工具栏菜单</small></h3>
								<div class="box-tools pull-right">
				                    <button class="btn btn-primary btn-sm" type='button' id="add-parent-menu" onclick="menu.addMenuInfo()">添加父节点</button>
				                </div>
							</div>
                            <div class="box-body" id="conternbodyRight" style="overflow-y: auto; overflow-x: hidden;">
                                <table class="example-advanced">
                                    <caption>
                                        <a href="#" onclick="jQuery('.example-advanced').treetable('expandAll'); return false;">展开所有</a>
                                        <a href="#" onclick="jQuery('.example-advanced').treetable('collapseAll'); return false;">收缩所有</a>
                                    </caption>
                                    <thead><tr><th width="30%">序号</th><th width="25%">网页名称</th><th  width="25%">链接页面</th><th width="20%">操作</th></tr></thead>
                                    <tbody></tbody>
                                </table>
                            </div>

						</div>
					</div>
				</section>
			</div>
			<jsp:include page="/common/footer.jsp"></jsp:include>
		</div>
	</body>
</html>