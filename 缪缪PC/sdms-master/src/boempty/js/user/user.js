// header栏点击设置按钮
$(document).on('click','#setting_btn',function() {
    var $right = parseInt($('.setting-menu').css('right'));
    if( $right < 0 ) {
        $('.setting-menu').stop().show().animate({
            'right': '0',
            'opacity': '1'
        },400);
    }else {
        $('.setting-menu').stop().animate({
            'right': '-200px',
            'opacity': '0'
        },400).fadeOut();
    }
});

// 退出系统弹框
function loginout_overlay() {
    $('.overlay').fadeIn(600);
    $('.loginout').animate({
        'marginTop': '0px',
        'opacity': '1'
    },400).show();
}

// 点击确认退出系统按钮
function loginout_confirm() {
    alert('成功退出系統');
    loginout_cancel();
    //window.location.reload();
}

// 点击取消退出系统按钮
function loginout_cancel() {
    $('.loginout').animate({
        'marginTop': '-30px',
        'opacity': '0'
    },400).hide();
    $('.overlay').fadeOut(600);
}