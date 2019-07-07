<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>基础信息</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/public.css">
	</head>
	<body class="hold-transition skin-blue fixed sidebar-mini" id="chat-box">
		<div class="wrapper">
			<jsp:include page="public/header.jsp"></jsp:include>
			<jsp:include page="public/sidebar.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content-header">
					<ol class="breadcrumb">
						<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
						<li class="active">基础信息</li>
					</ol>
				</section>
				<section class="content">
					<div class="row">
                        <div class="col-md-12">
                            <div class="cler basis-photo">
                                <div class="fl">
                                    <img src="img/user1.png" />
                                </div>
                                <div class="fl">
                                    <p>姓名：<span class="text-red">张三</span></p>
                                    <p>角色：<span class="text-red">一级用户</span></p>
                                    <p>居住：<span>广东省广州市天河区石牌街道石牌村二巷130号301号</span></p>
                                </div>
                            </div>
                            <div class="nav-tabs-custom">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#demo1" data-toggle="tab">基础信息</a></li>
                                    <li><a href="#demo2" data-toggle="tab">修改密码</a></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="active tab-pane" id="demo1">
                                        <form class="form-horizontal">
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;姓名：
                                                </label>
                                                <div class="col-md-4">
                                                    <input id="" type="text" name="" class="form-control" placeholder="请输入姓名" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;性别：
                                                </label>
                                                <div class="col-md-4">
                                                    <input id="" type="text" name="" class="form-control" placeholder="请输入性别" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;民族：
                                                </label>
                                                <div class="col-md-4">
                                                    <input id="" type="text" name="" class="form-control" placeholder="请输入民族" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;出生日期：
                                                </label>
                                                <div class="col-md-4">
                                                    <input id="" type="text" name="" class="form-control" placeholder="请输入出生日期" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;身份证号码：
                                                </label>
                                                <div class="col-md-4">
                                                    <input id="" type="text" name="" class="form-control" placeholder="请输入身份证" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;有效期：
                                                </label>
                                                <div class="col-md-4">
                                                    <input id="" type="text" name="" class="form-control" placeholder="请输入有效期" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;签发机关：
                                                </label>
                                                <div class="col-md-4">
                                                    <input id="" type="text" name="" class="form-control" placeholder="请输入签发机关信息" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;身份证ID号：
                                                </label>
                                                <div class="col-md-4">
                                                    <input id="" type="text" name="" class="form-control" placeholder="请输入身份证ID号" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;住址：
                                                </label>
                                                <div class="col-md-4">
                                                    <textarea class="form-control" placeholder="请输入详情地址"></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-sm-offset-2 col-sm-10">
                                                    <button type="submit" class="btn btn-primary btn-sm">保存</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="tab-pane" id="demo2">
                                        <form class="form-horizontal">
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;旧密码：
                                                </label>
                                                <div class="col-md-4">
                                                    <input id="" type="text" name="" class="form-control" placeholder="请输入旧密码" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;新密码：
                                                </label>
                                                <div class="col-md-4">
                                                    <input id="" type="text" name="" class="form-control" placeholder="请输入新密码" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">
                                                    <sup class="text-red supText"><b>*</b></sup>&nbsp;确认新密码：
                                                </label>
                                                <div class="col-md-4">
                                                    <input id="" type="text" name="" class="form-control" placeholder="请再次输入新密码" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-sm-offset-2 col-sm-10">
                                                    <button type="submit" class="btn btn-primary btn-sm">保存</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				</section>
			</div>
			<jsp:include page="public/footer.jsp"></jsp:include>
		</div>
		<script src="<%=rootPath %>/publish/project1/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/js/quit.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/demo.js"></script>
	</body>
</html>