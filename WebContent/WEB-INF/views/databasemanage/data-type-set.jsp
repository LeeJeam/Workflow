<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>

<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
      <h4 class="modal-title">设置类型</h4>
    </div>
    <div id="modelBody" class="modal-body" style="height: 400px; overflow-y: auto;">
      <table class="table table-striped table-hover" id="dataTypeTable">
        <thead>
          <tr><th width="10%">编号</th><th width="35%">分类名称</th><th width="35%">创建时间</th><th width="20%">操作</th></tr>
        </thead>
        <tbody></tbody>
        <tfoot>
        <tr>
          <td colspan="6" class="text-center"><a id="addItems" onclick="dataType.createTr()" href="#">添加一项</a></td>
        </tr>
        </tfoot>
      </table>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary btn-sm" onclick="dataType.saveTypeInfo(this)">提交</button>
      <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
    </div>
  </div>
</div>

</body>
</html>
