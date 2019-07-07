<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String rootPath = request.getContextPath();
 	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
 	
%>
<!DOCTYPE html>
	<head>
		<title>请假待办任务列表</title>
		<%@ include file="/WEB-INF/common/commoncss.jsp" %>
		<link rel="stylesheet" href="<%=rootPath %>/css/public.css">
		<link rel="stylesheet" href="<%=rootPath %>/js/plugins/datatables/dataTables.bootstrap.css">
	</head>
	<body class="skin-blue sidebar-mini">
		<div class="wrapper">
		    <jsp:include page="/WEB-INF/common/header.jsp" />
		    <div class="content-wrapper">
		        <section class="content">
		            <div class="row">
		                <div class="col-md-12 ">
		                    <div class="box box-primary">
		                    	<div class="box-header with-border">
		               				<h3 class="box-title">请假待办任务列表</h3>
		               			</div>
		               			<div class="box-body">
		               				<table id="function-table-process" class="table table-striped table-hover">
										<thead>
											<tr>
												<th>假种</th>
												<th>申请人</th>
												<th>申请时间</th>
												<th>开始时间</th>
												<th>结束时间</th>
												<th>当前节点</th>
												<th>任务创建时间</th>
												<th>流程状态</th>
												<th>操作</th>
											</tr>
										</thead>
										<tbody>
											<c:forEach items="${result }" var="leaveList">
												<tr id="${leaveList.leave.id }" tid="${leaveList.task.id }">
													<td>${leaveList.leave.leaveType }</td>
													<td>${leaveList.leave.userId }</td>
													<td>${leaveList.leave.applyTime }</td>
													<td>${leaveList.leave.startTime }</td>
													<td>${leaveList.leave.endTime }</td>
													<td>
														<a href='#' pid="${leaveList.processInstance.id }" title="点击查看流程图">${leaveList.task.name }</a>
													</td>
													<%--<td><a target="_blank" href='${ctx }/workflow/resource/process-instance?pid=${pi.id }&type=xml'>${task.name }</a></td> --%>
													<td>${leaveList.task.createTime }</td>
													<td>${leaveList.processInstance.suspended ? "已挂起" : "正常" }<b title='流程版本号'>V: ${leaveList.processDefinition.version }</b></td>
													<td>
														<c:if test="${empty leaveList.task.assignee }">
															<a  href="<%=rootPath %>/processController/claim.htm?taskId=${leaveList.task.id}">签收</a>
														</c:if>
														<c:if test="${not empty leaveList.task.assignee }">
															<%-- 此处用tkey记录当前节点的名称 --%>
															<a tkey='${leaveList.task.taskDefinitionKey }' tname='${leaveList.task.name }' href="<%=rootPath %>/processController/viewForm.htm?id=${leaveList.leave.id}&taskid=${leaveList.task.id}">办理</a>
														</c:if>
													</td>
												</tr>
											</c:forEach>
										</tbody>
									</table>
		               			</div>
		                    </div>
		                </div>
		            </div>
		        </section>
		    </div>
		    <jsp:include page="/WEB-INF/common/footer.jsp" />
		</div>
		
		<%@ include file="/WEB-INF/common/commonjs.jsp" %>
		<script src="<%=rootPath %>/js/leave-todo.js"></script>
		<script src="<%=rootPath %>/js/plugins/datatables/jquery.dataTables.min.js"></script>
		<script src="<%=rootPath %>/js/plugins/datatables/dataTables.bootstrap.min.js"></script>
		<script>
		$(document).ready(function (){
			$("#function-table-process").DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "info": true,
                "autoWidth": false
            });
		});
		</script>
	</body>
</html>