function datepicker(elementId,options){
	 $.extend(options,{
		    language:  'zh-CN',
	        weekStart: 1,
	        todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			forceParse: 0
	    
	 });
	$(elementId).datetimepicker(options);
}

/**
 * 日期
 * @param elementId
 */
function dateformat(elementId){
	datepicker(elementId,{
		format: "yyyy-mm-dd",
		startView: 2,
		minView: 2
	});
}
/**
 * 日期 时间
 * @param elementId
 */
function datetimeformat(elementId){
	datepicker(elementId,{
		format: "yyyy-mm-dd HH:ii",
		startView: 2,
		showMeridian: 1
	});
}
/**
 * 时间
 * @param elementId
 */
function timeformat(elementId){
	datepicker(elementId,{
		format: "HH:ii",
		startView: 1,
		minView: 0,
		maxView: 1
	});
}