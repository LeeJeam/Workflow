var paramJSON={};
var count=1;
var updateTableName="";
function CreateTB(){
	$("#create-table").append('<tr><td><span class="count">'+(count++)+'</span></td><td><div style="display: none;"></div><center><input type="text" name="filedName" class="form-control" style="display: block; text-align: center;"></center></td><td><div style="display: none;"></div><center><input type="text" name="alias" class="form-control" style="display: block; text-align: center;"></center></td><td><div style="display: none;"></div><center><select name="filedType" class="select form-control" style="display: block;"><option value="字符串">字符串</option><option value="时间">时间</option><option value="数字">数字</option></select></center></td><td><div style="display: none;"></div><center><input type="text" name="filedSize" class="form-control" style="display: block; text-align: center;"></center></td><td><a href="javascript: void(0);" onclick="edit(this,\'hide\')">确认 </a>&nbsp;&nbsp; <a href="javascript: void(0);" onclick="del(this);">删除</a></td></tr>');
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
 * 下一步
 * @param element
 */
function foreword(element){
	var $menu=$(element).parents(".menu");
	    dealFunction($menu.index(),$menu);
}

/**
 * 上一步
 * @param element
 */
function reback(element){
	var $menu=$(element).parents(".menu");
	    $menu.hide();
	    $menu.prev().show();
	var index=$menu.index();
	    $("#progressbar li:eq("+(index-1)+")").removeClass("active");
	    $("#progressbar li:eq("+(index-2)+")").addClass("active");
	    
}

/**
 * 步骤处理
 * @param index 第index步
 */
function dealFunction(index,element){
	if(index==1){
		showhide(index,element);
		var wn=$("#web-name").val();
		var pi=$("#parent-id").val();
		paramJSON.webName=wn;
		paramJSON.fileName=wn;
	}else if(index==2){
		if($("#table-name").is(":visible")){//创建新的数据库表
			submit(index,element);
		}else{//选择已有的数据库表
			var pi=$("#belong-database").val();
			paramJSON.projectTableId=pi;
			save(index,element);
		}
	}else{
		
	}
}

function showhide(index,element){
	var $li=$("#progressbar li:eq("+index+")");
	$li.siblings().removeClass("active");
	$li.addClass("active");
	$(element).hide();
	$(element).next().show();
}

/**
 * 发布提交
 */
function submit(index,element){
	var $tr=$("#create-table>tbody tr");
	var length=$tr.length;
	if(length>0){
		var i=0;
		var jsonparam=[];
		var tableName=$("#table-name").val();
		if(tableName==""){
			alert("请填写表名");
			return;
		}
		for(i;i<length;i++){
			var $this=$tr.eq(i);
			var filedName=$this.find("td:eq(1) input").val();
			if(filedName==""){
				alert("请填写列名");
			}
			var alias=$this.find("td:eq(2) input").val();
			if(alias==""){
				alert("请填写别名");
			}
			var filedType=$this.find("td:eq(3) select").val();
			var filedSize=$this.find("td:eq(4) input").val();
			if(filedSize==""){
				alert("请填写字长");
			}else{
				if(isNaN(filedSize)){
					alert("请填写数字");
				}
				filedSize=parseInt(filedSize);
			}
			jsonparam.push({"filedName":filedName,"columnAlias":alias,"columnType":filedType,"columnSize":filedSize});
		}
		createAJAX(tableName,jsonparam,element,index);
	}else{
		alert("无法创建空表");
	}
}

/**
 * 创建表
 * @param tableName  表名
 * @param jsonparam  列属性JSON集合
 */
function createAJAX(tableName,jsonparam,element,index){
	$.ajax({
		type:"post",
		url:basePath+"/structureTable/insertStructureTableList.htm",
		data:{"tableName":tableName,"updateTableName":$("#updateTableName").val(),"projectId":projectId,"columns":JSON.stringify(jsonparam)},
		dataType:"json",
		success:function(data){
			if(data.status){
				paramJSON.projectTableId=data.message;
				save(index,element);
			}else{
				alert(data.message);
			}
		}
	});
}


/**
 * 保存功能表
 * @param projectId  
 */
function save(index,element){
	paramJSON.type=$("#formTypeChangeFun").val();
	$.ajax({
		type:"post",
		url:basePath+"/sysFunction/add.htm",
		data:paramJSON,
		dataType:"json",
		success:function(data){
			if(data.status){
				showhide(index,element);
				paramJSON.id=data.message;
			}else{
				alert(data.message);
			}
		}
	});
}
/**
 * 查找项目中的所有表
 * @param projectId  
 */
function findTable(projectId){
	$.ajax({
		type:"post",
		url:basePath+"/structureTable/findTableByProjectName.htm",
		data:{"projectId":projectId},
		dataType:"json",
		success:function(data){
			if(data!=null){
				var length=data.length;
				var html="";
				if(length>0){
					var i=0;
					for(i;i<length;i++){
						html+='<option value="'+data[i].id+'">'+data[i].table_alias+'</option>';
					}
				}
				$("#belong-database").append(html);
			}
		}
	});
}

/**
 * 获取功能树结构
 * @param projectId  表名
 */
function getTree(){
	$.ajax({
		type:"post",
		url:basePath+"/sysFunction/findTreeNode.htm",
		data:{"projectId":projectId},
		dataType:"json",
		success:function(data){
			if(data!=null&&data.length>0){
				buildTree(data);
			}
		}
	});
}

/**
 * 创建树
 * @param data 数据
 */
function buildTree(data){
	/**
	 * 开始 - 树目录结构参数设置
	 */
	var setting = {
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onClick: onClick
			}
		};
	$.fn.zTree.init($("#tree"), setting, data);
}

function onClick(event, treeId, treeNode, clickFlag) {
	console.info(treeNode);
	paramJSON.parentId=treeNode.id;
	paramJSON.url=treeNode.text;
	$("#parent-id").val(treeNode.name);
	$("#tree-function").hide();
}

function goin(){
	window.location.href=basePath+"/form/index.htm?t="+paramJSON.id;
}

$(function(){
	$('.tree-menu').click(function(e) {
		if ($('.tree-submenu').is(':hidden')) {
		$('.tree-submenu').fadeIn();
		e?e.stopPropagation() : event.cancelBubble = true;
			}
		});
		$('.tree-submenu').click(function(e) {
			e?e.stopPropagation() : event.cancelBubble = true;
		});
		$('.tree-menu').click(function(e) {
			e?e.stopPropagation() : event.cancelBubble = true;
		});
		$(document).click(function() {
			$('.tree-submenu').fadeOut();
		});

	$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) { 
    	//获取当前值赋给输入框的值
    	$('.tree-menu').val($(this).text());
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa').addClass('fa-plus-circle').removeClass('fa-minus-circle');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa').addClass('fa-minus-circle').removeClass('fa-plus-sign');
        }
        e.stopPropagation();
    });
	
	$(".btn1").click(function(){
		$(".systemBox").css("display","block");
		$(".pageBox").css("display","none");
	})
	$(".btn2").click(function(){
		$(".pageBox").css("display","block");
		$(".systemBox").css("display","none");
	})
	
    $(".select2").select2();
	
	findTable(projectId);
	getTree();
	
});