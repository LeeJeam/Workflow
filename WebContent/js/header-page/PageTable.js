var PageTable = {
    paramJSON:{},
    step:'',
    init: function () {
        PageTable.paramJSON.projetcId = projectId;
        PageTable.preEvent();
       // PageTable.myStep();


        PageTable.applyEvent();
        PageTable.submitBtnEvent();
        PageTable.submitBtnEvents();
        PageTable.goBtnEvents();
        //PageTable.loadTreeNet();

        
    },
    parentNetClickEvent: function () {
        $('.tree-submenu1').show();
    },
    loadTreeNet: function () {
        $.getTree((typeof(baseUrl) == 'undefined' ? basePath : baseUrl)+"/sysFunction/findFormTreeNode.htm",{"projectId":projectId},$("#function_demo"),PageTable.selected);
        $('.tree-submenu1').hide();
        $(document).click(function(event) {
            var target = event.target;
            var name = $(target).attr('name');
            if(name != 'parentNet') {
                $('.tree-submenu1').hide();
            }
        });
    },
    selected: function(event, treeId, treeNode, clickFlag) {
        $("#parentNet").val(treeNode.name);
        $("#parentId").val(treeNode.id);
    },
    preEvent: function () {
        $("#preBtn").click(function(event) {
            step =step.preStep();
        });
    },
    myStep:function() {
        step= $("#myStep").step({
            animate:true,
            initStep:1,
            speed:1000
        });
    },
    applyEvent: function () {
        $("#applyBtn").click(function(event) {
            var yes=step.nextStep();
        });
    },
    submitBtnEvent: function () {
        $("#submitBtn").click(function(event) {
            var netPage = $('#netPage').val();
            if(!netPage) {
                alert('请输入网页名称!');
                return;
            }
            PageTable.paramJSON.webName = netPage;

            if(!!$('#parentId').val()) {
                PageTable.paramJSON.parentId = $('#parentId').val();
            }

            var isSelected = PageTable.getTemplateSelected();
            if(isSelected) {
                alert('请选择模板!');
                return;
            }
            var flag = $('.ok').parent().attr('flag');
            PageTable.paramJSON.type = flag;
            PageTable.loadTableData();
            var yes=step.nextStep();
        });
    },
    submitBtnEvents: function () {
        $("#submitBtns").click(function(event) {
            var isActive = PageTable.selectTable();
            if(isActive) {
                alert('请选择数据表!');
                return;
            }
            var tableId = $("#baseTable").find('tbody').find('tr[class="activeTh"]').attr('tableid');
            PageTable.paramJSON.projectTableId = tableId;

            PageTable.paramJSON.fileName = $('#netPage').val();
            PageTable.paramJSON.templetName = 'table-view';
            var yes=step.nextStep();

            $.getAjaxData(baseUrl + '/sysFunction/add.htm',PageTable.paramJSON,function(data){
                if(data.status){
                    window.location.href = baseUrl + '/createDataTable/index.htm?ptid='+tableId+'&pid='+data.message;
                }else{
                    alert(data.message);
                }
            });
        });
    },
    goBtnEvents: function () {
        $("#goBtn").click(function(event) {
            var yes=step.goStep(3);
        });
    },
    selectTemplate: function ($this) {
        if($($this).find('.ok').length > 0) {
            $($this).find('.ok').remove();
            $($this).removeClass('active');
        } else {
            $($this).addClass("active");
            $($this).attr('selected',true);
            $($this).siblings().removeClass('active');
            $($this).append("<div class='ok' style='width:26px;height:26px;background: #3c8dbc;position:absolute;top:6px;right:6px;border-radius: 50%;line-height:26px;text-align: center; '><span style='color: #fff'  class='fa fa-check'></span></div>");
            $($this).siblings().find('.ok').remove();
        }
    },
    selectTable: function () {
        var flag = true;
        $("#baseTable").find('tbody').find('tr').each(function () {
            var active = $(this).attr('class');
            if(!!active) {//有值
                flag = false;
                return false;
            }
        });
        return flag;
    },
    loadTableData: function (typeId,tablename,noneflag) {
        $.getAjaxData(baseUrl + '/createDataTable/getTables.htm',{customerType:typeId,tablename:tablename}, function (data) {
            if(data.success) {
                var var0 = [];
                if(!!noneflag) {
                    var0.push('<tr><td>无</td><td align="right"><span><i class="fa fa-check"></i></span></td></tr>');
                }
                for(var i = 0;i<data.rows.length;i++) {
                    var0.push('<tr ref="'+data.rows[i].id+'" data-tablename="'+data.rows[i].table_name+'" tableId="'+data.rows[i].id+'"><td>'+data.rows[i].table_alias+'</td><td align="right"><span><i class="fa fa-check"></i></span></td></tr>');
                }
                $("#baseTable").find('tbody').empty().append(var0.join(''));

                $("#baseTable tr td").find("span").hide();
                $("#baseTable tr td").click(function (){
                    $("#baseTable tr").attr("class","").css("color","#333").find("span").hide();
                    $(this).parents("tr").addClass("activeTh").css("color","#fff").find("span").show().css("color","#fff");
                });
            }
        })
    },
    getTemplateSelected: function () {
        var flag = true;
        $('.showImg').find('a').each(function () {
            var selected = $(this).attr('selected');
            if(!!selected) {
                flag = false;
                return false;
            }
        });
        return flag;
    }
};