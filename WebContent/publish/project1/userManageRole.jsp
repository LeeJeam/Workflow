<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<title>用户角色</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/font-awesome4/css/font-awesome.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/AdminLTE.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/dist/css/skins/_all-skins.min.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/UILib/plugins/datatables/dataTables.bootstrap.css">
		<link rel="stylesheet" href="<%=rootPath %>/publish/project1/css/public.css">
	</head>
	<body class="hold-transition skin-blue fixed sidebar-mini" id="chat-box">
		<div class="wrapper">
			<jsp:include page="public/header.jsp"></jsp:include>
			<jsp:include page="public/sidebar.jsp"></jsp:include>
			<div class="content-wrapper">
				<section class="content-header">
					<ol class="breadcrumb">
						<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
						<li class="active">用户角色</li>
					</ol>
				</section>
				<section class="content">
					 <div class="row">
                        <div class="col-md-12">
                            <div class="nav-tabs-custom">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#demo1" data-toggle="tab">用户角色</a></li>
                                    <li><a href="#demo2" data-toggle="tab">用户权限</a></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="active tab-pane" id="demo1">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="box-body add_uesr">
                                                    <div class="mb20">
                                                        <button id="btnAdd" class="btn btn-primary btn-flat btn-sm">增加</button>
                                                        <button id="btnEdit" class="btn btn-primary btn-flat btn-sm">编辑</button>
                                                        <button id="btnDelete" class="btn btn-primary btn-flat btn-sm">删除</button>
                                                    </div>
                                                    <div id="divDept" style="height: 460px; overflow-y: auto;">
                                                        <div id="treeview1"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-9 add_list_user">
                                                <div class="box-body" style="padding: 10px 0px;">
                                                    <form id="searchForm">
                                                        <div class="input-group col-md-2 pull-left selectUive">
                                                            <select id="roleId" name="roleId" class="form-control">
                                                                <option value="">全部</option>
                                                            </select>
                                                        </div>
                                                        <div class="input-group col-md-2 pull-left">
                                                            <input type="text" name="userName" class="form-control" placeholder="姓名" />
                                                            <span class="input-group-btn">
                                                                <button id="search" type="button" class="btn btn-primary btn-flat"><i class="fa fa-search"></i></button>
                                                            </span>
                                                        </div>
                                                        <div class="input-group col-md-1 pull-right text-right">
                                                            <button type="button" class="btn btn-primary btn-flat btn-sm" onclick="addUser()"><i class="fa fa-plus"></i> 新增用户</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <hr style="margin: 0;">
                                                <div class="box-body" style="padding: 10px 0px;">
                                                    <table id="tableDemo" class="table table-bordered table-hover text-center">
                                                        <thead>
                                                            <tr>
                                                                <th width="5%"><button class="btn btn-default btn-xs checkbox-toggle" title="全选/全不选"><i class="fa fa-square-o"></i></button></th>
                                                                <th width="10%">序号</th>
                                                                <th width="10%">姓名</th>
                                                                <th width="10%">账号</th>
                                                                <th width="10%">工号</th>
                                                                <th width="10%">所属区域</th>
                                                                <th width="10%">用户角色</th>
                                                                <th width="10%">级别</th>
                                                                <th width="10%">操作</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td><input type="checkbox" class="mailbox-messages"></td>
                                                                <td>1</td>
                                                                <td>雷洪文</td>
                                                                <td>lhw4946</td>
                                                                <td>a004</td>
                                                                <td>无</td>
                                                                <td>技术员</td>
                                                                <td>一级</td>
                                                                <td>
                                                                    <div class="action-button">
                                                                        <a href="javascript: void(0);" title="修改" data-toggle="modal" data-target="#equipmentDemoEdit"><i class="fa fa-pencil"></i></a>
                                                                        <a href="javascript: void(0);" title="查看" data-toggle="modal" data-target="#equipmentDemoUive"><i class="fa fa-refresh"></i></a>
                                                                        <a href="javascript: void(0);" title="删除"><i class="fa fa-trash"></i></a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><input type="checkbox" class="mailbox-messages"></td>
                                                                <td>2</td>
                                                                <td>徐彪</td>
                                                                <td>xb4947</td>
                                                                <td>a003</td>
                                                                <td>无</td>
                                                                <td>技术员</td>
                                                                <td>一级</td>
                                                                <td>
                                                                    <div class="action-button">
                                                                        <a href="javascript: void(0);" title="修改" data-toggle="modal" data-target="#equipmentDemoEdit"><i class="fa fa-pencil"></i></a>
                                                                        <a href="javascript: void(0);" title="查看" data-toggle="modal" data-target="#equipmentDemoUive"><i class="fa fa-refresh"></i></a>
                                                                        <a href="javascript: void(0);" title="删除"><i class="fa fa-trash"></i></a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><input type="checkbox" class="mailbox-messages"></td>
                                                                <td>2</td>
                                                                <td>徐彪</td>
                                                                <td>xb4947</td>
                                                                <td>a003</td>
                                                                <td>无</td>
                                                                <td>技术员</td>
                                                                <td>一级</td>
                                                                <td>
                                                                    <div class="action-button">
                                                                        <a href="javascript: void(0);" title="修改" data-toggle="modal" data-target="#equipmentDemoEdit"><i class="fa fa-pencil"></i></a>
                                                                        <a href="javascript: void(0);" title="查看" data-toggle="modal" data-target="#equipmentDemoUive"><i class="fa fa-refresh"></i></a>
                                                                        <a href="javascript: void(0);" title="删除"><i class="fa fa-trash"></i></a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><input type="checkbox" class="mailbox-messages"></td>
                                                                <td>2</td>
                                                                <td>徐彪</td>
                                                                <td>xb4947</td>
                                                                <td>a003</td>
                                                                <td>无</td>
                                                                <td>技术员</td>
                                                                <td>一级</td>
                                                                <td>
                                                                    <div class="action-button">
                                                                        <a href="javascript: void(0);" title="修改" data-toggle="modal" data-target="#equipmentDemoEdit"><i class="fa fa-pencil"></i></a>
                                                                        <a href="javascript: void(0);" title="查看" data-toggle="modal" data-target="#equipmentDemoUive"><i class="fa fa-refresh"></i></a>
                                                                        <a href="javascript: void(0);" title="删除"><i class="fa fa-trash"></i></a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><input type="checkbox" class="mailbox-messages"></td>
                                                                <td>2</td>
                                                                <td>徐彪</td>
                                                                <td>xb4947</td>
                                                                <td>a003</td>
                                                                <td>无</td>
                                                                <td>技术员</td>
                                                                <td>一级</td>
                                                                <td>
                                                                    <div class="action-button">
                                                                        <a href="javascript: void(0);" title="修改" data-toggle="modal" data-target="#equipmentDemoEdit"><i class="fa fa-pencil"></i></a>
                                                                        <a href="javascript: void(0);" title="查看" data-toggle="modal" data-target="#equipmentDemoUive"><i class="fa fa-refresh"></i></a>
                                                                        <a href="javascript: void(0);" title="删除"><i class="fa fa-trash"></i></a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><input type="checkbox" class="mailbox-messages"></td>
                                                                <td>2</td>
                                                                <td>徐彪</td>
                                                                <td>xb4947</td>
                                                                <td>a003</td>
                                                                <td>无</td>
                                                                <td>技术员</td>
                                                                <td>一级</td>
                                                                <td>
                                                                    <div class="action-button">
                                                                        <a href="javascript: void(0);" title="修改" data-toggle="modal" data-target="#equipmentDemoEdit"><i class="fa fa-pencil"></i></a>
                                                                        <a href="javascript: void(0);" title="查看" data-toggle="modal" data-target="#equipmentDemoUive"><i class="fa fa-refresh"></i></a>
                                                                        <a href="javascript: void(0);" title="删除"><i class="fa fa-trash"></i></a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><input type="checkbox" class="mailbox-messages"></td>
                                                                <td>2</td>
                                                                <td>徐彪</td>
                                                                <td>xb4947</td>
                                                                <td>a003</td>
                                                                <td>无</td>
                                                                <td>技术员</td>
                                                                <td>一级</td>
                                                                <td>
                                                                    <div class="action-button">
                                                                        <a href="javascript: void(0);" title="修改" data-toggle="modal" data-target="#equipmentDemoEdit"><i class="fa fa-pencil"></i></a>
                                                                        <a href="javascript: void(0);" title="查看" data-toggle="modal" data-target="#equipmentDemoUive"><i class="fa fa-refresh"></i></a>
                                                                        <a href="javascript: void(0);" title="删除"><i class="fa fa-trash"></i></a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><input type="checkbox" class="mailbox-messages"></td>
                                                                <td>2</td>
                                                                <td>徐彪</td>
                                                                <td>xb4947</td>
                                                                <td>a003</td>
                                                                <td>无</td>
                                                                <td>技术员</td>
                                                                <td>一级</td>
                                                                <td>
                                                                    <div class="action-button">
                                                                        <a href="javascript: void(0);" title="修改" data-toggle="modal" data-target="#equipmentDemoEdit"><i class="fa fa-pencil"></i></a>
                                                                        <a href="javascript: void(0);" title="查看" data-toggle="modal" data-target="#equipmentDemoUive"><i class="fa fa-refresh"></i></a>
                                                                        <a href="javascript: void(0);" title="删除"><i class="fa fa-trash"></i></a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="demo2">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="box-body add_uesr">
                                                    <div class="mb20">
                                                        <button id="btnAdd" class="btn btn-primary btn-flat btn-sm">增加</button>
                                                        <button id="btnEdit" class="btn btn-primary btn-flat btn-sm">编辑</button>
                                                        <button id="btnDelete" class="btn btn-primary btn-flat btn-sm">删除</button>
                                                    </div>
                                                    <div id="divDept" style="height: 460px; overflow-y: auto;">
                                                        <ul id="ulRoles" class="nav nav-pills nav-stacked">
                                                            <li class="active">
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void()">绩效专员 
                                                                    <span class="pull-right msg"><i class="fa fa-chevron-right"></i></span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-8 plr">
                                                <form id="formPowerCheck" class="form-horizontal">
                                                    <div id="divPower" class="box-body add_list_user">
                                                        <h3 class="text-center">用户权限</h3>
                                                        <label for="">系统显示:</label>
                                                        <div class="word_box" id="gzgl">
                                                            <label><input type="checkbox" value="1246" />人员信息</label>
                                                            <label><input type="checkbox" value="1246" />设备管理</label>
                                                            <label><input type="checkbox" value="1246" />房屋绑定</label>
                                                            <label><input type="checkbox" value="1246" />监控信息</label><br>
                                                            <label><input type="checkbox" value="1246" />数据查询</label>
                                                            <label><input type="checkbox" value="1246" />用户权限</label>
                                                        </div>
                                                        <label for="">人员信息:</label>
                                                        <div class="word_box" id="gzgl">
                                                            <label><input type="checkbox" value="1248" />新增功能</label>
                                                            <label><input type="checkbox" value="1249" />编辑功能</label>
                                                            <label><input type="checkbox" value="1249" />删除功能</label>
                                                        </div>
                                                    </div>
                                                    <p class="text-center mt20">
                                                        <button type="button" class="btn btn-primary btn-flat">保存</button>
                                                        <button type="button" class="btn btn-default btn-flat">重置</button>
                                                    </p>
                                                </form>   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				</section>
			</div>
			<jsp:include page="public/footer.jsp"></jsp:include>
		</div>
		<script src="<%=rootPath %>/publish/project1/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/bootstrap/js/bootstrap.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/quit/sweetalert.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/js/quit.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>
        <script src="<%=rootPath %>/publish/project1/UILib/plugins/bootstrap-tree/bootstrap-treeview.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/app.min.js"></script>
		<script src="<%=rootPath %>/publish/project1/UILib/dist/js/demo.js"></script>
		<script>
        $(document).ready(function (){
            //table控件初始化
            $("#tableDemo").DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "info": true,
                "autoWidth": false
            });
            //树形内容结构
            var defaultData = [
                {
                    text: "全部社区",
                    href: "#parent1",
                    tags: ["4"],
                    nodes: [
                        {
                            text: "穗园社区",
                            href: "#child1",
                            tags: ["1"],
                            nodes: [
                                {
                                    text: "穗园社区A",
                                    href: "#child11",
                                    tags: ["0"]
                                },
                                {
                                    text: "穗园社区B",
                                    href: "#child11",
                                    tags: ["0"]
                                }
                            ]
                        },
                        {
                            text: "华南师范大学社",
                            href: "#child2",
                            tags: ["0"]
                        },
                        {
                            text: "松岗社区",
                            href: "#child2",
                            tags: ["0"]
                        },
                        {
                            text: "龙口西社区",
                            href: "#child2",
                            tags: ["0"]
                        },
                        {
                            text: "南苑社区",
                            href: "#child2",
                            tags: ["0"]
                        },
                        {
                            text: "东海社区",
                            href: "#child2",
                            tags: ["0"]
                        },
                        {
                            text: "芳草园社区",
                            href: "#child2",
                            tags: ["0"]
                        },
                        {
                            text: "金帝社区",
                            href: "#child2",
                            tags: ["0"]
                        }
                    ]
                },                     
            ];
            $("#treeview1").treeview({
                data: defaultData,
                color: "#428bca"
            });
        });
        </script>
	</body>
</html>