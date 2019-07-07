<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/common/taglib.jsp"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
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
	<!--id隐藏域-->
	<input type="hidden" name="id" value="${work.id }">
	<div class="form-group">
		<label class="col-sm-2 control-label">申请人</label>
		<div class="col-sm-8">
			<input type="type" class="form-control" id="userName" placeholder=""
				name="userName" value="${user.name}">
		</div>
	</div>
	<div class="form-group">
		<label for="inputEmail3" class="col-sm-2 control-label">所属部门：</label>
		<div class="col-sm-8">
			<select class="form-control" id="deptname" name="deptname">
				<option>开发部</option>
				<option>测试</option>
				<option>销售</option>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label">人员姓名</label>
		<div class="col-sm-8">
			<input type="type" class="form-control" id="names" placeholder=""
				name="names" value="${work.names }">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label">加班开始时间：</label>
		<div class="col-sm-8">
			<input type="type" class="form-control" id="FinishDate1" placeholder=""
				name="startTime">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label">加班结束时间：</label>
		<div class="col-sm-8">
			<input type="type" class="form-control" id="FinishDate2" placeholder=""
				name="endTime">
		</div>
	</div>
	<div class="form-group">
		<label class="col-sm-2 control-label">实际合计时长：</label>
		<div class="col-sm-8">
			<input type="type" class="form-control" id="countTime"
				name="countTime">
		</div>
	</div>
	<div class="form-group">
		<label for="inputPassword3" class="col-sm-2 control-label">加班原因：</label>
		<div class="col-sm-8">
			<textarea class="reason form-control" style="height: 90px;"
				name="reason">${work.reason }</textarea>
		</div>
	</div>
	<div class="form-group">
		<label for="inputPassword3" class="col-sm-2 control-label">加班内容：</label>
		<div class="col-sm-8">
			<textarea class="reason form-control" style="height: 90px;"
				name="context">${work.context }</textarea>
		</div>
	</div>
	<div class="form-group">
		<label for="inputPassword3" class="col-sm-2 control-label">加班证明人：</label>
		<div class="col-sm-8">
			<input type="type" class="form-control" id="voucher" placeholder=""
				name="voucher" value="${work.voucher }">
		</div>
	</div>
</body>
</html>
