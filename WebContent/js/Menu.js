var Menu = function () {
    this.isAddChilren = false;
    this.isChildrenParentId;
    this.pids = new Array();
    this.isAddPid;
    this.level = false;
    this.customerType;
};

var menu = new Menu();

Menu.prototype.addMenuInfo = function () {
    var menuData = {menuName: '菜单名称'};
    $(".example-advanced tbody tr").find("button[id='saveBtn']:visible").click();
    $.getAjaxData(baseUrl + '/menu/add.htm', menuData, function (data) {
        if (data.status) {
            menu.setExpandedPids();
            menu.isAddPid = 'padd';
            menu.init();
        } else {
            alert('添加失败!');
        }
    });

};

Menu.prototype.getTrHtml = function (id, parentId, menuname, fileurl, isParent,fucId,index) {
    var var0 = [];
    var0.push("<tr data-tt-id='" + id + "' "+(!!parentId ? 'data-tt-parent-id="' + parentId + '"':''  )+">");
    var0.push("<td><span class='"+(!!isParent ? 'folder' : 'file')+"'>" + index + "</span></td>");
    var0.push("<td>" + (!!menuname ? menuname : '菜单名称') + "</td>");
    var0.push("<td "+(!!fucId ? 'fucId="'+fucId+'"' : '')+">" + (!!fileurl ? fileurl : '') + "</td>");
    var0.push("<td>" + menu.getButtonHtml(id) + "</td>");
    var0.push("</tr>");

    return var0.join('');
};

Menu.prototype.getButtonHtml = function (id) {
    var var0 = [];
    var0.push('');
    var0.push("<button class='btn btn-primary btn-xs' id='childerBtn' type='button' onclick='menu.addChildren(this," + id + ")'>子项</button>&nbsp;");
    var0.push("<button class='btn btn-primary btn-xs' type='button' id='editBtn' onclick='menu.editMenu(this,"+id+")'>编辑</button>&nbsp;");
    var0.push("<button class='btn btn-primary btn-xs saveBtn' type='button' id='saveBtn'  onclick='menu.updateMenu(this," + id + ")' style='display:none;'>确定</button>&nbsp;");
    var0.push("<button class='btn btn-primary btn-xs' id='deleBtn' type='button' onclick='menu.deleteMenu(this," + id + ")'>删除</button>");
    return var0.join('');
};

Menu.prototype.addChildren = function ($this,id) {

    menu.isAddPid = 'cadd';

    //父节点关联了菜单
    var fucid  = $($this).parent().prev().attr('fucid'); //
    var menuData;
    if(!!fucid) {
        $.getAjaxData(baseUrl + '/menu/updateFunctionToNull.htm', {id:id});

        var menname = $($this).parent().prev().prev().text();
        if(!menname) {
            menname = $($this).parent().prev().prev().find("input[name='menuname']").val();
        }
        menuData  = {menuName:menname, pid: id,funId:fucid};
        $($this).parent().prev().removeAttr('fucid');
    } else {
        menuData  = {menuName: '子项名称', pid: id};
    }
    menu.autoSave();
    $.getAjaxData(baseUrl + '/menu/add.htm', menuData, function (data) {
        if (data.status) {
            menu.isAddChilren = true;
            menu.setExpandedPids();
            menu.pids.push(id);
            menu.init(data.message);
        } else {
            alert('添加失败!');
        }
    });
};
Menu.prototype.setExpandedPids = function () {
    menu.isAddChilren = true;
    $("tr[class*='expanded']").each(function () {
        var pid = $(this).attr('data-tt-id');
        if(!!pid && !($.inArray(pid,menu.pids) > -1)) {
            menu.pids.push(pid);
        }

    });
};

Menu.prototype.autoSave = function (target) {
    var index = $(target).parents('tr').index();
    $('button[id="saveBtn"]').each(function () {
        if($(this).parents('tr').index() != index) {
            var block = $(this).css('display');
            if(block != 'none'){
                $(this).click();
            }
        }
    });
};

Menu.prototype.deleteMenu = function ($this, id) {
    if (confirm('您确定删除吗?')) {
        menu.autoSave();
        $.getAjaxData(baseUrl + '/menu/delete.htm', {id: id}, function (data) {
            if (data.status) {
                menu.setExpandedPids();
                menu.isAddPid = '';
                menu.init();
            } else {
                alert(data.message);
            }
        });
    }
};

Menu.prototype.updateMenu = function ($this,id) {
    var tr        = $($this).parents("tr");
    var menuname  = $(tr).find("input[id='menuname']").val();
    var menpath   = $(tr).find("input[id='menuurl']").val();

    var menuurl   = $(tr).find("input[id='menuurl']").parents('td').attr('fucId');
    menuurl       = !!menuurl ? menuurl : null;

    $.getAjaxData(baseUrl + '/menu/update.htm', {id:id,menuName:menuname.trim(),sysFunctionId:menuurl}, function (data) {
        if (data.status) {
            var thistd = $($this).parents('td');
            var ftd = $(thistd).prev().prev();
            $(ftd).empty().text(menuname);

            var std = $(thistd).prev();
            $(std).empty().text(menpath);

            $(tr).find("#saveBtn").hide();
            $(tr).find("#editBtn").show();



        } else {
            alert(data.message);
        }
    });
};

Menu.prototype.documentClickEvent = function () {
    $(document).click(function (event) {
        var target = $(event.target);
        var type   = $(target).get(0).localName;
        var id     = $(target).attr("id");
        var length = $(target).parents(".modal").length;
        if((type != 'button' && type!='input' &&　length<1 && type!='a') || (!!id && id=='editBtn')) {
           menu.autoSave(target);
        }
    });
};

Menu.prototype.editMenu = function ($this, id) {
    var tr = $($this).parents('tr');
    var thistd = $($this).parents('td');

    var ftd = $(thistd).prev().prev();
    var text = $(ftd).text();
    $(ftd).text('');
    $(ftd).append('<input type="text" name="menuname" id="menuname"  class="form-control input-sm pull-right" style="width: 100%;" value="'+text+'">');

    //如果当前页面为父节点
    var length = $(tr).find(".folder").length;
    if(length <= 0){
        var std = $(thistd).prev();
        var text = $(std).text();
        $(std).text('');
        $(std).append('<input type="text" name="menuurl" onclick="menu.showPathModal(this)" id="menuurl" readOnly class="form-control input-sm pull-right" style="width: 100%;background:#fff;cursor:pointer" value="'+text+'">');
    }
    $(tr).find("#saveBtn").show();
    $(tr).find("#editBtn").hide();
};

Menu.prototype.showPathModal = function ($this,callback) {
    var fucid = $($this).parent().attr('fucid');
    var modal = BaseControl.getPopWindowHtml('selectPath','',[{"form_btn_cance":'取消'},{'form_btn_save':'保存'}]);
    $(".wrapper").after(modal);
    $("#selectPath").find(".modal-title").text("选择菜单页面");

    $("#selectPath").find(".modal-body").empty().append(menu.getTreeHtml());

    dataType.loadLeftTypeInfo('page','#typeLists', function (id) {
        menu.customerType = id;
        menu.getTreeListsData({"projectId":projectId,customerType:id,level:menu.level},$("#function_demo"));
    });
    if(!!fucid) {
        $("#pathid").val(fucid);
        $("#pathid").attr('menupath',$($this).val());
    }
    menu.loadTreeData(fucid);

    $("#selectPath").modal('show');


    $("#webname").keyup(function () {
        var val = $(this).val();
        $.getTree(baseUrl+"/sysFunction/findFormTreeNode.htm",{"projectId":projectId,"menuPath":val,level:menu.level,customerType:menu.customerType},$("#function_demo"), function (event, treeId, treeNode, clickFlag) {
            $("#pathid").val(treeNode.id);
            $("#pathid").attr('menupath',treeNode.name);
        });
    });

    $("#selectPath").find('#form_btn_save').removeAttr('onclick');
    $("#selectPath").find('#form_btn_save').click(function () {
        var pathId = $("#pathid").val();
        if(!!pathId) {
            $("#selectPath").find("#form_btn_cance").click();
            var menupath = $("#pathid").attr('menupath');

            if(pathId == 0) {
                $($this).parent().attr("fucId",'');
                $($this).val('');
                $("#parentId").val('');
            } else {
                $("#parentId").val(pathId);
                $($this).parent().attr("fucId",pathId);
                $($this).val(menupath);
            }
            var menuname = $($this).parent().prev().find("input[id='menuname']").val();
            if(menuname == '菜单名称' || menuname == '子项名称') {
                $($this).parent().prev().find("input[id='menuname']").val(menupath);
            }
            if(!!callback) {
                callback();
            }
        } else {
            alert("请选择菜单页面!");
        }
    });

};


Menu.prototype.getTreeListsData = function (params,selector) {
    $.getTree(baseUrl+"/sysFunction/findFormTreeNode.htm",params,selector, function (event, treeId, treeNode, clickFlag) {
        $("#pathid").val(treeNode.id);
        $("#pathid").attr('menupath',treeNode.name);
    });
};

Menu.prototype.getTreeHtml = function () {
    var var9 = [];
    var9.push('<div style="height:340px;margin-top: 10px;overflow: hidden;">');
    var9.push(  '<div class="row">');
    var9.push(       '<div  class="col-md-4" style="padding-right: 0px;"><div id="typeLists" style="height:340px;border:1px solid #ccc;overflow-y: auto;overflow-x: hidden;"></div></div>');
    var9.push(       '<div class="col-md-8">');
    var9.push(          '<div class="input-group">');
    var9.push(              '<input type="hidden" name="pathid" id = "pathid"/>');
    var9.push(              '<input type="text" name="webname" id="webname"  class="form-control input-sm" style="width: 100%;" placeholder="搜索框"/>');
    var9.push(              '<span class="input-group-btn">');
    var9.push(                  '<button type="button" id="search" class="btn btn-primary btn-flat btn-sm"><i class="fa fa-search"></i></button>');
    var9.push(              '</span>');
    var9.push(          '</div>');
    var9.push(          '<div style="height:300px;border:1px solid #ccc;margin-top:10px;overflow-y: auto;overflow-x:hidden; ">');
    var9.push(              '<div class="tree-submenu1"><ul class="ztree" id="function_demo"></ul></div><input type="hidden" name="funcId">');
    var9.push(          '</div>');
    var9.push(      '</div>');
    var9.push('</div>');


    var9.push('</div>');
    return var9.join('');
};

Menu.prototype.loadTreeData = function (id) {
    $.getTree(baseUrl+"/sysFunction/findFormTreeNode.htm",{"projectId":projectId,level:menu.level},$("#function_demo"), function (event, treeId, treeNode, clickFlag) {
        $("#pathid").val(treeNode.id);
        $("#pathid").attr('menupath',treeNode.name);
    },menu.initSelected,id);
};

Menu.prototype.initSelected = function (id) {
    var zTree = $.fn.zTree.getZTreeObj("function_demo");
    var node = zTree.getNodeByParam("id",id);
    zTree.selectNode(node);
};
Menu.prototype.initTreeTable = function (cid) {
    $(".example-advanced").treetable({expandable: true});

    // Highlight selected row
    $(".example-advanced tbody tr").mousedown(function () {
        $("tr.selected").removeClass("selected");
        $(this).addClass("selected");
    });

    // Drag & Drop Example Code
    $(".example-advanced .file, .example-advanced .folder").draggable({
        helper: "clone",
        opacity: .75,
        refreshPositions: true, // Performance?
        revert: "invalid",
        revertDuration: 300,
        scroll: true
    });

    $(".example-advanced .folder").each(function () {
        $(this).parents("tr").droppable({
            accept: ".file, .folder",
            drop: function (e, ui) {
                var droppedEl = ui.draggable.parents("tr");
                $(".example-advanced").treetable("move", droppedEl.data("ttId"), $(this).data("ttId"));
            },
            hoverClass: "accept",
            over: function (e, ui) {
                var droppedEl = ui.draggable.parents("tr");
                if (this != droppedEl[0] && !$(this).is(".expanded")) {
                    $(".example-advanced").treetable("expandNode", $(this).data("ttId"));
                }
            }
        });
    });

    if(menu.isAddChilren) {
        var pids = menu.pids;
        for(var i = 0;i < pids.length;i++) {
            var length = $('tr[data-tt-id="'+pids[i]+'"]').length;
            if(length > 0) {
                $(".example-advanced").treetable("expandNode",pids[i]);
            }
        }
        menu.pids = new Array();
    }
    if(menu.isAddPid == 'padd') {
        var e = document.getElementById('conternbodyRight');
        e.scrollTop=e.scrollHeight;
        $("tr:last").addClass("selected");
        $("tr:last").find("button[id='editBtn']:visible").click();
    } else if(menu.isAddPid == 'cadd') {
        var tr = $('tr[data-tt-id="'+cid+'"]');
        $(tr).addClass("selected");
        $(tr).find("button[id='editBtn']:visible").click();

        var index = $('tr:visible').index(tr);
        var height = $(tr).height();
        var result = index * height;

        var e = document.getElementById('conternbodyRight');
        e.scrollTop =result / 3;
    }
};

Menu.prototype.init = function (cid) {

    $.getAjaxData(baseUrl + '/menu/getTreeMenu.htm', {parentId:''}, function (data) {
        var var0 = [];
        if (!!data) {
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                var pid = !!data[i].parent_id ? data[i].parent_id : '';
                var funId = data[i].funId;
                var name = data[i].menu_name;
                var webname = data[i].web_name;
                var isParent = data[i].isParent == 0 ? '' : '1';
                var index = 1+i;
                var html = menu.getTrHtml(id, pid, name, webname, isParent,funId,index);
                var0.push(html);
            }
        }

        $(".example-advanced tbody").empty().append(var0.join(''));

        menu.initTreeTable(cid);
    });



};