<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<% 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<c:set var="webRoot" value="<%=basePath%>" />

<t:base type="jquery,easyui,tools"></t:base>

<script type="text/javascript">
</script>
<table>
	<tr>
		<td>
			<table id="task-variables-fields-list">
				<thead>
					<tr>
						<th field="processproid" hidden="false"></th>
						<th field="processprokey" width="100" align="middle" sortable="false" editor="{type:'validatebox',options:{required:true,validType:'length[1,100]'}}">名称</th>
						<th field="processprotype" width="100" align="middle" sortable="false" editor="{type:'combobox',options:{editable:false,data:[{id:'S',text:'字符',selected:true},{id:'I',text:'整型'},{id:'B',text:'布尔型'},{id:'F',text:'单精度浮点数'},{id:'L',text:'长整型'},{id:'D',text:'日期'},{id:'SD',text:'sql Date类型'},{id:'N',text:'双精度浮点数'}],valueField:'id',textField:'text'}}">类型</th>
						<th field="processproval" width="100" align="middle" sortable="false" editor="{type:'validatebox',options:{validType:'length[1,100]'}}">值</th>
						<th field="processproexp" width="100" align="middle" sortable="false" editor="{type:'validatebox',options:{validType:'length[1,100]'}}">表达式</th>
						<th field="processproname" width="100" align="middle" sortable="false" editor="{type:'validatebox',options:{validType:'length[1,100]'}}">描述</th>
						<th field="processprodatatype" width="100" align="middle" sortable="false" editor="{type:'combobox',options:{editable:false,data:[{id:'database',text:'数据库'},{id:'page',text:'页面'}],valueField:'id',textField:'text'}}">来源</th>
						<th field="action" width="80" align="middle" formatter="variableFieldsActionFormatter">操作</th>
					</tr>
				</thead>
			</table>
		</td>
	</tr>
	<tr>
		<td align="center">
		<a href="##" id="fieldSaveBt" onclick="saveVariableConfig()">Save</a> 
		<a href="##" id="fieldCancelBt" onclick="closeTaskVariableWin()">Cancel</a>
		</td>
	</tr>
</table>
