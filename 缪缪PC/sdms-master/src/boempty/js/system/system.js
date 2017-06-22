//------------------员工管理----------------------//
// 员工管理页面点击查询按钮
$(document).on('click','#employee_search_btn',function() {
    var code = $('#employee_code').val();
    var name = $('#employee_name').val();
    var state = '';
    $('input[name="employee-state"]').each(function() {
        if(this.checked) {
            state += (','+$(this).val());
        }
    });

    var data = {
        '员工编号': code,
        '姓名': name,
        '员工状态': state
    };
    alert(JSON.stringify(data));
});

// 员工管理页面点击添加按钮
$(document).on('click','#employee_add_btn',function() {
    $('.mask').show();
    $('#employee_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);

    $('#employee_new_overlay_header').text('添加员工');
});

// 参数设置添加模态框点击保存按钮
$(document).on('click','#employee_new_save',function() {
    var empcode = $('#employee_new_empcode').val(),
        empname = $('#employee_new_empname').val(),
        empphone = $('#employee_new_empphone').val(),
        empstate = $('#employee_new_empstate').val(),
        empapart = $('#employee_new_apart').val(),
        emprole = $('#employee_new_role').val(),
        empemail = $('#employee_new_email').val(),
        empqq = $('#employee_new_qq').val(),
        emplogin = $('#employee_new_login').val();

    if( empcode && empname && empstate && empapart && emprole && emplogin ) {
        var data = {
            '员工编号': empcode,
            '员工姓名': empname,
            '员工手机号码': empphone,
            '当前状态': empstate,
            '所属部门': empapart,
            '角色': emprole,
            '邮箱': empemail,
            'QQ': empqq,
            '是否允许登录系统': emplogin
        };

        alert(JSON.stringify(data));
    }else {
        popalert_show_hide('请填写所有带*的信息');
    }
});

// 员工管理页面点击编辑按钮
$(document).on('click','#employee_edit_btn',function() {
    var employeeTable = $('table[grid-manager="employee_table"]');
    var checked = employeeTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('#employee_new_overlay').show().animate({
            'margin-top': '0',
            'opacity': '1'
        },400);

        $('#employee_new_overlay_header').text('编辑员工');
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 员工管理页面点击删除按钮
$(document).on('click','#employee_del_btn',function() {
    var employeeTable = $('table[grid-manager="employee_table"]');
    var checked = employeeTable.GM('getCheckedTr');
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

// 员工管理删除模态框点击删除按钮
$(document).on('click','#employee_del_confirm',function() {
    var employeeTable = $('table[grid-manager="employee_table"]');
    var checked = employeeTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    employeeTable.GM('refreshGrid');
});

// 员工管理页面删除模态框点击取消按钮
$(document).on('click','#employee_del_cancel',function() {
    close_delete_modal();
    var employeeTable = $('table[grid-manager="employee_table"]');
    employeeTable.GM('refreshGrid');
});

// 员工管理页面点击重置密码按钮
$(document).on('click','#employee_reset_btn',function() {
    var employeeTable = $('table[grid-manager="employee_table"]');
    var checked = employeeTable.GM('getCheckedTr');
    if(checked.length > 0) {
        var checkedId = [];
        for( var i = 0 ; i < checked.length ; i++ ) {
            checkedId.push(checked[i].cells[3].innerHTML);
        }
        $('.mask').show();
        $('#reset_header').text('是否确认重置员工编号为'+ checkedId +'的密码？');
        $('#reset_overlay').animate({
            'margin-top': '0',
            'opacity': '1'
        },400).show();
    }else {
        popalert_show_hide('请先选择要重置密码的数据');
    }
});

// 员工管理重置密码模态框点击确认按钮
$(document).on('click','#employee_reset_confirm',function() {
    popalert_show_hide('密码已重置');
    close_delete_modal();
    var employeeTable = $('table[grid-manager="employee_table"]');
    employeeTable.GM('refreshGrid');
});

// 员工管理重置密码模态框点击取消按钮
$(document).on('click','#employee_reset_cancel',function() {
    close_delete_modal();
    var employeeTable = $('table[grid-manager="employee_table"]');
    employeeTable.GM('refreshGrid');
});

//------------------字典维护----------------------//
// 字典维护页面点击添加按钮
$(document).on('click','#dictionary_add_btn',function() {
    $('.mask').show();
    $('#dict_new_overlay').show().animate({
        'margin-top': '0',
        'opacity': '1'
    },400);
    $('#dict_new_overlay_header').text('添加字典');
});

// 参数设置添加模态框点击保存按钮
$(document).on('click','#dictionary_new_save',function() {
    var dictitem = $('#dict_new_item').val(),
        dictvalue = $('#dict_new_value').val(),
        dicttext = $('#dict_new_text').val(),
        dictremark = $('#dict_new_remark').val();

    if( dictitem && dictvalue && dicttext ) {
        var data = {
            '分类': dictitem,
            '值': dictvalue,
            '文本': dicttext,
            '显示': dictremark
        };

        alert(JSON.stringify(data));
    }else {
        popalert_show_hide('请填写所有带*的信息');
    }
});

// 字典维护页面点击编辑按钮
$(document).on('click','#dictionary_edit_btn',function() {
    var dictionaryTable = $('table[grid-manager="dictionary_table"]');
    var checked = dictionaryTable.GM('getCheckedTr');
    if(checked.length > 0) {
        $('.mask').show();
        $('#dict_new_overlay').show().animate({
            'margin-top': '0',
            'opacity': '1'
        },400);
        $('#dict_new_overlay_header').text('编辑字典');
    }else {
        popalert_show_hide('请先选择要编辑的数据');
    }
});

// 字典维护页面点击删除按钮
$(document).on('click','#dictionary_del_btn',function() {
    var dictionaryTable = $('table[grid-manager="dictionary_table"]');
    var checked = dictionaryTable.GM('getCheckedTr');
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

// 字典维护删除模态框点击删除按钮
$(document).on('click','#dictionary_del_confirm',function() {
    var dictionaryTable = $('table[grid-manager="dictionary_table"]');
    var checked = dictionaryTable.GM('getCheckedTr');
    var checkedId = [];
    for( var i = 0 ; i < checked.length ; i++ ) {
        checkedId.push(checked[i].cells[2].innerHTML);
    }
    alert('当前删除ID为'+checkedId);
    close_delete_modal();
    dictionaryTable.GM('refreshGrid');
});

// 字典维护页面删除模态框点击取消按钮
$(document).on('click','#dictionary_del_cancel',function() {
    close_delete_modal();
    var dictionaryTable = $('table[grid-manager="dictionary_table"]');
    dictionaryTable.GM('refreshGrid');
});

//-----------------船名航次查询-------------------//
// 员工管理页面点击查询按钮
$(document).on('click','#vessel_search_btn',function() {
    var port = $('#vessel_port').val();
    var vessel = $('#vessel_name').val();

    var data = {
        '码头': port,
        '船名航次': vessel
    };
    alert(JSON.stringify(data));
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
        loadEmployee();
    }else if(index == 1) {
        loadDictionary();
    }else if(index == 2) {
        loadVessel();
    }
}

// 加载员工管理页面函数
function loadEmployee() {
    // 员工管理表格加载
    var employeeTable = $('table[grid-manager="employee_table"]');
    employeeTable.GM({
        width: 'auto',
        height: '94vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'type', text: '员工编号'},
            {key: 'state', text: '员工姓名'},
            {key: 'class', text: '员工手机号码'},
            {key: 'boxtype', text: '当前状态'},
            {key: 'boxamt', text: '所属部门'},
            {key: 'price', text: '角色'},
            {key: 'sum', text: '邮箱'},
            {key: 'fax', text: 'QQ'},
            {key: 'login', text: '是否允许登录系统'},
            {key: 'time1', text: '创建时间'},
            {key: 'person1', text: '创建人'},
            {key: 'time2', text: '修改时间'},
            {key: 'person2', text: '修改人'}
        ]
    });
}

// 加载字典维护页面函数
function loadDictionary() {
    // 字典维护表格加载
    var dictionaryTable = $('table[grid-manager="dictionary_table"]');
    dictionaryTable.GM({
        width: 'auto',
        height: '98vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: false,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'id', text: 'UUID'},
            {key: 'type', text: '分类'},
            {key: 'state', text: '值'},
            {key: 'class', text: '显示'},
            {key: 'boxtype', text: '备注'}
        ]
    });
}

// 加载船名航次查询页面函数
function loadVessel() {
    // 船名航次查询页面表格加载
    var vesselTable = $('table[grid-manager="vessel_table"]');
    vesselTable.GM({
        width: 'auto',
        height: '94vh',
        ajax_url: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
        ajax_type: 'POST',
        supportAjaxPage: true,
        pageSize: 30,
        emptyTemplate: '没有对应的数据',
        columnData: [
            {key: 'type', text: '挂靠码头'},
            {key: 'state', text: '英文船名'},
            {key: 'class', text: '中文船名'},
            {key: 'vessel', text: '航次'},
            {key: 'inout', text: '进出口'},
            {key: 'uncode', text: 'UN代码'},
            {key: 'time1', text: '预计抵港时间'},
            {key: 'time2', text: '实际抵港时间'},
            {key: 'time3', text: '预计离港时间'},
            {key: 'time4', text: '实际离港时间'},
            {key: 'time5', text: '截单时间'}
        ]
    });
}