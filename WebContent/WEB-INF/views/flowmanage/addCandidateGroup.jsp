<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript">
<!--
$(function() {
	_task_candidate_unselected_group_panel_obj = $('#_task_candidate_unselected_group_panel')
			.panel({
						// height:600,
						border : false,
						noheader : true,
						top : 0,
						left : 0
					});
	_task_candidate_unselected_group_grid = $('#_task_candidate_unselected_group_table')
			.datagrid({
						title : "用户组",
						url : '${ctx}/wf/procdef/procdef!searchCandidateGroup.action',
						// singleSelect:true,
						idField : 'groupId',
						height : 400,
						pagination : true,
						pageSize : 15,
						pageNumber : 1,
						pageList : [10, 15],
						rownumbers : true,
						sortName : 'name',
						sortOrder : 'asc',
						striped : true,
						onLoadSuccess : function(data) {
							var rows = data.rows;
							for (var i = 0; i < rows.length; i++) {
								if (task.getCandidateGroup(rows[i].name) != null) {
									$(this).datagrid('selectRow', i);
								}
							}
						},
						toolbar : [{
									text : "保存",
									iconCls : 'icon-save',
									handler : function() {
										addCandidateGroups();
									}
								}]
					});
});
function searchTaskCandidateUnselectedGroup() {
	var name = document.getElementById("filter_LIKES_name").value;
	_task_candidate_unselected_group_grid.datagrid('reload', {
				filter_LIKES_name : name
			});
}
function addCandidateGroups() {
	var rows = _task_candidate_unselected_group_grid.datagrid("getSelections");
	for (var i = 0; i < rows.length; i++) {
		var group = rows[i];
		task.addCandidateGroup(group.name);
	}
	loadTaskCandidateGroups();
	_task_candidate_win.window('close');
}
//-->
</script>
<div id="_task_candidate_unselected_group_panel" style="padding:5px;">
<div>
	<table border="0">
		<tr>
			<td>名称:</td>
			<td><input type="text" name="filter_LIKES_name" value="" size="9"/></td>
			<td><a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="searchTaskCandidateUnselectedGroup();">查询</a></td>
		</tr>
	</table>
</div>
<div>
<table id="_task_candidate_unselected_group_table">
	<thead>
		<tr>
			<th field="groupId" align="middle" checkbox="true"></th>
			<th field="name" width="100" align="middle" sortable="true">名称</th>
			<th field="remark" width="300" align="middle">备注</th>
		</tr>
	</thead>
</table>
</div>
</div>
