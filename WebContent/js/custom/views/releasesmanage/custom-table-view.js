var params = {};
$(function() {
	init();// 加载左边属性内容
	loadData();
	$("#btnSubmit").bind("click",submit);
	$("#btnReset").bind("click",reset);
});

/**
 * 提交保存
 */
function submit(){
	var param=$("#add").serialize();
	var pagePYName=getQueryString("pagePYName");
	if(param!=""){
		param+="&tableName="+params.tableName+"&id="+params.id;
		$.ajax({
			type : "post",
			url : basePath + "/button/updateOrSave.htm",
			data : param,
			dataType : "json",
			success : function(data) {
				if (data.status) {
					alert("保存成功");
					if(pagePYName==""){
						alert("跳转页面为空");
					}else{
						window.location.href=basePath+"/pageToPage/index.htm?pagename="+pagePYName;
					}
				} else {
					alert(data.message);
				}
			}
		});
	}    
}

/**
 * 取消
 */
function reset(){
	var pagePYName=getQueryString("pagePYName");
	window.location.href=basePath+"/pageToPage/index.htm?pagename="+pagePYName;
}

/**
 * 地址栏参数解析
 * 
 * @param name
 *            参数名
 * @returns
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURIComponent(r[2]); // (r[2]);
	return "";
};

/**
 * 获得表名与主键
 */
function init() {
	var id = getQueryString("ti");
	params.id = id;
	params.tableName = $("#add").attr("table-name");
}
/**
 * 获取数据
 */
function loadData() {
	var id = params.id;
	var tableName = params.tableName;
	if (id != "" && tableName != "") {
		var eTableName = $('#iptEtableName').val();
		$.ajax({
			type : "post",
			url : basePath + "/button/getObject.htm",
			data : {
				"id" : id,
				"eTableName" : tableName
			},
			dataType : "json",
			success : function(data) {
				if (data.status) {
					for ( var prop in data.obj) {
						if (data.obj.hasOwnProperty(prop)) {
							$("[name='" + prop + "']").val(data.obj[prop]);
						}
					}
				} else {
					alert(data.message);
				}
			}
		});
	}
}