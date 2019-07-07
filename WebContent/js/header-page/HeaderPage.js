function HeaderPage() {
    isEdit = false;
};

var headerPage = new HeaderPage();
HeaderPage.prototype.isGiveUpEdit = function (url,click) {
    if(headerPage.isEdit) {
        if (confirm('此页面已做操作，是否要保存退出。')) {
            add();
            headerPage.forwardPage(click,url);
        } else {
            headerPage.forwardPage(click,url);
        }
    } else {
        headerPage.forwardPage(click,url);
    }
};

HeaderPage.prototype.forwardPage = function (click,url) {
    if(!!click) {
        eval(click);
    } else {
        window.location.href = url;
    }
};

HeaderPage.prototype.contentChangedEvent = function () {
    if($('#searchdiv').length > 0) {
        $('#searchdiv').bind('DOMNodeInserted', function(e) {
            headerPage.isEdit = true;
        });
        $('#searchdiv').bind('DOMNodeRemoved', function(e) {
            headerPage.isEdit = true;
        });

        $('#searchdiv').bind('DOMCharacterDataModified', function(e) {
            headerPage.isEdit = true;
        });
        $('#searchdiv').bind('DOMAttrModified', function(e) {
            headerPage.isEdit = true;
        });
        $('#searchdiv').bind('DOMSubtreeModified', function(e) {
            headerPage.isEdit = true;
        });
    }
    if($('#ctr').length > 0) {
        $('#ctr').bind('DOMNodeInserted', function(e) {
            headerPage.isEdit = true;
        });
        $('#ctr').bind('DOMNodeRemoved', function(e) {
            headerPage.isEdit = true;
        });
    }




};





HeaderPage.prototype.bindClickEvent = function () {
    $(".isEdit").find('a').each(function () {
        headerPage.loadBinkClickData(this);
    });
    $(".user-footer").find('a:eq(0)').each(function () {
        headerPage.loadBinkClickData(this);
    });
};

HeaderPage.prototype.loadBinkClickData = function ($this) {
    $($this).click(function () {
        var href   = $(this).attr('ref-href');
        var click  = $(this).attr('ref-onclick');
        headerPage.isGiveUpEdit(href,click);
    });
    var href = $($this).attr('href');
    if(!!href){
        $($this).removeAttr('href');
        $($this).attr("ref-href",href);
    }
    var onclick = $($this).attr('onclick');
    if(!!onclick) {
        $($this).removeAttr('onclick');
        $($this).attr("ref-onclick",onclick);
    }
};

$(function () {
    headerPage.bindClickEvent();
    headerPage.contentChangedEvent();
});


function OnAttrModified (event) {
    var txt = "";
    if (event.attrChange) {
        // Firefox, Safari, Opera
        txt += "The element: " + event.target;
        txt += "\nproperty: " + event.attrName;
        txt += "\noriginal value: " + event.prevValue;
        txt += "\n changed to: " + event.newValue;
    } else {
        // Internet Explorer
        txt += "The element: " + event.srcElement.tagName;
        txt += "\nproperty: " + event.propertyName;

        var elem = event.srcElement;
        txt += "\nchanged value: " + elem.attributes[event.propertyName].value;
    }
    alert (txt);
}