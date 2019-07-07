var newCount = 1;//节点开始数
var menuselecter = "menuTree";
var menuData=[];//数据库已有功能树列表数据
/**
 * 获取菜单树结构
 * @param projectId  表名
 */
function getTree(url,data,selecter,fn,isMenuTree){
	$.ajax({
		type:"post",
		url:url,
		data:data,
		dataType:"json",
		success:function(data){
			if(isMenuTree){
				if(data!=null&&data.length>0){
					menuData=data;
					newCount=parseInt((data[(data.length-1)].id))+1;
				}
			}
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
						onClick: fn
					}
				};
			$.fn.zTree.init($(selecter), setting, data);
		}
	});
}
/**
 * 左边菜单树的点击事件
 * @param event
 * @param treeId
 * @param treeNode
 * @param clickFlag
 */
function menuclick(event, treeId, treeNode, clickFlag){
	$("#menu_name").val(treeNode.name);
	$("#function_name").val(treeNode.text);
}

/**
 * 右边功能树的点击事件
 * @param event
 * @param treeId
 * @param treeNode
 * @param clickFlag
 */
function functionclick(event, treeId, treeNode, clickFlag) {
	$("#function_name").val(treeNode.name);
	var zTree = $.fn.zTree.getZTreeObj(menuselecter),
	nodes = zTree.getSelectedNodes(),
	tn = nodes[0];
	if (tn) {
		tn.text=treeNode.name;
		tn.sysFunctionId=treeNode.id;
		if(!tn.isInsert){//是否新增
			tn.isUpdate=true;
		}
		zTree.updateNode(tn);
	}
}

/**
 * 增加节点
 * @param e
 */
function add(e) {
	var zTree = $.fn.zTree.getZTreeObj(menuselecter),
	isAddSon = e.data.isAddSon,
	isParent = e.data.isParent,
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0],
	pId="";
	if(!isParent){
		if(treeNode){
			pId=treeNode.id;
		}else{
			if(isAddSon){
				alert("请选择父级");
				return;
			}
		}
	}
	if(treeNode&&isAddSon){
		treeNode = zTree.addNodes(treeNode, {id:newCount, pId:pId, isParent:isParent, name:"new menu"+(newCount++),text:"","isInsert":true,"isDelete":false,"isUpdate":false,"sysFunctionId":null});
	} else {
		treeNode = zTree.addNodes(null, {id:newCount, pId:pId, isParent:isParent, name:"new menu"+(newCount++),text:"","isInsert":true,"isDelete":false,"isUpdate":false,"sysFunctionId":null});
	}
};
/**
 * 删除节点
 * @param e
 */
function remove(e) {
	var zTree = $.fn.zTree.getZTreeObj(menuselecter),
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0];
	if (nodes.length == 0) {
		alert("请先选择一个节点");
		return;
	}
	zTree.removeNode(treeNode);
};

/**
 * 删除节点
 * @param e
 */
function save(e) {
	var zTree = $.fn.zTree.getZTreeObj(menuselecter);
	var nodes = zTree.transformToArray(zTree.getNodes());
	var md=transform(nodes);
	if(md==false){
		alert("菜单功能名称不能为空");
		return;
	}
	$.ajax({
		type:"post",
		url:basePath+"/menu/add.htm",
		data:{"menuData":JSON.stringify(md)},
		dataType:"json",
		success:function(data){
			if(data.status){
				alert("保存成功");
				window.location.href=basePath+"/index-shop.jsp";
			}else{
				alert(data.message);
			}
		}
	});
};

/**
 * 功能树是否变动
 * @param nodes
 * @returns
 */
function transform(nodes){
	var data=[];
	var ml=menuData.length;
	if(ml>0){
		if(nodes.length>0){
			for(var i=0;i<ml;i++){
				var m=nodes.length;
				var md=menuData[i];
				var id=md.id;
				var isNotFild=true;
				var n;
				for(var j=0;j<m;j++){
					var nd=nodes[j];
					if(id==nd.id){
						isNotFild=false;
						md=nd;
						n=j;
						//跳出循环
						break;
					}
				}
				if(md.name==""){
					return false;
				}
				//树集合中不存在，已删除
				if(isNotFild){
					md.isDelete=true;
				}else{//存在则删除
					nodes.splice(n,1);
				}
				md.children=null;
				data.push(md);
			}
			//树种还有值
			if(nodes.length>0){
				for(var i in nodes){
					var n=nodes[i];
					if(n.name==""){
						return false;
					}
					n.children=null;
					data.push(n);
				}
				
			}
		}else{
			for(var i=0;i<ml;i++){
				menuData[i].isDelete=true;
			}
			return menuData;
		}
	}else{
		var l=nodes.length;
		for(var i=0;i<l;i++){
			if(nodes[i].name==""){
				return false;
			}
			nodes[i].children=null;
		}
		return nodes;
	}
	return data;
}

/**
 * 名字编辑
 */
function changeNode(){
	var value=$("#menu_name").val();
	var zTree = $.fn.zTree.getZTreeObj(menuselecter),
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0];
	if (nodes.length>0) {
		treeNode.name=value;
		if(!treeNode.isInsert){//是否新增
			treeNode.isUpdate=true;
		}
		zTree.updateNode(treeNode);
	}
}

$(function(){
	//获取左边菜单树
	getTree(basePath+"/menu/findTreeNode.htm",{"projectId":projectId},$("#menuTree"),menuclick,true);
	//右边下拉框功能树
	getTree(basePath+"/sysFunction/findTreeNode.htm",{"projectId":projectId},$("#function_demo"),functionclick);
	
	$('.tree-menu').click(function(e) {
		if ($('.tree-submenu1').is(':hidden')) {
			$('.tree-submenu1').fadeIn();
				e?e.stopPropagation() : event.cancelBubble = true;
			}
		});
		$('.tree-submenu1').click(function(e) {
			e?e.stopPropagation() : event.cancelBubble = true;
		});
		$('.tree-menu').click(function(e) {
			e?e.stopPropagation() : event.cancelBubble = true;
		});
	$(document).click(function() {
		$('.tree-submenu1').fadeOut();
	});
	//增加父节点
	$("#addParent").bind("click", {isParent:true,isAddSon:false}, add);
	//增加子节点
	$("#addLeaf").bind("click", {isParent:false,isAddSon:true}, add);
	//删除节点
	$("#remove").bind("click", remove);
	//保存节点
	$("#save").bind("click", save);
	//节点名称编辑事件
	$("#menu_name").bind("keyup",changeNode);
});