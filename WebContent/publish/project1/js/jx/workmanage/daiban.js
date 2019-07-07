var dt=undefined,href;
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
            url: basePath+'/myWork/waitWorking.htm',
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
			{ "data": "createTime","mRender": function(data,type,full){
				var html='到达：'+data;
				if(full.receiveTime!=""&&full.receiveTime!=null){
					html+='<br>接收：'+full.receiveTime;
				}
				return html;
			}},
			{ "data": "createTime","mRender": function(data,type,full){
				return stopTime(data,full.receiveTime,full.endTime);
			}},
			{ "data": "createUserName"},
			{ "data": "stepState"},
			{ "data": "id","mRender": function(data,type,full){
				return '<div class="action-buttons"><a class="btn btn-primary btn-xs btn-flat" onclick="todo(\''+data+'\',\''+full.taskId+"\',\'"+full.receiveTime+'\',\'1\')")" title="主办">主办</a>'
				+'<a class="btn btn-primary btn-xs btn-flat" title="足迹" onclick="footPoint('+data+')">足迹</a></div>';
			}}
		] 
	} );
}

$(function(){
	href=window.location.href;
	//填充表单数据
	getTableData();
	//表單提交搜索
	$("#search").click(function(){
		//重画
		dt.fnDraw(true);  
	});  
    
});