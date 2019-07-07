function create(){
	var projectName=$("#project-name").val();
	var modulesId="";
	$("input[type=checkbox]:checked").each(function(){ 
		modulesId+= $(this).attr('value')+",";
	 });
	if(projectName==""){
		alert("项目名不能为空");
		return;
	}
	if(/^\d+$/.test(projectName)){
		alert("项目名不能输入纯数字");
		return;
	}
	if(!/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+|[\u4e00-\u9fa5a-zA-Z0-9]+)$/.test(projectName)){
		alert("项目名不能输入特殊字符和空格");
		return;
	}
	save(projectName,modulesId)
}

function save(projectName,modulesId){
	$.ajax({
		type:"post",
		url:basePath+"/project/add.htm",
		data:{"projectName":projectName,"modulesId":modulesId},
		dataType:"json",
		success:function(data){
			if(data.status){
				alert("创建成功");
				setSisson(projectName)
				window.location.href=basePath+"/header/forward.htm?flag=menu"
			}else{
				alert(data.message);
			}
		}
	});
}

 /**
 * 项目列表
 */
 function projectList(){
	$.ajax({
		type:"post",
		url:basePath+"/project/select.htm",
		dataType:"json",
		success:function(data){
			if(data!=null){
				var length=data.length;
				if(length>0){
					var html='<ul class="nav nav-pills nav-stacked" style="height: 410px; overflow-y: auto;">';
					var i=0;
					for(i;i<length;i++){
						html+='<li style="cursor: pointer;"><a onclick="setSisson(\''+data[i].project_name+'\')"><i class="fa fa-folder-open"></i>'+data[i].project_name+'</a></li>';
					}
					html+='</ul>'
					
					$("#proejct-box").html(html);
				}
			}
		}
	});
}

var dt=undefined;
function loadProject(){
	$.ajax({
		type:"post",
		url:basePath+"/project/selectAll.htm",
		dataType:"json",
		success:function(data){
			if(data!=''){
				if(dt==undefined){
					dt=$('#projectTable').dataTable({
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
						    { data: 'id' },
					        { data: 'project_name'},
					        { data: '操作',"mRender": function(data,type,full){
								    return '<button class="btn btn-primary btn-xs" onclick="editRow(this,'+full.id+',\''+full.project_name+'\')">编辑</button>&nbsp;'
									    +'<button class="btn btn-primary btn-xs" onclick="del(this,'+full.id+')">删除</button></td></tr>'
								}
					          }
					        ]
					} );
				}else{
					dt.fnClearTable();
					dt.fnAddData(data, true); 
				}
				}else{
					dt.fnClearTable();
				}
		}
	});
}
/**
 * 确认与修改切换
 * @param element    节点
 * @param innerHTML  确认与修改
 */
function editRow(element,id,projectName){
	  var $this=$(element);
	  var $parent=$this.parents("tr");
	  var aData = dt.fnGetData($parent);
	  var $td = $parent.find("td");
	  $td.eq(1).html('<div style="display: none;"></div><input type="text" name="projectName" id="projectName" class="form-control" style="width:200px;" value="'+aData.project_name+'">');
	  $td.eq(2).html('<button class="btn btn-primary btn-xs" onclick="saveEelent(this,'+id+',\''+projectName+'\')">保存</button>&nbsp;<button class="btn btn-primary btn-xs" onclick="del(this,'+id+')">删除</button>');
}
function del(element,id){
	 $.post(basePath+"/project/delete.htm", {id:id}, function(data){
		if(data.status){
			 $(element).parents("tr").remove();
		 }else{
			 alert(data.message);
		 }
	 },"json");
}
/**
 * 保存数据
 * @param element   
 * @param index
 */
function saveEelent(element,id,projectName){
	 var $this=$(element);
	  var $parent=$this.parents("tr");
	  var aData = dt.fnGetData($parent);
	  var $td = $parent.find("td");
	  var projectName=$td.eq(1).find("input").val();
	  if(""==projectName){
		  alert("项目名称不能为空");
		  return;
	  }
	  $.post(basePath+'/project/updateProject.htm',{
		  "id" : id,
		  "projectName" : projectName,
		  }, function(data) {
			if(data.status){
				//重新加载表单
				var td1=$parent.find("td:eq(1)").find("input");
				var div=$parent.find("td:eq(1)").find("div");
				div.text(td1.val()).show();
				td1.hide();
				$td.eq(2).html('<button class="btn btn-primary btn-xs" onclick="editRow(this,'+id+',\''+projectName+'\')">编辑</button>&nbsp;&nbsp;<button class="btn btn-primary btn-xs" onclick="del(this,'+id+')">删除</button></td></tr>');	
			}else{
				alert(data.message);
			}
		}, "json");
}
function submitTables(){
	var $tr=$("#projectTable>tbody tr");
	var length=$tr.length;
	if(length>0){
		var i=0;
		for(i;i<length;i++){
			var $this=$tr.eq(i);
			var filedName=$this.find("td:eq(1) input").val();
			if(filedName==""){
				alert("请填写项目名称");
				return;
			}
		}
		loadProject();
	}
	alert("保存成功");
}

function setSisson(projectName){
	$.ajax({
		type:"post",
		url:basePath+"/project/setSisson.htm",
		data:{"projectName":projectName},
		dataType:"json",
		success:function(data){
			if(data.status){
				window.location.href=basePath+"/header/forward.htm?flag=menu"
			}else{
				alert(data.message);
			}
		}
	});
}
function moduleList(){
	$.ajax({
		type:"post",
		url:basePath+"/project/selectModule.htm",
		dataType:"json",
		success:function(data){
			if(data!=null){
				var length=data.length;
				if(length>0){
					var html="";
					var i=0;					
					for(i;i<length;i++){
						var moduleName=data[i].module_name;
						if(i==0){
						   html+='<label style="margin-left: 30px;"><input class="item1input" type="checkbox" id="modules" checked="checkd" name="moduleProject" value="'+data[i].id+'">'+data[i].module_name+'';
						}else{
						   html+='<label style="margin-left: 30px;"><input class="item1input" type="checkbox" id="modules" name="moduleProject" value="'+data[i].id+'">'+data[i].module_name+'';
						   html+='</label>'	
						}
					}
					$("#modules").html(html);
				}
			}
		}
	});
}
$(function(){
	projectList();
	moduleList();
});