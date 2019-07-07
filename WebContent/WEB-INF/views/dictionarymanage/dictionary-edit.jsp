<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>

<div class="modal-body">
	<form class="form-horizontal" id="addForm">
		<input type="hidden" id="data_id" name="id" value="${data.id }">
		<div class="box-body">
			<div class="form-group">
				<label class="col-sm-3 control-label">字典名称</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" name="name" id="dictionary_name" value="${data.name }" placeholder="请输入名称">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">对应数据表</label>
				<div class="col-sm-9">
					<select class="form-control" id="table_name" name="projecttableId">
						<option value="">(空)</option>
						<c:if test="${!empty tabledata }">
							<c:set var="type" value="-1"></c:set>
							<c:forEach var="item" items="${tabledata }" varStatus="status">
								<c:choose>
									<c:when test="${type!=item.tableType }">
										<c:if test="${status.index!=0 }">
											</optgroup>
										</c:if>
										<optgroup label="${item.tableType==2?'树形结构表':(item.tableType==3?'字典表':'多关联表') }">
											<option value="${item.id }" <c:if test="${item.id==data.project_table_id }"> selected="selected"</c:if>>${item.table_alias }</option>
											<c:set var="type" value="${item.tableType }"></c:set>
									</c:when>
									<c:otherwise>
										<option value="${item.id }" <c:if test="${item.id==data.project_table_id }"> selected="selected"</c:if>>${item.table_alias }</option>
									</c:otherwise>
								</c:choose>
							</c:forEach>
						</c:if>
					</select>
				</div>
			</div>
		</div>
	</form>
</div>
<div class="modal-footer">
	<button type="button" class="btn btn-default" data-dismiss="modal" id="cacel-alertjsp">关闭</button>
	<button type="button" class="btn btn-primary" onclick="submit_dictionary()">提交</button>
</div>
<script type="text/javascript">
	$('#addForm').bootstrapValidator({
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			name : {
				validators : {
					notEmpty : {
						message : '必填'
					}
				}
			},
			projecttableId : {
				validators : {
					notEmpty : {
						message : '必选'
					}
				}
			}
		}
		
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		var $form = $(e.target);

		$form.ajaxSubmit({
			url : basePath + "/dictionary/saveOrUpdate.htm",
			type : 'post',
			datatype : 'json',
			success : function(data) {
				if (data.status) {
					$('#baseDemo').modal("hide");
					getdata();
					//alert("提交成功");
				} else {
					alert(data.message);
				}
			}
		});
	});
	function submit_dictionary() {
		$('#addForm').submit();
	}
</script>

