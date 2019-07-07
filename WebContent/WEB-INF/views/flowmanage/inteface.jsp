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
			<h4 class="modal-title">人员接口配置</h4>
		</div>
		<div class="modal-body">
			<form class="form-horizontal" id="addBaseDataForm">
				<input type="hidden" name="id" value="${data.id}"/>
				<div class="box-body">
					<div class="form-group">
						<label class="col-sm-3 control-label">用户接口:</label>
						<div class="col-sm-8">
							<input type="text" class="form-control" name="userInteface" id="userInte" value="${data.user_inteface}" placeholder="请输入用户接口地址">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">用户组接口:</label>
						<div class="col-sm-8">
							<input type="text" class="form-control" id="remarks" name="groupInteface" value="${data.group_inteface}" placeholder="请输入用户组接口地址"></input>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">部门接口:</label>
						<div class="col-sm-8">
							<input type="text" class="form-control" id="remarks" name="deptInteface" value="${data.dept_inteface}" placeholder="请输入部门接口地址"></input>
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
			userInteface : {
				validators : {
					notEmpty : {
						message : '必填'
					}
				}
			},
			groupInteface : {
				validators : {
					notEmpty : {
						message : '必填'
					}
				}
			},
			deptInteface : {
				validators : {
					notEmpty : {
						message : '必填'
					}
				}
			}

		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		var $form = $(e.target);
		$form.ajaxSubmit({
			url : basePath + "/processController/saveInteface.htm",
			type : 'post',
			datatype : 'json',
			success : function(data) {
				if (data.status) {
					$('#settinf_info').modal("hide");
					alert("提交成功");
				} else {
					alert(data.message);
				}
			}
		});
	});
	function intemodal() {
		$('#addBaseDataForm').submit();
	}
</script>
		
