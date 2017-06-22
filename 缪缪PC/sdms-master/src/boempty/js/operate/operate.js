var tabs_index = 0;  // 记录tabs的下标值
var search_date = new Date(),
    search_year = search_date.getFullYear(),
    search_month = (search_date.getMonth()+1)<10?'0'+(search_date.getMonth()+1):search_date.getMonth()+1,
    search_day = search_date.getDate();

// 今天日期
var today_date = search_year+'-'+search_month+'-'+search_day;

// 一周前日期
var week_date = new Date(search_date - 7 * 24 * 3600 * 1000),
    week_year = week_date.getFullYear(),
    week_month = (week_date.getMonth()+1)<10?'0'+(week_date.getMonth()+1):(week_date.getMonth()+1),
    week_day = (week_date.getDate())<10?'0'+week_date.getDate():week_date.getDate();
var week_ago_date = week_year+'-'+week_month+'-'+week_day;

// 一月前日期
search_date.setMonth(search_date.getMonth() - 1);
var month_year = search_date.getFullYear(),
    month_month = (search_date.getMonth()+1)<10?'0'+(search_date.getMonth()+1):(search_date.getMonth()+1),
    month_day = (search_date.getDate())<10?'0'+search_date.getDate():search_date.getDate();
var month_ago_date = month_year + '-' + month_month + '-' + month_day;

//---------------------首页广告-----------------------//
// 首页广告页面点击添加按钮
$(document).on('click','#ad_add_btn',function() {
    $('#ad_header').text('添加广告');
    show_ad_modal();
});

// 首页广告页面点击编辑按钮
$(document).on('click','#ad_edit_btn',function() {
    var adTable = $('table[grid-manager="ad_table"]');
    var checked = adTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('#ad_header').text('编辑广告');
        var data = {
            'title': '测试标题1'
        };
        show_ad_modal(data);
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 添加编辑广告模态框点击保存按钮
$(document).on('click','#ad_confirm',function() {
    var adTitle = $('#ad_title').val();
    if( adTitle ) {
        hide_ad_modal();
        var adTable = $('table[grid-manager="ad_table"]');
        adTable.GM('refreshGrid');
    } else {
        popalert_show_hide('请先填写广告标题');
    }
});

// 添加编辑广告模态框点击取消按钮
$(document).on('click','#ad_cancel',function() {
    hide_ad_modal();
});

// 首页广告页面点击删除按钮
$(document).on('click','#ad_del_btn',function() {
    var adTable = $('table[grid-manager="ad_table"]');
    var checked = adTable.GM('getCheckedTr');
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

// 首页广告删除模态框点击删除按钮
$(document).on('click','#ad_del_confirm',function() {
    var adTable = $('table[grid-manager="ad_table"]');
    var checked = adTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    adTable.GM('refreshGrid');
});

// 首页广告页面删除模态框点击取消按钮
$(document).on('click','#ad_del_cancel',function() {
    close_delete_modal();
    var adTable = $('table[grid-manager="ad_table"]');
    adTable.GM('refreshGrid');
});

//---------------------消息推送-----------------------//
// 消息推送页面点击添加按钮
$(document).on('click','#msg_add_btn',function() {
    $('#msg_header').text('添加消息');
    show_msg_modal();
});

// 消息推送页面点击编辑按钮
$(document).on('click','#msg_edit_btn',function() {
    var msgTable = $('table[grid-manager="msg_table"]');
    var checked = msgTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('#msg_header').text('编辑消息');
        var data = {
            'title': '测试标题1',
            'remark': '测试内容1'
        };
        show_msg_modal(data);
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 添加编辑消息模态框点击保存按钮
$(document).on('click','#msg_confirm',function() {
    var msgTitle = $('#msg_title').val();
    var msgRemark = $('#msg_remark').val();
    if( msgTitle && msgRemark ) {
        hide_msg_modal();
        var msgTable = $('table[grid-manager="msg_table"]');
        msgTable.GM('refreshGrid');
    } else if( !msgTitle ) {
        popalert_show_hide('请先填写消息标题');
    } else if( !msgRemark ) {
        popalert_show_hide('请先填写消息内容');
    }
});

// 添加编辑消息模态框点击取消按钮
$(document).on('click','#msg_cancel',function() {
    hide_msg_modal();
});

// 消息推送页面点击删除按钮
$(document).on('click','#msg_del_btn',function() {
    var msgTable = $('table[grid-manager="msg_table"]');
    var checked = msgTable.GM('getCheckedTr');
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

// 消息推送删除模态框点击删除按钮
$(document).on('click','#msg_del_confirm',function() {
    var msgTable = $('table[grid-manager="msg_table"]');
    var checked = msgTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    msgTable.GM('refreshGrid');
});

// 消息推送页面删除模态框点击取消按钮
$(document).on('click','#msg_del_cancel',function() {
    close_delete_modal();
    var msgTable = $('table[grid-manager="msg_table"]');
    msgTable.GM('refreshGrid');
});

// 消息推送页面点击发送按钮
$(document).on('click','#msg_send_btn',function() {
    var msgTable = $('table[grid-manager="msg_table"]');
    var checked = msgTable.GM('getCheckedTr');
    if(checked.length > 0) {
        var checkedId = [];
        for( var i = 0 ; i < checked.length ; i++ ) {
            checkedId.push(checked[i].cells[2].innerHTML);
        }
        alert( '当前发送条数' + checkedId.length + '，发送消息的ID为' + checkedId );
    }else {
        popalert_show_hide('请先选择要发送的数据');
    }
});

//---------------------服务商管理-----------------------//
// tabs切换
$(document).on('click','.tabs li',function() {
    hide_tab_panel(tabs_index);
    tabs_index = $(this).index();
    setTimeout(function() {
        change_tab(tabs_index);
        change_panel(tabs_index);

        var serviceTable = $('table[grid-manager="service_table"]');
        var checkTable = $('table[grid-manager="check_table"]');
        if ( tabs_index == 0 ) {
            serviceTable[0].childNodes.length > 0 ? serviceTable.GM('refreshGrid') : loadServiceTable();
        } else if( tabs_index == 1 ) {
            checkTable[0].childNodes.length > 0 ? checkTable.GM('refreshGrid') : loadCheckTable();
        }
    },100);
});
// 服务商管理页面服务商信息子菜单点击查询按钮
$(document).on('click','#service_search_btn',function() {
    var serviceCode = $('#service_code').val();
    var serviceCusabbr = $('#service_cusabbr').val();
    var serviceCodeCard = $('#service_code_card').val();
    var servicePhone = $('#service_charge_phone').val();
    var serviceDate1 = $('#service_date_start').val();
    var serviceDate2 = $('#service_date_end').val();

    var data = {
        '企业代码': serviceCode,
        '企业简称': serviceCusabbr,
        '社会信用代码证': serviceCodeCard,
        '负责人电话': servicePhone,
        '注册开始时间': serviceDate1,
        '注册结束时间': serviceDate2
    };

    alert(JSON.stringify(data));
});

// 服务商管理页面服务商信息子菜单点击添加按钮
$(document).on('click','#service_add_btn',function() {
    $('.mask').show();
    $('#service_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);

    $('#service_new_overlay_header').text('添加服务商');

    $('#service_calendar_signdate').calendar({
        trigger: '#service_new_signdate',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#service_new_signdate').val(start);
        },
        onClose: function(view, date, data) {}
    });
});

// 参数设置添加模态框点击保存按钮
$(document).on('click','#dictionary_new_save',function() {
    var servcode = $('#service_new_servcode').val(),
        servname = $('#service_new_servname').val(),
        servabbr = $('#service_new_servabbr').val(),
        servcard = $('#service_new_servcard').val(),
        servsum  = parseInt($('#service_new_sum').val()),
        signtype  = $('#service_new_signtype').val(),
        servaddr  = $('#service_new_addr').val(),
        servfax  = $('#service_new_fax').val(),
        chargeman  = $('#service_new_chargeman').val(),
        chargephone  = $('#service_new_chargephone').val(),
        signdate  = $('#service_new_signdate').val(),
        ticket  = $('#service_new_ticket').val(),
        finance  = $('#service_new_finance').val(),
        state  = $('#service_new_state').val(),
        remark  = $('#service_new_remark').val();

    if( servcode && servname && servabbr && servcard && signtype && ticket && state ) {
        var data = {
            '企业代码': servcode,
            '全称': servname,
            '简称': servabbr,
            '社会信用代码证': servcard,
            '账户余额': servsum,
            '注册类型': signtype,
            '办公地址': servaddr,
            '传真号码': servfax,
            '企业负责人': chargeman,
            '负责人电话': chargephone,
            '注册日期': signdate,
            '开票抬头': ticket,
            '财务联系人及电话': finance,
            '状态': state,
            '备注': remark
        };
        alert(JSON.stringify(data));
    }else {
        popalert_show_hide('请填写所有带*的信息');
    }
});

// 服务商管理页面服务商信息子菜单点击编辑按钮
$(document).on('click','#service_edit_btn',function() {
    var serviceTable = $('table[grid-manager="service_table"]');
    var checked = serviceTable.GM('getCheckedTr');
    if( checked.length > 0 ) {
        $('.mask').show();
        $('#service_new_overlay').show().animate({
            'margin-top': '0',
            'opacity': '1'
        },400);

        $('#service_new_overlay_header').text('编辑服务商');
    } else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 服务商管理页面服务商信息子菜单点击删除按钮
$(document).on('click','#service_del_btn',function() {
    var serviceTable = $('table[grid-manager="service_table"]');
    var checked = serviceTable.GM('getCheckedTr');
    if( checked.length > 0 ) {
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    } else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 服务商管理页面服务商信息子菜单点击查看详情按钮
$(document).on('click','#service_check_btn',function() {
    var serviceTable = $('table[grid-manager="service_table"]');
    var checked = serviceTable.GM('getCheckedTr');
    if( checked.length > 0 ) {
        var checkId = checked[0].cells[2].innerHTML;
        $('.mask').show();
        $('#service_check_overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
        loadServiceCheckInfo(checkId);
        var accountTable = $('table[grid-manager="account_table"]');
        var remitTable = $('table[grid-manager="remit_table"]');
        if(accountTable[0].childNodes.length > 0 || remitTable[0].childNodes.length > 0) {
            accountTable.GM('refreshGrid');
            remitTable.GM('refreshGrid');
        } else {
            loadCompanyTable();
        }
    } else {
        popalert_show_hide('请先选择要查看的数据');
    }
});

// 服务商管理页面服务商信息子菜单查看详情模态框载入详情函数
function loadServiceCheckInfo(id) {
    $('#service_check_header').text('ID为['+id+']的详细信息');
}

// 服务商管理页面服务商信息子菜单查看详情模态框点击关闭按钮
$(document).on('click','#service_check_close',function() {
    $('.mask').hide();
    $('#service_check_overlay').animate({
        'margin-top': '-30px',
        'opacity': '0'
    },400).fadeOut();
});

// 服务商管理页面汇款审核子菜单点击查询按钮
$(document).on('click','#check_search_btn',function() {
    var checkUnit = $('#check_unit').val();
    var checkDate1 = $('#check_date_start').val();
    var checkDate2 = $('#check_date_end').val();

    var data = {
        '汇款单位': checkUnit,
        '开始日期': checkDate1,
        '结束日期': checkDate2
    };

    alert(JSON.stringify(data));
});

// 服务商管理页面汇款审核子菜单点击添加按钮
$(document).on('click','#check_add_btn',function() {
    $('.mask').show();
    $('#check_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);

    $('#check_new_overlay_header').text('添加汇款记录');

    $('#check_calendar_date').calendar({
        trigger: '#check_new_date',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#check_new_date').val(start);
        }
    });
});

// 参数设置添加模态框点击保存按钮
$(document).on('click','#check_new_save',function() {
    var unit = $('#check_new_unit').val(),
        price = parseInt($('#check_new_price').val()),
        date = $('#check_new_date').val(),
        account = $('#check_new_account').val(),
        person  = $('#check_new_person').val(),
        ticket  = $('#check_new_ticket').val(),
        state  = $('#check_new_state').val(),
        remark  = $('#check_new_remark').val();

    if( unit && price && date && account && person && ticket && state ) {
        if( price > 0 ) {
            var data = {
                '汇款单位': unit,
                '金额': price,
                '汇款时间': date,
                '汇款账号': account,
                '汇款人': person,
                '汇款单据': ticket,
                '状态': state,
                '备注': remark
            };
            alert(JSON.stringify(data));
        } else {
            popalert_show_hide('请规范填写金额数字');
        }
    }else {
        popalert_show_hide('请填写所有带*的信息');
    }
});

// 服务商管理页面汇款审核子菜单点击编辑按钮
$(document).on('click','#check_edit_btn',function() {
    var checkTable = $('table[grid-manager="check_table"]');
    var checked = checkTable.GM('getCheckedTr');
    if( checked.length > 0 ) {
        $('.mask').show();
        $('#check_new_overlay').show().animate({
            'margin-top': '0',
            'opacity': '1'
        },400);

        $('#check_new_overlay_header').text('编辑汇款记录');
    } else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 服务商管理页面汇款审核子菜单点击删除按钮
$(document).on('click','#check_del_btn',function() {
    var checkTable = $('table[grid-manager="check_table"]');
    var checked = checkTable.GM('getCheckedTr');
    if( checked.length > 0 ) {
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    } else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 服务商管理页面汇款审核子菜单删除模态框点击删除按钮
$(document).on('click','#check_del_confirm',function() {
    var serviceTable = $('table[grid-manager="service_table"]');
    var checkTable = $('table[grid-manager="check_table"]');
    var checked = null;
    var checkedId = [];

    var index = $('.tabs li.active').index();
    if( index == 0 ) {
        checked = serviceTable.GM('getCheckedTr');
        for( var i = 0 ; i < checked.length ; i++ ) {
            checkedId.push(checked[i].cells[2].innerHTML);
        }
        alert('当前删除数据ID为：'+checkedId);
        close_delete_modal();
        serviceTable.GM('refreshGrid');
    }else if( index == 2 ) {
        checked = checkTable.GM('getCheckedTr');
        for( var i = 0 ; i < checked.length ; i++ ) {
            checkedId.push(checked[i].cells[2].innerHTML);
        }
        alert('当前删除数据ID为：'+checkedId);
        close_delete_modal();
        checkTable.GM('refreshGrid');
    }
});

// 服务商管理页面汇款审核子菜单删除模态框点击取消按钮
$(document).on('click','#check_del_cancel',function() {
    close_delete_modal();
    var checkTable = $('table[grid-manager="check_table"]');
    checkTable.GM('refreshGrid');
});

// 服务商管理页面汇款审核子菜单点击审核按钮
$(document).on('click','#check_check_btn',function() {
    var checkTable = $('table[grid-manager="check_table"]');
    var checked = checkTable.GM('getCheckedTr');
    if( checked.length > 0 ) {
        var checkedId = [];
        for( var i = 0 ; i < checked.length ; i++ ) {
            checkedId.push(checked[i].cells[2].innerHTML);
        }
        alert( '当前审核数据的ID为：' + checkedId );
    } else {
        popalert_show_hide('请先选择要审核的数据');
    }
});

//---------------------统计分析-----------------------//
// 统计分析页面切换一周前或一月前日期
$(document).on('click','input[name="statistics-time-range"]',function() {
    var time_range = $(this).val();
    if(time_range == '一周前') {
        $('#statistics_date_start').val(week_ago_date);
    }else if(time_range == '一月前') {
        $('#statistics_date_start').val(month_ago_date);
    }
});

// 统计分析页面点击查询按钮
$(document).on('click','#statistics_search_btn',function() {
    var transportProvider = $('#statistics_transport_provider').val();
    var delegateUnit = $('#statistics_delegate_unit').val();
    var truckInfo = $('#statistics_truck_info').val();
    var driver = $('#statistics_driver').val();
    var boxBelonger = $('#statistics_box_belonger').val();
    var searchTimeStart = $('#statistics_date_start').val();
    var searchTimeEnd = $('#statistics_date_end').val();
    var reservationNum = $('#reservation_num').val();
    var takeBox = $('#take_box').val();
    var returnBox = $('#return_box').val();
    var takeno = $('#box_number').val();
    var searchState = '';
    $('input[name="statistics-state"]').each(function() {
        if(this.checked) {
            searchState += (','+$(this).val());
        }
    });
    var data = {
        '承运商': transportProvider,
        '委托单位': delegateUnit,
        '车辆信息': truckInfo,
        '承运司机': driver,
        '箱属': boxBelonger,
        '开始时间': searchTimeStart,
        '结束时间': searchTimeEnd,
        '预约号': reservationNum,
        '提箱点': takeBox,
        '还箱点': returnBox,
        '箱号': takeno,
        '箱单状态': searchState
    };
    alert(JSON.stringify(data));
});

//----------------------公共函数-------------------------//
// 关闭添加模态框函数
function close_new_order_modal() {
    $('.mask').fadeOut();
    $('.overlay').animate({
        'margin-top': '-30px',
        'opacity': '0'
    },400).fadeOut();
}

// 广告模态框出现
function show_ad_modal(data) {
    $('.mask').show();
    $('#ad_overlay').animate({
        'margin-top': '0',
        'opacity': '1'
    },400).show();
    if( data ) {
        $('#ad_title').val(data.title);
    }else {
        $('#ad_title').val('');
    }
}

// 广告模态框消失
function hide_ad_modal() {
    $('.mask').hide();
    $('#ad_overlay').animate({
        'margin-top': '-30px',
        'opacity': '0'
    },400).fadeOut();
}

// 消息模态框出现
function show_msg_modal(data) {
    $('.mask').show();
    $('#msg_overlay').animate({
        'margin-top': '0',
        'opacity': '1'
    },400).show();
    if( data ) {
        $('#msg_title').val(data.title);
        $('#msg_remark').val(data.remark);
    }else {
        $('#msg_title').val('');
        $('#msg_remark').val('');
    }
}

// 消息模态框消失
function hide_msg_modal() {
    $('.mask').hide();
    $('#msg_overlay').animate({
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
function loadData( index ) {
    if( index == 0 ) {
        loadAd();
    }else if( index == 1 ) {
        loadMessage();
    }else if( index == 2 ) {
        loadService();
    }else if( index == 3 ) {
        loadStatistics();
    }
}

// 加载首页广告页面函数
function loadAd() {
    // 首页广告表格加载
    var adTable = $('table[grid-manager="ad_table"]');
    adTable.GM({
        width: 'auto',
        height: '98vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'state', text: '显示顺序'},
            {key: 'class', text: '标题'},
            {key: 'boxtype', text: '图片'},
            {key: 'boxamt', text: '是否有效'},
            {key: 'price', text: '创建时间'},
            {key: 'sum', text: '创建人'}
        ]
    });
}

// 加载消息推送页面函数
function loadMessage() {
    // 消息推送表格加载
    var msgTable = $('table[grid-manager="msg_table"]');
    msgTable.GM({
        width: 'auto',
        height: '94vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'class', text: '标题'},
            {key: 'boxtype', text: '内容'},
            {key: 'boxamt', text: '发送时间'},
            {key: 'price', text: '创建时间'},
            {key: 'sum', text: '创建人'}
        ]
    });
}

// 加载服务商管理页面函数
function loadService() {
    $('#check_date_start').val(today_date);

    $('#service_date_start').val(today_date);

    $('#service_calendar_start').calendar({
        trigger: '#service_date_start',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#service_date_start').val(start);
        },
        onClose: function(view, date, data) {}
    });

    $('#service_calendar_end').calendar({
        trigger: '#service_date_end',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var end = date.format('yyyy-mm-dd');
            $('#service_date_end').val(end);
        },
        onClose: function(view, date, data) {}
    });

    $('#check_calendar_start').calendar({
        trigger: '#check_date_start',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#check_date_start').val(start);
        },
        onClose: function(view, date, data) {}
    });

    $('#check_calendar_end').calendar({
        trigger: '#check_date_end',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var end = date.format('yyyy-mm-dd');
            $('#check_date_end').val(end);
        },
        onClose: function(view, date, data) {}
    });
    change_tab(tabs_index);
    change_panel(tabs_index);
    if( tabs_index == 0 ) {
        loadServiceTable();
    } else if( tabs_index == 1 ) {
        //loadCompanyTable();
        loadCheckTable();
    }
}

// 加载服务商管理的服务商信息表格函数
function loadServiceTable() {
    var serviceTable = $('table[grid-manager="service_table"]');
    serviceTable.GM({
        width: 'auto',
        height: '82vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        supportCheckbox: true,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'ID'},
            {key: 'boxtype', text: '企业代码'},
            {key: 'boxamt', text: '全称'},
            {key: 'price', text: '简称'},
            {key: 'sum', text: '社会信用代码证'},
            {key: 'amount', text: '账户余额（元）'},
            {key: 'signtype', text: '注册类型'},
            {key: 'addr', text: '办公地址'},
            {key: 'fax', text: '传真号码'},
            {key: 'chargeman', text: '企业负责人'},
            {key: 'phone', text: '负责人电话'},
            {key: 'date', text: '注册日期'},
            {key: 'ticket', text: '开票抬头'},
            {key: 'finance', text: '财务联系人及电话'},
            {key: 'status', text: '状态'},
            {key: 'time1', text: '创建时间'},
            {key: 'person1', text: '创建人'},
            {key: 'time2', text: '修改时间'},
            {key: 'person2', text: '修改人'},
            {key: 'remark', text: '备注'}
        ]
    });
}

// 加载服务商管理下的企业信息两个表格函数
function loadCompanyTable() {
    var accountTable = $('table[grid-manager="account_table"]');
    accountTable.GM({
        width: 'auto',
        height: '38vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: false,
        supportCheckbox: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'class', text: '类型'},
            {key: 'boxtype', text: '状态'},
            {key: 'boxamt', text: '账户'},
            {key: 'price', text: '开户行'},
            {key: 'sum', text: '备注'},
            {key: 'person', text: '创建人'},
            {key: 'time', text: '创建时间'}
        ]
    });

    // 汇款记录表格加载
    var remitTable = $('table[grid-manager="remit_table"]');
    remitTable.GM({
        width: 'auto',
        height: '36vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: false,
        supportCheckbox: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'class', text: '金额（元）'},
            {key: 'boxtype', text: '汇款时间'},
            {key: 'boxamt', text: '汇款账号'},
            {key: 'price', text: '汇款人'},
            {key: 'sum', text: '汇款单据'},
            {key: 'state', text: '状态'},
            {key: 'time1', text: '录入日期'},
            {key: 'time2', text: '审核日期'},
            {key: 'person', text: '审核人'},
            {key: 'remark', text: '备注'}
        ]
    });
}

// 加载服务商管理页面下的汇款审核表格数据
function loadCheckTable() {
    // 汇款审核表格加载
    var checkTable = $('table[grid-manager="check_table"]');
    checkTable.GM({
        width: 'auto',
        height: '82vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', 'text': 'ID'},
            {key: 'unit', text: '汇款单位'},
            {key: 'class', text: '金额（元）'},
            {key: 'boxtype', text: '汇款时间'},
            {key: 'boxamt', text: '汇款账号'},
            {key: 'price', text: '汇款人'},
            {key: 'sum', text: '汇款单据'},
            {key: 'state', text: '状态'},
            {key: 'time1', text: '录入日期'},
            {key: 'time2', text: '审核日期'},
            {key: 'person', text: '审核人'},
            {key: 'remark', text: '备注'}
        ]
    });
}

// 加载统计分析页面函数
function loadStatistics() {
    $('#statistics_date_start').val(week_ago_date);

    $('#statistics_calendar_start').calendar({
        trigger: '#statistics_date_start',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#statistics_date_start').val(start);
        },
        onClose: function(view, date, data) {}
    });

    $('#statistics_calendar_end').calendar({
        trigger: '#statistics_date_end',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var end = date.format('yyyy-mm-dd');
            $('#statistics_date_end').val(end);
        },
        onClose: function(view, date, data) {}
    });

    // 统计分析表格加载
    var statisticsTable = $('table[grid-manager="statistics_table"]');
    statisticsTable.GM({
        width: 'auto',
        height: '84vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        supportCheckbox: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'class', text: '收付情况'},
            {key: 'truck', text: '车辆信息'},
            {key: 'boxamt', text: '委托单位'},
            {key: 'price', text: '承运商'},
            {key: 'driver', text: '承运司机'},
            {key: 'number', text: '预约号'},
            {key: 'takecy', text: '提箱点'},
            {key: 'returncy', text: '还箱点'},
            {key: 'boxtype', text: '箱型'},
            {key: 'get', text: '应收（元）'},
            {key: 'pay', text: '应付（元）'},
            {key: 'oil', text: '标准油/气（L）'},
            {key: 'boxno', text: '箱号'},
            {key: 'boxbelonger', text: '箱属'},
            {key: 'vessel', text: '船名/航次'},
            {key: 'time', text: '作业时间'},
            {key: 'remark', text: '备注'},
            {key: 'log', text: '操作日志'}
        ]
    });
}
