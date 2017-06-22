var plancar_driver = '0';   // 排车模态框司机
var plancar_boxamt = '0';   // 排车模态框箱量
var plancar_sum = '0';    // 排车模态框总排车数
var timer = null;
var bHeight = $('body').height();
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

// 预约管理页面切换一周前或一月前日期
$(document).on('click','input[name="appoint-time-range"]',function() {
    var time_range = $(this).val();
    if(time_range == '一周前') {
        $('#appoint_date_start').val(week_ago_date);
    }else if(time_range == '一月前') {
        $('#appoint_date_start').val(month_ago_date);
    }
});

// 预约管理搜索
$(document).on('click','#appoint_search_btn',function() {
    var reservationNum = $('#reservation_num').val();
    var takeBox = $('#take_box').val();
    var returnBox = $('#return_box').val();
    var boxType = $('#box_type').val();
    var timeRange = $('input[name="appoint-time-range"]:checked').val();
    var searchTimeStart = $('#appoint_date_start').val();
    var searchTimeEnd = $('#appoint_date_end').val();
    var searchState = '';
    $('input[name="appoint-state"]').each(function() {
        if(this.checked) {
            searchState += (','+$(this).val());
        }
    });
    var data = {
        '预约号': reservationNum,
        '提箱点': takeBox,
        '还箱点': returnBox,
        '箱型': boxType,
        '时间范围': timeRange,
        '开始时间': searchTimeStart,
        '结束时间': searchTimeEnd,
        '状态': searchState
    };
    alert(JSON.stringify(data));
});

// 预约管理上表格点击状态调整按钮
$(document).on('click','#adjust_status_btn',function() {
    var appointTable = $('table[grid-manager="appoint_table"]');
    var adjust_data = appointTable.GM('getCheckedTr');
    if(adjust_data.length > 0) {
        $('.mask').show();
        $('#adjust_overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
        load_adjust_data();
    }else {
        popalert_show_hide('请先选择要调整的数据');
    }
});

// 预约管理模态框载入数据函数
function load_adjust_data() {
    var reservation_number = '31701266062',adjust_from = '大谢招商(CMICT)',adjust_to = '长胜货柜';
    $('#adjust_order_number').text(reservation_number);
    $('#adjust_from').text(adjust_from);
    $('#adjust_to').text(adjust_to);
}

// 状态调整模态框点击确认按钮
$(document).on('click','#adjust_confirm',function() {
    var reservation_number = $('#adjust_order_number').text();
    var adjust_status = $('input[name="adjust_status"]:checked').val();
    if( adjust_status ) {
        alert( '预约号为' + reservation_number + '的单子状态调整为' + adjust_status );
        close_adjust_modal();
    }else {
        popalert_show_hide('请先选择状态');
    }
});

// 状态调整模态框点击取消按钮
$(document).on('click','#adjust_cancel',function() {
    close_adjust_modal();
});

// 关闭调整模态框并刷新表格
function close_adjust_modal() {
    $('.mask').hide();
    $('#adjust_overlay').animate({
        'margin-top': '-30px',
        'opacity': '0'
    },400).fadeOut();
    var appointTable = $('table[grid-manager="appoint_table"]');
    appointTable.GM('refreshGrid');
}

// 预约管理上表格点击删除按钮
$(document).on('click','#appoint_up_del_btn',function() {
    var appointTable = $('table[grid-manager="appoint_table"]');
    var del_data = appointTable.GM('getCheckedTr');
    if(del_data.length > 0) {
        $('.mask').show();
        $('#appoint_up_del_confirm').show();
        $('#appoint_down_del_confirm').hide();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 预约管理下表格点击删除按钮
$(document).on('click','#appoint_down_del_btn',function() {
    var appointDetailTable = $('table[grid-manager="appoint_detail_table"]');
    var del_detail_data = appointDetailTable.GM('getCheckedTr');
    if(del_detail_data.length > 0) {
        $('.mask').show();
        $('#appoint_up_del_confirm').hide();
        $('#appoint_down_del_confirm').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 预约上表格删除模态框点击删除按钮
$(document).on('click','#appoint_up_del_confirm',function() {
    var appointTable = $('table[grid-manager="appoint_table"]');
    var checked = appointTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    appointTable.GM('refreshGrid');
});

// 预约下表格删除模态框点击删除按钮
$(document).on('click','#appoint_down_del_confirm',function() {
    var appointDetailTable = $('table[grid-manager="appoint_detail_table"]');
    var checked = appointDetailTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    appointDetailTable.GM('refreshGrid');
});

// 删除模态框点击取消按钮
$(document).on('click','#del_cancel',function() {
    close_delete_modal();
    var appointTable = $('table[grid-manager="appoint_table"]');
    appointTable.GM('refreshGrid');
});

// 关闭删除表格数据模态框
function close_delete_modal() {
    $('.delete-overlay').animate({
        'margin-top': '-30px',
        'opacity': '0'
    },400).fadeOut();
    $('.mask').fadeOut();
}

// 预约管理上表格点击编辑按钮
$(document).on('click','#appoint_edit_btn',function() {
    var appointTable = $('table[grid-manager="appoint_table"]');
    var checked = appointTable.GM('getCheckedTr');
    if(checked.length > 0) {
        new_order_modal(checked[0].cells[2].innerHTML);
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 新建或编辑任务单模态框
function new_order_modal(id) {
    $('.mask').show();
    $('.new-order').show().animate({
        'margin-top':'0',
        'opacity': '1'
    },400);

    $('#appoint_calendar_new_start').calendar({
        trigger: '#appoint_new_date_start',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#appoint_new_date_start').val(start);
        }
    });

    if( id ) {
        // 发送后台id并载入数据
    }
}

// 新建或编辑任务单模态框点击保存按钮
$(document).on('click','#new_order_save_btn',function() {
    var takecy = $('#new_order_takecy').val(),
        returncy = $('#new_order_returncy').val(),
        resernum = $('#new_order_reservation').val(),
        boxtype = $('#new_order_boxtype').val(),
        boxamt = parseInt($('#new_order_boxamt').val()),
        belonger = $('#new_order_belonger').val(),
        plantime = $('#appoint_new_date_start').val(),
        vessel = $('#new_order_vessel').val(),
        unit = $('#new_order_unit').val(),
        remark = $('#new_order_remark').val();

    if( takecy && returncy && resernum && boxtype && boxamt && belonger && plantime && vessel && unit ) {
        if( boxamt > 0 && boxamt < 30 ) {
            var data = {
                '提箱点': takecy,
                '还箱点': returncy,
                '预约号': resernum,
                '箱型': boxtype,
                '箱量': boxamt,
                '箱属': belonger,
                '计划提箱开始时间': plantime,
                '船名航次': vessel,
                '委托单位': unit,
                '备注': remark
            };

            alert(JSON.stringify(data));
        } else {
            popalert_show_hide('箱量数字不合法');
        }
    } else {
        popalert_show_hide('请填写带*的必填信息');
    }
});

// 关闭新建任务单模态框
function close_new_order_modal() {
    $('.mask').fadeOut();
    $('.new-order,.overlay').animate({
        'margin-top':'-30px',
        'opacity': '0'
    },400).fadeOut();
}

// 排车模态框
$(document).on('click','#plancar_btn',function() {
    var appointTable = $('table[grid-manager="appoint_table"]');
    var del_data = appointTable.GM('getCheckedTr');
    if(del_data.length > 0) {
        $('.mask').show();
        $('#plancar_overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
        load_plancar_info();
    }else {
        popalert_show_hide('请先选择要排车的数据');
    }
});

// 飞单模态框
$(document).on('click','#flyorder_btn',function() {
    var appointTable = $('table[grid-manager="appoint_table"]');
    var checked = appointTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('#flyorder_overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要投入飞单市场的数据');
    }
});

// 飞单模态框点击取消按钮
$(document).on('click','#flyorder_cancel',function() {
    $('.mask').hide();
    $('#flyorder_overlay').animate({
        'margin-top': '-30px',
        'opacity': '0'
    },400).fadeOut();
});

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

// 加载排车模态框信息
function load_plancar_info() {
    var number = '31701266062',forwarder = '大谢招商(CMICT)',box = '长胜货柜',boxtype = '45GP';
    plancar_sum = '200';
    var header_str = number + ' ' + forwarder + ' ' + box + ' ' + boxtype + '*' + plancar_sum;
    $('#plancar_header').text(header_str);

    var content_left_arr = {'data': [{'plateno': 'ZJB-86549', 'num': 'A2U'}, {'plateno': 'ZJB-8H891', 'num': '9AJ'},
        {'plateno': 'ZJB-8H918', 'num': '8AJ'}, {'plateno': 'ZJB-8T725', 'num': '3XX'},
        {'plateno': 'ZJB-8U019', 'num': '4UY'}], "totals": 5};
    load_plancar_left(content_left_arr);

    var content_right_arr = [];
    plancar_driver = content_right_arr.length;
    plancar_boxamt = 0;
    for( var i = 0; i < content_right_arr.length; i++ ) {
        plancar_boxamt += parseInt(content_right_arr[i].amt);
    }
    var remain = parseInt(plancar_sum) - plancar_boxamt;
    var content_right_info = '已选择了'+ plancar_driver + '个司机，'+ plancar_boxamt + '个箱量，剩余' + remain +'个';
    load_plancar_right(content_right_info,content_right_arr);
}

// 排车模态框加载左边数据
function load_plancar_left(arr) {
    var planTable = $('table[grid-manager="appoint_plancar_table"]');
    planTable.GM({
        width: 'auto',
        ajax_data: arr,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'plateno', text: ''},
            {key: 'num', text: ''}
        ]
    });
}

// 排车模态框加载右边数据
function load_plancar_right(info,arr) {
    $('.content-right-info').text(info);
    var old_right = [];
    $('.content-right-row').each(function() {
        old_right.push({'box': $(this).text(), 'amt': $(this).next().text()});
    });

    if( old_right.length > 0 ) {
        for( let i = 0; i < old_right.length; i++ ) {
            for( let j = 0; j < arr.length; j++ ) {
                if( old_right[i].box == arr[j].box ) {
                    let new_num = parseInt(old_right[i].amt) + parseInt(arr[j].amt);
                    $('.content-right-row').eq(i).next().text(new_num);
                    arr.splice(j,1);
                }
            }
        }
    }

    var content_right = '';
    for( let i in arr ) {
        content_right += '<div class="search-content-row search-right-content">'
            +(parseInt(i)+1) + '-'
            +'<p class="content-right-row">'
            +arr[i].box
            +'</p><span class="content-right-num">'
            +arr[i].amt
            +'</span>车<a href="javascript:;" class="fa fa-times-rectangle content-right-del-row" title="删除该行数据"></a></div>';
    }
    $('#result_content').append(content_right);
}

// 排车模态框点击箭头
$(document).on('click','#left_right_exchange',function() {
    let amount = $('#content_middle_num_input').val();
    let obj = document.getElementById('content_middle_num_input');
    var planTable = $('table[grid-manager="appoint_plancar_table"]');
    var checked = planTable.GM('getCheckedTr');
    if(checked.length > 0) {
        if( parseInt(amount) > 0 ) {
            var content_right_arr = [];
            for( let i = 0; i < checked.length; i++ ) {
                content_right_arr.push({'box': checked[i].cells[2].innerHTML+'/'+checked[i].cells[3].innerHTML, 'amt': amount});
            }
            plancar_driver = content_right_arr.length;

            plancar_boxamt = plancar_driver * amount;

            var remain = parseInt(plancar_sum) - plancar_boxamt;
            if( parseInt(remain) >= 0 ) {
                var content_right_info = '已选择了'+ plancar_driver + '个司机，'+ plancar_boxamt + '个箱量，剩余' + remain +'个';
                load_plancar_right(content_right_info,content_right_arr);
            } else {
                popalert_show_hide('请不要超过最大量：' + plancar_sum);
            }

        }else {
            shake(obj,1,0);
            popalert_show_hide('请规范填写数量');
        }
    }else {
        popalert_show_hide('请先选择要添加到右边的数据');
    }
});

// 排车模态框右边列表点击删除按钮
$(document).on('click','.content-right-del-row',function() {
    var del_num = parseInt($(this).prev('.content-right-num').text());
    plancar_driver -= 1;
    plancar_boxamt -= parseInt(del_num);
    var remain = parseInt(plancar_sum) - plancar_boxamt;
    var content_right_info = '已选择了'+ plancar_driver + '个司机，'+ plancar_boxamt + '个箱量，剩余' + remain +'个';
    $('.content-right-info').text(content_right_info);
    $(this).parent().remove();
});

// 排车模态框点击取消按钮
$(document).on('click','#plancar_cancel',function() {
    $('.mask').hide();
    $('#plancar_overlay').animate({
        'margin-top': '-30px',
        'opacity': '0'
    },400).fadeOut();
});

// 预约管理下表格点击添加按钮弹出添加模态框
$(document).on('click','#appoint_down_add_btn',function() {
    $('.mask').show();
    $('#appoint_down_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);
    $('#appoint_down_calendar_date1').calendar({
        trigger: '#appoint_down_new_date1',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#appoint_down_new_date1').val(start);
        },
        onClose: function(view, date, data) {}
    });
    $('#appoint_down_calendar_date2').calendar({
        trigger: '#appoint_down_new_date2',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#appoint_down_new_date2').val(start);
        },
        onClose: function(view, date, data) {}
    });
});

// 预约管理下表格添加模态框点击保存按钮
$(document).on('click','#appoint_down_new_save',function() {
    var truckType = $('#appoint_down_new_trucktype').val(),
        planType  = $('#appoint_down_new_plantype').val(),
        boxamt    = parseInt($('#appoint_down_new_boxamt').val()),
        price     = $('#appoint_down_new_price').val(),
        date1     = $('#appoint_down_new_date1').val(),
        date2     = $('#appoint_down_new_date2').val(),
        remark    = $('#appoint_down_new_remark').val();

    if( truckType && planType && boxamt && price && date1 && date2 ) {
        if( boxamt > 0 ) {
            var data = {
                '车辆类型': truckType,
                '排车类型': planType,
                '箱量': boxamt,
                '单价': price,
                '开始时间': date1,
                '结束时间': date2,
                '备注': remark
            };
            alert(JSON.stringify(data));
        }else {
            popalert_show_hide('请规范填写箱量');
        }
    }else {
        popalert_show_hide('请填写所有带*的必填信息');
    }
});

// 点击上传预约单按钮
$('.file-upload-trigger').click(function() {
    return '$(".file-upload").click()';
});

// 业务查询页面切换一周前或一月前日期
$(document).on('click','input[name="business-time-range"]',function() {
    var time_range = $(this).val();
    if(time_range == '一周前') {
        $('#business_date_start').val(week_ago_date);
    }else if(time_range == '一月前') {
        $('#business_date_start').val(month_ago_date);
    }
});

// 业务查询搜索
$(document).on('click','#business_search_btn',function() {
    var reservationNum = $('#reservation_num').val();
    var takeBox = $('#take_box').val();
    var returnBox = $('#return_box').val();
    var truckInfo = $('#truck_info').val();
    var timeRange = $('input[name="business-time-range"]:checked').val();
    var searchTimeStart = $('#business_date_start').val();
    var searchTimeEnd = $('#business_date_end').val();
    var searchState = '';
    $('input[name="business-state"]').each(function() {
        if(this.checked) {
            searchState += (','+$(this).val());
        }
    });
    var data = {
        '预约号': reservationNum,
        '提箱点': takeBox,
        '还箱点': returnBox,
        '车辆信息': truckInfo,
        '时间范围': timeRange,
        '开始时间': searchTimeStart,
        '结束时间': searchTimeEnd,
        '状态': searchState
    };
    alert(JSON.stringify(data));
});

// 运输管理页面切换一周前或一月前日期
$(document).on('click','input[name="transport-time-range"]',function() {
    var time_range = $(this).val();
    if(time_range == '一周前') {
        $('#transport_date_start').val(week_ago_date);
    }else if(time_range == '一月前') {
        $('#transport_date_start').val(month_ago_date);
    }
});

// 运输管理搜索
$(document).on('click','#transport_search_btn',function() {
    var reservationNum = $('#reservation_num').val();
    var takeBox = $('#take_box').val();
    var returnBox = $('#return_box').val();
    var truckInfo = $('#truck_info').val();
    var takeno = $('#transport_takeno').val();
    var timeRange = $('input[name="transport-time-range"]:checked').val();
    var searchTimeStart = $('#transport_date_start').val();
    var searchTimeEnd = $('#transport_date_end').val();
    var searchState = '';
    $('input[name="transport-state"]').each(function() {
        if(this.checked) {
            searchState += (','+$(this).val());
        }
    });
    var data = {
        '预约号': reservationNum,
        '提箱点': takeBox,
        '还箱点': returnBox,
        '车辆信息': truckInfo,
        '箱号': takeno,
        '时间范围': timeRange,
        '开始时间': searchTimeStart,
        '结束时间': searchTimeEnd,
        '状态': searchState
    };
    alert(JSON.stringify(data));
});

// 运输管理点击删除按钮
$(document).on('click','#transport_del_btn',function() {
    var transportTable = $('table[grid-manager="transport_table"]');
    var del_data = transportTable.GM('getCheckedTr');
    if(del_data.length > 0) {
        $('.mask').show();
        $('.delete-overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要删除的数据');
    }
});

// 运输删除模态框点击删除按钮
$(document).on('click','#transport_del_confirm',function() {
    var transportTable = $('table[grid-manager="transport_table"]');
    var checked = transportTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    transportTable.GM('refreshGrid');
});

// 运输管理页面点击审核按钮
$(document).on('click','#transport_check_btn',function() {
    var transportTable = $('table[grid-manager="transport_table"]');
    var checked = transportTable.GM('getCheckedTr');
    if( checked.length > 0 ) {

    }else {
        popalert_show_hide('请先选择要审核的数据');
    }
});

// 存放页面加载函数
function loadData(index) {
    if(index == 0) {
        loadAppoint();
    }else if(index == 1) {
        loadBusiness();
    }else if(index == 2) {
        loadTransport();
    }
}

// 加载预约管理的内容
function loadAppoint() {
    $('#appoint_date_start').val(week_ago_date);

    $('#appoint_calendar_start').calendar({
        trigger: '#appoint_date_start',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#appoint_date_start').val(start);
        }
    });

    $('#appoint_calendar_end').calendar({
        trigger: '#appoint_date_end',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var end = date.format('yyyy-mm-dd');
            $('#appoint_date_end').val(end);
        }
    });

    var sum = '1000',finished = '700',unchecked = '100',undone = '200';
    $('#appoint_sum_boxamt').text(sum);
    $('#appoint_finished').text(finished);
    $('#appoint_unchecked').text(unchecked);
    $('#appoint_undone').text(undone);

    // 预约管理表格加载
    var appointTable = $('table[grid-manager="appoint_table"]');
    appointTable.GM({
        width: 'auto',
        height: '45vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'state', text: '状态'},
            {key: 'class', text: '委托单位'},
            {key: 'reservationnum', text: '预约号'},
            {key: 'take', text: '提箱点'},
            {key: 'return', text: '还箱点'},
            {key: 'boxtype', text: '箱型'},
            {key: 'boxamt', text: '箱量'},
            {key: 'finished', text: '已完成'},
            {key: 'uncheck', text: '未确认'},
            {key: 'undone', text: '未做'},
            {key: 'boxer', text: '箱属'},
            {key: 'veseal', text: '船名/航次'},
            {key: 'taketime', text: '计划提箱开始时间'},
            {key: 'reservationorder', text: '预约单'},
            {key: 'remark', text: '备注'},
            {key: 'writer', text: '录入人'},
            {key: 'writetime', text: '录入时间'},
            {key: 'checker', text: '修改人'},
            {key: 'checktime', text: '修改时间'}
        ]
    });

    // 预约管理详细表格加载
    var appointDetailTable = $('table[grid-manager="appoint_detail_table"]');
    appointDetailTable.GM({
        width: 'auto',
        height: '42vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: false,
        pageSize: 30,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'trucktype', text: '车辆类型'},
            {key: 'reltype', text: '排车类型'},
            {key: 'boxamt', text: '箱量'},
            {key: 'price', text: '单价（元）'},
            {key: 'str_time', text: '开始时间'},
            {key: 'end_time', text: '结束时间'},
            {key: 'finished', text: '已完成'},
            {key: 'unchecked', text: '未确认'},
            {key: 'undone', text: '未做'},
            {key: 'matchtime', text: '分配时间'},
            {key: 'matcher', text: '分配人'},
            {key: 'remark', text: '备注'},
            {key: 'edittime', text: '修改时间'},
            {key: 'editer', text: '修改人'}
        ]
    });
}

// 加载业务查询的内容
function loadBusiness() {
    $('#business_date_start').val(week_ago_date);

    $('#business_calendar_start').calendar({
        trigger: '#business_date_start',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#business_date_start').val(start);
        },
        onClose: function(view, date, data) {}
    });

    $('#business_calendar_end').calendar({
        trigger: '#business_date_end',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var end = date.format('yyyy-mm-dd');
            $('#business_date_end').val(end);
        },
        onClose: function(view, date, data) {}
    });

    // 业务查询表格加载
    var businessTable = $('table[grid-manager="business_table"]');
    businessTable.GM({
        width: 'auto',
        height: '89vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize:30,
        supportCheckbox: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'state', text: '状态'},
            {key: 'plantype', text: '排车类型'},
            {key: 'truckinfo', text: '车辆信息'},
            {key: 'reservationnum', text: '预约号'},
            {key: 'take', text: '提箱点'},
            {key: 'return', text: '还箱点'},
            {key: 'boxtype', text: '箱型'},
            {key: 'boxamt', text: '箱量'},
            {key: 'price', text: '单价（元）'},
            {key: 'str_time', text: '开始时间'},
            {key: 'end_time', text: '结束时间'},
            {key: 'finished', text: '已完成'},
            {key: 'uncheck', text: '未确认'},
            {key: 'undone', text: '未做'},
            {key: 'boxer', text: '箱属'},
            {key: 'veseal', text: '船名/航次'},
            {key: 'taketime', text: '计划提箱开始时间'},
            {key: 'reservationorder', text: '预约单'},
            {key: 'remark', text: '备注'}
        ]
    });
}

// 加载运输管理表格
function loadTransport() {
    $('#transport_date_start').val(week_ago_date);

    $('#transport_calendar_start').calendar({
        trigger: '#transport_date_start',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#transport_date_start').val(start);
        },
        onClose: function(view, date, data) {}
    });

    $('#transport_calendar_end').calendar({
        trigger: '#transport_date_end',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var end = date.format('yyyy-mm-dd');
            $('#transport_date_end').val(end);
        },
        onClose: function(view, date, data) {}
    });

    // 运输管理表格加载
    var transportTable = $('table[grid-manager="transport_table"]');
    transportTable.GM({
        width: 'auto',
        height: '86vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize:30,
        supportCheckbox: true,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'state', text: '状态'},
            {key: 'truckinfo', text: '车辆信息'},
            {key: 'reservationnum', text: '预约号'},
            {key: 'take', text: '提箱点'},
            {key: 'return', text: '还箱点'},
            {key: 'boxtype', text: '箱型'},
            {key: 'takeno', text: '箱号'},
            {key: 'vessel', text: '船名航次'},
            {key: 'finished', text: '作业时间'},
            {key: 'uncheck', text: '运费'},
            {key: 'undone', text: '支付状态'},
            {key: 'boxer', text: '排车类型'},
            {key: 'veseal', text: '船名/航次'},
            {key: 'remark', text: '备注'},
            {key: 'log', text: '操作日志'}
        ]
    });
}

// 抖动动画
function shake(obj,dir,num_index) {
    var shake_range = [];
    for( var i = 20; i >= 0; i-=2 ) {
        shake_range.push(i,-i);
    }
    shake_range.push(0);
    clearInterval(timer);
    timer = setInterval(function() {
        dir == 1 ? obj.style.left = shake_range[num_index]+'px' : obj.style.top = shake_range[num_index]+'px';
        num_index++;
        num_index == shake_range.length ? clearInterval(timer) : '';
    },50);
}

