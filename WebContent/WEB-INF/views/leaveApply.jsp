<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<title>首页</title>
<%@ include file="/WEB-INF/common/commoncss.jsp" %>
<link rel="stylesheet" href="<%=rootPath %>/js/plugins/datepicker/css/bootstrap-datetimepicker.min.css">
</head>

<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

    <jsp:include page="/WEB-INF/common/header.jsp" />

    <div class="content-wrapper">
        <section class="content">
            <div class="row" style="padding: 140px 0;">
                <div class="col-md-8 col-md-offset-2">
                    <div class="box box-solid">
                        <div class="box-header with-border">
                            <i class="fa fa-text-width"></i>
                            <h3 class="box-title">请假申请</h3>
                        </div>
                        <div class="box-body">
                            <form class="form-horizontal">
			                  <div class="box-body">
			                    <div class="form-group">
			                      <label for="inputEmail3" class="col-sm-2 control-label">请假类型：</label>
			                      <div class="col-sm-8">
			                        <select class="form-control" id="leaveType" name="leave.leaveType">
			                        	<option>1</option>
			                        	<option>2</option>
			                        	<option>3</option>
			                        </select>
			                      </div>
			                    </div>
			                   
			                    <div class="form-group">
			                      <label class="col-sm-2 control-label">开始时间：</label>
			                      <div class="col-sm-8">
			                        <input type="type" class="form-control" id="FinishDate1" placeholder="" name="startTime">
			                      </div>
			                    </div>
			                    <div class="form-group">
			                      <label class="col-sm-2 control-label">结束时间：</label>
			                      <div class="col-sm-8">
			                        <input type="type" class="form-control" id="FinishDate2" placeholder="" name="endTime">
			                      </div>
			                    </div>
			                    <div class="form-group">
			                      <label for="inputPassword3" class="col-sm-2 control-label">请假原因：</label>
			                      <div class="col-sm-8">
			                        <textarea class="reason" style="height: 90px;" name="reason"></textarea>
			                      </div>
			                    </div>
			                  </div>
			                  <div class="box-footer text-center">			                  
			                    <button type="button" class="btn btn-primary btn-flat" id="submit" onclick="goSubmit()">提 交</button>
			                  </div>
			                </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    
    <jsp:include page="/WEB-INF/common/footer.jsp" />

</div>
<%@ include file="/WEB-INF/common/commonjs.jsp" %>
<script src="<%=rootPath %>/js/plugins/datepicker/bootstrap-datetimepicker.min.js"></script>
<script src="<%=rootPath %>/js/plugins/datepicker/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="<%=rootPath %>/js/views/leave.js"></script>
<script>
$(document).ready(function (){
	$("#FinishDate1").datetimepicker({ 
		language:'zh-CN',
        format:'yyyy-mm-dd hh:ii:ss',
        todayBtn:  1,
		autoclose: 1,
		startView: 2,
		minView:0
    });
	$("#FinishDate2").datetimepicker({ 
		language:'zh-CN',
        format:'yyyy-mm-dd hh:ii:ss',
        todayBtn:  1,
		autoclose: 1,
		startView: 2,
		minView:0
    });
});
</script>
</body>
</html>
