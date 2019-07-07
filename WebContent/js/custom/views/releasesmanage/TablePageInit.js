/**
 * Created by Administrator on 2016/7/11.
 */
function TablePageInit() {
    this.isPageForm = false;
}

var tableinit = new TablePageInit();



TablePageInit.prototype.btnInitPop = function () {
    var formpage = $("#tableAddBtn").attr("formpage");
    commRequstFun($("#rootPath").val() + '/pageToPage/index.htm', {pagename:formpage,menuId:0,parentId:0},function(data){
        var form = $(data).find('#wrapForm');
        var pageType = $(form).find('#form_display_method').val();

        $("#edit").attr('formpage',formpage);
        $("#isView").attr('formpage',formpage);

        if(!!pageType && pageType == 'page') {
            tableinit.isPageForm = true;
            $("#previewModal").remove();
        }
        tableinit.btnInitAttr(form,pageType,data);
    });
};

TablePageInit.prototype.btnInitAttr = function (form,pageType,data) {
    $('button[data-target]').each(function () {
        var id         = $(this).attr('id');
        var formpage   = $(this).attr('formpage');

        var $this = this;

        if(!!pageType && pageType == 'page') {
            tableinit.loadPageFrom($this,formpage);
        } else {
            tableinit.initPopBtnset($this);
        }
    });
};
TablePageInit.prototype.initPopBtnset = function ($this,dataId) {
    $($this).click(function () {
        var target   = $(this).attr('data-target');
        var formpage = $(this).attr('formpage');
        var id       = $(this).attr("id");
        //如果是删除，修改，查看
        if(id != 'tableAddBtn') {
            if(!dataId) {
                dataId = $("#worktable tbody").find("tr[class*='selected']").find('input[type=hidden]').val();
                if (!dataId) {
                    alert('请选择一条数据!');
                    return false;
                }
            }

        }
        switch (id) {
            case 'edit':
            case 'data_edit':
                tableinit.popWinDataInitBind(formpage,target,'',dataId,id);
                break;
            case 'isView':
            case 'data_isView':
                tableinit.popWinDataInitBind(formpage,target,"true",dataId,id);
                break;
            default :
                tableinit.popWinDataInitBind(formpage,target);
                break;
        }


    });
};

TablePageInit.prototype.popWinDataInitBind = function(formpage,target,flag,dataId,id) {
    commRequstFun($("#rootPath").val() + '/pageToPage/index.htm', {pagename:formpage,menuId:0,parentId:0},function(data){
        var form = $(data).find('#wrapForm');
        var title = $(data).find('form').attr('tittle');

        $(target).find('.modal-title').empty().text(title);
        $(target).find('.modal-body').empty().append(form);




        var form   = $(target).find('form');
        var footer = $(target).find('.modal-footer');
        tableinit.reloadFromInit(false,form,footer,id);

        var formPageBtnInit = new FormPageBtnInit();
        formPageBtnInit.init(form);

        if(!!dataId) {
            initparam(dataId,'',flag,'');
        }

    });
};
/***
 * 表格新增按钮点击时加载
 * @param $this
 * @param pagename
 * @param data_id
 */
TablePageInit.prototype.loadPageFrom = function ($this,pagename,data_id) {
    $($this).removeAttr('data-toggle');
    $($this).removeAttr('data-target');

    $($this).click(function () {
        var id = $(this).attr('id');
        if  (id == 'edit' || id == 'isView') {
            var length = $("#worktable tbody").find("tr[class*='selected']").length;
            if(length == 0) {
                alert('请选择一条数据!');
                return false;
            } else {
                var dataId = $("#worktable tbody").find("tr[class*='selected']").find('input[type=hidden]').val();
                if (!dataId) {
                    alert('请选择一条数据!');
                    return false;
                }
            }
        } else {
            dataId = data_id;
        }
        var clone = $('.content').clone();
        clone.attr("ref",'form');
        $('.content').after(clone);

        $('.content[ref="form"]').empty().append(FlowCommPage.style).append(FlowCommPage.content);
        $('.content[ref!="form"]').hide();

        commRequstFun($("#rootPath").val() + '/pageToPage/index.htm', {pagename:pagename,menuId:0,parentId:0},function(data) {
            var vart = $("#flow_comm_wrap_form_div");
            var form = $(data).find('#wrapForm');

            vart.siblings('.box-footer').remove();
            vart.empty().append(form).after(BaseControl.getFormBtnsHtml());


            var form =  vart.find("form");
            form.attr("id",pagename);

            $('.content[ref="form"]').find('#contern_grid').removeAttr('style');
            var selector = vart.siblings('.modal-footer');

            var title = [];

            tableinit.reloadFromInit(false,form,selector,id);

            tableinit.loadBtnPopPage(form); //初始化按钮需不需要弹出框事件

            switch (id) {
                case "edit":
                case "data_edit":
                    title.push('修改');
                    initparam(dataId,'','',pagename);
                    break;
                case "isView":
                case "data_isView":
                    title.push('查看');
                    $(selector).find('button[id!="form_btn_cance"]').hide();
                    initparam(dataId,'','true',pagename);
                    break;
                default:
                    title.push('新建');


            }
            title.push(form.attr('tittle'));
            $("#flow_comm_wrap_form_div").siblings('.box-header').find('.box-title').text(title.join(''));

            tableinit.pageFootClick(selector,pagename);

        });
    });
};

TablePageInit.prototype.pageFootClick = function (selector,formid) {
    $(selector).find('button').removeAttr('onclick');

    $(selector).find('button').click(function (event) {
        var target = event.target;
        var length = $(target).parents('.modal').length;
        if(!!length && length > 0) {
            return false;
        }
        var id = $(this).attr('id');

        var btn = $('#'+formid).find('#form_button_input');
        if (id == 'form_btn_save')
        {
            var me = $(btn).attr('save');
            formSubmit(0,formid,me);
        }
        else if (id == 'form_btn_submit')
        {
            var me = $(btn).attr('submit');
            formSubmit(1,formid,me);
        } else {
            dtable.draw();
            $('.content[ref="form"]').remove();
            $('.content[ref!="form"]').show();
        }

    });
};

/**
 * 在表单页面加载需要弹出框的按钮
 * @param form
 */
TablePageInit.prototype.loadBtnPopPage = function (form) {
    $(form).find("#formimpot").append("<script type='text/javascript' src='"+$("#rootPath").val()+'/js/custom/views/releasesmanage/FormPageBtnInit.js'+"'></script>");
    var formPageInit =  new FormPageBtnInit();
    formPageInit.init(form);
};

TablePageInit.prototype.reloadFromInit = function (flag,selectorFrom,selecterFotter,operation) {

    var formId = selectorFrom.attr("id");
    formCommInit(formId,'','',operation);
    if(!(!!flag && flag)) {
        FormPageConfig.commSetPageButtonAndDisplayMethodFun(selectorFrom,selecterFotter,formId);//初始化页面配置的按钮和显示方式
    }
    tableinit.initFormDate();
};

TablePageInit.prototype.searchSelectInit = function () {
    $("select[tablename]").each(function () {
        var table = $(this).attr('tablename');
        var column = $(this).attr('displaycolumn');
        $.getAjaxData(basePath + '/createDataTable/getSelectValues.htm',{table:table,column:column},tableinit.setSelectionOpt,this);
    });
};


TablePageInit.prototype.setSelectionOpt = function (data,$this) {
    if(data.success) {
        var rows = data.rows;
        var options = '<option></option>';
        for(var i = 0;i<rows.length;i++) {
            options += '<option value="'+rows[i].text+'">'+rows[i].text+'</option>';
        }
        $($this).html(options);
    }
};


TablePageInit.prototype.addSearchBtn = function () {
    $("#pageBtn").empty().append('<button type="button" class="btn btn-primary btn-sm" onclick="search()"><i class="fa fa-search"></i> 搜索</button>');
};


TablePageInit.prototype.initTree = function () {
    var length = $('#ztree').length;
    if(length > 0) {
        var tablename = $('#ztree').attr('tablename');
        var searchColumn = $('#ztree').attr('searchColumn');
        var displayColumn = $('#ztree').attr('displayColumn');

        $.getTree(basePath+'/createDataTable/getTreeData.htm',{tablename:tablename,columns:displayColumn},$('#ztree'), function (event, treeId, treeNode, clickFlag) {
            var id = treeNode.id;
            if($("#searchForm").find('#'+searchColumn).length > 0) {
                $("#searchForm").find("#"+searchColumn).val(id);
                dtable.draw();
                $("#searchForm").find("#"+searchColumn).val('');
            } else {
                $("#searchForm").append('<input type="hidden" id="'+searchColumn+'" name="'+searchColumn+'" value="'+id+'"></input>');
                dtable.draw();
            }

        });
    }
};


//初始化查询下拉框条件
TablePageInit.prototype.initSearchSelect = function() {
    $('#searchForm').find('select').each(function () {
        var table  = $(this).attr('table');
        var column = $(this).attr('column');
        $.getAjaxData(basePath + '/createDataTable/getSelectValues.htm',{table:table,column:column},setSelectOption,this);
    });
    $('#searchForm').find('input').each(function () {


        var format = !!$(this).attr('format') ? $(this).attr('format') : "yyyy-mm-dd";
        var name  =  $(this).attr('name')  ;

        if($(this).parents('.form-group').attr('data-control-type') == 'datetime') {
            var length = $('#searchForm').find("input[name='"+name+"']").length;
            initDatetimepicker(name,format);

            if(length >= 2) {
                var first  = $('#searchForm').find("input[name='"+name+"']:eq(0)");
                var second = $('#searchForm').find("input[name='"+name+"']:eq(1)");
                betweenDate(first,second,{language:'zh-CN',format:format,todayBtn:1,autoclose: 1,startView: 2});
            }
        }

        if($(this).parents('.form-group').attr('data-control-type') == 'space_datetime') {
            var datarole = $(this).attr('data-role');
            initDatetimepicker(name,format);

            if(datarole == 'end') {
                betweenDate($(this).siblings('input[data-role="start"]'),this,{language:'zh-CN',format:format,todayBtn:1,autoclose: 1,startView: 2});
            }
        }
    });
};

//初始化表单中的时间格式
TablePageInit.prototype.initFormDate = function () {
    FormPageBtnInit.prototype.initFormDate.call(arguments,$("#design-canvas").parents("form"));
};

/****
 * 弹出框调用用此方法
 */
TablePageInit.prototype.initHeadBtnClickEvent = function () {
    $('.pull-right').delegate('button','click', function () {
        var id = $(this).attr('id');
        var formpage = $(this).attr('formpage');
        if (id == 'export') {
            FileImportAndExport.fileExport();
        } else if(id == "delete") {
            var dataId = $("#worktable tbody").find("tr[class*='selected']").find('input[type=hidden]').val();
            if(!dataId) {
                alert('请选择一条数据!');
                return false;
            }

            if(confirm("您确定删除吗?")) {
                //如果当前是试图
                var tableType = $("#worktable").attr('tableType');
                if(tableType == '5') {
                    tableinit.deleteViewData(dataId);
                } else {
                    del(dataId);
                }
            }
        }
    });
};

TablePageInit.prototype.deleteViewData = function(id) {
    var tables = new Array();
    $("#worktable thead tr").find('th').each(function () {
        var name = $(this).attr('column-name');
        if(!!name && name.indexOf("_") > -1) {
            var var100 = name.split("_");
            if($.inArray(var100[0],tables) <= -1 ) {
                tables.push(var100[0]);
            }
        }
    });

    $.getAjaxData(basePath+"/button/delete.htm",{"id":id,"tableName":tables.join(",")}, function (data) {
        if(data.status){
            alert("删除成功");
            dtable.draw();
        }else{
            alert(data.message);
        }
    });
};

TablePageInit.prototype.initFileImportLabel = function () {
    if($("#importUploadify").length > 0) {
        upload("importUploadify",'importFileQueue',"*.xls;*.xlsx;");
    }

    $('#submitImportData').click(function () {
        FileImportAndExport.fileImport();
    });
    $("#importClose").click(function () {
        attachmentJSON = [];
        upload("importUploadify",'importFileQueue',"*.xls;*.xlsx;");
        $('.uploadify-queue-item').remove();
    });

    if($("#importFile").length > 0) {
        $('#importFile').on('hidden.bs.modal', function () {
            attachmentJSON = [];
            upload("importUploadify",'importFileQueue',"*.xls;*.xlsx;");
            $('.uploadify-queue-item').remove();
        });
    }
};

TablePageInit.prototype.setTableSelected = function () {
    var table = $('#worktable').DataTable();

    $("#worktable tbody").undelegate('tr','click');
    $("#worktable tbody").delegate('tr', 'click', function() {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
};


$(function () {
    tableinit.btnInitPop();
    tableinit.searchSelectInit();
    tableinit.addSearchBtn();
    tableinit.initTree();
    tableinit.initSearchSelect();
    tableinit.initHeadBtnClickEvent();
    tableinit.initFileImportLabel();
});


