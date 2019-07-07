var $textdefautvalue, $roletype, $tableColumn;

var arry = new Array();
var index = null;
var moveEle = '';

$(function () {
    dateformat(".form_datetime");
    //getTableColumn();
    draggableSearchColumns();
    selectColumnsMouseSelect();
    dragSortable();
    //displaySearchWhere();
    tableViewSorttable();

    ModifyBtnProperty.init(); //设置表格按钮信息
    TableControl.tableInit();
    /**
     * 搜索区域控件块的选中事件
     */
    TableControl.searchAreaSelectedEvent();
    /**
     * 控件属性lable文本值得改变事件
     */
    $("#textdefautvalue").bind("keyup", function () {
        $("#searchForm .has-error").find("label").text($(this).val());
    });
    /**
     * 控件类似下拉框的变动事件
     */
    $(document).on("change", "#tableColumn", function () {
        var $h = $("#searchForm .has-error");
        if ($h.length > 0) {
            var $control = $h.find(".form-control");
            var $this = $(this);
            var value = $this.val();
            var name = $control.attr("name");
            //如果值不变返回
            if (value == name) {
                return;
            }
            $control.attr("name", value);
            $h.find("label").text($this.find("option:selected").text());
        } else {
            $h = $("#worktable .has-error");
            if ($h.length > 0) {
                var $this = $(this);
                var value = $this.val();
                $h.text($this.find("option:selected").text());
                $h.attr("column-name", value)
            } else {
                return;
            }
        }


    });
    /**
     * 控件类似下拉框的变动事件
     */
    $("#roletype").bind("change", function () {
        var $h = $(".has-error");
        var value = $(this).val();
        if ($h.attr("data-role") != value) {
            var html = $("#" + value).clone();
            $(html).removeAttr("id");
            if (value == "date") {
                dateformat($(html));
            }
            $h.find(".form-control").replaceWith($(html));

        }
    });
    /**
     * table表头的点击事件
     */
    $(document).on("click", "#worktable thead th", function (event) {
        var $this = $(this);
        $("#searchForm .has-error").removeClass("has-error");
        if (!$this.hasClass("has-error")) {
            $this.siblings().removeClass("has-error");
            $this.addClass("has-error");
            var columnName = $this.attr("column-name");
            var text = $this.text();
            leftchange(columnName, text);
        }
    });

    init();//加载左边属性内容
});


/**
 * 左边样式
 * @param name    name属性值
 * @param value   文本值
 * @param type    类型
 */
function leftchange(name, value, type) {
    if ($roletype === undefined) {
        $textdefautvalue = $("#textdefautvalue");
        $roletype = $("#roletype");
        $tableColumn = $("#tableColumn");
    }
    $tableColumn.val(name);
    $textdefautvalue.val(value);
    if (type != undefined) {
        $roletype.val(type);
    }
}
/**
 * 读取表属性
 */
function getTableColumn() {
    $.ajax({
        type: "post",
        url: basePath + "/structureTable/findTableComment.htm",
        data: {"tableName": "user"},
        async: true,
        dataType: "json",
        success: function (data) {
            var html = "";
            if (data != null) {
                var i = 0;
                var length = data.length;
                for (i; i < length; i++) {
                    html += '<option value="' + data[i].Field + '">' + data[i].Comment + '</option>';
                }
            }
            $("#tableColumn").append(html);
        }
    });
}

/**
 * 切换表时触发
 */
function DBsourceselectChange(select) {
    var value = select.value;
    changecolumnsCheckboxDiv(value);
}


/**
 * 设置列选择框
 */
function changecolumnsCheckboxDiv(name) {
    $.ajax({
        type: "post",
        url: basePath + "/createDataTable/getColumnsByTableName.htm",
        data: {"tableName": name},
        dataType: "json",
        success: function (data) {
            if (data.columns != null) {
                var html = "";
                var selectHtml = "";
                for (var d = 0; d < data.columns.length; d++) {
                    html += "<div class='checkbox'> <label>  <input type='checkbox' onclick='columnclick(this)'  value='" + data.columns[d].filed_name + "'>" + data.columns[d].column_alias + " </label> </div>";
                    selectHtml += " <option value='" + data.columns[d].filed_name + "'>" + data.columns[d].column_alias + "</option>";
                }
                $('#columnsCheckboxDiv').html("");
                $('#columnsCheckboxDiv').append(html);

                $('#selectColumns').html("");
                $('#selectColumns').append(html);

            } else {
                alert(data.message);
            }
        }
    });

}
function columnclick(c) {
    var check = c.checked;
    var list = $("#worktable thead th");
    var value = c.value;
    var text = c.nextSibling.data;
    if (check) {
        $("#worktable thead tr").append("<th id='" + value + "' column-name='" + value + "'>" + text + "</th>");
        var _this = $("#worktable thead tr").find("#"+value);
        tableViewSorttable();

        var columnsControl = new TableColumnControl();
        columnsControl.initHTMLLabel(_this);
    } else {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id.trim() == value) {
                list[i].remove();
            }
        }

    }
}

/*保存功能*/
function add() {
    if ($("#iptEtableName").val() == "") {
        $("#iptEtableName").val($("#selectPages").val());
    }
    //$("#pageBtn").empty();
    $(".join").remove();
    $(".small-title").remove();
    $('.isSelected').removeClass('isSelected');
    $('.columnsSelected').removeClass('columnsSelected');
    $('.cutActive').removeClass('cutActive');
    addControl();
    var content = $("#searchdiv").html();
    var tableJs = new CreateTableJS();
    var pageJSON = tableJs.parseHtml(content);
    var publishContent = tableJs.getHtml(pageJSON);
    $.ajax({
        type: "post",
        url: basePath + "/createDataTable/edit.htm",
        data: {"pid": pid, "content": content,'publishContent':publishContent},
        dataType: "json",
        success: function (data) {
            if (data.success) {
                alert("保存成功");
                var url = basePath + "/header/forward.htm?flag=functionPage";
                if(!!navId){
                    url += "&navId="+navId;
                }
                window.location.href = url;
            }

        }
    });
}
//添加列表中的操作列
function addControl() {

    var button = '<button class="btn btn-primary" onclick="toEditMethod()">编辑</button>'
        + '<button class="btn btn-default" onclick="Delete()">删除</button>';
    /*$("#worktable thead tr").append("<th cloumn-name='control'>操作</th>");*/
    /*$("#worktable tbody tr").append(button);*/
}

function preview() {
    window.location.href = basePath + "/createDataTable/preview.htm?pid=" + pid;

}


var text;//选择查询区域对应的字段别名
var pagevalue;
//选择查询区域对应的字段
function selectCount() {
    var $this = $("#selectColumns");
    text = $this.find("option:selected").text();
    $('#columnTitle').val(text);
}
//选择编辑按钮对应的页面
function pageSelect() {
    var pagevalue = $("#selectPages").val();
    $('#iptFormPageName').val(pagevalue);
}

function addIpt() {
    var value = $("#selectColumns").val();
    var title = $('#columnTitle').val();
    var inputhtml = '<div class="col-md-2"> <div class="form-group"> <label>' + title + '</label>'
        + '<input type="text" class="form-control" placeholder="请输入' + title + '" name="' + value + '"  data-role="text">'
        + '</div> </div>';
    var timehtml = '<div class="col-md-2"> <div class="form-group">'
        + '<label>' + title + '</label> <input size="16" type="text" value="" readonly name="' + value + '"'
        + 'class="form-control form_datetime" data-role="date"> </div> </div>';
    var value = $('#columntype').val();

    if (value == 'text') {
        $("#searchForm .row").append(inputhtml);
    } else if (value == 'date') {
        $("#searchForm .row").append(timehtml);
        dataformat(".form_datetime");

    }
}
function delteIpt() {
    $('#searchForm .has-error').remove();
}
function init() {
    var type = $('#ipttype').val();
    var checkboxs = $("input[name='check']");
    if (type == 'edit') {
        var list = $("#worktable thead th");
        for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < checkboxs.length; j++) {
                if (list[i].id.trim() == $(checkboxs[j]).val()) {
                    checkboxs[j].checked = true;

                }
            }

        }

    }
}

/***
 * 查询条件当鼠标点击时添加事件
 */
function selectColumnsMouseSelect() {
    $('#searchForm').delegate('.col-md-2,.col-md-3,.col-md-4', 'click mouseleave',
        function (selector) {
            if(selector.type == 'click') {
                // var $del = '<div class="del-c"  onclick="delteIpt()" style="width:20px;height:20px;border-radius: 50%;top:2px;right:6px;position: absolute; text-align: center; cursor: pointer;"><i style="font-size: 18px; color: #a94442;" class="fa fa-close"></i></div>';
                // $(this).append($del);
                $('#searchForm').find('.col-md-2,.col-md-3,.col-md-4').find("input,select").removeClass("cutActive");
                $('#searchForm').find('.col-md-2,.col-md-3,.col-md-4').find(".form-group").removeClass("hasFocus");
                $(this).find("input,select").addClass('cutActive');
                $(this).find(".form-group").addClass('hasFocus');
            } else {
                $(this).find('.del-c').remove();
                $(this).removeClass('has-error');
            }
        });
}


function dragSortable() {
    $('#searchForm').sortable({
        cursor: "move",
        items :".col-md-2,.col-md-3,.col-md-4",                        //只是li可以拖动
        opacity: 0.6,                       //拖动时，透明度为0.6
        revert: true,                       //释放时，增加动画
        update : function(event, ui){       //更新排序之后

        }
    });
}

function draggableSearchColumns() {
    var draggable = null;
    $('#tools').find('.formControl').draggable({
        cursor: 'move',
        helper: "clone",
        start: function (event) {
            draggable = event.target;
        },
        stop: function (event,ui) {
            $("#searchForm").find(".form-group").removeClass("hasFocus");
            $("#searchForm").find(".form-control").removeClass("cutActive");
            var $con = getSearchFormLabel(draggable);
            var location = new Array();
            var storageLocation = 0;

            var $rows = $('#searchForm').find(".row");

            var lastEle = $rows.eq($(this).find(".row").length-1);//获取最后一个元素

            var className = '.col-md-2';
            //获取每一个元素偏移的位置
            if(lastEle.find(".col-md-2").length <= 0) {
                className = '.col-md-3';
            }
            lastEle.find(className).each(function () {
                location.push($(this).offset().left);
            });

            var left =  ui.offset.left;//获取移动到当前的位置
            for (var i = 0; i < location.length; i++) { //找到需要放置的位置 10 20 30
                if (left > location[i]) {
                    storageLocation = i;
                }
            }
            if($.isDefined($rows)) {
                if (storageLocation <location.length) {
                    if(storageLocation == 0) {
                        if(left >location[0]) {
                            lastEle.find(className+':eq('+(storageLocation)+')').after($con);
                        }  else {
                            lastEle.find(className+':eq('+(storageLocation)+')').before($con);
                        }
                    } else {
                        lastEle.find(className+':eq('+(storageLocation)+')').after($con);
                    }
                } else {
                    lastEle.append($con);
                }
            }


            ModifySearchProperty.clickEvent();


        }
    });
}

function getSearchFormLabel($this) {
    var result = '';
    var column = 2;
    if($('#ztree').length > 0) {
        column = 3;
    }
    switch($($this)[0].id) {
        case '_TextTemplate':
            var var0 = [];
            var0.push('<div class="col-md-'+column+'">');
            var0.push(  '<div class="form-group hasFocus">');
            var0.push(      '<label>' + $($this)[0].innerText + '</label>');
            var0.push(      '<input type="text" class="form-control cutActive" placeholder="请输入查询内容!"  data-role="text">');
            var0.push(  '</div>');
            var0.push('</div>');
            result+= var0.join('');
            break;
        case '_SelectTemplate':
            var var0 = [];
            var0.push('<div class="col-md-'+column+'">');
            var0.push(   '<div class="form-group hasFocus" data-control-type="select">');
            var0.push(      '<label>' + $($this)[0].innerText + '</label>');
            var0.push(      '<select class="form-control selectOption cutActive" data-role="select" ref="select" type="select">');
            var0.push(      '</select>');
            var0.push(  '</div>');
            var0.push('</div>');
            result+=var0.join('');
            break;
        case '_DateTemplate':
            var var0 = [];
            var0.push('<div class="col-md-'+column+'">');
            var0.push(    '<div class="form-group hasFocus" data-control-type="datetime">' );
            var0.push(        '<label>' + $($this)[0].innerText + '</label>');
            //var0.push(        '<div class="input-group date form_datetime">');
            var0.push(            '<input class="form-control cutActive" size="16" type="datetime" readonly="" style="background:#fff;" data-role="datetime">');
            //var0.push(            '<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>');
            //var0.push(            '<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>');
            ///var0.push(        '</div>');
            var0.push(    '</div>');
            var0.push('</div>');
            result = var0.join('');
            break;
        case '_Button':
            var var0 = [];
            var0.push('<div type="button" class="btn btn-primary btn-sm isSelected" style="margin-right:5px;"><span> button</span></div>');
            result = var0.join('');
            break;
        case "_space":
            var var0 = [];
            var0.push('<div class="col-md-4">');
            var0.push(    '<div class="form-group hasFocus"  ref="space">' );
            var0.push(        '<label>' + $($this)[0].innerText + '</label>');
            var0.push(        '<div class="input-group" style="clear: both;">');
            var0.push(            '<input class="form-control cutActive" size="16" type="space_datetime"  data-role="start" placeholder="起" style="background:#fff; width: 46%; float: left;">');
            var0.push(            '<span style="width: 8%; height: 34px; line-height: 34px; display: block; text-align: center; font-size: 12px; background: #999; color: #fff; float: left;">至</span>');
            var0.push(            '<input class="form-control " size="16" type="space_datetime"  data-role="end" placeholder="止" style="background:#fff;width: 46%; float: left;">');
            var0.push(        '</div>');
            var0.push(    '</div>');
            var0.push('</div>');

            result = var0.join('');
            break;
    }
    return result;

}




/***
 * 表格排序
 */
function tableViewSorttable() {
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

            //$(currentMove).replaceWith(afterth);
            //$(afterth).replaceWith(currentMove);

            /*//获取当前移动元素的属性值
            var $c_id = currentMove.attr('id');
            var $c_name = currentMove.attr('column-name');
            var $tableName = currentMove.attr('tablename');
            var columnname = currentMove.attr('columnname');
            var $html = currentMove.html();

            currentMove.attr('id', afterth.attr('id'));
            currentMove.attr('column-name', afterth.attr('column-name'));

            if(!!$tableName) {
                currentMove.attr('tablename', afterth.attr('tablename'));
            }
            if(!!columnname) {
                currentMove.attr('columnname', afterth.attr('columnname'));
            }

            currentMove.html(afterth.html());

            afterth.attr('id', $c_id);
            afterth.attr('column-name', $c_name);
            afterth.attr('tablename', $tableName);
            afterth.attr('columnname', columnname);
            afterth.html($html);*/
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
}





