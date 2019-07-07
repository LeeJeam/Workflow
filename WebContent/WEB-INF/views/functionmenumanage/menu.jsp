<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
 	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
 	cn.hy.projectmanage.pojo.Project project=cn.hy.common.utils.SessionUtil.getProjectName(request);
%>
<!DOCTYPE html">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>功能页面</title>
<%@ include file="/WEB-INF/common/commoncss.jsp" %>
<link rel="stylesheet" href="<%=rootPath %>/css/public.css">
<link rel="stylesheet" href="<%=rootPath %>/js/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
<style>
.tree-active { background-color: #FFE6B0; height: 16px; color: black; border: 1px #FFB951 solid;}
</style>
</head>

<body class="skin-blue sidebar-mini">
<div class="wrapper">

	<jsp:include page="/WEB-INF/common/header.jsp" />

	<div class="content-wrapper">
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-header with-border">
               				<h3 class="box-title">功能目录</h3>
               			</div>                        
                        <div class="box-body">
                        	<br>
							<div class="row">
								<div class="col-md-4 col-lg-offset-2">
									<ul id="menuTree" class="ztree well" style="height: 600px; overflow-y: auto; padding: 20px;">
									</ul>
								</div>
								<div class="col-md-4">
									<div class="well" style="height: 600px;">
										<div>
				                        	<button type="button" id="addParent" class="btn btn-default" onclick="return false;">增加父节点</button>
											<button type="button" id="addLeaf" class="btn btn-default" onclick="return false;">增加子节点</button>											
											<button type="button" id="remove" class="btn btn-default" onclick="return false;">删除节点</button>
											<button type="button" id="save" class="btn btn-primary">保存</button>
				                        </div>
				                        <div class="cler"></div><br>
				                        <div class="form-group">
				                            <label class="col-md-3 control-label">选中的节点:</label>
				                            <div class="col-md-9">
				                                <input type="text" id="menu_name" class="form-control textTree" placeholder="在这里修改内容" />
				                            </div>
				                        </div>
				                        <div class="cler"></div><br>
				                        <div class="form-group">
				                        	<label class="col-md-3 control-label">链接页面:</label>
				                            <div class="col-md-9">
				                                <input type="text" id="function_name" class="form-control tree-menu" placeholder="选择所属功能链接" />
				                                <div class="tree-submenu1">
													<ul class="ztree" id="function_demo">
														
													</ul>
				                                </div>
				                            </div>
				                        </div>
									</div>
								</div>
							</div>
		                 </div>
		        	</div>
				</div>
			</div>
		</section>
	</div>
      
	<jsp:include page="/WEB-INF/common/footer.jsp" />
	
</div>
<%@ include file="/WEB-INF/common/commonjs.jsp" %>
<script type="text/javascript" src="<%=rootPath %>/js/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript">
  var projectId="<%=project.getId()%>";
</script>
<script src="<%=rootPath %>/js/custom/views/flowmanage/menu.js"></script>
</body>
</html>