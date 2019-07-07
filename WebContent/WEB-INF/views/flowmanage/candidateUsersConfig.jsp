<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<table id="groups"></table>
<script type="text/javascript">
    function xuanze() {
        var rows = $("#groups").datagrid("getSelections");
        var ids = '';
        for(var i=0;i<rows.length;i++) {
            if(i == rows.length -1) {
                ids += rows[i].name;
            } else {
                ids += rows[i].name + ',';
            }
        }
        $('#assigneeExpression').val(ids);
        task.assigneeType = $("#assigneeType").val();
    	task.assigneeExpression = ids;
    	task.isUseExpression = true;
    }
    function usersxuanze() {
       task.candidateUsersType = $("#candidateUsersType").val();
       var ids = '';
       if($("#candidateUsersType").val()=="candidatedeptGroups"){
    	   var rows = $("#groups").datagrid("getSelections");
           for(var i=0;i<rows.length;i++) {
               if(i == rows.length -1) {
                   ids += rows[i].name;
               } else {
                   ids += rows[i].name + ',';
               }
           }
       }else if($("#candidateUsersType").val()=="candidateroleGroups"){
           var rows = $("#groups").datagrid("getSelections");
           for(var i=0;i<rows.length;i++) {
               if(i == rows.length -1) {
                   ids += rows[i].name;
               } else {
                   ids += rows[i].name + ',';
               }
           }

       }else{
    	   var rows = $("#groups").datagrid("getSelections");
           for(var i=0;i<rows.length;i++) {
               if(i == rows.length -1) {
                   ids += rows[i].name;
               } else {
                   ids += rows[i].name + ',';
               }
           }
       }
        $('#candidateUsersExpression').val(ids);
    	task.candidateUsersExpression = ids;
    	task.isUseExpression = true;
    }
    function signusers() {
        task.signUsersType = $("#signUsersType").val();
        var ids = '';
   	    var rows = $("#groups").datagrid("getSelections");
          for(var i=0;i<rows.length;i++) {
              if(i == rows.length -1) {
                  ids += rows[i].name;
              } else {
                  ids += rows[i].name +',';
              }
          }
        $('#signUsersExpression').val(ids);
      	task.signUsersExpression = ids;
      	task.isUseExpression = true;
    }
    function copysendusers() {
        task.copySendUsersType = $("#copySendUsersType").val();
        var ids = '';
   	    var rows = $("#groups").datagrid("getSelections");
          for(var i=0;i<rows.length;i++) {
              if(i == rows.length -1) {
                  ids += rows[i].name;
              } else {
                  ids += rows[i].name +',';
              }
          }
        $('#copySendUsersExpression').val(ids);
      	task.copySendUsersExpression = ids;
      	task.isUseExpression = true;
    }
    var check = ${checkbox};
    var isMultiple = ${isMultiple};
    var isGrouple = ${isGrouple};
    if(check){
    	if(isMultiple){
    		$("#groups").datagrid({
                url: userInteface,
                title: "",
                loadMsg: "正在加载数据,请稍后...",
                idField: "id",
                //fit:true,
                rownumbers: true,
                sortable: true,
                pagination: false,
                width:$('#task-candidate-panel').width(),
                height:$('#task-candidate-panel').height()-45,
                columns: [[
                    {field:'ck',checkbox:true},
        		    {field:'id',title:'id',hidden:true},
        			{field: "name",title: "用户名",width:200,sortable: true}
                ]]
            });
    	}else{
    		$("#groups").datagrid({
    			singleSelect: true,
                url: userInteface,
                title: "",
                loadMsg: "正在加载数据,请稍后...",
                idField: "id",
                //fit:true,
                rownumbers: true,
                sortable: true,
                pagination: false,
                width:$('#task-candidate-panel').width(),
                height:$('#task-candidate-panel').height()-45,
                columns: [[
        		    {field:'id',title:'id',hidden:true},
        			{field: "name",title: "用户名",width:200,sortable: true}
                ]]
            });
    	}
    	
    }else{
    	if(isGrouple){
    		$("#groups").datagrid({
    	        url: deptInteface,
    	        title: "",
    	        loadMsg: "正在加载数据,请稍后...",
    	        idField: "id",
    	        //fit:true,
    	        rownumbers: true,
    	        sortable: true,
    	        pagination: false,
    	        width:$('#task-candidate-panel').width(),
    	        height:$('#task-candidate-panel').height()-45,
    	        columns: [[
    	            {field: 'ck', checkbox: true},
    	            {field: 'id', title: 'id', hidden: true},
    	            {field: "name", title: "部门", width: 200, sortable: true}
    	        ]]
    	    });
    		
    	}else{
    		$("#groups").datagrid({
    	        url: groupInteface,
    	        title: "",
    	        loadMsg: "正在加载数据,请稍后...",
    	        idField: "id",
    	        //fit:true,
    	        rownumbers: true,
    	        sortable: true,
    	        pagination: false,
    	        width:$('#task-candidate-panel').width(),
    	        height:$('#task-candidate-panel').height()-45,
    	        columns: [[
    	            {field: 'ck', checkbox: true},
    	            {field: 'id', title: 'id', hidden: true},
    	            {field: "name", title: "角色", width: 200, sortable: true}
    	        ]]
    	    });
    	}
    }
    
</script>