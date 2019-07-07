/**
 * 附件上传
 * attachmentJSON为最终的值，提交的时候获取即可
 */
var attachmentJSON=[];
var fileid=1;
function upload(selector,fileQueue,fileType,tableName){
	var fileQueueId="fileQueue";
	if(fileQueue!=null&&fileQueue!=undefined){
		fileQueueId=fileQueue;
	}
	
	$("#"+selector).uploadify({  
        'swf'            : basePath+'/js/file/uploadify.swf',  
        'uploader'       : basePath+'/upload',//后台处理的请求  
        'queueID'        : fileQueueId,//与下面的id对应  
        'fileTypeExts'   : !!fileType ? fileType : '*.rar;*.zip;*.pdf;*.doc;*.xls;*.xlsx;*.docx;*.txt;*.bmp', //控制可上传文件的扩展名，启用本项时需同时声明fileDesc  
        'buttonText'     : '上传文件',
        'fileSizeLimit'  : '10MB',
        'uploadLimit'    : 5,
        'removeCompleted': false,
        'auto': true,
        'multi': true,
        'onUploadSuccess':function(file, data, response){
        	$('#' + file.id).find('.data').html('- 上传完毕');
        	addattachment(file,data,selector,tableName);
        	var cancel=$("#"+file.id + " .cancel a");
        	cancel.attr("ref",fileid);
     	    if (cancel) {
	     	    cancel.on('click',function (){
	     	    delete $("#"+selector).data('uploadify').queueData.files[file.id];
	     	   delattachmentFile($(this).attr("ref"),data,null,true);
	     	    $(this).parent().parent().remove();
     	    });
     	    } 
        }
   });  
	
}

function uploadone(selector,fileQueue,fileTypeExts){
	var fileQueueId="fileQueue";
	if(fileQueue!=null&&fileQueue!=undefined){
		fileQueueId=fileQueue;
	}
	$("#"+selector).uploadify({  
        'swf'            : basePath+'/js/file/uploadify.swf',  
        'uploader'       : basePath+'/upload?flag=1',//后台处理的请求  
        'queueID'        : fileQueueId,//与下面的id对应  
        'fileTypeExts'   : fileTypeExts, //控制可上传文件的扩展名，启用本项时需同时声明fileDesc  
        'buttonText'     : '上传文件',
        'fileSizeLimit'  : '10MB',
        'uploadLimit'    : 2,
        'removeCompleted': false,
        'auto': true,
        'multi': false,
        'onUploadSuccess':function(file, data, response){
        	hideLimitItem();
        	if(file.type.replace(".", "")=="jar"){
        		var f=0;
        		$("#"+fileQueueId).find(".fileName").each(function(){
        			if($(this).text().indexOf(".jar")>-1){
        				f++;
        			}
        		});
        		if(f>1){
        			alert("只能上传一个jar文件");
            		
        			$("#"+fileQueueId).find(".data").each(function(){
            			var $this=$(this);
            			if($this.text()==" - Complete"){
            				$this.parent(".uploadify-queue-item").remove();
            			}
            		});
            		return false;
        		}
        	}
        	if(data==false||data=="false"){
        		
        		alert("只能上传类的包名为‘cn.hy.commForm.pojo.CRunImport’的jar包，且只能有一个。class文件");
        		
        		$("#"+fileQueueId).find(".data").each(function(){
        			var $this=$(this);
        			if($this.text()==" - Complete"){
        				$this.parent(".uploadify-queue-item").remove();
        			}
        		});
        		return false;
        	}
        	if(file.type.replace(".", "")=="js"){
        		var f=0;
        		$("#"+fileQueueId).find(".fileName").each(function(){
        			if($(this).text().indexOf(".js")>-1){
        				f++;
        			}
        		});
        		if(f>1){
        			alert("只能上传一个js文件");
            		
            		$(".data").each(function(){
            			var $this=$(this);
            			if($this.text()==" - Complete"){
            				$this.parent(".uploadify-queue-item").remove();
            			}
            		});
            		return false;
        		}
        		var d=data.split("##+");
        		if(d.length!=2){
        			alert("上传的js文件没有装方法名的functionNames变量或者变量为空");
            		
        			$("#"+fileQueueId).find(".data").each(function(){
            			var $this=$(this);
            			if($this.text()==" - Complete"){
            				$this.parent(".uploadify-queue-item").remove();
            			}
            		});
            		return false;
        		}
        	}
        	$('#' + file.id).find('.data').html('- 上传完毕');
        	addattachment(file,data,selector,null,1);
        	var cancel=$("#"+file.id + " .cancel a");
        	cancel.attr("ref",fileid);
     	    if (cancel) {
	     	    cancel.on('click',function (){
	     	    delete  $("#"+selector).data(selector).queueData.files[file.id];
	     	    delattachmentFile($(this).attr("ref"),data);
	     	    $(this).parent().parent().remove();
	     	   
     	    });
     	    } 
        }
   });  
}

/**
 * 添加附件
 * @param file
 */
function addattachment(file,filepath,selectorid,tableName,flag){
	var type=file.type.replace(".", "");
	var name=file.name.replace(file.type, "");
	var length=attachmentJSON.length;
	if(length>0){
		//防止因为覆盖导致数据未清除
		for(var i=0;i<length;i++){
			var data=attachmentJSON[i];
			if(type==data.type&&name==data.filename&&data.selectorid==selectorid){
				attachmentJSON.splice(i,1);
				break;
			}
		}
	}
	fileid++;
	var funNames="";
	if(flag==1&&file.type.replace(".", "")=="js"){
		var d=filepath.split("##+");
		filepath=d[0];
		funNames=d[1];
	}
	//增加附件
	attachmentJSON.push({"id":fileid,
        "type":file.type.replace(".", ""),
        "filename":file.name.replace(file.type, ""),
        "isInsert":true,
        "selectorid":selectorid,
        "filesize":file.size,
        "filepath":filepath,
        "tableName":tableName,
        "funNames":funNames
       /* "tableName":tableName*/
	});
}
/**
 * 删除附件
 * @param id
 */
function delattachment(id){
	var length=attachmentJSON.length;
	if(length>0){
		for(var i=0;i<length;i++){
			var data=attachmentJSON[i];
			if(id==data.id){
				attachmentJSON.splice(i,1);
				break;
			}
		}
	}
}

/**
 * 删除文件
 * @param filepath
 */
function delattachmentFile(id,filepath,$this,isShow){
	if (confirm("确认要删除？")) {
		$.post(basePath+"/formUploadOp/deleteFileInfo.htm", {filepath:filepath}, function(data){
			if(data.status){
				delattachment(id);
				$($this).parents(".uploadify-queue-item").remove();
			}else{
				alert("删除失败");
			}
			if(isShow!=true){
				hideLimitItem();
			}
		},"json");
	}
	return false;
}
function hideLimitItem(){
	uploadone("uploadify","fileQueue","*.js");
	uploadone("uploadify-jar","fileQueue-jar","*.jar");
	/*uploadone("uploadify");
	if($(".uploadify-queue-item").length>=2){
		  $(".uploadify").hide();
	  }else{
		  $(".uploadify").show();
	  }
	*/
}
/**
 * 表单专用编辑上传
 * @param selector
 * @param isView   是否是查看
 */
function loadattachment(selector,isView,fileQueueSelector,formid){
	var fileQueue="fileQueue";
	if(fileQueueSelector!=null&&fileQueueSelector!=undefined){
		fileQueue=fileQueueSelector;
	}
    var param;
    if(formid!=undefined&&formid!=""){
    	param={"formid":formid};
    }
	$.post(basePath+"/formUploadOp/selectByFormid.htm", param, function(data){
		  if(null!=data){
			  var length=data.length;
			  if(length>0){
				  var html="";
				  if("true"==isView||true==isView){//查看
					  for(var i=0;i<length;i++){
							var d=data[i];
							html+='<p style="padding: 6px 0 0 0; margin: 0; color: #0073b7;">'+d.filename+'<a style="margin-left: 20px; color: #0073b7;" href="'+basePath+'/ServletDownload?fileurl='+d.filepath+'&filename='+d.filename+'">下载</a></p>'
						}
						var $p=$("#"+selector).parent().parent().html(html);
						    $p.html(html);
						    $p.attr("style","z-index: 999;");
					}else{//修改编辑
						//attachmentJSON=data;
						for(var i=0;i<length;i++){
							var d=data[i];
							html+='<div id="SWFUpload_a_'+selector+i+'" class="uploadify-queue-item">'
									+'<div class="cancel">'
									+'	<a href="javascript:$(\'#'+selector+'\').uploadify(\'cancel\', \'SWFUpload_a_'+selector+i+'\')" onclick="delattachmentFile('+d.id+',\''+d.filepath+'\',this)">X</a>'
									+'</div>'
									+'<span class="fileName">'+d.filename+'.'+d.type+' ('+d.filesize+'KB)</span><span class="data"> -  上传完毕</span>'
									+'<div class="uploadify-progress">'
									+'	<div class="uploadify-progress-bar" style="width: 100%;">'
									+'	</div>'
									+'</div>'
								    +'</div> '
								    if(i==(length-1)){
								    	fileid=d.id;
								    }
						}
						$("#"+fileQueue).after(html);
					}
				  hideLimitItem();
			  }else{
				  if("true"==isView||true==isView){
					  $("#"+fileQueue).empty();
				  }
				  
			  }
		  }
		  hideLimitItem();
	},"json");
}
/**
 * 共用的编辑上传
 * @param selector
 * @param isView   是否是查看
 */
function loadattachment2(selector,isView,fileQueueSelector,businessId,tableName){
	var fileQueue="fileQueue";
	if(fileQueueSelector!=null&&fileQueueSelector!=undefined){
		fileQueue=fileQueueSelector;
	}
    var param={};
    param.businessId=businessId;
    param.tableName=tableName;
    param.selector=selector;
	$.post(basePath+"/formUploadOp/selectPublishAtt.htm", param, function(data){
		  if(null!=data){
			  var length=data.length;
			  if(length>0){
				  var html="";
				  if("true"==isView||true==isView){//查看
					  for(var i=0;i<length;i++){
							var d=data[i];
							html+='<p class="uploadFile" style="padding: 6px 0 0 0; margin: 0; color: #0073b7;">'+d.filename+'<a style="margin-left: 20px; color: #0073b7;" href="'+basePath+'/DownloadFile?fileurl='+d.filepath+'&filename='+d.filename+'">下载</a></p>'
						}
						//var $p=$("#"+selector).parent().parent().html(html);
					  $("#"+fileQueue).after(html);
						   // $p.attr("style","z-index: 999;");
					}else{//修改编辑
						//attachmentJSON=data;
						for(var i=0;i<length;i++){
							var d=data[i];
							html+='<div id="SWFUpload_a_'+selector+i+'" class="uploadify-queue-item">'
									+'<div class="cancel">'
									+'	<a href="javascript:$(\'#'+selector+'\').uploadify(\'cancel\', \'SWFUpload_a_'+selector+i+'\')" onclick="delattachmentFile('+d.id+',\''+d.filepath+'\',this,true)">X</a>'
									+'</div>'
									+'<span class="fileName">'+d.filename+'.'+d.type+' ('+d.filesize+'KB)</span><span class="data"> -  上传完毕</span>'
									+'<div class="uploadify-progress">'
									+'	<div class="uploadify-progress-bar" style="width: 100%;">'
									+'	</div>'
									+'</div>'
								    +'</div> '
								    if(i==(length-1)){
								    	fileid=d.id;
								    }
						}
						$("#"+fileQueue).after(html);
					}
			  }else{
				  if("true"==isView||true==isView){
					  $("#"+fileQueue).hide();
				  }
				  
			  }
		  }
	},"json");
}