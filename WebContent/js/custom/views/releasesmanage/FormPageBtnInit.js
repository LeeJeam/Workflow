/***
 * 发布后表单页面按钮初始化
 * @constructor
 */
var FormPageBtnInit = function () {

};
var formPageInit = new FormPageBtnInit();

FormPageBtnInit.prototype.init = function (selector) {
    var var101;
    if ($(selector).length > 0) {
        var101 = $(selector).find('button[formid]');
    } else {
        var101 = $('button[formid]');
    }
    $(var101).each(function () {
        var formpage = $(this).attr('file_name');
        var modalId = $(this).attr('formid');

        var modal = $("#" + modalId);
        $("#" + modalId).remove();
        $('#flow_comm_wrap_form_div').append(modal);

        $(this).attr("data-toggle", 'modal');
        $(this).attr("data-target", "#" + modalId);

        $(this).attr("onclick", 'formPageInit.setOnclickEvent("' + modalId + '","' + formpage + '")');
    });

    formPageInit.setSelectDisplayControl(selector); //设置控件的隐藏和显示

    $('a[ref-href]').each(function () {
        var refhref = $(this).attr('ref-href');
        var refType = $(this).attr('ref-type');
        if (!!refhref) {
            $(this).attr('href', refhref);
        }
        if (refType == '2') {
            $(this).attr('target', '_blank');
        }
    });


    formPageInit.radioCheckboxInit();
    formPageInit.setGroupEleInit();


};



/***
 * 表单加载时执行此方法，
 * 给需要显示数据的控件加载数据
 * @param dataId
 * @param formid
 * @param processkey
 */
FormPageBtnInit.prototype.isReadInitData = function (dataId, formid, processkey) {
    var eles = new Array();
    var refTypes = [];

    $("#" + formid).find('input[data-cual-method]').each(function(){

        var readtable  = $(this).attr('data-readtable');
        var readcolumn = $(this).attr('data-readcolumn');
        var isGroup    = $(this).parents(".formControlGroup").length > 0 ? false : true;

        if(isGroup) { //不为控件组时
            var formula = $(this).attr('data-formula');
            if(!!formula)
            {
                var val =  formPageInit.getFormulaValues($(this));
                $(this).val(val);
            }
            else
            {
                var isFormField = $('form[table-name="' + readtable + '"]').find("input[name='" + readcolumn + "']").length > 0 ? true : false;
                if(isFormField) {
                    var val = $('form[table-name="' + readtable + '"]').find("input[name='" + readcolumn + "']").val();
                    $(this).val(!!val ? val : '');
                } else {

                    var rest = formPageInit.calcualtionData('',$(this));
                    $(this).val(rest);
                }
            }
        } else {
            var val = $('form[table-name="' + readtable + '"]').find("input[name='" + readcolumn + "']").val();
            $(this).val(!!val ? val : '');

            var group = $(this).parents(".formControlGroup");
            var reftype = group.attr('reftype');
            if(!!reftype && $.inArray(reftype,refTypes) <= -1) {
                refTypes.push(reftype);
                eles.push(group);
            }
        }
    });

    for(var i in eles) {
        formPageInit.bindGroupData(dataId,eles[i],processkey);
    }



};

/****
 * 设置控件组元素页面加载时执行此方法
 */
FormPageBtnInit.prototype.setGroupEleInit = function() {
    var types = [];
    $(".formControlGroup").each(function () {
        var refType = $(this).attr("reftype");
        types.push(refType);

    });
    for (var i in types) {
        var type = types[i];
        var group = $(".formControlGroup[reftype='" + type + "']");
        var clone = group.clone();

        if ($("#" + type).length <= 0) {
            $(clone).addClass("hide").attr("id", type).removeClass('formControlGroup');
            $(clone).find("input").each(function () {
                $(this).removeAttr('name');
                var type = $(this).attr('type');
                if(type != 'checkbox' && type != 'radio') {
                    $(this).val('');
                }

            });
            group.next().after(clone);
        }
        formPageInit.setControlGroupLabelName(group);
        formPageInit.controlGroupBtnInit();
        formPageInit.initFormDate(group);
    }
};

/****
 * 初始化控件组按钮事件
 */
FormPageBtnInit.prototype.controlGroupBtnInit = function () {
    $('button[data-role-flag="group"]').each(function () {
        $(this).unbind();
        $(this).click(function () {
            formPageInit.controlGroupBtnClickEvent(this)
        });
    });
};

FormPageBtnInit.prototype.controlGroupBtnClickEvent = function ($this) {
    var fromGroup = $($this).parents(".form-group");
    var group = $(fromGroup).next();
    var clone = $(group).clone();
    clone.addClass("formControlGroup");

    $(clone).removeClass("hide");
    if ($(clone).find(".fa-minus-circle").length <= 0) {
        $(clone).find("input:eq(0)").parent().append(formPageInit.getDeleteHtml());
    }

    var length = $(".formControlGroup").length;
    $(fromGroup).before(clone);
    formPageInit.setControlGroupLabelName($(clone), length);

    formPageInit.initFormDate($(clone));
    formPageInit.addDateStartAndEndLimit($(clone));
};

/*****
 * 设置时间的开始的结束控制
 * @param selector
 */
FormPageBtnInit.prototype.addDateStartAndEndLimit = function (selector) {
    /**
     * 给时间控件添加值的开始和结束范围
     */
    $(selector).find("input[data-role='date'][datarecodeflag='1']").each(function(){
        var beginTime=$(this);
        var beginType=beginTime.attr("datarecodetype");
        $(selector).find("input[data-role='date'][datarecodeflag='2']").each(function(){
            var endTime=$(this);
            var endType=beginTime.attr("datarecodetype");
            if(typeof(beginType)!=undefined&&beginType!=""&&
                typeof(endType)!=undefined&&endType!=""&&beginType==endType){
                betweenDate(beginTime,endTime,{language:'zh-CN',format:beginTime.attr("format"),todayBtn:1,autoclose: 1,startView: 2});
            }
        });
    });
}

FormPageBtnInit.prototype.getDeleteHtml = function () {
    var var0 = [];
    var0.push('<span class="input-group-addon" onclick="formPageInit.deleteEvent(event)" style="background: #286090;cursor: pointer;">');
    var0.push('<i style="color: #fff;" class="fa fa-minus-circle"></i>');
    var0.push('</span>');
    return var0.join('');
};

FormPageBtnInit.prototype.deleteEvent = function (event) {
    var target = $(event.target);
    var group = $(target).parents('.formControlGroup');

    var from = $(target).parents('form');
    try {
        group.find("input,select,textarea").each(function () {
            var name = $(this).attr("name");
            BootstrapValidators.prototype.removeValidator.call(arguments, from, name);
        });
    } catch (e) {
        console.log(e);
    }
    group.remove();
    event.stopPropagation();
};


FormPageBtnInit.prototype.setControlGroupLabelName = function (selector, length) {
    $(selector).each(function (i) {
        var index = !!length ? length : i;
        $(this).attr('index', index);
        $(this).find("input,select,textarea").each(function () {
            var name = $(this).attr('formcontrolgrouptablecolumn') + index;
            $(this).attr('name', name);
            $(this).attr('index', index);
            formPageInit.controlGroupAddValidator($(this), name);
        });
    });
};

FormPageBtnInit.prototype.controlGroupAddValidator = function ($this, name) {
    var disabled = $this.attr('disabled');
    if(!!disabled) {
        return false;
    }
    var validEN = {};
    //添加验证
    var validator = new BootstrapValidators();
    if ($.isDefined($this.attr("required"))) {
        validEN = validator.required(validEN);
        //$this.removeAttr('required');
    }
    if ($.isDefined($this.attr("data-required"))) {
        validEN = validator.required(validEN);
        //$this.removeAttr('data-required');
    }

    var writeType = $this.attr("valid-writeType");
    //$this.removeAttr('valid-writeType');
    switch (writeType) {
        case "2":
            var regexp = /^(([1-9][0-9]*|[1-9][0-9]*(\.\d{1,3})|[0](\.\d{1,3}))|([1-9]*)|([0]{1}))?$/;
            validEN = validator.getRegexp(regexp, '请输入整数,最多三位小数', validEN);
            break;
        case "3":
            validEN = validator.getRegexp(/^[0-9]*$/, '请输入数字', validEN);
            break;
        case "4":
            validEN = validator.getRegexp(/^[0-9a-zA-Z]*$/, '请输入数字或英文', validEN);
            break;
        case "5":
            break;
        case "6":
            validEN = validator.getEmailValidator(validEN);
            break;
        case "7":
            var regex = $this.attr('data-regex');
            var message = $this.attr('data-message');
            if(!!regex) {
                validEN = validator.getRegexp(regex,message,validEN);
            }
            break;
    }
    /***
     * 自定义计算验证
     */
    var calcaultion = $this.attr('data-calculation');
    if(!!calcaultion) {
        var opertion = $this.attr('data-opertion');
        var message  = $this.attr('data-calmessage');

        var datacal = formPageInit.setControlNameOrderBy($this);
        validEN = validator.getCallbackValidator(validEN,message,opertion,datacal,$this);
    }

    var length = $this.attr("valid-writeLength");
    if ($.isDefined(length)) {
        var min = !!$this.attr("data-min") ? $this.attr("data-min") : 0;
        validEN = validator.getStringLength(length, validEN, length,min);
        //$this.removeAttr('valid-writeLength');
    }

    if (!jQuery.isEmptyObject(validEN)) {
        var selector = $($this).parents("form");
        name = !!name ? name : $($this).attr('name');
        validator.fieldValidator(selector, name, validEN);
    }
};

FormPageBtnInit.prototype.setControlNameOrderBy = function ($this) {
    var datacal  = !!$this.attr('data-cali') ? $this.attr('data-cali').split('@') : '';
    if(!datacal) {
        return datacal;
    }
    var isGroup = $this.parents('.formControlGroup').length > 0 ? true : false;

    var result = [];
    if(isGroup) {
        $this.parents('.formControlGroup').find("input,select,textarea").each(function () {
            var name = $(this).attr('formcontrolgrouptablecolumn');
            var index = $(this).attr('index');
            if($.inArray(name,datacal) > -1) {
                name = $(this).attr('name');
                result.push(name);
            }
        });
    }
    return result;
};

FormPageBtnInit.prototype.modifyCallBack = function (formId) {
    //加载表单中的onload的方法
    var onload = $("#" + formId).attr('onload');
    if (!!onload) {
        try {
            $("#" + formId).load();
        } catch (e) {
        }
    }
};

FormPageBtnInit.prototype.clickLoadModalPage = function (formpage, modalId, target) {
    commRequstFun(basePath + '/pageToPage/index.htm', {
        pagename: formpage,
        menuId: 0,
        parentId: 0
    }, function (data) {
        var form = $(data).find('#add');
        var formimpot = $(data).find("#formimpot");

        var formId = modalId + "_form";
        $(form).attr('id', formId);
        $(form).find("#contern_grid").removeAttr('style');

        var title = $(form).attr('tittle');
        $("#" + modalId).find(".modal-title").empty().text(title);
        $("#" + modalId).find(".modal-body").empty().html(form);
        $("#" + modalId).find(".modal-content").append(formimpot);

        formPageInit.reloadFromInit(false, target);
    });
};

FormPageBtnInit.prototype.setOnclickEvent = function (fromId, formpage) {
    var target = $('#' + fromId);
    formPageInit.clickLoadModalPage(formpage, fromId, target);
};


FormPageBtnInit.prototype.reloadFromInit = function (flag, selector) {
    var formId = $(selector).find("form").attr('id');

    formCommInit(formId, '', 'modal');
    if (!(!!flag && flag)) {
        FormPageConfig.commSetPageButtonAndDisplayMethodFun($(selector), $(selector).find('.modal-footer'), formId);//初始化页面配置的按钮和显示方式
    }
    formPageInit.initFormDate(selector);
};


//初始化表单中的时间格式
FormPageBtnInit.prototype.initFormDate = function (selector) {
    $(selector).find('input').each(function () {
        if ($(this).parents('.controls').find("input").attr('data-role') == 'date') {
            var name = $(this).parents('.controls').find("input").attr('name');
            if (!!name) {
                var format = (!!$(this).attr('format') ? $(this).attr('format') : "yyyy-mm-dd");
                initDatetimepicker(name, format);

                //$(this).parents('.controls').find("input").removeAttr('data-role');
                var required = $(this).attr('required');
                if (!!required) {
                    $(this).on('changeDate show', function (e) {
                        var name = $(this).attr('name');
                        var column_name = $(this).attr('formcontrolgrouptablecolumn');
                        $(this).parents("form").bootstrapValidator('revalidateField', name);

                        try {
                            if(!!column_name) {
                                $('input[name][data-cali*="'+column_name+'"]').each(function () {
                                    var controls = $(this).parents(".controls");
                                    var isContinue = controls.find(".glyphicon-remove").length > 0 ? true : false;
                                    if(isContinue) {
                                        var name = $(this).attr('name');
                                        $(this).parents("form").bootstrapValidator('revalidateField', name);
                                    }
                                });
                            }
                        }catch(e) {
                            console.log(e);
                        }

                    });
                }

            }
        }
    });
};

/****
 * 修改时加载控件组的信息数据
 * @param dataId
 * @param formId
 */
FormPageBtnInit.prototype.modifyInitControlGoupData = function (dataId, formId) {
    var processKey = $("#" + formId).attr('processkey');
    var refType = formPageInit.getControlGroupType(formId);
    for (var index in refType) {
        var result = formPageInit.getControlGroupInfo(refType[index], dataId, formId);

        var var10 = result[0].join(''); //表名

        var columns = ["flowCode", "guanlianshujuid", "shujuleixing"];
        var values = [processKey, dataId, refType[index]];
        var param = {eTableName: var10, columns: columns.join(','), values: values.join(",")};
        $.getAjaxData(basePath + "/button/getObjectLists.htm", param, function (data) {
            if (!!data && !!data.obj) {
                var lists = data.obj;

                for (var i = 0; i < lists.length; i++) {
                    var protype = lists[i].shujuleixing;
                    var length = $("#" + formId).find(".formControlGroup[reftype='" + protype + "']:eq(" + i + ")").length;
                    if (length <= 0) {
                        $("#" + formId).find(".form-group").find("button[reftype='" + protype + "']").click();
                    }
                    $("#" + formId).find(".formControlGroup[reftype='" + protype + "']:eq(" + i + ")").find("input,select,textarea").each(function () {
                        var type = $(this).attr('type');

                        var key = $(this).attr("formcontrolgrouptablecolumn");
                        var val = lists[i][key];

                        if (type == 'checkbox' || type == 'radio') {
                            if (val == $(this).val()) {
                                $(this).attr('checked', true);
                            }
                        } else {
                            $(this).val(val);
                        }
                    });
                }


            }
        });
    }


};


/****
 * 点击提交
 */
FormPageBtnInit.prototype.saveControlApp = function (dataId, formid, flowId) {
    var length = $("#" + formid).find(".formControlGroup").length;
    if (length > 0) {
        var refType = formPageInit.getControlGroupType(formid);
        for (var index in refType) {
            var result = formPageInit.getControlGroupInfo(refType[index], dataId, formid, flowId);

            var var10 = result[0].join('');
            var var11 = result[1].join(',');
            var var12 = result[2].join("~");


            var delColumns = ["flowCode", "guanlianshujuid", "shujuleixing"];
            var delValues = [flowId, dataId, refType[index]];
            var params = {
                tablename: var10,
                columns: var11,
                values: var12,
                delColumns: delColumns.join(","),
                delValues: delValues.join(',')

            };
            $.getAjaxData(basePath + '/button/saveLists.htm', params);
        }
    }
};


FormPageBtnInit.prototype.getControlGroupType = function (formId) {
    var reftype = [];
    $("#" + formId).find(".formControlGroup").each(function () {
        var type = $(this).attr('reftype');
        if ($.inArray(type, reftype) <= -1) {
            reftype.push(type);
        }
    });
    return reftype;
};
FormPageBtnInit.prototype.getControlGroupInfo = function (reftype, dataId, formid, flowId) {
    var result = [];

    var columns = [];
    var values = [];
    var tables = [];
    $("#" + formid).find(".formControlGroup[reftype='" + reftype + "']").each(function () {
        var var0 = [];


        $(this).find("input,select,textarea").each(function () {
            var type = $(this).attr("type");

            var table = $(this).attr('formcontrolgrouptablename');
            var column = $(this).attr('formcontrolgrouptablecolumn');
            var val = $(this).val();

            if ($.inArray(column, columns) <= -1) {
                columns.push(column);
            }
            if ($.inArray(table, tables) <= -1) {
                tables.push(table);
            }
            if (type == 'checkbox') {
                var index = $(this).parents(".controls").find("input").index(this);
                if (index == 0) {
                    var checkbox = [];
                    $(this).parents(".controls").find("input").each(function () {
                        var checked = $(this).get(0).checked;
                        if (checked) {
                            var val = $(this).val();
                            checkbox.push(val);
                        }
                    });

                    var isEmtpy = checkbox.length > 0 ? true : false;
                    var0.push(isEmtpy ? checkbox.join(",") : '');
                } else {
                    return true;//continue;
                }
            } else {
                var0.push(!!val ? val : '');

            }
        });

        if (!!flowId) {
            if ($.inArray('flowCode', columns) <= -1) {
                columns.push('flowCode');
            }
            var0.push(flowId);
        }

        if (!!dataId) {
            if ($.inArray('guanlianshujuid', columns) <= -1) {
                columns.push('guanlianshujuid');
            }
            var0.push(dataId);
        }

        if (!!reftype) {
            if ($.inArray('shujuleixing', columns) <= -1) {
                columns.push('shujuleixing');
            }
            var0.push(reftype);
        }
        values.push(var0.join('@'));
    });
    result.push(tables);
    result.push(columns);
    result.push(values);
    return result;
};


/***
 * radio checkbox 选中或者取消选中时，控件是否隐藏和显示
 * data-relation=""  data-values=""
 */
FormPageBtnInit.prototype.radioCheckboxInit = function (formId) { //当前的表单Id

    $('input[data-relation]').each(function () {
        var ismutex = $(this).attr('data-ismutex');
        if (!!ismutex) {
            $(this).attr("onclick", 'formPageInit.controlIsShow(this,"' + ismutex + '")');
        } else {
            $(this).attr("onclick", 'formPageInit.radioCheckboxSelectControlisShow(this)');
        }

    });
};

FormPageBtnInit.prototype.controlIsShow = function ($this, ismutex) {

    var val = $($this).val();
    ismutex = !!ismutex ? ismutex : $(this).attr('data-ismutex');

    var relation = $($this).attr('data-relation');
    var relVal = $($this).attr('data-values');
    var relations = relation.split("@");
    var relVals = relVal.split("@");

    var type = $($this).attr('type');
    if (type == 'checkbox' || type == 'radio') {
        var checked = $($this).get(0).checked;

        if (ismutex == 'on') { //是否互斥

            var shows = [],pageRows = [];
            for (var i in relVals) {
                var refId = relations[i];
                var pageRow = $('div[refid="' + refId + '"]').parents('.page-row');
                if(pageRow.length > 0)
                {
                    if (val == relVals[i] && checked) {
                        pageRows.push(pageRow);
                    } else {
                        pageRow.hide();
                        pageRow.find("input,select,textarea").val('');

                        var form = $(pageRow).parents("form");
                        pageRow.find("input,select,textarea").each(function(){
                            var name = $(this).attr('name');
                            //BootstrapValidators.prototype.removeValidator.call(arguments, form, name);
                        });
                        pageRow.find("input,select,textarea").attr('disabled',true);
                    }
                }
                else
                {
                    if (val == relVals[i] && checked) {
                        shows.push(refId);
                    } else {
                        var formGroup = $('input[name="'+refId+'"]').parents('.form-group');
                        if(formGroup.length > 0) {
                            formGroup.hide();
                            formGroup.find('input[name="'+refId+'"]').val('');
                            var form = $(formGroup).parents("form");
                            formGroup.find('input[name="'+refId+'"]').attr('disabled',true);
                        }
                    }
                }
            }


            if(!!shows) {
                for (var i in shows) {
                    var refId = shows[i];
                    var formGroup = $('input[name="' + refId + '"]').parents('.form-group');
                    if (formGroup.length > 0) {
                        formGroup.find('input[name="' + refId + '"]').removeAttr('disabled');
                        formGroup.find('input[name="' + refId + '"]').removeAttr('checked');
                        var $this = formGroup.find('input[name="' + refId + '"]:eq(0)');
                        formPageInit.controlGroupAddValidator($this);
                        formGroup.show();
                    }
                }
            }

            if(!!pageRows) {
                for(var i in pageRows) {
                    var pageRow = $(pageRows[i]);
                    pageRow.show();

                    pageRow.find("input,select,textarea").removeAttr('disabled');

                    pageRow.find("input,select,textarea").each(function(){
                        formPageInit.controlGroupAddValidator($(this));
                    });
                }
            }
        } else {
            for (var i in relVals) {
                var refId = relations[i];
                if (val == relVals[i]) {
                    if (checked) {
                        $('div[refid="' + refId + '"]').parents('.page-row').show();
                        if(!(!!disabled && disabled)) {
                            $('div[refid="' + refId + '"]').parents('.page-row').find("input,select,textarea").removeAttr('disabled');
                        }

                    } else {
                        $('div[refid="' + refId + '"]').parents('.page-row').hide();
                        $('div[refid="' + refId + '"]').parents('.page-row').find("input,select,textarea").attr('disabled',true);
                    }

                }
            }
            return false;
        }

    }

    for (var index in relVals) {
        try {
            var all = $("input[name='" + relations[index] + "']");
            var flag = all.length > 0 ? true : false;
            if (flag) {
                var first = all.eq(0);
                var type = first.attr('type');
                if (type == 'checkbox') {
                    var selec = first;
                    var selecFormGoup = first.parents('.form-group');
                    if (val == relVals[index]) {
                        $(all).removeAttr("disabled");
                        selecFormGoup.show();
                        formPageInit.controlGroupAddValidator(selec, relations[index]);
                    } else {
                        if (ismutex == 'on') { //是否互斥
                            var form = $(selec).parents("form");
                            BootstrapValidators.prototype.removeValidator.call(arguments, form, relations[index]);
                            $(all).attr("disabled", true);
                            selecFormGoup.hide();
                        }
                    }
                }
            }

        } catch (e) {
        }
    }
};

FormPageBtnInit.prototype.radioCheckboxSelectControlisShow = function ($this) {

    var selector = $($this).attr('data-relation');
    var $val = $($this).attr('data-values');

    var type = $($this).attr('type');
    var val = $($this).val();
    var formSelect = $("input[name='" + selector + "'],textarea[name='" + selector + "']");
    var selec = formSelect.parents(".form-group");

    if (type == 'checkbox') {
        if (val == $val) {
            var checked = $($this).get(0).checked;
            if (checked) {
                selec.show();
                formSelect.removeAttr('disabled');
                formSelect.val('');
                formPageInit.controlGroupAddValidator(formSelect, selector);
            } else {
                selec.hide();
                formSelect.attr('disabled',true);
                var form = $(selec).parents("form");
                BootstrapValidators.prototype.removeValidator.call(arguments, form, selector);
            }
        }
    } else {
        if (val == $val) {
            selec.show();
            formSelect.removeAttr("disabled");
            formSelect.val('');
            formPageInit.controlGroupAddValidator(formSelect, selector);
        } else {
            selec.hide();
            formSelect.attr("disabled",true);
            var form = $(selec).parents("form");
            BootstrapValidators.prototype.removeValidator.call(arguments, form, selector);
        }
    }
};



FormPageBtnInit.prototype.setControlDisabled = function (formid) {
    var tempId = $("#nextApplyUser").attr('formid');
    if(!tempId && tempId != formid ) {
        $("#"+formid).find("input,select,textarea").attr('disabled',true);
    }
};

FormPageBtnInit.prototype.setOtherBindData = function($this,os) {
    //获取第一个人的信息执行此方法
    var osc =  $this.find("input").attr("data-osc");
    var val = $('form[table-name="'+os+'"]').find("input[name='"+osc+"']").val();

    $this.find("input").each(function(){
        var arrg = $(this).attr('data-arrg');
        if(!arrg) {
            var formula = $(this).attr('data-formula');
            if(!!formula) {
                var val = formPageInit.getFormulaValues($(this));
                $(this).val(val);
            }else {
                var calculation = $(this).attr('data-calculation');
                if(!calculation) { //当没有包含时执行此方法
                    var val = formPageInit.calcualtionData(0, $(this));
                    $(this).val(val);
                }
            }
        }

    });

    if(!!val) {
        //获取其他人员信息时执行此方法
        var arrg = $this.find("input").attr('data-arrg');
        if(!!arrg) //是否独排显示
        {
            var split = val.split(",");
            var hide = $('.hide[reftype="'+$this.attr('reftype')+'"]');

            for(var i in split) {
                var clone = hide.clone();
                var $clone = clone.addClass("formControlGroup").removeClass("hide");
                hide.before($clone);
                $($clone).find("input").each(function(){
                    var index = parseInt(i) + 1;
                    $(this).attr('index',index);
                    $(this).attr('name',$(this).attr('formcontrolgrouptablecolumn') + index);

                    var readonly = $(this).attr('readonly');
                    if(!readonly) {
                        formPageInit.controlGroupAddValidator($(this));
                    }
                });

                $($clone).find("input[data-formula]").each(function(){
                    var index = $(this).attr('index');
                    var formula = $(this).attr('data-formula');
                    var val =  formPageInit.getFormulaValues($(this),index,false);
                    $(this).val(val);
                });

                $($clone).find("input").each(function(){
                    var index = $(this).attr('index');
                    var calculation = $(this).attr('data-calculation');
                    if(!calculation) {
                        var arrg = $(this).attr('data-arrg');
                        if(!!arrg) {
                            $(this).val(split[i]);
                        } else {
                            var val = formPageInit.calcualtionData(index,$(this));
                            $(this).val(val);
                        }
                    }
                });
            }
            hide.remove();
        }
    }
}

FormPageBtnInit.prototype.bindGroupData = function(dataId,contrlGroup,processkey){

    contrlGroup.each(function() {
        var os = $(this).find("input").attr("data-os"); //其他人员信息
        if(!!os) //存在其他的人员信息时执行
        {
            formPageInit.setOtherBindData($(this),os);
        }
        else
        {
            formPageInit.setNormalCalculation($(this),dataId);
        }

        $(this).parent().find("button[showtype='2']").parents('.form-group').remove();

    });
};

FormPageBtnInit.prototype.setNormalCalculation = function(contrlGroup,dataId) {
    var refType = contrlGroup.attr('reftype');
    var tablename = contrlGroup.find("input:eq(0)").attr('data-readtable');
    var type = $("input[formcontrolgrouptablename='" + tablename + "']:not('data-readcolumn')").parents(".formControlGroup[reftype!='" + refType + "']").eq(0).attr('refType');
    var readtable = contrlGroup.find("input[data-readtable]:first").attr("data-readtable");

    contrlGroup.attr('reftype',type);

    var form = $(".formControlGroup[reftype='" + type + "']").parents("form");
    dataId = !!dataId ? dataId : form.find("input[name='id']").val();

    var columns = ["flowCode", "shujuleixing", "guanlianshujuid"];
    var values = [processkey, type, dataId];

    var param = {eTableName: readtable, columns: columns.join(","), values: values.join(",")};

    var $this =  contrlGroup;
    var $clone = $this.clone();
    var formid = form.attr('id');

    $.getAjaxData(basePath + "/button/getObjectLists.htm", param, function (data) {
        var objs = !!data ? data.obj : [];

        if (!jQuery.isEmptyObject(objs)) {
            var obj = objs[0];
            formPageInit.setOnlyReadValues($this, obj, 0);

            for (var i = 1; i < objs.length; i++) {
                var obj = objs[i];
                var hide = $(".hide[reftype = '"+refType+"']");
                var clone;
                if(hide.length > 0) {
                    clone =hide.clone().addClass('formControlGroup').removeClass("hide").attr('reftype',type).attr("index",i);
                } else {
                    clone = $clone.clone();
                }
                $($this).after(clone);
                formPageInit.setOnlyReadValues(clone, obj, i);
            }
            formPageInit.modifyCallBack(formid);//修改和查看详情时调用页面初始化方法
        }
    });
};
/****
 * 计算公式需要带（）
 * @param $this
 * @param forIndex
 * @param isFlag
 * @returns {Object}
 */
FormPageBtnInit.prototype.getFormulaValues = function ($this,forIndex,isFlag) {

    var formula = $this.attr('data-formula');
    var var0 = ["(","+","-","*","/",")"];
    var form = !!$($this).parents('form').length > 0 ? $($this).parents('form') : $('form[table-name]:last');
    forIndex = !!forIndex ? forIndex : '0';

    var evals = [],name = [];

    for(var i in formula) {
        if (var0.indexOf(formula[i]) <= -1) {
            name.push(formula[i]);
        }
        else {
            if (name.length > 0) {
                var $ele = form.find('input[name="' + name.join('') + '"]');
                if ($ele.length <= 0) {
                    $ele = form.find('input[name="' + name.join('') + forIndex + '"]');
                    if ($ele.length > 0) {
                        if (!isFlag) {
                            formPageInit.bindKeyUpToFormual($ele, $this, forIndex);
                        }
                        evals.push(!!$ele.val() ? $ele.val() : 0);
                    } else {
                        evals.push(!!name.join('') ? name.join('') : 0);
                    }

                } else {
                    if (!isFlag) {
                        formPageInit.bindKeyUpToFormual($ele, $this, forIndex);
                    }
                    evals.push(!!$ele.val() ? $ele.val() : 0);
                }
                name = [];

            }
            evals.push(formula[i]);
        }
        if (i == formula.length - 1) {
            if (name.length > 0) {
                var $ele = form.find('input[name="' + name.join('') + '"]');
                if ($ele.length <= 0) {
                    $ele = form.find('input[name="' + name.join('') + forIndex + '"]');
                    if ($ele.length > 0) {
                        if (!isFlag) {
                            formPageInit.bindKeyUpToFormual($ele, $this, forIndex);
                        }
                        evals.push(!!$ele.val() ? $ele.val() : 0);
                    } else {
                        evals.push(!!name.join('') ? name.join('') : 0);
                    }

                } else {
                    if (!isFlag) {
                        formPageInit.bindKeyUpToFormual($ele, $this, forIndex);
                    }
                    evals.push(!!$ele.val() ? $ele.val() : 0);
                }
                name = [];

            }
        }
    }

    var point = $this.attr('data-point');
    var rest =  eval(evals.join(''));
    if(!!point) {
        rest = rest.toFixed(point);
        rest = parseFloat(rest);
    }
    return rest;
};

/***
 * 设置带（）公式计算时，输入框输入时计算
 * @param $ele 当前的元素
 * @param $this 输入时需要改变的元素
 * @param forIndex
 */
FormPageBtnInit.prototype.bindKeyUpToFormual = function ($ele,$this,forIndex) {
    var readOnly = $ele.attr('readonly');
    if(!readOnly) {
        var judge = $ele.parents(".formControlGroup").length > 0 ? false : true;
        if(judge)
        {
            $ele.attr('data-name',$ele.attr('formcontrolgrouptablecolumn'));
            $ele.attr("data-more",'more');
            $ele.attr('data-isTime',(!!forIndex ? forIndex : '0'));

        } else
        {
            $ele.attr('data-isTime',!!forIndex ? forIndex : '0');
            $ele.attr('data-name',$($this).attr('name'));
        }

        $ele.keyup(function(){
            var more = $(this).attr('data-more');

            if(!!more) {
                var name = $(this).attr('data-name');
                var isTime = $(this).attr('data-isTime');

                var temp = name.substring(0,name.indexOf(isTime));

                var number = parseInt(isTime);

                for(var i = 0;i<=number;i++) {
                    var target = $('input[name="'+temp+i+'"]');
                    var result = formPageInit.getFormulaValues($this,i,true);
                    target.val(result);
                }
            } else {
                var name = $(this).attr('data-name');
                var isTime = $(this).attr('data-isTime');
                var target = $('input[name="'+name+'"]');
                var result = formPageInit.getFormulaValues($this,isTime,true);
                target.val(result);
            }


        });
    }
};

/***
 * 设置只读时初始化数据内容
 * @param clone
 * @param obj
 * @param forIndex
 */
FormPageBtnInit.prototype.setOnlyReadValues = function (clone, obj,forIndex) {

    $(clone).find("input").each(function () {

        var key = $(this).attr("formcontrolgrouptablecolumn");

        $(this).attr("name", key + forIndex);
        $(this).attr('index', forIndex);

        var disabled = $(this).attr('disabled');
        var readOnly = $(this).attr('readonly');
        if(!disabled && !readOnly) {
            formPageInit.controlGroupAddValidator($(this));
        }

        var type = $(this).attr("type");

        var readtable = $(this).attr("data-readtable");

        var length = $('form[table-name="' + readtable + '"]').length;

        if (length >= 1) {//从表单中获取
            var labelname = $(this).attr('data-readcolumn');

            var ele = $('form[table-name="' + readtable + '"]').find("input[name='" + labelname + "']");
            var type = ele.attr('type');

            switch (type) {
                case "radio":
                    var val = $('form[table-name="' + readtable + '"]').find("input[name='" + labelname + "']:checked").val();
                    formPageInit.initialzationEnumValue($(this),val);
                    break;
            }


        }  else {
            var val = obj[key];
            if (type == 'checkbox') {
                if (!!val && val.indexOf($(this).val()) > -1) {
                    $(this).attr('checked', true);
                }
            } else {
                $(this).val(val);
            }
        }
    });

    $(clone).find('input').each(function(){
        var key = $(this).attr("formcontrolgrouptablecolumn");
        var dataMethod = $(this).attr('data-cual-method');

        if(!!dataMethod && dataMethod == 2 && !obj[key]) {
            var $this = $(this);

            if(!!$this.attr('data-formula'))
            {
                var val =  formPageInit.getFormulaValues($this,forIndex,false);
                $(this).val(val);
            } else
            {
                var rest = formPageInit.calcualtionData(forIndex,$this);
                $(this).val(rest);
            }
        }
    });
};

/****
* 普通计算公式
 * */
FormPageBtnInit.prototype.calcualtionData = function (forIndex,$this,flag) {
    var v2 = 0;
    var result  = [];
    var rest;
    var form = $this.parents('form');
    var cali = !!$this.attr('data-cali') ? $this.attr('data-cali').split("@") : '' ;
    var calo = !!$this.attr('data-calo') ? $this.attr('data-calo').split("@") : '';
    var calv =  !!$this.attr('data-cal-val') ? $this.attr('data-cal-val').split('@') : [];
    if(!!calo) {

        var isDate = [];
        for (var i = 0; i < cali.length; i++) {
            if (cali[i] == '~')
            {
                if (typeof(rest) != 'undefined') {
                    if (!calo[i]) { //当为空时跳出循环
                        break;
                    }
                    result.push(calo[i]);

                    i = i + 1;
                    if (cali[i] == '~') {
                        result.push(calv[v2]); //
                        v2++;
                    } else {
                        var $ele = $('input[name="' + cali[i] + forIndex + '"]');
                        $ele = $ele.length > 0 ? $ele : $('input[name="' + cali[i]  + '"]');


                        if (!flag) {
                            formPageInit.bindKeyUpToInputCalculation($ele, $this, forIndex);
                        }
                        var val = $ele.val(); //1+ 1  2 / 2

                        var type = $ele.attr('data-role');
                        if (type == 'date') {
                            val = Date.parse(val.substring(0, 10));
                            isDate.push("true");
                        } else {
                            val = !!val ? !isNaN(val) ? val : 0 : 0;
                        }
                        result.push(val);
                    }
                } else {
                    result.push(calv[v2]); //
                    v2++;
                    result.push(!!calo[i] ? calo[i] : ''); //算法

                    i = i + 1;
                    if (cali[i] == '~') {
                        result.push(calv[v2]); //
                        v2++;
                    } else {
                        var $ele = $('input[name="' + cali[i] + forIndex + '"]');
                        $ele = $ele.length > 0 ? $ele : $('input[name="' + cali[i]  + '"]');

                        if (!flag) {
                            formPageInit.bindKeyUpToInputCalculation($ele, $this, forIndex);
                        }
                        var val = $ele.val(); //1+ 1  2 / 2

                        var type = $ele.attr('data-role');
                        if (type == 'date') {
                            val = Date.parse(val.substring(0, 10));
                            isDate.push("true");
                        } else {
                            val = !!val ? !isNaN(val) ? val : 0 : 0;
                        }
                        result.push(val);
                    }

                }

            }
            else
            {
                if (typeof(rest) != 'undefined') {
                    if (!calo[i]) {
                        break;
                    }
                    result.push(calo[i]);

                    i = i + 1;
                    if (cali[i] == '~') {
                        result.push(calv[v2]);
                        v2++;
                    } else {
                        var $ele = form.find('input[name="' + cali[i] + forIndex + '"]');
                        $ele = $ele.length > 0 ? $ele : $('input[name="' + cali[i]  + '"]');


                        var val = $ele.val(); //1+ 1  2 / 2
                        if (!flag) {
                            formPageInit.bindKeyUpToInputCalculation($ele, $this, forIndex);
                        }

                        var type = $ele.attr('data-role');
                        if (type == 'date') {
                            var date = new Date();
                            date.setDate(date);
                            val = date;
                        } else {
                            val = !!val ? !isNaN(val) ? val : 0 : 0;
                        }
                        result.push(val);
                    }
                }
                else //第一次执行
                {
                    var $ele = form.find('input[name="' + cali[i] + forIndex + '"]');
                    $ele = $ele.length > 0 ? $ele : $('input[name="' + cali[i]  + '"]');

                    var type = $ele.attr('data-role');
                    var val = $ele.val(); //1+ 1  2 / 2
                    if (!flag) {
                        formPageInit.bindKeyUpToInputCalculation($ele, $this, forIndex);
                    }
                    var val = $ele.val(); //1+ 1  2 / 2
                    if (type == 'date') {
                        val = Date.parse(val.substring(0, 10));
                        isDate.push("true");
                    } else {
                        val = !!val ? !isNaN(val) ? val : 0 : 0;
                    }

                    result.push(val);
                    result.push(calo[i]);
                    if (cali[i] == '~') {
                        result.push(calv[v2]);
                        v2++;
                    } else {
                        i = i + 1;
                        var $ele = form.find('input[name="' + cali[i] + forIndex + '"]');
                        $ele = $ele.length > 0 ? $ele : $('input[name="' + cali[i]  + '"]');

                        var val = $ele.val(); //1+ 1  2 / 2

                        if (!flag) {
                            formPageInit.bindKeyUpToInputCalculation($ele, $this, forIndex);
                        }

                        var type = $ele.attr('data-role');
                        if (type == 'date') {
                            val = Date.parse(val.substring(0, 10));
                            isDate.push("true");
                        } else {
                            val = !!val ? !isNaN(val) ? val : 0 : 0;
                        }
                        result.push(val);
                    }
                }


            }

            if (result.length >= 3) {
                if (isDate[0] == "true" && isDate[1] == "true") {
                    rest = eval(result.join('')) / 1000 / 60 / 60 / 24;
                } else {
                    rest = eval(result.join(''));
                }
                isDate = [];
                result = [];
                result.push(rest);
                i = i - 1;
            }
        }

        var point = $this.attr('data-point');
        if(!!point) {
            rest = rest.toFixed(point);
            rest = parseFloat(rest);
        }
        return rest;

    }
    else //设置循环出来的数据不能大于输入的数据
    {
        if(cali.length == 1) {
            if(cali[0] == '~') {
                return calv[0];
            }　else {
                var $ele = form.find('input[name="' + cali[0] + forIndex + '"]');
                return $ele.val();
            }
        }
    }

};

/***
 * 设置普通计算公式，输入框输入时计算
 * @param $ele
 * @param $this
 * @param forIndex
 */
FormPageBtnInit.prototype.bindKeyUpToInputCalculation = function ($ele,$this,forIndex) {
    var readOnly = $ele.attr('readOnly');

    if(!readOnly) {
        $ele.attr('data-name',$($this).attr('name'));
        if(typeof(forIndex) != 'undefined') {
            $ele.attr('data-isTime',forIndex);
        }
        $ele.keyup(function(){
            var name = $(this).attr('data-name');
            var isTime = $(this).attr('data-isTime');

            var target = $('input[name="'+name+'"]');

            var result = formPageInit.calcualtionData(isTime,$this,true);
            target.val(result);
        });
    }
};

/***
 * 存在多个时验证
 * @param $this
 * @param value
 * @returns {*}
 */
FormPageBtnInit.prototype.getIsMoreValues = function($this,value) {

    var accumulation = $this.attr('data-accumulation');
    var form = $this.parents('form');
    if(!!accumulation) {
        var gocn = $this.attr('formcontrolgrouptablecolumn');
        value  = 0;
        form.find("input[formcontrolgrouptablecolumn='"+gocn+"']").each(function(){
            var val = $(this).val();
            if(!isNaN(val)) {
                value = value + parseFloat(!!val ? val : 0);
            }

        });
    }
    return value;
};

/***
 * 存在多个时反向验证
 * @param $this
 */
FormPageBtnInit.prototype.getIsMoreValuesValidate = function($this,validator) {
    var gocn = $this.attr('formcontrolgrouptablecolumn');
    var form = $this.parents("form");
    var accumulation = $this.attr('data-accumulation');
    if(!!accumulation) {
        form.find("input[formcontrolgrouptablecolumn='"+gocn+"']").each(function(){
            var val = $(this).val();
            if(!!val) {
                var controls = $(this).parents('.controls');
                var isRevalidateField = controls.find(".glyphicon-remove").length > 0 ? true : false;
                if(isRevalidateField) {
                    var name = $(this).attr("name");
                    validator.updateStatus(name, 'VALID');
                }
            }

        });
    }
};

/****
 * 表单针对弹出页面的更新操作
 * @param formid
 * @param dataId
 */
FormPageBtnInit.prototype.updateChildrenData = function (formid, flowId, dataId) {
    var var0 = $("#" + formid).find('button[file_name]');
    var isContinue = var0.length >= 1 ? true : false;
    if (isContinue) {
        var0.each(function () {
            var var1 = $(this).attr('formid');
            var tableName = $('#' + var1 + '_form').attr("table-name");
            var ids = $(this).attr('data-updateId');

            var values = [], column = [];
            if (!!flowId) { //流程id
                column.push("flowCode");
                values.push(flowId);
            }
            if (!!dataId) { //业务数据id
                column.push("guanlianshujuid");
                values.push(dataId);
            }

            var params = {tableName: tableName, columns: column.join(','), values: values.join(','), ids: ids};
            $.getAjaxData(basePath + '/button/updateOrSaves.htm', params);
        });
    }
};


FormPageBtnInit.prototype.saveFormulateFunc  = function(funcName,processKey) {
    try {
        var func = eval(funcName);
        if(!!func) {
            func(processKey);
        }
    } catch(e){
        console.log(e);
    }
}

/****
 * set default and trigger method
 * @param formid
 */
FormPageBtnInit.prototype.initRadioClickEvent = function (formid) {
    $("#" + formid).find("div[data-role='radio'][onclick]").each(function () {
        var defaultValue = $(this).attr('v');
        var onclick = $(this).attr("onclick");
        $(this).removeAttr('onclick');
        $(this).find("input").attr('onclick', onclick);
        $(this).find("input[value='" + defaultValue + "']").attr("checked", true);
        $(this).find("input[value='" + defaultValue + "']").click();
    });
};



/***
 * The page settings select the control
 * bug the control does not hide the system automatically set to increase the system fault tolerance
 * @param selector
 */
FormPageBtnInit.prototype.setSelectDisplayControl = function (selector) {
    jQuery(selector).find("input[type='checkbox'][data-relation],input[type='radio'][data-relation]").each(function () {
        var dataRelation = $(this).attr("data-relation");
        var split = !!dataRelation ? dataRelation.split("@") : [];
        if(!jQuery.isEmptyObject(split)) {
            for(var i in split) {
                var v = split[i];

                var var0 = $(selector).find("input[name='"+v+"']:eq(0)"); //输入框
                if(var0.length > 0 && var0.css("display") !='none') {
                    var0.parents(".form-group").hide();
                    var0.attr('disabled',true);
                }

                var var1 = $(selector).find("textarea[name='"+v+"']:eq(0)"); //文本框
                if(var1.length > 0 && var1.css("display") !='none') {
                    var0.parents(".form-group").hide();
                    var0.attr('disabled',true);
                }

                var var2 = $(selector).find("div[refid='"+v+"']").parents(".page-row"); //代码块
                if(var2.length > 0 && var2.css("display") !='none') {
                    var2.hide();
                    $(var2).find("input,select,textarea").attr('disabled',true);
                }
            }
        }

    });

    jQuery(selector).find("input[showtype='2']").each(function(){
        $(this).parents(".form-group").hide();
        $(this).attr('disabled',true);
    });

    jQuery(selector).find('.page-row[showtype="2"]').hide();
    jQuery(selector).find('.page-row[showtype="2"]').find("input,textarea,select").attr('disabeld',true);
};


/****
 * Page initialization setting enum value
 */

FormPageBtnInit.prototype.initialzationEnumValue = function(selector,val) {

    var texts = !!$(selector).attr('data-enum-text') ? $(selector).attr('data-enum-text').split("@") : '';
    var vals  = !!$(selector).attr('data-enum-val')  ? $(selector).attr('data-enum-val').split("@") : '';
    if(!!texts && !!vals) {
        var index = texts.indexOf(val);
        selector.val(vals[index]);
    } else {
        selector.val(!!val ? val : 0);
    }
};

