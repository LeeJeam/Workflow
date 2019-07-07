<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/common/taglib.jsp" %>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<title>请假详细信息</title>
<%@ include file="/WEB-INF/common/commoncss.jsp" %>
<%@ include file="/WEB-INF/common/commonjs.jsp" %>
<link rel="stylesheet" href="<%=rootPath %>/js/plugins/datepicker/css/bootstrap-datetimepicker.min.css">
<script type="text/javascript">
 function Submit(obj){
	    var  taskid = $("#taskid").val()
	    var  userId = $("#userId").val()
	    var processId=$("#processId").val()
	    var startTime=$("#FinishDate1").val()
	    var endTime=$("#FinishDate2").val()
	    var applyform=$("#applyform").val();
	    var processkey=$("#processkey").val();
	    var comment=$("#comment").val();
		$.ajax({
			type:"post",
			url:basePath+"/processController/complete.htm",
			data : {
				"taskid" : taskid,
				"processId" : processId,
				"flag" : obj,
				"startTime":startTime,
				"endTime":endTime,
				"applyform":applyform,
				"comment":comment
			},
			dataType:"json",
			success:function(data){
				if(data.status){
					alert(data.message);
					window.location.href="<%=rootPath %>/processController/tasking.htm?applyform="+applyform +"&userId="+userId+"&processkey="+processkey
				}else{
					alert(data.message);
				}
			}
		});
 }

 /**
  * 项目列表
  */
 function taskList(){
   var  processInstId = $("#processInstId").val();
 	$.ajax({
 		type:"post",
 		cache: false,   
 		url:basePath+"/processController/selectTask.htm",
 		data:{"processInstId" : processInstId},
 		dataType:"json",
 		success:function(data){
 			if(data!=null){
 	 			$("#taskUI").html(data.message);
 			}
 		}
 	});
 } 
 function backTo(backTaskid){
	 var  taskid = $("#taskid").val();
	 	$.ajax({
	 		type:"post",
	 		cache: false,   
	 		url:basePath+"/processController/backTo.htm",
	 		data:{"taskid" : taskid,"backTaskid" :backTaskid},
	 		dataType:"json",
	 		success:function(data){
	 			alert(data.message);
	 		}
	 	});
	 }    
</script>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

    <jsp:include page="/WEB-INF/common/header.jsp" />

    <div class="content-wrapper">
        <section class="content">
            <div class="row" style="padding: 140px 0;">
                <div class="col-md-8 col-md-offset-2">
                    <div class="box box-solid">
                        <div class="box-header with-border">
                            <i class="fa fa-text-width"></i>
                            <h3 class="box-title">请假详细信息</h3>
                        </div>
                        <div class="box-body">
                            <form class="form-horizontal" action="processController/complete.htm">
                            <input type="hidden" name="taskid" id="taskid" value="${taskid}"/>   
                            <input type="hidden" name="userId" id="userId" value="${userId}"/>    
                            <input type="hidden" name="processId" id="processId" value="${processId}"/>    
                             <input type="hidden" name="processkey" id="processkey" value="${processkey}"/>    
                                 <input type="hidden" name="applyform" id="applyform" value="${applyform}"/>   
                                  <input type="hidden" name="processInstId" id="processInstId" value="${processInstId}"/>   
			                  <div class="box-body">
			                    <div class="form-group">
			                      <label for="inputEmail3" class="col-sm-2 control-label">请假类型：</label>
			                      <div class="col-sm-8">
			                        <select class="form-control" id="leaveType" name="leave.leaveType" disabled="disabled">
			                        	<option>1</option>
			                        	<option>2</option>
			                        	<option>3</option>
			                        </select>
			                      </div>
			                    </div>
			                    <div class="form-group">
			                      <label class="col-sm-2 control-label">开始时间：</label>
			                      <div class="col-sm-8">
			                        <input type="type" disabled="disabled" name="startTime" class="form-control" id="FinishDate1" placeholder="" value="${leave.startTime}">
			                      </div>
			                    </div>
			                    <div class="form-group">
			                      <label class="col-sm-2 control-label">结束时间：</label>
			                      <div class="col-sm-8">
			                        <input type="type" disabled="disabled" name="endTime" class="form-control" id="FinishDate2" placeholder="" value="${leave.endTime}">
			                      </div>
			                    </div>
			                    <div class="form-group">
			                      <label for="inputPassword3" class="col-sm-2 control-label">请假原因：</label>
			                      <div class="col-sm-8">
			                        <textarea class="reason" disabled="disabled" style="height: 40px;" values="${leave.reason}"></textarea>
			                      </div>
			                    </div>
			                      <div class="form-group">
			                      <label for="inputPassword3" class="col-sm-2 control-label">同意原因：</label>
			                      <div class="col-sm-8">
			                        <textarea class="comment" style="height: 40px;" name="comment" id="comment"></textarea>
			                      </div>
			                    </div>
			                    <div class="form-group">
			                    <label for="inputPassword3" class="col-sm-2 control-label">选择退回节点：</label>
			                    <div class="col-sm-8">
			                      <ol style="line-height: 24px;" id="taskUI"></ol>
			                    </div>
			                  </div>
			                  <div class="box-footer text-center">			                  
			                    <button type="button" class="btn btn-primary btn-flat" id="submit" onclick="Submit(true)">同意</button>
			                    <button type="button" class="btn btn-primary btn-flat" id="submit" onclick="Submit(false)">驳回</button>
			                     <button type="button" class="btn btn-primary btn-flat" id="submit" onclick="taskList()">回退</button>
			                  </div>
			                </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
 
	  
  
    <jsp:include page="/WEB-INF/common/footer.jsp" />

</div>
<%@ include file="/WEB-INF/common/commonjs.jsp" %>
<script src="<%=rootPath %>/js/plugins/datepicker/bootstrap-datetimepicker.min.js"></script>
<script src="<%=rootPath %>/js/plugins/datepicker/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="<%=rootPath %>/js/views/leave.js"></script>
<script>
$(document).ready(function (){
	$("#FinishDate1").datetimepicker({ 
		language:'zh-CN',
        format:'yyyy-mm-dd hh:ii:ss',
        todayBtn:  1,
		autoclose: 1,
		startView: 2,
		minView:0
    });
	$("#FinishDate2").datetimepicker({ 
		language:'zh-CN',
        format:'yyyy-mm-dd hh:ii:ss',
        todayBtn:  1,
		autoclose: 1,
		startView: 2,
		minView:0
    });
});
</script>
</body>
</html>
