var FormValidatorControl = function () {
    var isStart = true;
    var pageInit = function (type) {
        try {
            var hasFocus2 = $('.hasFocus2');
            if(type == 'button') {
                return false;
            }

            var $this = $("#validatorControl");
            /*var flag = $this.prev().find("i").attr("class").indexOf("fa-caret-right") <= -1;
            if (flag) {
                $this.prev().click();
            }*/
            $this.empty();

            //-----------是否必填---------------
            var required = $(isRequiredHtml(hasFocus2));
            $this.append(required);

            var selector = required.find("input");
            isRequiredEvent(selector);

            if(type == 'text' || type=='textarea') {
                //-----------字段长度限制----------------------
                var lengthLimit = $(strLengthLimitHtml(hasFocus2));
                $this.append(lengthLimit);

                var min = lengthLimit.find("input[id='min']");
                var max = lengthLimit.find("input[id='max']");
                lengthEvent(min,'data-min');
                lengthEvent(max,'valid-writeLength');


                //-----------正则验证---------------
                var validator = $(validatorTypeHtml());
                $this.append(validator);

                var calculation = $(customerCalculationHtml());
                $this.append(calculation);

                regexEvent(validator);
                checkboxEvent(calculation);
            }

            $this.prev().show();
            $this.show();
            //$this.prev().click();
        } catch (e) {
            console.log(e);
        }
    };


    var isRequiredEvent = function (selector) {
        selector.click(function () {
            var role = $('.hasFocus2').attr('data-role');
            var val = $(this).val();
            if(role == 'radio' || role == 'checkbox') {
                if(val == 'on') {
                    $('.hasFocus2').find('input').attr("required",true);
                    $('.hasFocus').find('.supText1').show();
                } else {
                    $('.hasFocus2').find('input').removeAttr("required",true);
                    $('.hasFocus').find('.supText1').hide();
                }
            } else {
                if(val == 'on') {
                    $('.hasFocus2').attr("required",true);
                    $('.hasFocus').find('.supText1').show();
                } else {
                    $('.hasFocus2').removeAttr("required",true);
                    $('.hasFocus').find('.supText1').hide();
                }
            }

        });
    };

    var lengthEvent = function (selector,attr) {
        selector.keyup(function () {
            var val = $(this).val();
            $('.hasFocus2').attr(attr,val);
        });
        selector.change(function () {
            var val = $(this).val();
            $('.hasFocus2').attr(attr,val);
        });
    };

    var regexEvent = function (selector) {
        selector.find("select").change(function () {
            var val = $(this).val();
            $('.hasFocus2').attr('valid-writeType',val);


            if(val == 7) {
                var regex = $(customerRegexHtml());
                var message = $(customerRegexMessageHtml());

                $(this).parents('.prop-mg-lr').after(message);
                $(this).parents('.prop-mg-lr').after(regex);


                inputRegexEvent(regex,'data-regex');
                inputRegexEvent(message,'data-message');
            } else {
                $('#regexBlock').remove();
                $('#regexMessageBlock').remove();
                $('.hasFocus2').removeAttr('data-regex');
                $('.hasFocus2').removeAttr('data-message');

                var checked = $("input[name='calculationValidator']").get(0).checked;
                if(!!checked && checked) {
                    $("input[name='calculationValidator']").click();
                }
            }

        });

        var type = $('.hasFocus2').attr('valid-writetype');
        if(!!type) {
            selector.find("select").change();
        }

    };
    
    var radioEvent = function (selector,attr) {
        selector.find("input").click(function(){
            var val  = $(this).val();
            var role = $('.hasFocus2').attr('data-role');
            switch (role) {
                case "checkbox":
                case "radio":
                    break;
                default:
                    if(val == 'on') {
                        $('.hasFocus2').attr(attr,true);
                    } else {
                        $('.hasFocus2').removeAttr(attr);
                    }
                    break;
            }
        });
    }

    var inputRegexEvent = function (selector,attr) {
        $(selector).find("input").keyup(function () {
            var val = $(this).val();
            $('.hasFocus2').attr(attr,val);
        })
    };

    var selectEvent = function (selector,attr) {
        $(selector).find("select").change(function () {
            var val = $(this).val();
            $('.hasFocus2').attr(attr,val);
        })
    };

    var checkboxEvent = function (selector,attr) {
        selector.find("input[type='checkbox']").click(function(){
            var checked = $(this).get(0).checked;
            if(checked) {
                $('.hasFocus2').attr('data-calculation','on');
                var parents =  $("#validatorControl");

                var message = $(customerRegexMessageHtml('data-calmessage'));
                var validatorMode = $(validatorModeHtml());
                var accumulation  = $(isAccumulationHtml());

                parents.append(validatorMode).append(accumulation).append(message);

                inputRegexEvent(message,'data-calmessage');
                selectEvent(validatorMode,'data-opertion');
                radioEvent(accumulation,'data-accumulation');

                FormInitControlData.initCalculation(parents);
            } else {
                $('.hasFocus2').removeAttr('data-calculation');
                $(this).parents('.prop-mg-lr').nextAll('.prop-mg-lr').remove();
                $('.hasFocus2').removeAttr('data-cual-method');
                $('.hasFocus2').removeAttr('data-cali');
                $('.hasFocus2').removeAttr('data-calo');
                $('.hasFocus2').removeAttr('data-cal-val');
                $('.hasFocus2').removeAttr('data-calmessage');
                $('.hasFocus2').removeAttr('data-opertion');
                $('.hasFocus2').removeAttr('data-accumulation');
            }
        });

        var checked = $('.hasFocus2').attr('data-calculation');
        if(!!checked) {
            selector.find("input[type='checkbox']").click();
        }
    };

    var isRequiredHtml = function (hasFocus2) {
        var role = hasFocus2.attr('data-role');
        var required;
        if(!!role &&　(role == 'radio' || role == 'checkbox')) {
            required = hasFocus2.find("input:eq(0)").attr('required');
        } else {
            required = hasFocus2.attr('required');
        }

        var var0 = [];
        var0.push('<div class="form-group-prop prop-mg-lr">');
        var0.push(   '<label class="label_property">是否必填</label>');
        var0.push(   '<div class="controls">');
        var0.push(      '<div class="radio" style="margin-top: 6px; ">');
        var0.push(      '<label style="margin-right: 20px;"><input style="margin-top: -3px;" type="radio" name="isRequired" value="on" '+(!!required ? 'checked' : '')+'>是，必填</label>');
        var0.push(      '<label><input style="margin-top: -3px; " type="radio" name="isRequired" value="off" '+(!!required ? '' : 'checked')+' >否</label></div>');
        var0.push(   '</div>');
        var0.push('</div>');
        return var0.join('');
    };

    var isAccumulationHtml = function () {
        var role = $('.hasFocus2').attr('data-role');
        var accumulation;
        if(!!role &&　(role == 'radio' || role == 'checkbox')) {
            accumulation = $('.hasFocus2').find("input:eq(0)").attr('data-accumulation');
        } else {
            accumulation = $('.hasFocus2').attr('data-accumulation');
        }

        var var0 = [];
        var0.push('<div class="form-group-prop prop-mg-lr">');
        var0.push(   '<label class="label_property">累加计算</label>');
        var0.push(   '<div class="controls">');
        var0.push(      '<div class="radio" style="margin-top: 6px; ">');
        var0.push(      '<label style="margin-right: 20px;"><input style="margin-top: -3px;" type="radio" name="accumulation" value="on" '+(!!accumulation ? 'checked' : '')+'>是，累加</label>');
        var0.push(      '<label><input style="margin-top: -3px; " type="radio" name="accumulation" value="off" '+(!!accumulation ? '' : 'checked')+' >否</label></div>');
        var0.push(   '</div>');
        var0.push('</div>');
        return var0.join('');
    };

    var strLengthLimitHtml = function (hasFocus2) {
        var max = hasFocus2.attr('valid-writelength');
        var min = hasFocus2.attr('data-min');
        var var0 = [];
        var0.push('<div class="prop-mg-lr col-md-12">');
        var0.push(  '<div class="form-group-prop"><label class="label_property">字符长度</label>');
        var0.push(      '<div class="controls">');
        var0.push(          '<input type="number" id="min" class="form-control" style="width: 48%; float: left;" placeholder="最小值" min="0" value="'+(!!min ? min : 0)+'">');
        var0.push(          '<input type="number" id="max" class="form-control" style="width: 50%; float: right;" placeholder="最大值" min="0" value="'+max+'">');
        var0.push(      '</div>');
        var0.push(  '</div>');
        var0.push('</div>');
        return var0.join('');
    };

    var validatorTypeHtml = function () {
        var type = $('.hasFocus2').attr('valid-writetype');

        var texts = ["请选择验证类型","整数（最多三位小数）","数字","数字或英文字母","验证电话号码","验证电子邮箱","自定义正则验证"];
        var values = ["","2","3","4","5","6","7"];

        var var0 = [];
        var0.push('<div  class="prop-mg-lr col-md-12">');
        var0.push('<div class="form-group-prop"><label class="label_property">验证类型</label>');
        var0.push('<div class="controls">');
        var0.push('<select id="validateType"  class="form-control">');
        for(var i in texts) {
            var0.push('<option value="'+values[i]+'" '+(type == values[i] ? 'selected' : '')+'>'+texts[i]+'</option>');
        }
        var0.push('</select>');
        var0.push('</div>');
        var0.push('</div>');
        var0.push('</div>');
        return var0.join('');
    };

    var validatorModeHtml = function () {
        var type = $('.hasFocus2').attr('data-opertion');

        var texts = ["","大于","小于","等于","大于等于","小于等于"];
        var values = ["",">","<","=",">=","<="];

        var var0 = [];
        var0.push('<div  class="prop-mg-lr col-md-12">');
        var0.push('<div class="form-group-prop"><label class="label_property">计算方式</label>');
        var0.push('<div class="controls">');
        var0.push('<select id="validatorMode"  class="form-control">');
        for(var i in texts) {
            var0.push('<option value="'+values[i]+'" '+(type == values[i] ? 'selected' : '')+'>'+texts[i]+'</option>');
        }
        var0.push('</select>');
        var0.push('<small></small>');
        var0.push('</div>');
        var0.push('</div>');
        var0.push('</div>');
        return var0.join('');
    };
    
    var customerRegexHtml = function (attr) {
        var regex = $('.hasFocus2').attr(!!attr ? attr : 'data-regex');
        var var0 = [];
        var0.push('<div id="regexBlock" class="prop-mg-lr col-md-12">');
        var0.push('<div class="form-group-prop"><label class="label_property">正则验证</label>');
        var0.push('<div class="controls">');
        //var0.push('<textarea id="customerRegex" name="customerRegex" rows="3" placeholder="！"></textarea>');
        var0.push('<input type="text" id="customerRegex" class="form-control" value="'+(!!regex ? regex :'/^$/')+'" placeholder="请填写正则表达式"/>');
        var0.push('</div>');
        var0.push('</div>');
        var0.push('</div>');
        return var0.join('');
    };

    var customerRegexMessageHtml = function (attr) {
        var message = $('.hasFocus2').attr(!!attr ? attr : 'data-message');
        var var0 = [];
        var0.push('<div id="regexMessageBlock" class="prop-mg-lr col-md-12">');
        var0.push('<div class="form-group-prop"><label class="label_property">错误信息</label>');
        var0.push('<div class="controls">');
        //var0.push('<textarea id="customerRegex" name="customerRegex" rows="3" placeholder="！"></textarea>');
        var0.push('<input type="text" id="regexMessage" class="form-control" value="'+(!!message ? message :'')+'" placeholder="请填写错误信息"/>');
        var0.push('</div>');
        var0.push('</div>');
        var0.push('</div>');
        return var0.join('');
    };

    var customerCalculationHtml = function () {
        var var0 = [];
        var0.push('<div class="form-group-prop prop-mg-lr">');
        var0.push(   '<div class="checked">');
        var0.push(     '<label style="margin-right: 20px;">');
        var0.push(          '<input style="margin-top:10px;height:auto!important;" type="checkbox" name="calculationValidator" value="8">');
        var0.push(          '<span style="font-weight: normal;margin-left:10px;">设置计算公式验证</span>');
        var0.push('</label>');
        var0.push(  '</div>');
        var0.push('</div>');
        return var0.join('');
    };

    return {
        init: function (type) {
            if(isStart) {
                pageInit(type);
            }
        }
    }
}();
