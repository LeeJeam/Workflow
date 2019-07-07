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
</head>

<body class="hold-transition skin-blue sidebar-mini">
	<div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">请假类型：</label>
        <div class="col-sm-8">
          <select class="form-control" id="leaveType" name="leaveType">
          	<option>公假</option>
          	<option>事假</option>
          	<option>放假</option>
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
</body>
</html>
