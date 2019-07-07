var TableControl = {
    _rightProperty: 'tableProperty',
    tableName:'',
    _this:'',

    tableInit: function () {
        $("#searchdiv").click(function (event) {
            var target = $(event.target);
            var type = !!$(target).attr('type') ? $(target).attr('type') : $(target).parents('button,div').attr('type');
            if((typeof(type) == 'undefined' &&　target.get(0).localName != 'th') || $(target).attr('id') == 'removeMenu') {
                BaseControl.propertyHides(".quality,.quality_contern",new Array("#modifyPage","#leftTree","#pageBtnSet","#tableConnectSet"));
                TableControl.loadTreeProperty();
                ModifyBtnProperty.setBtnCheckIsSelected();
                $('#modifyTitle').val($('#tabletitle').text());
                $('#modifyTreeTitle').val($('.modify-label').text());


            }
        });

        $("#searchTitle").after('<span class="join">--</span><small class="small-title">请拖动搜索功能的控件</small>');
        $("#tabletitle").after('<span class="join">--</span><small class="small-title">请勾选表头设置下的复选框试试</small>');


        TableControl.loadTreeProperty();
        $('#modifyTitle').val($('#tabletitle').text());
        $('#modifyTreeTitle').val($('.modify-label').text());

        TableControl.modifyTableHeaderColumns();

    },
    searchAreaSelectedEvent: function () {
        $("#searchForm").delegate('.col-md-2,.col-md-3,.col-md-4','click', function () {
            var $this = $(this);
            $("#worktable thead th.has-error").removeClass("has-error");
            if (!$this.hasClass("has-error")) {
                $this.siblings().removeClass("has-error");
                $this.addClass("has-error");
                var value = $this.find("label").text();
                var $control = $this.find(".form-control");
                var type = $control.attr("data-role");
                var name = $control.attr("name");
                ModifySearchProperty.clickEvent();
            }
        });
    },
    modifyTableTitle: function ($this) {
        var val = $($this).val();
        $('#tableContent').find('#tabletitle').text(val);
    },
    modifyTreeTitle: function ($this) {
        var val = $($this).val();
        $('#treeTitleSpan').text(val);
    },
    loadTreeProperty: function () {
        if($("#conternbodyCentern").length > 0) {
            $("#leftTree").empty()
                .append(BaseControl.getInput("树形标题","modifyTreeTitle"))
                .append(BaseControl.getSelect("数据源","treeDataSource"))
                .append(BaseControl.getSelect("显示字段","displayColumn"))
                .append(BaseControl.getSelect("关联查询","searchColumn"))
            ;

            $("#modifyTreeTitle").keyup(function(){TableControl.modifyTreeTitle(this)});

            $.getAjaxData(basePath + '/createDataTable/getTables.htm', {tableType:'2'}, function (data) {
                var options = BaseControl.getOptions(data, new Array("table_name", "id", "table_alias"));
                $('#treeDataSource').empty().append(options);

                var tableName = $("#ztree").attr("tablename");
                if(!!tableName) {
                    $('#treeDataSource').val(tableName);
                    $("#treeDataSource").change();
                }
            });

            $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: tableId}, function (data) {
                var options = BaseControl.getOptions(data, new Array("filed_name", "filed_name", "column_alias"));
                $("#searchColumn").empty().append(options);

                var searchColumn = $("#ztree").attr("searchColumn");
                if(!!searchColumn) {
                    if(searchColumn != 'none') {
                        $('#searchColumn').val(searchColumn);
                    }
                }
            });

            $("#searchColumn").change(function () {
                var searchColumn = $('#searchColumn option:selected').val();
                $("#ztree").removeAttr('searchColumn').attr("searchColumn",searchColumn);
            });

            $('#treeDataSource').change(function() {
                var tableName = $('#treeDataSource option:selected').val();
                if(tableName != 'none') {
                    $("#ztree").attr("tableName",tableName);
                }


                $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: $('#treeDataSource option:selected').attr('ref')}, function (data) {
                    var options = BaseControl.getOptions(data, new Array("filed_name","filed_name", "column_alias"));
                    $("#displayColumn").empty().append(options);

                    var displayColumn = $("#ztree").attr("displayColumn");
                    if(!!displayColumn) {
                        $('#displayColumn').val(displayColumn);
                    } else {
                        $("#displayColumn").val("name");
                        var tableName = $('#displayColumn option:selected').val();
                        $("#ztree").attr("displayColumn",tableName);
                    }

                    $("#displayColumn").change(function () {
                        var tableName = $('#displayColumn option:selected').val();
                        $("#ztree").removeAttr('displayColumn').attr("displayColumn",tableName);
                    });
                });
            });


        }
    },

    modifyTableHeaderColumns:function () {
        $("#worktable thead tr").delegate('td','click',function(){

        });
    },
    loadConfig: function ($this) {
        $(".quality,.quality_contern").hide();
        $('#tableProperty').prev().show();
        $('#tableProperty').show();

        $("#tableProperty").empty()
            .append(BaseControl.getInput("表格标题",'form_tableTitle'))
            .append(BaseControl.getSelect('数据源', 'tableDataSource'));

        $('#form_tableTitle').val($("#tableTitle").text());
        $('#form_tableTitle').keyup(function() {
            var val = $(this).val();
            $("#tableTitle").text(val);
        });

        $.getAjaxData(basePath + '/createDataTable/getTables.htm', {}, function (data) {
            var options = BaseControl.getOptions(data, new Array("table_name", "id", "table_alias"));
            $('#tableDataSource').empty().append(options);

            TableControl.tableName = $($this).find('#worktable').attr('data-tableName');

            if(!!TableControl.tableName) {
                $('#tableDataSource').val(TableControl.tableName);
                $('#tableDataSource').change();
            }
        });

        //数据源修改事件
        $('#tableDataSource').change(function () {TableControl.dataSourceChangeEvent();});


        $("#tableProperty").slideDown("slow");
        $("#tableProperty").prev().find("i").attr("class", "fa fa-caret-down");


    },
    dataSourceChangeEvent: function (flag) {
        $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: $('#tableDataSource option:selected').attr('ref')}, function (data) {
            var options = BaseControl.getCheckbox("数据字段", 'columns', data.rows, new Array("filed_name", "column_alias"));
            $('#columns').remove();

            $('.hasFocus').find("#worktable").attr('data-tableName',$('#tableDataSource option:selected').val());
            $('#tableProperty').append(options);

            if(!TableControl.tableName) {
                $('.hasFocus').find("#worktable thead tr").empty();
            } else { //设置是否选中
                $('.hasFocus').find("#worktable thead tr th").each(function () {
                    var columnName = $(this).attr('column-name');
                    $('input[type="checkbox"][value="'+columnName+'"]').attr('checked',true);
                });
            }
        });
    },
    columnclick: function (c) {
        var check = c.checked;
        var list = $('.hasFocus').find("#worktable thead th");
        var value = c.value;
        var text = c.nextSibling.data;
        if (check) {
            $('.hasFocus').find("#worktable thead tr").append("<th id='" + value + "' column-name='" + value + "'>" + text + "</th>");

            var arry = new Array();
            $("#worktable thead tr th").draggable({
                axis: "x",
                cursor: 'move',
                revert:'valid',
                start: function (event) {
                    moveEle = event.target;
                    var th = $("#worktable thead tr th");
                    for (var i = 0; i < th.length; i++) {
                        arry.push($(th[i]).offset().left);
                    }
                },
                stop: function (event, ui) {
                    var location = ui.offset.left;//获取移动到当前的位置
                    for (var i = 0; i < arry.length; i++) { //获取当前需要移动的为位置
                        if (arry[i] < location) {
                            index = i;
                        }
                    }
                    var currentMove = $(event.target); //移动的元素
                    var afterth = $("#worktable thead tr th").eq(index); //被移动的元素

                    var index1 = $("#worktable thead tr th").index($(currentMove));
                    var index2 = $("#worktable thead tr th").index($(afterth));
                    if(index1 > index2) {
                        $(currentMove).insertBefore(afterth);
                    } else {
                        $(currentMove).insertAfter(afterth);
                    }

                    var th = $("#worktable thead tr th");
                    for (var i = 0; i < th.length; i++) {
                        if (i == 0) {
                            $(th[i]).css('left', '0px');
                        } else {
                            $(th[i]).css('left', '0px');
                        }
                    }
                    arry = new Array();
                }
            });
        } else {
            for (var i = 0; i < list.length; i++) {
                if (list[i].innerHTML.trim() == text) {
                    list[i].remove();
                }
            }

        }
    },
    deleteLabel : function () {
        var fromId = $(".isSelected").attr('formid');
        $("#"+fromId).remove();
        $(".isSelected").remove();

        $(".cutActive").parents('.col-md-2,.col-md-3').remove();
        $(".cutActive").parents('.col-md-4').remove();
    }
};

/****
 *
 * @type
 * {
 *  {
 *      clickEvent: Function,
 *      setSelectDataSource: Function,
 *      setTableName: Function,
 *      setColumnName: Function,
 *      getModifyQueryName: Function,
 *      modifyQueryName: Function,
 *      initSelectColumns: Function,
 *      selectGetColumnsChange: Function
 *  }
 *}
 */
var ModifySearchProperty = {
    clickEvent: function () {
        BaseControl.propertyHides(".quality,.quality_contern",new Array("#modifySearch","#labelEvent"));

        var columns = BaseControl.getSelect('选择列名', 'getColumns');
        var modify = BaseControl.getInput("名称修改",'modifySelectName');
        $('#modifySearch').empty().append(columns).append(modify);


        var type = $(".cutActive").attr('data-role');
        var events;

        if(type == 'datetime')
        {
            dateControl.setDateFormat($("#modifySearch"),'where');
            events = new Array("onclick","onkeyup");
        }
        else if(type == 'text')
        {
            var data = [{"":""},{"=":"等于"},{">":"大于"},{">=":"大于等于"},{"<":"小于"},{"<=":"小于等于"},{"like":'模糊查询'}];
            dateControl.addSearchWhereHtml($("#modifySearch"),data);
            var where = $(".hasFocus").find('input').attr("where");
            if(!where) {
                $("#where option[value='like']").attr("selected",true);
            }
            events = new Array("onclick","onkeyup");

        }
        else if(type == 'start' || type =='end')
        {
            dateControl.setDateFormat($("#modifySearch"));
            events = [];
            $("#labelEvent").addClass("hide");
            $("#labelEvent").prev().addClass("hide");
        }
        else if(type == 'select')
        {
            events = new Array("onchange");
        }

        $("#labelEvent").empty();
        for(var i = 0;i < events.length;i++) {
            var eleId = events[i]+'-select';
            var label = events[i];
            $("#labelEvent").append(BaseControl.getSelect(label,eleId,new Array("method")));

            /// /添加值改变事件
            $("#"+events[i]+'-select').change(function(){
                var id = $(this).attr('id');
                var va = $(this).val();
                var ids = id.split('-');

                var ref = $('.cutActive').attr("ref-"+ids[0]);
                var val = $(this).val();

                if(!ref || !(!!ref && ref.indexOf(val) > -1)) {
                    var html = BaseControl.getSelectedOptionHtml(va,$('#'+id+' option:selected').text(),"ModifySearchProperty.deleteSelectedMethod(this)",ids[0]);
                    $(this).after(html);

                    if(!!ref) {
                        val = $(this).val() + "," + ref;
                    }
                    $('.cutActive').attr("ref-"+ids[0],val);
                }
            });
        }


        $.post(basePath + "/formUploadOp/getFunNames.htm",{"formid": pid}, function (data) {
            for(var i = 0;i < events.length;i++) {
                if (data != null && data != "" && data.length > 0) {
                    var options = JsImport.getMethodOptions(data);
                    $("#"+events[i]+"-select").empty().append(options);


                    var refClick = $('.cutActive').attr('ref-'+events[i]);
                    if(!!refClick) {
                        var var0 =  refClick.split(',');
                        var var1 = [];
                        for(var j = 0;j < var0.length;j++) {
                            var1.push(BaseControl.getSelectedOptionHtml(var0[j],$('#'+events[i]+'-select option[value="'+var0[j]+'"]').text(),"ModifySearchProperty.deleteSelectedMethod(this)",events[i]));
                        }
                        $("#"+events[i]+"-select").after(var1.join(''));
                    }

                } else {
                    $("#"+events[i]+"-select").empty().append('<option></option>');
                }
            }
        });



        $("#getColumns").change(function(){ModifySearchProperty.selectGetColumnsChange()});
        $('#modifySelectName').keyup(function(){
            var $_text = $(this).val();
            $("#searchForm").find(".cutActive").parents('.form-group').find("label").text($_text);
        });

        var type = $('#searchForm').find('.hasFocus').attr('data-control-type');
        if(type == 'select') {
            ModifySearchProperty.setSelectDataSource();
        }
        ModifySearchProperty.initSelectColumns();
    },
    deleteSelectedMethod:function($this) {
        var refClick = $('.cutActive').attr('ref-'+$($this).parents('.pitch').attr('type'));
        var event    = $($this).parents('.pitch').attr('ref');
        if (!!refClick) {
            var  var0 = refClick.split(',');
            var  var1 = [];
            for (var i = 0;i<var0.length;i++) {
                if(event != var0[i]) {
                    var1.push(var0[i]);
                }
            }
            $('.cutActive').attr('ref-'+$($this).parents('.pitch').attr('type'),var1.join(','));
            $($this).parents('.pitch').remove();
        }
    },
    setSelectDataSource: function () {
        $('#modifySearch').append(BaseControl.getSelect("数据源","datasource"));
        $('#datasource').change(function(){ModifySearchProperty.setTableName()});

        BaseControl.bindTables(function (data) {
            var options = BaseControl.getOptions(data, new Array("table_name", "id", "table_alias"));
            $('#datasource').empty().append(options);
            var tableName = $("#searchForm").find(".cutActive").attr('tableName');
            if(!!tableName) {
                $('#datasource').val(tableName);
                $('#datasource').change();
            }
        });
    },
    /***
     * 添加选择数据源的控件数据
     */
    setTableName: function () {
        var $_val = $("#datasource").val();
        var $_ele = $("#searchForm").find(".cutActive");
        BaseControl.setAttr($_ele,new Array("tableName"),$_val,true);
        $("#displayColumn").parents('.form-group-prop').remove();
        $('#modifySearch').append(BaseControl.getSelect("显示字段","displayColumn"));
        $("#displayColumn").change(function(){ModifySearchProperty.setColumnName()});

        BaseControl.bindTableColumns($("#datasource option:selected").attr('ref'),function (data) {
            var options = BaseControl.getOptions(data, new Array("filed_name","id", "column_alias"));
            $('#displayColumn').empty().append(options);

            var displayColumn = $("#searchForm").find(".cutActive").attr('displayColumn');
            if(!!displayColumn) {
                $("#displayColumn").val(displayColumn);
            }
        });
    },
    setColumnName: function () {
        var $_val = $("#displayColumn").val();
        var $_ele = $("#searchForm").find(".cutActive");
        BaseControl.setAttr($_ele,new Array("displayColumn"),$_val,true);
    },
    initSelectColumns: function () {
        $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: tableId}, function (data) {
            var options = BaseControl.getOptions(data, new Array("filed_name","id", "column_alias","column_type"));
            $('#getColumns').empty().append(options);

            var label  = $('#searchForm').find('.has-error').find('label').text();
            var column = $('#searchForm').find('.has-error').find('.cutActive').attr('name');
            if(!!label && !!column) {
                $("#getColumns").val(column);
                $("#modifySelectName").val(label);
            }

        });
    },
    selectGetColumnsChange: function () {
        var ref = $(".cutActive").parents('.form-group').attr('ref');

        var $_text = $('#getColumns option:selected').text();
        var $_val  = $('#getColumns option:selected').val();
        var columnType = $('#getColumns option:selected').attr('column-type');
        $("#searchForm").find(".cutActive").parents('.form-group').find("label").text($_text);
        $("#modifySelectName").val($_text);

        if(ref == 'space') {
            var first = $(".cutActive").parents('.form-group').find("input:eq(0)");
            var secode = $(".cutActive").parents('.form-group').find("input:eq(1)");


            if(columnType == '时间') {
                $(".cutActive").parents('.form-group').attr("data-control-type","datetime");
                $(first).attr('readOnly',true);
                $(secode).attr('readOnly',true);
            } else {
                $(first).removeAttr('readOnly');
                $(secode).removeAttr('readOnly');
                $(".cutActive").parents('.form-group').removeAttr("data-control-type");
            }

            BaseControl.setAttr(first ,new Array("name","id") , $_val,true);
            BaseControl.setAttr(secode,new Array("name","id"), $_val,true);
        } else {
            BaseControl.setAttr($("#searchForm").find(".cutActive"),new Array("name","id"),$_val,true);
        }
    }
};


var ModifyBtnProperty = {
    init: function () {
        ModifyBtnProperty.setTableHeaderBtn();
        ModifyBtnProperty.addRightBtnToHeader();

        ModifyBtnProperty.setBtnCheckIsSelected();



        ModifyBtnProperty.moveTableHeaderBtns();

    },
    moveTableHeaderBtns: function () {
        $("#tableContent").find('.box-tools').sortable({
            cursor: "move",
            items :".btn-primary",                        //只是li可以拖动
            opacity: 0.6,                       //拖动时，透明度为0.6
            revert: true,                       //释放时，增加动画
            update : function(event, ui){       //更新排序之后

            }
        });
    },
    setBtnCheckIsSelected: function () {

        $(".rightClick").each(function () {
            var id = $(this).attr('id');
            var length = $('#tableContent').find('.pull-right').find('div[id="'+id+'"]').length;
            if(length > 0) {
                $(this).attr('checked',true);
            } else {
                $(this).attr('checked',false);
            }
        });
        var btns = $("#worktable").attr('btns');
        if(!!btns) {
            var var1 = btns.split(',');
            for(var i = 0;i<var1.length;i++) {
                $(".dataBtn[ref='"+var1[i]+"']").attr('checked',true);
            }
        }
    },
    addRightBtnToHeader: function () {
        $('.rightClick').click(function () {
            var checked = $(this).get(0).checked;
            var id      = $(this).attr('ref');
            var click   = $(this).attr('ref-click');
            var pop     = $(this).attr('click');
            if(checked) {
                var text = this.nextSibling.data;
                var var0 = [];
                var0.push('<div id="'+id+'" type="button" class="btn btn-primary btn-sm" style="margin-right:5px;" '+(!!click ? 'ref-click="'+click+'"' : '')+' click='+(!!pop ? pop : 'click')+'><span>'+text+'</span></div>');
                $("#tableContent").find(".box-tools").append(var0.join(''));

                ModifyBtnProperty.moveTableHeaderBtns();
            } else {
                $("#tableContent").find(".box-tools").find("#"+id).remove();
            }

        });

        $('.dataBtn').click(function() {
            var checked = $(this).get(0).checked;
            var id = $(this).attr('id');
            var btns = $("#worktable").attr('btns');
            if(checked) {
                if(!!btns) {
                    id = btns + "," + id;
                }
                $("#worktable").removeAttr('btns').attr('btns',id); //先删除再添加 触发事件
            } else {
                var bs = [];
                $('.dataBtn').each(function(i) {
                    var checked = $(this).get(0).checked;
                    if(checked) {
                       bs.push($(this).attr('id'));
                    }

                });
                if(!!bs && bs.length > 0) {
                    $("#worktable").removeAttr('btns').attr('btns',bs.join(','));
                } else {
                    $("#worktable").removeAttr('btns');
                }

            }
        });
    },

    setTableHeaderBtn: function () {
        var draggable = null;
        $('#_Button').draggable({
            cursor: 'move',
            helper: "clone",
            start: function (event) {
                draggable = event.target;
            },stop: function (event, ui) {
                var $con = getSearchFormLabel(draggable);
                var btns = $('#tableContent').find('.box-header').find('.pull-right').find(".btn");
                if(btns.length > 0) {
                    $('#tableContent').find('.box-header').find('.pull-right').find(".btn").removeClass('isSelected');
                    $('#tableContent').find('.box-header').find('.pull-right').find(".btn:first").before($con);
                } else {
                    $('#tableContent').find('.box-header').find('.pull-right').append($con);
                }



                var $this = $('#tableContent').find('.box-header').find('.pull-right').find(".btn:first");
                ModifyBtnProperty.clickInitBtnProperty($this);

            }
        });
        ModifyBtnProperty.tableHeaderBtnClick(); //点击时弹出属性信息

    },
    inputChangeEvent: function () {
        $("#btnName").keyup(function () {
            var val = $(this).val();
            $(".box-tools").find('.isSelected').find("span").text(val);
        });
    },
    /***
     * 当点击表头按钮时设置属性值
     */
    tableHeaderBtnClick: function () {
        $('#tableContent').find('.box-header').find('.pull-right').delegate('.btn','click', function (event) {
            var id = $(this).attr('id');
            var btnsStr = "edit,delete,isView,import,export";

            $(".box-tools").find('div').removeClass('isSelected');
            $(this).addClass("isSelected");


            if(!!id && btnsStr.indexOf(id) > -1) {
                BaseControl.propertyHide(".quality,.quality_contern","#reminder");
            } else {
                ModifyBtnProperty.clickInitBtnProperty(this);
            }
        });
    },
    clickInitBtnProperty : function () {
        BaseControl.propertyHide(".quality,.quality_contern","#modifyBtn");

        $("#modifyBtn").empty()
            .append(BaseControl.getBtnBackgroundColorHtml())
            .append(BaseControl.getInput("按钮名称",'btnName'))
            .append(BaseControl.getSelect("按钮事件","btnEvents"))
        ;
        $("#btnName").val($(".box-tools").find('.isSelected').find("span").text());

        $("#btnEvents").append("<option></option><option value='click'>点击事件</option><option value='pop'>弹出页面</option><option value='embed'>嵌入页面</option><option value='jump'>跳转页面</option>");
        $("#btnEvents").val($(".box-tools").find('.isSelected').attr('click'));
        var click = $(".box-tools").find('.isSelected').attr('click');

        if(!!click) {
            ModifyBtnProperty.selectEventChange();
        }


        $("#btnEvents").change(function() {
            ModifyBtnProperty.selectEventChange();
        });

        //修改颜色
        $(".btn-group .fc-color-picker").delegate('li','click',function(){
            var clazz = $(this).find('a').attr('ref');
            $(".box-tools").find('.isSelected').css({'background':clazz,"border":'1px solid '+clazz})
        });
        ModifyBtnProperty.inputChangeEvent(); //修改按钮名称
    },
    deleteSelectedMethod: function ($this) {
        var ref      = $($this).parents('.pitch').attr('ref');
        var refClick = $(".box-tools").find('.isSelected').attr('ref-click');

        var var0 = [];
        var var1 = refClick.split(",");
        for(var i = 0 ;i<var1.length;i++) {
            if(ref != var1[i]) {
                var0.push(var1[i]);
            }
        }
        $(".box-tools").find('.isSelected').attr('ref-click',var0.join(','));
        $($this).parents('.pitch').remove();
    },
    selectEventChange: function () {
        var val = $("#btnEvents option:selected").val();
        $(".box-tools").find('.isSelected').attr('click',val);
        if(!!val && val == 'click') {
            $("#modifyBtn").append(BaseControl.getSelect("选择方法",'selectMethod',new Array("method")));
            $("#bindPage").parents('.form-group-prop').remove();

            $.post(basePath + "/formUploadOp/getFunNames.htm", {"formid": pid}, function (data) {
                if (data != null && data != "" && data.length > 0) {
                    $("select[method='method']").empty().append(JsImport.getMethodOptions(data));

                    var refClick = $('.isSelected').attr('ref-click');
                    if(!!refClick) {
                        var var0 =  refClick.split(',');
                        var var1 = [];
                        for(var i = 0;i < var0.length;i++) {
                            var1.push(BaseControl.getSelectedOptionHtml(var0[i],$('#selectMethod option[value="'+var0[i]+'"]').text(),"ModifyBtnProperty.deleteSelectedMethod(this)"));
                        }
                        $(".pitch").remove();
                        $('#selectMethod').after(var1.join(''));
                    }

                } else {
                    $("select[method='method']").empty().append('<option></option>');
                }
            });
            $('#selectMethod').change(function(){
                var val = $('#selectMethod option:selected').val();
                var $val = val;
                var refClick = $('.isSelected').attr('ref-click');
                if(!refClick || !(!!refClick && refClick.indexOf(val) > -1)) {
                    if(!!refClick) {
                        val = refClick + "," + val;
                    }
                    $('.isSelected').attr('ref-click',val);

                    var var0 = BaseControl.getSelectedOptionHtml($val,$('#selectMethod option:selected').text(),"ModifyBtnProperty.deleteSelectedMethod(this)");
                    $('#selectMethod').after(var0);
                }

            });
            //$("#modifyBtn").append(BaseControl.getFileImportHtml());
        } else {
            $("#modifyBtn").append(BaseControl.getInput("选择页面",'bindPage'));
            var $this =  $("#modifyBtn").find("#bindPage");

            $($this).attr("readOnly",true).css({'width': '100%','background':'#fff','cursor':'pointer'});
            $("#selectMethod").parents('.form-group-prop').remove();
            var formName = $(".box-tools").find('.isSelected').attr('formName');
            if(!!formName) {
                $("#bindPage").val(formName);
            }

            $($this).click(function () {
                menu.showPathModal(this, function () {
                    var id = $($this).parent().attr('fucid');
                    $.getAjaxData(basePath+"/sysFunction/selectone.htm",{id:id},function(data) {
                        var prevFromId = $(".box-tools").find('.isSelected').attr('formid');
                        var content = BaseControl.getPopWindowHtml(id,'');
                        $(".box-tools").find('.isSelected').attr('formId',id);
                        $(".box-tools").find('.isSelected').attr('formName',$($this).val());
                        $(".box-tools").find('.isSelected').attr('file_name',data.file_name);
                        $('#'+prevFromId).remove();
                        $(".box-tools").find('.isSelected').after(content);
                    });
                });
            });



           BaseControl.loadTree(null,{projectId:projectId},$('#function_demo'),function(){
                $('.tree-bindPage').hide();
                $('#bindPage').click(function () {
                    $('.tree-bindPage').show();
                });
                $(document).click(function(event) {
                    var target = event.target;
                    var name = $(target).attr('name');
                    if(name != 'bindPage') {
                        $('.tree-bindPage').hide();
                    }
                });
            },
                function(event, treeId, treeNode, clickFlag) {
                $("#bindPage").val(treeNode.name);
                $("#bindPageId").val(treeNode.id);
                //$(".box-tools").find('.isSelected').attr('data-toggle','modal');
                //$(".box-tools").find('.isSelected').attr('data-target','#'+treeNode.id);
                $.getAjaxData(basePath+"/sysFunction/selectone.htm",{id:treeNode.id},function(data) {
                    var prevFromId = $(".box-tools").find('.isSelected').attr('formid');
                    var content = BaseControl.getPopWindowHtml(treeNode.id,'');
                    $(".box-tools").find('.isSelected').attr('formId',treeNode.id);
                    $(".box-tools").find('.isSelected').attr('formName',treeNode.name);
                    $(".box-tools").find('.isSelected').attr('file_name',data.file_name);
                    $('#'+prevFromId).remove();
                    $(".box-tools").find('.isSelected').after(content);
                });
            });
        }
    }
};

var JsImport = {
    getFormImportJsp: function () {
        $('#equipmentDemoAdd').modal('show');
        $.post(basePath+"/formOpration/getFormImportJsp.htm", {formid:pid,flag:"table"}, function(data){
            $("#equipmentDemoAdd").html(data);
        },"");
    },
    getFunNames:function() {
        $.post(basePath + "/formUploadOp/getFunNames.htm", {"formid": pid}, function (data) {
            $("select[method='method']").empty().append("<option></option>");
            if (data != null && data != "" && data.length > 0) {
                $("select[method='method']").empty().append(JsImport.getMethodOptions(data),$('.isSelected').attr('ref-click'));
            }
        }, "json");
    },
    getMethodOptions:function(data,refClick) {
        var var0 = [];
        var0.push('<option></option>');
        for (var i = 0; i < data.length; i++) {
            var json = data[i].funNames;
            json = eval("(" + json + ")");
            if (json.length > 0) {
                for (var j = 0; j < json.length; j++) {
                    if(!!refClick) {
                        if(refClick == json[j].name + '()') {
                            var0.push('<option value="' + json[j].name + '()" selected>' + json[j].text + '</option>');
                        }
                        else {
                            var0.push('<option value="' + json[j].name + '()">' + json[j].text + '</option>');
                        }
                    } else {
                        var0.push('<option value="' + json[j].name + '()">' + json[j].text + '</option>');
                    }
                }
            }
        }
        return var0.join('');
    }
};


