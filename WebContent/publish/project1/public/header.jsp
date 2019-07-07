<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<header class="main-header">
	<a href="#" class="logo"><span class="logo-lg"><b>Flow</b>HYS</span></a>
	<nav class="navbar navbar-static-top">
		<div class="navbar-custom-menu">
			<ul class="nav navbar-nav">
				<li class="dropdown user user-menu">
					<a href="#" class="dropdown-toggle" title="用户名">
						<img src="<%=rootPath%>/img/user1.png" class="user-image" />
						<span class="hidden-xs" id="usernamespan"><%=request.getSession().getAttribute("username") %></span>
						<span class="hidden-xs" style="display:none" id="rolenamespan"><%=request.getSession().getAttribute("jname") %></span>
						<span class="hidden-xs" style="display:none" id="bumennamespan"><%=request.getSession().getAttribute("bname") %></span>
					</a>
				</li>
				<li>
                    <a href="<%=rootPath %>/publish/login.jsp" id="quit" title="退出系统"><i class="fa fa-power-off"></i></a>
                </li>
			</ul>
		</div>
	</nav>
</header>