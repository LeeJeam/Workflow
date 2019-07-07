/**
 * 获取功能列表
 * @param id  表主键
 */

var dt=undefined;
var n=1;
function getfunctions(typeId,ctId,webname){
	n=1;
	$(".nav-stacked li").click(function (){
		$(".nav-stacked li").attr("class","");
		$(this).addClass("active");
	});

	$.ajax({
		type:"post",
		url:basePath+"/sysFunction/findByProjectId.htm",
		data:{"typeid":typeId,"projectId":projectId,ctId:ctId,webname:webname},
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

							{ data: 'web_name' },
							{ data: 'type' ,
								"mRender": function(data,type,full){
									var type= ((full.type == 1)? '表格' : full.type == 5 ? "流程表单": full.type == 2?'自定义表单': full.type == 3 ? "工作流": full.type == 4 ? "树形表格":"不明确");
									return type;
								}
							},
							{ data: 'table_alias'},
							{ data: 'create_date'},
							{ data: 'url',
								"mRender": function(data,type,full){
									return	full.url+full.file_name;
								}
							},
							{ data: 'deal',
								"mRender": function(data,type,full){
									return	'<td><button class="btn btn-primary btn-xs" onclick="preview('+full.id+',\''+full.type+'\')">预览</button>&nbsp;'
										+'<button class="btn btn-primary btn-xs" onclick="edit('+full.id+',\''+full.type+'\')">编辑</button>&nbsp;'
										+'<button class="btn btn-primary btn-xs" onclick="javascript:del('+"'"+full.id+"'"+',this)">删除</button>&nbsp;'
										+'</td>'
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


function edit(funtionId,type){
	var navId = $("#conternbodyLeft").find(".nav").find(".active").attr("ref");
	var url;
	if(type=="1" || type=='4'){ //表格
		url = basePath+"/createDataTable/toEdit.htm?pid="+funtionId;
	}else{ //表单
		url = basePath+"/form/submenu-shop-custom.htm?t="+funtionId
	}
	if(!!navId) {
		url += "&navId="+navId;
	}
	window.location.href= url;
}

function del(funtionId,element){
	if (confirm("确认要删除？")) {
		$.ajax({
			type:"post",
			url:basePath+"/sysFunction/delete.htm",
			data:{"id":funtionId},
			dataType:"json",
			success:function(data){
				if(data.status){
					$(element).parents("tr").remove();
					//alert("删除成功");
					var id = $("#box-body").find('li[class="active"]').attr('ref');
					var typeId = $("#pageType option:selected").val();
					getfunctions(typeId,id);
				}else{
					alert(data.message);
				}
			}
		});
	}
	
}
function preview(pid,type){
	if(type=="1" || type=='4'){
		window.location.href=basePath+"/createDataTable/preview.htm?pid="+pid+"&isPreivew=true";
	}else{
		window.location.href=basePath+"/form/selectone.htm?t="+pid;
	}
}
function getPageType(){//左边页面类型
	$.ajax({
		type:"post",
		url:basePath+"/sysFunction/getPageType.htm",
		dataType:"json",
		success:function(data){
			var html="<ul class='nav nav-pills nav-stacked'>"
						+'<li onclick="getfunctions()"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;全部类型</a></li>';
			if(data!=null&&data.length>0){
				var length=data.length;
				for(var n=0;n<length;n++){
					html+='<li onclick="getfunctions('+"'"+data[n].type+"'"+')"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;'
	                    + ((data[n].type == 1)? '表格' : data[n].type == 5 ? "流程表单": data[n].type == 2?'自定义表单': data[n].type == 3 ? "工作流": data[n].type == 4 ? "树形表格":"不明确")
	                    + '</a></li>'
				}
				html+='</ul>';
			}
			$("#box-body").html(html);
			$(".nav-stacked li:eq(0)").addClass("active");
			$(".nav-stacked li").click(function (){
				$(".nav-stacked li").attr("class","");
				$(this).addClass("active");
			})
		}
	});	
}
$(function(){    
	getfunctions();
	//getPageType();
});