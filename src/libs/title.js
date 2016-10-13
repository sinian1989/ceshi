/**
 * Created by Administrator on 16-8-30.
 */
export default function (title) {
    // document.title = title;
    // var $body = $('body');
    // // hack在微信等webview中无法修改document.title的情况
    // var $iframe = $('<iframe src="//m.baidu.com/favicon.ico" style="visibility:hidden; opacity:0; position:absolute; z-index:-1;"></iframe>');
    // $iframe.on('load',function() {
    //     setTimeout(function() {
    //         $iframe.off('load').remove();
    //     }, 0);
    // }).appendTo($body);
    document.title = title;
    if(window.navigator.userAgent.search(/MicroMessenger/i) !== -1&&/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        var i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function() {
            setTimeout(function(){
                i.remove();
            }, 0)
        };
        document.body.appendChild(i);
    }
}
