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

<body>
<div id="formSettingGeneral" class="tab-pane active">
	<div class="tab-canvas">
		<div class="accordion" id="propertytools">
			<div class="accordion-group">
				<div class="row"></div>
				<div class="text-red">基本控件</div>
				<div id="tools" class="accordion-body collapse in">
					<div class="accordion-inner">
						<div class="row nav nav-pills nav-stacked">
							<div class="row">
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_TextTemplate">
										<span class="glyphicon glyphicon-text-width"></span>&nbsp;&nbsp;输入框
									</div>
								</div>
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_SelectTemplate">
										<span class="glyphicon glyphicon-collapse-down"></span>&nbsp;&nbsp;下拉框
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_CheckBoxTemplate">
										<span class="glyphicon glyphicon-unchecked"></span>&nbsp;&nbsp;复选框
									</div>
								</div>
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_RadioTemplate">
										<span class="glyphicon glyphicon-record"></span>&nbsp;&nbsp;单选框
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_NumericTemplate">
										<img src="<%=rootPath %>/images/webflow/ico_numeric.png">数字类型
									</div>
								</div>
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_DateTemplate">
										<span class="glyphicon glyphicon-dashboard"></span>&nbsp;&nbsp;时间
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_TimeTemplate">
										<span class="glyphicon glyphicon-time"></span>&nbsp;&nbsp;时间(小时)
									</div>
								</div>
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_DateTimeTemplate">
										<span class="glyphicon glyphicon-calendar"></span>&nbsp;&nbsp;时间(时分秒)
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_TextAreaTemplate">
										<img src="<%=rootPath %>/images/webflow/textarea.png">文本框
									</div>
								</div>
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_Button">
										<img src="<%=rootPath %>/images/webflow/but.png">按钮
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_HeaderTemplate">
										<span class="glyphicon glyphicon-header"></span>&nbsp;&nbsp;标题
									</div>
								</div>
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_LookupTemplate">
										<span class="glyphicon glyphicon-search"></span>&nbsp;&nbsp;搜索块
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_ParagraphTemplate">
										<span class="glyphicon glyphicon-text-color"></span>&nbsp;&nbsp;段落标签
									</div>
								</div>
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_DataTableTemplate">
										<span class="glyphicon glyphicon-th"></span>&nbsp;&nbsp;表格
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_DataTreeTemplate">
										<span class="glyphicon glyphicon-tree-conifer"></span>&nbsp;&nbsp;树
									</div>
								</div>
								<div class="col-md-6">
									<div class="formControl ui-draggable" id="_PillsTemplate">
										<img src="<%=rootPath %>/images/webflow/pills.png">Pills
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="accordion-group">
				<div class="text-red">布局模块</div>
				<div id="template" class="accordion-body collapse in">
					<div class="accordion-inner">
						<div class="row">
							<div class="col-md-6">
								<div class="formContainer ui-draggable" id="menu1Column">
									<img src="<%=rootPath %>/images/webflow/1col.png">1 Column
								</div>
							</div>
							<div class="col-md-6">
								<div class="formContainer ui-draggable" id="menu2Columns">
									<img src="<%=rootPath %>/images/webflow/2col.png">2 Columns
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="formContainer ui-draggable" id="menu3Columns">
									<img src="<%=rootPath %>/images/webflow/3col.png">3 Columns
								</div>
							</div>
							<div class="col-md-6">
								<div class="formContainer ui-draggable" id="menu4Columns">
									<img src="<%=rootPath %>/images/webflow/4col.png">4 Columns
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="formContainer ui-draggable" id="twoandten">
									<img src="<%=rootPath %>/images/webflow/2-10col.png">2-10 Cols
								</div>
							</div>
							<div class="col-md-6">
								<div class="formContainer ui-draggable" id="_panel">
									<span class="glyphicon glyphicon-tasks"></span> Panel
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="formContainer ui-draggable" id="_tab">
									<img src="<%=rootPath %>/images/webflow/tab.png">Tab
								</div>
							</div>
							<div class="col-md-6">
								<div class="formContainer ui-draggable" id="_collapsible">
									<img src="<%=rootPath %>/images/webflow/accordion.png">Collapse
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

</body>
</html>