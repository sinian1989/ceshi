import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
import base from '../libs/base';
import pingpp from '../libs/pingpp';
class Odetail extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    componentWillMount(){
        const {params:{oid,openid},actions} = this.props;
        actions.getorderinfo(oid)
    }
    componentDidMount(){
        const {params:{oid,openid},actions} = this.props;
        if (!openid && base.device.isWeixin) {
            location.href = location.origin + '/test/GetOpenID/?htmlurl=odetail/' + oid;
        }
    }
    cancelOrder(){
        const {actions} = this.props;
        base.ui.confirm('确认取消这个订单么？', ()=> {
            var oid = this.props.params.oid;
            $.ajax('/api/shop/COrder', {data: {id: oid}}).done((res)=> {
                if (res.status !== 1) {
                    base.ui.alert(res.msg);
                    return false;
                }
                actions.setstate(0);
            })
        })
    }
    goonpay(){
        $('.pay').slideDown(500);
        $('.acc-box').slideUp(500);
        $('.zezao').show();
    }
    paytp(e) {
        const {params:{oid,openid},actions} = this.props;
    var channel;
    var $this = $(e.currentTarget);
    if (e.currentTarget.classList.contains('zhifu')) {
        channel = 'alipay_wap';
        $this.attr('disabled', true);
    }
    else if (e.currentTarget.classList.contains('weixin')) {
        channel = 'wx_pub';
        $this.attr('disabled', true);
    } else if (e.currentTarget.classList.contains('qux')) {
        $('.pay').slideUp(500);
        $('.acc-box').slideDown(500);
        $('.zezao').hide();
        return false;
    }
    if (window.navigator.userAgent.indexOf('BoBoiOS') !== -1 || window.navigator.userAgent.indexOf('BoBoAndroid') !== -1) {
        var num1 = window.navigator.userAgent.indexOf('BoBoiOS/');
        var num2 = window.navigator.userAgent.indexOf('BoBoAndroid/');
        var typenum1 = parseFloat(window.navigator.userAgent.slice(num1 + 8));
        var typenum2 = parseFloat(window.navigator.userAgent.slice(num2 + 12));
        if (typenum1 >= 3.6 || typenum2 >= 3.6) {
            if (e.currentTarget.classList.contains('zhifu')) {
                channel = 'alipay';
                $('.zezao .tzzf').show();
            }
            else if (e.currentTarget.classList.contains('weixin')) {
                channel = 'wx';
                $('.zezao .tzzf').show();
            }
            //商城课程
            $.ajax({
                url: '/api/WeiXinPay/PingPay',
                data: {openid: openid, orderid: oid, channel: channel}
            }).done(function (response) {
                if (response === false) return false;

                if (response.status !== 1) {
                    base.ui.alert(response.msg);
                    return false;
                }
                var res = JSON.stringify(response.info);
                BoJSBridge.nativePayment({charge: res}, function (status, msg) {
                    if (msg == 'cancel') {
                        base.ui.alert('取消支付');
                        location.hash = '#/odetail/' + oid + '/' + openid;
                        return false;
                    } else if (status == 1) {
                        base.ui.alert('支付成功');
                        location.hash = '#/odetail/' + oid + '/' + openid;
                    } else if (msg == 'fail') {
                        base.ui.alert('支付失败');
                        location.hash = '#/odetail/' + oid + '/' + openid;
                        return false;
                    }

                });
            });
        } else {
            if (e.currentTarget.classList.contains('weixin')) {
                base.ui.alert('该浏览器不支持微信支付，请在微信打开');
                return false;
            } else if (e.currentTarget.classList.contains('zhifu')) {
                $('.zezao .tzzf').show().text('波波网APP已经全新升级，获得最佳支付体验请赶快升级APP吧～');
                //商城课程
                $.ajax({
                    url: '/api/WeiXinPay/PingPay',
                    data: {
                        openid: openid,
                        orderid: oid,
                        channel: 'alipay_wap',
                        successurl: 'http://shop.hairbobo.com/shop/index.html#odetail/' + oid + '/' + openid,
                        cancelurl: 'http://shop.hairbobo.com/shop/index.html#odetail/' + oid + '/' + openid
                    }
                }).done(function (response) {
                    if (response === false) return false;

                    if (response.status !== 1) {
                        base.ui.alert(response.msg);
                        return false;
                    }
                    pingpp.createPayment(response.info, function (result, error) {
                        //if (result == "success") {
                        //    // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                        //    base.ui.alert(result);
                        //} else if (result == "fail") {
                        //    // charge 不正确或者微信公众账号支付失败时会在此处返回
                        //    base.ui.alert(result);
                        //} else if (result == "cancel") {
                        //    // 微信公众账号支付取消支付
                        //    base.ui.alert(result);
                        //}
                    });
                });
            }
        }

    } else if (base.device.isWeixin) {
        if (e.currentTarget.classList.contains('zhifu')) {
            base.ui.alert('该浏览器不支付支付宝支付，请在其它浏览器打开');
            return false;
        } else if (e.currentTarget.classList.contains('weixin')) {
            $('.zezao .tzzf').show();
            //商城课程
            $.ajax({
                url: '/api/WeiXinPay/PingPay',
                data: {openid: openid, orderid: oid, channel: 'wx_pub'}
            }).done(function (response) {
                if (response === false) return false;

                if (response.status !== 1) {
                    base.ui.alert(response.msg);
                    return false;
                }
                pingpp.createPayment(response.info, function (result, error) {
                    if (result == "success") {
                        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                        base.ui.alert("支付成功");
                        location.hash = '#/odetail/' + oid + '/' + openid;
                    } else if (result == "fail") {
                        // charge 不正确或者微信公众账号支付失败时会在此处返回
                        base.ui.alert("支付失败");
                        location.hash = '#/odetail/' + oid + '/' + openid;
                    } else if (result == "cancel") {
                        // 微信公众账号支付取消支付
                        base.ui.alert("支付取消");
                        location.hash = '#/odetail/' + oid + '/' + openid;
                    }
                });
            });
        }
    } else {
        if (e.currentTarget.classList.contains('weixin')) {
            base.ui.alert('该浏览器不支持微信支付，请在微信打开');
            return false;
        } else if (e.currentTarget.classList.contains('zhifu')) {
            $('.zezao .tzzf').show();
            //商城课程
            $.ajax({
                url: '/api/WeiXinPay/PingPay',
                data: {
                    openid: openid,
                    orderid: oid,
                    channel: 'alipay_wap',
                    successurl: 'http://shop.hairbobo.com/shop/index.html#odetail/' + oid + '/' + openid,
                    cancelurl: 'http://shop.hairbobo.com/shop/index.html#odetail/' + oid + '/' + openid
                }
            }).done(function (response) {
                if (response === false) return false;

                if (response.status !== 1) {
                    base.ui.alert(response.msg);
                    return false;
                }
                //location.hash = '#odetail/' + oid + '/' + openid;
                pingpp.createPayment(response.info, function (result, error) {
                    //if (result == "success") {
                    //    // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                    //    base.ui.alert(result);
                    //} else if (result == "fail") {
                    //    // charge 不正确或者微信公众账号支付失败时会在此处返回
                    //    base.ui.alert(result);
                    //} else if (result == "cancel") {
                    //    // 微信公众账号支付取消支付
                    //    base.ui.alert(result);
                    //}
                });
            });
        }
    }
}
    render() {
        const {params:{oid,openid},actions,detail,puinfo,status,isbuy} = this.props;
        let backstyle={
            display: 'block', width: 300, height: 100,
            lineHeight: 100+'px',
            textAlign:'center',
            margin: '50px auto',
            backgroundColor: 'red',
            color: '#fff', fontSize: 38
        };
        return(
            <div className="order-detail main">
                <div className="container">
                    {detail.status == 2&&isbuy&&
                    <div className="zez"></div>
                    }
                    {detail.status == 2&&isbuy&&
                    <div className="tsxx">
                        <h2>提示信息：</h2>
                        <div>感谢通过波波网购买课程！您的“进修历史”经验值又有新的提升啦，是不是分享给好友炫耀一下？</div>
                        <Link href="javascript:;" className="yes">是</Link>
                        <Link href="javascript:;" className="no">否</Link>
                    </div>
                    }
                    <div className="order-block clearfix">
                        <span className="label f-l">订单编号：{oid}</span>
                        <span className="high-light f-r">{['已取消','未付款','已付款'][detail.status]}</span>
                    </div>
                    <div className="order-block clearfix">
                        <span className="f-l">{detail.name}</span>
                        <span className="f-r" name='tel'>{detail.tel}</span>
                    </div>
                    <div className="order-block clearfix">
                        <h3>商品清单</h3>
                        <ul className="order-goods">
                            <li>
                                <Link className="clearfix" to={'/detail/'+detail.shcid+'/'+detail.uid}>
                                    <img className="good-img f-l" src={'http://img.hairbobo.com/'+puinfo.image}/>
                                        <div className="good-title f-l">
                                            {puinfo.title}
                                            <span style={{display: 'block', marginTop: 8}}>购买数量：{detail.num}</span>
                                            <span className="good-sale">开课时间：{detail.classdate}</span>
                                        </div>
                                        <span className="good-price f-r">¥{puinfo.kind === 0 ? 0 : puinfo.sellingprice}</span>
                                </Link>
                            </li>
                        </ul>
                        <h3>订单信息</h3>
                        <ul className="order-info">
                            <li className="clearfix">
                                <span className="label f-l">支付方式：</span>
                                <span className="high-light f-r">{['','支付宝','微信'][detail.paytype]}</span>
                            </li>
                            <li className="clearfix">
                                <span className="label f-l">下单时间：</span>
                                <span className="high-light f-r">{detail.date}</span>
                            </li>
                            <li className="clearfix">
                                <span className="label f-l">商品总金额：</span>
                                <span className="high-light f-r">{detail.money}元</span>
                            </li>
                        </ul>
                    </div>
                    {status == 1&&
                    <div className="order-block block-btns">
                        <a className="btn cancel-btn" href="javascript:;" onClick={this.cancelOrder.bind(this)}>取消订单</a>
                        <a className="btn buy-btn" href="javascript:;" onClick={this.goonpay.bind(this)}>继续支付</a>
                        </div>
                    }
                    {detail.distributor?
                    <Link style={backstyle} to={'/search/'+detail.uid+'/'+detail.distributor}>返回首页</Link>:
                        <Link style={backstyle} to={'/index/'+detail.uid}>返回首页</Link>
                    }
                    <div className="pay" style={{display: 'none'}}>
                        <button className="zhifu" href="javascript:;" onClick={this.paytp.bind(this)} >
                            <img src="./src/assets/images/zf.png" alt=""/>
                            支付宝
                        </button>
                        <button className="weixin" href="javascript:;" onClick={this.paytp.bind(this)} >
                            <img src="./src/assets/images/wx_03.jpg" alt=""/>
                            微信支付
                        </button>
                        <button className="qux" href="javascript:;" onClick={this.paytp.bind(this)} >取消</button>
                    </div>
                    <div className="zezao" style={{display: 'none'}}>
                        <p className="tzzf" style={{display: 'none'}}>跳转支付中...</p>
                    </div>
                </div>
            </div>
        )
    }
}
const getdata = state => {
    return {
        detail: state.orderinfo.toJS().orderinfo,
        puinfo: state.orderinfo.toJS().puinfo,
        status: state.orderinfo.toJS().status,
        isbuy: state.orderinfo.toJS().isbuy,
    }
}
const buildActionDispatcher=(dispatch)=> {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}
export default connect(
    getdata,
    buildActionDispatcher
)(Odetail)