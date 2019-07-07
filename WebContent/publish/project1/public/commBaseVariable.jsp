<%@page import="cn.hy.common.utils.PropertiesUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	String webName=PropertiesUtils.init("web_name");
	String hsyweb_url=PropertiesUtils.init("hsyweb_url");
%>
<link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/userName.css">
<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
<script type="text/javascript" src="<%=rootPath %>/publish/project1/UILib/plugins/zTree/jquery.ztree.excheck-3.5.js"></script>
<div class="modal fade" id="page_user_modal">
           <div class="modal-dialog" role="document">
               <div class="modal-content">
                   <div class="modal-header">
                       <button type="button" class="close"   onclick="closeUserBoxTreeModel()">
                           <span aria-hidden="true">×</span>
                       </button>
                       <h4 class="modal-title">人员选择</h4>
                   </div>
                   <div class="modal-body userBox">
                   	<div class="cler">
                    	<div class="fl userBox1">
							<div class="nav-tabs-custom">
								<ul class="nav nav-tabs" id="chooseUserUl">
									<li class="active"><a href="#tab_1" data-toggle="tab" id="tabs_1" aria-expanded="true">用户人员</a></li>
									<li class=""><a href="#tab_2" data-toggle="tab" id="tabs_2" aria-expanded="false">用户角色</a></li>
									<li class=""><a href="#tab_3" data-toggle="tab" id="tabs_3" aria-expanded="false">机构</a></li>
								</ul>
								<div class="tab-content">
									<div class="tab-pane active" id="tab_1">
										<div class="input-group">
											<input onkeyup="searchUserBoxInfo(1)" id="new-event1" type="text" class="form-control input-sm" placeholder="">
											<div  title="搜索" class="input-group-addon" style="cursor: pointer;"><i class="fa fa-search"></i></div>
										</div>
										<ul id="user_tree_ul" class="ztree ztreeList1"></ul>
									</div>
									<div class="tab-pane" id="tab_2">
										<div class="input-group">
											<input onkeyup="searchUserBoxInfo(2)" id="new-event2" type="text" class="form-control input-sm" placeholder="">
											<div   title="搜索" class="input-group-addon" style="cursor: pointer;"><i class="fa fa-search"></i></div>
										</div>
										<ul id="user_role_tree_ul" class="ztree ztreeList1"></ul>
									</div>
									<div class="tab-pane" id="tab_3">
										<div class="input-group">
											<input onkeyup="searchUserBoxInfo(3)" id="new-event3" type="text" class="form-control input-sm" placeholder="">
											<div   title="搜索" class="input-group-addon" style="cursor: pointer;"><i class="fa fa-search"></i></div>
										</div>
										<ul id="user_org_tree_ul" class="ztree ztreeList1"></ul>
									</div>
								</div>
							</div>
                    	</div>
                    	<div class="fl userBox2">
                    		<div class="btn-group-vertical">
								<button type="button" class="btn btn-default btn-sm" style="margin-bottom: 15px;" id="getCheckedUserTreeNodeBtn" onclick="getCheckedUserTreeNode()"><i class="fa fa-chevron-right"></i></button>
								<!-- <button type="button" class="btn btn-default btn-sm"><i class="fa fa-chevron-left"></i></button> -->
	                        </div>
                    	</div>
                    	<div class="fr userBox3">
                    		<div class="userBox3-head">
                    			<div class="checkbox fl" style="margin: 0px;">
		                          <label title="全选" onclick="checkAllChooseUser(this)">
		                            <input type="checkbox" id="allChooseUserBtn"> 全选
		                          </label>
		                        </div>
	                    		<div class="fr" title="清空" onclick="delChooseUser()">
		                    		<a href="javascript: void(0);">清空</a>
			                    </div>
                    		</div>
                    		<div class="userBox3-body" id="userAlreadyChoose">
                    			
                    		
                    		</div>
                    	</div>
                   	</div>
                   </div>
                   <div class="modal-footer">
                   	<button type="button" class="btn btn-primary btn-sm" id="submit_user_config_btn" onclick="submitChooseUser()">提交</button>
					<button type="button" class="btn btn-default btn-sm" onclick="closeUserBoxTreeModel()">关闭</button>
				</div>
               </div>
           </div>
       </div>
   <div class="form-group form-group-sm"  style="position: relative; left: 0px; top: 0px;display: none"> 	
		<label ref="col-md-4" class="control-label col-md-4">
			<span class="supText1" style="">*</span><srtong></srtong>
		</label> 	
		<div ref="col-md-6" class="controls  col-md-6">		
			<div class="" style="width: 100%;" id="popCommFlowUserInputDiv" > 			
				<input id="popCommFlowUserInput" type="text" 
				chooseuserboxconfigtype="2" 
				usertable="yonghubiao" 
				usertablecolumn="username" 
				usertablerole="jiaosebiao" 
				usertablecolumnrole="name" 
				usertableorg="bumenbiao" 
				usertablecolumnorg="name" 
				userrolerange=""
				userorgrange=""
				id="" 
				value="" 
				class="form-control input-sm prohibitInput hasFocus2" 
				placeholder="请选择培训教员" 
				name="peixunjiaoyuan" 
				required="required" 
				userrange="" 
				userrangeid=""> 			
				<span class="input-group-addon" style="background: #286090;cursor: pointer;">
					<i style="color: #fff;" class="fa fa-user"></i>
				</span>		
			</div>	
		</div>
	</div>    

<script type="text/javascript">
	//项目根目录
	var basePath="<%=rootPath %>";
	//是否跨域访问标识
	var isCrossDomain=false;
	//如果是跨域所要带的参数 
	var commVariable="allowedFlag=true&c_port=8088&u_name=${u_name}&s_id=${s_id}";
	var flag=0;
	
	
	$(document).ajaxComplete(function(event, XMLHttpRequest, ajaxOptions){
		if(isCrossDomain)
		{
			if(XMLHttpRequest.responseText=="loginout")
			{
				flag=1;
				window.location.href="<%=rootPath %>/publish/project1/login.jsp"
			}
			else
			{
				flag=0;
			}
		}
		
		
	});
	$(document).ajaxStart(function(e){
		if(isCrossDomain)
		{
			if(flag==1){
				return false;
			}
		}
		
		
	});
	
	$(function(){
		if(isCrossDomain)
		{
			$("span.hidden-xs").text('${u_name}');
		}
		//加载左边菜单
		var sidebarMenu=$(".sidebar-menu");
		//隐藏左边菜单
		sidebarMenu.hide();
		if(sidebarMenu.length>0)
		{
			
			commRequstFun(basePath+"/home/findMenuName.htm", "", function(data)
			{
				if(data!=null&&data!=""&&data.length>0){
					
			 	 	for(var i = 0 ; i < data.length; i++)
			 	 	{
			 	 		
		 	 			var html="";
						html+='<li class="treeview ';
			 	 			
						if(data[i].dtype=="folder")
		 	 			{
		 	 				html+='active';
		 	 			}
						html+='" id="li_'+data[i].id+'" ref="'+data[i].pid+'"><a style="border-left-color: transparent;" href="';
		 	 			if(data[i].dtype=="file")
	 	 				{
	 	 					html+='javascript:gotopage(\''+data[i].url+'\',\''+data[i].id+'\',\''+data[i].menu_name+'\')';
	 	 				}
		 	 			
		 	 			if(data[i].pid==null||data[i].pid=="")
		 	 			{
		 	 				html+='	"><i class="fa fa-folder"></i> <span>'+data[i].menu_name+'</span>';
		 	 			}
		 	 			else
	 	 				{
		 	 				html+='">' + data[i].menu_name;
	 	 				}
		 	 			
		 	 			
		 	 			if(data[i].dtype=="folder")
		 	 			{
		 	 				html+='<i class="fa fa-angle-left pull-right"></i>';
		 	 			}
		 	 			html+='	</a>'
		 	 			if(data[i].dtype=="folder")
		 	 			{
	 	 					html+='<ul class="treeview-menu" id="ul_'+data[i].id+'">';
			 	 			
			 	 			html+='</ul>'
		 	 			}
		 	 			html+='</li>';
		 	 			if(data[i].pid==null||data[i].pid=="")
		 	 			{
		 	 				sidebarMenu.append(html);
		 	 			}
		 	 			else
	 	 				{
		 	 				$("#ul_"+data[i].pid).append(html);
	 	 				}
			 	 			
			 	 	}
			 	 	var str=window.location.href.split("&") ;
					if(str!=null&&str!=null&&str.length>0)
					{
						for(var v =0 ;v <str.length;v++)
						{
							//跳转页名参数
							if(str[v].indexOf("pagename")>-1)
							{
								//页面名称
								var name = str[v].split("=")[1];
								sidebarMenu.find("li a").each(function(i,n){
									var h=$(n).attr("href");
									if(h.search(name)!=-1){
										$(n).parent("li").addClass("active");
									}
								});
							}
						}
					}
			 	}
				//大区绩效系统
				if("daqujixiaoxitong"=="<%=webName%>"){
					//判断是否是超级管理员登录
					commRequstFun(basePath+"/authority/isSuperAdmin.htm", "", function(data){
						if(!data){//如果不是超级管理员,则请求权限菜单
							commRequstFun(basePath+"/authority/getAuthorityUrl.htm", "", function(indata){
								//是否有菜单权限
								var hasMenu=false;
								if(null!=indata){
									//集合长度
									var length=indata.length;
									if(length>0){//有菜单权限
									   hasMenu=true;
									   //遍历左边菜单
									   var $cli=sidebarMenu.children("li:gt(0)")
									   var clength=$cli.length;
									   //有子菜单
									   if(clength>0){
									   	//遍历菜单项
									   	  for(var i=0;i<clength;i++){
									   	  	var $this=$cli.eq(i);
									   	  	var $ul=$this.find("ul");
											
											//去空格取值
									   	  	var text=$.trim($this.find("a span").text());
											//如果是系统默认项则跳过
											if("系统配置"==text){
												continue;
											}
									   	  	if($ul.length>0){	//该菜单项有子项
									   	  		var $ccli=$ul.children("li");
									   	  	    var childrenlength=$ccli.length;
												//子菜单剩余数
									   	  	    var leftcount=childrenlength;
									   	  		for(var j=0;j<childrenlength;j++){
				                                 //去空格取值对比数据
									   	  		 if($.inArray($.trim($ccli.eq(j).find("a").text()),indata)==-1){
									   	  		 	//无该菜单权限则删除
									   	  		 	$ccli.eq(j).remove();
													leftcount--;
									   	  		 }
									   	  		}
									   	  		//子菜单为0,表示没有该项功能,删除
									   	  		 if(leftcount<=0){
									   	  		 	$cli.eq(i).remove();
									   	  		 }
									   	  	}else{
									   	  		//没有该权限
									   	  		 if($.inArray(text,indata)==-1){
									   	  		 	//无该菜单权限则删除
									   	  		 	$cli.eq(i).remove();
									   	  		 }
									   	  	}
									   	  }
									   }
									
									}
								}
								if(!hasMenu){
									//清空左边菜单
									sidebarMenu.html("");
								}
								//显示左边菜单
		                        sidebarMenu.show();
							},"json");
						}else{
							//显示左边菜单
		                    sidebarMenu.show();
						}
					},"json");
				}else{
					//显示左边菜单
		            sidebarMenu.show();
				}
			},"json");
		}
	});
	
	function isExitsArray(){
		
	}
	//公共的post请求
	function commRequstFun(url, data,callback ,type) 
	{
		if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
		{
			url += "?"+commVariable;
		}
		$.post(url, data, callback, type);
	}
	//公共的左边菜单的点击事件
	function gotopage(url,$id,mname)
	{
        if(""!=url&&"null"!=url)
        {
            var parentId = $(".active").attr('ref');
            var url = "<%=rootPath %>/pageToPage/index.htm?pagename="+url+"&menuId="+$id;
           
            if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain)
			{
				url += "&"+commVariable;
				
			}
            window.location.href = url
        }
		var path="<%=hsyweb_url%>";
        if(mname=="功能节点"){
        	window.open('<%=rootPath %>/header/forward.htm?flag=functionPage&type=page');
        }else if(mname=="工作流"){
        	window.open('<%=rootPath %>/header/forward.htm?flag=processList&type=flow');
        }else if(mname=="项目人日"){
        	window.location.href=path+"population/tojsp.do?si=${sessionScope.login_log_id }";
        }else if(mname=="人均工时"){
        	window.location.href=path+"projectWorkingTime/workingHours.do?si=${sessionScope.login_log_id }";
        }else if(mname=="管理统计"){
        	window.location.href=path+"projectManageAmount/index.do?si=${sessionScope.login_log_id }";
        }else if(mname=="我的绩效"){
        	window.location.href=path+"myPerformance/myPerformance.do?si=${sessionScope.login_log_id }";
        }else if(mname=="绩效统计"){
        	window.location.href=path+"performanceStatistics/performanceAccount.do?si=${sessionScope.login_log_id }";
        }else if(mname=="工作用时"){
        	window.location.href=path+"workContent/toPage.do?si=${sessionScope.login_log_id }";
        }else if(mname=="项目信息"){
        	window.location.href=path+"projectInfo/toPage.do?si=${sessionScope.login_log_id }";
        }else if(mname=="单价工时"){
        	window.location.href=path+"rolePrice/toPage.do?si=${sessionScope.login_log_id }";
        }else if(mname=="用户管理"){
        	window.location.href=path+"userInfo/toPage.do?si=${sessionScope.login_log_id }";
        }
    }
//全局人员控件对象
var user_control="";
//
var otherObject={};
//发布之后选 人框点击事件
function userBoxDisplayFun(e,ob)
{
	otherObject=ob;
	$("#user_org_tree_ul,#user_role_tree_ul,#user_tree_ul").empty();
	$("#page_user_modal").addClass("in").show();
	var $input=$(e).find("input");
	user_control=$input;
	$("#userAlreadyChoose").empty();
	$("#new-event1,#new-event2,#new-event3").val("");
	if($input.val()!=""&&$input.val()!=null)
	{
		var v=$input.val().split(",");
		var html="";
		for(var i = 0;i<v.length;i++)
		{
			html+='<div class="checkbox" onclick="checkInputIsChoose(this)"><label><input type="checkbox"> <span>'+v[i]+'</span></label></div>'
		}
		$("#userAlreadyChoose").append(html);
	}
		
	//人员表
	var usertable = $input.attr("usertable");
	var usertablecolumn = $input.attr("usertablecolumn");
	//角色表
	var usertablerole = $input.attr("usertablerole");
	var usertablecolumnrole = $input.attr("usertablecolumnrole");
	//机构表
	var usertableorg = $input.attr("usertableorg");
	var usertablecolumnorg = $input.attr("usertablecolumnorg");
	
	if(usertable!=""&&usertable!=undefined&&usertablecolumn!=""&&usertablecolumn!=undefined)
	{
		getPublishUserBoxDateTree(usertable,usertablecolumn,"user_tree_ul","",1);
		$("#tabs_1").attr("t",usertable).attr("c",usertablecolumn).attr("u_id","user_tree_ul");
	}
	
	if(usertablerole!=""&&usertablerole!=undefined&&usertablecolumnrole!=""&&usertablecolumnrole!=undefined)
	{
		getPublishUserBoxDateTree(usertablerole,usertablecolumnrole,"user_role_tree_ul",$input.attr("userRoleRange"),2);
		$("#tabs_2").attr("t",usertablerole).attr("c",usertablecolumnrole).attr("u_id","user_role_tree_ul");
	}
	
	if(usertableorg!=""&&usertableorg!=undefined&&usertablecolumnorg!=""&&usertablecolumnorg!=undefined)
	{
		getPublishUserBoxDateTree(usertableorg,usertablecolumnorg,"user_org_tree_ul",$input.attr("userOrgRange"),3);
		$("#tabs_3").attr("t",usertableorg).attr("c",usertablecolumnorg).attr("u_id","user_org_tree_ul");
	}
	//改变发布后选人框执行方法
	$("#getCheckedUserTreeNodeBtn").attr("onclick","getCheckedUserTreeNode2()");
	$("#submit_user_config_btn").attr("onclick","submitChooseUser2()");
	$("#new-event1").attr("onkeyup","searchUserBoxInfo2(1)");
	$("#new-event2").attr("onkeyup","searchUserBoxInfo2(2)");
	$("#new-event3").attr("onkeyup","searchUserBoxInfo2(3)");
	$("#allChooseUserBtn").get(0).checked=false;
}
//配置选 人框的选人范围
function userBoxChooseConfigFun(f)
{
	$("#page_user_modal").addClass("in").show();
	var $input=$(".hasFocus2:eq(0)");
	user_control=$input;
	$("#userAlreadyChoose").empty();
	$("#new-event1,#new-event2,#new-event3").val("");
	var configPeropety="";
	var table="";
	var column="";
	var selector="";
	 switch (f)
	 {
			//人员表
	     case 1:
	    	 configPeropety="userRange";
	    	 table=$input.attr("usertable");
	    	 column=$input.attr("usertablecolumn");
	    	 selector="user_tree_ul";
	    	 $("#tabs_2,#tabs_3").hide();
	         break;
	       //角色表
	     case 2:
	    	configPeropety="userRoleRange";
	    	table=$input.attr("usertablerole");
	    	column=$input.attr("usertablecolumnrole");
	    	selector="user_role_tree_ul";
	    	$("#tabs_1,#tabs_3").hide();
	     	break;
	     //机构表
	     case 3:
	    	configPeropety="userOrgRange";
	    	table=$input.attr("usertableorg");
	    	column=$input.attr("usertablecolumnorg");
	    	selector="user_org_tree_ul";
	    	$("#tabs_2,#tabs_1").hide();
	     	break;        	
    
 	}
	 $("#tabs_"+f).show().click();
	 $("#submit_user_config_btn").attr("onclick","submitChooseUser("+f+")");
	if(typeof($input.attr(configPeropety))!=undefined&&typeof($input.attr(configPeropety))!="undefined"&&$input.attr(configPeropety)!=""&&$input.attr(configPeropety)!=null)
	{
		var v=$input.attr(configPeropety).split(",");
		var ids=$input.attr(configPeropety+"Id").split(",");
		var html="";
		for(var i = 0;i<v.length;i++)
		{
			html+='<div class="checkbox"  onclick="checkInputIsChoose(this)"><label><input type="checkbox" style="margin-top: -2px;"> <span refid="'+ids[i]+'">'+v[i]+'</span></label></div>'
		}
		$("#userAlreadyChoose").append(html);
	}
	
		

	
	if(table!=""&&table!=undefined&&column!=""&&column!=undefined)
	{
		getUserBoxDateTree(table,column,selector);
		$("#tabs_"+f).attr("t",table).attr("c",column).attr("u_id",selector);
	}
	$("#allChooseUserBtn").get(0).checked=false;
}
//发布前得已选择的数据
function getCheckedUserTreeNode(){
	$("#userAlreadyChoose").empty();
	//for(var v in ztreeObj)
	//{
		
		var treeObj = $.fn.zTree.getZTreeObj($("#chooseUserUl").find("li.active").find("a").attr("u_id"));
		var checked = treeObj.getCheckedNodes();
		if(checked!=null&&checked!=""&&checked.length>0)
		{
			var html="";
			for(var i = 0;i<checked.length;i++)
			{
				html+='<div class="checkbox"  onclick="checkInputIsChoose(this)"><label><input type="checkbox" style="margin-top: -2px;"> <span refid="'+checked[i].id+'">'+checked[i].name+'</span></label></div>'
			}
			$("#userAlreadyChoose").append(html);
		}
	//}
	 
	
}
//发布后得已选择的数据
function getCheckedUserTreeNode2(){
	$("#userAlreadyChoose").empty();
	for(var v in ztreeObj)
	{
		
		var treeObj = $.fn.zTree.getZTreeObj(v);
		var checked = treeObj.getCheckedNodes();
		if(checked!=null&&checked!=""&&checked.length>0)
		{
			
			for(var i = 0;i<checked.length;i++)
			{
				if(checked[i].dflag=="user"){
					var names=$("#userAlreadyChoose").find("span");
					var f=0;
					if(names.length>0)
					{
						for(var s=0;s<names.length;s++)
						{
							if($(names[s]).attr("refid")==checked[i].id)
							{
								f++;
							}
						}
					}
					if(f==0)
					{
						var html="";
						html+='<div class="checkbox"  onclick="checkInputIsChoose(this)"><label><input type="checkbox" > <span refid="'+checked[i].id+'">'+checked[i].name+'</span></label></div>';
						$("#userAlreadyChoose").append(html);
					}
					
				}
				
			}
			
		}
	}
	 
	
}
//关闭选 人框
function closeUserBoxTreeModel(){

	$("#page_user_modal").removeClass("in").hide();
}



var code;

var ztreeObj={};
//得到配置人员范围之前
function getUserBoxDateTree(tname,tcolumn,selector,columnValue)
{
	var treesetting = {
		check: {
			enable: true
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		 callback: { onClick: function (e, treeId, treeNode, clickFlag) { 
			 		ztreeObj[treeId].checkNode(treeNode, !treeNode.checked, true); 
			 		var str="";
					if(treeNode.isParent)
					{
						str = getAllChildrenNodes(treeNode,str,ztreeObj[treeId]);
					}
				} 
		}
		 
	};
	var param={"tablename" : tname};
	if(typeof(columnValue)!="undefined"&&typeof(columnValue)!=undefined&&columnValue!=null
	 &&typeof(tcolumn)!="undefined"&&typeof(tcolumn)!=undefined&&tcolumn!=null)
	{
		param.columnValue=columnValue;
		param.column=tcolumn;
	}
	commRequstFun(basePath + "/formOpration/findOtherTableData.htm", param, function(data) {
		var zNodes=[];
		if (null != data&&data.length>0) {
			for(var i= 0 ;i<data.length;i++){
				var node={};
				node.id=data[i]["id"];
				node.name=data[i][tcolumn];
				node.pId=data[i]["pid"];
				node.open=true;
				zNodes.push(node);
			}
		}
		commTreeSet(selector,treesetting,zNodes);
	}, "json");
}
//递归，得到叶子节点的数据
function getAllChildrenNodes(treeNode,result,zTree){ 
    if (treeNode.isParent) { 
      var childrenNodes = treeNode.children; 
      if (childrenNodes) { 
          for (var i = 0; i < childrenNodes.length; i++) { 
        	  
           if(childrenNodes[i].isParent){
            	getAllChildrenNodes(childrenNodes[i], result,zTree); 
           }else{
        	   
        	   zTree.checkNode(childrenNodes[i], treeNode.checked, true);
            
           }
          } 
      } 
  } 
}
/**
 * 发布之后得到选人的人员范围
 */
function getPublishUserBoxDateTree(tname,tcolumn,selector,columnValue,flag)
{
	var treesetting = {
		check: {
			enable: true
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		 callback: { onClick: function (e, treeId, treeNode, clickFlag) { 
					
			 		ztreeObj[treeId].checkNode(treeNode, !treeNode.checked, true); 
			 		var str="";
					if(treeNode.isParent){
						str = getAllChildrenNodes(treeNode,str,ztreeObj[treeId]);
					}
				} 
		}
		 
	};
	var param={"tablename" : tname};
	if(typeof(columnValue)!="undefined"&&typeof(columnValue)!=undefined&&columnValue!=null
	 &&typeof(tcolumn)!="undefined"&&typeof(tcolumn)!=undefined&&tcolumn!=null)
	{
		param.columnValue=columnValue;
		param.column=tcolumn;
	}
	if(flag==1)
	{
		var userP=user_control.attr("userRange");
		var userId=user_control.attr("userRangeId");
		if(typeof(userP)!="undefined"&&typeof(userP)!=undefined&&userP!=null&&userP!="")
		{
			var zNodes=[];
			var us=userP.split(",");
			var ui=userId.split(",");
			for(var u=0;u<us.length;u++)
			{
				if($("#new-event1").val()!="")
				{
					if(us[u]!=""&&us[u].indexOf($("#new-event1").val())!=-1)
					{
						var node={};
						node.id=ui[u];
						node.name=us[u];
						node.dflag="user"
						zNodes.push(node);
					}
				}else
				{
					if(us[u]!="")
					{
						var node={};
						node.id=ui[u];
						node.name=us[u];
						node.dflag="user"
						zNodes.push(node);
					}
				}
				
			}
			commTreeSet(selector,treesetting,zNodes);
		}	
	}
	else
	{
		param.searchValue=$("#new-event"+flag).val();
		commRequstFun(basePath + "/formOpration/findChooseUser.htm", param, function(data) {
			var zNodes=[];
			if (null != data&&data.length>0) {
				for(var i=0;i<data.length;i++){
					data[i].open=true;
				}
				zNodes=data;
			}
			commTreeSet(selector,treesetting,zNodes);
		}, "json");
	}
	
}



function commTreeSet(selector,setting,zNodes)
{
	 	
	ztreeObj[selector]=$.fn.zTree.init($("#"+selector), setting, zNodes);
	setCheck(selector);
	$("#py").bind("change", setCheck);
	$("#sy").bind("change", setCheck);
	$("#pn").bind("change", setCheck);
	$("#sn").bind("change", setCheck);
}

function setCheck(selector) {
	var zTree = $.fn.zTree.getZTreeObj(selector),
	py = $("#py").attr("checked")? "p":"",
	sy = $("#sy").attr("checked")? "s":"",
	pn = $("#pn").attr("checked")? "p":"",
	sn = $("#sn").attr("checked")? "s":"",
	type = { "Y":py + sy, "N":pn + sn};
	zTree.setting.check.chkboxType = type;
	showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
}
function showCode(str) {
	if (!code) code = $("#code");
	code.empty();
	code.append("<li>"+str+"</li>");
}
//全选已选择过来的用户
function checkAllChooseUser(e)
{
	if($(e).find("input").get(0).checked)
	{
		$("#userAlreadyChoose").find("input[type=checkbox]").each(function(){

			this.checked=true;
		})
	}
	else
	{
		$("#userAlreadyChoose").find("input[type=checkbox]").each(function(){

			this.checked=false;
		})
	}
}
//删除已选择过来的用户
function delChooseUser()
{
	if($("#userAlreadyChoose").find("input:checked").length==0)
	
	{
		alert("请选择要清除的项");return;
	}
	$("#userAlreadyChoose").find("input:checked").parent().parent().remove();
}	
//发布后的提交
function submitChooseUser2()
{
	var names=$("#userAlreadyChoose").find("span");
	
	
	if(names.length==0)
	{
		$("#user_control").val("");
		//判断是不是流程选人
		if(user_control.attr("id")=="popCommFlowUserInput")
		{
			alert("请选择人员");
			return;
		}
	}
	else
	{
		if(user_control.attr("chooseuserboxconfigtype")=="2"&&names.length>1)
		{
			alert("该选人框最多只能单选");
			return;
		}
		var n="";
		for(var i = 0;i<names.length;i++)
		{
			if(i==names.length-1){
				n+=$(names[i]).text();
			}else{
				n+=$(names[i]).text()+",";
			}
		}
		user_control.val(n);
		var fid=user_control.parents("form:eq(0)").attr("id");
		try{
			if(user_control.attr("name")!=undefined&&user_control.attr("name")!="undefined"&&user_control.attr("name")!=""){
				$('#'+fid).bootstrapValidator('revalidateField', user_control.attr("name"));
			}
		}catch(e){
			
		}
		
		
	}
	if(otherObject!=undefined&&otherObject!="undefined"&&otherObject!=""){
		try{
			$(otherObject).val(n);
		}catch(ee){
			
		}
	}
	closeUserBoxTreeModel();
	//判断是不是流程选人
	if(user_control.attr("id")=="popCommFlowUserInput")
	{
		//判断是不是新建流程的时候
		if(typeof(createProcessFlag)!="undefined"&&createProcessFlag=="createProcessFlag")
		{
			newCreateProcess.submitProcess();
		}
		//判断是不是待办流程
		if(typeof(processFlag)!="undefined"&&processFlag=="process")
		{
			if($("#popCommFlowUserInputDiv").attr("cf")=="1")
			{
				if(names.length>1){
					alert("委托只能选择一个人");
					return;
				}
				flowChooseUser.submitUser($("#popCommFlowUserInputDiv").attr("taskId"),$("#popCommFlowUserInput").val());
				
			}
			else if($("#popCommFlowUserInputDiv").attr("cf")=="2"||$("#popCommFlowUserInputDiv").attr("cf")=="3")
			{
				flowChooseUser.submitSignUser($("#popCommFlowUserInputDiv").attr("taskId"),$("#popCommFlowUserInput").val(),$("#popCommFlowUserInputDiv").attr("cf"));
			}
			else
			{
				runningFlow.submitChooseUser();
			}
			
		}
	}
	
	
}
//发布前的提交
function submitChooseUser(e)
{
	var textareaSelector="";
	var rangePeroptyNmae="";
	var refid="";
	 switch (e)
	 {
			//人员表
	     case 1:
	    	 textareaSelector="userBoxConfigPeopleRange";
	    	 rangePeroptyNmae="userRange";
	    	 refid="userRangeId";
	         break;
	       //角色表
	     case 2:
	    	 textareaSelector="userBoxConfigRoleRange";
	    	 rangePeroptyNmae="userRoleRange";
	    	 refid="userRoleRangeId";
	     	break;
	     //机构表
	     case 3:
	    	 textareaSelector="userBoxConfigOrgRange";
	    	 rangePeroptyNmae="userOrgRange";
	    	 refid="userOrgRangeId";
	     	break;        	
    
 	}
	 
	var names=$("#userAlreadyChoose").find("span");
	if(names.length==0)
	{
		$("#"+textareaSelector).val("");
		$(".hasFocus2:eq(0)").attr(rangePeroptyNmae,"");
		$(".hasFocus2:eq(0)").attr(refid,"");
		
		
	}
	else
	{
		var n="";
		var ids="";
		for(var i = 0;i<names.length;i++)
		{
			if(i==names.length-1){
				n+=$(names[i]).text();
				ids+=$(names[i]).attr("refid");
			}else{
				n+=$(names[i]).text()+",";
				ids+=$(names[i]).attr("refid")+",";
			}
		}
		$("#"+textareaSelector).val(n);
		$(".hasFocus2:eq(0)").attr(rangePeroptyNmae,n);
		$(".hasFocus2:eq(0)").attr(refid,ids);
	}
	
	
	
	
	closeUserBoxTreeModel();
}
//发布之前搜索方法
function searchUserBoxInfo(flag)
{
	
	
	getUserBoxDateTree($("#tabs_"+flag).attr("t"),$("#tabs_"+flag).attr("c"),$("#tabs_"+flag).attr("u_id"),$("#new-event"+flag).val())
}
//发布之后搜索方法
function searchUserBoxInfo2(flag)
{
	var cvalue="";
	 switch (flag)
	 {
			//人员表
	     case 1:
	         break;
	       //角色表
	     case 2:
	    	 cvalue=user_control.attr("userRoleRange")
	     	break;
	     //机构表
	     case 3:
	    	 cvalue=user_control.attr("userOrgRange")
	     	break;        	
    
 	}
	
	getPublishUserBoxDateTree($("#tabs_"+flag).attr("t"),$("#tabs_"+flag).attr("c"),$("#tabs_"+flag).attr("u_id"),cvalue,flag)
}
/**
 * 检查选项是否选中
 */
 function checkInputIsChoose(e)
 {
	var ischoose=$(e).find("input").get(0).checked;
	if(ischoose)
	{
		var f=0;
		$(e).siblings().find("input").each(function(){
			if(!this.checked)
			{
				f++;
			}
		});
		if(f==0)
		{
			$("#allChooseUserBtn").get(0).checked=true;
		}else
		{
			$("#allChooseUserBtn").get(0).checked=false;
		}
	}else
	{
		$("#allChooseUserBtn").get(0).checked=false;
	}
 }
 
 
 /**
  * 公共的流程弹出选人框
  * @param data
  */
 function flowChooseUserPagePopFun(data){
	 	var v="";
		var ids="";
		var iValue="";
		var departNames="";
		var roleNames="";
		for(var i=0;i<data.length;i++){
			
			if(data[i].type=="assignee")
			{
				iValue=data[i].name;
			}else if(data[i].type=="candidateGroups"){
				if(data[i].name.indexOf("角色")>-1){
					roleNames+=data[i].name.split("(")[0];
					if(i!=data.length-1){
						roleNames+=",";
					}
				}else{
					departNames+=data[i].name.split("(")[0];
					if(i!=data.length-1){
						departNames+=",";
					}
				}
			}else{
				
				if(i==data.length-1){
					v+=data[i].name;
					ids+=data[i].id;
				}else{
					v+=data[i].name+",";
					ids+=data[i].id+",";
				}
			}
			
		}
		$("#popCommFlowUserInputDiv").attr("cf","");
		$("#popCommFlowUserInputDiv").attr("onclick","userBoxDisplayFun(this)");
		$("#popCommFlowUserInputDiv").find("input").attr("userrange",v).attr("userrangeid",ids).val(iValue).attr("userrolerange",roleNames).attr("userorgrange",departNames);
		$("#popCommFlowUserInputDiv").click();
 }
 /**
  * 公共的会签和委托弹出选人框
  */
 function flowChooseUserPagePopFun2(flag,taskId){
	 var sData={};
	 var url=basePath + "/processController/getSignUser.htm";
	 if(flag==2)
	 {	//会签
		 sData.type="signUser";
		 sData.taskId=taskId
	 }
	 else if(flag==3)
	 {	//抄送
		 sData.type="copySendUser";
		 sData.taskId=taskId
	 }
	 else
	 {
		 commFlowGetSignUserAndOwnerUserAndSendUser(flag,taskId);
	 }
	 if(flag==2||flag==3)
	 {
		 commRequstFun(url, sData, function(data) {
			 var d=userListToStr(data,"name");
			 if(d.names=="")
			 {
				 commFlowGetSignUserAndOwnerUserAndSendUser(flag,taskId);
			 }
			 else
			 {
				 configChooseUserBox(flag, d)
			 }
		 }, "json");
	 }
	 
	 	
 }

 /**
  * 会签、委托、抄送拿到所有人员
  */
 function commFlowGetSignUserAndOwnerUserAndSendUser(flag,taskId)
 {
	 commRequstFun(basePath + "/formOpration/findOtherTableData.htm", {tablename:"yonghubiao"}, function(data) {
		
		var d= userListToStr(data,"username");
		configChooseUserBox(flag,d);
	}, "json");
 }
 
 //把选人转换为字符串
 function userListToStr(data,uname)
 {
	 var d={};
	 var v="";
	 var ids="";
	 if(data!=null&&data.length>0&&data!="")
	{
		
		for(var i=0;i<data.length;i++)
		{
			if(i==data.length-1){
				v+=data[i][uname];
				ids+=data[i].id;
			}else{
				v+=data[i][uname]+",";
				ids+=data[i].id+",";
			}
		}
		
	}
	 d.names=v;
	 d.ids=ids;
	 return d;
 }
 //配置选 人框属性
 function configChooseUserBox(flag,d)
 {
	if(flag==1)
	{
		$("#popCommFlowUserInputDiv").attr("cf","1").attr("taskId",taskId).find("input").attr("chooseuserboxconfigtype","2");
	}
	else
	{
		$("#popCommFlowUserInputDiv").attr("cf",flag).attr("taskId",taskId).find("input").attr("chooseuserboxconfigtype","1");
	}
	$("#popCommFlowUserInputDiv").attr("onclick","userBoxDisplayFun(this)");
	$("#popCommFlowUserInputDiv").find("input").attr("userrange",d.names).attr("userrangeid",d.ids);
	$("#popCommFlowUserInputDiv").click();
	$("#tab_3").click();
 }
</script>