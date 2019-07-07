<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>主页</title>
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
						<li class="active">功能列表</li>
					</ol>
				</section>
				<section class="content">
					<div class="row">
						<div class="col-md-12">
							<div class="box box-primary">
								<div class="box-header with-border">
									<h3 class="box-title">功能列表</h3>
								</div>
								<div class="box-body">
								
									<h4 class="sign_title"><i class="fa fa-commenting-o"></i> 会签意见区</h4>
									<ul class="sign">
										<li>
											<p>
												<strong>第2步[会签]&nbsp;二、填写培训需求</strong><span>2016-7-22 16:43</span>
											</p>
											<p>
												<strong>会签人员意见&nbsp;张三：</strong>
											</p>
											<i>无借由器材</i>
										</li>
									</ul>
									<h4 style="margin-top: 30px;" class="sign_title"><i class="fa fa-commenting-o"></i> 审核意见区</h4>
									<ul class="sign">
									
										<li>
											<p>
												<strong>第2步[审核]&nbsp;二、填写培训需求</strong><span>2016-7-22 16:43</span>
											</p>
											<p>
												<strong>审核人员意见&nbsp;张三：</strong>
											</p>
											<i>无借由器材</i>
										</li>
									</ul>
									<table class="flowPath">
										<thead>
											<tr>
												<th colspan="3">流程开始(流水号：370000)</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td width="30%" align="center">第1步</td>
												<td width="30%">序号1：申请调动</td>
												<td width="40%">
													<p><b>张三&nbsp;主办</b>[<span class="flow_greend">已办结，用时:1分钟26秒</span>]</p>
													<p>开始于：2016-07-26 14:22:00</p>
													<p>结束于：2016-07-26 14:22:00</p>
												</td>
											</tr>
											<tr>
												<td width="30%" align="center" rowspan="4">第2步</td>
												<td width="30%">序号1：申请调动</td>
												<td width="40%">
													<p><b>张三&nbsp;主办</b>[<span class="flow_greend">已办结，用时:1分钟26秒</span>]</p>
													<p>开始于：2016-07-26 14:22:00</p>
													<p>结束于：2016-07-26 14:22:00</p>
												</td>
											</tr>
											<tr>
												<td width="30%">序号1：申请调动</td>
												<td width="40%">
													<p><b>张三&nbsp;主办</b>[<span class="flow_greend">已办结，用时:1分钟26秒</span>]</p>
													<p>开始于：2016-07-26 14:22:00</p>
													<p>结束于：2016-07-26 14:22:00</p>
												</td>
											</tr>
											<tr>
												<td width="30%">序号1：申请调动</td>
												<td width="40%">
													<p><b>张三&nbsp;主办</b>[<span class="flow_greend">已办结，用时:1分钟26秒</span>]</p>
													<p>开始于：2016-07-26 14:22:00</p>
													<p>结束于：2016-07-26 14:22:00</p>
												</td>
											</tr>
											<tr>
												<td width="30%">序号1：申请调动</td>
												<td width="40%">
													<p><b>张三&nbsp;主办</b>[<span class="flow_greend">已办结，用时:1分钟26秒</span>]</p>
													<p>开始于：2016-07-26 14:22:00</p>
													<p>结束于：2016-07-26 14:22:00</p>
												</td>
											</tr>
											<tr>
												<td width="30%" align="center">第1步</td>
												<td width="30%">序号1：申请调动</td>
												<td width="40%">
													<p><b>张三&nbsp;主办</b>[<span class="flow_greend">已办结，用时:1分钟26秒</span>]</p>
													<p>开始于：2016-07-26 14:22:00</p>
													<p>结束于：2016-07-26 14:22:00</p>
												</td>
											</tr>
										</tbody>
									</table>
									
									
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