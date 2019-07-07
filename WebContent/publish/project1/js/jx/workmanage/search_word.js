var dt=undefined;
var isOk=false;
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
            url: basePath+'/myWork/selectwork.htm',
            type:"POST",
            dataSrc: "aaData",
            data: function ( d ) {
            	var param={};
            	param.startRow=d.start;
            	param.limit=d.length;
            	param.isOk=isOk;
            	if(!isOk){
            		isOk=true;
            	}
                //添加额外的参数传给服务器  
                $("#searchForm").serializeObject(param);
                return param;
            }
        },
		columns: [
			{ "data": "id"},
			{ "data": "name"},
			{ "data": "stepName"},
			{ "data": "taskAssignee"},
			{ "data": "createTime","mRender": function(data,type,full){
				return stopTime(data,full.receiveTime,full.endTime);
			}},
			{ "data": "endTime"},
			{ "data": "createUserName"},
			{ "data": "stepState"},
			{ "data": "id","mRender": function(data,type,full){
				var html='<div class="action-buttons">';
				if(loginUserId==full.taskOwner&&full.receiveTime==""){
					html+='<a class="btn btn-primary btn-xs btn-flat" title="撤消委托" onclick="backEntrust('+data+')">撤消委托</i></a>';
				}
				html+='<a class="btn btn-primary btn-xs btn-flat" onclick="detail(\''+data+'\',\''+full.taskId+'\',\'2\')" title="详情">详情</a>'
					/*+'<a class="btn btn-primary btn-xs btn-flat" title="删除" onclick="del('+data+')">删除</a>'*/
					+'<a class="btn btn-primary btn-xs btn-flat" title="足迹" onclick="footPoint('+data+')">足迹</a></div>';
				return html;
			}}
		] 
	} );
}
$(function (){
	//填充表单数据
	getTableData();
	//表單提交搜索
	$("#search").click(function(){
		var scope=$("#scope").val();
		if(scope!=1){
			var userNameScope=$("#userNameScope").val();
			if(userNameScope==""){
				alert("请选择人员");
				return;
			}
		}
		//重画
		dt.fnDraw(true);  
	});  
	//时间属性
	$("#beginDateStr").datetimepicker({ 
		language:'zh-CN',
        format:'yyyy-mm-dd',
        todayBtn:  1,
		autoclose: 1,
		minView:2
    });
	$("#endDateStr").datetimepicker({ 
		language:'zh-CN',
        format:'yyyy-mm-dd',
        todayBtn:  1,
		autoclose: 1,
		minView:2
    });
	$("#mobile-beginDateStr").datetimepicker({ 
		language:'zh-CN',
        format:'yyyy-mm-dd',
        todayBtn:  1,
		autoclose: 1,
		minView:2
    });
	$("#mobile-endDateStr").datetimepicker({ 
		language:'zh-CN',
        format:'yyyy-mm-dd',
        todayBtn:  1,
		autoclose: 1,
		minView:2
    });
	//范围值得变动
	$("#scope").bind("change",change);
	//状态值得变动
	$("#stateType").bind("change",typeChange);
	//初始默认时间不可编辑
	$("#beginDateStr").attr("disabled","disabled").css("background","#ccc");
	$("#endDateStr").attr("disabled","disabled").css("background","#ccc");
});

function change(event){
   var val=event.target.value;
   if(val==1){
	   $("#userBox").hide();
   }else{
	   $("#userBox").show();
   }
};

function typeChange(event) {
	var val = event.target.value;
	if (val == "已结束" || val == "已归档") {
		$("#beginDateStr").removeAttr("disabled").css("background","#fff");
		$("#endDateStr").removeAttr("disabled").css("background","#fff");
	} else {
		$("#beginDateStr").attr("disabled","disabled").css("background","#ccc");
		$("#endDateStr").attr("disabled","disabled").css("background","#ccc");
	}
};

function getusers(e){
	commRequstFun(basePath + "/formOpration/findOtherTableData.htm", {tablename:'bumenbiao'}, function(data) {
		var ids="";
		var names="";
		if (null != data&&data.length>0) {
			for(var i= 0 ;i<data.length;i++){
				if(i==data.length-1){
					ids+=data[i].id;
					names+=data[i].name;
				}else{
					ids+=data[i].id+",";
					names+=data[i].name+",";
				}
			}
		}
		 $("#tabs_2,#tabs_1").hide();
		$("#popCommFlowUserInput").val($("#"+e).val()).attr("userorgrange",names).attr("userorgrangeid",ids).attr("chooseuserboxconfigtype","2");
		userBoxDisplayFun($("#popCommFlowUserInputDiv").get(0),$("#"+e).get(0));
		$("#tabs_3").click();
		
	}, "json");
}