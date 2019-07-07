<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String rootPath = request.getContextPath();
%>
<script type="text/javascript">
	var basePath = '<%=rootPath %>';
</script>
	<style>
		.navbar-brand { padding: 5px 15px;}
	</style>
			<header class="main-header">
				<nav class="navbar navbar-static-top">
					<div>
						<div class="navbar-header">
								<a href="#" class="navbar-brand"><span style="font-size: 30px;"><b>FLOWSys</b></span><c:if test="${!empty sessionScope.projectId}"><br>
									<p style="text-indent: 3em;"><i class="fa fa-cube"></i>${sessionScope.project.projectEnName}</p></c:if></a>

							<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
								<i class="fa fa-bars"></i>
							</button>
						</div>						
						<div class="navbar-custom-menu">
							<ul class="nav navbar-nav" id="header_tip">
								
								<c:if test="${!empty sessionScope.projectId}">
									<li title="个人主页" class="isEdit" <c:if test="${flag=='index'}">class="active"</c:if>> <a href="<%=rootPath %>/header/forward.htm?flag=index">主页</a></li>
									<li title="系统菜单" class="isEdit <c:if test="${flag=='menu'}">active</c:if>"> <a href="<%=rootPath %>/header/forward.htm?flag=menu">系统菜单</a></li>
									<li title="功能节点" class="isEdit <c:if test="${flag=='functionPage'}">active</c:if>"> <a href="<%=rootPath %>/header/forward.htm?flag=functionPage">功能节点</a></li>
									<li title="数据结构" class="isEdit <c:if test="${flag=='dataBase'}">active</c:if>" ><a href="<%=rootPath %>/header/forward.htm?flag=dataBase">数据结构</a></li>
									<li title="工作流程" class="isEdit <c:if test="${flag=='processList'}">active</c:if>" ><a href="<%=rootPath %>/header/forward.htm?flag=processList">工作流程</a></li>
									<li title="对象管理" class="isEdit <c:if test="${flag=='jsManage'}">active</c:if>" ><a href="<%=rootPath %>/header/forward.htm?flag=jsManage">对象管理</a></li>
									<li title="插件管理" class="isEdit <c:if test="${flag=='plugIn'}">active</c:if>" ><a href="<%=rootPath %>/header/forward.htm?flag=plugIn">插件管理</a></li>
									<li title="字典管理" class="isEdit <c:if test="${flag=='diciondary'}">active</c:if>"><a href="<%=rootPath %>/dictionary/index.htm">字典管理</a></li>
									<li title="项目发布" class="isEdit <c:if test="${flag=='publish'}">active</c:if>"><a href="#" onclick="publish()">项目发布</a></li>
								</c:if>
								<c:if test="${empty sessionScope.projectId&&sessionScope.ptype=='page'}">
									<li title="功能节点" class="isEdit <c:if test="${flag=='functionPage'}">active</c:if>"> <a href="<%=rootPath %>/header/forward.htm?flag=functionPage&type=page">功能节点</a></li>
								</c:if>
								<c:if test="${empty sessionScope.projectId&&sessionScope.ptype=='flow'}">
									<li title="工作流程" class="isEdit <c:if test="${flag=='processList'}">active</c:if>" ><a href="<%=rootPath %>/header/forward.htm?flag=processList&type=flow">工作流程</a></li>
								</c:if>
								<li title="个人信息" class="dropdown user user-menu">
					                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
					                  <img src="<%=rootPath %>/img/login/userName.png" class="user-image" >
					                  <span class="hidden-xs">${sessionScope.userobject.login_name}</span>
					                </a>
					                <ul class="dropdown-menu">
					                  <li class="user-header">
					                    <img src="<%=rootPath %>/img/login/userName.png" class="img-circle">
					                    <p style="margin-top: 25px;">欢迎来到项目流程快速开发框架</p>
					                  </li>
					                  <li class="user-body" style="font-size: 12px;">
					                    <div class="col-xs-4 text-center">
					                      <a href="javascript:void(0);">基础信息</a>
					                    </div>
					                    <div class="col-xs-4 text-center">
					                      <a href="#">用户管理</a>
					                    </div>
					                    <div class="col-xs-4 text-center">
					                      <a href="javascript:void(0);" data-toggle="modal" data-target="#Password">修改密码</a>
					                    </div>
					                  </li>
					                  <li class="user-footer">
					                    <div class="pull-left">
					                      <a href="<%=rootPath %>/header/forward.htm?flag=index"  class="btn btn-default btn-flat">切换项目</a>
					                    </div>
					                    <div class="pull-right">
					                      <a href="#" id="exit" class="btn btn-default btn-flat" onclick="exit()">安全退出</a>
					                    </div>
					                  </li>
					                </ul>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>
			
			<div class="modal fade bs-example-modal-sm" id="Password">
	            <div class="modal-dialog modal-sm" role="document">
	                <div class="modal-content">
	                    <div class="modal-header">
	                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                            <span aria-hidden="true">×</span>
	                        </button>
	                        <h4 class="modal-title">修改密码</h4>
	                    </div>
	                    <div class="modal-body">
	                    	<div class="form-group">
								<label style="font-size: 12px;">请输入原始密码</label>
		                      	<input type="password" class="form-control">
		                    </div>
		                    <div class="form-group">
								<label style="font-size: 12px;">请输入新密码</label>
		                      	<input type="password" class="form-control">
		                    </div>
		                    <div class="form-group">
								<label style="font-size: 12px;">请再次输入新密码</label>
		                      	<input type="password" class="form-control">
		                    </div>
	                    </div>
	                    <div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal" id="cacel-alertjsp">关闭</button>
							<button type="button" class="btn btn-primary" onclick="submit_dictionary()">提交</button>
						</div>
	                </div>
	             </div>
			</div>
			
			
			
			<script type="text/javascript">
				function publish() {
					
						window.location.href="<%=rootPath %>/header/forward.htm?flag=publish";
						
				}

				function exit() {
					if(confirm("您确定要退出吗？")) {
						window.location.href="<%=rootPath %>/login.jsp";
					}
				}
			</script> 