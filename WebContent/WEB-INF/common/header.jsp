<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
.wrapper {
    background: #ecf0f5;
}
.content-wrapper, .main-footer {
    margin-left: 0;
}
</style>
</head>

<body>

<header class="main-header">
    <a href="<%=rootPath %>/index-shop.jsp" class="logo">
        <span class="logo-mini"><b>W</b>FL</span>
        <span class="logo-lg"><b>WorkFLOW</b></span>
    </a>
    <nav class="navbar navbar-static-top" role="navigation">
        <a href="#" class="sidebar-toggle hidden-lg hidden-md hidden-sm" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <li class="dropdown notifications-menu active">
                    <a href="<%=rootPath %>/index-shop.jsp">
                       	首页
                    </a>
                </li>
                <li class="dropdown notifications-menu">
                    <a href="<%=rootPath %>/submenu-shop.jsp">
                       	页面
                    </a>
                </li>
                <li class="dropdown notifications-menu">
                    <a href="<%=rootPath %>/structureTable/createTable.htm">
                       	数据库
                    </a>
                </li>
                <li class="dropdown notifications-menu">
                    <a href="<%=rootPath %>/processController/processList.htm">
                       	工作流
                    </a>
                </li>
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <img src="<%=rootPath %>/images/user2-160x160.jpg" class="user-image" alt="User Image">
                        <span class="hidden-xs">Admin</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="user-header">
                            <img src="<%=rootPath %>/images/user2-160x160.jpg" class="img-circle" alt="User Image">
                            <p>
                               	欢迎来到大区绩效系统
                                <small>2016-1-1 12:00</small>
                            </p>
                        </li>                        
                        <li class="user-footer">
                            <div class="pull-left">
                                <a href="#" class="btn btn-default btn-flat">个人信息</a>
                            </div>
                            <div class="pull-right">
                                <a href="#" class="btn btn-default btn-flat">退出系统</a>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</header>

</body>
</html>