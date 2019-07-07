<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/common/taglib.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
<head lang="en">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>表单预览</title>
<%@ include file="/WEB-INF/common/commoncss.jsp" %>
<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datepicker/css/bootstrap-datetimepicker.min.css">
<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
</head>

<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

	<jsp:include page="/WEB-INF/common/header.jsp" />

	<div class="content-wrapper">
		<section class="content">
			<div class="row">
				<div class="col-md-10 col-lg-offset-1">
					<div class="box box-primary">
                        <div class="box-body" style="min-height: 600px; padding-top: 20px;">
							   模板
                            <div class="form-group">
                                 <div class="col-lg-8 col-lg-offset-2">
                                     <button id="btnSubmit" type="button" class="btn btn-primary btn-block">保存</button>
                                     <button id="btnReset" type="button" class="btn btn-default btn-block">取消</button>
                                 </div>
                             </div>
		                </div>
		        	</div>
				</div>
			</div>
		</section>
	</div>
	
	<jsp:include page="/WEB-INF/common/footer.jsp" />
    
</div>

<%@ include file="/WEB-INF/common/commonjs.jsp" %>
<script src="<%=rootPath %>/js/button/button.js"></script>
<script src="<%=rootPath %>/js/jquery.form.js"></script>
<script src="<%=rootPath %>/js/views/custom-table-view.js"></script>
</body>
</html>