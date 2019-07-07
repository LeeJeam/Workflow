<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<script type="text/javascript" src="<%=rootPath %>/js/filecommon.js"></script>
<script src="<%=rootPath %>/js/file/jquery.uploadify.min.js" type="text/javascript"></script>
 <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" id="closemodal2" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title">文件上传</h4>
            </div>
            <div class="modal-body" style="height: 500px; overflow-x: hidden; overflow-y: auto;">
            	 <form id="excelForm" class="form-horizontal">            	 		
                    <div class="form-group">
                        <label class="col-md-3 control-label">名称：</label>	
                    	<div class="col-md-8">
							<input type="text" id="form_config_file_name" data-gv-property="label" class="form-control" placeholder="请输入名称">
							<small class="text-yellow">备注：每次最多只能上传一个js文件</small>
                        </div>
                    </div>
                   <div class="form-group" id="form-group-fileQueue">
                        <label class="col-md-3 control-label">添加js：</label>								                        
                        <div class="col-md-8">
                        	<div id="fileQueue" class="fileupload fileupload-new">
			                	<input type="file" name="file" id="uploadify" />
							</div>
                        </div>
                    </div>
                    <!-- <div class="form-group" id="form-group-fileQueue-jar">
                        <label class="col-md-3 control-label">添加jar：</label>								                        
                        <div class="col-md-8">
                        	<div id="fileQueue-jar" class="fileupload fileupload-new">
			                	<input type="file" name="file" id="uploadify-jar" />
							</div>
                        </div>
                    </div> -->
                     <div class="form-group">
                        <label class="col-md-3 control-label">备注：</label>	
                    	<div class="col-md-8">
							<textarea class="form-control" id="form_config_file_remarks" name="remarks" placeholder="写点什么吧！" data-bv-field="remarks"></textarea>
                        </div>
                    </div>
                </form>
                <p class="text-center" style="padding-bottom: 20px; border-bottom: 1px solid #eee;">
	                <button type="button" class="btn btn-default btn-sm" id="closemodal" data-dismiss="modal">关闭</button>
	                <button type="button" class="btn btn-primary btn-sm"  onclick="submitUpload(this);">保存</button>
	            </p>
				<table id="function-table" class="table table-bordered table-hover" style="margin-top: 15px; overflow-x: hidden;">
                    <thead>
                        <tr>
                            <th width="5%">序号</th>
                            <th width="15%">名称</th>
                            <th width="15%">js文件</th>
                            <!-- <th width="12%">jar文件</th> -->
                            <th width="12%">备注</th>
                            <th width="3%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
   <script type="text/javascript" >
  	   uploadone("uploadify","fileQueue","*.js");
  	   //uploadone("uploadify-jar","fileQueue-jar","*.jar");
  	  // loadattachment("uploadify",false,"fileQueue",sysfunctionId);
  	// loadattachment("uploadify-jar",false,"fileQueue-jar",sysfunctionId);
  	   var projectname='${projectName}';
  	   getfunctions();
	   function submitUpload(en){
		   var names=$.trim($("#form_config_file_name").val());
		   var remarks=$.trim($("#form_config_file_remarks").val());
		   if(names==""){
			   alert("名称必填");
			   return;
		   }
		   if(names.length>30){
			   alert("名称最多只能输入30个字符");
			   return;
		   }
		   //alert(names.length);
		  
		   if(attachmentJSON.length==0){
			   alert("未上传文件");
			   return;
		   }
		   if(remarks.length>200){
			   alert("备注最多只能输入200个字符");
			   return;
		   }
		  // alert(remarks.length);
		  // return;
		   $(en).hide();
		   $.post(basePath+"/formUploadOp/saveUploadFileInfo.htm", {"attachments":JSON.stringify(attachmentJSON),"formid":sysfunctionId,"remarks":remarks,"name":names}, function(data){
			  
			   var attachmentJSON2=data;
			   attachmentJSON=[];
			   if(data!=null){
				  if(attachmentJSON2.length>0){
					  $("#formimpot").remove();
					    var html="<div id='formimpot'>";
	               		for(var i=0;i<attachmentJSON2.length;i++){
	               			if(attachmentJSON2[i].type=="js"){
	               				
	               				html+="<script type=\'text/javascript\' src=\'";
	               				html+="/"+projectname+"/formAtt/"+attachmentJSON2[i].filepath+"\'><"+"/script>";
	               				
	               			}
	               			if(attachmentJSON2[i].type=="jar"){
	               				html+="<script type=\'text/javascript\'>";
	               				html+="var jarname='"+attachmentJSON2[i].filepath+"'";
	               				html+="<"+"/script>"
	               			}
	               		}
	               		html+="</div>";
	               		$("#ctr").append(html);
	               		
				  }
				  
				  alert("提交成功");
				 // $("#closemodal").click();
				  getFunNames();
				  $(en).show();
				  $(".uploadify-queue-item").remove();
				  $("#form_config_file_name,#form_config_file_remarks").val("");
				  hideLimitItem();
				  getfunctions();
				  formConfigSaveFun2(true);
               }else{
            	   alert("提交失败");
            	   $(en).show();
               }
		   },"json")
	   }
	   
   var n=1;
   var dt=undefined;
   function getfunctions(){
	   n=1;
		$.ajax({
			type:"post",
			url:basePath+"/formUploadOp/findjsjoinjar.htm",
			data:{"sysid":sysfunctionId},
			dataType: 'json',
			
			success:function(Data){
				if(Data!=''){
				if(dt==undefined){
					$("#function-table").find("tbody").empty();
					dt=$('#function-table').dataTable({
					    data: Data,
					    paging: true,
						lengthChange: false,
				        searching: false,
						processing: true,
						oLanguage: {
				        	sInfo: "总共：_TOTAL_ 条",
						},
						autoWidth: false,
						bSort:false,
						scrollX: true,
					    columns: [
						    { data: 'id',"mRender": function(data,type,full){
			        			return n++;
						}},
							{ data: 'name'},
					        { data: 'jsname' },
					        
					       //{ data: 'jarname'},
					        
					        { data: 'remarks'},
					        { data: 'sysfunctionid',
					        	"mRender": function(data,type,full){
					        		return	'<td>'
					                    	+'<button class="btn btn-primary btn-xs" onclick="javascript:deletejsjoinjar('+"'"+full.jsname+"'"+',\''+full.jarname+'\')">删除</button>&nbsp;'
				                    		+'</td>'
								}
					        	}
					    ]
					} );
				}else{
					dt.fnClearTable();
					dt.fnAddData(Data, true); 
				}
				}else{
					dt.fnClearTable();
				}
			}
		});
	}
   function deletejsjoinjar(jsname,jarname){
	   if (confirm("确认要删除？")){
		   $.ajax({
				type:"post",
				url:basePath+"/formUploadOp/deletejsjoinjar.htm",
				data:{"jarpath":jarname,"jspath":jsname},
				dataType:"json",
				success:function(data){
					if(data.status){
						//$(element).parents("tr").remove();
						alert("删除成功");
						getfunctions();
						getFunNames();
						if(jsname!=""){
							$("#formimpot").children().each(function(){
								var src=$(this).attr("src");
								if(src.indexOf(jsname)>0){
									$(this).remove();
								}
							})
						}
					}else{
						alert(data.message);
					}
				}
			});
	   }
	}
   function formConfigSaveFun2(flag){
		var $content=$("#ctr").clone();
		$content.find("#add").find("input[type='radio'],input[type='checkbox']").removeAttr("checked");
		$content.find("#add").find(".fileupload").each(function(i){
			var $this=$(this);
			$this.attr("id","fileQueue_"+i);
			$this.find("input[type=file]").attr("id","uploadify_"+i);
		});
		$content.find("#add").find("input[data-role=date]").each(function(i){
			var $this=$(this);
			$this.attr("id","data_"+i);
			
		});
		var jsons={};
		var jsonstr="";
		//检查是有配置流程变量的控件
		$("#add").find("input[flowVariable],select[flowVariable]").each(function(){
			var flowVariable=$(this).attr("flowVariable");
			if(flowVariable!=""&&flowVariable!=null){
				jsons[flowVariable]="";
			}
			
		});
		for(var key in jsons)
		{
			jsonstr+=key+",";
		}
		$content.find(".hasFocus").removeClass("hasFocus");
		$content.find(".hasFocus2").removeClass("hasFocus2");
		$.ajax({
			type:"post",
			url:basePath+"/sysFunction/update.htm",
			data:{"id":sysfunctionId,"content":$content.html(),"modalName":$("#formid").val(),formProperties:jsonstr},
			dataType:"json",
			success:function(data){
				if(flag){
					return;
				}
				if(data.status){
					alert("保存成功");
					var url = basePath+"/header/forward.htm?flag=functionPage";
					if(!!navId) {
						url += "&navId="+navId;
					}
					window.location.href = url;
				}else{
					alert(data.message);
				}
			}
		});
	}
   </script>