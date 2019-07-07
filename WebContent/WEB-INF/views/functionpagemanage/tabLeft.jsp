<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>表单编辑器</title>
</head>
<style>
.caret_title { margin-bottom: 5px; margin-top: 5px;}
.caret_title:first-child { margin-top: 0px;}
.caret_title a { font-size: 14px; color: #1e1e1e; font-weight: 600; }
.caret_title a:hover { opacity: 0.8;}
</style>
<body>
<div id="formSettingGeneral" class="tab-pane active">
	<div class="tab-canvas">
		<div class="accordion" id="propertytools">
			<div class="accordion-group">
				<div class="caret_title"><a href="javascript:void(0);"><i class="fa fa-caret-down"></i>&nbsp;&nbsp;基本控件</a></div>
				<div id="tools" class="accordion-body collapse in caret_contern">
					<div class="accordion-inner">
						<div class="row nav nav-pills nav-stacked">
							<div class="formControl ui-draggable" id="_TextTemplate">
								<span class="glyphicon glyphicon-text-width"></span>&nbsp;&nbsp;&nbsp;&nbsp;输入框
							</div>
							<div class="formControl ui-draggable" id="_SelectTemplate">
								<span class="glyphicon glyphicon-collapse-down"></span>&nbsp;&nbsp;&nbsp;下拉框
							</div>
							<div class="formControl ui-draggable" id="_CheckBoxTemplate">
								<span class="glyphicon glyphicon-unchecked"></span>&nbsp;&nbsp;&nbsp;&nbsp;复选框
							</div>
							<div class="formControl ui-draggable" id="_UserBoxTemplate">
								<span class="glyphicon glyphicon-unchecked"></span>&nbsp;&nbsp;&nbsp;&nbsp;选人框
							</div>
							<div class="formControl ui-draggable" id="_RadioTemplate">
								<span class="glyphicon glyphicon-record"></span>&nbsp;&nbsp;&nbsp;&nbsp;单选框
							</div>
							<div class="formControl ui-draggable" id="_DateTemplate">
								<span class="glyphicon glyphicon-dashboard"></span>&nbsp;&nbsp;&nbsp;&nbsp;时间
							</div>
							<div class="formControl ui-draggable" id="_HeaderTemplate">
								<span class="glyphicon glyphicon-header"></span>&nbsp;&nbsp;&nbsp;&nbsp;上传
							</div>
							<div class="formControl ui-draggable" id="_PictureTemplate">
								<span class="glyphicon glyphicon-picture"></span>&nbsp;&nbsp;&nbsp;&nbsp;图片框
							</div>
							<div class="formControl ui-draggable" id="_linkTemplate">
								<span class="glyphicon glyphicon-link"></span>&nbsp;&nbsp;&nbsp;&nbsp;超链接
							</div>
							<div class="formControl ui-draggable" id="_TextAreaTemplate">
								<img src="<%=rootPath %>/img/webflow/textarea.png">&nbsp;文本框
							</div>
							<div class="formControl ui-draggable" id="_Button">
								<img src="<%=rootPath %>/img/webflow/but.png">&nbsp;按钮
							</div>
							<div class="formControl ui-draggable" id="_DataTableTemplate">
								<i class="fa fa-fw fa-table"></i>&nbsp;&nbsp;&nbsp;表格
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="accordion-group">
				<div class="caret_title"><a href="javascript:void(0);"><i class="fa fa-caret-down"></i>&nbsp;&nbsp;布局控件</a></div>
				<div id="template" class="accordion-body collapse in caret_contern">
					<div class="accordion-inner">
						<div class="formContainer ui-draggable" id="menu1Column">
							<img src="<%=rootPath %>/img/webflow/1col.png">控件组
						</div>
						<div class="formContainer ui-draggable" id="controlGroup">
							<img src="<%=rootPath %>/img/webflow/1col.png">页面块
						</div>
						<%--
						<div class="formContainer ui-draggable" id="menu2Columns">
							<img src="<%=rootPath %>/img/webflow/2col.png">二栏
						</div>
						<div class="formContainer ui-draggable" id="menu3Columns">
							<img src="<%=rootPath %>/img/webflow/3col.png">三栏
						</div>
						<div class="formContainer ui-draggable" id="menu4Columns">
							<img src="<%=rootPath %>/img/webflow/4col.png">四栏
						</div> --%>
						<div class="formContainer ui-draggable" id="twoandten">
							<img src="<%=rootPath %>/img/webflow/2-10col.png">2:10
						</div>
						<div class="formContainer ui-draggable" id="_panel">
							<span class="glyphicon glyphicon-tasks"></span>&nbsp;&nbsp;&nbsp;标题一
						</div>
						<div class="formContainer ui-draggable" id="_tab">
							<img src="<%=rootPath %>/img/webflow/tab.png">选项卡
						</div>
						<div class="formContainer ui-draggable" id="_collapsible">
							<img src="<%=rootPath %>/img/webflow/accordion.png">标题二
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

</body>
</html>