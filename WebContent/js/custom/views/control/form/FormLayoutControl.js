var FormLayoutControl = function () {
    this.jsons = [
        {"": ""},
        {"_TextTemplate": "输入框"},
        {"_SelectTemplate": "下拉框"},
        {"_CheckBoxTemplate": "复选框"},
        {"_RadioTemplate": "单选框"},
        {"_DateTemplate": "时间"},
        {"_HeaderTemplate": "上传"},
        {"_TextAreaTemplate": '文本域'},
        {"_UserBoxTemplate": '选人框'},
        {"_Button": '按钮'},
        {"_linkTemplate": '超链接'}];

    this.showTB = {
        "text": "输入框",
        "select": "下拉框",
        "checkbox": "复选框",
        "radio": "单选框",
        "date": "时间",
        "file": "上传",
        "textarea": '文本域',
        "button": '按钮',
        "userbox": '选人框',
        "link": '超链接'
    };

    this.datarole = ["checkbos",'radio'];

    this.selectType;
};

var formLayout = new FormLayoutControl();


FormLayoutControl.prototype.initPageHtml = function () {
    $("#contern_grid").delegate('.form-group-sm', 'click', function (event) {
        formLayout.getHTMLContent(this);
    });
};

/***
 * 设置控件样式的方法
 */
FormLayoutControl.prototype.setControlCSS = function ($this, flag) {
    var val = $($this).val();
    if (!val) {
        return false;
    }

    if (val > 12) {
        $($this).val(12)
    }

    var index = $('.setwidth').index($($this).parents(".setwidth"));
    var control = $('.hasFocus').find(".controls:eq(" + index + ")");
    var label = $(control).prev();

    var length = $('.hasFocus').find("input,select,textarea").length;
    var var54;
    switch (length) {
        case 1:
            var54 = 12;
            break;
        case 2:
            var54 = 6;
            break;
        case 3:
            var54 = 4;
            break;
        case 4:
            var54 = 3;
            break;
    }
    var val2 = var54 - val;
    if (flag == 0) {
        formLayout.setInputCls(label, val);
       // formLayout.setInputCls(control, val2);
    } else {
        formLayout.setInputCls(control, val);
        //formLayout.setInputCls(label, val2);
    }
    formLayout.getHTMLContent($('.hasFocus'));

};

FormLayoutControl.prototype.setInputCls = function (target, val) {
    $(target).attr('ref', 'col-md-' + val);
    var clazz = formLayout.resetClass(target, 'col-md-');
    $(target).removeAttr('class').attr('class', clazz).addClass('col-md-' + val);
};

FormLayoutControl.prototype.resetClass = function (target, flag) {
    var var0 = [];
    var split = !!$(target).attr('class') ? $(target).attr('class').split(' ') : '';
    if (!!split) {
        for (var i = 0; i < split.length; i++) {
            if (!(split[i].indexOf(flag) > -1)) {
                var0.push(split[i]);
            }
        }
    }
    return var0.join(' ');

};
FormLayoutControl.prototype.showQuality = function (dtype) {
    this.selectType = '';
    switch (dtype) {
        case "text":
        case "select":
        case "checkbox":
        case "radio":
        case "date":
        case "upload":
        case "textarea":
        case "button":
        case "userbox":
        case "link":
            $("#globalProperty4").removeClass('hide');
            $("#globalProperty4").prev().removeClass('hide');

            $("#globalProperty4").show();
            $("#globalProperty4").prev().show();
            break;
        default:
            $("#globalProperty4").addClass('hide');
            $("#globalProperty4").prev().addClass('hide');
    }

};

/***
 * 添加控件方法
 * @returns {boolean}
 */
FormLayoutControl.prototype.addControl = function () {
    var type = $("#selectControlType option:selected").val();
    if (!type) {
        alert("请选择控件类型!");
        return false;
    }
    var html = tab(type);
    formLayout.selectType = type;
    var length = $('.hasFocus').find(".controls").length;
    if (length >= 4) {
        alert('当前行只许添加四个控件!');
        return false;
    }
    $('.hasFocus').append($(html).find('.col-md-3'));
    $('.hasFocus').append($(html).find('.col-md-9'));


    var var1, var2;
    if (length == 1) {
        var1 = 2;
        var2 = 4;
    } else if (length == 2) {
        var1 = 1;
        var2 = 3;
    } else if (length == 3) {
        var1 = 1;
        var2 = 2;
    }


    $('.hasFocus').find(".controls").each(function () {
        formLayout.setInputCls($(this).prev(), var1);
        formLayout.setInputCls(this, var2);
    });


    formLayout.getHTMLContent($('.hasFocus'));


    var controls = $('.hasFocus').find(".controls:last");

    var datarole = $(controls).attr("data-role");
    if(formLayout.datarole.indexOf(datarole) >-1) {
        $(controls).click();
    } else {
        $(controls).find("input,select,textarea,a").click();
    }
};

/****
 * 删除控件
 * @param $this
 */
FormLayoutControl.prototype.deleteControl = function ($this) {
    if(confirm('您确定删除吗?')) {
        var index = $('.type_table').find('.fa-close').index($this);

        $('.hasFocus').find(".controls:eq(" + index + ")").prev().remove();
        $('.hasFocus').find(".controls:eq(" + index + ")").remove();

        if(index == 0) {
            $('.hasFocus').remove();

            formLayout.showQuality();
        }

        var length = $('.hasFocus').find(".controls").length;
        var var1, var2;
        if (length == 2) {
            var1 = 2;
            var2 = 4;
        } else if (length == 3) {
            var1 = 1;
            var2 = 3;
        } else if (length == 1) {
            var1 = 3;
            var2 = 9;
        }

        $($this).parents('tr').remove();

        $('.hasFocus').find(".controls").each(function () {
            formLayout.setInputCls($(this).prev(), var1);
            formLayout.setInputCls(this, var2);
        });

        formLayout.getHTMLContent($('.hasFocus'));

        var preIndex = index -1;
        var controls = $('.hasFocus').find(".controls:eq(" + preIndex + ")");

        var datarole = $(controls).attr("data-role");
        if(formLayout.datarole.indexOf(datarole) >-1) {
            $(controls).click();
        } else {
            $(controls).find("input,select,textarea,a").click();
        }
    }
};

/****
 * 加载右边属性
 * @param $this
 */
FormLayoutControl.prototype.getHTMLContent = function ($this) {

    var var1 = [];
    var1.push(' <table class="type_table">');

    var1.push('<tr>');
    var1.push('<th width="35%">控件类型</th>');


    var1.push('<td width="55%" colspan="2"><select id="selectControlType" class="form-control">' + formLayout.getOptionsHtml(formLayout.jsons) + '</select></td>');
    var1.push('<td width="5%"><div><i class="fa fa-plus" onclick="formLayout.addControl()"></i></div></td>');
    var1.push('</tr>');

    $($this).find(".controls").each(function (i) {
        var w1 = $(this).attr("ref");
        var w2 = $(this).prev().attr('ref');

        var type = $(this).find('input,select,textarea,button,a').attr('data-role');
        if (!type) {
            var ref = $(this).find('.checkbox,.radio').attr('ref');
            type = !!ref ? ref : $(this).find('input[type="file"]').attr('type');
        }

        var s2 = !!w1 && w1.split('-');
        var s1 = !!w2 && w2.split("-");

        var labelType = formLayout.showTB[type];

        var1.push('<tr class="setwidth">');
        var1.push('<th>控件' + formLayout.getControlName(i) + '</th>');
        /*var1.push('<td width="5%">' + labelType + '</th>');*/
        var1.push('<td width="35%"><input type="number" onkeyup="formLayout.setControlCSS(this,0)"  onchange="formLayout.setControlCSS(this,0)"  class="form-control" value="' + s1[2] + '"/></td>');
        var1.push('<td width="35%"><input type="number" onkeyup="formLayout.setControlCSS(this,1)" onchange="formLayout.setControlCSS(this,1)"  class="form-control" value="' + s2[2] + '" /></td>');
        var1.push('<td align="center"><i class="fa fa-close" onclick="formLayout.deleteControl(this);"></i></td>');
        var1.push('</tr>');
    });
    var1.push('</table>');


    var1.push('<div class="conternt_type">');
    var1.push('<ul class="conternt_title">');
    $($this).find(".controls").each(function (i) {
        var1.push('<li ' + (i == 0 ? 'class="active"' : '') + '><a href="javascript:void(0);">控件' + formLayout.getControlName(i) + '</a></li>');
    });
    var1.push('</ul>');
    var1.push('<div class="conternt_body">');


    var1.push('</div>');

    $("#globalProperty4").empty().append(var1.join(''));


    $('.conternt_type').find(".conternt_title li").click(function () {
        $('.conternt_type').find(".conternt_title li").attr('class', '');
        $('.conternt_type').find('.conternt_body').children('div').css('display', 'none');
        $(this).attr('class', 'active');
        $('.conternt_type').find('.conternt_body').children('div:eq(' + $(this).index() + ')').css('display', 'block');

        formLayout.selectedPageEle(this);
    });


};

FormLayoutControl.prototype.getControlName = function (i) {
    switch (i) {
        case 0:
            return 'A';
        case 1:
            return 'B';
        case 2:
            return 'C';
        case 3:
            return "D";
    }
};

FormLayoutControl.prototype.getOptionsHtml = function (jsons) {
    var var0 = [];
    for (var i = 0; i < jsons.length; i++) {
        var json = jsons[i];
        for (var key in json) {
            var selected = '';
            if(formLayout.selectType == key) {
                selected = 'selected';
            }
            var0.push('<option value="' + key + '" '+selected+'>' + json[key] + '</option>');
        }
    }
    return var0.join('');
};


FormLayoutControl.prototype.setHasFocus = function () {
    var datarole = $(".hasFocus2").attr('data-role');

    var selector = $(".hasFocus2").parents(".controls");
    if(formLayout.datarole.indexOf(datarole) >-1) {
        selector = $(".hasFocus2");
    }

    var index = $('.hasFocus').find(".controls").index(selector);
    $(".conternt_title").find("li").removeClass("active");
    $(".conternt_title").find("li:eq(" + index + ")").addClass("active");
};


FormLayoutControl.prototype.selectedPageEle = function ($this) {
    var index = $(".conternt_title").find("li").index($this);
    var controls = $('.hasFocus').find(".controls:eq(" + index + ")");
    var data_role = $(controls).attr("data-role");


    if(formLayout.datarole.indexOf(data_role) >-1) {
        $(controls).click();
    } else {
        $(controls).find("input,select,textarea,a").click();
    }

};


$(function () {
    formLayout.initPageHtml();
});