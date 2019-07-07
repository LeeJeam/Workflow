<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
	cn.hy.projectmanage.pojo.Project project=cn.hy.common.utils.SessionUtil.getProjectName(request);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
.box-title-name { line-height: 30px !important; font-size: 14px !important; }
.breadcrumb { font-size: 14px; font-weight: 400; font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;}
.listBox li { margin-bottom: 10px; line-height: 24px; font-size: 12px; }
.listBox li span { line-height: 30px; color: #999; font-size: 12px; }
.listBox1 li { border-bottom: 1px solid #f4f4f4;}
.listBox1 li a { padding: 2px 0;}
.listBox1 li a span { margin-left: 20px;}
/*-----------------------------------  閫変汉寮圭獥  -------------------------------------------------*/
.xuanrenBox li { border-bottom: 1px solid #f4f4f4; margin-top: 0px;}
.xuanrenBox li .msg { color: #444; font-size: 12px; }
.xuanrenBox li .msg i { font-size: 16px; color: #444; }

.xuanrenBox li .uesr { width: 30px; height: 30px; display: block; border-radius: 50%; float: left; line-height: 30px; margin-top: 4px; text-align: center; color: #fff; font-size: 10px;  }
.xuanrenBox li .uesrName .uesrName1 { margin-left: 10px; font-size: 12px; }
.xuanrenBox li .uesrName .uesrName2 { margin-left: 10px; font-size: 10px; font-weight: normal; }

.xuanrenBox1 li { border-bottom: 1px solid #ccc;}
.xuanrenBox1 li .uesr { width: 30px; height: 30px; display: block; border-radius: 50%; float: left; line-height: 30px; margin-top: 4px; text-align: center; color: #fff; font-size: 10px;  }
.xuanrenBox1 li .uesrName .uesrName1 { margin-left: 10px; font-size: 12px; }
.xuanrenBox1 li .uesrName .uesrName2 { margin-left: 10px; font-size: 10px; font-weight: normal; }

.xuanrenBoxX li { border-bottom: 1px solid #ccc;}
.xuanrenBoxX li .uesr { width: 30px; height: 30px; display: block; border-radius: 50%; float: left; line-height: 30px; margin-top: 4px; text-align: center; color: #fff; font-size: 12px;  }
.xuanrenBoxX li .uesrName .uesrName1 { margin-left: 10px; font-size: 14px; }
.xuanrenBoxX li .uesrName .uesrName2 { margin-left: 10px; font-size: 12px; font-weight: normal; }

/*-----------------------------------  涔樿溅宸ユ椂  -------------------------------------------------*/
.ridingBoxUive { position: relative;}
.ridingBoxUive h5 strong { font-size: 18px; font-weight: bold; }
.ridingBoxUive h5 span { font-size: 12px; }
.ridingBoxUive h5 .pull-right { line-height: 22px;}
.ridingBoxUive .ridingBorder { border-top: 1px #eee dashed; margin-bottom: 10px; }
.ridingBoxUive .ridingBorders { border-top: 1px #eee dashed; margin: 10px 0; }
.ridingBoxUive button { position: absolute; right: 10px; top: 8px; }
</style>
</head>

<body>

<div class="modal fade" id="functionPage-User1">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                  </button>
                  <h4 class="modal-title">委托人员</h4>
              </div>
              <div class="modal-body">
              	<form id="from-project" class="form-horizontal">
              	<input type="hidden" id="taskId">
              	<input type="hidden" id="url">
            	<input style="display: none;">
            	<div class="row" style=" padding: 0 15px;">
            		<ol id="pathctrl" class="breadcrumb" style="margin-bottom: 15px;">
            			<li><a href="javascript:ShowDeptPath(0)">根目录</a></li>
                 </ol>
            		<div style=" position: relative;">
                 	<div class="input-group col-lg-12" style=" margin-bottom: 15px;">
                        	<ul class="add-user-demo" id="add-user-demo1" style="padding: 0px;">
                        		<div id="searchdiv" class="input-group">
                        			<input class="form-control" placeholder="请输入名字" type="text" id="selectUser"  onkeyup="flowChooseUser.searchProcessUsers(this)" style="wight: 100%; border: 0; border: #ccc solid 1px; color: #333;" onkeyup="seletIitemChange();">
                         			<span class="input-group-btn">
                        	<button type="button" onclick="seletIitemChange();" class="btn btn-primary btn-flat"><i class="fa fa-search" style=" padding: 3px 0;"></i></button>
                    	</span>
                        		</div>	
                        		
                        		
	                           		
	                          
                        		
                        		
                        				                           		
                        	</ul>
                         <small class="help-block text-red"></small>
			</div>

            		</div>
            		<div id="xuanrenBox" style=" border: 1px solid #ccc; height: 300px; overflow-y: auto;">
             			<div id="divDept">
              			<ul id="ulDept" class="nav nav-pills nav-stacked xuanrenBox" >
              				
                       </ul>
                      </div>
                      <div id="divPeople">
                       <ul id="ulPeople1" class="nav nav-pills nav-stacked xuanrenBoxX" >
                        	<li>
                        		<a href="javascript:getName('4946','雷洪文')">
                        			<span class="uesr bg-green">李</span>
                        			<span class="uesrName"><b class="uesrName1">李四</b><br><b class="uesrName2">业务大区老总</b></span>
                        		</a>
                        	</li>
                       </ul>
				</div>
             		</div>
             	</div>
      	</form>
               </div>
               <div class="modal-footer">
               	<button type="button" class="btn btn-primary" onclick="flowChooseUser.submitUser()" >提交</button>
	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
</div>
           </div>
       </div>
   </div>
   
   <div class="modal fade" id="functionPage-User">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                  </button>
                  <h4 class="modal-title">会签人员</h4>
              </div>
              <div class="modal-body">
              	<form id="from-project" class="form-horizontal">
              	<input type="hidden" id="taskId">
              	<input type="hidden" id="id">
              	<input type="hidden" id="processkey">
            	<input style="display: none;">
            	<div class="row" style=" padding: 0 15px;">
            		<ol id="pathctrl" class="breadcrumb" style="margin-bottom: 15px;">
            			<li><a href="javascript:ShowDeptPath(0)">根目录</a></li>
                 </ol>
                 
            		<div style=" position: relative;">
                 	<div class="input-group col-lg-12" style=" margin-bottom: 15px;">
                        	<ul class="add-user-demo" id="add-user-demo2" style="padding: 0px;">
                        		<div id="searchdiv" class="input-group">
                        			<input class="form-control" placeholder="请输入名字" type="text" id="selectUser" onkeyup="flowChooseUser.searchProcessUsers(this)" style="wight: 100%; border: 0; border: #ccc solid 1px; color: #333;" onkeyup="seletIitemChange();">
                         			<span class="input-group-btn">
                        	<button type="button" onclick="seletIitemChange();" class="btn btn-primary btn-flat"><i class="fa fa-search" style=" padding: 3px 0;"></i></button>
                    	</span>
                        		</div>			                           		
                        	</ul>
                         <small class="help-block text-red"></small>
			</div>

            		</div>
            		<div id="xuanrenBox" style=" border: 1px solid #ccc; height: 300px; overflow-y: auto;">
             			<div id="divDept">
              			<ul id="ulDept" class="nav nav-pills nav-stacked xuanrenBox" >
              				
                       </ul>
                      </div>
                      <div id="divPeople">
                       <ul id="ulPeople" class="nav nav-pills nav-stacked xuanrenBoxX" >
                        	<li>
                        		<a>
                        			<span class="uesr bg-green">王</span>
                        			<span class="uesrName"><b class="uesrName1">王五</b><br><b class="uesrName2">业务大区老总</b></span>
                        			
                        		</a>
                        	    <a>
                        			<span class="uesr bg-green">赵</span>
                        			<span class="uesrName"><b class="uesrName1">赵六</b><br><b class="uesrName2">业务大区老总</b></span>
                        		</a>
                        	</li>
                       </ul>
				</div>
             		</div>
             	</div>
      	</form>
               </div>
               <div class="modal-footer">
               	<button type="button" class="btn btn-primary" onclick="flowChooseUser.submitSignUser()" >提交</button>
	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
</div>
           </div>
       </div>
   </div>

</body>
</html>