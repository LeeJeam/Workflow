function TableColumnControl(){
    this.isStart = true;
};

var columnsControl = new TableColumnControl();

TableColumnControl.prototype.initHTMLLabel = function (_this) {
    BaseControl.propertyHide(".quality,.quality_contern",'#tableColumnValue');
    $("#worktable thead tr").find('th').removeClass('columnsSelected');
    $(_this).addClass('columnsSelected');

    $('#tableColumnValue').empty()
        .append(BaseControl.getLabelHtml("关联字段",$(_this).attr('column-name')))
        .append(BaseControl.getInput("列标题","columnsTitle"))
        .append(BaseControl.getSelect("数据源","columnsRelationTable"))
        .append(BaseControl.getSelect("显示字段",'columnsRelationColumn'));

    $("#columnsTitle").val($(_this).text());


    columnsControl.inputKeyUp();
    columnsControl.loadTables();
};

TableColumnControl.prototype.inputKeyUp = function () {
    $('#columnsTitle').keyup(function () {
        var val = $(this).val();
        $("#worktable thead tr").find('.columnsSelected').text(val);
    });
};

TableColumnControl.prototype.loadTables = function () {
    $.getAjaxData(basePath + '/createDataTable/getTables.htm', {}, function (data) {
        var options = BaseControl.getOptions(data, new Array("table_name", "id", "table_alias"));
        $('#columnsRelationTable').empty().append(options);

        var tablename = $("#worktable thead tr").find('.columnsSelected').attr('tablename');
        if(!!tablename) {
            $('#columnsRelationTable').val(tablename);
            $('#columnsRelationTable').change();
        }
    });

    $("#columnsRelationTable").change(function () {
        $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: $('#columnsRelationTable option:selected').attr('ref')}, function (data) {
            var options = BaseControl.getOptions(data, new Array("filed_name", "filed_name", "column_alias"));
            $("#columnsRelationColumn").empty().append(options);
            var columnname = $("#worktable thead tr").find('.columnsSelected').attr('columnname');
            if(!!columnname) {
                $('#columnsRelationColumn').val(columnname);
            }

        });
        $("#worktable thead tr").find('.columnsSelected').removeAttr('tablename').attr("tablename",$("#columnsRelationTable option:selected").val());
    });

    $("#columnsRelationColumn").change(function () {
        $("#worktable thead tr").find('.columnsSelected').removeAttr('columnname').attr("columnname",$("#columnsRelationColumn option:selected").val());
    })

};

TableColumnControl.prototype.init = function () {
    $("#worktable thead tr").delegate('th','click', function () {
        columnsControl.initHTMLLabel(this);
    });
};



$(function () {
    if(columnsControl.isStart) {
        columnsControl.init();
    }
});


