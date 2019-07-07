var GetTablesUtils = function () {

    var currentThis;

    var setTableCheckedCss= function () {
        $("#baseTable tr td").find("span").hide();
        $("#baseTable tr td").click(function (){
            $("#baseTable tr").attr("class","").css("color","#333").find("span").hide();
            $(this).parents("tr").addClass("activeTh").css("color","#fff").find("span").show().css("color","#fff");
        });
    };

    var getTableHtml = function ($this) {
        var content = getTableModalContent();
        var btns = [{"form_btn_cance":'取消'},{'form_btn_save':'保存'}];
        var btnsClcik = ['data-dismiss="modal"','onclick = "GetTablesUtils.addTables(this)"'];
        var modal = BaseControl.getPopWindowHtml('getTable',content,btns,btnsClcik);
        $(".wrapper").after(modal);
        $("#getTable").find(".modal-title").text("选择数据表");

        dataType.loadLeftTypeInfo('datasource',$("#type"),PageTable.loadTableData,true,'','false');
        dataType.searchEvent('datasource',true);
        setTableCheckedCss();
        currentThis = $this;
        $("#getTable").modal('show');


    };

    var setStyle = function () {
        var var0 = [];
        var0.push('<style type="text/css">');
        var0.push('.activeTh {background: #337ab7;}');
        var0.push('#baseTable tr td {cursor:pointer;}');
        var0.push('</style>');
        return var0.join('');
    };


    var getTableModalContent = function () {
        var9 = [];
        var9.push('<div style="height:340px;margin-top: 10px;overflow: hidden;">');
        var9.push(setStyle());
        var9.push(  '<div class="row">');

        var9.push(  '<div class="col-md-4" style="padding-left: 0px; padding-right: 0px;">');
        var9.push(      '<ul id="type" class="nav nav-pills nav-stacked" style="border: 1px solid #ccc; height: 340px; overflow-y: auto;"></ul>');
        var9.push(  '</div>');

        var9.push(  '<div class="col-md-8" style="padding-right: 0px; padding-left: 10px;">');
        var9.push(      '<div class="input-group" style="margin-bottom: 10px;">');
        var9.push(          '<input id="new-event" type="text" class="form-control input-sm" placeholder="请输入页面名称">');
        var9.push(          '<div class="input-group-btn">');
        var9.push(              '<button id="add-new-event" type="button" class="btn btn-primary btn-flat btn-sm">搜索</button>');
        var9.push(          '</div>');
        var9.push(      '</div>');
        var9.push(      '<div style="height: 300px; overflow-y: auto; border: 1px solid #ccc;">');
        var9.push(          '<table id="baseTable" class="table" style="margin-bottom: 0px;"><tbody></tbody></table>');
        var9.push(      '</div>');
        var9.push(  '</div>');

        var9.push(  '</div>');
        var9.push(  '</div>');

        return var9.join('');
    };




    return {
        init: function ($this) {
            getTableHtml($this);

        },
        setTablesName : function ($this,attr) {
            var attr = !!attr ? attr : 'data-readtable';
            var readTable = $('.hasFocus2').attr(attr);
            if(!!readTable) {
                $.getAjaxData(baseUrl + '/createDataTable/getTables.htm',{tablename:readTable}, function (data) {
                    if(data.success){
                        $this.val(data.rows[0].table_alias);
                        $this.attr('data-tablename',data.rows[0].table_name);
                        $this.attr('data-tableId',data.rows[0].id);
                        $this.change();
                    }
                });
            }
        },
        addTables: function ($this) {
            var modal = $($this).parents(".modal");
            var tr = modal.find("#baseTable tr[class='activeTh']");
            var isOk = tr.length > 0 ? true : false;
            if(isOk) {
                var tableid = tr.attr('tableid');
                if(!!tableid) {
                    currentThis.attr('data-tablename',tr.attr('data-tablename'));
                    currentThis.attr('data-tableid',tableid);
                    currentThis.val(tr.find("td:eq(0)").text());
                    currentThis.change()
                } else {
                    currentThis.removeAttr('data-tableid');
                    currentThis.removeAttr('data-tablename');
                    currentThis.val('');
                    currentThis.parents(".prop-mg-lr").nextAll('.prop-mg-lr').remove();

                    $(".hasFocus2").removeAttr('data-readcolumn');
                    $(".hasFocus2").removeAttr('data-readtable');
                }

            }
            $(modal).find("#form_btn_cance").click();

        }
    }
}();