var BootstrapValidators = function () {
};

/***
 * 添加字段的验证
 * @param key
 * @param message
 * @returns {string}
 */
BootstrapValidators.prototype.fieldValidator = function (selector, name, valid) {
    $(selector).bootstrapValidator('addField', name, {
        validators: valid
    });
};

BootstrapValidators.prototype.removeValidator = function (selector, name) {
    $(selector).bootstrapValidator('removeField', name);
};

BootstrapValidators.prototype.required = function (validEN, message) {

    validEN.notEmpty = {
        message: !!message ? message : '必填!'
    };

    return validEN;
};
//$this.attr("valid-writeLength")
BootstrapValidators.prototype.getStringLength = function (length, validEN, max, min) {
    var message = '';
    if (min > 0) {
        message = "字符长度应大于" + min + '个字,且'
    }
    validEN.stringLength = {
        min: !!min ? min : 0,
        max: !!max ? max : 30,
        message: message + '最长不能超过' + max + '个字'
    };

    return validEN;
};

BootstrapValidators.prototype.getRegexp = function (regexp, message, validEN) {
    validEN.regexp = {
        regexp: eval(regexp),
        message: message
    };
    return validEN;
};

BootstrapValidators.prototype.getEmailValidator = function (validEN, message) {
    validEN.emailAddress = {
        message: !!message ? message : '请输入有效的邮箱地址'
    };
    return validEN;
};

BootstrapValidators.prototype.getCallbackValidator = function (validEN, message,option,datacal,$this) {
    validEN.callback = {
        message: message,
        callback: function (value, validator) {
            if(!!datacal) {
                for(var i in datacal) {
                    var se2 = $('input[name="'+datacal[i]+'"]');
                    var val = se2.val();

                    var placeholder = se2.attr('placeholder'); //不能为空验证
                    if(!val) {
                        return {
                            valid: false,
                            message: placeholder
                        }
                    }
                }
            }

            var isTime   = $this.attr('index');
            var calcualtion   = formPageInit.calcualtionData(isTime,$this,true); //设置的需要计算的数或者定量值

            value = formPageInit.getIsMoreValues($this,value);


            var result = eval(value + option + calcualtion);
            if(result) {
                return {
                    valid: false,
                    message: message
                }
            } else {
                formPageInit.getIsMoreValuesValidate($this,validator);
            }

            return true;
        }
    };
    return validEN;
};




