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
		<title>首页</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/quit/sweetalert.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/indexShop.css">
	</head>
	<body class="hold-transition skin-blue layout-top-nav">
		<div class="wrapper">
			<jsp:include page="/common/header.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content container">
					<div class="row">
						<div class="col-md-12">
							<div class="box box-primary">
								<div class="box-header with-border">
									<h3 class="box-title menu-title">当前项目-<span class="text-light-blue"><%=project.getProjectName() %></span></h3>
								</div>
								<div class="box-body">
									<div class="tab-pane active" id="activity">
		                                <div id="templatemo_services" class="section1">                                 
		                                    <div class="row">
		                                        <div class="col-md-12">
		                                            <div class="row">
		                                                <div class="col-xs-6 col-sm-6 col-md-3">
		                                                    <div class="blok text-center">
		                                                        <div class="hexagon-a">
		                                                            <a class="hlinktop" href="dataBase.jsp">
		                                                                <div class="hexa-a">
		                                                                    <div class="hcontainer-a">
		                                                                        <div class="vertical-align-a">
		                                                                            <span class="texts-a"><i class="fa fa-database"></i></span>
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
		                                                        <h4>数据库管理</h4>
		                                                    </div>
		                                                </div>
		                                                <div class="col-xs-6 col-sm-6 col-md-3">
		                                                    <div class="blok text-center">
		                                                        <div class="hexagon-a">
		                                                            <a class="hlinktop" href="menu.jsp">
		                                                                <div class="hexa-a">
		                                                                    <div class="hcontainer-a">
		                                                                        <div class="vertical-align-a">
		                                                                            <span class="texts-a"><i class="fa fa-list-ul"></i></span>
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
		                                                        <h4>功能菜单</h4>
		                                                    </div>
		                                                </div>
		                                                <div class="col-xs-6 col-sm-6 col-md-3">
		                                                    <div class="blok text-center">
		                                                        <div class="hexagon-a">
		                                                            <a class="hlinktop" href="functionPage.jsp">
		                                                                <div class="hexa-a">
		                                                                    <div class="hcontainer-a">
		                                                                        <div class="vertical-align-a">
		                                                                            <span class="texts-a"><i class="fa fa-file"></i></span>
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
		                                                        <h4>功能页面</h4>
		                                                    </div>
		                                                </div>
		                                                <div class="col-xs-6 col-sm-6 col-md-3">
		                                                    <div class="blok text-center">
		                                                        <div class="hexagon-a">
		                                                            <a class="hlinktop" href="processList.jsp">
		                                                                <div class="hexa-a">
		                                                                    <div class="hcontainer-a">
		                                                                        <div class="vertical-align-a">
		                                                                            <span class="texts-a"><i class="fa fa-sitemap"></i></span>
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
		                                                        <h4>工作流</h4>
		                                                    </div>
		                                                </div>
		                                                <div class="col-xs-6 col-sm-6 col-md-3">
		                                                    <div class="blok text-center">
		                                                        <div class="hexagon-a">
		                                                            <a class="hlinktop" href="jsManage.jsp">
		                                                                <div class="hexa-a">
		                                                                    <div class="hcontainer-a">
		                                                                        <div class="vertical-align-a">
		                                                                            <span class="texts-a"><i class="fa fa-cog"></i></span>
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
		                                                        <h4>JS管理</h4>
		                                                    </div>
		                                                </div>
		                                                <div class="col-xs-6 col-sm-6 col-md-3">
		                                                    <div class="blok text-center">
		                                                        <div class="hexagon-a">
		                                                            <a class="hlinktop" href="plugIn.jsp">
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
		                                                        <h4>插件管理</h4>
		                                                    </div>
		                                                </div>
		                                                <div class="col-xs-6 col-sm-6 col-md-3">
		                                                    <div class="blok text-center">
		                                                        <div class="hexagon-a">
		                                                             <a class="hlinktop" href="javascript: void(0);" onclick="publish();">
		                                                                <div class="hexa-a">
		                                                                    <div class="hcontainer-a">
		                                                                        <div class="vertical-align-a">
		                                                                            <span class="texts-a"><i class="fa fa-send"></i></span>
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
		                                                        <h4>发布项目</h4>
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
				</section>
			</div>
			<jsp:include page="/common/footer.jsp"></jsp:include>
		</div>
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/js/quit.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/UILib/dist/js/demo.js"></script>
		<script src="<%=rootPath %>/js/custom/views/releasesmanage/index-shop.js"></script>
		<script src="<%=rootPath %>/js/plugins/jquery-loadmask/jquery.loadmask.min.js"></script>
		<script src="<%=rootPath %>/js/common.js"></script>
	</body>
</html>