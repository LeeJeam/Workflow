/***
 * 添加选择页面的功能
 * @constructor
 */
var ChoicePage = function () {
    this.type;
};

var choice = new ChoicePage();

ChoicePage.prototype.init = function (type,$this,dataRoleGroup) {
    if(type == 'button' && !dataRoleGroup) {

        if($("#choicepageLabel").length <= 0) {
            $($this).append(choice.getHtml());
        } else {
            $("#choicepageLabel").show();
        }

            var $this =  $("#choicePage");
            $($this).attr("readOnly",true).css({'width': '100%','background':'#fff','cursor':'pointer'});

            var formname =  $(".hasFocus2").attr('formname');
            var formId   = $(".hasFocus2").attr('formid');

            if(!!formname) {
                $($this).val(formname);
                $($this).parent().attr('fucid',formId);
            } else {
                $($this).val('');
                $($this).parent().attr('fucid','');
            }

            $($this).click(function () {
                menu.showPathModal(this, function () {
                    var id = $($this).parent().attr('fucid');
                    if(!id) {
                        var formId = $(".hasFocus2").attr('formId');
                        $('#'+formId).remove();

                        $(".hasFocus2").removeAttr('formName');
                        $(".hasFocus2").removeAttr('formId');
                        $(".hasFocus2").removeAttr('file_name');
                    } else {
                        $.getAjaxData(basePath+"/sysFunction/selectone.htm",{id:id},function(data) {
                            var prevFromId = $(".hasFocus2").attr('formid');
                            var content = BaseControl.getPopWindowHtml(id,'');
                            $(".hasFocus2").attr('formId',id);
                            $(".hasFocus2").attr('formName',$($this).val());
                            $(".hasFocus2").attr('file_name',data.file_name);
                            $('#'+prevFromId).remove();
                            $("#ctr").append(content);
                            $("#"+id).addClass('pop-modal');
                        });
                    }
                });
            });
    } else {
        $("#choicepageLabel").remove();
    }

};

ChoicePage.prototype.getHtml = function () {
    var var9 = [];
    var9.push('<div id="choicepageLabel" class="row">');
    var9.push('<div class="prop-mg-lr col-md-12">');
    var9.push(  '<div class="form-group-prop">');
    var9.push(      '<label class="label_property">选择页面</label>');
    var9.push(      '<div class="controls">');
    var9.push(          '<input type="text" id="choicePage" class="form-control input-sm" name="choicePage">');
    var9.push(      '</div>');
    var9.push(   '</div>');
    var9.push('</div>');
    var9.push('');
    return var9.join('');
};





