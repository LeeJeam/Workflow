<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>主页</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
		
		<script src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/js/common.js"></script>
		<script src="<%=rootPath %>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
		<script type="text/javascript" src="<%=rootPath %>/js/custom/views/projectmanage/index.js"></script>
		
		<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
		<link href="<%=rootPath %>/css/home/css/style.css" rel='stylesheet' type='text/css' />
		<script src="<%=rootPath %>/css/home/js/jquery.magnific-popup.js" type="text/javascript"></script>
		<link href="<%=rootPath %>/css/home/css/popup.css" rel="stylesheet" type="text/css">
		<script>
			$(document).ready(function() {
				$('.popup-with-zoom-anim').magnificPopup({
					type: 'inline',
					fixedContentPos: false,
					fixedBgPos: true,
					overflowY: 'auto',
					closeBtnInside: true,
					preloader: false,
					midClick: true,
					removalDelay: 300,
					mainClass: 'my-mfp-zoom-in'
			});
		});
		</script>
		<!--Animation-->
		<script src="<%=rootPath %>/css/home/js/wow.min.js"></script>
		<link href="<%=rootPath %>/css/home/css/animate.css" rel='stylesheet' type='text/css' />
		<script>
			new WOW().init();
		</script>
		<style>
	       	.formwork { overflow: hidden; margin: 0px; padding: 0px;}
	       	.formwork li { list-style: none; float: left; margin: 0 10px 10px 0;}
	       	.formwork li a { width: 195px; height: 180px; display: block; border: 1px solid #d2d6de; padding: 1px; overflow: hidden;}
	       	.formwork li a.active { border: 1px solid red;}
	       	.formwork li a:hover { border: 1px solid red;}
	       	.formwork li a img { width: 100%; height: 100%; border: 0px;}
	       	.listBox { margin: 0px; padding: 0px; border: 1px solid #d2d6de; overflow: hidden;}
	       	.listBox li:first-child { border-top: 0px;}
	       	.listBox li { width: 100%; height: 40px; line-height: 40px; list-style: none; padding: 0 10px; border-top: 1px solid #d2d6de;}
	       	.listBox li:hover { background: #eee;}
	       	.listBox li i { cursor: pointer;}
		</style>
	</head>
	<body>
		<div class="header">
		   <div class="container">
		      <div class="header_top">
			      <div class="header-left">
					 <div class="logo wow bounceInDown" data-wow-delay="0.4s">
						<a href="#" style="font-size: 38px; color: #fff; width: 100%;"><b style="font-size: 60px;">FLOWSys</b><br><p style="font-size: 40px; text-indent: 4em;">项目流程快速开发框架</p></a>
					 </div>
				    <div class="clearfix"></div>
			      </div>
			      <div class="clearfix"> </div>
			   </div>
			   <div class="header_bottom">
			   	  <h1 class="m_head wow rollIn" data-wow-delay="0.4s" style="font-size: 26px;">快速、简易、强大， 超越想像</h1>
			   	  <p class="m_head wow rollIn" data-wow-delay="0.4s" style="color: #fff; font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;">主从表单、简易表格、自定义表单、工作流、<br>普通报表、交叉报表、标题列表、图文列表、<br>树、图表分析、常用筛选、搜索查询……应有尽有，随时满足个性需求！</p>
			   	  <div class="video_buttons">
				   	  <div class="video_but"> <a href="#" data-toggle="modal" data-target="#myModal" class="fa-btn btn-1 btn-1e">创建新项目</a></div>
				   	  <div class="video_but"> <a href="#" data-toggle="modal" data-target="#myModal2" class="fa-btn btn-1 btn-1e">选择已有项目</a></div>				   	  
				      <div class="clearfix"></div>
				 </div>
			   </div>
			   <div class="clearfix"></div>
			</div>
		</div>
		<div class="main">
		     <div class="content_top">
		     	<div class="container">
					<div class="wmuSlider example1">
					   <div class="wmuSliderWrapper">
						   <article style="position: absolute; width: 100%; opacity: 0;"> 
						   	 <div class="banner-wrap">
						   	     <h2>强大的表单设计器</h2>  
						   	     <p>1.支持极丰富的控件。2.人性化的拖放式设计模式。3.支持强大便捷的主从、EXCEL式表单。让您实现便捷灵活的数据录入。</p>
						   	 </div>
							</article>
						    <article style="position: relative; width: 100%; opacity: 1;"> 
						   	   <div class="banner-wrap">
						   	     <h2>强大的列表设计器</h2>  
						   	     <p>1.完全的拖放式开发。2.可以设计丰富的界面。3.支持主从报表等常见报表，也支持图文列表等丰富的设计……助您实现丰富而实用的数据展示和汇总。</p>
						   	 </div>
						    </article>
						    <article style="position: relative; width: 100%; opacity: 1;"> 
						   	   <div class="banner-wrap">
						   	     <h2>便捷灵活的工作流自定义</h2>  
						   	     <p>完全支持自定义各种业务和管理流程，不仅功能强大灵活，而且操作便捷、界面友好、体验超群！同时支持丰富的权限、条件和事件设置，结合多种消息引擎，为企业的各项业务和管理事务提供强有力的支持！</p>
						   	 </div>
						   </article>
						 </div>
						<a class="wmuSliderPrev">Previous</a><a class="wmuSliderNext">Next</a>
		            </div>
		            <script src="<%=rootPath %>/css/home/js/jquery.wmuSlider.js"></script> 
					  <script>
		       			$('.example1').wmuSlider();         
		   		     </script> 	           	      
		       </div>
		     </div>
		     <div class="fadeInRight" style="height: 51px; line-height: 51px; text-align: center; font-size: 14px; font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
		   	   Copyright @ 2017 All right reserved 棒谷网络科技有限公司
		   </div>
		</div>
		<div class="modal fade bs-example-modal-lg" id="myModal">
		    <div class="modal-dialog modal-lg" role="document">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		                <h4 class="modal-title" id="myModalLabel">创建新项目</h4>
		            </div>
		            <div class="modal-body">
		                <label>项目名称</label>
		                  	<div class="form-group">
		                    	<input id="project-name" class="form-control" placeholder="请输入项目名称">
		                  	</div>
		                  	<label>选择模板</label>
		                  	<div class="form-group">
								<ul class="formwork">
	                        		<li><a class="active" href="#"><img src="<%=rootPath %>/img/formword/formword.png"></a></li>
	                        		<%-- <li><a href="#"><img src="<%=rootPath %>/img/formword/formword.png"></a></li> --%>
	                        	</ul>
		                  	</div>
		                  	<label>选择功能</label>
		                  	<div class="form-group">
								<div class="checkbox">
		                           <!--  <label>
		                                <input class="item1input" type="checkbox" checked="checked" name="step1TrainedUserRole" value="1" /> 是否需要登录界面
		                            </label>
		                            <label style="margin-left: 30px;">
		                                <input type="checkbox" class="item1input" checked="checked" name="step1TrainedUserRole" value="2" /> 是否需要用户管理
		                            </label> -->
		                            <label style="margin-left: 30px;">
		                                <input type="checkbox" class="item1input" checked="checked" name="step1TrainedUserRole" value="3" /> 是否需要系统配置
		                            </label>
		                        </div>
		                  	</div>
		                  	<p class="text-center" style="margin-top: 40px; margin-bottom: 20px;"><button class="btn btn-primary btn-sm" onclick="create()">进入项目</button></p>
		            </div>
		        </div>
		    </div>
		</div>
		
		
		<div class="modal fade bs-example-modal-lg" id="myModal2">
		    <div class="modal-dialog modal-lg" role="document">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		                <h4 class="modal-title" id="myModalLabel">选择已有项目</h4>
		            </div>
		            <div class="modal-body" id="proejct-box">
		                
		            </div>
		        </div>
		    </div>
		</div>
	</body>
</html>