var FormInitControlData = function () {

    var isStart = true;


    var setControlData = function (type) {
        //当只为只读时，才加载
        if(type == 'button') {
            return false;
        }
        var $this = $("#setControlData");
        /*var flag = $this.prev().find("i").attr("class").indexOf("fa-caret-right") <= -1;
        if (flag) {
            $this.prev().click();
        }*/
        $this.empty().append(getSelectionHtml('加载方式','loadMode'));
        initLoadMethodData();
        loadModeChange();

        $this.prev().show();
        //$this.prev().click();
        $this.show();
    };


    var initLoadHomeHtml = function ($this) {
        var var0 = [];
        var0.push(getInputNumberHtml("数据源",'readdatasource','请选择数据源','true','text','cursor:pointer;background:#fff'));
        //var0.push(setEnumData(isTime));.
        $this.append(var0.join(''));

        var enumIsOk = $(setEnumIsOk());
        $this.append(enumIsOk);

        var otherSource = setOtherSource();
        $this.append(otherSource);
        setOtherSourceClickEvent(otherSource);


        enumIsOk.find("input[type='checkbox']").click(function () {
            var checked = $(this).get(0).checked;
            if(checked) {
                $(".hasFocus2").attr('data-isEnum','isOk');
                var texts = !!$('.hasFocus2').attr('data-enum-text') ? $('.hasFocus2').attr('data-enum-text').split("@") : '';
                var vals = !!$('.hasFocus2').attr('data-enum-val') ? $('.hasFocus2').attr('data-enum-val').split('@') : '';
                var isTime = getHasFocusEnumTime(texts,vals);

                var enumData = setEnumData(isTime);
                $(this).parents('.form-group-prop').after(enumData);

                for(var i in texts) {
                    $("div[id='enum-items']").eq(i).find(".enum-text").val(texts[i]);
                }
                for(var i in vals) {
                    $("div[id='enum-items']").eq(i).find(".enum-val").val(vals[i]);
                }
            } else {
                $(".hasFocus2").removeAttr('data-isEnum');
                $(".hasFocus2").removeAttr('data-enum-text');
                $(".hasFocus2").removeAttr('data-enum-val');
                $("div[id='set-enum']").remove();
            }
        });
        var isEnum = $(".hasFocus2").attr('data-isEnum');
        if(!!isEnum) {
            enumIsOk.find("input[type='checkbox']").click();
        }



        readDataSourceChangeEvnet();

        $('#readdatasource').click(function () {
            GetTablesUtils.init($(this));
        });
        GetTablesUtils.setTablesName($('#readdatasource'));



    };


    var initLoadMethodData = function () {
        $("#loadMode").append("<option selected value=''></option></option><option value='1'>后台加载</option><option value='2'>页面计算</option>")
    };

    var getSelectionHtml = function (labelName, inputId, holder,flag) {
        var var0 = [];
        var0.push('<div id="' + inputId + '_div" class="prop-mg-lr col-md-12">');
        var0.push('<div class="form-group-prop"><label class="label_property">' + labelName + '</label>');
        var0.push('<div class="controls">');
        if(!flag) {
            var0.push('<select id="' + inputId + '" data-placeholder="' + holder + '"  class="form-control"></select>');
        } else {
            var0.push('<select id="' + inputId + '" data-placeholder="' + holder + '"  class="form-control"></select>');
        }

        var0.push('</div>');
        var0.push('</div>');
        var0.push('</div>');
        return var0.join('');
    };

    var getInputNumberHtml = function (labelName, inputId, holder,flag,type,css) {

        var var0 = [];
        var0.push('<div id="' + inputId + '_div" class="prop-mg-lr col-md-12">');
        var0.push('<div class="form-group-prop"><label class="label_property">' + labelName + '</label>');
        var0.push('<div class="controls">');
        var0.push('<input type="'+(!!type ? type :'number')+'" id="'+inputId+'" '+(!!flag ? 'readOnly' : '')+' class="form-control" style="'+(!!css ? css :'')+'" placeholder="'+holder+'">');
        var0.push('</div>');
        var0.push('</div>');
        var0.push('</div>');
        return var0.join('');
    };

    var getFormulaHtml = function(labelName,inputId, holder) {
        var var0 = [];
        var0.push('<div id="' + inputId + '_div" class="prop-mg-lr col-md-12">');
        var0.push('<div class="form-group-prop"><label class="label_property">' + labelName + '</label>');
        var0.push('<div class="controls">');
        //var0.push('<input type="'+(!!type ? type :'number')+'" id="'+inputId+'" '+(!!flag ? 'readOnly' : '')+' class="form-control" style="'+(!!css ? css :'')+'" placeholder="'+holder+'">');
        var0.push("<textarea cols='15' rows='5'  placeholder='"+holder+"' id='"+inputId+"'></textarea>");
        var0.push('</div>');
        var0.push('</div>');
        var0.push('</div>');
        return var0.join('');
    };



    var initPageCalculationHtml = function ($this) {
        //-------------构建页面显示标签Build Page display tab----------------------------

        var selecHtml = getSelectionHtml("选择字段",'calculationItems','请选择字段');
        var selector = $(selecHtml);
        $($this).append(selector);

        var var0 = $(selector).find("select[id='calculationItems']");




        var0.change(function () {
            var val = $(this).val();
            var isAppend = $(this).parents('.prop-mg-lr').next('.prop-mg-lr').length <= 0 ? true : false;

            if(!!val && val != 'none' && val != 'customer')
            {
                if(isAppend) {
                    appendCalculationOperation($this);
                }
                sethasFocusAttr($(this),val,'data-cali');
            }
            else if(val == 'customer')
            {
                appendCustomerItems($this);
                appendCalculationOperation($this);

                sethasFocusAttr($(this),'~','data-cali');
            }
            else //删除以下所有控件及页面设置的东西
            {
                removeNextAll($(this),$("#setControlData")); //获取所有的下标
                $(this).parents('.prop-mg-lr').nextAll('.prop-mg-lr').remove();
            }
        });

        //--------------给显示标签初始化后台数据-------------------------------
        loadCalculationData(selector,var0,$this);

    };
    
    var removeNextAll = function ($this,parent) {
        var de1 = [],de2 = [],de3 = [];

        var index = parent.find("select[id='calculationOperation']").index($this);
        if(index >= 0) {
            de2.push(index);
        }

        var index = parent.find("select[id='calculationItems']").index($this);
        if(index >= 0) {
            de1.push(index);
        }

        $this.parents('.prop-mg-lr').nextAll('.prop-mg-lr').each(function () {
            var id = $(this).find("select,input").attr('id');
            var select = $(this).find("select[id='"+id+"'],input[id='"+id+"']");
            var index = $("#setControlData").find("select[id='"+id+"'],input[id='"+id+"']").index(select);

            //获取需要删除的元素下标
            switch(id) {
                case "calculationItems":
                    de1.push(index);
                    break;
                case "calculationOperation":

                    de2.push(index);
                    break;
                case "customerEdit":
                    de3.push(index);
                    break;
            }
        });

        var var1 = $('.hasFocus2').attr('data-cali');
        var var2 = $('.hasFocus2').attr('data-calo');
        var var3 = $('.hasFocus2').attr('data-cal-val');

        var v1 = getAppendData(var1,de1);
        var v2 = getAppendData(var2,de2);
        var v3 = getAppendData(var3,de3);
        if(!!v1) {
            $('.hasFocus2').attr('data-cali',v1);
        } else {
            $('.hasFocus2').removeAttr('data-cali');
        }
        if(!!v2) {
            $('.hasFocus2').attr('data-calo',v2);
        } else {
            $('.hasFocus2').removeAttr('data-calo');
        }
        if(!!v3) {
            $('.hasFocus2').attr('data-cal-val',v3);
        } else {
            $('.hasFocus2').removeAttr('data-cal-val');
        }
    };

    var getAppendData = function (val,del) {
        var result = [];
        var var0 = !!val ? val.split("@") : [];
        for(var i = 0;i<var0.length;i++) {
            if($.inArray(i,del) <= -1) {
                result.push(var0[i]);
            }
        }
        return result.join('@');
    };

    var appendCustomerItems = function ($this) {
        var ele = getInputNumberHtml('算法项','customerEdit','只能输入数字');
        var selector = $(ele);
        $this.append(selector);

        var var0 = selector.find("#customerEdit");
        var0.keyup(function () {
            var val = $(this).val();

            sethasFocusAttr($(this),val,'data-cal-val','number');
        });

        var0.change(function () {
            var val = $(this).val();
            sethasFocusAttr($(this),val,'data-cal-val','number');
        });

        var var1 = $('.hasFocus2').attr('data-cal-val');
        if(!!var1) {
            var index = $this.find("input[id='customerEdit']").index(var0);
            var var2 = var1.split("@");
            $(var0).val(var2[index]);
        }

    };

    var appendCalculationOperation = function ($this) {
        var operation = getSelectionHtml('运算符','calculationOperation','请选择计算方式');
        var selector  = $(operation);
        $this.append(selector);

        var var0 = selector.find("select[id='calculationOperation']");
        var0.append("<option></option>");
        var0.append("<option value='+'>加</option>");
        var0.append("<option value='-'>减</option>");
        var0.append("<option value='*'>乘</option>");
        var0.append("<option value='/'>除</option>");

        var0.change(function () {
            var val = $(this).val();
            var isAppend = $(this).parents('.prop-mg-lr').next('.prop-mg-lr').length <= 0 ? true : false;
            if(!!val) {
                if(isAppend) {
                    initPageCalculationHtml($this);
                }
                sethasFocusAttr($(this),val,'data-calo');

            } else {
                removeNextAll($(this),$("#setControlData")); //获取所有的下标
                $(this).parents('.prop-mg-lr').nextAll('.prop-mg-lr').remove();
            }
        });
        var var1 = $('.hasFocus2').attr('data-calo');
        if(!!var1) {
            var index = $this.find("select[id='calculationOperation']").index(var0);
            var var2 = var1.split("@");
            $(var0).val(var2[index]);
            $(var0).change();
        }

    };

    var loadCalculationData = function (selector,var0,select2) {
        var $this = $(".hasFocus2");
        var type  = $this.attr('type');
        if(type == 'text') {
            var tablename = $this.attr('formcontrolgrouptablename');
            if(!tablename) {
                tablename = $('form').attr('table-name');
            }
            $.getAjaxData(basePath + '/createDataTable/getColumnsToTableName.htm', {tablename: tablename}, function (data) {
                try {
                    var tableAlias = data.rows[0].table_alias;
                    appendCalculationItem(data,selector,var0,select2,tableAlias);
                } catch (e) {
                    console.log(e);
                }
            });


        }
    };

    var appendCalculationItem = function (datas,selector,var0,select2,tableAlias) {
        var tablename = $('#add').attr('table-name');
        $.getAjaxData(basePath + '/createDataTable/getColumnsToTableName.htm', {tablename: tablename}, function (data) {

            var tableAlias2 = data.rows[0].table_alias;
            var options = BaseControl.getOptions(data, new Array("filed_name", "filed_name", "column_alias"),'',true);
            var optGroup1 = '<optgroup label="'+tableAlias2+'">'+options+'</optgroup>';

            var optGroup2 = '';
            if(tableAlias != tableAlias2) {
                var options = BaseControl.getOptions(datas, new Array("filed_name", "filed_name", "column_alias"),'',true);
                optGroup2 += '<optgroup label="'+tableAlias+'">'+options+'</optgroup>';
            }
            var optGroup = optGroup1 + optGroup2 + '<option value="customer">自定义算法项</optoin>';
            selector.find("select[id='calculationItems']").empty().append(optGroup);


            var var1 = $('.hasFocus2').attr('data-cali');
            if(!!var1) {
                var index = select2.find("select[id='calculationItems']").index(var0);
                var var2 = var1.split("@");
                if(var2[index] == '~') {
                    $(var0).val('customer');
                } else {
                    $(var0).val(var2[index]);
                }
                $(var0).change();
            }
        });
    };

    var sethasFocusAttr = function ($this,val,attr,type) {
        var id  = $($this).attr('id');

        var dataCualc = $(".hasFocus2").attr(attr);
        if(!!dataCualc) {
            var var0 = dataCualc.split("@");
            var index = 0;
            if(!!type && type == 'text' || type=='number') {
                index = $('input[id="'+id+'"]').index($this);
            } else {
                index = $('select[id="'+id+'"]').index($this);
            }
            var0[index] = val;
            $(".hasFocus2").attr(attr,var0.join('@'));
        } else {
            $(".hasFocus2").attr(attr,val);
        }

        setFormula();

    };


    var setFormula = function () {
        var cali = !!$(".hasFocus2").attr('data-cali') ? $(".hasFocus2").attr('data-cali').split("@") : '';
        var calo = !!$(".hasFocus2").attr('data-calo') ? $(".hasFocus2").attr('data-calo').split("@") : '';
        var calv = !!$(".hasFocus2").attr('data-cal-val') ? $(".hasFocus2").attr('data-cal-val').split("@") : '';
        var result = [],eval=[];
        var index = 0;
        for(var i in cali) {
            var var0 = cali[i];
            if(var0 != '~') {
                result.push(cali[i]);
            } else {
                //获取~出现的欠数
                result.push(calv[index]);
                index ++;
            }
            result.push(!!calo[i] ? calo[i] : '');
        }

        /*var formula = $(".hasFocus2").attr('data-formula');
        if(!!formula && formula.indexOf("(")> -1) {
            $("#formula").val(formula);
        } else  {
            $("#formula").val(result.join(''));
        }*/

        $("#formula").val(result.join(''));

        $("#formula").keyup(function(){
            var val = $(this).val();
            $(".hasFocus2").attr('data-formula',val);
        });
    };



    var loadModeChange = function () {
        $("#loadMode").change(function () {
            var $this = $("#setControlData");

            var val = $(this).find('option:selected').val();
            $(this).parents('.prop-mg-lr').nextAll('.prop-mg-lr').remove();
            if(val == 1) {
                initLoadHomeHtml($this); //加载后台信息
                $('.hasFocus2').attr('data-cual-method',val);
            } else if(val == 2) {

                var point = getInputNumberHtml("保留小数",'calcualtionPoint','请输入保留小数点的位数');
                var pointSelector = $(point);
                $($this).append(pointSelector);

                var formula = $(getFormulaHtml("计算公式",'formula',''));
                $($this).append(formula);


                var var0 = pointSelector.find("input[id='calcualtionPoint']");
                var point = $('.hasFocus2').attr('data-point');
                var0.val(point);
                var0.keyup(function(){
                   var val = $(this).val();
                    $('.hasFocus2').attr('data-point',val);
                });
                var0.change(function(){
                    var val = $(this).val();
                    $('.hasFocus2').attr('data-point',val);
                });

                initPageCalculationHtml($this);//加载计算信息
                $('.hasFocus2').attr('data-cual-method',val);
            } else {
                $('.hasFocus2').removeAttr('data-cual-method');
            }
        });

        var dataCual = $('.hasFocus2').attr('data-cual-method');
        if(!!dataCual) {
            $("#loadMode").find("option[value='"+dataCual+"']").attr('selected',true);
        }
        $("#loadMode").change();

    };



    var getHasFocusEnumTime = function (texts,vals) {
        var isTime = 0;
        if(!!texts && !!vals) {
            isTime = texts.length > vals.length ? texts.length : vals.length;
        }
        return isTime;
    };


    var readDataSourceChangeEvnet = function () {
        $("#readdatasource").change(function () {
            var tablename = $('#readdatasource').attr('data-tablename');
            if (!!tablename) {
                setAttr("data-readtable", tablename);
            } else {
                delAttr('data-readtable');
            }

            $("#choicecolumn_div").remove();
            $("#readdatasource_div").after(getSelectionHtml("选择列名", "choicecolumn"));

            readColumnChangeEvent();
            setReadColumn();
        });
    };

    /***
     * init select column data
     */
    var setReadColumn = function () {
        var tableId = $('#readdatasource').attr('data-tableId');
        $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: tableId}, function (data) {
            var options = BaseControl.getOptions(data, new Array("filed_name", "filed_name", "column_alias"));
            $("#choicecolumn").empty().append(options);

            var column = $(".hasFocus2").attr("data-readcolumn");
            if (!!column) {
                if (column != 'none') {
                    $('#choicecolumn').val(column);
                }
            }
        });
    };

    var readColumnChangeEvent = function () {
        $("#choicecolumn").change(function () {
            var val = $(this).val();
            if (!!val) {
                setAttr("data-readcolumn", val);
            } else {
                delAttr('data-readcolumn');
            }

        });
    };

    /***
     * set property
     * @param name
     * @param value
     */
    var setAttr = function (name, value) {
        var role = $(".hasFocus2").attr('data-role');
        if (role == 'checkbox') {
            $(".hasFocus2").find("input").attr(name, !!value ? value : '');
        } else {
            $(".hasFocus2").attr(name, !!value ? value : '');
        }
    };

    /***
     * delete property set
     * @param name
     */
    var delAttr  = function (name) {
        var role = $(".hasFocus2").attr('data-role');
        if (role == 'checkbox') {
            $(".hasFocus2").find("input").removeAttr(name);
        } else {
            $(".hasFocus2").removeAttr(name);
        }
    };


    /***
     *
     * @param isTime
     * @returns {string}
     */
    var setEnumData = function (isTime) {
        var var0 = [];
        var0.push('<div class="prop-mg-lr col-md-12" id="set-enum">');
        var0.push(  '<div class="form-group-prop">');

        if(isTime == 0) {
            var0.push(enumItems());
        } else {
            for(var i = 0;i<isTime;i++) {
                var0.push(enumItems(i!=0));
            }
        }

        var0.push('<div class="text-center">');
        var0.push(  '<button class="btn btn-primary btn-xs" id="setAddItemBtn" onclick="FormInitControlData.addEnumItems(this)">新增一项</button>  ');
        var0.push('</div>');

        var0.push(  '</div>');
        var0.push('</div>');

        return var0.join('');
    };




    var setEnumIsOk = function () {
        var var0 = [];
        var0.push('<div class="form-group-prop prop-mg-lr">');
        var0.push(   '<div class="checked">');
        var0.push(     '<label style="margin-right: 20px;">');
        var0.push(          '<input style="margin-top:10px;height:auto!important;" type="checkbox" name="enumIsOk">');
        var0.push(          '<span style="font-weight: normal;margin-left:10px;">设置枚举控件对应的值</span>');
        var0.push('</label>');
        var0.push(  '</div>');
        var0.push('</div>');
        return var0.join('');
    };


    var setOtherSource = function () {
        var var0 = [];
        var0.push('<div class="form-group-prop prop-mg-lr">');
        var0.push(   '<div class="checked">');
        var0.push(     '<label style="margin-right: 20px;">');
        var0.push(          '<input style="margin-top:10px;height:auto!important;" type="checkbox" name="setOtherSource">');
        var0.push(          '<span style="font-weight: normal;margin-left:10px;">其他数据源加载</span>');
        var0.push('</label>');
        var0.push(  '</div>');
        var0.push('</div>');
        return $(var0.join(''));
    };

    var setIsArrangement = function () {
        var var0 = [];
        var0.push('<div class="form-group-prop prop-mg-lr">');
        var0.push(   '<div class="checked">');
        var0.push(     '<label style="margin-right: 20px;">');
        var0.push(          '<input style="margin-top:10px;height:auto!important;" type="checkbox" name="arrangement">');
        var0.push(          '<span style="font-weight: normal;margin-left:10px;">是否独立排列显示</span>');
        var0.push('</label>');
        var0.push(  '</div>');
        var0.push('</div>');
        return $(var0.join(''));
    };

    var setOtherSourceClickEvent = function (selector) {
        selector.find("input[name='setOtherSource']").click(function () {
            var checked = $(this).get(0).checked;
            if(checked) {
                var arrangement = $(setIsArrangement());
                $(this).parents(".prop-mg-lr").after(arrangement);
                arrangement.find("input").click(function(){
                    var checked = $(this).get(0).checked;
                    if(checked) {
                        $(".hasFocus2").attr('data-arrg','checked');
                    } else {
                        $(".hasFocus2").removeAttr('data-arrg');
                    }
                });
                var arrg = $(".hasFocus2").attr('data-arrg');
                if(!!arrg) {
                    arrangement.find("input").click();
                }

                var dataSource = $(getInputNumberHtml("数据源",'otherDataSource','请选择数据源','true','text','cursor:pointer;background:#fff'));
                $(this).parents(".prop-mg-lr").after(dataSource);

                var var0 = dataSource.find('#otherDataSource');

                var0.click(function () { GetTablesUtils.init($(this)); }); //初始化表格数据

                var0.change(function(){
                    var tablename = $(this).attr('data-tablename');
                    var tableId   = $(this).attr('data-tableid');
                    var index = $("input[id='otherDataSource']").index($(this));

                    setAttrs(this,index,'data-os',tablename);

                    $("select[id='osColumn']").remove();
                    //加载列
                    var osColumn = $(getSelectionHtml("选择列名", "osColumn"));
                    $(this).parents(".prop-mg-lr").after(osColumn);

                    setSourceColumn(tableId,osColumn.find("select[id='osColumn']"),'data-osc');
                });

                GetTablesUtils.setTablesName(var0,'data-os'); //加载显示数据
            } else {
                $('.hasFocus2').removeAttr('data-os');
                $('.hasFocus2').removeAttr('data-osc');
                $('.hasFocus2').removeAttr('data-arrg'); //独立排列

                $("input[id='otherDataSource']").parents('.prop-mg-lr').remove();
                $("select[id='osColumn']").parents('.prop-mg-lr').remove();
                $("input[name='arrangement']").parents('.prop-mg-lr').remove();
            }
        });
        var dataOs = $('.hasFocus2').attr('data-os');
        if(!!dataOs) {
            selector.find("input[name='setOtherSource']").click();
        }
    };

    var setAttrs =  function($this,index,attr,val) {
        var val = !!val ? val : !!$($this).val() ? $($this).val() : '';

        var values = $('.hasFocus2').attr(attr);
        if(!!values) {
            var result = getArrayValues(values,index,val);
            $('.hasFocus2').attr(attr,result);
        } else {
            $('.hasFocus2').attr(attr,val);
        }
    };

    var setSourceColumn = function(tableId,selector,attr) {
        $.getAjaxData(basePath + '/createDataTable/getTablesColumnsData.htm', {tableId: tableId}, function (data) {
            var options = BaseControl.getOptions(data, new Array("filed_name", "filed_name", "column_alias"));
            $(selector).empty().append(options);

            var column = $(".hasFocus2").attr(attr);
            if (!!column) {
                if (column != 'none') {
                    $(selector).val(column);
                }
            }
        });

        $(selector).change(function(){
            var val = $(this).val();
            if (!!val) {
                var index = $("select[id='osColumn']").index(val);
                setAttrs(this,index,'data-osc',val);
            } else {
                delAttr('data-osc');
            }
        });
    };




    var enumItems = function (flag) {
        var var0 = [];
        var0.push(      '<div class="controls" id="enum-items" style="float: none; width: 91%;">');
        var0.push(          '<div class="row setitemrow" style="margin-bottom: 5px;">');
        var0.push(              '<div class="col-md-6" style="padding-right: 0px; padding-left: 0px;">');
        var0.push(                  '<input type="text" class="enum-text itemValueDescription form-control" onkeyup="FormInitControlData.setEnumVal(this,\'enum-text\',\'data-enum-text\')"   placeholder="选项描述">');
        var0.push(              '</div>');
        var0.push(              '<div class="col-md-5" style="padding-right: 0px; padding-left: 5px;">');
        var0.push(                  '<input type="text" class="enum-val itemValue form-control" onkeyup="FormInitControlData.setEnumVal(this,\'enum-val\',\'data-enum-val\')"  placeholder="选项值">');
        var0.push(              '</div>');
        if(!!flag && flag) {
            var0.push('<div class="col-md-1" style="padding-right: 0px; padding-left: 5px;">');
            var0.push(  '<div class="input-group-addon" onclick="FormInitControlData.deleteItems(this)" style="width: 100%; height: 18px; border: 1px solid #d2d6de; background: #fff; cursor: pointer; padding: 5px;"><i class="fa fa-minus-circle"></i></div>');
            var0.push('</div>');
        }
        var0.push(          '</div>');
        var0.push(      '</div>');
        return var0.join('');
    };


    var getArrayValues = function (values,index,val) {
        var vals = values.split("@");
        vals[index] = val;
        return vals.join("@");
    };


    return {
        init: function (type) {
            if(isStart) {
                setControlData(type);
            }

        },
        addEnumItems:function ($this) {
            $($this).parent().before(enumItems(true));
        },
        deleteItems: function ($this) {
            if(confirm('您确定删除吗?')) {
                var items = $($this).parents("#enum-items");
                var index = $('div[id="enum-items"]').index(items);
                var texts = !!$('.hasFocus2').attr('data-enum-text') ? $('.hasFocus2').attr('data-enum-text').split("@") :'';
                var valus = !!$('.hasFocus2').attr('data-enum-val') ? $('.hasFocus2').attr('data-enum-val').split("@") : '';

                var text = [],vals = [];
                for(var i in texts) {
                    if(index != i) {
                        text.push(!!texts[i] ? texts[i] : '');
                        vals.push(!!valus[i] ? valus[i] : '');
                    }
                }
                $('.hasFocus2').attr('data-enum-text',text.join('@'));
                $('.hasFocus2').attr('data-enum-val',vals.join('@'));
                $($this).parents("#enum-items").remove();
            }
        },
        setEnumVal: function ($this,selector,attr,val) {
            var index = $('.'+selector).index($this);
            var val = !!val ? val : !!$($this).val() ? $($this).val() : '';

            var enumVal = $('.hasFocus2').attr(attr);
            if(!!enumVal) {
                var result = getArrayValues(enumVal,index,val);
                $('.hasFocus2').attr(attr,result);
            } else {
                $('.hasFocus2').attr(attr,val);
            }
        },
        initCalculation:function(selector){
            initPageCalculationHtml(selector);
        }
    };
}();
