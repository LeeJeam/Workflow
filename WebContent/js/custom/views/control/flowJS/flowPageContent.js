var FlowPageContent = function () {
	
};

var flowPageContent = new FlowPageContent();

/**
 * 加载流程表单项
 * @param formTitle
 * @param itemId
 */
FlowPageContent.prototype.formItem = function (formTitle,itemId){
	var content="";
	content+='<div  id="'+itemId+'">'
			+'	<div class="box box-primary box-solid">'
			+'	    <div class="box-header with-border">'
			+'	        <h3 class="box-title excutetitle">'+formTitle+'</h3>'
			+'	        <div class="box-tools pull-right">'
			+'		        <button class="btn btn-box-tool msgList" data-widget="collapse">'
			+'		        	<i class="fa fa-minus"></i> '
			+'					<span class="hidden-xs">收展</span>'
			+'		        </button>'
			+'	        </div>'
			+'	        <div class="box-tools pull-right hidden-lg hidden-md hidden-sm">'
			+'	            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>'
			+'	        </div>'
			+'	    </div>'
			+'	    <div class="box-body">'
			+'	    </div>'
			+' </div>'
			+'</div>';
	return content;
}
/**
 * 左边菜单
 * @param formTitle
 * @param i
 * @returns {String}
 */
FlowPageContent.prototype.formMenuItem = function (formTitle,i){
	var content="";
	
	content+='<li title="'+formTitle+'">'
			+'	<a onclick="clickState(this,'+i+')" href="javascript: void(0);">'
			+'		<div class="number">'+i+'</div>'
			+'		<div class="time-text">'
			+'			<p>'+formTitle+'</p>'
			+'		</div>'
			+'	</a>'
			+'</li>'
	return content;
}

