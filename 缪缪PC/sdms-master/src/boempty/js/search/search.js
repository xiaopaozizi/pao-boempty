// 测试数据，后期可删除
var dataList = [
    '0','1','2','3','4','5','6','7','8','9','10',
    '11','22','33','44','55','66','77','88','99',
    '111','222','333','444','555','666','777','888','999',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'AA','BB','CC','DD','EE','FF','GG','HH','II','JJ','KK','LL','MM','NN','OO','PP','QQ','RR','SS','TT','UU','VV','WW','XX','YY','ZZ',
    'AAA','BBB','CCC','DDD','EEE','FFF','GGG','HHH','III','JJJ','KKK','LLL','MMM','NNN','OOO','PPP','QQQ','RRR','SSS','TTT','UUU','VVV','WWW','XXX','YYY','ZZZ',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'aa','bb','cc','dd','ee','ff','gg','hh','ii','jj','kk','ll','mm','nn','oo','pp','qq','rr','ss','tt','uu','vv','ww','xx','yy','zz',
    'aaa','bbb','ccc','ddd','eee','fff','ggg','hhh','iii','jjj','kkk','lll','mmm','nnn','ooo','ppp','qqq','rrr','sss','ttt','uuu','vvv','www','xxx','yyy','zzz'
];

// 输入框失去焦点，搜索框消失
$(document).on('click',function() {
    $('.search-result').slideUp('fast');
});

// 输入框获取焦点，判断输入框是否出现
$(document).on('click','.input-autocomplete',function(e) {
    var $text = $(this).val();
    !$text ? $(this).next().slideUp('fast') : '';
    e.stopPropagation();
});

// 输入字符自动匹配
$(document).on('keyup','.input-autocomplete',function() {
    var $text = $(this).val().trim();
    if( $text ) {
        var $result = [];
        for( let i in dataList ) {
            dataList[i].indexOf($text) >= 0 ? $result.push(dataList[i]) : '';
        }
        let obj = $(this).attr('id');
        show_search_result(obj,$result);
    }else {
        $(this).next().children().children('li').remove();
    }
});

// 点击搜索结果进行赋值
$(document).on('click','.search-result ul li',function(e) {
    let $str = $(this).text();
    $(this).parent().parent().prev().val($str);
    $('.search-result').slideUp('fast');
    e.stopPropagation();
});

// 显示搜索结果函数
function show_search_result(obj,$result) {
    $('#'+obj).next().children().children('li').remove();
    var $str = '';
    for( let i in $result ) {
        $str += '<li>'+ $result[i] +'</li>';
    }
    $('#'+obj).next().children().append($str);
    $('#'+obj).next().slideDown('fast');
}