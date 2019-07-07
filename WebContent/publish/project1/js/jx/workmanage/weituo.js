var dt=undefined;
/**
 * 填充表单数据
 */
function getTableData(){
	dt=$('#dataTable').dataTable( {	
		paging: true,
		lengthChange: false,
        searching: false,
		processing: true,
		serverSide: true,
		oLanguage: {
        	sInfo: "总共：_TOTAL_ 条",
		},
		autoWidth: false,
		bSort:false,
		scrollX: true,
		ajax:{  
            url: basePath+'/myWork/selectEntrust.htm',
            type:"POST",
            dataSrc: "aaData",
            data: function ( d ) {
            	var param={};
            	param.startRow=d.start;
            	param.limit=d.length;
                //添加额外的参数传给服务器  
                $("#searchForm").serializeObject(param);
                return param;
            }
        },
		columns: [
			{ "data": "id"},
			{ "data": "name"},
			{ "data": "stepName"},
			{ "data": "createTime"},
			{ "data": "createUserName"},
			{ "data": "stepState"},
			{ "data": "id","mRender": function(data,type,full){
				var html='<div class="action-buttons">';
				if(loginUserId==full.taskOwner&&full.receiveTime==""){
					html+='<a class="btn btn-primary btn-xs btn-flat" title="撤消委托" onclick="backEntrust('+data+',this)">撤消委托</i></a>';
				}	
				html+='<a class="btn btn-primary btn-xs btn-flat" onclick="detail(\''+data+'\',\''+full.taskId+'\',\'1\')" title="详情">详情</a>'
				    +'<a class="btn btn-primary btn-xs btn-flat" title="足迹" onclick="footPoint('+data+')">足迹</a></div>';
				return html;
			}}
		] 
	} );
}
$(function(){
	//填充表单数据
	getTableData();
	//表單提交搜索
	$("#search").click(function(){
		//重画
		dt.fnDraw(true);  
	});  
    
});