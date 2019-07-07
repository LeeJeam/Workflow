var DesignSearchLabel = function () {

};

DesignSearchLabel.prototype.init = function () {
    $('#searchForm').delegate('input[type="text"],select','click', function () {
        var $this = this;
        $($this).addClass('cutActive');
        $($this).parents('.form-group').addClass("hasFocus");
        $('#searchForm').find('input[type="text"],select').each(function () {
            if($this != this) {
                $(this).removeClass('cutActive');
                $(this).parents('.form-group').removeClass("hasFocus");
            }
        });
        var id = $($this).attr('id');
        var text = $($this).parent().siblings().text().trim();
        if(!!text) {
            $("#modifySelectName").val(text);
        }else {
            $("#modifySelectName").val('');
        }
        if(!!id) {
            $('#propertiesColumns').val(id);
        } else {
            $('#propertiesColumns').val('');
        }
        var type = $(this).get(0).type;
        if(type == 'select-one') {
            $.getAjaxData(basePath + '/createDataTable/getTables.htm',{},designSearchLabel.initRelationTable,null,'false'); //从数据库中查询表，除自己以外的表
        } else {
            $('#relationTables').remove();
            $('#relationColumns').remove();
        }
    });
};

/***
 * 初始化关系表
 */
DesignSearchLabel.prototype.initRelationTable = function (data){
    if(data.success) {
        $('#relationTables').remove();
        var tableId = $('#tableName').val(); //获取到选择的表id
        var rows = data.rows;

        var options = '<option></option>';
        for (var i = 0; i < rows.length; i++) {
            if (tableId != rows[i].id) {
                options += '<option value="' + rows[i].id + '">' + rows[i].table_alias + '</option>';
            }
        }
        var select = designSearchLabel.mosaicSelectHTML('relationTables', '选择数据源:', 'relationTable', options, 'designSearchLabel.createDisplayColumns()');
        $('#properties').append(select);

        if(!!$('.cutActive').attr('tableid')) {
            $('#relationTable').val($('.cutActive').attr('tableid'));
        }
    }

    if (!!$('.cutActive').attr('column')) {
        $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm',{tableId:$('.cutActive').attr('tableid')},designSearchLabel.initRelationColumns,null,'false'); //从数据库中查询表，除自己以外的表
    }
};

/***
 * 初始化关系表中对应的所有列
 * @param data
 */
DesignSearchLabel.prototype.initRelationColumns = function (data) {
    if(data.success) {
        $('#relationColumns').remove();
        var rows = data.rows;
        var options = '<option></option>';
        for(var i =0;i<rows.length;i++) {
            options += '<option value="'+rows[i].filed_name+'">'+rows[i].column_alias+'</option>';
        }
        var select = designSearchLabel.mosaicSelectHTML('relationColumns','显示字段:','relationColumn',options,'designSearchLabel.addPropertiesToLabel()');
        $('#properties').append(select);

        $('#relationColumn').val($('.cutActive').attr('column'));
    }
};

/***
 * 选择关系表后显示表对应的所有列
 */
DesignSearchLabel.prototype.createDisplayColumns = function () {
    var tableId = $('#relationTable').val(); //当值改变的时候
    var table = $('#relationTable option:selected').text();
    $('.cutActive').attr('table',table);
    $('.cutActive').attr('tableid',tableId);
    $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm',{tableId:tableId},designSearchLabel.setRelationColumns); //从数据库中查询表，除自己以外的表
};

/****
 * 设置所有列信息放到下拉框中
 * @param data
 */
DesignSearchLabel.prototype.setRelationColumns = function (data) {
    if(data.success) {
        $('#relationColumns').remove();
        var rows = data.rows;
        var options = '<option></option>';
        for(var i =0;i<rows.length;i++) {
            options += '<option value="'+rows[i].filed_name+'">'+rows[i].column_alias+'</option>';
        }
        var select = designSearchLabel.mosaicSelectHTML('relationColumns','选择数据源中需显示的字段:','relationColumn',options,'designSearchLabel.addPropertiesToLabel()');
        $('#properties').append(select);
    }
};

/***
 * 添加选中的列的信息到标签中
 */
DesignSearchLabel.prototype.addPropertiesToLabel = function () {
    var column = $('#relationColumn').val();
    $('.cutActive').attr('column',column);
};

/****
 * 拼接select html代码
 * @param id
 * @param label
 * @param selectId
 * @param options
 * @param callback
 * @returns {string}
 */
DesignSearchLabel.prototype.mosaicSelectHTML = function(id,label,selectId,options,callback) {
    var html = [];
    html.push('<div id="'+id+'" class="prop-mg-lr">');

    html.push('<div class="form-group-prop">');
    html.push('<label class="control-label">'+label+'</label>');
    html.push('<div class="controls"><select id="'+selectId+'" class="form-control" onchange="'+callback+'">'+options+'</select></div>');
    html.push('</div>');

    html.push('</div>');
    return html.join('');
};

