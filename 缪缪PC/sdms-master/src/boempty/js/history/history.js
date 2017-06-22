var search_date = new Date(),
    search_year = search_date.getFullYear(),
    search_month = (search_date.getMonth()+1)<10?'0'+(search_date.getMonth()+1):search_date.getMonth()+1,
    search_day = search_date.getDate();

// 今天日期
var today_date = search_year+'-'+search_month+'-'+search_day;

// 去年的今天日期
var last_year_date = (search_year-1)+'-'+search_month+'-'+search_day;

// 业务查询页面切换一周前或一月前日期
$(document).on('click','input[name="history-time-range"]',function() {
    var time_range = $(this).val();
    if(time_range == '今年') {
        $('#history_date_start').val(today_date);
    }else if(time_range == '去年') {
        $('#history_date_start').val(last_year_date);
    }
});

//-----------------历史数据----------------//
// 历史数据搜索
$(document).on('click','#history_search_btn',function() {
    var delegateUnit = $('#history_delegate_unit').val();
    var truckInfo = $('#history_truck_info').val();
    var driver = $('#history_driver').val();
    var boxBelonger = $('#history_box_belonger').val();
    var searchTimeStart = $('#history_date_start').val();
    var searchTimeEnd = $('#history_date_end').val();
    var reservationNum = $('#reservation_num').val();
    var takeBox = $('#take_box').val();
    var returnBox = $('#return_box').val();
    var takeno = $('#box_number').val();
    var searchState = '';
    $('input[name="history-state"]').each(function() {
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

//-----------------公共方法函数------------//
// 存放页面加载函数
function loadData(index) {
    if(index == 0) {
        loadHistory();
    }
}

// 历史数据页面加载页面函数
function loadHistory() {
    $('#history_date_start').val(today_date);

    $('#history_calendar_start').calendar({
        trigger: '#history_date_start',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var start = date.format('yyyy-mm-dd');
            $('#history_date_start').val(start);
        },
        onClose: function(view, date, data) {}
    });

    $('#history_calendar_end').calendar({
        trigger: '#history_date_end',
        zIndex: 99,
        onSelected: function(view, date, data) {
            var end = date.format('yyyy-mm-dd');
            $('#history_date_end').val(end);
        },
        onClose: function(view, date, data) {}
    });

    var sum = '1000',get_sum = '700',pay = '100';
    $('#history_sum_boxamt').text(sum);
    $('#history_get').text(get_sum);
    $('#history_pay').text(pay);

    // 历史数据表格加载
    var historyTable = $('table[grid-manager="history_table"]');
    historyTable.GM({
        width: 'auto',
        height: '85vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        supportCheckbox: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'state', text: '归档时间'},
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
            {key: 'startand', text: '标准油/气（L）'},
            {key: 'boxno', text: '箱号'},
            {key: 'boxbelonger', text: '箱属'},
            {key: 'vessel', text: '船名/航次'},
            {key: 'workingtime', text: '作业时间'},
            {key: 'remark', text: '备注'},
            {key: 'log', text: '操作日志'}
        ]
    });
}