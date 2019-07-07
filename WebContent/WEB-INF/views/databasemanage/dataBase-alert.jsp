<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>

<div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">新建数据表</h4>
                    </div>
                    <div class="modal-body">
                    	<form class="form-horizontal" id="addBaseDataForm">
		                  	<div class="box-body">
		                    	<div class="form-group">
		                      		<label class="col-sm-2 control-label">名称</label>
		                      		<div class="col-sm-9">
		                        		<input type="text" class="form-control" name="tableName" id="inputEmail3" placeholder="请输入数据表名称">
		                      		</div>
		                    	</div>
		                    	<div class="form-group">
		                      		<label class="col-sm-2 control-label">表类型</label>
		                      		<div class="col-sm-9">
		                        		<select class="form-control" name="tableType">
		                        			<option value="1">普通表</option>
		                        			<option value="2">树形结构表</option>
		                        			<option value="3">字典表</option>
		                        			<option value="4">级联表</option>
		                        			<option value="5">多关联表</option>
		                        			<option value="6">控件组数据表</option>
		                        		</select>
		                      		</div>
		                    	</div>
								<div class="form-group">
									<label class="col-lg-2 control-label">字典类型: </label>
									<div class="col-lg-9">
										<select id="customerType" name="customerType" class="form-control"></select>
									</div>
								</div>
		                    	<div class="form-group">
		                      		<label class="col-sm-2 control-label">备注</label>
		                      		<div class="col-sm-9">
		                      			<textarea class="form-control" name="remarks" placeholder="写点什么吧！"></textarea>
		                      		</div>
		                    	</div>
		                  	</div>
		                </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="cacel-alertjsp">关闭</button>
                        <button type="button" class="btn btn-primary" onclick="submitFun()">提交</button>
                    </div>
                </div>
            </div>
            <script type="text/javascript">
				$(function () {
					dataType.initSelectPageType('datasource','#customerType');
				});
   $('#addBaseDataForm').bootstrapValidator({
		        message: 'This value is not valid',
		        feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		        	tableName: {
		                validators: {
		                    notEmpty: {
		                        message: '必填'
		                    },stringLength: {
		                         min: 0,
		                         max: 30,
		                         message: '最长不能超过30个字'
		                     },
		                     regexp:{
		                    	 regexp:/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+|[\u4e00-\u9fa5a-zA-Z0-9]+)$/,
		                    	 message:'不能输入特殊字符和空格'
		                     }
		                }
		            },
		            remarks: {
		                validators: {
		                   stringLength: {
		                         min: 0,
		                         max: 200,
		                         message: '最长不能超过200个字'
		                     }
		                }
		            }
		            
		        }
		    }).on('success.form.bv', function(e) {
		        e.preventDefault();
		        var $form = $(e.target);
		        //disabledButton($("#btnFooter"));
		        
		        $form.ajaxSubmit({
		        	url:basePath+"/structureTable/insertStructureTableList.htm",
		        	type : 'post',
		        	data:{"projectId":projectId,"is_default":0},
					datatype : 'json',
					success : function(data) {
						 if(data.status){
							 $('#baseAdd').modal("hide");
								//alert("提交成功");
			                	//cancelFlow();
								if($("#page_commSetTableName").length>0){
									commSetTableName();
								}else{
									getfunctions($("#pageType option:selected").val(),$("#box-body").find('li[class="active"]').attr('ref'));
								}
			                }else{
			                	//activeButton($("#btnFooter"));
			                	alert(data.message);
			                }
		            }
		        }); 
		    });
   function submitFun(){
	   $('#addBaseDataForm').submit();
   }
   function commSetTableName(){
	   if($("#page_commSetTableName").length>0){
		   $("#page_commSetTableName,#tb-name").val($("#inputEmail3").val());
		   $("#alertTable").show();
		   $("#page_commHasTable").hide();
		   isCreateTableFlag=1;
	   }
   }
		</script>
		
