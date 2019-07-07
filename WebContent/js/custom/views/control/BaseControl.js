var BaseControl = {
    getOptions: function (data,array,id,noneFlag) {
        if($.isDefined(data)) {
            if(data.success) {
                var rows = data.rows;
                var length =rows.length;
                var select = [];
                if(!noneFlag) {
                    select.push('<option value="none"></option>');
                }

                if(!!id) {
                    select.push('<option value="id" selected>id</option>');
                }
                if(!!array) {
                    for(var i = 0;i<length;i++){
                        select.push('<option value="'+rows[i][array[0]]+'" ref="'+rows[i][array[1]]+'" column-type='+rows[i][array[3]]+'>'+rows[i][array[2]]+'</option>');
                    }
                }
                return select.join('');
            }
        }
    },
    getOptionsHtml: function (data) {
        var var0 = [];
        for(var i = 0;i<data.length;i++){
            var json = data[i];
            for(var key in json) {
                var0.push('<option value="'+key+'">'+json[key]+'</option>');
            }
        }
        return var0.join('');
    },
    getSelect: function (_label,_eleId,attrs,flag,option) {
        var var0 = [];
        var0.push(  '<div class="form-group-prop search_btn">');
        var0.push(      '<label '+(!flag ? 'class="control-label"' : 'class="label_property"')+'>'+_label+'</label>');
        var0.push(      '<div class="controls">');
        var0.push(          '<select id="'+_eleId+'" class="form-control input-sm"');
        if(!!attrs) {
            for(var i = 0;i<attrs.length;i++) {
                var0.push(" "+attrs[i] + "=" + "'" + attrs[i]+"'");
            }
        }
        var0.push('>'+(!!option ? option : '')+'</select>');
        var0.push(      '</div>');
        var0.push(  '</div>');
        return var0.join('');
    },
    getCheckbox: function (_label,eleId,_json,_array,tablename,fn) {
        var var0 = [];
        var0.push('<div class="form-group-prop search_btn" id="'+eleId+'">');
        var0.push(  '<label class="control-label">'+_label+'</label>');
        var0.push(  '<div class="controls">');
        var0.push(      '<div class="col-lg-12" style="padding-left: 0px;">');
        if(!!_json) {
            for(var i = 0;i<_json.length;i++) {
                var row = _json[i];
                var0.push('<div class="checkbox" style="margin-top: 5px;">');
                var var1 = '';
                if(!!tablename) {
                    var1 = tablename + "." + row[_array[0]];
                } else {
                    var1 = row[_array[0]];
                }
                var0.push(  '<label><input type="checkbox" name="check" onclick='+(typeof(fn) !='undefined' ? '"' + fn + '"' :"TableControl.columnclick(this)")+' value="'+var1+'" style="margin-top: -2px;">'+row[_array[1]]+'</label>');
                var0.push('</div>');
            }
        }
        var0.push('</div>');
        var0.push('</div>');
        var0.push('</div>');

        return var0.join('');
    },
    getInput: function (_label,_eleId,flag) {
        var var0 = [];
        var0.push('<div class="row">');
        var0.push('<div class="prop-mg-lr col-md-12">');
        var0.push(  '<div class="form-group-prop search_btn">');
        var0.push(      '<label '+(!flag ? 'class="control-label"' : 'class="label_property"')+'>'+_label+'</label>');
        var0.push(      '<div class="controls">');
        var0.push(          '<input type="text" id="'+_eleId+'" class="form-control input-sm" name="'+_eleId+'">');
        var0.push(      '</div>');
        var0.push(  '</div>');
        var0.push('</div>');
        var0.push('</div>');
        return var0.join('');
    },
    getLabelHtml: function (_label,labelvalue,style,flag) {
        var var0 = [];
        var0.push('<div class="row">');
        var0.push('<div class="prop-mg-lr col-md-12">');
        var0.push(  '<div class="form-group-prop search_btn">');

        var0.push('<label '+(!flag ? 'class="control-label"' : 'class="label_property"')+'>'+_label+'</label>');

        var0.push(      '<div class="controls">');
        var0.push(          '<label  class="control-label" style=\''+(!!style ? style : '')+'\'>'+labelvalue+'</label>');
        var0.push(      '</div>');
        var0.push(  '</div>');
        var0.push('</div>');
        var0.push('</div>');
        return var0.join('');
    },
    getSelectTreeHtml: function (_label,_eleId) {
        var var0 = [];
        var0.push('<div class="form-group-prop search_btn">');
        var0.push(   '<label class="control-label">'+_label+'</label>');
        var0.push(   '<div class="controls">');
        var0.push(       '<div style="position: relative;">');
        var0.push(            '<input type="hidden" name="'+_eleId+'Id" id="'+_eleId+'Id">');
        var0.push(            '<input type="text" id="'+_eleId+'" class="form-control input-sm tree-menu" name="'+_eleId+'">');
        var0.push(            '<div class="tree-'+_eleId+'"><ul class="ztree" id="function_demo"></ul></div>');
        var0.push(       '</div>');
        var0.push(   '</div>');
        var0.push('</div>');
        return var0.join('');
    },
    propertyHide: function (hide,block) {
        $(hide).addClass('hide');
        $(block).removeClass("hide");
        $(block).prev().removeClass("hide");
        $(block).slideDown("slow");
        $(block).prev().find("i").attr("class", "fa fa-caret-down");
    },
    propertyHides: function (hide,arrays) {
        $(hide).addClass('hide');
        for(var i = 0;i<arrays.length;i++) {
            $(arrays[i]).removeClass("hide");
            $(arrays[i]).prev().removeClass("hide");
            $(arrays[i]).slideDown("slow");
            $(arrays[i]).prev().find("i").attr("class", "fa fa-caret-down");
        }
    },
    setAttr: function (ele,keys,value,flag) {
        if(flag) {
            for(var i =0 ;i<keys.length;i++) {
                $(ele).attr(keys[i],value);
            }
        } else {
            for(var i =0 ;i<keys.length;i++) {
                $(ele).removeAttr(keys[i]);
            }

        }
    },
    bindTables: function (callback) {
        $.getAjaxData(basePath + '/createDataTable/getTables.htm', {}, function (data) {
            if(!!callback) {
                callback(data);
            }
        });
    },
    bindTableColumns: function (tableId,callback) {
        $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: tableId}, function (data) {
            if(!!callback) {
                callback(data);
            }
        });
    },
    getBtnBackgroundColorHtml: function () {
        var var0 = [];
        var0.push('<div class="btn-group" id="btn-group" style="width: 100%; margin-bottom: 10px;display:none">');
        var0.push(  '<ul class="fc-color-picker" id="color-chooser">');
        var0.push(      '<li><a class="text-aqua" href="#" ref="#00c0ef"><i class="fa fa-square"></i></a></li>');
        var0.push(      '<li><a class="text-light-blue" href="#"  ref="#3c8dbc"><i class="fa fa-square"></i></a></li>');
        var0.push(      '<li><a class="text-yellow" href="#"  ref="#f39c12"><i class="fa fa-square"></i></a></li>');
        var0.push(      '<li><a class="text-green" href="#"  ref="#00a65a"><i class="fa fa-square"></i></a></li>');
        var0.push(      '<li><a class="text-red" href="#"  ref="#dd4b39"><i class="fa fa-square"></i></a></li>');
        var0.push(      '<li><a class="text-muted" href="#"  ref="#777"><i class="fa fa-square"></i></a></li>');
        var0.push(  '</ul>');
        var0.push('</div>');
        return var0.join('')
    },
    loadTree: function (url,params,ele,callback,callback2) {
        var url = !!url ? url : (typeof(baseUrl) == 'undefined' ? basePath : baseUrl)+"/sysFunction/findFormTreeNode.htm";
        $.getTree(url,params,ele,callback2);
        callback();
    },
    getPopWindowHtml: function (id,content,btns,fns,lgFlag) {
        var var0 = [];
        var0.push('<div class="modal fade '+(!!lgFlag ? 'bs-example-modal-lg' : '')+'" id="'+(!!id ? id : 'previewModal')+'">');
        var0.push(  '<div class="modal-dialog '+(!!lgFlag ? 'modal-lg' : '')+'" role="document">');
        var0.push(      '<div class="modal-content">');
        var0.push(          '<div class="modal-header">');
        var0.push(              '<button id="modal_close" class="close" data-dismiss="modal" aria-label="Close">');
        var0.push(                  '<span aria-hidden="true">×</span>');
        var0.push(              '</button>');
        var0.push(              '<h4 class="modal-title"></h4>');
        var0.push(          '</div>');
        var0.push(          '<div class="modal-body">'+content+'</div>');
        var0.push(BaseControl.getFormBtnsHtml(btns,fns));
        var0.push(      '</div>');
        var0.push(  '</div>');
        var0.push('</div>');
        return var0.join('');
    },

    getUtilsContent : function () {
        var var9 = [];
        var9.push('<div style="height:340px;margin-top: 10px;overflow: hidden;">');
        var9.push(  '<div class="row">');
        var9.push(       '<div  class="col-md-4" style="padding-right: 0px;"><div id="typeLists" style="height:340px;border:1px solid #ccc;overflow-y: auto;overflow-x: hidden;"></div></div>');
        var9.push(       '<div class="col-md-8">');
        var9.push(          '<div class="input-group">');
        var9.push(              '<input type="hidden" name="id" id = "id"/>');
        var9.push(              '<input type="text" name="name" id="name"  class="form-control input-sm" style="width: 100%;" placeholder="搜索框"/>');
        var9.push(              '<span class="input-group-btn">');
        var9.push(                  '<button type="button" id="search" class="btn btn-primary btn-flat btn-sm"><i class="fa fa-search"></i></button>');
        var9.push(              '</span>');
        var9.push(          '</div>');
        var9.push(          '<div style="height:300px;border:1px solid #ccc;margin-top:10px;overflow-y: auto;overflow-x:hidden; ">');
        var9.push(              '<div class="tree-submenu1"><ul class="ztree" id="function_demo"></ul></div><input type="hidden" name="funcId">');
        var9.push(          '</div>');
        var9.push(      '</div>');
        var9.push('</div>');


        var9.push('</div>');
        return var9.join('');
    },

    getFormBtnsHtml: function (jsons,fns) {
        if(!jsons) {
            jsons = [{"form_btn_cance":'取消'},{'form_btn_save':'保存'},{'form_btn_submit':'提交'}];
        }
        if(!fns) {
            fns = new Array();
            fns.push('data-dismiss="modal"');
            fns.push('onclick="formSubmit(1)"');
            fns.push('onclick="formSubmit(0)""');
        }

        var var0 = [];
        var0.push(          '<div class="modal-footer">');
        for (var i = 0;i < jsons.length;i++) {
            var json = jsons[i];
            for(var key in json) {
                var0.push('<button class="btn '+(key=='form_btn_cance' ?'btn-default' : 'btn-primary')+' btn-sm" id="'+key+'" '+fns[i]+'>'+json[key]+'</button>');
            }
        }
        var0.push('</div>');
        return var0.join('');
    },
    getFileImportHtml:function () {
        var var0 = [];
        var0.push('<div class="modal fade" id="importFile">');
        var0.push(    '<div class="modal-dialog" role="document">');
        var0.push(        '<div class="modal-content"> ');
        var0.push(            '<div class="modal-header">');
        var0.push(                '<button type="button" id="modal_close" class="close" data-dismiss="modal" aria-label="Close">');
        var0.push(                    '<span aria-hidden="true">×</span>');
        var0.push(                '</button>');
        var0.push(                '<h4 class="modal-title">导入数据</h4>');
        var0.push(            '</div>');
        var0.push(            '<div class="modal-body">');
        var0.push(                '<form id="excelForm" class="form-horizontal">');
        var0.push(                    '<div class="form-group" id="form-group-fileQueue">');
        var0.push(                        '<label class="col-md-4 control-label">添加文件：</label>');
        var0.push(                        '<div class="col-md-6">');
        var0.push(                            '<div id="importFileQueue" class="fileupload fileupload-new">');
        var0.push(                                '<input type="file" name="file" id="importUploadify" />');
        var0.push(                            '</div>');
        var0.push(                        '</div>');
        var0.push(                    '</div>');
        var0.push(                '</form>');
        var0.push(            '</div>');
        var0.push(            '<div class="modal-footer">');
        var0.push(                '<button type="button" id="importClose" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>');
        var0.push(                '<button type="button" id="submitImportData" class="btn btn-primary btn-sm">提交</button>');
        var0.push(            '</div>');
        var0.push(        '</div>');
        var0.push(    '</div>');
        var0.push('</div>');
        return var0.join('');

    },
    getTableThHtml: function (counmname,labelname,id,column,mtid,mcid,index) {
        return '<th id="'+counmname+'" column-name="'+counmname+'" index='+index+' relations="'+id+'" column="'+column+'" mtid = '+mtid+' mcid='+mcid+' class="ui-draggable" style="position: relative;">'+labelname+'</th>';
    },
    getSelectedOptionHtml: function (ref,text,callback,type) {
        var var1 = [];
        var1.push('<div class="pitch" ref="'+ref+'" type="'+(!!type ? type : '')+'">');
        var1.push(  '<div class="pitchContent">'+text);
        var1.push(      '<a href="#"><i class="fa fa-close" onclick="'+callback+'"></i></a>');
        var1.push(  '</div>');
        var1.push('</div>');

        return var1.join('');
    }
};