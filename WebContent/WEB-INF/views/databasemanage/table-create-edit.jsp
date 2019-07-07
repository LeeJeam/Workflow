<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
		<table class="table table-striped table-hover" id="create-table">
			<thead>
				<th width="5%">编号</th>
				<th>字段名称</th>
				<th>列名</th>
				<th>类型</th>
				<th>长度</th>
				<th width="12%">操作</th>
			</thead>
			<tbody>
			<c:forEach items="${data}" var="data" varStatus="status">
			    <tr>
					<td><span class="count">${status.index+1 }</span></td>
					<td>
					    <div style="display: block;">${data.column_alias }</div>
						<center>
							<input type="text" name="alias" class="form-control"  onkeyup="setPingYing(this)" style="display: none; text-align: center;" value="${data.column_alias }">
						</center>
					</td>
					<td>
					    <div style="display: block">${data.filed_name }</div>
						<center>
							<input type="text" name="filedName"  class="form-control" readonly="readonly" style="display: none; text-align: center;" value="${data.filed_name }">
						</center>
					</td>
					<td>
					    <div style="display: block;">${data.column_type }</div>
						<center>
							<select name="filedType" class="select form-control" style="display: none;">
							    <option value="字符串" <c:if test="${data.column_type=='字符串' }">selected="selected"</c:if>>字符串</option>
								<option value="时间" <c:if test="${data.column_type=='时间' }">selected="selected"</c:if>>时间</option>
								<option value="数字" <c:if test="${data.column_type=='数字' }">selected="selected"</c:if>>数字</option></select>
						</center>
					</td>
					<td>
					    <div style="display: block;">${data.column_size }</div>
						<center>
							<input type="text" name="filedSize" class="form-control" style="display: none; text-align: center;" value="${data.column_size }">
						</center>
					</td>
					<td data-default="${data.is_default }">
					    <c:if test="${data.is_default !=1 }">
					    <a href="javascript: void(0);" onclick="edit(this,'show')">修改 </a>&nbsp;&nbsp; 
					    <a href="javascript: void(0);" onclick="del(this);">删除</a>
					    </c:if>
					</td>
				</tr>
			</c:forEach>
			</tbody>
			<tfoot>
             	<tr>
             		<td colspan="6" class="text-center" onclick="CreateTB()"><a href="#">添加一项</a></td>
             	</tr>
             </tfoot>
		</table>

