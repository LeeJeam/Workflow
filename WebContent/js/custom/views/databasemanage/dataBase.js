/**
 * 创建行
 */
function CreateTB(){
	var $table=$("#create-table");
	var count=$table.find("tr").length;
	$table.append('<tr><td><span class="count">'+(count++)+'</span></td><td><div style="display: none;"></div><center><input type="text" name="alias" onblur="autoSaveFieldInfo(this)" onkeyup="setPingYing(this)" class="form-control" style="display: block; text-align: center;"></center></td><td><div style="display: none;"></div><center><input readonly="readonly" type="text" name="filedName"  class="form-control" style="display: block; text-align: center;"></center></td><td><div style="display: none;"></div><center><select name="filedType" class="select form-control" style="display: block;"><option value="字符串">字符串</option><option value="时间">时间</option><option value="数字">数字</option></select></center></td><td><div style="display: none;"></div><center><input type="text" onblur="autoSaveFieldInfo(this)" name="filedSize" class="form-control" style="display: block; text-align: center;" value="50"></center></td><td><a href="javascript: void(0);" class="enter" onclick="edit(this,\'hide\')">确认 </a>&nbsp;&nbsp; <a href="javascript: void(0);" onclick="del(this);">删除</a></td></tr>');
	$($table).find('tbody tr:last').find("input[name='alias']")[0].focus();
	var e = document.getElementById('create-table-filedset');
	e.scrollTop=e.scrollHeight;
}
function setPingYing(entity){
	 $.post(basePath+"/structureTable/setPingYing.htm", {zn:$(entity).val()}, function(data){
		 $(entity).parent().parent().next().find("input").val(data);
	 },"json");
}
function autoSaveFieldInfo(e){
	var tr=$(e).parent().parent().parent();
	var aliasvalue=tr.find("input[name=alias]").val();
	var filedSize=tr.find("input[name=filedSize]").val();
	if(aliasvalue!=""&&/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+|[\u4e00-\u9fa5a-zA-Z0-9]+)$/.test(aliasvalue)&&filedSize!=""&&/^\+?[1-9]\d*$/.test(filedSize)&&filedSize<=1000){
		tr.find(".enter").click();
	}
	
}
/**
 * 确认与修改切换
 * @param element    节点
 * @param innerHTML  确认与修改
 */
function edit(element, innerHTML) {
	var $this=$(element);
	var $tr=$this.parents("tr");
	var $td1=$tr.find("td:eq(1)");
	var $td2=$tr.find("td:eq(2)");
	var $td3=$tr.find("td:eq(3)");
	var $td4=$tr.find("td:eq(4)");
	if (innerHTML == "show") {
		$this.text("确认");
		$this.attr("onclick", "edit(this,'hide')");
		$td1.find("div").hide();
		$td1.find("input").show();
		$td2.find("div").hide();
		$td2.find("input").show();
		$td3.find("div").hide();
		$td3.find("select").show();
		$td4.find("div").hide();
		$td4.find("input").show();
	} else if (innerHTML == "hide") {
		var aliasTD=$this.parent().prev().prev().prev();
		var aliasValue=aliasTD.find("input[name=filedName]").val();
		var flag=0;
		aliasTD.parent().siblings().find("input[name=filedName]").each(function(){
			if(aliasValue==$(this).val()){
				flag++;
			}
		});
		if(flag>0){
			alert("列名重复，请重新输入");
			return false;
		}
		if(aliasValue=="id"){
			alert("id列名会默认生成，不能再次填入");
			return false;
		}
		if($td1.find("input").val()==""||$td2.find("input").val()==""||$td4.find("input").val()==""||!/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+|[\u4e00-\u9fa5a-zA-Z0-9]+)$/.test($td4.find("input").val())){
			alert("字段名、列名、长度都不能为空,且不能输入特殊字符和空格");
			return false;
		}
		if(!/^\+?[1-9]\d*$/.test($td4.find("input").val())||$td4.find("input").val()>1000){
			alert("长度只能输入大于0小于等于1000的整数");
			return false;
		}
		$this.text("修改");
		$this.attr("onclick", "edit(this,'show')");
		var $d=$td1.find("div");
		var $i=$td1.find("input");
		$d.text($i.val()).show();
		$i.hide();
		var $div=$td2.find("div");
		var $input=$td2.find("input");
		$div.text($input.val()).show();
		$input.hide();
		var $div3=$td3.find("div");
		var $select=$td3.find("select");
		$div3.text($select.find("option:selected").text()).show();
		$select.hide();
		$div=$td4.find("div");
		$input=$td4.find("input");
		$div.text($input.val()).show();
		$input.hide();
	}
}

/**
 * 删除
 * @param element
 */
function del(element){
	$(element).parents("tr").remove();
}

/**
 * 发布提交
 */
function submitTables(){
	var $tr=$("#create-table").find("tbody").find("tr");
	var f=0;
	$tr.each(function(){
		if($.trim($(this).find("a:first").text())=="确认"){
			
			f++;
		}
	});
	if(f>0){
		alert("有还未确认的数据，请先确认");
		return false;
	}
	var length=$tr.length;
	if(length>0){
		var i=0;
		var jsonparam=[];
		var tableName=$("#tb-name").val();
		if(tableName==""){
			alert("请填写表名");
			return;
		}
		if(!/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+|[\u4e00-\u9fa5a-zA-Z0-9]+)$/.test(tableName)){
			alert("表名不能输入特殊字符和空格");
			return;
		}
		for(i;i<length;i++){
			var $this=$tr.eq(i);
			var alias=$this.find("td:eq(1) input").val();
			if(alias==""){
				alert("请确认填写字段名称");
				return;
			}
			var filedName=$this.find("td:eq(2) input").val();
			if(filedName==""){
				alert("请确认填写列名");
				return;
			}
			var filedType=$this.find("td:eq(3) select").val();
			var filedSize=$this.find("td:eq(4) input").val();
			if(filedSize==""){
				alert("请确认填写字长");
				return;
			}else{
				if(isNaN(filedSize)){
					alert("请确认填写数字");
					return;
				}
				filedSize=parseInt(filedSize);
			}
			jsonparam.push({"filedName":filedName,"columnAlias":alias,"columnType":filedType,"columnSize":filedSize,"isDefault":$this.find("td:eq(5)").attr("data-default")});
		}
		
		createAJAX(tableName,jsonparam);
	}else{
		alert("无法创建空表");
	}
}

/**
 * 创建表
 * @param tableName  表名
 * @param jsonparam  列属性JSON集合
 */
function createAJAX(tableName,jsonparam){
	$.ajax({
		type:"post",
		url:basePath+"/structureTable/insertStructureTableList.htm",
		data:{"tableName":tableName,"tid":$("#tb-id").val(),updateTableName:$("#updateTableName").val(),"projectId":projectId,"columns":JSON.stringify(jsonparam)},
		dataType:"json",
		success:function(data){
			if(data.status){
				alert("创建表成功");
				if($("#page_commSetTableName").length==0){
					//window.location.href=basePath+"/header/forward.htm?flag=dataBase";
					$("#baseDemo").find(".close").click();
					var typeId = $("#pageType option:selected").val();
					var ctId = $("#box-body").find('li[class="active"]').attr('ref');
					getfunctions(typeId,ctId);
				}
				
			}else{
				alert(data.message);
			}
		}
	});
}
/**
 * 获取功能列表
 * @param id  表主键
 */

var dt=undefined;
var n=1;
function getfunctions(typeId,ctId,tablename){
	n=1;
	$(".nav-stacked li").click(function (){
		$(".nav-stacked li").attr("class","");
		$(this).addClass("active");
	});
	$.ajax({
		type:"post",
		url:basePath+"/structureTable/findTableByProjectIdAndType.htm",
		data:{"type":typeId,"projectId":projectId,ctId:ctId,tablename:tablename},
		dataType: 'json',
		success:function(data){
			if(null==data){
				if(dt!=undefined){
					dt.fnClearTable();
				}
			}else{
				if(dt==undefined){
						dt=$('#dataBaseTable').dataTable({
						    data: data,
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
						        { data: 'table_alias' },
						        { data: 'table_name' },
						        { data: 'table_create_time'},
						        { data: 'tableType',"mRender":function(data,type,full){
						        	if(1==data){
										return "普通表";
									}else if(2==data){
										return "树形结构表";
									}else if(3==data){
										return "字典表";
									}else if(4==data){
										return "级联表";
									} else if(5==data) {
										return "多关联表";
									} else if(6 == data) {
										return "控件组表";
									}else{
										return "";
									}
						        }},
						        { data: 'remarks'},
						        { data: 'id',"mRender": function(data,type,full){
										 var dataType = full.tableType;
						        	     if(full.is_default!=1){
								        	 return	'<div class="action-button"><button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#baseDemo" onclick="loadTable(\''+data+'\',\''+full.table_alias+'\',\''+full.table_name+'\',\''+dataType+'\')">编辑</button>&nbsp;<button class="btn btn-primary btn-xs"  onclick="delBaseTable(\''+data+'\')">删除</button></div>';
						        	     }else{
						        	    	 return	'<div class="action-button"><button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#baseDemo" onclick="loadTable(\''+data+'\',\''+full.table_alias+'\',\''+full.table_name+'\')">编辑</button>';
						        	     }
									}
						        }
						    ]
						} );
					}else{
						dt.fnClearTable();
						if(data.length>0){
							dt.fnAddData(data, true); 
						}
					}
			}
			
		}
	});
	
}

/**
 * 加载表属性
 * @param tableName    表名
 * @param projectId  项目名
 */
function loadTable(id,tableAlias,tableName,dataType){
	$("#tb-id").val(id);
	$("#tb-name").val(tableAlias);
	$("#updateTableName").val(tableName);
	if(!!dataType && dataType == 5) {
		$("#tcolumn").load(basePath+"/structureTable/findTableRelation.htm",{"tableName":tableName,"projectId":projectId});
	} else {
		$("#tcolumn").load(basePath+"/structureTable/findTableStructureByPnAndTn.htm",{"tableName":tableName,"projectId":projectId});
	}

}
function addDataBasefun(){
	 $.post(basePath+"/structureTable/addDataBasefunjsp.htm", null, function(data){
		 $("#baseAdd").html(data);
	 },"");
}
function delBaseTable(tid){
	 if(confirm('您确定删除吗?')) {
		 $.post(basePath+"/structureTable/deleteTableDataBase.htm", {tid:tid}, function(data){
			 if(data.status){

				 //alert(data.message);
				 //window.location.href=basePath+"/header/forward.htm?flag=dataBase";
				 var typeId = $("#pageType option:selected").val();
				 var ctId = $("#box-body").find('li[class="active"]').attr('ref');
				 getfunctions(typeId,ctId);
			 }else{
				 alert(data.message);
			 }
		 },"json");
	 }
}
$(function(){
	setHeight(new Array('conternbodyRight'),(51 + 0 + 94 + 15 + 15));
	setHeight(new Array('box-body'),(51 + 5 + 46 + 15 + 15 + 45));
	if($("#page_commSetTableName").length==0){
		getfunctions(0);
	}
	
});

/**
 * 发布提交
 */
function submitTables2(id){
	var $tr=$("#create-table>tbody tr");
	var f=0;
	$tr.each(function(){
		if($.trim($(this).find("a:first").text())=="确认"){
			
			f++;
		}
	});
	if(f>0){
		alert("有还未确认的数据，请先确认");
		return false;
	}
	var length=$tr.length;
	if(length>0){
		var i=0;
		var jsonparam=[];
		var tableName=$("#tb-name").val();
		if(tableName==""){
			alert("请填写表名");
			return;
		}
		for(i;i<length;i++){
			var $this=$tr.eq(i);
			var alias=$this.find("td:eq(1) input").val();
			if(alias==""){
				alert("请确认填写字段名称");
				return;
			}
			var filedName=$this.find("td:eq(2) input").val();
			if(filedName==""){
				alert("请确认填写列名");
				return;
			}
			var filedType=$this.find("td:eq(3) select").val();
			var filedSize=$this.find("td:eq(4) input").val();
			if(filedSize==""){
				alert("请确认填写字长");
				return;
			}else{
				if(isNaN(filedSize)){
					alert("请确认填写数字");
					return;
				}
				filedSize=parseInt(filedSize);
			}
			jsonparam.push({"filedName":filedName,"columnAlias":alias,"columnType":filedType,"columnSize":filedSize,"isDefault":$this.find("td:eq(5)").attr("data-default")});
		}
		saveForm2(id);
		createAJAX(tableName,jsonparam);
	}else{
		alert("无法创建空表");
	}
}
function reFun(){
	isCreateTableFlag=0;
	$("#page_commHasTable").show();
	$("#create-table").find("tbody").empty();
	$("#alertTable").hide();
	$.ajax({
		type:"post",
		url:basePath+"/structureTable/findUniqueTable.htm",
		data:{projectId:projectId,tablname:$("#tb-name").val()},
		dataType:"json",
		success:function(data){
		$("#tb-name,#page_commSetTableName").val("");
			if(data!=null&&data.length>0){
				var id=data[0].id;
				$.ajax({
					type:"post",
					url:basePath+"/structureTable/deleteTableDataBase.htm",
					data:{tid:id},
					dataType:"json",
					success:function(data){
						
					}
				});
			}
		}
	});
}