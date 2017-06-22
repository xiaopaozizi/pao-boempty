$(function() {
    hide_loading();

    resize_window();

    $(window).resize(function() {
        resize_window();
    });

    //记录一级目录的下标值
    var index = null;

    // 记录二级目录的下标值
    var inner_index = null;

    // 记录页面地址路径
    var page_root = [
        [ 'appoint', 'business', 'transport' ],
        [ 'receivable', 'wage', 'charge' ],
        [ 'company', 'remit', 'customer', 'truck', 'driver', 'route', 'setting' ],
        [ 'employee', 'dictionary', 'vessel' ],
        [ 'history' ],
        [ 'advertisement', 'message', 'service', 'statistics' ]
    ];

    // 左侧树状导航栏一级目录
    var $nav_item = $('.navbar-first-item');

    $nav_item.click(function() {
        var current_index = $(this).index();
        //alert('current_index:'+current_index+',index:'+index);
        if(current_index == index) {
            $(this).removeClass('active');
            $(this).children('.navbar-item').stop().slideToggle('fast');
        }else {
            if(index == null) {
                $(this).addClass('active');
                $(this).children('.navbar-item').stop().slideToggle('fast');
            }else {
                $(this).addClass('active');
                $nav_item.eq(index).removeClass('active');
                $nav_item.eq(index).children('.navbar-item').stop().slideUp('fast');
                $nav_item.eq(current_index).children('.navbar-item').stop().slideToggle('fast');
            }
        }
        index = $(this).index();
    });

    // 左侧树状导航栏二级目录
    var $nav_sec_item = $('.navbar-item li');

    $nav_sec_item.click(function(e) {
        if(inner_index != null) {
            $('.navbar-item').each(function() {
                $(this).children('li').removeClass('active');
            });
        }
        inner_index = $(this).index();
        var page_name = 'content/'+$nav_item.eq(index).attr('name')+'/'+page_root[index][inner_index]+'.html';
        console.log(page_name);
        //return;
        $('.content-iframe').attr('src',page_name);
        show_loading();
        setTimeout(function() {
            window.frames['content_iframe'].loadData(inner_index);
            hide_loading();
        },500);
        $(this).addClass('active');
        e.stopPropagation();
    });
});


$('.aaa').bind('click',function(event,arg1){
    //$(arg1).appendTo('body');
    console.log(arg1);
})

// 点击我的消息显示消息详情
$(document).on('click','#my_msg',function() {
    //$('.msg-content').stop().slideToggle('fast');
    var $msg = $('.msg-content').position().top;
    if( $msg === 30 ) {
        header_second_menu_show('#my_msg_caret','.msg-content');
    }else {
        header_second_menu_hide('#my_msg_caret','.msg-content');
    }
});

// 点击登录用户显示信息详情
$(document).on('click','#my_admin',function() {
    //$('.msg-content').stop().slideToggle('fast');
    var $admin = $('.admin-content').position().top;
    if( $admin === 30 ) {
        header_second_menu_show('#my_admin_caret','.admin-content');
    }else {
        header_second_menu_hide('#my_admin_caret','.admin-content');
    }
});

// 头部导航栏二级菜单出现
function header_second_menu_show(triangle,content) {
    $(triangle).removeClass('fa-caret-down').addClass('fa-caret-up');
    $(content).show().animate({
        'margin-top': '0',
        'opacity': '1'
    },300);
}

// 头部导航栏二级菜单消失
function header_second_menu_hide(triangle,content) {
    $(triangle).removeClass('fa-caret-up').addClass('fa-caret-down');
    $(content).animate({
        'margin-top': '-30px',
        'opacity': '0'
    },300).fadeOut();
}

// 隐藏左侧导航栏
function hide_nav() {
    var n_width = $('.menu').width();
    if(n_width > 0) {
        $('nav.menu').width('0px').hide();
        resize_window();
    }else {
        $('nav.menu').width('200px').show();
        resize_window();
    }
}

// 自适应函数
function resize_window() {
    var hHeight = $('header.header').height();

    var mWidth = $('nav.menu').width();

    $('nav.menu').css({
        'height': '100vh'
    });

    $('.content').css({
        'width': 'calc(100vw - '+ mWidth + 'px)',
        'height': 'calc(100vh - '+ hHeight +'px)',
        'left': mWidth + 'px',
        'top': hHeight + 'px'
    });
}

// 显示loading动画
function show_loading() {
    $('.content .loading').show();
}

// 隐藏loading动画
function hide_loading() {
    $('.content .loading').hide();
}

// header栏点击搜索按钮
function search_item() {
    var item = $('#header_search_item').val().trim();

    if(item != '') {
        alert('对关键字：  [  '+item+'  ]  进行搜索');
    }
}