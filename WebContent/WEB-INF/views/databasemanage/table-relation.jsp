<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="rootBath" value="<%=request.getContextPath() %>"></c:set>
<link rel="stylesheet" href="${rootBath}/css/home/css/table-relation.css">
<script type="text/javascript" src="${rootBath}/js/datadetail.js"></script>
<script type="text/javascript" src="${rootBath}/js/custom/views/control/TableRelation.js"></script>
  <div class="row">
      <div class="col-md-3" style="padding-right: 0px;">
        <div class="box box-primary" id="conternbodyLeft" style="margin-bottom: 0px; border-left: 1px solid #d2d6de; border-right: 1px solid #d2d6de; border-bottom: 1px solid #d2d6de;">
          <div class="box-header with-border">
            <h3 class="box-title" style="font-weight: normal;">选择数据表</h3>
          </div>
          <div id="box-body" class="box-body no-padding" style="height: 267px; overflow-x: hidden; overflow-y: auto;">
            <ul class="nav nav-pills nav-stacked">
              <c:forEach var="table" items="${allTables}">
                <c:if test="${tableName != table.table_name}">
                  <li style="padding: 10px;">
                    <div class='checkbox' style="margin: 0px;">
                      <label>
                         <input type='checkbox' name='selectedTables' tableid="${table.id}" onclick='tableRelation.tableClick(this)' value='${table.table_name}'>${table.table_alias }

                      </label>
                    </div>
                  </li>
                </c:if>
              </c:forEach>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="box box-primary" id="conternbodyright" style="margin-bottom: 0px; overflow: hidden;  margin-bottom: 0px; border-left: 1px solid #d2d6de; border-right: 1px solid #d2d6de; border-bottom: 1px solid #d2d6de;">
          <div class="box-header with-border">
            <h3 class="box-title" style="font-weight: normal;">关联表设计</h3>
          </div>
          <div id="table_content" class="box-body no-padding tablecontent">
            <div id="tablebody" style="width:10000px; height: 250px;"></div>
          </div>
        </div>
      </div>
  </div>

<div class="row" style="margin-top: 15px;">
  <div class="col-md-12 trlation-body">
    <div class="box box-primary" style="margin-bottom: 0px; border-left: 1px solid #d2d6de; border-right: 1px solid #d2d6de; border-bottom: 1px solid #d2d6de;">
      <div class="box-header with-border">
        <h3 class="box-title" style="font-weight: normal;">表关联关系</h3>
        <div class="box-tools pull-right">
          <button onclick="tableRelation.initRelationColumns()" id="reflation_table" class="btn btn-primary btn-sm">添加关联</button>
          <button onclick="tableRelation.deleteRelationColumns()" id="del_tables" class="btn btn-primary btn-sm">删除</button>
        </div>
      </div>
      <div id="relation_columns" class="box-body" style="height: 190px; overflow-y: auto; overflow-x: hidden">
        <table id="relationTable" width="100%" class="table table-bordered table-hover dataTable">
          <tr>
            <th width="20%">数据表</th>
            <th width="20%">字段</th>
            <th width="20%">关联数据表</th>
            <th width="20%">字段</th>
            <th width="20%">关联方式</th>
          </tr>
        </table>
      </div>
      </div>
    </div>
 </div>


