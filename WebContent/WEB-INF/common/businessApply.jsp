<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/common/taglib.jsp"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
</head>

<body class="hold-transition skin-blue sidebar-mini">
	<div class="form-group">
		<label class="col-sm-2 control-label">申请人</label>
		<div class="col-sm-8">
			<input type="type" readonly="readonly" class="form-control" id="userName" placeholder=""
				name="userName" value="小明">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label">开始时间：</label>
		<div class="col-sm-8">
			<input type="type" class="form-control" id="FinishDate1"
				placeholder="" name="startTime">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label">结束时间：</label>
		<div class="col-sm-8">
			<input type="type" class="form-control" id="FinishDate2"
				placeholder="" name="endTime">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label">总共支出费用/元：</label>
		<div class="col-sm-8">
			<input type="type" class="form-control" id="cost" placeholder="" name="cost">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label">外勤地点：</label>
		<div class="col-sm-8">
			<input type="type" class="form-control" id="place" placeholder="" name="place" id="place">
		</div>
	</div>
		<div class="form-group">
		<label for="inputEmail3" class="col-sm-2 control-label">交通工具：</label>
		<div class="col-sm-8">
			<select class="form-control" id="" name="way">
				<option value="飞机">飞机</option>
				<option value="普通火车">普通火车</option>
				<option value="动车">动车</option>
				<option value="汽车">汽车</option>
				<option value="轮船">轮船</option>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label for="inputPassword3" class="col-sm-2 control-label">外勤原因：</label>
		<div class="col-sm-8">
			<textarea class="form-control" style="height: 90px;" name="reason" id="reason"></textarea>
		</div>
	</div>
	<div class="form-group">
		<label for="inputPassword3" class="col-sm-2 control-label">特别说明：</label>
		<div class="col-sm-8">
			<textarea class="form-control" style="height: 90px;" name="explain" id="explain"></textarea>
		</div>
	</div>
</body>
</html>
