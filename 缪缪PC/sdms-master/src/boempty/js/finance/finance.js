// 判断点击的按钮，1--已收，2--已付，3--调整，4--归档
var chargeState = null;
//-----------------------应收统计------------------------------
// 应收统计搜索
$(document).on('click','#receivable_search_btn',function() {
    var balanceUnit = $('#receivable_balance_unit').val();
    var boxType = $('#box_type').val();
    var searchTimeStart = $('#receivable_date_start').val();
    var searchTimeEnd = $('#receivable_date_end').val();
    var receivableStatus = $('input[name="receivable_charge_status"]:checked').val();
    var data = {
        '结算单位': balanceUnit,
        '箱型': boxType,
        '开始时间': searchTimeStart,
        '结束时间': searchTimeEnd,
        '收款状态': receivableStatus
    };
    alert(JSON.stringify(data));
});

//-----------------------------工资统计------------------------------
// 工资统计搜索
$(document).on('click','#wage_search_btn',function() {
    var truckInfo = $('#wage_truck_info').val();
    var driver = $('#wage_driver_info').val();
    var boxType = $('#box_type').val();
    var searchTimeStart = $('#wage_date_start').val();
    var searchTimeEnd = $('#wage_date_end').val();
    var paymentStatus = $('input[name="wage_charge_status"]:checked').val();
    var data = {
        '车辆信息': truckInfo,
        '承运司机': driver,
        '箱型': boxType,
        '开始时间': searchTimeStart,
        '结束时间': searchTimeEnd,
        '付款状态': paymentStatus
    };
    alert(JSON.stringify(data));
});

// --------------------------费用明细--------------------------
// 费用明细搜索
$(document).on('click','#charge_search_btn',function() {
    var delegateUnit = $('#charge_delegate_unit').val();
    var truckInfo = $('#charge_truck_info').val();
    var driver = $('#charge_driver').val();
    var boxBelonger = $('#charge_box_belonger').val();
    var searchTimeStart = $('#charge_date_start').val();
    var searchTimeEnd = $('#charge_date_end').val();
    var reservationNum = $('#reservation_num').val();
    var takeBox = $('#take_box').val();
    var returnBox = $('#return_box').val();
    var takeno = $('#box_number').val();
    var searchState = '';
    $('input[name="charge-state"]').each(function() {
        if(this.checked) {
            searchState += (','+$(this).val());
        }
    });
    var data = {
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

// 费用明细点击已收按钮
$(document).on('click','#charge_received',function() {
    var chargeTable = $('table[grid-manager="charge_table"]');
    var checked = chargeTable.GM('getCheckedTr');
    if(checked.length > 0) {
        chargeState = 1;
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
        $('#charge_state_header').text('是否确认已收款？');
    }else {
        popalert_show_hide('请先选择确认收款的数据');
    }
});

// 费用明细点击已付按钮
$(document).on('click','#charge_payed',function() {
    var chargeTable = $('table[grid-manager="charge_table"]');
    var checked = chargeTable.GM('getCheckedTr');
    if(checked.length > 0) {
        chargeState = 2;
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
        $('#charge_state_header').text('是否确认已付款？');
    }else {
        popalert_show_hide('请先选择确认付款的数据');
    }
});

// 费用明细点击调整按钮
$(document).on('click','#charge_return',function() {
    var chargeTable = $('table[grid-manager="charge_table"]');
    var checked = chargeTable.GM('getCheckedTr');
    if(checked.length > 0) {
        chargeState = 3;
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
        $('#charge_state_header').text('是否确认调整？');
    }else {
        popalert_show_hide('请先选择确认调整的数据');
    }
});

// 费用明细点击归档按钮
$(document).on('click','#charge_file',function() {
    var chargeTable = $('table[grid-manager="charge_table"]');
    var checked = chargeTable.GM('getCheckedTr');
    if(checked.length > 0) {
        chargeState = 4;
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
        $('#charge_state_header').text('是否确认归档？');
    }else {
        popalert_show_hide('请先选择确认归档的数据');
    }
});

// 已收、已付、调整和归档确认模态框点击确认按钮
$(document).on('click','#charge_state_confirm',function() {
    var chargeTable = $('table[grid-manager="charge_table"]');
    var checked = chargeTable.GM('getCheckedTr');
    var checkId = [];
    for( let i = 0; i < checked.length; i++) {
        checkId.push(checked[i].cells[2].innerHTML);
    }
    if( chargeState === 1 ) {
        alert('已收数据：' + checkId);
    } else if( chargeState === 2 ) {
        alert('已付数据：' + checkId);
    } else if( chargeState === 3 ) {
        alert('调整数据：' + checkId);
    } else if( chargeState === 4 ) {
        alert('归档数据：' + checkId);
    }
});

// 状态调整模态框点击取消按钮
$(document).on('click','#del_cancel',function() {
    close_delete_modal();
    var chargeTable = $('table[grid-manager="charge_table"]');
    chargeTable.GM('refreshGrid');
});


// 单击表格tr
$(document).on('click','.finance-table tbody tr',function() {
    $('.aaa', parent.document).trigger('click');
});





//-----------------------------公共方法---------------------------------
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

// 关闭删除表格数据模态框
function close_delete_modal() {
    $('.delete-overlay').animate({
        'margin-top': '-30px',
        'opacity': '0'
    },400).fadeOut();
    $('.mask').fadeOut();
}

function loadData(index) {
    if(index == 0) {
        loadReceivable();
    }else if(index == 1) {
        loadWage();
    }else if(index == 2) {
        loadCharge();
    }
}

// 加载应收统计页面函数
function loadReceivable() {
    $('#receivable_calendar_start').calendar({
        trigger: '#receivable_date_start',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#receivable_date_start').val(start);
        },
        onClose: function(view, date, data) {}
    });

    $('#receivable_calendar_end').calendar({
        trigger: '#receivable_date_end',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var end = date.format('yyyy-mm-dd');
            $('#receivable_date_end').val(end);
        },
        onClose: function(view, date, data) {}
    });

    var sum = '1000',get_sum = '700',unget = '100',getted = '200';
    $('#receivable_sum_boxamt').text(sum);
    $('#receivable_get').text(get_sum);
    $('#receivable_unget').text(unget);
    $('#receivable_getted').text(getted);

    var receivableTable = $('table[grid-manager="receivable_table"]');
    receivableTable.GM({
        width: 'auto',
        height: '88vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        supportCheckbox: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'state', text: '状态'},
            {key: 'class', text: '结算单位'},
            {key: 'boxtype', text: '箱型'},
            {key: 'boxamt', text: '箱量'},
            {key: 'price', text: '单价'},
            {key: 'sum', text: '金额（元）'}
        ]
    });
}

// 加载工资统计页面函数
function loadWage() {
    $('#wage_calendar_start').calendar({
        trigger: '#wage_date_start',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#wage_date_start').val(start);
        },
        onClose: function(view, date, data) {}
    });

    $('#wage_calendar_end').calendar({
        trigger: '#wage_date_end',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var end = date.format('yyyy-mm-dd');
            $('#wage_date_end').val(end);
        }
    });

    var sum = '1000',pay = '700',unpay = '100',payed = '200';
    $('#wage_sum_boxamt').text(sum);
    $('#wage_pay').text(pay);
    $('#wage_unpay').text(unpay);
    $('#wage_payed').text(payed);

    var wageTable = $('table[grid-manager="wage_table"]');
    wageTable.GM({
        width: 'auto',
        height: '94vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: false,
        supportCheckbox: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'state', text: '状态'},
            {key: 'class', text: '车辆信息'},
            {key: 'driver', text: '承运司机'},
            {key: 'boxtype', text: '箱型'},
            {key: 'boxamt', text: '箱量'},
            {key: 'price', text: '单价'},
            {key: 'sum', text: '金额（元）'},
            {key: 'oil', text: '标准油/气（L）'}
        ]
    });
}

// 加载费用明细页面函数
function loadCharge() {
    $('#charge_calendar_start').calendar({
        trigger: '#charge_date_start',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#charge_date_start').val(start);
        },
        onClose: function(view, date, data) {}
    });

    $('#charge_calendar_end').calendar({
        trigger: '#charge_date_end',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var end = date.format('yyyy-mm-dd');
            $('#charge_date_end').val(end);
        },
        onClose: function(view, date, data) {}
    });

    var sum = '1000',get_sum = '700',pay = '100';
    $('#charge_sum_boxamt').text(sum);
    $('#charge_get').text(get_sum);
    $('#charge_pay').text(pay);

    // 费用明细表格加载
    var chargeTable = $('table[grid-manager="charge_table"]');
    chargeTable.GM({
        width: 'auto',
        height: '85vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'state', text: '收付情况'},
            {key: 'class', text: '排车类型'},
            {key: 'driver', text: '车辆信息'},
            {key: 'unit', text: '委托单位'},
            {key: 'boxamt', text: '承运司机'},
            {key: 'price', text: '预约号'},
            {key: 'takecy', text: '提箱点'},
            {key: 'returncy', text: '还箱点'},
            {key: 'boxtype', text: '箱型'},
            {key: 'get', text: '应收（元）'},
            {key: 'pay', text: '应付（元）'},
            {key: 'oil', text: '标准油/气（L）'},
            {key: 'boxnum', text: '箱号'},
            {key: 'belonger', text: '箱属'},
            {key: 'vessel', text: '船名/航次'},
            {key: 'date', text: '作业时间'},
            {key: 'remark', text: '备注'},
            {key: 'log', text: '操作日志'}
        ]
    });
}