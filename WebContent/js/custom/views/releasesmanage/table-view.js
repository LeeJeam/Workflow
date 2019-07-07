var columns = [];
var relations = [];
var dtable,tableName;
$(function(){
	tableName = getTableName();
	relations = getDataJson();
	getFieldNameAndColumnName();
	if (typeof(isPreview) == 'undefined') {
		getData();
	}
	//增加
    var $add=$("#addEntity");
    if($add.length>0){
    	$add.bind("click",add);
    }
});

//获取需要查询的关系数据
function getDataJson() {
	var relations = [];
	$('#worktable').find('th').each(function () {
		var tablename = $(this).attr('tablename');
		var columnname = $(this).attr('displayname');
		var displayname = $(this).attr('column-name');
		if(!!tablename && !!displayname && !!displayname) {
			var relation = {tablename:tablename,columnname:columnname,id:'id',relationColumns:displayname};
			relations.push(relation);
		}
	});
	return relations;
}
/**
 * 后台分页查询数据
 */
function getData() {
	var url = basePath + "/tableView/select.htm";
	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain) 
	{
		url += "?"+commVariable;
	}
	dtable = $('#worktable').DataTable({
		paging : true,
		lengthChange : false,
		searching : false,
		bSort : false,
		info : true,
		autoWidth : false,
		processing : true,
		serverSide : true,
		ajax : {
			url : url,
			type : "POST",
			dataSrc : "data",
			data : function(d) {
				var param = {};
				param.offset = d.start;//开始记录数
				param.limit = 10;//分页数
				param.tableName = tableName;//表名
				param.relations = JSON.stringify(relations);//关联关系
				param.spaces = JSON.stringify(getSpaces());//
				var var0 = getJsonWheres();
				if(!jQuery.isEmptyObject(var0)) {
					param.wheres = JSON.stringify(var0);
				}
				return $("#searchForm").serializeObject(param);
			}
		},
		columns : columns,
		fnDrawCallback: function(oSettings) {

			$("#worktable").find('.btn-primary[formpage]').each(function() {
				if(tableinit.isPageForm) {
					tableinit.loadPageFrom(this,$(this).attr('formpage'),$(this).attr('dataid'));
				} else {
					$(this).removeAttr('onclick');
					tableinit.initPopBtnset(this,$(this).attr('dataid'));
				}

			});

			tableinit.setTableSelected();
		}
	});
}

function getJsonWheres(){
	var wheres = [];
	$('#searchForm').find('input[where]').each(function () {
		var where = $(this).attr('where');
		var id    = $(this).attr('id');
		var length = $('#searchForm').find("input[id='"+id+"']").length;
		if(length < 2) {
			if(!!where) {
				var var1 = {};
				var name  = $(this).attr('name');
				var1.name  = name;
				var1.where = where;
				wheres.push(var1);
			}
		}
	});
	return wheres;
}
/**
 * 获取表名
 * @returns
 */
function getTableName() {
	return $("#worktable").attr("data-tableName");
}

/**
 * 获取页面表头名字与数据库列名
 */
function getFieldNameAndColumnName() {
	var $tr = $("#worktable>thead tr");
	var $th=$tr.find("th");
	
	$th.each(function(i, n) {
		var $this = $(n);
		if($this.attr("column-name")!=undefined){
			columns.push({
				"data" : $this.attr("column-name"),
				"title" : $this.text()
			});
		}
		
	});
	var btns = $("#worktable").attr('btns');
	if(!!btns && btns != 'undefined') {
		$("#worktable>thead tr").append('<th id="id" width="15%" class="ui-draggable sorting_disabled" ref="none" style="position: relative;" rowspan="1" colspan="1">操作</th>');
		columns.push({"data":"id", "title":"操作","mRender": function(data,type,full){
				var var0 = [];

			//var formpage = '';
			//if(tableinit.isPageForm) {
				var formpage = 'formpage = "'+$("#tableAddBtn").attr("formpage")+'"';
			//}
			if(btns.indexOf('edit') > -1) {
				var0.push('<button id="data_edit" class="btn btn-primary btn-sm" '+formpage+'  data-toggle="modal" data-target="#previewModal" dataid="'+data+'" onclick="initparam('+data+')">编辑</button> ');
			}
			if(btns.indexOf('delete') > -1) {
				var0.push('<button id="data_del" class="btn btn-default btn-sm" onclick="del('+data+')">删除</button> ');
			}
			if(btns.indexOf('isView') > -1) {
				var0.push("<button id='data_isView' class='btn btn-primary btn-sm' "+formpage+" data-toggle='modal' data-target='#previewModal'  dataid='"+data+"' onclick=\"initparam("+data+",\'\',\'true\')\">详情</button> ");
			}
			return var0.join('');

			}
		});
	}

	columns.push({"data":"id",title:'序列','mRender': function (data,type,full) {
		return  "<input type='hidden' id='id' name='id' value='"+data+"'/>";
	}})
}

/**
 * 搜素表单查询
 */
function search() {
	dtable.draw();
}

function getSpaces () {
	var spaces = [];
	$('#searchForm').find('.form-group[data-control-type="space_datetime"]').each(function () {
		var json = {};
		var firstVal  = $(this).find('input:eq(0)').val();
		var secodeVal = $(this).find('input:eq(1)').val();

		var first  =  $(this).find('input:eq(0)').attr('data-role');
		var secode =  $(this).find('input:eq(1)').attr('data-role');
		if(!!firstVal)  {
			json[first]  = firstVal;

		}
		if (!!secodeVal) {
			json[secode] = secodeVal;

		}
		if(!!firstVal || !!secodeVal) {
			json.fieldName = $(this).find('input:eq(0)').attr("name");
			json.fieldType = $(this).attr('data-control-type');
		}


		if(!jQuery.isEmptyObject(json)) {
			spaces.push(json);
		}
	});

	$('#searchForm').find('.form-group[data-control-type!="space_datetime"]').each(function () {
		var id = $(this).find("input").attr('id');
		var formgroup = $('#searchForm').find("input[id='"+id+"']");
		var length = formgroup.length;
		if(length >= 2 && formgroup.index($(this).find("input")) == 0) {
			var json = {};
			var first  = $('#searchForm').find("input[id='"+id+"']:eq(0)").val();
			var secode = $('#searchForm').find("input[id='"+id+"']:eq(1)").val();

			if(!!first) {
				json.start = first;
			}
			if (!!secode) {
				json.end = secode;
			}

			if(!!first || !!secode) {
				json.fieldName = id;
				json.fieldType = $(this).attr('data-control-type');
			}

			if(!jQuery.isEmptyObject(json)) {
				spaces.push(json);
			}
		}
	});
	return spaces;
}

function reset(){
	$('#searchForm').resetForm();
}

/**
 * 删除
 * @param id
 */
function del(id){
	if(confirm("您确定删除吗?")) {
		var tableType = $("#worktable").attr('tableType');
		if(tableType == '5') {
			tableinit.deleteViewData(id);
		} else {
			var tableName="";
			if($("#example-advanced").length>0){
				tableName=$("#add").find("#table-name").val();
			}else{
				tableName=$("#worktable").attr("data-tablename");
			}
			$.ajax({
				type:"post",
				url:basePath+"/button/delete.htm",
				data:{"id":id,"tableName":tableName},
				dataType:"json",
				success:function(data){
					if(data.status){
						dtable.draw();
						alert("删除成功");
					}else{
						alert(data.message);
					}
				}
			});
		}
	}
}
/**
 * 新增
 */
function add(){
	window.location.href=basePath+"/pageToPage/index.htm?pagename="+$("#iptFormPageName").val()+"&pagePYName="+$("#iptPageName").val();
}
/**
 * 编辑
 * @param id
 */
function edit(id){
	window.location.href=basePath+"/pageToPage/index.htm?pagename="+$("#iptFormPageName").val()+"&ti="+id+"&pagePYName="+$("#iptPageName").val();
}