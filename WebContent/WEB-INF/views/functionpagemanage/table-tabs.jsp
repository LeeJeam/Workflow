<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/common/taglib.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
  String rootPath = request.getContextPath();
  String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + rootPath + "/";
%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <title>创建表格</title>
  <link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="<%=rootPath %>/UILib/font-awesome4/css/font-awesome.min.css">
  <link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/skins/_all-skins.min.css">
  <link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/jquery-loadmask/jquery.loadmask.css">
  <link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
  <link rel="stylesheet" href="<%=rootPath %>/UILib/bootstrapValidator/css/bootstrapValidator.min.css">
  <link rel="stylesheet" href="<%=rootPath %>/UILib/dist/css/AdminLTE.css">
  <link rel="stylesheet" href="<%=rootPath %>/css/reset.css">
  <link rel="stylesheet" href="<%=rootPath %>/css/change.css">
  <link rel="stylesheet" href="<%=rootPath %>/js/file/uploadify.css">
  <link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/zTree/zTree/zTreeStyle/zTreeStyle.css">
  <script type="text/javascript" src="<%=rootPath %>/UILib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/UILib/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/UILib/bootstrap/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/UILib/plugins/zTree/jquery.ztree.core-3.5.min.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/UILib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/UILib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/custom/views/functionpagemanage/flow/date.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/custom/views/functionpagemanage/table-flow.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/custom/views/releasesmanage/button.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/UILib/bootstrapValidator/js/bootstrapValidator.min.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/datadetail.js"></script>
  <style>
    .pitch {clear: both; width: 100%; overflow: hidden; margin-top: 5px; }
    .pitch .pitchContent { background: #ffffff; border: #dadada 1px solid; padding: 4px 14px; position: relative; margin-bottom: 1px; color: #333; overflow: hidden; font-size: 12px; }
    .pitch .pitchContent a { position: absolute; right: 5px; top: 5px;}

    #worktable thead th:hover { cursor: move; opacity: 0.8; background: #cccedb;}

    .type_table { width: 100%;}
    .type_table th { font-size: 12px; padding: 3px;}
    .type_table td { font-size: 12px; padding: 3px; vertical-align: middle;}
    .type_table td select { padding: 3px 3px;}
    .type_table td i { cursor: pointer; color: red;}
    .conternt_title { margin:10px 0px 10px 0px; padding: 0px; text-align: center; overflow: hidden;}
    .conternt_title li { list-style: none; float: left; font-size: 12px; background: #d3d3d3; padding: 3px 5px; border: 1px solid #b9b9b9; }
    .conternt_title li:hover { border: 1px solid #3c8dbc; background: #ccebf8;}
    .conternt_title li.active { border: 1px solid #3c8dbc; background: #ccebf8;}
    .conternt_title li a { color: #000000; font-size: 12px;}
    .conternt_body div { display: block;}
    .label_property {padding-top: 5px !important;    font-weight: normal;text-align: right;    margin-bottom: 0;  width:35%;    overflow: hidden;    text-align: left;}
  </style>
  <link rel="stylesheet" href="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.css">
  <script src="<%=rootPath %>/UILib/plugins/datatables/jquery.dataTables.min.js"></script>
  <script src="<%=rootPath %>/UILib/plugins/datatables/dataTables.bootstrap.min.js"></script>

  <script src="<%=rootPath %>/js/common.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/BaseControl.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/TableControl.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/TableColumnControl.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/TableTabsControl.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/form/FormLayoutControl.js"></script>
  <script type="text/javascript" src="<%=rootPath%>/js/header-page/PageTable.js"></script>

  <script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/CreateTableJS.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/custom/views/control/DateControl.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/header-page/CustomerType.js"></script>
  <script type="text/javascript" src="<%=rootPath %>/js/Menu.js"></script>

  <script type="text/javascript" src="<%=rootPath %>/js/header-page/HeaderPage.js"></script>
  <script type="text/javascript">
    var tabsTables = new TableTabsControl();
    var i = 0;
    $(document).ready(function () {
      tabsTables.init();

      setHeight(new Array('conternbodyRight', 'conternbodyCentern', 'conternbodyLeft'), (51 + 0 + 50 + 15 + 64));
      setHeight(new Array('tableContent'), (51 + 0 + 50 + 15 + 15 + 50));
      $(".caret_title").click(function (event) {
        event.stopPropagation
        if (i / 1 == 0) {
          $(this).next(".caret_contern").slideUp(200);
          $(this).find("i").attr("class", "fa fa-caret-right");
          i++;
        } else {
          i = 0;
          $(this).next(".caret_contern").slideDown(200);
          $(this).find("i").attr("class", "fa fa-caret-down");
        }
      });
      $(".quality_contern:eq(0)").show();
      $(".quality").click(function () {
        if ($(this).find("i.fa-caret-right").length == 0) {
          $(this).next(".quality_contern").slideUp(200);
          $(this).find("i").attr("class", "fa fa-caret-right");
        } else {
          $(this).next(".quality_contern").slideDown(200);
          $(this).find("i").attr("class", "fa fa-caret-down");
        }
      });
    });
  </script>
  <script type="text/javascript">
    var basePath = '<%=rootPath %>';
    var baseUrl = basePath;
    var projectId = '${projectId}';
    var pid = '${pid}';
    var isEdit = false;
    var tableId = '${tableId}';
  </script>
</head>
<body class="hold-transition skin-blue layout-top-nav sidebar-mini">
<div class="wrapper">
  <jsp:include page="/common/header.jsp"></jsp:include>
  <div class="content-wrapper">
    <section class="content" style="padding: 15px 4px 0;">
      <div class="row">
        <div class="col-md-2" style=" padding-right: 0px;">
          <div class="box box-primary" style="margin-bottom: 0px;">
            <div class="box-header with-border">
              <h3 class="box-title">基础信息</h3>
            </div>
            <div class="box-body" id="conternbodyLeft" style="overflow-y: auto; overflow-x: hidden;">
              <div class="text-red">页面关联的数据表: ${tableName}</div>
              <div class="form-group-prop">
                <div class="controls">
                  <%--<select id="tableName" class="form-control magT input-sm"
                          onchange="changeTablePageConfig()">
                      <c:forEach items="${allTables}" var="row" varStatus="status">
                          <option value="${row.id}"
                                  <c:if test="${row.table_alias == tableName}">selected</c:if>>${row.table_alias}</option>
                      </c:forEach>
                  </select>--%>
                </div>
              </div>
              <div class="caret_title"><a href="javascript:void(0);"><i class="fa fa-caret-down"></i>&nbsp;&nbsp;搜索功能</a>
              </div>
              <div class="caret_contern">
                <div id="tools" class="accordion-body collapse in">
                  <div class="accordion-inner">
                    <div class="nav nav-pills nav-stacked">
                      <div class="formControl ui-draggable" id="_TextTemplate" type="text">
                        <span class="glyphicon glyphicon-text-width"></span>&nbsp;&nbsp;输入框
                      </div>
                      <div class="formControl ui-draggable" id="_SelectTemplate" type="select">
                        <span class="glyphicon glyphicon-collapse-down"></span>&nbsp;&nbsp;下拉框
                      </div>
                      <div class="formControl ui-draggable" id="_DateTemplate" type="date">
                        <span class="glyphicon glyphicon-dashboard"></span>&nbsp;&nbsp;时间
                      </div>
                      <div class="formControl ui-draggable" id="_space" type="text">
                        <span class="glyphicon glyphicon-dashboard"></span>&nbsp;&nbsp;时间段
                      </div>
                      <div class="formControl" id="_Button" type="btn">
                        <img src="<%=rootPath %>/img/webflow/but.png">&nbsp;&nbsp;按钮
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="caret_title"><a href="javascript:void(0);"><i class="fa fa-caret-down"></i>&nbsp;&nbsp;表头设置</a>
              </div>
              <div class="caret_contern">
                <div class="form-group-prop">
                  <div class="col-lg-12" id="columnsCheckboxDiv">
                    <div class='checkbox' style="margin-top: 5px; margin-bottom: 5px;">
                      <label><input type='checkbox' name='check' onclick='columnclick(this)' value='id'>id</label>
                    </div>
                    <c:forEach items="${columns }" var="row" varStatus="status">
                      <div class='checkbox' style="margin-top: 5px; margin-bottom: 5px;">
                        <label><input type='checkbox' name='check' onclick='columnclick(this)'
                                      value='${row.filed_name}'>${row.column_alias }</label>
                      </div>
                    </c:forEach>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input type="hidden" id="ipttype" value='${type}'>
        <div id="searchdiv" class="col-md-8" style="padding-left: 5px; padding-right: 5px;">
          <c:if test="${empty content}">
            <div style="margin-bottom: 0px;">
              <div class="nav-tabs-custom" style="margin-bottom: 0px;">
                <ul id="tabs" class="nav nav-tabs"></ul>
                <div class="tab-content" id="tableContent" style="overflow: auto; padding: 10px 0;"> </div>
              </div>
            </div>
          </c:if>
          <c:if test="${content!=null}">
            ${content}
          </c:if>
        </div>
        <div class="col-md-2" style="padding-left: 0px;">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">属性--<small>表格属性</small></h3>
            </div>
            <div class="box-body" id="conternbodyRight" style="overflow-y: auto; overflow-x: hidden;">
              <div class="quality">
                <a href="javascript: void(0);"><i class="fa fa-caret-down"></i>&nbsp;&nbsp;全局属性</a>
              </div>
              <div class="quality_contern" id="modifyPage">
                <table class="type_table">
                  <thead>
                    <tr>
                      <th width="30%">添加选项</th>
                      <td width="60%"><input type="text" value="" name="" class="form-control input-sm" placeholder="请输入选项卡名称" style="height: 26px;" /></td>
                      <td width="5%"><div><i class="fa fa-plus" onclick="tabsTables.addTabs(this)"></i></div></td>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
                <div class="conternt_type">
                  <ul class="conternt_title"></ul>
                  <div class="conternt_body"></div>
                </div>
              </div>




              <div class="quality hide"><a href="javascript: void(0);"><i class="fa fa fa-caret-right"></i>&nbsp;&nbsp;操作按钮</a></div>
              <div class="quality_contern hide" id="modifyBtn"> </div>

              <div class="quality hide"><a href="javascript: void(0);"><i class="fa fa-caret-right"></i>&nbsp;&nbsp;功能事件</a></div>
              <div class="quality_contern hide" id="modifyFunction"></div>

              <div class="quality hide"><a href="javascript: void(0);"><i class="fa fa-caret-right"></i>&nbsp;&nbsp;搜索功能</a></div>
              <div class="quality_contern hide" id="modifySearch"></div>

              <div class="quality hide"><a href="javascript: void(0);"><i class="fa fa-caret-right"></i>&nbsp;&nbsp;控件事件</a></div>
              <div class="quality_contern hide" id="labelEvent"></div>

              <div class="quality hide"><a href="javascript: void(0);"><i class="fa fa-caret-right"></i>&nbsp;&nbsp;列值设置</a></div>
              <div class="quality_contern hide" id="tableColumnValue"></div>

              <div class="quality hide"><a href="javascript: void(0);"><i class="fa fa-caret-right"></i>&nbsp;&nbsp;温馨提示</a></div>
              <div class="quality_contern hide" id="reminder">
                <small class="text-yellow">此按钮属性系统默认按钮,不需要配置基本属性</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <jsp:include page="/common/footer.jsp"></jsp:include>
  <div class="modal fade" id="equipmentDemoAdd"></div>
</div>
</body>
</html>