var s;//是否控件类拖拽
var cid;//拖拽控件ID

	/**
	 * 开始 - 树目录结构参数设置
	 */
	var setting = {
			data: {
				simpleData: {
					enable: true
				}
			}
		};

	var zNodes =[
		{ id:1, pId:0, name:"父节点1 - 展开", open:true},
		{ id:11, pId:1, name:"父节点11 - 折叠"},
		{ id:111, pId:11, name:"叶子节点111"},
		{ id:112, pId:11, name:"叶子节点112"},
		{ id:113, pId:11, name:"叶子节点113"},
		{ id:114, pId:11, name:"叶子节点114"},
		{ id:12, pId:1, name:"父节点12 - 折叠"},
		{ id:121, pId:12, name:"叶子节点121"},
		{ id:122, pId:12, name:"叶子节点122"},
		{ id:123, pId:12, name:"叶子节点123"},
		{ id:124, pId:12, name:"叶子节点124"},
		{ id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
		{ id:2, pId:0, name:"父节点2 - 折叠"},
		{ id:21, pId:2, name:"父节点21 - 展开", open:true},
		{ id:211, pId:21, name:"叶子节点211"},
		{ id:212, pId:21, name:"叶子节点212"},
		{ id:213, pId:21, name:"叶子节点213"},
		{ id:214, pId:21, name:"叶子节点214"},
		{ id:22, pId:2, name:"父节点22 - 折叠"},
		{ id:221, pId:22, name:"叶子节点221"},
		{ id:222, pId:22, name:"叶子节点222"},
		{ id:223, pId:22, name:"叶子节点223"},
		{ id:224, pId:22, name:"叶子节点224"},
		{ id:23, pId:2, name:"父节点23 - 折叠"},
		{ id:231, pId:23, name:"叶子节点231"},
		{ id:232, pId:23, name:"叶子节点232"},
		{ id:233, pId:23, name:"叶子节点233"},
		{ id:234, pId:23, name:"叶子节点234"},
		{ id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
	];
	/**
	 * 结束 - 树目录结构参数设置
	 */
	
$(function() {

	/**
	 * 表单设置器面板拖拽排序
	 */
	$("#design-canvas,#design-canvas .gv-droppable-grid").sortable({
		revert : true,
		stop : function(event, ui) {//每次容器类拖拽到面板都需要重新初始化
			stopEvent(event, ui);
		}
	});
	/**
	 * 控件类类拖拽拖拽
	 */
	$(".formControl").draggable({
		connectToSortable : ".gv-droppable-grid",
		cursor : "move",
		helper : "clone",
		start  : function(){
			s=!0;
			cid=$(this).attr("id");
		}
	});
	
	/**
	 * 容器类类拖拽拖拽
	 */
	$(".formContainer").draggable({
		connectToSortable : "#design-canvas,.gv-droppable-grid",
		cursor : "move",
		helper : "clone",
		start  : function(){
			s=!0;
			cid=$(this).attr("id");
		}
	});
	
	/**
	 * 预览表单
	 * @param 
	 * @param 
	 * @param 
	 */
	$("#preview").click(function(){
		//获取表单ID:design-canvas内容
		var previewModalContent = $("#design-canvas").clone();
		$('#previewModalBody').html(previewModalContent);
		$('#previewModalBody').find(".gv-droppable-grid").css("border","none");
		$('#previewModal').modal('show');
		FormPageConfig.commSetPageButtonAndDisplayMethodFun();
	});

});

/**
 * 拖拽排序初始化
 * @param element 拖拽控件
 */
function containersortable(element) {
	//是否是容器类拖拽
	var $this = $(element).find(".gv-droppable-grid");
	if ($this.length > 0) {
		$this.each(function(n,i) {
			$(i).sortable({
				revert : true,
				stop : function(event, ui) {
					stopEvent(event, ui)
				}
			});

		});

	}
}

/**
 * 计算拖拽次数
 */
function getCount(){
	//获得目前总数
	var i=$("#design-canvas").attr("data-control-count");
    return i 
}

/**
 * 次数赋值
 * @param i 模块数
 */
function setCount(i){
	$("#design-canvas").attr("data-control-count", i);
}

/**
 * 次数赋值
 * @param i 次数
 */
function total(i){
	//获得目前总数
	var n=$("#design-canvas").attr("data-control-count");
	$("#design-canvas").attr("data-control-count", parseInt(n)+i)
}

/**
 * 处理控件
 * @param event
 * @param ui
 */
function stopEvent(event, ui){
	if (s == !0){
        switch (cid){
            case "menu1Column":
			case "controlGroup":
            case "menu2Columns":
            case "menu3Columns":
            case "menu4Columns":
            case "twoandten":
                dealColumn(event, ui, cid);
                total(1);
                break;
            case "_collapsible":
                dealCollapse(event, ui,cid);
                total(1);
                break;
            case "_tab":
            	dealTab(event, ui,cid);
            	total(3);
            	break;
            case "_panel":
            	dealPanel(event, ui,cid);
            	total(1);
            	break;        	
            default:
            	dealControl(event, ui,cid);
                total(1);
                break;
        }
        cid = null;
        s = !1;
    } 
}

/**
 * 放回拖拽容器类的HTML
 * @param controlId 容器ID
 * @returns
 */
function tab(controlId){
	switch (controlId){
        //1行
		case "controlGroup":
			return '<div class="row page-row" style="margin-left: 0px; margin-right: 0px;"><h3 class="pageTeamH3 text-red">控件块</h3><div class="col-md-12 gv-droppable-grid" ref="pageTeam" style="border-left: 0px; border-right: 0px;"></div></div>';
        case "menu1Column":
			var var9 = [];
			var9.push('<div style="padding: 0px; margin: 0px;">');
			var9.push(	'<div class="col-md-12 gv-droppable-grid formControlGroup" style="border-left: 0px; border-right: 0px; padding-left: 0px; padding-right: 0px; z-index: 999;" ref="fcgflag"></div>');

			var9.push(	'<div class="form-group form-group-sm" data-control-type="control-groupbtn" data-role-flag="group">');
			var9.push(		'<label ref="col-md-3" class="control-label control-label-left col-md-3" >button</label>');
			var9.push(		'<div ref="col-md-9" class="controls col-md-9 form-button" data-role="button" data-role-flag="group">');
			var9.push(			'<button id="button4" type="button" class="btn btn-default form-button" data-role="button" data-role-flag="group">Button</button>');
			var9.push(		'</div>');

			var9.push(	'</div>');
			var9.push('</div>');
			return var9.join('');
        //2行
        case "menu2Columns":
            return '<div class="row" style="display: inline;"><div class="col-md-6 gv-droppable-grid" style="border-left: 0px;"></div><div class="col-md-6 gv-droppable-grid" style="border-right: 0px;"></div></div>';
        //3行
        case "menu3Columns":
            return '<div class="row" style="display: inline;"><div class="col-md-4 gv-droppable-grid"></div><div class="col-md-4 gv-droppable-grid"></div><div class="col-md-4 gv-droppable-grid"></div></div>';
        //4行
        case "menu4Columns":
            return '<div class="row" style="display: inline;"><div class="col-md-3 gv-droppable-grid"></div><div class="col-md-3 gv-droppable-grid"></div><div class="col-md-3 gv-droppable-grid"></div><div class="col-md-3 gv-droppable-grid"></div></div>';
        //2-10网格
        case "twoandten":
            return '<div class="row" style="display: inline;"><div class="col-md-2 gv-droppable-grid formControlGroup"></div><div class="col-md-10 gv-droppable-grid"  ref="fcgflag"></div></div>';
        //tab
        case "_tab":
            return '<div class="row" style="display: inline;"><div class="row gv-container" id="tabTemplate" data-role="tab"><ul class="nav nav-tabs"><li class="active"><a href="#tab1" data-toggle="tab">Tab 1</a></li><li><a href="#tab2" data-toggle="tab" >Tab 2</a></li><li><a href="#tab3" data-toggle="tab">Tab 3</a></li></ul><div class="tab-content"><div class="tab-pane active" id="tab1"><div class="tab-canvas gv-droppable-grid"></div></div><div class="tab-pane" id="tab2"><div class="tab-canvas gv-droppable-grid"></div></div><div class="tab-pane" id="tab3"><div class="tab-canvas gv-droppable-grid"></div></div></div></div></div>';
        //collapse
        case "_collapsible":
            return '<div class="row" id="collapseTemplate"><div class="panel-group"><div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#collapseTemplate">Collapse</a></h4></div><div class="panel-collapse collapse in"><div class="panel-body tab-canvas gv-droppable-grid"></div></div></div></div></div>';
        //panel
        case "_panel":
            return '<div class="row" id="panelTemplate"><div class="panel panel-default" data-role="panel"><div class="panel-heading">Panel</div><div class="panel-body tab-canvas gv-droppable-grid"></div></div></div>'; 
        //text
        case "_TextTemplate":
        case "_NumericTemplate":
            return '<div data-control-type="text" class="form-group form-group-sm"><label ref="col-md-3" class="control-label control-label-left col-md-3"><span class="supText1" style="">*</span><srtong>input</srtong></label><div ref="col-md-9" class="controls col-md-9" data-role="text"><div class="input-group" style="width: 100%;"><input class="form-control" data-role="text" type="text" required valid-writeLength="30"><span style="display:none" class="input-group-addon unit item3input-span"></span></div></div></div>';
        //Select
        case "_SelectTemplate":
            return '<div class="form-group form-group-sm" data-control-type="select"><label  ref="col-md-3" class="control-label control-label-left col-md-3 "><span class="supText1" style="display:none">*</span><srtong>select</srtong></label><div ref="col-md-9" class="controls col-md-9 " data-role="select"><select class="form-control selectOption" data-role="select" ref="select"><option value=""></option></select></div></div>';
        //CheckBox
        case "_CheckBoxTemplate":

            return '<div class="form-group form-group-sm" data-control-type="checkbox"><label ref="col-md-3" class="control-label control-label-left col-md-3 cbinput_label"><span class="supText1" style="">*</span><srtong>CheckBox</srtong></label><div ref="col-md-9" class="controls col-md-9 cbinput" data-role="checkbox"><div class="checkbox" ref="checkbox" ><label><input value=""  type="checkbox" required> <span>Checkbox </span></label></div></div></div>';

        //Radio
        case "_RadioTemplate":

            return '<div class="form-group form-group-sm" data-control-type="radio"><label ref="col-md-3" class="control-label control-label-left col-md-3 cbinput_label"><span class="supText1" style="">*</span><srtong>Radio</srtong></label><div ref="col-md-9" class="controls col-md-9 cbinput"  data-role="radio"><div class="radio" ref="radio" ><label><input   type="radio" name="optionsRadios" id="optionsRadios1" value="option1" required><span>Radio1</span></label></div></div></div>';

        //Date
        case "_DateTemplate":
            return '<div class="form-group form-group-sm" data-control-type="date"><label ref="col-md-3" class="control-label control-label-left col-md-3"><span class="supText1" style="display:none">*</span><srtong>Date</srtong></label><div ref="col-md-9" class="controls col-md-9"><input class="form-control" size="16" type="text" readonly="readonly" data-role="date" format="yyyy-mm-dd" style="background: #fff;" required> </div></div>';
        case "_DateTimeTemplate":
        	return '<div class="form-group form-group-sm" data-control-type="datetime"><label ref="col-md-3" class="control-label control-label-left col-md-3"><span class="supText1" style="">*</span><srtong>DateTime</srtong></label><div ref="col-md-9" class="input-group date form_datetime col-md-9"><input class="form-control" size="16" type="text"  data-role="datetime" ><span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span><span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span></div></div>';
        case "_TimeTemplate":
        	return '<div class="form-group form-group-sm" data-control-type="time"><label ref="col-md-3" class="control-label control-label-left col-md-3"><span class="supText1" style="">*</span><srtong>Time</srtong></label><div ref="col-md-9" class="input-group date form_time col-md-9"><input class="form-control" size="16" type="text" data-role="time" ><span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span><span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span></div></div>';
        //Mask
        case "_MaskTemplate":
            return '<div class="form-group form-group-sm" data-control-type="mask"><label ref="col-md-3" class="control-label control-label-left col-md-3" ><span class="supText1" style="">*</span><srtong>Mask</srtong></label><div ref="col-md-9" class="controls col-md-9"><input  type="text" class="form-control k-textbox" data-role="mask"></div></div>';
        //TextArea
        case "_TextAreaTemplate":
            return '<div class="form-group form-group-sm" data-control-type="textarea"><label ref="col-md-3" class="control-label control-label-left col-md-3"><span class="supText1" style="">*</span><srtong>TextArea</srtong></label><div ref="col-md-9" class="controls col-md-9"><textarea rows="3" class="form-control k-textbox" data-role="textarea" required valid-writeLength="200"></textarea></div></div>';
        //Pills
        case "_PillsTemplate":
            return '<div class="form-group form-group-sm" data-control-type="pills"><ul class="nav nav-pills nav-stacked"><li><a>Nav 1</a></li><li><a>Nav 2</a></li><li><a>Nav 3</a></li></ul></div>';
        //Button
        case "_Button":

            return '<div class="form-group form-group-sm" data-control-type="button"><label ref="col-md-3" class="control-label control-label-left col-md-3" >button</label><div ref="col-md-9" class="controls col-md-9 form-button" data-role="button"><button id="" type="button" class="btn btn-default form-button" data-role="button">Button</button></div></div>';

        //Header
        case "_HeaderTemplate":

            return '<div class="form-group form-group-sm" data-control-type="upload"><label ref="col-md-3" class="control-label control-label-left col-md-3"  style="white-space: nowrap;"><span class="supText1" style="display:none">*</span><srtong>文件上传</srtong></label><div class="col-md-9 controls"><div id="fileQueue_0" class="fileupload fileupload-new form-control" data-role="upload"><input type="file"    id="uploadify_0" style="border: 0; margin-top: -1px; height: 24px; padding: 0px; margin-left: -7px; width: 65px;" /></div></div></div>';

          //Header
        case "_ParagraphTemplate":
            return '<div class="form-group form-group-sm" data-control-type="paragraph"><p>在这里写上一段话.</p></div>';
            //_PictureTemplate
        case "_PictureTemplate":
            return '<div class="col-md-2 text-center"><img src="" style="width: 90px; height: 90px; display: block; border: 1px solid #eee; margin: 0 auto 5px;"><input type="file" id="uploadify_0" style="border: 0; margin: 0 auto; height: 24px; padding: 0px; width: 73px;"></div>';
            //text
        case "_LookupTemplate":
            return '<div data-control-type="lookup-group" class="form-group">' 
            + '<div class="controls col-sm-1"><label class="control-label control-label-left">姓名</label></div>' 
            + '<div class="controls col-sm-2"><input class="form-control k-textbox" data-role="text" type="text" placeholder="搜索条件"></div>'
            + '<div class="controls col-sm-1"><label class="control-label control-label-left">性别</label></div>' 
            + '<div class="controls col-sm-2"><input class="form-control k-textbox" data-role="text" type="text" placeholder="搜索条件"></div>'
            + '<div class="controls col-sm-1"><label class="control-label control-label-left">电话</label></div>' 
            + '<div class="controls col-sm-2"><input class="form-control k-textbox" data-role="text" type="text" placeholder="搜索条件"></div>'
            + '<div class="controls col-sm-1"><button type="button" class="btn btn-default">搜索</button></div>' 
            + '<div class="controls col-sm-2"></div>'
            + '</div>';
            //text
        case "_DataTableTemplate":
			var var0 = [];
			/*var0.push('<div class="box box-primary">');
			var0.push(	'<div class="box-header with-border">');
			var0.push(		'<h3 class="box-title">搜索功能</h3>');
			var0.push(		'<div class="box-tools pull-right">');
			var0.push(			'<button type="button" class="btn btn-primary btn-sm" onclick="search()"><i class="fa fa-search"></i> 搜索</button>');
			var0.push(		'</div>');
			var0.push(	'</div>');
			var0.push(	'<div class="box-body">');
			var0.push(		'<form id="searchForm" style="min-height:50px;">');
			var0.push(			'<div class=row style="min-height:50px;"></div>');
			var0.push(		'</form>');
			var0.push(	'</div>');
			var0.push('</div>');*/

			var0.push('<div data-control-type="datatable-group"  class="form-group ">');
			var0.push('<div id="tableContent" class="box box-primary form-button" data-role="datatable-group" style="margin-bottom: 0px;">');
			var0.push(	'<div class="box-header with-border">');
			var0.push(	'<h3 class="box-title" style=" line-height: 30px;"><span id="tableTitle">表格标题</span></h3>');
			//var0.push(	'<div class="pull-right">');
			//var0.push(		'<button id="addBtn" type="button" class="btn btn-primary btn-sm" style="margin-top:5px;"><i class="fa fa-plus"></i> 新增</button>');
			//var0.push(	'</div>');
			var0.push('</div>');

			var0.push(	'<div class="box-body">');
			var0.push(		'<table id="worktable" class="table table-hover table-striped" data-tableName="">');
			var0.push(			'<thead><tr></tr></thead>');
			var0.push(		'</table>');
			var0.push(	'</div>');
			var0.push(	'</div>');
			var0.push(	'</div>');
			return var0.join('');

		//超链接
		case "_linkTemplate":

			var var11 = [];
			var11.push('<div class="form-group form-group-sm" data-control-type="link">');
			var11.push('<label ref="col-md-3" class="control-label control-label-left col-md-3"><span class="supText1" style="display:none">*</span><srtong>超链接</srtong></label>');
			var11.push('<div ref="col-md-9" class="controls col-md-9 " data-role="link"><a class="cbinput" data-role="link" style="font-size: 12px;" href="#">这里是超链接</a></div></div>');
			return var11.join('');

			//选人框
	        case "_UserBoxTemplate":
	            return '<div class="form-group form-group-sm" data-control-type="userbox">'
	            	  +' 	<label ref="col-md-3" class="col-md-3 control-label"><span class="supText1" style="display:none">*</span><srtong>users</srtong></label>'
	            	  +' 	<div ref="col-md-9" class="col-md-9 controls ">'
	            	  +'		<div class="input-group userboxdiv" style="width: 100%;" >'
            	      +' 			<input type="text" chooseUserBoxConfigType="1" usertable="yonghubiao" usertablecolumn="username" usertablerole="jiaosebiao" usertablecolumnrole="name" usertableorg="bumenbiao" usertablecolumnorg="name" valid-writeLength="255" id="data19" data-role="userbox" value="" class="form-control input-sm prohibitInput" placeholder="">'
            	      +' 			<span class="input-group-addon" style="background: #286090;cursor: pointer;"><i style="color: #fff;" class="fa fa-user"></i></span>'
            	      +'		</div>'
            	      +'	</div>'
	            	  +'</div>';






           /* return '<div data-control-type="datatable-group" class="form-group">'
            + '<div class="row">'
            + '<div class="controls col-sm-6"><button type="button" class="btn btn-primary">新建</button> <button type="button" class="btn btn-success">删除</button> <button type="button" class="btn btn-warning">刷新</button></div>'
            + '<div class="controls col-sm-6"></div>'
            + '</div>'
            + '<div class="row">'
            + '<div class="controls col-sm-2"><label>姓名</label></div>'
            + '<div class="controls col-sm-2"><label>性别</label></div>'
            + '<div class="controls col-sm-2"><label>民族</label></div>'
            + '<div class="controls col-sm-2"><label>出生日期</label></div>'
            + '<div class="controls col-sm-2"><label>电子邮箱</label></div>'
            + '<div class="controls col-sm-2"><span class="glyphicon glyphicon-plus-sign"></span> <span class="glyphicon glyphicon-remove-sign"></span></div>'
            + '</div>'
            + '<div class="row">'
            + '<div class="controls col-sm-2"><input class="form-control k-textbox" data-role="text" type="text" placeholder="定义字段"></div>'
            + '<div class="controls col-sm-2"><input class="form-control k-textbox" data-role="text" type="text" placeholder="定义字段"></div>'
            + '<div class="controls col-sm-2"><input class="form-control k-textbox" data-role="text" type="text" placeholder="定义字段"></div>'
            + '<div class="controls col-sm-2"><input class="form-control k-textbox" data-role="text" type="text" placeholder="定义字段"></div>'
            + '<div class="controls col-sm-2"><input class="form-control k-textbox" data-role="text" type="text" placeholder="定义字段"></div>'
            + '<div class="controls col-sm-2"><span class="glyphicon glyphicon-plus-sign"></span> <span class="glyphicon glyphicon-remove-sign"></span></div>'
            + '</div>'
            + '<div class="row">'
            + '<div class="controls col-sm-12"><ul class="pagination"><li><a href="#">&laquo;</a></li><li><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#">&raquo;</a></li></ul></div>'
            + '</div>'
            + '</div>';*/
        case "_DataTreeTemplate":
            return '<div data-control-type="datatable-group" class="form-group">'  
            + '<div class="controls col-sm-2">	<div class="zTreeDemoBackground left"><ul class="ztree"></ul></div>'
            + '</div>';
        default:
        	break;
    }
}

function dealControl(event, ui, cid) {
	switch (cid) {
	// text
	case "_TextTemplate":
	case "_MaskTemplate":
		return dealText(event, ui, cid);
	// Select
	case "_SelectTemplate":
		return dealSelect(event, ui, cid);
	case "_CheckBoxTemplate":
		return dealCheckBox(event, ui, cid);
	// Radio
	case "_RadioTemplate":
		return dealRadio(event, ui, cid);
	// Numeric
	case "_NumericTemplate":
		return dealText(event, ui, cid);
	// Date
	case "_DateTemplate":
		return dealData(event, ui, cid,1);
	// Time
	case "_TimeTemplate":
		return dealData(event, ui, cid,2);
	// DateTime
	case "_DateTimeTemplate":
		return dealData(event, ui, cid,3);
	// TextArea
	case "_TextAreaTemplate":
		return dealTextArea(event, ui, cid);
	// Pills
	case "_PillsTemplate":
		return dealPills(event, ui, cid);
	// Button
	case "_Button":
		return dealButton(event, ui, cid);
	// Header
	case "_HeaderTemplate":
		return dealHeader(event, ui, cid);
		// Header
	case "_ParagraphTemplate":
		return dealParagraph(event, ui, cid);
		// Search Group
	case "_LookupTemplate":
		return dealLook(event, ui, cid);
		// Data Table Group
	case "_DataTableTemplate":
		return dealDataTable(event, ui, cid);
	case "_DataTreeTemplate":
		return dealDataTreeTable(event, ui, cid);	
	case "_PictureTemplate":
		return pictureTemplate(event, ui, cid);
	case "_UserBoxTemplate":
	case "_linkTemplate":
		return userBoxTemplate(event, ui, cid);
	default:
		break;
	}
}

/**
 * 处理行列容器
 * 
 * @param event
 *            事件源
 * @param ui
 *            拖拽控件
 * @param cid
 *            容器类ID
 */
function dealColumn(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	if(cid=="menu1Column"){
		$u.find(".gv-droppable-grid:eq(0),button").attr("refType",sysfunctionId+"_"+$(".gv-droppable-grid[ref=fcgflag]").length);
	}
	if(cid=="controlGroup"){
		$u.find(".gv-droppable-grid:eq(0),button").attr("refid",sysfunctionId+"_"+$(".gv-droppable-grid[refid]").length);
	}
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}

/**
 * 处理Collapse容器
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealCollapse(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	    count=parseInt(count);
	//Collapse ID赋值
	var id="collapse"+count;
	$u.attr("id",id);
	var $a=$u.find(".panel-title:first>a");
	$a.attr("data-parent","#"+id);
	
	var child=id+"accordion"+count;
	$u.find(".panel-collapse:first").attr("id",child);
	$a.attr("href","#"+child);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}

/**
 * 处理Panel容器
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealPanel(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	    count=parseInt(count);
	//Collapse ID赋值
	$u.attr("id","panel"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}

/**
 * 处理Tab容器
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealTab(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	    count=parseInt(count);
	//Tab ID赋值
	$u.attr("id","tab"+count);
	$u.find(".tab-content > .tab-pane").each(function(n){
		var id="tabContent" + count;
        $(this).attr("id", id);
        $u.find("li:eq(" + n + ") a").attr("href", "#tabContent" +count).attr("id", "tabLabel"+count);
        count++;
    });
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}

/**
 * 处理Input控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealText(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	//INPUT ID赋值
	$u.find("input:eq(0)").attr("id","field"+count);
	$u.find("label:eq(0)").attr("for","field"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}

/**
 * 处理Select控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealSelect(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	//Select ID赋值
	$u.find("select:eq(0)").attr("id","select"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}

/**
 * 处理Radio控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealRadio(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	var radioName="radio"+count;
	$u.find("input").each(function(n){
		var id=radioName+n;
		var $this=$(this);
        $this.attr("id", id);
        $this.attr("name", radioName);
        $this.parent().attr("for",id);
    });
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}

/**
 * 处理checkbox控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealCheckBox(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	var radioName="checkbox"+count;
	$u.find("input").each(function(n){
		var id=radioName+n;
		var $this=$(this);
        $this.attr("id", id);
        $this.attr("name", radioName);
        $this.parent().attr("for",id);
    });
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}

/**
 * 处理Header控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealHeader(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	//header ID赋值
	$u.find("p:eq(0)").attr("id","header"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}

/**
 * 处理textarea控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealTextArea(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	//textarea ID赋值
	$u.find("textarea:eq(0)").attr("id","textarea"+count);
	$u.find("label:eq(0)").attr("for","textarea"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}

/**
 * 处理Button控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealButton(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	//Button ID赋值
	$u.find("button:eq(0)").attr("id","button"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}
/**
 * 处理段落容器
 * 
 * @param event
 *            事件源
 * @param ui
 *            拖拽控件
 * @param cid
 *            容器类ID
 */
function dealParagraph(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//替换拖拽HTML
	$this.replaceWith($u);
}
/**
 * 处理Pills控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealPills(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	var spanName="span"+count;
	$u.find("ul").attr("id",spanName);
	$u.find("li").each(function(n){
		var id=spanName+n;
		var $ts=$(this);
        $ts.attr("id", id);
    });
	//替换拖拽HTML
	$this.replaceWith($u);
}

/**
 * 处理搜索控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealLook(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	//INPUT ID赋值
	$u.find("input:eq(0)").attr("id","field"+count);
	$u.find("label:eq(0)").attr("for","field"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	//containersortable($u);
}

/**
 * 处理数据表单控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealDataTable(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	//INPUT ID赋值
	$u.find("input:eq(0)").attr("id","field"+count);
	$u.find("label:eq(0)").attr("for","field"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}

/**
 * 处理树结构目录控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function dealDataTreeTable(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	//INPUT ID赋值
	$u.find("input:eq(0)").attr("id","field"+count);
	$u.find("label:eq(0)").attr("for","field"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
	$.fn.zTree.init($u.find(".ztree"), setting, zNodes);
}

/**
 * 处理数据表单控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 * @param type   1日期2时间3日期时间
 */
function dealData(event, ui, cid,type){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	//INPUT ID赋值
	$u.find("input:eq(0)").attr("id","data"+count);
	$u.find("label:eq(0)").attr("for","data"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
	if(type==1){// 1日期2时间3日期时间
		dateformat($($u).find(".form_date "));
	}else if(type==2){
		timeformat($($u).find(".form_time "));
	}else if(type==3){
		datetimeformat($($u).find(".form_datetime "));
	}else{
		
	}
}
/**
 * 处理图片控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function pictureTemplate(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	//header ID赋值
	$u.find("p:eq(0)").attr("id","picture"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}
/**
 * 处理选人控件
 * @param event  事件源
 * @param ui     拖拽控件
 * @param cid    容器类ID
 */
function userBoxTemplate(event, ui, cid){
	var $this=$(ui.item.context);
	var $u=$(tab(cid));
	//画板控件总数
	var count=getCount();
	//header ID赋值
	$u.find("p:eq(0)").attr("id","picture"+count);
	//替换拖拽HTML
	$this.replaceWith($u);
	containersortable($u);
}
/**
 * 删除选定物件
 * @param 
 * @param 
 * @param 
 */
$("#removeMenu").click(function(){
	$.ajax({
		type:"post",
		url:basePath+"/sysFunction/update.htm",
		data:{"id":sysfunctionId,"templetName":"templetName","content":""},
		dataType:"json",
		success:function(data){
			if(data.status){
				alert("保存成功");
				window.location.href=basePath+"/index-shop.jsp";
			}else{
				alert(data.message);
			}
		}
	});
});

function del(){
	var $e=$(".hasFocus");
	if($e.attr("data-role-flag")=="group"){
		$e.parent().remove();
		return;
	}
	if($e.hasClass("form-group")){//控件
		$e.remove();
		
	}else{//容器
		var $row=$e.parents(".row");
		if($row.length>0){
			$row.eq(0).remove();
		}
	}
	
	
}

//保存聊天记录到本地 
function save_record() 
{ 
//取得当前日期作为文件名 
var time=new Date(); 
var filename=time.toLocaleDateString(); 
//获取当前页面部分内容 
//record = "Test 123456789";
//alert("record: " + record);
//打开新窗口保存 
var winRecord=window.open('about:blank','_blank','top=500'); 
winRecord.document.open("text/html","utf-8"); 
winRecord.document.write("<html><style>body,ul,li{margin:0px; padding:0px;list-style:none; font-size:12px;}</style><body>"+record+"</body></html>"); 
winRecord.document.execCommand("SaveAs", true, filename+".html"); 
winRecord.close(); 
}