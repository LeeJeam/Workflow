<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/common/taglib.jsp" %>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title></title>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<%@ include file="/WEB-INF/common/commoncss.jsp" %>
<%@ include file="/WEB-INF/common/commonjs.jsp" %>

<script src="<%=rootPath%>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="<%=rootPath%>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
<script src="<%=rootPath%>/js/custom/views/releasesmanage/table-view.js"></script>
<script type="text/javascript">
    var isPreview = '${isPreview}';
</script>

</head>

<body class="hold-transition skin-blue layout-top-nav">
	<jsp:include page="/common/header.jsp" />
<div class="wrapper">
    <div class="content-wrapper" style="min-height: 784px;">
        <section class="content">
            <div class="row">
                <input id='iptcontent' type='hidden' value=''>
                 
                <div  class="col-xs-10 col-lg-offset-1">
                  ${data.content}
                 </div>
            </div>
        </section>
    </div>
    <jsp:include page="/common/footer.jsp" />
</div>
</body>
</html>
