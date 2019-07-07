/***
 * jQuery自定义扩展
 */
jQuery.extend({
    /***
     * 判断是否定义
     * @param $this
     * @returns {boolean}
     */
    isDefined: function ($this) {
        if (typeof($this) == 'undefined' || $this == null || $this == '' || $this.length <= 0) {
            return false;
        }
        return true;
    },
    /***
     * 判断元素是否存在
     * @param $array
     * @param $value
     * @returns {boolean}
     */
    isExists: function ($array, $value) {
        if ($.isDefined($array) && $.isDefined($value)) {
            for (var i = 0; i < $array.length; i++) {
                if ($value == $array[i]) {
                    return true;
                }
            }
        }
        return false;
    },
    /***
     * 获取Ajax 回调 callback
     * @param url
     * @param params
     * @param callback
     */
    getAjaxData : function (url,params,callback,$this,global,async) {
    	var flag = ($.isDefined(global) && global=='false') ? false : true;
    	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain) 
    	{
    		url += "?"+commVariable;
    	}
        $.ajax({
            type: "post",
            url: url,
            data: params,
            global: flag,
            dataType: "json",
            async : !!async ? true : false,
            success: function (data) {
                if(!!callback) {
                    callback(data,$this);
                } else {
                    return data;
                }
            }
        });
    },
    getTree : function (url,data,selecter,fn,fn1,id){
    	if (typeof(isCrossDomain)!=undefined&&typeof(isCrossDomain)!="undefined"&&isCrossDomain) 
    	{
    		url += "?"+commVariable;
    	}
    $.ajax({
        type:"post",
        url:url,
        data:data,
        dataType:"json",
        success:function(data){
            /**
             * 开始 - 树目录结构参数设置
             */
            var setting = {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pId",
                        rootPId: ""
                    }
                },
                callback: {
                    onClick: fn

                }
            };
            $.fn.zTree.init($(selecter), setting, data);
            if(!!fn1 && !!id) {
                fn1(id);
            }
            if(!!fn1) {
                fn1();
            }
        }
    });
}
});