/**
 * 单选框和复选框选中一个选项时空间标签块内容的显示
 **/
var CheckboxRadioControl = function () {
    this.isStart = true;
};

var checkboxAndRadio = new CheckboxRadioControl();
CheckboxRadioControl.prototype.getRightCofigHtmlBlock = function (type) {
    if(checkboxAndRadio.isStart == false) {
        return false;
    }
    if (type == 'radio' || type == 'checkbox') {
        $("#isShowControlFunc").empty();

        //var flag = $("#isShowControlFunc").prev().find("i").attr("class").indexOf("fa-caret-right") <= -1;
        //if(flag) {
            //$("#isShowControlFunc").prev().click();
        //}
        var isGroup = $('.hasFocus2').parents('.formControlGroup').length > 0 ? true : false;
        var option = '';
        if(isGroup) {
            option = $("#formControlGroupTableColumn").html();
        } else {
            option = $("#test-table").html();
        }


        var rval = $(".hasFocus2").find("input:eq(0)").attr('data-values');

        option = checkboxAndRadio.getControlBlockOption(option);
        if(!!rval) {

            checkboxAndRadio.initModifyBindData(rval,option);
        } else {
            checkboxAndRadio.initAddBindData(option);
        }

        $("#isShowControlFunc").show();
        $("#isShowControlFunc").prev().show();
    } else {
        $("#isShowControlFunc").hide();
        $("#isShowControlFunc").prev().hide();
    }
};
CheckboxRadioControl.prototype.getControlBlockOption = function (option) {
    jQuery('.page-row').each(function () {
        var refid = $(this).find("div[refid]").attr('refid');
        var text  = $(this).find('.pageTeamH3').text();
        option = option + "<option value='"+refid+"'>"+(!!text ? text :refid) +"</option>";
    });
    return option;
};

CheckboxRadioControl.prototype.getOptionItemsOption = function () {
    var option = [];
    var values = [];
    option.push("");
    values.push("");
    var role = $(".hasFocus2").attr('data-role');
    if(role == 'checkbox' || role == 'radio') {
        $(".hasFocus2").find('input').each(function () {
           var text = $(this).next().text().trim();
           option.push(text);
           values.push($(this).val());
        });
    }
    var var0 = [];
    for(var val in option) {
        var0.push('<option value="'+values[val]+'">'+option[val]+'</option>');
    }
    return var0.join('');
};

CheckboxRadioControl.prototype.initAddBindData = function (option) {
    var var0 = [];
    var0.push(BaseControl.getSelect('选择项', "optionItems",'',true,checkboxAndRadio.getOptionItemsOption()));
    var0.push(BaseControl.getSelect("显示项", "choiceLable",'',true,option));

    $("#isShowControlFunc").append(var0.join(''));
    $("#isShowControlFunc").append('<div class="text-center"><button class="btn btn-primary btn-xs" onclick="checkboxAndRadio.addLabelHtml(this)">新增一项</button></div>');

    checkboxAndRadio.choiceLabelChangeEvent();
};

CheckboxRadioControl.prototype.initModifyBindData = function (rval,option) {
    var split = rval.split("@");

    for(var i in split) {
        var var98 = split[i];
        var var0 = [];
        var0.push('<div>');
        var0.push(BaseControl.getSelect('选择项', "optionItems",'',true,checkboxAndRadio.getOptionItemsOption()));
        var0.push(BaseControl.getSelect("显示项", "choiceLable",'',true,option));
        var0.push('</div>');
        $("#isShowControlFunc").append(var0.join(''));
        $("select[id='optionItems']:eq("+i+")").val(var98);



        var relations = $(".hasFocus2").find("input:eq(0)").attr("data-relation");
        if(!!relations) {
            var reSplit = relations.split('@');
            $("select[id='choiceLable']:eq("+i+")").val(reSplit);
        }

        $("select[id='optionItems']:eq("+i+")").change(function(){ checkboxAndRadio.addLabelInputOnBlur(this);});
        $("select[id='choiceLable']:eq("+i+")").change(function(){ checkboxAndRadio.addLabelSelectChange(this);});
    }
    $("#isShowControlFunc").append('<div class="text-center"><button class="btn btn-primary btn-xs" onclick="checkboxAndRadio.addLabelHtml(this)">新增一项</button></div>');

    if(split.length >1){
        var length = $("input[name='isMutex']").length;
        if(length <= 0) {
            $("#isShowControlFunc").append(checkboxAndRadio.setIsMutex());

            var ismutex = $(".hasFocus2").find("input:eq(0)").attr("data-ismutex");
            if(!!ismutex) {
                $("input[name='isMutex'][value='"+ismutex+"']").attr("checked",true);
            }
            $("input[name='isMutex']").click(function () {
                var val = $(this).val();
                $(".hasFocus2").find("input").attr("data-ismutex",val);
            });
        }
    }
};
CheckboxRadioControl.prototype.addLabelSelectChange = function ($this) {
    var val = $($this).find('option:selected').val();

    var var1  = $(".hasFocus2").find("input").attr("data-relation");
    var split = var1.split("@");

    var index = $("select[id='"+$($this).attr('id')+"']").index($this);

    if(!!val) {

        split[index] = val;
        $(".hasFocus2").find("input").attr("data-relation",split.join('@'));
    } else {
        if(split.length > 1) {

        } else {
            $(".hasFocus2").find("input").removeAttr("data-relation");
        }
    }
};

CheckboxRadioControl.prototype.addLabelInputOnBlur = function ($this) {
    var val   = $($this).val();

    var var1  = $(".hasFocus2").find("input").attr("data-values");

    var name = $($this).attr('id');
    var index = $("select[id='"+name+"']").index($this);
    var split = var1.split("@");


    if(!!val) {
        split[index] = val;
        $(".hasFocus2").find("input").attr("data-values",split.join('@'));
    } else {
        if(split.length > 1) {

        } else {
            $(".hasFocus2").find("input").removeAttr("data-values");
        }
    }
};
CheckboxRadioControl.prototype.addLabelHtml = function ($this) {
    var var0 = [];
    //var option = $("#test-table").html();


    var isGroup = $('.hasFocus2').parents('.formControlGroup').length > 0 ? true : false;
    var option = '';
    if(isGroup) {
        option = $("#formControlGroupTableColumn").html();
    } else {
        option = $("#test-table").html();
    }


    option = checkboxAndRadio.getControlBlockOption(option);

    var0.push(BaseControl.getSelect('选择项', "optionItems",'',true,checkboxAndRadio.getOptionItemsOption()));
    var0.push(BaseControl.getSelect("显示项", "choiceLable",'',true,option));

    var html = var0.join('');
    $($this).parents(".text-center").before(html);

    $($this).parents(".text-center").prev().prev().find("select[id='optionItems']").blur(function () {
        checkboxAndRadio.addLabelInputOnBlur(this)
    });
    $($this).parents(".text-center").prev().find("select[id='choiceLable']").change(function () {
        checkboxAndRadio.addLabelSelectChange(this);
    });
    var length = $("input[name='isMutex']").length;
    if(length <= 0) {
        $($this).parents(".text-center").after(checkboxAndRadio.setIsMutex());
        $("input[name='isMutex']").click(function () {
            var val = $(this).val();
            $(".hasFocus2").find("input").attr("data-ismutex",val);
        });

        $("input[name='isMutex']").click();
    }
};

CheckboxRadioControl.prototype.choiceLabelChangeEvent = function () {
  $("#choiceLable").change(function () {
        var val = $(this).find('option:selected').val();
        if(!!val) {
            $(".hasFocus2").find("input").attr("data-relation",val);
        } else {
            $(".hasFocus2").find("input").removeAttr("data-relation");
        }
    });
    $("#optionItems").change(function () {
        var val = $(this).val();
        if(!!val) {
            $(".hasFocus2").find("input").attr("data-values",val);
        } else {
            $(".hasFocus2").find("input").removeAttr("data-values");
        }

    });
};

CheckboxRadioControl.prototype.setIsMutex = function () {
    var var0 = [];

    var0.push('<div class="form-group-prop search_btn">');
    var0.push(   '<label class="control-label">是否互斥</label>');
    var0.push(   '<div class="">');
    var0.push(      '<div class="radio" style="margin-top: 6px;"><label style="margin-right: 20px;">');
    var0.push(      '<input style="margin-top: -3px;" type="radio" name="isMutex" value="on">是</label>');
    var0.push(      '<label><input style="margin-top: -3px;" type="radio" name="isMutex" value="off" checked>否</label></div>');

    var0.push(   '</div>');
    //var0.push('<small class="text-yellow">设置选中选择项时，显示项只显示相关联的显示项</small>');
    var0.push('</div>');
    return var0.join('');
};

