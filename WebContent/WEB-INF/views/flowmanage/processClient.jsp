<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
 	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
 	
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>流程页面</title>
<script type="text/javascript">
     function selectIndex(obj){
    		 if(obj.value==0){
    			 $("#user").attr("hidden",false);
    			 $("#extraWork").attr("hidden",true);
    		 }
    		 if(obj.value==1){
    			 $("#extraWork").attr("hidden",false);
    			 $("#user").attr("hidden",true);
    	 }
     }
     function selectPage(obj){
    		 if(obj.value==0){//请假管理员
        		 window.location.href="<%=rootPath %>/processController/listTask.htm";
        	 }
        	 else if(obj.value==1){//请假用户
        		 window.location.href="<%=rootPath %>/leave/running.htm";
        	 }
        	 else if(obj.value==2){//员工
        		 window.location.href="<%=rootPath %>/work/running.htm";
        	 }
    		 if(obj.value==3){//部门经理
        		  window.location.href="<%=rootPath %>/work/tasking.htm?userId=deptLeader"; 
        	 }
        	 else if(obj.value==4){//大区经理
        		  window.location.href="<%=rootPath %>/work/tasking.htm?userId=hrLeader"; 
        	 }
     }
</script>
<%@ include file="/WEB-INF/common/commoncss.jsp" %>
<link rel="stylesheet" href="<%=rootPath %>/css/public.css">
<link rel="stylesheet" href="<%=rootPath %>/js/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
</head>

<body class="skin-blue sidebar-mini">
<div class="wrapper">

	<jsp:include page="/WEB-INF/common/header.jsp" />

	<div class="content-wrapper">
		<section class="content">
			<div class="row">
				<div class="col-md-12">
               		<div class="box box-primary">
               			<div class="box-header with-border">
               				<h3 class="box-title">工作流信息</h3>
               			</div>
               			<div class="box-body">
               				<table id="function-table-processcreate" class="table table-striped table-hover">
			                    <thead>
									<tr>
										<th width="14%">流程ID</th>
										<th width="10%">流程名称</th>
										<th width="10%">流程状态</th>
										<th width="10%">流程类型</th>
										<th width="20%">操作</th>
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
      
	<jsp:include page="/WEB-INF/common/footer.jsp" />
	
	<div class="modal fade" id="myModal">
	    <div class="modal-dialog" role="document">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	                <h4 class="modal-title" id="myModalLabel">修改页面信息</h4>
	            </div>
	            <div class="modal-body">
	                <form id="defaultForm" method="post" action="" class="form-horizontal">
	                    <fieldset>
	                        <div class="form-group">
	                            <label class="col-lg-2 control-label">网页名称: </label>
	                            <div class="col-lg-10">
	                                <input type="text" class="form-control" id="web-name" />
	                            </div>
	                        </div>
	                    </fieldset>
	                </form>
	            </div>
	            <div class="modal-footer">
	            	<button type="button" class="btn btn-primary">保存</button>
	                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	            </div>
	        </div>
	    </div>
	</div>
      
</div>
<%@ include file="/WEB-INF/common/commonjs.jsp" %>
<script type="text/javascript" src="<%=rootPath %>/js/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="<%=rootPath %>/js/custom/views/flowmanage/process-workflow.js"></script>
</body>
</html>