//------------------公司信息----------------------//
// 公司信息页面公司基本信息点击编辑按钮
$(document).on('click','#company_edit_btn',function() {
    $(this).hide();
    $('#company_save_btn,#company_cancel_btn').show();
    $('.disabled').each(function() {
        $(this).removeClass('disabled').attr({
            'readonly': false,
            'disabled': false
        });
    });
});

// 公司信息页面公司基本信息编辑后点击保存按钮
$(document).on('click','#company_save_btn',function() {
    $('#company_edit_btn').show();
    $('#company_save_btn,#company_cancel_btn').hide();

    var companyCode = $('#company_code').val();
    var companyAbbr = $('#company_cusabbr').val();
    var companyLong = $('#company_fullname').val();
    var companyCodeCard = $('#company_society_code').val();
    var companyAddr = $('#company_address').val();
    var companyFax = $('#company_fax').val();
    var companyChargeman = $('#company_chargeman').val();
    var companyChargephone = $('#company_chargephone').val();
    var companySigndate = $('#company_signdate').val();
    var companyFinancePhone = $('#company_financemanphone').val();
    var companyTicketname = $('#company_ticket_name').val();
    var companyRemark = $('#company_remark').val();
    var companyType = '';
    $('input[name="company-state"]').each(function() {
        if( this.checked ) {
            companyType += (','+$(this).val());
        }
        $(this).addClass('disabled').attr('disabled',true);
    });

    var data = {
        '公司代码': companyCode,
        '公司简称': companyAbbr,
        '公司全称': companyLong,
        '社会信用代码证': companyCodeCard,
        '办公地址': companyAddr,
        '传真号码': companyFax,
        '企业负责人': companyChargeman,
        '负责人联系电话': companyChargephone,
        '注册日期': companySigndate,
        '财务联系人及联系电话': companyFinancePhone,
        '开票抬头': companyTicketname,
        '备注': companyRemark,
        '公司类型': companyType
    };

    alert(JSON.stringify(data));

    $('.company-edit').each(function() {
        $(this).addClass('disabled').attr('readonly', true);
    });
});

// 公司信息页面公司基本信息编辑后点击取消按钮
$(document).on('click','#company_cancel_btn',function() {
    $('#company_edit_btn').show();
    $('#company_save_btn,#company_cancel_btn').hide();
    $('.company-edit').each(function() {
        $(this).addClass('disabled').attr('readonly', true);
    });
    $('input[name="company-state"]').each(function() {
        $(this).addClass('disabled').attr('disabled',true);
    });
});

// 公司信息点击添加按钮弹出添加账户模态框
$(document).on('click','#company_account_add_btn',function() {
    $('.mask').show();
    $('#company_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);
    $('#company_new_overlay_header').text('添加账户');
});

// 添加模态框点击保存按钮
$(document).on('click','#company_new_save',function() {
    var bankType = $('#company_new_banktype').val(),
        bankState = $('#company_new_bankstate').val(),
        account = $('#company_new_account').val(),
        bank = $('#company_new_bank').val(),
        remark = $('#company_new_remark').val();

    if( bankType && bankState && account && bank ) {
        var data = {
            '类型': bankType,
            '状态': bankState,
            '账户': account,
            '开户行': bank,
            '备注': remark
        };

        alert(JSON.stringify(data));
    }else {
        popalert_show_hide('请填写所有带*的必填信息');
    }
});

// 公司信息页面账户管理点击编辑按钮
$(document).on('click','#company_account_edit_btn',function() {
    var companyTable = $('table[grid-manager="company_table"]');
    var checked = companyTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('#company_new_overlay').show().animate({
            'margin-top': '0',
            'opacity': '1'
        },400);
        $('#company_new_overlay_header').text('编辑账户');
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 公司信息点击删除按钮
$(document).on('click','#account_account_del_btn',function() {
    var companyTable = $('table[grid-manager="company_table"]');
    var checked = companyTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 公司信息删除模态框点击删除按钮
$(document).on('click','#company_del_confirm',function() {
    var companyTable = $('table[grid-manager="company_table"]');
    var checked = companyTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    companyTable.GM('refreshGrid');
});

// 公司信息页面删除模态框点击取消按钮
$(document).on('click','#company_del_cancel',function() {
    close_delete_modal();
    var companyTable = $('table[grid-manager="company_table"]');
    companyTable.GM('refreshGrid');
});

//-----------------------汇款记录--------------------------//
// 汇款记录页面点击添加按钮弹出模态框
$(document).on('click','#remit_add_btn',function() {
    $('.mask').show();
    $('#remit_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);
    $('#remit_new_overlay_header').text('添加记录');
});

// 汇款记录添加模态框点击保存按钮
$(document).on('click','#remit_new_save',function() {
    var sum = parseInt($('#remit_new_price').val()),
        date = $('#remit_new_date').val(),
        account = $('#remit_new_account').val(),
        person = $('#remit_new_person').val(),
        ticket = $('#remit_new_ticket').val(),
        state = $('#remit_new_state').val(),
        remark = $('#remit_new_remark').val();

    if( sum && date && account && person && ticket && state ) {
        if( sum >= 0) {
            var data = {
                '金额': sum,
                '汇款时间': date,
                '汇款账号': account,
                '汇款人': person,
                '汇款单据': ticket,
                '状态': state,
                '备注': remark
            };

            alert(JSON.stringify(data));
        }else {
            popalert_show_hide('请规范填写金额数字');
        }
    }else {
        popalert_show_hide('请填写所有带*的信息');
    }
});

// 汇款记录页面点击编辑按钮
$(document).on('click','#remit_edit_btn',function() {
    var remitTable = $('table[grid-manager="remit_table"]');
    var checked = remitTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('#remit_new_overlay').show().animate({
            'margin-top': '0',
            'opacity': '1'
        },400);
        $('#remit_new_overlay_header').text('编辑记录');
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 汇款记录页面点击删除按钮
$(document).on('click','#remit_del_btn',function() {
    var remitTable = $('table[grid-manager="remit_table"]');
    var checked = remitTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 汇款记录删除模态框点击删除按钮
$(document).on('click','#remit_del_confirm',function() {
    var remitTable = $('table[grid-manager="remit_table"]');
    var checked = remitTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    remitTable.GM('refreshGrid');
});

// 汇款记录页面删除模态框点击取消按钮
$(document).on('click','#remit_del_cancel',function() {
    close_delete_modal();
    var remitTable = $('table[grid-manager="remit_table"]');
    remitTable.GM('refreshGrid');
});

//-------------------------客户管理---------------------------//

// 客户管理点击查询按钮
$(document).on('click','#customer_search_btn',function() {
    var cusabbr = $('#customer_cusabbr').val();
    var custype = $('#customer_type').val();

    var data = {
        '客户代码/简称': cusabbr,
        '客户类型': custype
    };
    alert(JSON.stringify(data));
});

// 客户管理页面点击添加按钮
$(document).on('click','#customer_add_btn',function() {
    $('.mask').show();
    $('#customer_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);
    $('#customer_new_overlay_header').text('添加客户');
});

// 汇款记录添加模态框点击保存按钮
$(document).on('click','#customer_new_save',function() {
    var cuscode = parseInt($('#customer_new_cuscode').val()),
        cusabbr = $('#customer_new_cusabbr').val(),
        ticket = $('#customer_new_ticket').val(),
        custype = $('#customer_new_custype').val(),
        chargeman = $('#customer_new_chargeman').val(),
        finance = $('#customer_new_finance').val(),
        address = $('#customer_new_addr').val(),
        fax = $('#customer_new_fax').val(),
        remark = $('#customer_new_remark').val();

    if( cuscode && cusabbr && ticket && custype && chargeman && finance ) {
        var data = {
            '客户代码': cuscode,
            '客户简称': cusabbr,
            '开票抬头': ticket,
            '客户类型': custype,
            '负责人信息': chargeman,
            '财务信息': finance,
            '办公地址': address,
            '传真': fax,
            '备注': remark
        };

        alert(JSON.stringify(data));
    }else {
        popalert_show_hide('请填写所有带*的信息');
    }
});

// 客户管理页面点击编辑按钮
$(document).on('click','#customer_edit_btn',function() {
    var customerTable = $('table[grid-manager="customer_table"]');
    var checked = customerTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('#customer_new_overlay').show().animate({
            'margin-top': '0',
            'opacity': '1'
        },400);
        $('#customer_new_overlay_header').text('编辑客户');
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 客户管理页面点击删除按钮
$(document).on('click','#customer_del_btn',function() {
    var customerTable = $('table[grid-manager="customer_table"]');
    var checked = customerTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 客户管理删除模态框点击删除按钮
$(document).on('click','#customer_del_confirm',function() {
    var customerTable = $('table[grid-manager="customer_table"]');
    var checked = customerTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    customerTable.GM('refreshGrid');
});

// 客户管理页面删除模态框点击取消按钮
$(document).on('click','#customer_del_cancel',function() {
    close_delete_modal();
    var customerTable = $('table[grid-manager="customer_table"]');
    customerTable.GM('refreshGrid');
});

//-----------------------车辆管理--------------------------//

// 车辆管理页面点击查询按钮
$(document).on('click','#truck_search_btn',function() {
    var truckcode = $('#truck_code').val();
    var plateno = $('#truck_plateno').val();
    var fleetname = $('#truck_fleet').val();
    var driver = $('#truck_driver').val();
    var trucktype = $('#truck_type').val();

    var data = {
        '车辆编号': truckcode,
        '车牌号': plateno,
        '归属车队': fleetname,
        '驾驶员': driver,
        '车辆类型': trucktype
    };
    alert(JSON.stringify(data));
});

// 车辆管理页面点击添加按钮
$(document).on('click','#truck_add_btn',function() {
    $('.mask').show();
    $('#truck_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);
    $('#truck_new_overlay_header').text('添加车辆');
});

// 汇款记录添加模态框点击保存按钮
$(document).on('click','#truck_new_save',function() {
    var truckCode = parseInt($('#truck_new_code').val()),
        plateno = $('#truck_new_plateno').val(),
        fleet = $('#truck_new_fleet').val(),
        driver = $('#truck_new_driver').val(),
        truckType = $('#truck_new_trucktype').val(),
        hangCode = $('#truck_new_hangcode').val(),
        oilType = $('#truck_new_oiltype').val(),
        type = $('#truck_new_type').val(),
        weight = $('#truck_new_weight').val(),
        transport = $('#truck_new_transport').val(),
        ensureno = $('#truck_new_ensureno').val(),
        ensuredate = $('#truck_new_ensuredate').val(),
        yeardate = $('#truck_new_yeardate').val(),
        seasondate = $('#truck_new_seasondate').val(),
        remark = $('#truck_new_remark').val();

    if( truckCode && plateno && fleet && driver && truckType && hangCode && transport && ensureno ) {
        var data = {
            '车辆编号': truckCode,
            '车牌号': plateno,
            '归属车队': fleet,
            '当前驾驶司机': driver,
            '车辆类型': truckType,
            '挂车号': hangCode,
            '燃油类型': oilType,
            '车型': type,
            '载重（吨）': weight,
            '道路运输证': transport,
            '保险号': ensureno,
            '保险有效期': ensuredate,
            '年审有效期': yeardate,
            '季审有效期': seasondate,
            '备注':remark
        };

        alert(JSON.stringify(data));
    }else {
        popalert_show_hide('请填写所有带*的信息');
    }
});

// 车辆管理页面点击编辑按钮
$(document).on('click','#truck_edit_btn',function() {
    var truckTable = $('table[grid-manager="truck_table"]');
    var checked = truckTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('#truck_new_overlay').show().animate({
            'margin-top': '0',
            'opacity': '1'
        },400);
        $('#truck_new_overlay_header').text('编辑车辆');
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 车辆管理页面点击删除按钮
$(document).on('click','#truck_del_btn',function() {
    var truckTable = $('table[grid-manager="truck_table"]');
    var checked = truckTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 车辆管理删除模态框点击删除按钮
$(document).on('click','#truck_del_confirm',function() {
    var truckTable = $('table[grid-manager="truck_table"]');
    var checked = truckTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    truckTable.GM('refreshGrid');
});

// 车辆管理页面删除模态框点击取消按钮
$(document).on('click','#truck_del_cancel',function() {
    close_delete_modal();
    var truckTable = $('table[grid-manager="truck_table"]');
    truckTable.GM('refreshGrid');
});

//---------------------司机管理-----------------------//
// 司机管理页面点击查询按钮
$(document).on('click','#driver_search_btn',function() {
    var driver_code = $('#driver_code').val();
    var driver_name = $('#driver_name').val();
    var driver_phone = $('#driver_phone').val();
    var driver_fleet = $('#driver_fleet').val();
    var driver_type = $('#driver_type').val();

    var data = {
        '司机编号': driver_code,
        '司机姓名': driver_name,
        '手机号码': driver_phone,
        '归属车队': driver_fleet,
        '司机类型': driver_type
    };
    alert(JSON.stringify(data));
});

// 司机管理页面点击添加按钮
$(document).on('click','#driver_add_btn',function() {
    $('.mask').show();
    $('#driver_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);

    $('#driver_new_overlay_header').text('添加司机');

    $('#driver_calendar_indate').calendar({
        trigger: '#driver_new_indate',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#driver_new_indate').val(start);
        }
    });
    $('#driver_calendar_outdate').calendar({
        trigger: '#driver_new_outdate',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#driver_new_outdate').val(start);
        }
    });
});

// 汇款记录添加模态框点击保存按钮
$(document).on('click','#truck_new_save',function() {
    var driverCode = parseInt($('#driver_new_code').val()),
        driver = $('#driver_new_name').val(),
        phone = $('#driver_new_phone').val(),
        idcard = $('#driver_new_id').val(),
        fleet = $('#driver_new_fleet').val(),
        workstate = $('#driver_new_workstate').val(),
        indate = $('#driver_new_indate').val(),
        outdate = $('#driver_new_outdate').val(),
        card = $('#driver_new_card').val();

    if( driverCode && driver && phone && driver && fleet && workstate ) {
        var data = {
            '司机编号': driverCode,
            '司机姓名': driver,
            '手机号码': phone,
            '身份证号码': idcard,
            '归属车队': fleet,
            '从业状态': workstate,
            '入职日期': indate,
            '离职日期': outdate,
            '绑定卡号': card
        };

        alert(JSON.stringify(data));
    }else {
        popalert_show_hide('请填写所有带*的信息');
    }
});

// 司机管理页面点击编辑按钮
$(document).on('click','#driver_edit_btn',function() {
    var driverTable = $('table[grid-manager="driver_table"]');
    var checked = driverTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('#driver_new_overlay').show().animate({
            'margin-top': '0',
            'opacity': '1'
        },400);
        $('#driver_new_overlay_header').text('编辑司机');
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 司机管理页面点击删除按钮
$(document).on('click','#driver_del_btn',function() {
    var driverTable = $('table[grid-manager="driver_table"]');
    var checked = driverTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 司机管理删除模态框点击删除按钮
$(document).on('click','#driver_del_confirm',function() {
    var driverTable = $('table[grid-manager="driver_table"]');
    var checked = driverTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    driverTable.GM('refreshGrid');
});

// 司机管理页面删除模态框点击取消按钮
$(document).on('click','#driver_del_cancel',function() {
    close_delete_modal();
    var driverTable = $('table[grid-manager="driver_table"]');
    driverTable.GM('refreshGrid');
});

//----------------------线路维护-----------------------//
// 线路维护页面点击查询按钮
$(document).on('click','#route_search_btn',function() {
    var takecy = $('#route_takecy').val();
    var returncy = $('#route_returncy').val();

    var data = {
        '提箱点': takecy,
        '还箱点': returncy
    };
    alert(JSON.stringify(data));
});

// 线路维护页面点击添加按钮
$(document).on('click','#route_add_btn',function() {
    $('.mask').show();
    $('#route_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);

    $('#route_new_overlay_header').text('添加线路');
});

// 线路维护添加模态框点击保存按钮
$(document).on('click','#route_new_save',function() {
    var takecy = parseInt($('#route_new_takecy').val()),
        returncy = $('#route_new_returncy').val(),
        larget = $('#route_new_larget').val(),
        larpay = $('#route_new_larpay').val(),
        smaget = $('#route_new_smaget').val(),
        smapay = $('#route_new_smapay').val(),
        laroil = $('#route_new_laroil').val(),
        smaoil = $('#route_new_smaoil').val(),
        remark = $('#route_new_remark').val();

    if( takecy && returncy && larget && larpay && smaget && smapay && laroil && smaoil ) {
        var data = {
            '提箱点': takecy,
            '还箱点': returncy,
            '大箱应收运费': larget,
            '大箱应付运费': larpay,
            '小箱应收运费': smaget,
            '小箱应付运费': smapay,
            '大箱标准油': laroil,
            '小箱标准油': smaoil,
            '备注': remark
        };

        alert(JSON.stringify(data));
    }else {
        popalert_show_hide('请填写所有带*的信息');
    }
});

// 线路维护页面点击编辑按钮
$(document).on('click','#route_edit_btn',function() {
    var routeTable = $('table[grid-manager="route_table"]');
    var checked = routeTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('#route_new_overlay').show().animate({
            'margin-top': '0',
            'opacity': '1'
        },400);
        $('#route_new_overlay_header').text('编辑线路');
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 线路维护页面点击删除按钮
$(document).on('click','#route_del_btn',function() {
    var routeTable = $('table[grid-manager="route_table"]');
    var checked = routeTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 线路维护删除模态框点击删除按钮
$(document).on('click','#route_del_confirm',function() {
    var routeTable = $('table[grid-manager="route_table"]');
    var checked = routeTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    routeTable.GM('refreshGrid');
});

// 线路维护页面删除模态框点击取消按钮
$(document).on('click','#route_del_cancel',function() {
    close_delete_modal();
    var routeTable = $('table[grid-manager="route_table"]');
    routeTable.GM('refreshGrid');
});

//----------------------参数设置-----------------------//
// 参数设置页面点击添加按钮
$(document).on('click','#setting_add_btn',function() {
    $('.mask').show();
    $('#setting_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);

    $('#setting_new_overlay_header').text('添加参数');

    $('#setting_calendar_date1').calendar({
        trigger: '#setting_new_date1',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#setting_new_date1').val(start);
        },
        onClose: function(view, date, data) {}
    });

    $('#setting_calendar_date2').calendar({
        trigger: '#setting_new_date2',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#setting_new_date2').val(start);
        },
        onClose: function(view, date, data) {}
    });
});

// 参数设置添加模态框点击保存按钮
$(document).on('click','#setting_new_save',function() {
    var price = parseInt($('#setting_new_price').val()),
        oiltype = $('#setting_new_oiltype').val(),
        date1 = $('#setting_new_date1').val(),
        date2 = $('#setting_new_date2').val();

    if( price && oiltype && date1 && date2 ) {
        if( price > 0 ) {
            var data = {
                '单价': price,
                '燃气类型': oiltype,
                '开始时间': date1,
                '结束时间': date2
            };

            alert(JSON.stringify(data));
        }else {
            popalert_show_hide('请规范填写单价');
        }
    }else {
        popalert_show_hide('请填写所有带*的信息');
    }
});

// 参数设置页面点击编辑按钮
$(document).on('click','#setting_edit_btn',function() {
    var settingTable = $('table[grid-manager="setting_table"]');
    var checked = settingTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('#setting_new_overlay').show().animate({
            'margin-top': '0',
            'opacity': '1'
        },400);

        $('#setting_new_overlay_header').text('编辑参数');
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 参数设置页面点击删除按钮
$(document).on('click','#setting_del_btn',function() {
    var settingTable = $('table[grid-manager="setting_table"]');
    var checked = settingTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 参数设置删除模态框点击删除按钮
$(document).on('click','#setting_del_confirm',function() {
    var settingTable = $('table[grid-manager="setting_table"]');
    var checked = settingTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    settingTable.GM('refreshGrid');
});

// 参数设置页面删除模态框点击取消按钮
$(document).on('click','#setting_del_cancel',function() {
    close_delete_modal();
    var settingTable = $('table[grid-manager="setting_table"]');
    settingTable.GM('refreshGrid');
});

//----------------------公共方法-----------------------//
// 关闭添加模态框函数
function close_new_order_modal() {
    $('.mask').fadeOut();
    $('.overlay').animate({
        'margin-top': '-30px',
        'opacity': '0'
    },400).fadeOut();
}

// 关闭删除模态框函数
function close_delete_modal() {
    $('.delete-overlay').animate({
        'margin-top': '-30px',
        'opacity': '0'
    },400).fadeOut();
    $('.mask').fadeOut();
}

// 模态警告框出现后消失
function popalert_show_hide(txt) {
    $('.pop-alert').hide().text(txt).stop().show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);
    setTimeout(function() {
        $('.pop-alert').stop().animate({
            'margin-top': '-30px',
            'opacity': '0'
        }).fadeOut();
    },3000);
}

// 存放页面加载函数
function loadData(index) {
    if(index == 0) {
        loadCompany();
    }else if(index == 1) {
        loadRemit();
    }else if(index == 2) {
        loadCustomer();
    }else if(index == 3) {
        loadTruck();
    }else if(index == 4) {
        loadDriver();
    }else if(index == 5) {
        loadRoute();
    }else if(index == 6) {
        loadSetting();
    }
}

// 加载公司信息页面函数
function loadCompany() {
    $('.disabled:not(.company-state)').each(function() {
        $(this).val('测试信息');
    });

    // 公司信息表格加载
    var companyTable = $('table[grid-manager="company_table"]');
    companyTable.GM({
        width: 'auto',
        height: '65vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'type', text: '类型'},
            {key: 'state', text: '状态'},
            {key: 'class', text: '账户'},
            {key: 'boxtype', text: '开户行'},
            {key: 'boxamt', text: '备注'},
            {key: 'price', text: '创建人'},
            {key: 'sum', text: '创建时间'}
        ]
    });
}

// 加载汇款记录页面函数
function loadRemit() {
    // 汇款记录表格加载
    var remitTable = $('table[grid-manager="remit_table"]');
    remitTable.GM({
        width: 'auto',
        height: '93vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'type', text: '金额（元）'},
            {key: 'state', text: '汇款时间'},
            {key: 'class', text: '汇款账号'},
            {key: 'boxtype', text: '汇款人'},
            {key: 'boxamt', text: '汇款单据'},
            {key: 'price', text: '状态'},
            {key: 'sum', text: '录入时间'},
            {key: 'fax', text: '审核时间'},
            {key: 'remark', text: '备注'}
        ]
    });
}

// 加载客户管理页面函数
function loadCustomer() {
    // 客户管理表格加载
    var customerTable = $('table[grid-manager="customer_table"]');
    customerTable.GM({
        width: 'auto',
        height: '90vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'type', text: '客户代码'},
            {key: 'state', text: '客户简称'},
            {key: 'class', text: '开票抬头'},
            {key: 'boxtype', text: '客户类型'},
            {key: 'boxamt', text: '负责人信息'},
            {key: 'price', text: '财务信息'},
            {key: 'sum', text: '办公地址'},
            {key: 'fax', text: '传真'},
            {key: 'remark', text: '备注'},
            {key: 'time', text: '创建时间'},
            {key: 'person', text: '创建人'},
            {key: 'edit_time', text: '修改时间'},
            {key: 'edit_person', text: '修改人'}
        ]
    });
}

// 加载车辆管理页面函数
function loadTruck() {
    // 车辆管理表格加载
    var truckTable = $('table[grid-manager="truck_table"]');
    truckTable.GM({
        width: 'auto',
        height: '90vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'type', text: '车辆编号'},
            {key: 'state', text: '车牌号'},
            {key: 'class', text: '归属车队'},
            {key: 'box_type', text: '当前驾驶司机'},
            {key: 'box_amt', text: '车辆类型'},
            {key: 'price', text: '挂车号'},
            {key: 'sum', text: '燃油类型'},
            {key: 'fax', text: '车型'},
            {key: 'weight', text: '载重（吨）'},
            {key: 'time1', text: '道路运输证'},
            {key: 'person', text: '保险号'},
            {key: 'time2', text: '保险有效期'},
            {key: 'year', text: '年审有效期'},
            {key: 'season', text: '季审有效期'},
            {key: 'remark', text: '备注'},
            {key: 'create_time', text: '创建时间'},
            {key: 'create_person', text: '创建人'},
            {key: 'edit_time', text: '修改时间'},
            {key: 'edit_person', text: '修改人'}
        ]
    });
}

// 加载司机管理页面函数
function loadDriver() {
    // 司机管理表格加载
    var driverTable = $('table[grid-manager="driver_table"]');
    driverTable.GM({
        width: 'auto',
        height: '90vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'type', text: '司机编号'},
            {key: 'state', text: '司机姓名'},
            {key: 'class', text: '手机号码'},
            {key: 'box_type', text: '身份证号码'},
            {key: 'box_amt', text: '归属车队'},
            {key: 'price', text: '从业状态'},
            {key: 'sum', text: '入职日期'},
            {key: 'fax', text: '离职日期'},
            {key: 'weight', text: '绑定卡号'},
            {key: 'time', text: '备注'}
        ]
    });
}

// 加载线路维护页面函数
function loadRoute() {
    // 线路维护表格加载
    var routeTable = $('table[grid-manager="route_table"]');
    routeTable.GM({
        width: 'auto',
        height: '94vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'type', text: '提箱点'},
            {key: 'state', text: '还箱点'},
            {key: 'class', text: '大箱应收运费（元）'},
            {key: 'box_type', text: '大箱应付运费（元）'},
            {key: 'box_amt', text: '小箱应收运费（元）'},
            {key: 'price', text: '小箱应付运费（元）'},
            {key: 'sum', text: '大箱标准油（L）'},
            {key: 'fax', text: '小箱标准油（L）'},
            {key: 'remark', text: '备注'}
        ]
    });
}

// 加载参数设置页面函数
function loadSetting() {
    // 参数设置表格加载
    var settingTable = $('table[grid-manager="setting_table"]');
    settingTable.GM({
        width: 'auto',
        height: '98vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'type', text: '单价（元）'},
            {key: 'state', text: '燃气类型'},
            {key: 'class', text: '开始时间'},
            {key: 'box_type', text: '结束时间'},
            {key: 'box_amt', text: '创建日期'},
            {key: 'price', text: '创建人'},
            {key: 'sum', text: '是否生效'}
        ]
    });
}