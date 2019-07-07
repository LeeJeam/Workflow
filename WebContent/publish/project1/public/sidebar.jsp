<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<aside class="main-sidebar">
	<section class="sidebar">
		<ul class="sidebar-menu">
			<li class="header">功能菜单</li>
			<li class="treeview">
				<a href="#"><i class="fa fa-leaf"></i><span>自定义一</span><i class="fa fa-angle-left pull-right"></i></a>
				<ul class="treeview-menu">
					<li><a href="#"><i class="fa fa-circle-o"></i> 子页面一</a></li>
					<li><a href="#"><i class="fa fa-circle-o"></i> 子页面二</a></li>
					<li><a href="#"><i class="fa fa-circle-o"></i> 子页面三</a></li>
				</ul>
			</li>
			<li>
				<a href="#"><i class="fa fa-leaf"></i><span>自定义二</span><i class="fa fa-angle-left pull-right"></i></a>
				<ul class="treeview-menu">
					<li><a href="#"><i class="fa fa-circle-o"></i> 子页面一</a></li>
					<li><a href="#"><i class="fa fa-circle-o"></i> 子页面二</a></li>
					<li><a href="#"><i class="fa fa-circle-o"></i> 子页面三</a></li>
				</ul>
			</li>
			<li>
				<a href="#"><i class="fa fa-leaf"></i><span>表单管理</span><i class="fa fa-angle-left pull-right"></i></a>
				<ul class="treeview-menu">
					<li><a href="table.jsp"><i class="fa fa-circle-o"></i> 表单页面</a></li>
					<li><a href="tableTree.jsp"><i class="fa fa-circle-o"></i> 树表单页面</a></li>
					<li><a href="form.jsp"><i class="fa fa-circle-o"></i> 表单展示</a></li>
				</ul>
			</li>
			<li>
				<a href="#"><i class="fa fa-leaf"></i><span>流程管理</span><i class="fa fa-angle-left pull-right"></i></a>
				<ul class="treeview-menu">
					<li><a href="flowNew.jsp"><i class="fa fa-circle-o"></i> 新建流程</a></li>
					<li><a href="flowCommission.jsp"><i class="fa fa-circle-o"></i> 代办工作</a></li>
					<li><a href="flowUiwe.jsp"><i class="fa fa-circle-o"></i> 流程查询</a></li>
				</ul>
			</li>
			<li>
				<a href="#"><i class="fa fa-leaf"></i><span>用户管理</span><i class="fa fa-angle-left pull-right"></i></a>
				<ul class="treeview-menu">
					<li><a href="userManageBasis.jsp"><i class="fa fa-circle-o"></i> 基础信息</a></li>
					<li><a href="userManageRole.jsp"><i class="fa fa-circle-o"></i> 用户角色</a></li>								
				</ul>
			</li>
		</ul>
	</section>
</aside>