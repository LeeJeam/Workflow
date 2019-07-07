/****
 * 表连接查询属性设置
 * @constructor
 */
function TableConnectSet() {
    this.isStart = true;
    this.isInit  = false;
    this.index = 0;
};

var tableConnectSet = new TableConnectSet();

TableConnectSet.prototype.getId = function (flag) {
    return "div_" + flag;
};
TableConnectSet.prototype.initPageHtml = function () {

    var var0 = [];
    var0.push('<div class="quality"><a href="javascript: void(0);"><i class="fa fa-caret-down"></i>&nbsp;&nbsp;设置多表关联查询</a></div>');
    var0.push('<div class="quality_contern" id="tableConnectSet"></div>');
    $("#conternbodyRight").find("#modifyPage").after(var0.join(''));


    $("#tableConnectSet").empty();
    tableConnectSet.initMainTablesCallBack();

};


TableConnectSet.prototype.initBindColumnsData = function () {
    $("input[name='recodetable']").each(function (i) {
        tableConnectSet.isInit = false;
        var mtable = tableConnectSet.getAttrs("#recodetable_"+i,'mtable',',');
        var rtable = tableConnectSet.getAttrs("#recodetable_"+i,'rtable',',');

        tableConnectSet.setAttrs(mtable,'mtable_',false);
        tableConnectSet.setAttrs(rtable,'rtable_',true);
    })

};

TableConnectSet.prototype.getAttrs = function (selector,attsname,split) {
    return !!$(selector).attr(attsname) ? $(selector).attr(attsname).split(split) : '';
};

TableConnectSet.prototype.setAttrs = function (aray,selector,change) {
    if(!!aray) {
        for(var i = 0;i<aray.length;i++) {
            $("#"+selector+i).val(aray[i]);
            if(change) {
                $("#"+selector+i).change();
            }
        }
    }
};


TableConnectSet.prototype.setColumnChecked = function (index) {
    $("#columncheckbox_"+index).find("input[type='checkbox']").each(function () {
        $(this).click(function () {
            var checked = $(this).get(0).checked;
            var value = $(this).attr("value");
            if (checked) {
                var text = this.nextSibling.data;
                var mtable = $("#mtable_"+index+" option:selected").val();
                var mcolumn = $("#mcolumn_"+index+" option:selected").val();

                var rtable = $("#rtable_"+index+" option:selected").val();
                var rcolumn = $("#rcolumn_"+index+" option:selected").val();


                var th = BaseControl.getTableThHtml(value, text, rtable, rcolumn, mtable, mcolumn,index);
                $("#worktable thead tr").append(th);
                tableViewSorttable();
            } else {
                $("#worktable thead tr").find("th[id='" + value + "']").remove();
            }
        })
    });
};


TableConnectSet.prototype.getColumnCheckbox = function (eleId, label, jsons, tablename, params) {
    var var0 = [];
    var0.push('<div class="form-group-prop search_btn" id="' + eleId + '">');
    var0.push('<label class="control-label" style="white-space: nowrap;">' + label + '</label>');
    var0.push('<div style="clear:both;">');
    var0.push('<div class="col-lg-4"></div>');
    var0.push('<div class="col-lg-8" style="padding-left: 0px;">');
    if (!!jsons) {
        for (var i = 0; i < jsons.length; i++) {
            var row = jsons[i];
            var style = '';
            if (i == 0) {
                style = 'style="margin-top:0px;"';
            }
            var0.push('<div class="checkbox" ' + style + '>');
            var var1 = '';
            if (!!tablename) {
                var1 = tablename + "." + row[params[0]];
            } else {
                var1 = row[params[0]];
            }
            var0.push('<label><input type="checkbox" name="check" value="' + var1 + '" style="margin-top: 3px;">' + row[params[1]] + '</label>');
            var0.push('</div>');
        }
    }
    var0.push('</div>');
    var0.push('</div>');
    var0.push('</div>');

    return var0.join('');
};





/***
 * 初始化表关联查询数据
 * @param data
 */
TableConnectSet.prototype.initMainTablesCallBack = function () {

    $.getAjaxData(basePath + '/createDataTable/getTables.htm', {}, function (data) {
        var options = BaseControl.getOptions(data, new Array("table_name", "id", "table_alias"));

        var length = $("input[name='recodetable']").length;
        if(length > 0) {
            for(var i = 0;i<length;i++) {
                var v1 = $("input[name='recodetable']:eq("+i+")").attr("mtable");
                if(i == 0) {
                    tableConnectSet.addAccrodingContent('#tableConnectSet',i,v1,options);
                } else {
                    var div = $('#div_'+(i-1)).parents(".col-md-12");
                    tableConnectSet.addAccrodingContent(div,i,v1,options);
                }

                if(i != 0 && i < (length -1)) {
                    var cruId       = tableConnectSet.getId((i));
                    var accrodingId = tableConnectSet.getId((i-1));
                    $('#'+cruId).parents(".col-md-12").prev().find('button[href="#'+accrodingId+'"]').click();
                }

            }
        } else {
            tableConnectSet.addAccrodingContent('#tableConnectSet',tableConnectSet.index,options);
        }


    });
};

TableConnectSet.prototype.addAccrodingContent = function (selector,index,v1,options) {

    var content = [];
    content.push(BaseControl.getSelect("主表", 'mtable_'+index));
    content.push(BaseControl.getSelect("主表字段", 'mcolumn_'+index));
    content.push(BaseControl.getSelect("关联表", 'rtable_'+index));
    content.push(BaseControl.getSelect("关联字段", 'rcolumn_'+index));

    var var1 = BaseControl.getAccordionHtml(tableConnectSet.getId(index),content.join(''),true,'tableConnectSet.block(this)');

    if(index == 0) {
        $(selector).append(var1);
    } else if(index != 0) {
        $(selector).after(var1);
    }

    if($('#recodetable_'+index).length == 0) {
        $("#recodetable_"+(index-1)).after('<input type="hidden" id="recodetable_'+index+'" name="recodetable"/>');
    }


    tableConnectSet.appendHtml(new Array("#mtable","#rtable"),new Array(options,options));
    tableConnectSet.addChangeEvents(new Array("#mtable","#rtable","#mcolumn","#rcolumn"),tableConnectSet.changeEvent);

    if(!!v1) {
        $('#mtable_'+index+' option[value="' + v1 + '"]').attr("selected", true);
        $('#mtable_'+tableConnectSet.index).change();
    } else {
        $('#mtable_'+index+' option[ref="' + tableId + '"]').attr("selected", true);
        $('#mtable_'+index).change();
    }



    tableConnectSet.initBindColumnsData();
};

TableConnectSet.prototype.removeAccroding = function ($this) {
    var btns = $($this).parents(".box-header");
    var id = $(btns).siblings(".collapse").attr("id");
    var ids = id.split("_");
    var index = parseInt(ids[1]) - 1;

    var accrodingId = tableConnectSet.getId(index);
    $($this).parents(".col-md-12").prev().find('button[href="#'+accrodingId+'"]').click();
    $($this).parents(".col-md-12").remove();

};



TableConnectSet.prototype.changeEvent = function ($this) {
    var tableId = $($this).find("option:selected").attr('ref');
    var val     = $($this).find("option:selected").val();
    var nal     = $($this).attr("id");
    var nals    = nal.split("_");//mtable_0
    var index  = nals[1];// 当前操作的值
    if(!!val) {
        $("#recodetable_"+index).attr(nals[0],val);
    }

    if(!!nal && (nal == 'mtable_'+index || nal =='rtable_'+index)) {
        $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: tableId}, function (data) {
            var options = BaseControl.getOptions(data, new Array("filed_name", "filed_name", "column_alias"));
            if(nal == 'mtable_'+index)
            {
                $("input[name='recodetable']").each(function (i) {
                    var mcolumn  = tableConnectSet.getAttrs("#recodetable"+i,'mcolumn',',');
                    $("#mcolumn_"+index).empty().append(options);
                    tableConnectSet.setAttrs(mcolumn,'mcolumn_',true);
                })

            } else
            {
                $("input[name='recodetable']").each(function (i) {
                    var rcolumn = tableConnectSet.getAttrs("#recodetable"+i,'rcolumn',',');
                    $("#rcolumn_"+index).empty().append(options);
                    tableConnectSet.setAttrs(rcolumn,'rcolumn_',true);
                });

            }
        });
    }

    if(nal == 'rtable_'+index) {
        if(val == 'none') {
            $("#columncheckbox_"+index).remove();
            $("#worktable thead tr").find('th[index="' + index + '"]').remove();
        } else {
            $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: tableId}, function (data) {
                var checkbox = tableConnectSet.getColumnCheckbox("columncheckbox_"+index, "选择显示字段", data.rows, val, new Array("filed_name", "column_alias"));
                $("#columncheckbox_"+index).remove();
                $($this).parents('.form-group-prop').next().after(checkbox);

                //----------------页面初骀化选中的值--------------------------
                $("#worktable thead tr").find('th[relations="' + val + '"]').each(function () {
                    var val = $(this).attr('id');
                    $("#tableConnectSet").find('input[type="checkbox"][value="' + val + '"]').attr("checked", true);
                });

                tableConnectSet.setColumnChecked(index);

                /*if(tableConnectSet.isInit) {
                    $("#worktable thead tr").find('th[index="' + index + '"]').remove();
                } else {
                    tableConnectSet.isInit = true;
                }*/

            });
        }

    }

};

TableConnectSet.prototype.block = function ($this) {
    var clazz = $($this).find('i').attr('class');
    if(clazz.indexOf('fa-minus') > -1) {
        $($this).find('i').removeClass('fa-minus').addClass('fa-plus');
    } else {
        $($this).find('i').removeClass('fa-plus').addClass('fa-minus');
    }
};

TableConnectSet.prototype.addAccroding = function ($this){
    var collapse    = $($this).parents('.collapse');
    var accrodingId = $(collapse).attr('id');
    $(collapse).prev().find('button[href="#'+accrodingId+'"]').click();

    var index = ++tableConnectSet.index;
    tableConnectSet.isInit = false;

    $.getAjaxData(basePath + '/createDataTable/getTables.htm', {}, function (data) {
        var options = BaseControl.getOptions(data, new Array("table_name", "id", "table_alias"));
        tableConnectSet.addAccrodingContent($($this).parents(".col-md-12"),index,options);
    });

};



TableConnectSet.prototype.appendHtml = function (array,option) {
    for(var i =0;i<array.length;i++) {
        $(array[i]+'_'+tableConnectSet.index).empty().append(option[i]);
    }
};
TableConnectSet.prototype.addChangeEvents = function (array,callback) {
    for(var j =0;j<array.length;j++) {
        $(array[j]+'_'+tableConnectSet.index).change(function () {
            callback(this);
        });
    }

};


TableConnectSet.prototype.getTableConnectionHtml = function (eleId,content,removeFlag,fn) {
    var var0= [];
    var0.push('<div class="col-md-12" style="padding:0px;">');
    var0.push(  '<div  class="panel box box-primary">');
    var0.push(      '<div  class="box-header with-border">');
    var0.push(          '<h3 class="box-title" style="font-size: 12px;">表关联设置</h3>');
    var0.push(          '<div class="box-tools pull-right">');
    var0.push(              '<button title="收缩/展开" class="btn btn-box-tool" data-toggle="collapse" data-parent="#accordion" href="#'+eleId+'" onclick="'+fn+'"><i class="fa fa-minus"></i></button>');
    if(!!removeFlag && removeFlag)
    {
        var0.push('<button title="删除" class="btn btn-box-tool" data-widget="remove" onclick="tableConnectSet.removeAccroding(this)"><i class="fa fa-times"></i></button>');
    }
    var0.push(              '</div>');
    var0.push(       '</div>');
    var0.push(      '<div id="'+eleId+'" class="panel-collapse collapse in">');
    var0.push(          '<div class="box-body" style="padding:10px 0px 0px;">'+content+'</div>');
    var0.push(          '<div class="text-center" style="padding: 0 0 5px 0;"><a href="javascript: void(0);" onclick="tableConnectSet.addAccroding(this)" >添加表关联设置</a></div>');
    var0.push(      '</div>');
    var0.push(  '</div>');
    var0.push('</div>');
    return var0.join('');
}


$(function () {
    if (tableConnectSet.isStart) {
        tableConnectSet.initPageHtml();
    }
});
