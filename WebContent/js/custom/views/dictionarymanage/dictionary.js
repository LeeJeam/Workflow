var dt=undefined,index=1;
/**
 * 查找表单数据
 */
function getdata(){
	$.ajax({
		type:"post",
		url:basePath+"/dictionary/selectAll.htm",
		dataType: 'json',
		success:function(data){
			index=1;
			if(null==data){
				if(dt!=undefined){
					dt.fnClearTable();
				}
			}else{
				if(dt==undefined){
					
						dt=$('#data_table').dataTable({
						    data: data,
						    paging: true,
							lengthChange: false,
					        searching: false,
							processing: true,
							oLanguage: {
					        	sInfo: "总共：_TOTAL_ 条",
							},
							autoWidth: false,
							bSort:false,
							scrollX: true,
						    columns: [
							    { data: 'id',"mRender": function(data,type,full){
				        			return index++;
							    }},
						        { data: 'name' },
						        { data: 'table_alias'},
						        { data: 'id',"mRender": function(data,type,full){
						        		return	'<div class="action-button"><button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#baseDemo" onclick="edit('+data+')">编辑</button>&nbsp;<button class="btn btn-primary btn-xs"  onclick="del(\''+data+'\')">删除</button></div>';
									}
						        	}
						    ]
						} );
					}else{
						dt.fnClearTable();
						if(data.length>0){
							dt.fnAddData(data, true); 
						}
					}
			}
			
		}
	});
}

/**
 * 删除表单数据
 */
 function del(id){
	 if(""!=id){
		 $.ajax({
			type:"post",
			url:basePath+"/dictionary/delete.htm",
			data:{"id":id},
			dataType: 'json',
			success:function(data){
				if(data.status){
					getdata();
					alert(data.message);
				}else{
					alert(data.message);
				}
			}
		 })
	 }else{
		 alert("删除失败");
	 }
	 
 }
 
 /**
  * 编辑数据
  */
 function edit(id){
	 var param={};
	 if(id!=undefined){
		 param.id=id;
	 }
	 $("#tcolumn").load(basePath+"/dictionary/selectone.htm",param);
 }
 
$(function(){
	setHeight(new Array('conternbodyRight','conternbodyLeft'),(51 + 0 + 50 + 15 + 15 + 49));
	getdata();
});