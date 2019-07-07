/**
 * 全局AJAX开始请求
 */
/*$(document).ajaxStart(function(e){
	debugger;
});
*//**
 * 全局AJAX加载完成
 */
//$(document).ajaxComplete(function(event, XMLHttpRequest, ajaxOptions){closeMask();});
/**
 * 打开加载中
 */
/*function openMask(msg,selector){
	$(selector || "body").mask(msg || "页面正在加载中...");
}*/
/**
 * 关闭加载中
 */
/*function closeMask(selector){
	$(selector || "body").unmask();
}*/
/**
 * 获取项目的虚拟根目录
 */
(function(){
	var temp = "js/common.js", url = $("script[src$='" + temp + "']").attr("src");
	//根目录
	basePath = url ? url.replace(temp, "").replace(/\/+$/, "") : "";
	/**
	 * 序列化表单,过滤空值
	 * 返回JSON
	 */
	$.fn.serializeObject = function(o) {
		if (o == undefined) {
			o = {};
		}
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
			} else {
				var value=this.value;
				if(value!=""){
					o[this.name] = this.value;
				}
			}
		});
		return o;
	};
})();



function setHeight($array,number) {
	if(!!$array) {
		for(var i = 0;i<$array.length;i++) {
			$("#"+$array[i]).css("height",$(window).height() - number);

			$(window).resize(function() {
				$("#"+$array[i]).css("height",$(window).height() - number );
			});
		}
	}
}