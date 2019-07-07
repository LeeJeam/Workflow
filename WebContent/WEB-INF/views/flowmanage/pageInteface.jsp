<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>

<div class="modal-dialog" role="document">
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-label="Close">
				<span aria-hidden="true">×</span>
			</button>
			<h4 class="modal-title">页面接口配置</h4>
		</div>
		<div class="modal-body">
			<form class="form-horizontal" id="addBaseDataForm">
				<input type="hidden" name="id" id="pageIntefaceID" value="${data.id}"/>
				<div class="box-body">
					<div class="form-group">
						<label class="col-sm-3 control-label">页面接口:</label>
						<div class="col-sm-8">
							<input type="text" class="form-control" name="pageInteface" id="pageInteface" value="${data.page_inteface}" placeholder="请输入用户接口地址">
						</div>
					</div>
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal"
				id="cacel-alertjsp">关闭</button>
			<button type="button" class="btn btn-primary" onclick="intemodal()">提交</button>
		</div>
	</div>
</div>
<script type="text/javascript">
	$('#addBaseDataForm').bootstrapValidator({
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			pageInteface : {
				validators : {
					notEmpty : {
						message : '必填'
					}
				}
			},
		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		var $form = $(e.target);
		$form.ajaxSubmit({
			url : basePath + "/processController/savePageInteface.htm",
			type : 'post',
			datatype : 'json',
			success : function(data) {
				if (data.status) {
					$('#Page-Sort').modal("hide");
					alert("提交成功");
				} else {
					alert(data.message);
				}
			}
		});
	});
	function intemodal() {
		if($("#pageInteface").val()==""){
			
			return;
		}
		$.ajax({
			url : basePath + "/processController/savePageInteface.htm",
			type : 'post',
			datatype : 'json',
			data:{pageInteface:$("#pageInteface").val(),id:$("#pageIntefaceID").val()},
			success : function(data) {
				if (data.status) {
					$('#Page-Sort').modal("hide");
					alert("提交成功");
				} else {
					alert(data.message);
				}
			}
		});
		//$('#addBaseDataForm').submit();
	}
</script>
		
