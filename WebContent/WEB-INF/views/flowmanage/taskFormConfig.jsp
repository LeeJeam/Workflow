<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<script type="text/javascript">
<!--
	var formFieldsEditCount = 0;
	var formId = '${id}';
	$(function() {
		_task_form_fields_dg = $('#task-forms-fields-list').datagrid(
				{
					//title:"Listener",
					//url:'${ctx}/wf/procdef/procdef!search.action',//
					singleSelect : true,
					width : 700,
					height : 300,
					iconCls : 'icon-edit',
					//fit:true,
					//idField:'id',
					//pagination:true,
					//pageSize:15,
					//pageNumber:1,
					//pageList:[10,15],
					rownumbers : true,
					//sortName:'id',
					//sortOrder:'asc',
					striped : true,
					toolbar : [ {
						text : 'New',
						iconCls : 'icon-add',
						handler : function() {
							if (formFieldsEditCount > 0) {
								$.messager.alert("error", "有可编辑的单元格，不能添加",
										'error');
								return;
							}
							$('#task-forms-fields-list').datagrid('appendRow',
									{
										id : '',
										fieldName : '',
										type : '',
										value : '',
										exp : '',
										remark : '',
										action : ''
									});
							var index = $('#task-forms-fields-list').datagrid(
									'getRows').length - 1;
							$('#task-forms-fields-list').datagrid('beginEdit',
									index);
						}
					} ],

					onDblClickRow : function(rowIndex, rowData) {
						editFormField(rowIndex);
					},

					onBeforeEdit : function(index, row) {
						row.editing = true;
						$(this).datagrid('refreshRow', index);

						formFieldsEditCount++;
					},
					onAfterEdit : function(index, row) {
						row.editing = false;
						$(this).datagrid('refreshRow', index);
						formFieldsEditCount--;
					},
					onCancelEdit : function(index, row) {
						row.editing = false;
						$(this).datagrid('refreshRow', index);
						formFieldsEditCount--;
					}
				});
		$('#fieldSaveBt').linkbutton({
			iconCls : "icon-save"
		});
		$('#fieldCancelBt').linkbutton({
			iconCls : "icon-cancel"
		});
		populateFormProperties();
	});

	function formFieldsActionFormatter(value, rowData, rowIndex) {
		var id = rowIndex;
		var s = '<img onclick="saveFormField(' + id
				+ ')" src="plug-in/designer/img/ok.png" title="' + "确定"
				+ '" style="cursor:hand;"/>';
		var c = '<img onclick="cancelFormField(' + id
				+ ')" src="plug-in/designer/img/cancel.png" title="' + "取消"
				+ '" style="cursor:hand;"/>';
		var e = '<img onclick="editFormField(' + id
				+ ')" src="plug-in/designer/img/modify.png" title="' + "修改"
				+ '" style="cursor:hand;"/>';
		var d = '<img onclick="deleteFormField(' + id
				+ ')" src="plug-in/designer/img/delete.gif" title="' + "删除"
				+ '" style="cursor:hand;"/>';

		if (rowData.editing)
			return s;
		else
			return e + '&nbsp;' + d;
	}
	function cancelFormField(id) {
		_task_form_fields_dg.datagrid('cancelEdit', id);
	}
	function editFormField(id) {
		_task_form_fields_dg.datagrid('beginEdit', id);
	}
	function saveFormField(id) {
		//alert(id);
		_task_form_fields_dg.datagrid('endEdit', id);
		//alert(editcount);
	}
	function deleteFormField(id) {
		_task_form_fields_dg.datagrid('deleteRow', id);
		refreshAllFormFields();
	}
	function refreshAllFormFields() {
		var rs = _task_form_fields_dg.datagrid('getRows');
		for (var i = 0; i < rs.length; i++) {
			var ri = _task_form_fields_dg.datagrid('getRowIndex', rs[i]);
			_task_form_fields_dg.datagrid('refreshRow', ri);
		}
	}
	function createNewForm() {
		var newForm = new draw2d.Task.Form();
		return newForm;
	}
	function getExsitingForm() {
		if (formId != "" && formId != null && formId != "null"
				&& formId != "NULL") {
			var form = task.getForm(formId);
			return form;
		}
	}
	function getFormFieldsGridChangeRows() {
		if (formFieldsEditCount > 0) {

			$.messager.alert("error", "", 'error');
			return null;
		}
		var insertRows = _task_form_fields_dg
				.datagrid('getChanges', 'inserted');
		var updateRows = _task_form_fields_dg.datagrid('getChanges', 'updated');
		var deleteRows = _task_form_fields_dg.datagrid('getChanges', 'deleted');
		var changesRows = {
			inserted : [],
			updated : [],
			deleted : []
		};
		if (insertRows.length > 0) {
			for (var i = 0; i < insertRows.length; i++) {
				changesRows.inserted.push(insertRows[i]);
			}
		}

		if (updateRows.length > 0) {
			for (var k = 0; k < updateRows.length; k++) {
				changesRows.updated.push(updateRows[k]);
			}
		}

		if (deleteRows.length > 0) {
			for (var j = 0; j < deleteRows.length; j++) {
				changesRows.deleted.push(deleteRows[j]);
			}
		}
		return changesRows;
	}
	function saveFormConfig() {
		if (formId != "" && formId != null && formId != "null"
				&& formId != "NULL") {

			var form = getExsitingForm();
			var r = updateExistingForm(form);
			if (!r)
				return;
		} else {
			var r = insertNewForm();
			if (!r)
				return;
		}
		_form_win.window('close');
	}
	function insertNewForm() {
		var changesRows = getFormFieldsGridChangeRows();
		if (changesRows == null)
			return false;
		var insertRows = changesRows['inserted'];
		if (insertRows.length > 0) {
			for (var i = 0; i < insertRows.length; i++) {
				var form = createNewForm();
				form.name = insertRows[i].fieldName;
				form.value = insertRows[i].value;
				form.type = insertRows[i].type;
				form.exp = insertRows[i].exp;
				form.remark = insertRows[i].remark;
				task.forms.add(form);
			}
		}

		loadTaskForms();
		return true;
	}
	function updateExistingForm(form) {

		var changesRows = getFormFieldsGridChangeRows();
		if (changesRows == null)
			return false;
		var insertRows = changesRows['inserted'];
		var updateRows = changesRows['updated'];
		var deleteRows = changesRows['deleted'];

		if (insertRows.length > 0) {
			for (var i = 0; i < insertRows.length; i++) {
				var formin = createNewForm();
				formin.name = insertRows[i].fieldName;
				formin.value = insertRows[i].value;
				formin.type = insertRows[i].type;
				form.exp = insertRows[i].exp;
				form.remark = insertRows[i].remark;
				task.forms.add(formin);
			}
		}

		if (updateRows.length > 0) {
			for (var k = 0; k < updateRows.length; k++) {
				form.name = updateRows[k].fieldName;
				form.value = updateRows[k].value;
				form.type = updateRows[k].type;
				form.exp = updateRows[k].exp;
				form.remark = updateRows[k].remark;
			}
		}

		if (deleteRows.length > 0) {
			task.deleteForm(form.id);
		}
		loadTaskForms();
		return true;
	}

	function populateFormProperties() {
		if (formId != "" && formId != null && formId != "null"
				&& formId != "NULL") {
			var form = task.getForm(formId);
			var _form_fields_grid_data = [];
			if (form != null) {

				var field = {
					id : form.id,
					fieldName : form.name,
					type : form.type,
					value : form.value,
					exp : form.exp,
					remark : form.remark,
					action : ''
				};
				_form_fields_grid_data[0] = field;
			}
			_task_form_fields_dg.datagrid('loadData', _form_fields_grid_data);
		}
	}
	function closeTaskFormWin() {
		_form_win.window('close');
	}
//-->
</script>
<table>
	<tr>
		<td>
			<table id="task-forms-fields-list">
				<thead>
					<tr>
						<th field="id" hidden="false"></th>
						<th field="fieldName" width="100" align="middle" sortable="false" editor="{type:'validatebox',options:{required:true,validType:'length[1,100]'}}">名称</th>
						<th field="type" width="100" align="middle" sortable="false" editor="{type:'combobox',options:{editable:false,data:[{id:'string',text:'String',selected:true},{id:'long',text:'Long'},{id:'boolean',text:'boolean'},{id:'date',text:'Date'},{id:'enum',text:'enum'}],valueField:'id',textField:'text'}}">类型</th>
						<th field="value" width="100" align="middle" sortable="false" editor="{type:'validatebox',options:{validType:'length[1,100]'}}">值</th>
						<th field="exp" width="100" align="middle" sortable="false" editor="{type:'validatebox',options:{validType:'length[1,100]'}}">表达式</th>
						<th field="remark" width="100" align="middle" sortable="false" editor="{type:'validatebox',options:{validType:'length[1,100]'}}">描述</th>
						<th field="action" width="80" align="middle" formatter="formFieldsActionFormatter">操作</th>
					</tr>
				</thead>
			</table>
		</td>
	</tr>
	<tr>
		<td align="center">
		<a href="##" id="fieldSaveBt" onclick="saveFormConfig()">Save</a> 
		<a href="##" id="fieldCancelBt" onclick="closeTaskFormWin()">Cancel</a>
		</td>
	</tr>
</table>
