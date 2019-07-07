var TableRelation = function () {
    this.relationLables = ["数据表", "字段", "关联到", "字段","关联方式"];
    this.relationValues = ["mtable","mcolumn","rtable","rcolumn","join"];
    this.isSelected = false;
    this.contentId = '';

    this.selectTable = [];
    this.selectColumn = [];
    this.selectColumnAlias = [];
    this.relations = [];



    this.resultColumn;
};

var tableRelation = new TableRelation();


TableRelation.prototype.saveViewsTable = function() {

    if(tableRelation.selectTable.length <= 0) {
        alert('请选择数据表!');
        return false;
    }

    if(tableRelation.selectTable.length <= 1) {
        alert('多关联表需要选择的表数量最少大于1!');
        return false;
    }

    if(tableRelation.selectColumn.length <=0) {
        alert("请选择字段!");
        return;
    }





    /*var index = 0;
    for(var i = 0;i<tableRelation.selectTable.length;i++) {
        var json = tableRelation.selectTable[i];
        var tablename = json.tablename;
        for(var j = 0;j<tableRelation.selectColumn.length;j++) {
            var split = tableRelation.selectColumn[j].split(".");
            if(tablename == split[0]){
                index ++;
                break;
            }
        }
    }
    if(index != tableRelation.selectTable.length) {
        alert("请在未选择的表之中选中列!");
        return false;
    }*/



    var flag = true;
    $("#relationTable").find("tr[edit]").each(function () {
        var json = {};
        $(this).find("select").each(function () {
            var name = $(this).attr("name");
            var val  = $(this).find("option:selected").attr('ref');
            if(!!name && !!val) {
                json[name] = val;
            } else {
                json = {};
                flag = false;
                return flag;
            }
        });

        if(jQuery.isEmptyObject(json)) {
            flag = false;
            return flag;
        } else {
            if(flag) {
                tableRelation.relations.push(json);
            }
        }
    });
    if(flag) {
        if(jQuery.isEmptyObject(tableRelation.relations)) {
            alert('请添加关联关系!');
            return false;
        }
        $.getAjaxData(
            basePath+"/structureTable/createOrUpdateIsViewColumns.htm",
            {
                tables:    JSON.stringify(tableRelation.selectTable),
                columns:   tableRelation.selectColumn.join(","),
                selectColumnAlias:tableRelation.selectColumnAlias.join(","),
                relations: JSON.stringify(tableRelation.relations),
                tableId:   $("#tb-id").val(),
                tablename: $("#tb-name").val()
            },
            function (data) {
                if(data.status) {
                    alert('创建表成功!');
                    window.location.href=basePath+"/header/forward.htm?flag=dataBase";
                } else {
                    alert('创建表失败!');
                }
            }
        );
    } else {
        alert("请补充表之间的关联关系!");
    }
};
TableRelation.prototype.tableClick = function ($this) {
    var checked = $($this).get(0).checked;
    var name = $($this).get(0).value;
    var alias = $this.nextSibling.data;
    var tableId = $($this).attr('tableid');

    if (checked) {
        $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: tableId}, function (data) {
            var checkbox = tableRelation.tableColumnsHtml(name,data.rows);
            $("#tablebody").append(tableRelation.tableHtml(name, alias, checkbox));

            var rlen = data.rows.length;
            var index = 0;
            var column = tableRelation.resultColumn;
            var length = !!column ? column.length : 0;
            for(var i = 0;i<length;i++) {
                var json = column[i];
                var fieldName = json.filed_name;
                if(name == fieldName.split("_")[0]) {
                    $("input[value='"+fieldName+"']").click();
                    index ++;
                }
            }

            if(rlen == index) { //选 中
                $("#"+name).find('i').removeClass('fa-square-o').addClass('fa-check-square-o');
            } else {//未选中
                $("#"+name).find('i').addClass('fa-square-o').removeClass('fa-check-square-o');
            }

        });

        var json = {};
        json.tableId = tableId;
        json.tablename = name;
        json.tablealias = alias;
        tableRelation.selectTable.push(json);

        var length = $("select[name='mtable']").find("option[value='"+json.tableId+"']").length;
        if(length == 0) {
            $("select[name='mtable']").append('<option value="'+json.tableId+'" ref="'+json.tablename+'">'+json.tablealias+'</option>');
        }
        var length = $("select[name='rtable']").find("option[value='"+json.tableId+"']").length;
        if(length == 0) {
            $("select[name='rtable']").append('<option value="'+json.tableId+'" ref="'+json.tablename+'">'+json.tablealias+'</option>');
        }


    } else {
        $("#tablebody").find("#" + name).parent().remove();
        var tempJson = [];
        for(var i = 0;i<tableRelation.selectTable.length;i++) {
            var json = tableRelation.selectTable[i];
            if(name != json.tablename) {
                tempJson.push(json);
            } else {
                var len = $("select[name='mtable']").find("option[ref='"+name+"']:selected").length;
                if(len>0) {
                    $("select[name='mtable']").find("option[ref='"+name+"']").remove();
                    $("select[name='mcolumn']").empty();
                }
                len = $("select[name='rtable']").find("option[ref='"+name+"']:selected").length;
                if(len >0) {
                    $("select[name='rtable']").find("option[ref='"+name+"']").remove();
                    $("select[name='rcolumn']").empty();
                }

            }
        }
        tableRelation.selectTable = tempJson;


        tableRelation.removeTargetTable(name);


    }

};

//删除字段中以表头开头的那些字段
TableRelation.prototype.removeTargetTable = function (name) {
    var temp1 = [];
    var temp2 = [];
    for(var i = 0;i<tableRelation.selectColumn.length;i++) {
        if(tableRelation.selectColumn[i].indexOf(name) <= -1) {
            temp1.push(tableRelation.selectColumn[i]);
            temp2.push(tableRelation.selectColumnAlias[i]);
        }
    }
    tableRelation.selectColumn = temp1;
    tableRelation.selectColumnAlias = temp2;
};

TableRelation.prototype.tableColumnsHtml = function (name,rows) {
    var var0 = [];
    if (!!rows) {
        for (var i = 0; i < rows.length; i++) {
            /*if(i == 0)
            {
                var0.push('<div class="checkbox" style="padding: 8px; border-bottom: 1px solid #f4f4f4; margin: 0px;">');
                var0.push('<label style="cursor: default;">');
                var0.push("<input onclick='tableRelation.checkBoxClickEvent(this)' ref='"+name+"' type='checkbox' name='columns'  value='"+name+".id'>id</label></div>");
            } else
            {*/
                var0.push("<div  class='checkbox' style='padding: 8px; border-bottom: 1px solid #f4f4f4; margin: 0px;'>");
                var0.push("<label style='cursor: default;'> ");
                var0.push("<input onclick='tableRelation.checkBoxClickEvent(this)'  ref='"+name+"' type='checkbox' name='columns'  value='" + name+"_"+rows[i].filed_name + "'>" + rows[i].column_alias + "</label></div>");
           // }

        }
    }
    return var0.join("");
};

TableRelation.prototype.resetTableSelectCoulumn = function (val,data) {
    var tempColumn = [];
    for(var i = 0;i<tableRelation.selectColumn.length;i++) {
        if(val != tableRelation.selectColumn[i]) {
            tempColumn.push(tableRelation.selectColumn[i]);
        }
    }
    tableRelation.selectColumn = tempColumn;

    var tempAlias = [];
    for(var i = 0;i<tableRelation.selectColumnAlias.length;i++) {
        if(data != tableRelation.selectColumnAlias[i]) {
            tempAlias.push(tableRelation.selectColumnAlias[i]);
        }
    }
    tableRelation.selectColumnAlias = tempAlias;
};

TableRelation.prototype.checkBoxClickEvent = function($this) {
    var checked  = $($this).get(0).checked;
    var val      = $($this).val();
    var data     = $this.nextSibling.data;
    var ref      = $($this).attr("ref");
    if(checked) {
        tableRelation.selectColumn.push(val);
        tableRelation.selectColumnAlias.push(data);
    } else {
        tableRelation.resetTableSelectCoulumn(val,data);
    }
    var rlen = $('#'+ref).find("input[type='checkbox']").length;
    var clen = $('#'+ref).find("input[type='checkbox']:checked").length;
    //获取选中的长度
    if(rlen == clen) { //选 中
        $("#"+ref).find('i').removeClass('fa-square-o').addClass('fa-check-square-o');
    } else {//未选中
        $("#"+ref).find('i').addClass('fa-square-o').removeClass('fa-check-square-o');
    }


    var ref      = $($this).attr("ref");
    var parents  = $($this).parents("#"+ref);
    var selected = $(parents).attr("selected");

    //当选择的是同一个id时
    if(tableRelation.contentId != ref) {
        tableRelation.isSelected = false;
        $(parents).removeAttr('selected');
        $(parents).parent().css({"border":"1px solid #666"});
    } else {
        $('#tablebody').find(".box").removeAttr('selected');
        $('#tablebody').find(".box").parent().css({"border":"1px solid #666"});

        $(parents).attr('selected',true);
        $(parents).parent().css({"border":"1px solid #3c8dbc"});
        tableRelation.isSelected = true;
        tableRelation.contentId = ref;
    }



};


TableRelation.prototype.mouse_scroll = function (e) {
    e = e || window.event;
    var delD = e.wheelDelta ? e.wheelDelta : -e.detail * 40;//判断上下方向
    var move_s = delD > 0 ? -10 : 10;
    if(tableRelation.isSelected){
        move_s = document.documentElement.scrollLeft;
    }
    document.documentElement.scrollLeft += move_s; //非chrome浏览器用这个
    //chrome浏览器用这个
    if (document.documentElement.scrollLeft == 0){
        document.getElementById("table_content").scrollLeft += move_s;
    }
};


TableRelation.prototype.objAddEvent = function (oEle, sEventName, fnHandler) {
    if (oEle.attachEvent) oEle.attachEvent('on' + sEventName, fnHandler);
    else oEle.addEventListener(sEventName, fnHandler, false);
};

TableRelation.prototype.objRemoveEvent = function (oEle, sEventName, fnHandler) {
    if (oEle.attachEvent) oEle.detachEvent('on' + sEventName, fnHandler);
    else oEle.removeEventListener(sEventName, fnHandler, false);
};

TableRelation.prototype.mouseRoll = function (isRemove, dbody) {
    var dbody = !!dbody ? dbody : document.getElementById('table_content');
    if (isRemove) {
        tableRelation.objAddEvent(dbody, 'DOMMouseScroll', function (e) {
            tableRelation.mouse_scroll(e);
        }); //ff用
        tableRelation.objAddEvent(dbody, 'mousewheel', function (e) {
            tableRelation.mouse_scroll(e);
        });
    } else {
        tableRelation.objRemoveEvent(dbody, 'DOMMouseScroll', function (e) {
            tableRelation.mouse_scroll(e);
        }); //ff用
        tableRelation.objRemoveEvent(dbody, 'mousewheel', function (e) {
            tableRelation.mouse_scroll(e);
        }); //非ff chrome 用
    }

};


TableRelation.prototype.scrollFunc = function (e) {
    ee = e || window.event;
    if (e.wheelDelta) {//IE/Opera/Chrome
        return e.wheelDelta;
    } else if (e.detail) {//Firefox
        return e.detail;
    }
};

TableRelation.prototype.tableHtml = function (name, alias, checkbox) {
    var var0 = [];
    var0.push("<div  style='width: 180px; float: left;margin:10px; border: 1px solid #666;'>");
    var0.push('<div class="box" id="' + name + '" style="margin-bottom: 0px; border-top: 0;">');
    var0.push('    <div class="box-header with-border">');
    var0.push('    <h3 class="box-title" style="font-weight: normal;">' + alias + '</h3>');
    var0.push('   <div class="box-tools">');
    var0.push('   <button onclick="tableRelation.allChecked(this,\''+name+'\')" style="padding: 4px 8px;" class="btn btn-default btn-sm checkbox-toggle"><i class="fa fa-square-o"></i></button>');
    var0.push('</div>');
    var0.push('</div>');
    var0.push('<div id="' + name + '_content" class="box-body no-padding" style="height: 185px; overflow-x: hidden; overflow-y: auto; ">' + checkbox + '</div>');
    var0.push('</div>');
    var0.push('</div>');

    return var0.join('')
};

TableRelation.prototype.allChecked = function ($this,name) {
    var clazz = $($this).find('i').attr('class');
    if(clazz.indexOf('fa-check-square-o') > -1)
    { //取消选中
        $($this).find('i').removeClass('fa-check-square-o').addClass('fa-square-o');
        $("#"+name+"_content").find("input[type='checkbox']").click();
    } else
    { //选中
        $($this).find('i').removeClass('fa-square-o').addClass('fa-check-square-o');
        $("#"+name+"_content").find("input[type='checkbox']").removeAttr("checked",true);
        //清空选中列数据
        tableRelation.removeTargetTable(name);

        $("#"+name+"_content").find("input[type='checkbox']").click();
    }

};


TableRelation.prototype.initRelationColumns = function () {
    $("#relationTable").append(tableRelation.getRelationsSetHtmlTr());
    tableRelation.tableChangeEvevnt()

};

TableRelation.prototype.tableChangeEvevnt = function () {
    $('select[name="mtable"],select[name="rtable"]').each(function () {
        $(this).change(function () {
            var $this = this;
            var tableId = $(this).find("option:selected").val();
            var tablename = $(this).find("option:selected").attr("ref");
            var columnRef = $(this).find("option:selected").attr('column-ref');

            $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: tableId}, function (data) {
                var options = tableRelation.getOptions(data, new Array("filed_name", "filed_name", "column_alias"),"id",tablename);
                $($this).parents("td").next().find("select").empty().append(options);

                if(!!columnRef) {
                    $($this).parents("td").next().find("select").val(columnRef);
                }

            });
        });
    });
};

TableRelation.prototype.getOptions = function (data,array,id,tablename) {
    if($.isDefined(data)) {
        if(data.success) {
            var rows = data.rows;
            var length =rows.length;
            var select = [];
            select.push('<option value="" ref=""></option>');
            if(!!id) {
                select.push('<option  value="'+tablename+'.id"ref="'+tablename+'.id">id</option>');
            }
            if(!!array) {
                for(var i = 0;i<length;i++){
                    select.push('<option value="'+tablename+"."+rows[i][array[0]]+'" ref="'+tablename+"."+rows[i][array[0]]+'">'+rows[i][array[2]]+'</option>');
                }
            }
            return select.join('');
        }
    }
};

TableRelation.prototype.getRelationsSetHtmlTr = function () {
    var var0 = [];
    var0.push('<tr edit="true">');
    for (var i = 0; i < tableRelation.relationLables.length; i++) {
        var0.push(tableRelation.getRelationsSetHtmlTd(tableRelation.relationLables[i],tableRelation.relationValues[i]));
    }
    var0.push('</tr>');
    return var0.join('');
};

TableRelation.prototype.getRelationsSetHtmlTd = function (label,value) {
    var var0 = [];
    var0.push('<td style="padding: 0px 8px;">');
    var0.push('<div class="form-group form-group-sm col-md-12" style="padding:5px 0px;margin-bottom:0px;">');
    var0.push('<div  class="col-md-12 " style="padding-left:0px;padding-right:0px;">');
    var0.push('<select name="'+value+'" class="form-control selectOption" >');

    if(value == 'mtable' || value == 'rtable') {
        var0.push('<option></option>');
        for(var i = 0;i<tableRelation.selectTable.length;i++) {
            var json = tableRelation.selectTable[i];
            var0.push('<option value="'+json.tableId+'" ref="'+json.tablename+'">'+json.tablealias+'</option>');
        }
    }
    if(value == 'join') {
        var0.push('<option value="inner" ref="inner" selected>内连接</option>');
        var0.push('<option value="left" ref="left">左外连接</option>');
        var0.push('<option value="right" ref="right">右外连接</option>');
    }
    var0.push('</select>');
    var0.push('</div>');
    var0.push('</div>');
    var0.push('</td>');

    return var0.join('')
};

TableRelation.prototype.initMouseEvent = function () {
    $("#conternbodyright").mouseenter(function () {
        tableRelation.isSelected = false;
        tableRelation.mouseRoll(true);
        tableRelation.initContentMouseEvent();
    });
    $("#conternbodyright").mouseleave(function () {
        tableRelation.mouseRoll(false);
        tableRelation.isSelected = false;
    });
};

TableRelation.prototype.initContentMouseEvent = function () {
    $("#tablebody").find(".box-body").each(function () {
        $(this).scroll(function () {
            var selected = $(this).parents('.box').attr('selected');
            if(!selected) { //未选中时
                var id  = $(this).attr('id');
                var ele = document.getElementById(id);
                ele.scrollTop = 0;
            }
        });
    });

    $('#tablebody').find(".box").each(function () {
        $(this).click(function () {
            var selected = $(this).attr('selected');
            if(!!selected) {
                //tableRelation.isSelected = false;
                //$(this).removeAttr('selected');
                //$(this).parent().css({"border":"1px solid #666"});
            } else {
                $('#tablebody').find(".box").removeAttr('selected');
                $('#tablebody').find(".box").parent().css({"border":"1px solid #666"});

                $(this).attr('selected',true);
                $(this).parent().css({"border":"1px solid #3c8dbc"});
                tableRelation.isSelected = true;
            }
        });

        $(this).mouseleave(function () {
            var selected = $(this).attr('selected');
            if(!!selected) {
                tableRelation.isSelected = false;
                $(this).removeAttr('selected');
                $(this).parent().css({"border":"1px solid #666"});
            }
        });
    })
};

TableRelation.prototype.initSave = function () {
    $("#baseDemo").find(".form-horizontal").find("button").removeAttr('onclick');
    $("#baseDemo").find(".form-horizontal").find("button").click(function () {
        tableRelation.saveViewsTable();
    })
};


TableRelation.prototype.initEditData= function()  {
    //$("#relation_columns").empty();
    $.getAjaxData(basePath+"/structureTable/editInitViewData.htm",{projectTableId:$("#tb-id").val(),tablename: $("#tb-name").val() },function (data) {

        var stdtable = new Array();

        var columns = data.columns;
        var length = !!columns ? columns.length : 0;

        tableRelation.resultColumn = columns;
        for(var i = 0;i<length;i++) {
            var fieldName = columns[i].filed_name;
            var split = fieldName.split("_");
            if($.inArray(split[0],stdtable) <= -1) {
                stdtable.push(split[0]);
            }
        }

        var length = !!data.relations ? data.relations.length:0;
        if(length > 0) {
            for(var i = 0;i<length;i++) {
                tableRelation.initRelationColumns();
            }
        } else {
            tableRelation.initRelationColumns();
        }

        for(var i = 0;i<stdtable.length;i++) {
            $("input[value='"+stdtable[i]+"']").click();
        }

        for(var i = 0;i<length;i++) {
            var json = data.relations[i];
            var mtable = $("select[name='mtable']:eq("+i+")");
            $(mtable).find("option[ref='"+json.mtable+"']").attr("selected",true);
            $(mtable).find("option[ref='"+json.mtable+"']").attr("column-ref",json.mcolumn);
            $(mtable).change();

            var rtable = $("select[name='rtable']:eq("+i+")");
            $(rtable).find("option[ref='"+json.rtable+"']").attr("selected",true);
            $(rtable).find("option[ref='"+json.rtable+"']").attr("column-ref",json.rcolumn);
            $(rtable).change();
        }

    });
};

TableRelation.prototype.initSelectClick = function () {
  $("#relationTable").delegate("tr",'click', function (event) {
      var target = $(event.target);
      if($(target).get(0).localName !='select') {
          var selected = $(this).attr("selected");
          if(!!selected) {
              $(this).removeAttr('selected');
              $(this).removeAttr('selected');
              $(this).removeAttr('style');
              $(this).find("select,input").removeAttr('style');

          } else{
              $("#relationTable").find("tr").removeAttr('selected');
              $("#relationTable").find("tr").removeAttr('style');
              $("#relationTable").find("tr").find("select,input").removeAttr('style');

              $(this).attr('selected','selected');
              $(this).css({'background':"#ccc"});
              $(this).find("select,input").css({'background':"#ccc"});
          }
      }
  });
};

TableRelation.prototype.deleteRelationColumns = function () {
   var length = $("tr[selected]").length;
   if(length >0) {
        if(confirm('您确定删除吗?')) {
            $("tr[selected]").remove();
        }
   }  else {
       alert("请选择一条表关联关系!");
   }
};
$(function () {
    tableRelation.initSave();
    tableRelation.initMouseEvent();
    tableRelation.initEditData();
    tableRelation.initSelectClick();
});