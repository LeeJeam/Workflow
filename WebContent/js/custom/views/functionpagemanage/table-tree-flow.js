var TableTree = {
    init: function () {
        $('#treeTable').change(function () {TableTree.treeBindTable()}); //绑定树表名和显示的字段到表格上
        TableTree.clickTree();
        TableTree.changeColumns();
    },
    changeColumns: function () {
        $('#showColumns').change(function () {
            var val = $('#showColumns option:selected').val();
            $("#ztree").attr("name",val + " name");
            $("#ztree").attr("nameVal",val);
        });
        $("#relaColumns").change(function () {
            var val = $('#relaColumns option:selected').val();
            $("#ztree").attr("pid",val + " pId");
            $("#ztree").attr("pidVal",val);
        });
        $('#queryColumns').change(function () {
            var val = $('#queryColumns option:selected').val();
            $("#ztree").attr("queryCo",val);
        });
    },
    clickTree: function () {
        $('#ztree').click(function () {
            switchTable('dataBind','queryWhere');

            TreeControl.init();

            var tableId = $('#ztree').attr('tableid');

            if(!!tableId) {

                TableTree.setTreeColumns(tableId);
            }



        });
    },
    treeBindTable: function () {
        var tableId = $('#treeTable option:selected').val();
        var tableName = $('#treeTable option:selected').attr('ref');

        $('#ztree').attr('tablename',tableName);
        $('#ztree').attr('tableid',tableId);

        TableTree.setTreeColumns(tableId);
    },
    setTreeColumns: function (tableId) {
        if(!!tableId) {
            $('#treeTable').val(tableId);
            $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm',{tableId:tableId}, function (data) {
                if(data.success) {
                    $('#showColumns').empty();
                    $('#relaColumns').empty();
                    var rows = data.rows;
                    var options = '<option></option>';
                    for(var i =0;i<rows.length;i++) {
                        options += '<option value="'+rows[i].filed_name+'">'+rows[i].column_alias+'</option>';
                    }
                    $('#showColumns').append(options);
                    $('#relaColumns').append('<option value="pid">父级主键</option>');

                    var name = $("#ztree").attr("nameVal");
                    var pid = $("#ztree").attr("pidVal");
                    var selectC = $('#ztree').attr('queryCo');
                    $('#showColumns').val(name);
                    $('#relaColumns').val(!!pid ? pid : "pid");
                    $('#relaColumns').change();
                    $('#queryColumns').val(selectC);
                }
            },null,'false'); //从数据库中查询表，除自己以外的表
        }
    }
};

$(function () {
    TableTree.init();
});

