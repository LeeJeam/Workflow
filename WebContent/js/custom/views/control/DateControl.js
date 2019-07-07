function DateControl (){

};

var dateControl = new DateControl();
DateControl.prototype.setDateFormat = function (ele,flag) {
    var select = BaseControl.getSelect("时间格式", 'dateformat');

    $(ele).append(select);

    if(!!flag) {
        var data = [{"":""},{"=":"等于"},{">":"大于"},{">=":"大于等于"},{"<":"小于"},{"<=":"小于等于"}];
        dateControl.addSearchWhereHtml(ele,data);
    }

    $('#dateformat').append(dateControl.getOptions());

    dateControl.valueChangeEvent();

    var format = $(".hasFocus").find('input').attr("format");
    if(!!format) {
        $('#dateformat').val(format);
    }

};


DateControl.prototype.valueChangeEvent = function () {
    $("#dateformat").change(function () {
        var val = $("#dateformat option:selected").val();
        $(".hasFocus").find('input').attr('format',val);
    });
};


DateControl.prototype.addSearchWhereHtml = function (ele,data) {
    var where = BaseControl.getSelect("条件设置", 'where');
    $(ele).append(where);

    $("#where").append(dateControl.getOptionsHtml(data));

    dateControl.changeWhereEvent();

    var where = $(".hasFocus").find('input').attr("where");
    if(!!where) {
        $('#where').val(where);
    }
};

DateControl.prototype.changeWhereEvent = function () {
    $("#where").change(function () {
        var where = $("#where option:selected").val();
        $(".hasFocus").find('input').attr('where',where);
    });
};

DateControl.prototype.getOptionsHtml = function(data) {
    var var0 = [];
    for(var i = 0;i<data.length;i++){
        var json = data[i];
        for(var key in json) {
            var0.push('<option value="'+key+'">'+json[key]+'</option>');
        }
    }
    return var0.join('');
};

DateControl.prototype.getOptions = function () {
    var var0 = [];
    var0.push('<option></option>');
    var0.push('<option value="yyyy-mm-dd HH:mm:ss">年-月-日 时:分:秒</option>');
    var0.push('<option value="yyyy-mm-dd HH:mm">年-月-日 时:分</option>');
    var0.push('<option value="yyyy-mm-dd HH">年-月-日 时</option>');
    var0.push('<option value="yyyy-mm-dd">年-月-日</option>');
    var0.push('<option value="yyyy-mm">年-月</option>');
    var0.push('<option value="yyyy">年</option>');
    return var0.join('');
};
