var CreateTableJS = function () {
    this.pageJSON = {};
};

var tableJs = new CreateTableJS();
CreateTableJS.prototype.parseHtml = function (data) {
    tableJs.pageJSON.iptPageName = tableJs.returnInputJSON(data, $('#iptPageName'));
    tableJs.pageJSON.iptEtableName = tableJs.returnInputJSON(data, $('#iptEtableName'));
    tableJs.pageJSON.searchForm = tableJs.returnSearchForm(data);
    tableJs.pageJSON.datatable = tableJs.returnTable(data);
    tableJs.pageJSON.button = tableJs.returnBtn(data);

    if(typeof(pageType) != 'undefined' && pageType == '4') {
        tableJs.pageJSON.tree = tableJs.returnTreeHtml(data);
    }
    return tableJs.pageJSON;
};


CreateTableJS.prototype.returnTreeHtml = function (data) {
    var leftTree = $(data).find("#leftTreeLists");
    var title = $(leftTree).find('#treeTitleSpan').text();
    var ztree = $(leftTree).find('#ztree');
    var tablename = $(ztree).attr('tablename');
    var searchcolumn = $(ztree).attr('searchcolumn');
    var displaycolumn = $(ztree).attr('displaycolumn');

    var tree = {};
    tree.title = title;
    tree.tablename = tablename;
    tree.searchcolumn = searchcolumn;
    tree.displaycolumn = displaycolumn;
    return tree;
};

CreateTableJS.prototype.returnBtn = function (data) {
    var result = [];
    var _this = $(data).siblings("#tableContent").length > 0 ? $(data).siblings("#tableContent").find('.pull-right') : $(data).find("#tableContent").find('.pull-right');
    _this.find('div[type="button"],button[type="button"]').each(function () {
        var json = {};
        json.id = $(this).attr('id');
        json.type = $(this).attr('type');
        json.name = $(this).find('span').text();
        json.click = $(this).attr('click');
        json.formid = $(this).attr('formid');
        json.formname = $(this).attr('formname');
        json.file_name = $(this).attr('file_name');
        result.push(json);
    });
    return result;
};

CreateTableJS.prototype.returnSearchForm = function (data) {
    var json = {};
    var jsons = [];
    $(data).find("#searchForm").find('.form-group').each(function () {
        var ref = $(this).attr('ref');
        if(ref == 'space') {
            var newJson = {};
            var var0 = [];
            $(this).find('input').each(function () {
                var var1 = tableJs.returnInputJSON(data, this);
                var0.push(var1);
            });
            newJson.type = 'space_datetime';
            newJson.data = var0;
            newJson.label = $(this).find('label').text();
            jsons.push(newJson);
        } else {
            var _this = ($(this).find('input').length > 0) ? $(this).find('input') : $(this).find('select');
            jsons.push(tableJs.returnInputJSON(data, _this))
        }


    });
    json.title = $(data).find('#searchTitle').text();
    json.data = jsons;
    return json;
};

CreateTableJS.prototype.returnTable = function (data) {
    var table = $(data).siblings("#tableContent").length > 0 ? $(data).siblings("#tableContent") : $(data).find("#tableContent");
    var json = {};

    json.tableTitle = $(table).find('#tabletitle').text();
    json.tableId    = $(table).find('#worktable').attr('id');
    json.tableName  = $(table).find('#worktable').attr('data-tablename');
    json.btns       = tableJs.filterUndefined($(table).find('#worktable').attr('btns'));
    json.tableType  = tableJs.filterUndefined($(table).find('#worktable').attr('tableType'));

    var columns = [];
    $(table).find('#worktable thead tr th').each(function () {
        var var0 = {};
        var0.id = $(this).attr('id');
        var0.columnName = $(this).attr('column-name');
        var0.labelName = $(this).text();
        var0.tablename = $(this).attr('tablename');
        var0.displayname = $(this).attr('columnname');
        columns.push(var0)
    });
    json.column = columns;
    return json;
};


CreateTableJS.prototype.returnInputJSON = function (data, _this) {
    var json = {};

    json.label = $(_this).prev().text();
    json.type = tableJs.getAttr(_this, 'type');
    json.name = tableJs.getAttr(_this, 'name');
    json.id = tableJs.getAttr(_this, 'id');
    json.tablename = tableJs.getAttr(_this, 'tablename');
    json.displaycolumn = tableJs.getAttr(_this, 'displaycolumn');
    json.placeholder = tableJs.getAttr(_this, 'placeholder');
    json.format = tableJs.getAttr(_this, 'format');
    json.where = tableJs.getAttr(_this, 'where');
    json.dataRole = tableJs.getAttr(_this, 'data-role');
    return json;
};

CreateTableJS.prototype.getAttr = function (_this, attr) {
    return !!$(_this).attr(attr) ? $(_this).attr(attr) : '';
};






CreateTableJS.prototype.getHtml = function (pageJSON) {
    var searchJson = pageJSON.searchForm;
    var datatable  = pageJSON.datatable;
    var btns       = pageJSON.button;
    var tree       = pageJSON.tree;

    var searchHtml = tableJs.getSearchBlockHtml(searchJson);
    var datatable = tableJs.getTableContentHtml(datatable,btns);


    var var0 = [];

    if(!!tree) {
        var treeHtml = tableJs.getLeftTableHtml(tree);
        var0.push(treeHtml);
    }
    if(!!tree) {
        var0.push('<div class="col-md-9">');
    }
    var0.push(searchHtml);
    var0.push(datatable);
    if(!!tree) {
        var0.push('</div>');
    }
   return var0.join('');

};


CreateTableJS.prototype.getLeftTableHtml = function (tree) {
    var var0 = [];

    var0.push('<div class="col-md-3">');
    var0.push(  '<div class="box box-primary">');
    var0.push(      '<div class="box-header with-border">');
    var0.push(          '<h3 class="box-title">'+tree.title+'</h3>');
    var0.push(      '</div>');
    var0.push(      '<div class="box-body">');
    var0.push(          '<div class="tree">');
    var0.push(              '<ul class="ztree" id="ztree" tablename="'+tree.tablename+'" searchcolumn="'+tree.searchcolumn+'" displaycolumn = "'+tree.displaycolumn+'"></ul>');
    var0.push(          '</div>');
    var0.push(      '</div>');
    var0.push(   '</div>');
    var0.push('</div>');

    return var0.join('');
};

CreateTableJS.prototype.getInputHtml = function (json) {
    var var0 = [];
    var0.push('<div class="form-group col-md-2" data-control-type="'+json.type+'">');
    var0.push(  '<label for="'+json.id+'">' + (!!json.label ? json.label :'&nbsp;') + '</label>');
    var attr = '';
    if(json.type == 'datetime') {
        attr = 'format = "'+json.format+'" readOnly="true" style="background: #fff;"';
    }
    var0.push(  '<input type="type" id="'+json.id+'" name="'+json.name+'"  where = "'+json.where+'" class="form-control" placeholder="'+json.placeholder+'" '+attr+'>');
    var0.push('</div>');
    return var0.join('');
};


CreateTableJS.prototype.getSelectHtml = function (json) {
    var var0 = [];
    var0.push('<div class="form-group col-md-2" data-control-type="'+json.type+'">');
    var0.push(  '<label for="'+json.id+'">' + (!!json.label ? json.label :'&nbsp;') + '</label>');
    var0.push(  '<select class="form-control selectOption" data-role="select" id="'+json.id+'" name="'+json.name+'" table="'+json.tablename+'" column="'+json.displaycolumn+'"></select>');
    var0.push('</div>');
    return var0.join('');
};


CreateTableJS.prototype.getSpaceHtml = function (json) {
    var var0 = [];
    var0.push('<div class="col-md-4 form-group" data-control-type="'+json.type+'">');
    for(var i = 0;i<json.data.length;i++) {
        if(i ==0) {
            var0.push('<label>' + (!!json.label ? json.label :'&nbsp;') + '</label>');
            var0.push('<div class="input-group" style="clear: both;">');
            var0.push('<input type="text" class="form-control" size="16" name="'+json.data[i].name+'" format="'+json.data[i].format+'" data-role="'+json.data[i].dataRole+'" placeholder="'+json.data[i].placeholder+'" style="background:#fff; width: 46%; float: left;">');
            var0.push('<span style="width: 8%; height: 34px; line-height: 34px; display: block; text-align: center; font-size: 12px; background: #999; color: #fff; float: left;">至</span>');
        } else {
            var0.push('<input type="text" class="form-control " size="16" name="'+json.data[i].name+'" format="'+json.data[i].format+'" data-role="'+json.data[i].dataRole+'" placeholder="'+json.data[i].placeholder+'" style="background:#fff;width: 46%; float: left;">');
            var0.push('</div>');
        }
    }
    var0.push('</div>');
    return var0.join('');
};


CreateTableJS.prototype.getSearchBlockHtml = function (searchJson) {
    var var0 = [];
    if(!!searchJson.data && searchJson.data.length>0) {

        var0.push('<div class="box box-primary collapsed-box">');
        var0.push(  '<div class="box-header with-border">');
        var0.push(      '<h3 class="box-title">'+searchJson.title+'</h3>');
        var0.push(      '<div class="box-tools pull-right">');
        var0.push(          '<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>');
        //var0.push(          '<button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>');
        var0.push(      '</div>');
        var0.push( '</div>');
        var0.push( '<div class="box-body">');
        var0.push(  '<form id="searchForm">');

        for(var i = 0;i<searchJson.data.length;i++) {
            var json = searchJson.data[i];
            var type = json.type;
            switch (type) {
                case 'text':
                    var0.push(tableJs.getInputHtml(json));
                    break;
                case 'datetime':
                    var0.push(tableJs.getInputHtml(json));
                    break;
                case 'select':
                    var0.push(tableJs.getSelectHtml(json));
                    break;
                case 'space_datetime':
                    var0.push(tableJs.getSpaceHtml(json));
                    break;
            }

        }


        var0.push('<div class="form-group col-md-2">');
        var0.push(     '<button type="button" class="btn btn-primary btn-sm" style="margin-top: 27px;" onclick="search()">搜索</button> ');
        var0.push(     '<button type="button" class="btn btn-defalut btn-sm" style="margin-top: 27px;" onclick="reset()">清空</button> ');
        var0.push('</div>');
        var0.push(  '</form>');

        var0.push( '</div>');
        var0.push('</div>');
    }
    return var0.join('');
};


CreateTableJS.prototype.getTableContentHtml = function (datatable,btns) {
    var var0 = [];
    var flag = true;
    var0.push('<div class="box box-primary">');
    var0.push(  '<div class="box-header with-border">');
    var0.push(      '<h3 class="box-title">'+datatable.tableTitle+'</h3>');
    var0.push(      '<div class="box-tools pull-right">');
    if(!!btns) {
        for(var i = 0;i<btns.length;i++) {
            var var1 = '';
            if(!!btns[i].click && btns[i].click == 'pop') {
                var1 = 'data-toggle="modal"  data-target="#previewModal"';
            } else if(!!btns[i].click && btns[i].click == 'import') {
                var1 = 'data-toggle="modal"  data-target="#importFile"';
            }
            var0.push(  '<button id="'+btns[i].id+'" class="btn btn-primary btn-sm" '+var1+' formpage="'+(!!btns[i].file_name ? btns[i].file_name : 'click')+'">'+btns[i].name+'</button> ');
            if(btns[i].click == 'pop') {
                if(flag) {
                    var0.push(BaseControl.getPopWindowHtml('',''));
                    flag = false;
                }



            } else if(btns[i].click =='import') {
                var0.push(BaseControl.getFileImportHtml());
            }
        }
    }
    var0.push(      '</div>');
    var0.push(  '</div>');
    var0.push(  '<div class="box-body">');
    var0.push(      '<table id="'+datatable.tableId+'" tableType="'+datatable.tableType+'" class="table table-hover table-striped" data-tablename="'+datatable.tableName+'" btns="'+tableJs.filterUndefined(datatable.btns)+'">');
    var0.push(          '<thead>');

    var0.push('<tr>');
    if(!!datatable.column) {
        for(var i = 0;i<datatable.column.length;i++) {
            var col = datatable.column[i];
            var tablename = '',displayname = '';
            if(!!col.tablename) {
                tablename = " tablename='" +col.tablename + "'" ;
            }
            if(!!col.displayname) {
                displayname = " displayname='" +col.displayname + "'" ;
            }
            var0.push('<th id="'+col.id+'" column-name="'+col.columnName+'" '+tablename + displayname +' class="ui-draggable" style="position: relative;">'+col.labelName+'</th>');
        }
    }
    var0.push('</tr>');
    var0.push(          '</thead>');
    var0.push(      '</table>');
    var0.push(  '</div>');
    var0.push('</div>');
    return var0.join('');
};

CreateTableJS.prototype.filterUndefined = function (value) {
    return !!value ? value :'';
};



