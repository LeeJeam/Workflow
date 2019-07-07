<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ rootPath + "/";
%>
<aside class="main-sidebar">
	<section class="sidebar">
		<ul class="sidebar-menu">
			<li class="header">功能菜单</li>
			<c:if test="${!empty menudata }">
				<c:forEach items="${menudata }" var="data" varStatus="status">
					<li
						class="treeview <c:if test="${data.id==parentId}">active</c:if>"
						ref="${data.id}"><a href="javascript:void(0)"
						<c:if test="${empty data.children}">onclick="gotopage('${data.url}','${data.id}')"</c:if>>
							<i class="fa fa-circle-o text-green"></i> <span>${data.menu_name }</span>
							<c:if test="${!empty data.children}">
								<i class="fa fa-angle-left pull-right"></i>
							</c:if>
					</a> <c:if test="${data.id == menuId}">
							<c:set value="<li><i class='fa'></i>${data.menu_name}</li>"
								var="menuHeader"></c:set>
						</c:if> <c:if test="${!empty data.children }">
							<ul class="treeview-menu">
								<c:forEach items="${data.children }" var="children"
									varStatus="status">
									<li><a
										href="javascript:gotopage('${children.url}','${children.id}')"><i
											class="fa fa-circle-o"></i> ${children.menu_name } <c:if
												test="${!empty children.children}">
												<i class="fa fa-angle-left pull-right"></i>
											</c:if> </a> <c:if test="${!empty children.children}">
											<ul class="treeview-menu">
												<c:forEach items="${children.children }" var="child"
													varStatus="status">
													<li><a
														href="javascript:gotopage('${child.url}','${child.id}')"><i
															class="fa fa-circle-o"></i>${child.menu_name }</a></li>
												</c:forEach>
											</ul>
										</c:if></li>
								</c:forEach>
							</ul>
						</c:if></li>
				</c:forEach>
			</c:if>
		</ul>
	</section>
</aside>


<aside class="main-sidebar">
	<section class="sidebar">
		<ul class="sidebar-menu">
			<li class="header">功能菜单</li>


			<li class="treeview" ref="3879">
				<a href="javascript:void(0)">
					<i class="fa fa-circle-o text-green"></i> <span>工作流程</span> 
					<i class="fa fa-angle-left pull-right"></i>
				</a>
				<ul class="treeview-menu" style="display: none;">

					<li><a href="javascript:gotopage('xinjiangongzuo','3881')"><i
							class="fa fa-circle-o"></i> 新建工作 </a></li>

					<li><a href="javascript:gotopage('daibangongzuo','3882')"><i
							class="fa fa-circle-o"></i> 待办工作 </a></li>

					<li>
						<a href="javascript:gotopage('wanjiegongzuo','3883')">
							<i class="fa fa-circle-o"></i> 完结工作
						</a>
					</li>

				</ul>
			</li>

			<li class="treeview " ref="3880">
				<a href="javascript:void(0)"onclick="gotopage('jigouliebiao','3880')"> 
					<i class="fa fa-circle-o text-green"></i><span>机构列表</span>
				</a>
			</li>

			<li class="treeview  active" ref="3938"><a
				href="javascript:void(0)"> <i class="fa fa-circle-o text-green"></i>
					<span>菜单名称</span> <i class="fa fa-angle-left pull-right"></i>

			</a>


				<ul class="treeview-menu menu-open" style="display: block;">

					<li class="active">
						<a href="javascript:gotopage('','3939')">
							<i class="fa fa-circle-o"></i> 子项名称 
							<i class="fa fa-angle-left pull-right"></i> 
						</a>

						<ul class="treeview-menu menu-open" style="display: block;">

							<li><a href="javascript:gotopage('yonghuguanli','3940')"><i
									class="fa fa-circle-o"></i>用户管理</a></li>

						</ul>
					</li>

				</ul>
			</li>

			<li class="treeview " ref="3941"><a href="javascript:void(0)"
				onclick="gotopage('','3941')"> <i
					class="fa fa-circle-o text-green"></i> <span>基础信息</span>

			</a></li>

data = [Object, Object, Object, Object, Object, Object, Object, Object]
109
            {
110
                if(data!=null&&data!=""&&data.length>0){
data = [Object, Object, Object, Object, Object, Object, Object, Object]
111
                    
112
                    for(var i = 0 ; i < data.length; i++)
i = 0, data = [Object, Object, Object, Object, Object, Object, Object, Object]
113
                    {
114
                        
115
                        if(data[i].pid==null||data[i].pid=="")
data = [Object, Object, Object, Object, Object, Object, Object, Object], i = 0, pid = undefined
116
                        {
117
                            var html = "";
html = "<li class="treeview" id=tree_2549" ref="2549>	<a href="	"><i class="fa fa-circle-o text-green"></i> <span>人员管理</span><i class="fa fa-angle-left pull-right"></i>	</a><ul class="treeview-menu" style="display: none;" id="ul_2549"></ul></li>"
118
                            html+='<li class="treeview" id=tree_'+data[i].id+'" ref="'+data[i].id+'>';
data = [Object, Object, Object, Object, Object, Object, Object, Object], i = 0
119
                            html+=' <a href="';
120
                            if(data[i].dtype=="file")
data = [Object, Object, Object, Object, Object, Object, Object, Object], i = 0
121
                            {
122
                                html+=' javascript:gotopage(\''+data[i].url+'\',\''+data[i].id+'\')';
html = "<li class="treeview" id=tree_2549" ref="2549>	<a href="	"><i class="fa fa-circle-o text-green"></i> <span>人员管理</span><i class="fa fa-angle-left pull-right"></i>	</a><ul class="treeview-menu" style="display: none;" id="ul_2549"></ul></li>", data = [Object, Object, Object, Object, Object, Object, Object, Object], i = 0
123
                            }
124
                            html+=' "><i class="fa fa-circle-o text-green"></i> <span>'+data[i].menu_name+'</span>';
html = "<li class="treeview" id=tree_2549" ref="2549>	<a href="	"><i class="fa fa-circle-o text-green"></i> <span>人员管理</span><i class="fa fa-angle-left pull-right"></i>	</a><ul class="treeview-menu" style="display: none;" id="ul_2549"></ul></li>", data = [Object, Object, Object, Object, Object, Object, Object, Object], i = 0
125
                            if(data[i].dtype=="folder")
126
                            {
127
                                html+='<i class="fa fa-angle-left pull-right"></i>';
html = "<li class="treeview" id=tree_2549" ref="2549>	<a href="	"><i class="fa fa-circle-o text-green"></i> <span>人员管理</span><i class="fa fa-angle-left pull-right"></i>	</a><ul class="treeview-menu" style="display: none;" id="ul_2549"></ul></li>"
128
                            }
129
                            html+=' </a>'
html = "<li class="treeview" id=tree_2549" ref="2549>	<a href="	"><i class="fa fa-circle-o text-green"></i> <span>人员管理</span><i class="fa fa-angle-left pull-right"></i>	</a><ul class="treeview-menu" style="display: none;" id="ul_2549"></ul></li>"
130
                            if(data[i].dtype=="folder")
data = [Object, Object, Object, Object, Object, Object, Object, Object], i = 0
131
                            {
132
                                html+='<ul class="treeview-menu" style="display: none;" id="ul_'+data[i].id+'">';
html = "<li class="treeview" id=tree_2549" ref="2549>	<a href="	"><i class="fa fa-circle-o text-green"></i> <span>人员管理</span><i class="fa fa-angle-left pull-right"></i>	</a><ul class="treeview-menu" style="display: none;" id="ul_2549"></ul></li>", data = [Object, Object, Object, Object, Object, Object, Object, Object], i = 0
133
                                
134
                                html+='</ul>'
html = "<li class="treeview" id=tree_2549" ref="2549>	<a href="	"><i class="fa fa-circle-o text-green"></i> <span>人员管理</span><i class="fa fa-angle-left pull-right"></i>	</a><ul class="treeview-menu" style="display: none;" id="ul_2549"></ul></li>"
135
                            }
136
                            html+='</li>';
html = "<li class="treeview" id=tree_2549" ref="2549>	<a href="	"><i class="fa fa-circle-o text-green"></i> <span>人员管理</span><i class="fa fa-angle-left pull-right"></i>	</a><ul class="treeview-menu" style="display: none;" id="ul_2549"></ul></li>"
137
                            sidebarMenu.append(html);
138
                        }
139
                        else
140
                        {
141
                            var html="";
142
                            html+='<li class="treeview">';
143
                            html+='<a href="';
144
                            
145
                            if(data[i].dtype=="file")
146
                            {
147
                                html+='javascript:gotopage(\''+data[i].url+'\',\''+data[i].id+'\')';
148
                            }
149
                            html+='"><i class="fa fa-circle-o"></i>' + data[i].menu_name;
150
                            if(data[i].dtype=="folder")
151
                            {
152
                                html+='<i class="fa fa-angle-left pull-right"></i>';
153
                            }

Line 137, Column 10

Sources
Content scripts
Snippets

top
localhost:8088
zhongguozhongtie


Pause On Caught Exceptions
Watch


$("#"+formid).find(".form-control[othertablename][othertablecolumn],.cbinput[othertablename][othertablecolumn]"): <not available>
$("#"+formid).find(".form-control[othertablename][othertablecolumn],.cbinput[othertablename][othertablecolumn]").length: <not available>
$("#"+formid).find(".form-control[othertablename][othertablecolumn],.cbinput[othertablename][othertablecolumn]").length: <not available>
$("#add"): n.fn.init
data[0]: Object
data: Array[8]
$("#"+formID).attr("onload"): <not available>
$("#"+formID).load();: <not available>
e: <not available>
$("#"+formID).find(".fileupload"): <not available>
formID: <not available>
$("#"+formID).find(".fileupload"): <not available>
$("#add").find(".fileupload"): n.fn.init[0]
$("#add").find(): n.fn.init[0]
$("#add").find("#fileQueue_0"): n.fn.init[0]
$("#add").find("#fileQueue_0"): n.fn.init[0]
basePath: "/zhongguozhongtie"
$("#" + formID).find(".fileupload"): <not available>
$("#" + formID).find(".fileupload"): <not available>
$("#" + formID).find(".fileupload"): <not available>
$('button[data-target]'): n.fn.init[0]
e: <not available>
Call Stack
index.htm:137
(anonymous function)
jQuery-2.1.4.min.js:2
j
jQuery-2.1.4.min.js:2
fireWith
jQuery-2.1.4.min.js:4
x
jQuery-2.1.4.min.js:4
(anonymous function)
Scope
Local
data
:
Array[8]
html
:
"<li class="treeview" id=tree_2549" ref="2549>	<a href="	"><i class="fa fa-circle-o text-green"></i> <span>人员管理</span><i class="fa fa-angle-left pull-right"></i>	</a><ul class="treeview-menu" style="display: none;" id="ul_2549"></ul></li>"
i
:
0
pid
:
undefined
str
:
undefined
this
:
Object
v
:
undefined
Closure
Window
Global
Breakpoints
No Breakpoints
DOM Breakpoints
XHR Breakpoints

Event Listener Breakpoints
Event Listeners



<div class="form-group">
                    <label>Minimal</label>
                    <select class="form-control select2" style="width: 100%;">
                      <option selected="selected">Alabama</option>
                      <option>Alaska</option>
                      <option>California</option>
                      <option>Delaware</option>
                      <option>Tennessee</option>
                      <option>Texas</option>
                      <option>Washington</option>
                    </select>
                  </div>





Async
"<li class="treeview" id=tree_2549" ref="2549>	<a href="	"><i class="fa fa-circle-o text-green"></i> <span>人员管理</span><i class="fa fa-angle-left pull-right"></i>	</a><ul class="treeview-menu" style="display: none;" id="ul_2549"></ul></li>"
		</ul>
	</section>
</aside>
</html>