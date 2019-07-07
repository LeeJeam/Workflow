<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>

<div class="modal-body">
	<form class="form-horizontal" id="addForm">
		<input type="hidden" id="data_id" name="id" value="${data.id }">
		<div class="box-body">
			<div class="form-group">
				<label class="col-sm-3 control-label">名称</label>
				<div class="col-sm-8">
					<div style="position: relative;">
						<input type="text" id="function_name" class="form-control tree-menu" value="${data.web_name }" placeholder="选择所属功能链接" />
						<div class="tree-submenu1" style="display: none; position: absolute; left: 0px; top: 34px; background: #eee; width: 100%; z-index: 9999; height: 100px; overflow-y: auto; overflow-x: hidden;">
							<ul class="ztree" id="function_demo">
	
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="form-group" id="form-group-fileQueue">
				<label class="col-md-3 control-label">添加插件：</label>
				<div class="col-md-8">
					<div id="fileQueue" class="fileupload fileupload-new">
						<input type="file" name="file" id="uploadify" />
					</div>
				</div>
			</div>
		</div>
	</form>
</div>
<div class="modal-footer">
	<button type="button" class="btn btn-default" data-dismiss="modal" id="cacel-alertjsp">关闭</button>
	<button type="button" class="btn btn-primary" onclick="submit_dictionary()">提交</button>
</div>
<script type="text/javascript">
var newCount = 1;//节点开始数
var menuselecter = "menuTree";
var menuData=[];//数据库已有功能树列表数据
var pageId="";
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
	pageId=treeNode.id;
	$("#function_name").val(treeNode.name);
}
	
	function submit_dictionary(){
		if(attachmentJSON.length==0){
			   alert("未上传文件");
			   return;
		}
		var name=$("#function_name").val();
		if(""==name){
			pageId="";
		}
		  $.post(basePath+"/js/saveOrUpdate.htm", {"attachments":JSON.stringify(attachmentJSON),"formid":pageId}, function(data){
			  if(data.status){
				  $('#jsModal').modal("hide");
				  getdata();
				  alert(data.message);
			  }else{
				  alert(data.message);
			  }
		   },"json")
	}
	
	$(function(){
		getTree(basePath+"/sysFunction/findTreeNode.htm",{"projectId":projectId},$("#function_demo"),menuclick);
		uploadone("uploadify");
		
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
	});
</script>