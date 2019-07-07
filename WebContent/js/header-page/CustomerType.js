var CustomerType = function () {
    this.pageTypes = ["全部类型", "流程表单", "表格", "自定义表单", "树形表格"];
    this.pageValues = ["", "5", "1", "2", "4"];
    this.datatype;
    this.leftTypeId;

    this.removeId=[];
    this.updateId=[];


    this.datasource = ["全部类型","普通表","树形结构表","字典表","级联表","多关联表"];
    this.datavalues = ["0","1","2","3","4","5"];


    this.flowType ;

    this.setDataType = function (dataType) {
        this.datatype = dataType;
    };
    this.setFlowType = function (flowType) {
        this.flowType = flowType;
    };
};

var dataType = new CustomerType();


CustomerType.prototype.loadPage = function (type) {
    dataType.datatype = type;
    $.post(basePath + "/header/getDataTypePage.htm", null, function (data) {

        $("#functionPage-Sort").html(data);
        $("#dataTypeTable tbody").empty();

        switch (type) {
            case "flowprocess":
                $.getAjaxData(basePath + "/header/findProcessType.htm", {type: type}, function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var index = i + 1;
                        $("#dataTypeTable tbody").append(dataType.addTrHtml(index, data[i].typename, data[i].createdate, data[i].ID));
                    }
                });
                break;
            default :
                $.getAjaxData(basePath + "/header/getDataTypeLists.htm", {type: type}, function (data) {
                    if (data.success) {
                        var rows = data.lists;
                        for (var i = 0; i < rows.length; i++) {
                            var index = i + 1;
                            $("#dataTypeTable tbody").append(dataType.addTrHtml(index, rows[i].name, rows[i].createdate, rows[i].id));
                        }
                    }
                });
        }

    });
    dataType.documentClick();
};

CustomerType.prototype.removeTr = function ($this,id) {
    var tablename = '',typename = '';
    if(!!id) {
        switch(dataType.datatype) {
            case 'datasource':
                tablename = "project_table";
                break;
            case 'flowprocess':
                tablename = "t_p_process";
                typename = $($this).parents('tr').find('td:eq(1)').text();
                break;
            default :
                tablename = "sys_function";
                break;

        }
        $.getAjaxData(basePath+"/header/getCount.htm",{tablename:tablename,id:id,typeId:typename},function (data) {
            if(data) {
                alert("请先删除类型关联的数据!");
            } else {
                if (confirm('您确定删除吗?')) {
                    var id = $($this).parents("tr").attr('id');
                    if(!!id) {
                        dataType.removeId.push(id);
                    }
                    $($this).parents("tr").remove();

                }
            }
        });
    } else {
        if (confirm('您确定删除吗?')) {
            var id = $($this).parents("tr").attr('id');
            if(!!id) {
                dataType.removeId.push(id);
            }
            $($this).parents("tr").remove();

        }
    }


};
CustomerType.prototype.edit = function ($this) {
    var td01 = $($this).parents('td');
    var td02 = $(td01).prev();
    var td03 = $(td02).prev();
    var name = $(td03).text();
    var date = $(td02).text();

    $(td03).empty().append('<input type="text" name="typename" id="typename"  class="form-control input-sm pull-right" style="width: 100%;" value="' + name + '">');
    $(td02).empty().append('<input type="text" name="createdate" id="createdate"  class="form-control input-sm pull-right" style="width: 100%;" value="' + date + '">');

    dataType.initDatetimepicker($(td02).find("input").attr("name"), 'yyyy-mm-dd');

    $($this).addClass("hide");
    $($this).next().removeClass("hide");
};


CustomerType.prototype.editConfirm = function ($this) {
    var id   =  $($this).parents('tr').attr("id");
    if(!!id) {
        dataType.updateId.push(id);
    }
    var td01 = $($this).parents('td');
    var td02 = $(td01).prev();
    var td03 = $(td02).prev();

    var name = $(td03).find('input').val();
    var date = $(td02).find('input').val();

    $(td02).empty().text(date);
    $(td03).empty().text(name);

    $($this).addClass("hide");
    $($this).prev().removeClass("hide");
};

CustomerType.prototype.initDatetimepicker = function (eleId, format) {
    if (!!eleId) {
        dataType.dtpicker("input[name='" + eleId + "']", {
            language: 'zh-CN',
            format: format,
            todayBtn: 1,
            autoclose: 1,
            startView: 2,
            minView: 2
        });
    }
};

CustomerType.prototype.dtpicker = function (selector, options) {
    try {
        options = $.extend({
            readOnly: true,
            minView: 2
        }, options);
        $(selector).datetimepicker(options);
    } catch (ex) {
    }
};


CustomerType.prototype.initPageType = function () {
    var length,rows,values;
    if(dataType.datatype == 'datasource') {
        length = dataType.datasource.length;
        rows = dataType.datasource;
        values = dataType.datavalues;
    } else {
        length = dataType.pageTypes.length;
        rows = dataType.pageTypes;
        values = dataType.pageValues;
    }

    var var0 = [];
    for (var i = 0; i < length; i++) {
        var0.push("<option value='" + values[i] + "'>" + rows[i] + "</option>")
    }
    $("#pageType").empty().append(var0.join(''));

    $("#pageType").change(function () {
        var val = $(this).find("option:selected").val();
        if (!!val) {
            getfunctions(val, dataType.leftTypeId, $("#new-event").val());
        } else {
            getfunctions('', dataType.leftTypeId, $("#new-event").val());
        }
    });
};

CustomerType.prototype.addTrHtml = function (id, name, date, dataId) {
    var var0 = [];
    var0.push('<tr id="' + (!!dataId ? dataId : '') + '">');
    var0.push('<td><span class="count">' + id + '</span></td>');
    var0.push('<td id="name">' + (!!name ? name : '分类名称') + '</td>');
    var0.push('<td id="createdate">' + (!!date ? date : '') + '</td>');
    var0.push('<td><a id="edit" onclick="dataType.edit(this)" href="javascript: void(0);" style="margin-right: 10px;">修改 </a>');
    var0.push('<a id="confrim" class="hide" onclick="dataType.editConfirm(this)" href="javascript: void(0);"  style="margin-right: 10px;">确定 </a>');
    var0.push('<a onclick="dataType.removeTr(this,\''+(!!dataId ? dataId : '')+'\')" href="javascript: void(0);">删除</a></td>');
    var0.push('</tr>');
    return var0.join('');
};

CustomerType.prototype.documentClick = function () {
    $(document).click(function (event) {
        var target = $(event.target);
        var localName = $(target).get(0).localName;
        var id = $(target).attr('id');
        if ((localName != 'input' && id != 'addItems' && localName != 'a') || (!!id && id == 'edit')) {
            dataType.autoSave(target);
        }
    });
};

CustomerType.prototype.createTr = function () {
    var length = $("#dataTypeTable tbody tr").length;
    var date = new Date();
    var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var dateStr = date.getFullYear() + "-" + month + "-" + date.getDate();
    var index = length + 1;
    $("#dataTypeTable tbody").append(dataType.addTrHtml(index, '', dateStr));//DOTO

    dataType.autoSave();
    $("#dataTypeTable tbody tr:last").find("#edit").click();
    $("#dataTypeTable tbody tr:last").find("input:eq(0)")[0].focus();
    $("#dataTypeTable tbody tr:last").find("input:eq(0)")[0].select();


    var e = document.getElementById('modelBody');
    e.scrollTop = e.scrollHeight;
};

CustomerType.prototype.autoSave = function (target) {
    var index = $(target).parents('tr').index();
    $("a[id='confrim']").each(function () {
        if (index != $(this).parents('tr').index()) {
            var block = $(this).css('display');
            if (block != 'none') {
                $(this).click();
            }
        }
    })
};
CustomerType.prototype.loadLeftTypeInfo = function (type,selector,fn,flag,navId,fuParm) {
    if(!flag) { //当flag为空时
        dataType.datatype = type;
    }
    dataType.getDataTypeLists(type, '', function (data) {
        if (data.success) {
            var rows = data.lists;
            var var0 = [];

            var0.push("<ul class='nav nav-pills nav-stacked'>");
            var0.push('<li onclick="getfunctions();dataType.setLeftTypeId(\'\')"><a href="#"><i class="fa fa-list-ul"></i>&nbsp;全部类型</a></li>');
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var0.push('<li ref="'+row.id+'" onclick="getfunctions(\'\',\'' + row.id + '\');dataType.setLeftTypeId(\'' + row.id + '\')"><a href="#"><i class="fa fa-list-ul"></i>&nbsp;' + row.name + '</a></li>');
            }
            var0.push('</ul>');

            selector = !!selector ? $(selector) : $("#box-body");

            selector.empty().html(var0.join(''));
            if(!!fn) {
                $(selector).find('li').removeAttr('onclick');
                $(selector).find('li').click(function () {
                    var id = $(this).attr('ref');
                    fn(id,'',fuParm);
                })
            }

            if(!!navId) {
                selector.find(".nav-stacked li[ref='"+navId+"']").addClass("active");
                selector.find(".nav-stacked li[ref='"+navId+"']").click();
            } else {
                selector.find(".nav-stacked li:eq(0)").addClass("active");
                selector.find(".nav-stacked li:eq(0)").click();
            }

            selector.find(".nav-stacked li").click(function () {
                selector.find(".nav-stacked li").attr("class", "");
                $(this).addClass("active");
            })
        }
    });
};

CustomerType.prototype.saveTypeInfo = function ($this) {
    var infos = [];
    $("#dataTypeTable tbody tr").each(function () {
        var json = {};
        $(this).find("td").find("a[id='confrim']").each(function () {
            var block = $(this).css('display');
            if (block != 'none') {
                $(this).click();
            }
        });
        $(this).find("td").each(function () {
            var val = $(this).text();
            var id = $(this).attr('id');
            if (!!id && !!val) {
                json[id] = val;
            }
        });
        if (!jQuery.isEmptyObject(json)) {
            var id = $(this).attr('id');
            if(!!id) {
                json.id = id;
            }
            infos.push(json);
        }
    });
    var url = '/header/createDataType.htm';
    if(dataType.datatype == 'flowprocess') {
        url = "/processController/modifyProcessType.htm";
    }
    var params = {infos: JSON.stringify(infos),type: dataType.datatype};
    if(!jQuery.isEmptyObject(dataType.removeId)) {
        params.deleteId = dataType.removeId.join(',');
    }
    if(!jQuery.isEmptyObject(dataType.updateId)) {
        params.updateId = dataType.updateId.join(',');
    }
    $.getAjaxData(basePath + url,params ,
        function (data) {
            if (data.success) {
                $($this).next().click();
                if(dataType.datatype == 'flowprocess') {
                    dataType.getProcessType();
                } else {
                    dataType.loadLeftTypeInfo(dataType.datatype);
                }

            } else {
                alert("添加类型失败!");
            }
        }
    );
};


CustomerType.prototype.getProcessType = function () {

    $.getAjaxData(basePath+"/header/findProcessType.htm",{} , function (data) {
        var var0 = [];
        var0.push("<ul class='nav nav-pills nav-stacked'>");
        var0.push(  '<li onclick="getProcess()"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;全部流程</a></li>');

        var length = !!data ? data.length : 0;
        for(var n=0;n<length;n++){
            var0.push('<li onclick="getProcess('+"'"+data[n].typename+"'"+');dataType.setFlowType(\''+data[n].typename+'\')"><a href="#"><i class="fa fa-envelope-o"></i>&nbsp;'+data[n].typename+ '</a></li>');
        }
        var0.push('</ul>');
        $("#box-body").empty().html(var0.join(''));
        $(".nav-stacked li:eq(0)").addClass("active");
        $(".nav-stacked li").click(function (){
            $(".nav-stacked li").attr("class","");
            $(this).addClass("active");
        });
    });
};

CustomerType.prototype.setLeftTypeId = function (id) {
    dataType.leftTypeId = id;
    $("#new-event").val('');
    if(dataType.datatype == 'datasource') {
        $("#pageType").val(0);
    } else {
        $("#pageType").val('');
    }
};

CustomerType.prototype.getDataTypeLists = function (type, name, callback) {
    $.getAjaxData(basePath + "/header/getDataTypeLists.htm", {type: type, name: name}, callback);
};

CustomerType.prototype.searchEvent = function (type,flag) {
    if(!!type) {
        dataType.datatype = type;
    }
    $("#new-event").keyup(function () {
        var val = $(this).val();
        if(dataType.datatype == 'flowprocess') {
            getProcess(dataType.flowType,val);
        } else {
            if(!!flag && flag) {
                var ref = $("#type").find('li[class="active"]').attr('ref');
                var id = !!ref ? ref : "";
                PageTable.loadTableData(id,val);
            } else {
                dataType.eventSearch(val);
            }

        }

    });

    $("#add-new-event").click(function () {
        var val = $("#new-event").val();
        if(dataType.datatype == 'flowprocess') {
            getProcess('事务预先处理类型');
        } else {
            if(!!flag && flag) {
                var ref = $("#type").find('li[class="active"]').attr('ref');
                var id = !!ref ? ref : "";
                PageTable.loadTableData(id,val);
            } else {
                dataType.eventSearch(val);
            }
        }
    });
};

CustomerType.prototype.eventSearch = function(val) {
    var typeId = $("#pageType option:selected").val();
    getfunctions(typeId, dataType.leftTypeId, val);
};

CustomerType.prototype.initSelectPageType = function (type, selector,ref) {
    dataType.getDataTypeLists(type, '', function (data) {
        if (data.success) {
            var rows = data.lists;
            var var0 = [];
            var0.push('<option></option>');
            if(type == 'datasource') {
                ref = $(".content-wrapper").find('.nav').find(".active").attr('ref');
            }
            for (var i = 0; i < rows.length; i++) {
                var selected = '';
                if(!!ref && ref == rows[i].id) {
                    selected = "selected";
                }
                var0.push("<option value='" + rows[i].id + "' "+selected+">" + rows[i].name + "</option>")
            }
            $(selector).empty().append(var0.join(''));
        }
    });
};
