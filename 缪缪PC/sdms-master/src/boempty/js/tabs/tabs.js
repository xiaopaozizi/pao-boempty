function change_tab(index) {
    $('.tabs li').eq(index).addClass('active');
}

function change_panel(index) {
    $('.tabs-panel').eq(index).show();
}

function hide_tab_panel(index) {
    $('.tabs li').eq(index).removeClass('active');
    $('.tabs-panel').eq(index).hide();
}