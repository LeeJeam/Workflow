<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()+ path;
%>
<!DOCTYPE html>
<html>
<head>
<title>添加流程变量</title>
</head>
<body>

	<form action="<%=basePath%>/processController/saveVariable.htm" style=" width: 100%; z-index: 100000; background: #fff;">
		<input type="hidden" id="btn_sub">
		<div class="form" style=" background-color: #f4f4f4; border: 1px solid #fff; width: 95%; padding: 5px; margin: 5px 0;border-radius: 5px; -moz-box-shadow: 0px 0px 3px #aaa; -webkit-box-shadow: 0px 0px 3px #aaa; box-shadow: 0px 0px 3px #aaa;">
			<label class="form" style="font-size: 12px; width: 20%; display: inline-block;"> 节点编号: </label>
			<input name="taskid" value="${taskid}" readonly="readonly" style="width: 200px;">
		</div>
		<div class="form" style=" background-color: #f4f4f4; border: 1px solid #fff; width: 95%; padding: 5px; margin: 5px 0;border-radius: 5px; -moz-box-shadow: 0px 0px 3px #aaa; -webkit-box-shadow: 0px 0px 3px #aaa; box-shadow: 0px 0px 3px #aaa;">
			<label class="form" style="font-size: 12px; width: 20%; display: inline-block;"> 节点名称: </label> 
			<select id="variablename" name="variablename" style="width: 200px;">
				<c:forEach items="${formProperties}" var="row">
					<option value="${row}">${row}</option>
				</c:forEach>
			</select>
		</div>
		<div class="form" style=" background-color: #f4f4f4; border: 1px solid #fff; width: 95%; padding: 5px; margin: 5px 0;border-radius: 5px; -moz-box-shadow: 0px 0px 3px #aaa; -webkit-box-shadow: 0px 0px 3px #aaa; box-shadow: 0px 0px 3px #aaa;">
			<label class="form" style="font-size: 12px; width: 20%; display: inline-block;"> 节点值: </label> 
			<input id="processproval" name="processproval" value="${variable.variableVal}" style="width: 200px;">
		</div>
	</form>
	<script type="text/javascript" src="<%=path%>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
	<script type="text/javascript">
	var values=${variabledata};
	
	/**
	 * 根据下拉框属性变动值
	 */
	function getValue(name){
		if(name!=""&&values!=""&&values!=null){
			var length=values.length;
			if(length>0){
				for(var i=0;i<length;i++){
					if(name==values[i].variablename){
						return values[i].variableval;
					}
				}
			}
		}
		return "";
	}
	$(function(){
		//下拉框值变动赋值
		$("#variablename").change(function(){
			$("#processproval").val(getValue(this.value));
		});
		
		$("#variablename").change();
		$("#btn_sub").bind("click",function(){
			$.ajax({
				type:"post",
				url:"<%=path%>/processController/saveVariable.htm",
					data : {
						"processid" : "${processid }",
						"procesnodeid" : "${taskid }",
						"variablename" : $("#variablename").val(),
						"variableval" : $("#processproval").val(),
						"formkey" : "${formid }"
					},
					async : true,
					success : function(data) {
						if (data.status) {
							window.parent.variableLoad();
							alert(data.message);
							var api = frameElement.api, W = api.opener; // api.opener 为载加lhgdialog.min.js文件的页面的window对象
							api.close();
							/* var DG = frameElement.lhgDG;
							DG.cancel();  //关闭窗口 */
							//刷新右边变量属性table
						} else {
							alert(data.message);
						}
					}

				});
			});
		})
	</script>
</body>
</html>

