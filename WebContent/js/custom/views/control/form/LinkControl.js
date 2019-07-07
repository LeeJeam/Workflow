var LinkControl = function () {
    this.hides = ["stringLength", "stringType", "inputlabelrow"];
};

var linkControl = new LinkControl();

LinkControl.prototype.initPage = function (type, $this) {
    if (type == 'link') {
        for (var var1 in linkControl.hides) {
            $("#" + linkControl.hides[var1]).hide();
        }
        $("#link-label").remove();
        $($this).append(linkControl.getTextLabelHtml());
        $($this).append(linkControl.getUrlLableHtml());
        $($this).append(linkControl.getMethodTypeHtml());

        var val = $(".hasFocus2").text();
        var label = $(".hasFocus2").parent().prev().find('srtong').text();
        var url = $(".hasFocus2").attr('ref-href');
        var type = $(".hasFocus2").attr('ref-type');

        $("#link-textLabel").val(label);
        $("#link-textValue").val(val);
        $("#link-urlInput").val(url);
        $("#linkmethodtype").val(type);
    } else {
        $("#link-label").remove();
        $("#link-url").remove();
        $("#methodType").remove();
    }
};




LinkControl.prototype.getTextLabelHtml = function () {
    var var0 = [];
    var0.push('<div class="row" id="link-label">');
    var0.push(  '<div class="prop-mg-lr col-md-12">');
    var0.push(      '<div class="form-group-prop">');
    var0.push(          '<label class="label_property">文本名</label>');
    var0.push(          '<div class="controls">');
    var0.push(              '<input type="text" id="link-textLabel" onkeyup="linkControl.changeLabelText(this)" data-gv-property="sublabel" class="form-control" placeholder="Label">');
    var0.push(              '<input type="text" id="link-textValue" onkeyup="linkControl.changeLinkText(this)" data-gv-property="sublabel" class="form-control" placeholder="Label" style="margin-top:10px;">');
    var0.push(          '</div>');
    var0.push(      '</div>');
    var0.push(  '</div>');
    var0.push('</div>');
    return var0.join('');
};

LinkControl.prototype.getMethodTypeHtml = function () {

    var var0 = [];
    var0.push('<div id="methodType" class="prop-mg-lr col-md-12">');
    var0.push(  '<div class="form-group-prop">');
    var0.push(      '<label class="label_property">跳转方式</label>');
    var0.push(      '<div class="controls">');
    var0.push(          '<select id="linkmethodtype" onchange="linkControl.setLinkType(this)"  class="form-control">');
    var0.push(              '<option value=""></option><option value="1">本页面跳转</option><option value="2">弹出新页面</option>	');
    var0.push(          '</select>');
    var0.push('</div>');
    var0.push('</div>');
    var0.push('</div>');
    var0.push('');
    return var0.join('');
};






LinkControl.prototype.getUrlLableHtml = function () {
    var var0 = [];
    var0.push('<div class="row" id="link-url">');
    var0.push(  '<div class="prop-mg-lr col-md-12">');
    var0.push(      '<div class="form-group-prop">');
    var0.push(          '<label class="label_property">链接地址</label>');
    var0.push(          '<div class="controls">');
    var0.push(              '<input type="text" onkeyup="linkControl.changeLinkUrl(this)" id="link-urlInput" data-gv-property="sublabel" class="form-control" placeholder="Label">');
    var0.push(          '</div>');
    var0.push(      '</div>');
    var0.push(  '</div>');
    var0.push('</div>');
    return var0.join('');
};


LinkControl.prototype.setLinkType = function ($this) {
    var val = $($this).find("option:selected").val();
    $(".hasFocus2").attr("ref-type",val);
};
LinkControl.prototype.changeLinkUrl = function ($this) {
    $(".hasFocus2").attr("ref-href",$($this).val());
};

LinkControl.prototype.changeLabelText = function ($this) {
    $(".hasFocus2").parent().prev('label').find('srtong').text($($this).val());
};

LinkControl.prototype.changeLinkText = function ($this) {
    $(".hasFocus2").text($($this).val());
};




