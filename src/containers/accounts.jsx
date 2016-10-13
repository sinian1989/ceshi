import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
import base from '../libs/base';
import pingpp from '../libs/pingpp';
class Accounts extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        const {params:{id,uid,openid},actions} = this.props;
        actions.getclassdetail(id,uid);
        actions.getorderdata(uid);
    }
    componentDidMount() {
        const {params:{id,uid,openid},actions} = this.props;
        //微信授权
        if (!openid && base.device.isWeixin) {
            location.href = location.origin + '/test/GetOpenID/?htmlurl=accounts/' + id + '/' + uid;
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    componentWillUnmount () {

    }
    // changeinput(e){
    //     let $this=e.currentTarget;
    //     console.log($this)
    // }
    // namechange(event){
    //     let val =this.refs.name.value;
    //     console.log(val)
    //     console.log(event.target.value)
    //     // this.refs.name.value=event.target.value;
    // }
    accOrder(){
        var formdata = $('.account-form').serialize();
        // console.log(formdata)
        if (formdata.indexOf('name=&') !== -1) {
            base.ui.alert('姓名不能为空');
            return false;
        }
        if (formdata.indexOf('tel=&') !== -1) {
            base.ui.alert('手机号不能为空');
            return false;
        }
        if (!base.regexp.phone($('[name=tel]').val())) {
            base.ui.alert('请输入有效的手机号码');
            return false;
        }
        $('.pay').slideDown(500);
        $('.acc-box').slideUp(500);
        $('.zezao').show();
    }
    paytp(e){
        var uid = this.props.params.uid;
        var openid = this.props.params.openid;
        const {actions,detail,address} = this.props;
        var formdata = $('.account-form').serialize();
        var name=$('#name').val();
        var tel=$('#tel').val();
        var shcid=$('#shcid').val();
        var uidm=$('#uidm').val();
        var num=$('#num').val();
        var classdate=$('#classdate').val();
        var paytype=1;
        //var paytype=this.model.get('paytype');

        var oid = '';
        var channel;
        var $this = $(e.currentTarget);
        if (e.currentTarget.classList.contains('zhifu')) {
            channel = 'alipay_wap';
            //$('.zezao .tzzf').show();
            $this.attr('disabled', true);
        }
        else if (e.currentTarget.classList.contains('weixin')) {
            //$('.zezao .tzzf').show();
            channel = 'wx_pub';
            $this.attr('disabled', true);
        } else if (e.currentTarget.classList.contains('qux')) {
            $('.pay').slideUp(500);
            $('.acc-box').slideDown(500);
            $('.zezao').hide();
            return false;
        }
        //波波俱乐部课程
        if (detail.kind === 0) {
            $.ajax('/api/shop/AddClubOrder', {data: formdata}).done(function (res) {
                if (res.status !== 1) {
                    base.ui.alert(res.msg);
                    return false;
                }
                location.hash = '#/odetail/' + res.info;
            });
            return false;
        }
        if (window.navigator.userAgent.indexOf('BoBoiOS') !== -1 || window.navigator.userAgent.indexOf('BoBoAndroid') !== -1) {
            var num1 = window.navigator.userAgent.indexOf('BoBoiOS/');
            var num2 = window.navigator.userAgent.indexOf('BoBoAndroid/');
            var typenum1 = parseFloat(window.navigator.userAgent.slice(num1 + 8));
            var typenum2 = parseFloat(window.navigator.userAgent.slice(num2 + 12));
            if (typenum1 >= 3.6 || typenum2 >= 3.6) {
                //base.ui.alert('跳转中...');
                if (e.currentTarget.classList.contains('zhifu')) {
                    channel = 'alipay';
                    $('.zezao .tzzf').show();
                    paytype=3;
                }
                else if (e.currentTarget.classList.contains('weixin')) {
                    channel = 'wx';
                    $('.zezao .tzzf').show();
                    paytype=4;
                }
                //商城课程
                $.ajax('/api/shop/AddOrder', {data: {name:name,tel:tel,shcid:shcid,uid:uidm,num:num,classdate:classdate,paytype:paytype}}).then(function (res) {
                    if (res.status !== 1) {
                        base.ui.alert(res.msg);
                        return false;
                    }
                    if (res.msg === '1') {
                        location.hash = '#/odetail/' + res.info + '/' + openid;
                        return false;
                    }
                    oid = res.info;
                    return $.ajax({
                        url: '/api/WeiXinPay/PingPay',
                        data: {openid: openid, orderid: res.info, channel: channel}
                    });
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
                    paytype=3;
                    $.ajax('/api/shop/AddOrder', {data: {name:name,tel:tel,shcid:shcid,uid:uidm,num:num,classdate:classdate,paytype:paytype}}).then(function (res) {
                        if (res.status !== 1) {
                            base.ui.alert(res.msg);
                            return false;
                        }
                        if (res.msg === '1') {
                            location.hash = '#/odetail/' + res.info + '/' + openid;
                            return false;
                        }
                        oid = res.info;
                        return $.ajax({
                            url: '/api/WeiXinPay/PingPay',
                            data: {
                                openid: openid,
                                orderid: res.info,
                                channel: 'alipay_wap',
                                successurl: 'http://shop.hairbobo.com/shop/index.html#odetail/' + oid + '/' + openid,
                                cancelurl: 'http://shop.hairbobo.com/shop/index.html#odetail/' + oid + '/' + openid
                            }
                        });
                    }).done(function (response) {
                        if (response === false) return false;

                        if (response.status !== 1) {
                            base.ui.alert(response.msg);
                            return false;
                        }
                        //location.hash='#odetail/' + oid + '/' + openid;
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
                paytype=6;
                $.ajax('/api/shop/AddOrder', {data: {name:name,tel:tel,shcid:shcid,uid:uidm,num:num,classdate:classdate,paytype:paytype}}).then(function (res) {
                    if (res.status !== 1) {
                        base.ui.alert(res.msg);
                        return false;
                    }
                    if (res.msg === '1') {
                        location.hash = '#/odetail/' + res.info + '/' + openid;
                        return false;
                    }
                    oid = res.info;
                    return $.ajax({
                        url: '/api/WeiXinPay/PingPay',
                        data: {openid: openid, orderid: res.info, channel: 'wx_pub'}
                    });
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
                paytype=5;
                $.ajax('/api/shop/AddOrder', {data: {name:name,tel:tel,shcid:shcid,uid:uidm,num:num,classdate:classdate,paytype:paytype}}).then(function (res) {
                    if (res.status !== 1) {
                        base.ui.alert(res.msg);
                        return false;
                    }
                    if (res.msg === '1') {
                        location.hash = '#/odetail/' + res.info + '/' + openid;
                        return false;
                    }
                    oid = res.info;
                    return $.ajax({
                        url: '/api/WeiXinPay/PingPay',
                        data: {
                            openid: openid,
                            orderid: res.info,
                            channel: 'alipay_wap',
                            successurl: 'http://shop.hairbobo.com/shop/index.html#odetail/' + oid + '/' + openid,
                            cancelurl: 'http://shop.hairbobo.com/shop/index.html#odetail/' + oid + '/' + openid
                        }
                    });
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
        let uid = this.props.params.uid;
        let id = this.props.params.id;
        let paytype = base.device.isWeixin ? 2 : 1;
        // let num=parseInt(base.tool.cookie.get('onum'));
        // let date=base.tool.cookie.get('odate');
        const {actions,detail,address,num,date} = this.props;
        return(
            <div className="account main">
                <div className="container">
                    <h3>购买者信息&nbsp;<span>(请如实填写,便于学院与您联系)</span></h3>
                    <form className="account-form">
                        <div className="acc-input">
                            <label htmlFor="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label>
                            <input id="name" type="text" name="name" placeholder="您的姓名" ref="name" defaultValue={address.name}/><br/>
                                <label htmlFor="tel">联系电话</label>
                                <input id="tel" type="text" name="tel" placeholder="您的手机号" defaultValue={address.cell} maxLength="11" />
                                    <input type="hidden" name="shcid" defaultValue={id} id="shcid"/>
                                        <input type="hidden" name="uid" defaultValue={uid} id="uidm"/>
                                            <input type="hidden" name="num" defaultValue={num} id="num"/>
                                                <input type="hidden" name="classdate" defaultValue={detail.kind === 0? detail.classbegin : date } id="classdate"/>
                                                    <input type="hidden" name="paytype" defaultValue={paytype}/>
                        </div>
                    </form>
                    <div className="acc-title">购买清单</div>
                    <ul className="order-goods acc-goods">
                        <li>
                            {detail.kind==0?
                                <a className="clearfix" href="javascript:;">
                                    <img className="good-img f-l" src={'http://img.hairbobo.com/'+detail.image}/>
                                        <div className="good-title f-l">
                                            {detail.title}
                                            <span className="good-sale">{date}开课</span>
                                        </div>
                                        <span className="good-price f-r">¥0</span>
                                </a>:
                                <Link className="clearfix" to={'/detail/'+ id + '/' + uid}>
                                <img className="good-img f-l" src={'http://img.hairbobo.com/'+detail.image}/>
                                <div className="good-title f-l">
                                {detail.title}
                                <span className="good-sale">{date}开课</span>
                                </div>
                                <span className="good-price f-r">¥{detail.kind === 0? 0 : detail.sellingprice }</span>
                                </Link>
                            }
                        </li>
                    </ul>
                    <div className="gm_count">
                        <span>购买数量：<b>×{num}</b></span>
                        <span className="hj">合计：<b>¥{detail.sellingprice*num}</b></span>
                    </div>
                    <div className="aqzf">
                        <i></i>
                        <a href="javascript:;">
                            安全支付（支付宝、微信支付）
                        </a>
                    </div>
                    <div className="sm">
                        <div className="lf">说明：</div>
                        <ul className="rg">
                            <li>1) 本订单支付金额为学费的定金部分;</li>
                            <li>2) 定金支付后，学院将为您保留课程名额;</li>
                            <li>3) 学费的剩余部分，学院会要求您在开课前或开课时支付;</li>
                        </ul>
                    </div>
                    <div className="pay" style={{display: 'none'}} >
                        <button className="zhifu" href="javascript:;" onClick={this.paytp.bind(this)}>
                            <img src="./src/assets/images/zf.png" alt=""/>
                            支付宝
                        </button>
                        <button className="weixin" href="javascript:;" onClick={this.paytp.bind(this)}>
                            <img src="./src/assets/images/wx_03.jpg" alt=""/>
                            微信支付
                        </button>
                        <button className="qux" href="javascript:;" onClick={this.paytp.bind(this)}>取消</button>
                    </div>
                    <div className="zezao" style={{display: 'none'}}>
                        <p className="tzzf" style={{display: 'none'}}>跳转支付中...</p>
                    </div>
                </div>
                <div className="acc-box">
                    {detail.kind === 0?
                        <a className="acc-btn" href="javascript:;" onClick={this.accOrder.bind(this)}>立即报名</a>:
                        <a className="acc-btn" href="javascript:;" onClick={this.accOrder.bind(this)}>确认并支付</a>
                    }
                </div>
            </div>
        )
    }
}
const getdata = state => {
    return {
        // alldata:state.detailclass.toJS(),
        detail: state.detailclass.toJS().detail,
        address:state.orderdata.toJS().orderdata,
        num:state.orderdata.toJS().num,
        date:state.orderdata.toJS().date,
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
)(Accounts)
