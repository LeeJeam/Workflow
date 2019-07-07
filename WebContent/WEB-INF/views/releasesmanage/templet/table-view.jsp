<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/common/taglib.jsp" %>
<%
	String rootPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
    <title></title>

    <%@ include file="/WEB-INF/common/commonjs.jsp" %>
    <script src="<%=rootPath%>/js/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="<%=rootPath%>/js/plugins/datatables/dataTables.bootstrap.min.js"></script>
    <script src="<%=rootPath%>/js/custom/views/releasesmanage/table-view.js"></script>
    <script src="<%=rootPath %>/js/plugins/slimScroll/jquery.slimscroll.min.js"></script>
    <script src="<%=rootPath %>/js/jquery.form.js"></script>
    <script src="<%=rootPath %>/bootstrapValidator/js/bootstrapValidator.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/datadetail.js"></script>


    <script type="text/javascript" src="<%=rootPath %>/js/plugins/datepicker/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/plugins/datepicker/bootstrap-datetimepicker.zh-CN.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/custom/views/functionpagemanage/flow/date.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/formCommJs.js"></script>
<style>
</style>

</head>
 
<body>
    <input id='iptcontent' type='hidden' value=''>
    <input type="hidden" id="rootPath" value="<%=rootPath %>">
    <div id='tablediv' class="col-xs-12">
       模板
     </div>
</body>
</html>
