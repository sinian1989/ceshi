import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
import base from '../libs/base';
import wxapi from '../libs/wxapi';
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isbobo:true
        };
    }
    componentWillMount(){
        const {params:{id},actions} = this.props;
        console.log(111)
        actions.getclassdetail(id)
    }
    componentDidMount() {
        if (location.search.indexOf('from=') !== -1) {
            location.replace(location.origin + location.pathname + location.hash);
        }
        if (window.navigator.userAgent.indexOf('BoBoiOS') !== -1 || window.navigator.userAgent.indexOf('BoBoAndroid') == -1) {
            this.setState({
                isbobo: false
            });
        }
    }
    componentDidUpdate(prevProps) {//已经从新渲染
        const {params:{id,uid}, actions,detail} = this.props;
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
            paginationClickable: true
        });
        $('.dt_width').width($('.rgt_div').width() + 75);
        base.device.isWeixin && wxapi({
            showmenu: true,
            share: {
                imgUrl: 'http://img.hairbobo.com' + detail.image,
                link: location.origin + location.pathname + '#/detail/' + id + '/share',
                desc: '波波网专业教育推荐课程~',
                title: '我觉得' + detail.title + '非常赞，感兴趣的去看看哦~',
                callback: function (reswx) {
                    //统计分享
                }
            }
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    componentWillUnmount () {

    }
    topCtrl(e,index){
        e.stopPropagation();
        let self=e.currentTarget;
        const {params:{id,uid}, actions,detail} = this.props;
        switch (index) {
            case 0:
                if ($(self).hasClass('current')) return false;
                this.refs.msg.textContent=parseInt(this.refs.msg.textContent)+1;
                actions.sendlickorstar(id,uid,1);
                break;
            case 1:
                if ($(self).hasClass('current')) return false;
                actions.sendlickorstar(id,uid,0);
                break;
            case 2:
                //分享的接口在这里
                BoJSBridge.nativeShare({
                    shareImageUrl:'http://img.hairbobo.com' + detail.image, //图片链接（绝对路径），分享到微信会以微信模板显示
                    shareText:'波波网专业教育推荐课程~',//分享的内容
                    shareTitle:'我觉得' + detail.title + '非常赞，感兴趣的去看看哦~',//分享的标题
                    shareUrl:location.origin + location.pathname + '#!/detail/' + id + '/share'//分享的链接
                },function(result){});
                break;
            default:
                break;
        }
    }
    showDate(){
        const {actions,detail} = this.props;
        if(detail.classdate && detail.classdate.length){
            actions.showdatepage()
        }else{
            base.ui.alert('暂无开课时间')
        }
    }
    suredate(){
        const {params:{id,uid}, actions} = this.props;
        let select = $('.show-select').find('span').html();
        let onum = parseInt(this.refs.span.textContent);
        let obj={num:onum, date:select};
        if (select) {
            $('.deposit-date').html(select).show();
            location.hash='#/accounts/'+id+'/'+uid;
            actions.savecount(obj);
            // base.tool.cookie.set('onum', onum);
            // base.tool.cookie.set('odate', select);
        }
        actions.hidedatepage()
    }
    selectNumber(e){
        const {detail} = this.props;
        //商品总数不足时不能选择数量
        if (detail.total === 0) return false;
        let num = parseInt(this.refs.span.textContent);
        switch (e.target.className) {
            case 'minus':
                if (num > 1) {
                    this.refs.span.textContent=num - 1;
                }
                break;
            case 'plus':
                if (num < detail.total) {
                    this.refs.span.textContent=num + 1;
                }
                else {
                    base.ui.alert('购买数量不能超过商品总数')
                }
                break;
            default:
                break;
        }
    }
    submitBuy(){
        let self=this;
        if(this.refs.buy.textContent=='已售完'){
            return false;
        }
        var select = $('.show-select').find('span').html();
        if (!select) {
                   base.ui.alert('请选择开班时间', function () {
                       self.showDate()
                   });
        }
    }
    moreclass(){
        const {params:{uid},actions,detail} = this.props;
        actions.getclubclass(detail.uid);
        location.hash='#/classlist/'+uid;
    }
    poplxw(){
        $('.zezao').show();
        $('.poptell').fadeIn();
    }
    zezao(){
        $('.zezao').hide();
        $('.poptell').fadeOut();
        $('#popxy').fadeOut();
    }
    phone(){
        const {params:{id,uid}, detail} = this.props;
        let val=$('.poptell input').val();
        if (!base.regexp.phone(val)) {
            base.ui.alert('请输入有效的手机号码');
            return false;
        }
        $.ajax('/API/Shop/AddCONSULTATION',{data:{sid:id,omid:detail.uid,uid:uid,cell:val}}).done(function (res) {
            if (res.status == 1) {
                $('.zezao').hide();
                $('.poptell').fadeOut();
                base.ui.alert('联系方式已提交学院，学院工作人员稍后会致电给您~!')
            }
        })
    }
    call(){
        // $.ajaxSetup({
        //     beforeSend: function () {},
        //     error: function () {},
        //     complete: function () {}
        // });
        const {params:{id}} = this.props;
        $.ajax({url: '/API/Shop/Addclickcell',type:'post', data: {shcid:id}}).done(function (res) {

        })
    }
    showewm(){
        $('.zezao').show();
        $('#popxy').fadeIn();
    }
    render() {
        let uid = this.props.params.uid;
        let id = this.props.params.id;
        let isbobo=this.state.isbobo;
        let margintop=isbobo?0:81;
        const {actions,alldata,detail,images,nearest,peoplestr,current,star} = this.props;
        return(
            <div className="main detail">
                <div className="container">
                    <div className="swiper-container banners" style={{marginTop:margintop}}>
                        <ul className="swiper-wrapper" style={{width:750*images.length}}>
                            {images.map((item,index)=>
                                <li className="swiper-slide" key={index}>
                                    <img src={'http://img.hairbobo.com'+item}/>
                                </li>
                            )}
                        </ul>
                        <div className="swiper-pagination"></div>
                        {isbobo&&
                        <div className="detail-top">
                            <a id="alike" ref="msg" className={detail.iflike==1||current?'one current':'one'} href="javascript:;" onClick={(e)=>this.topCtrl(e,0)}>{detail.like}</a>
                            <a id="afav"  className={detail.ifFav==1||star?'two current':'two'} href="javascript:;" onClick={(e)=>this.topCtrl(e,1)}></a>
                            <a id="classb" className="three" href="javascript:;" onClick={(e)=>this.topCtrl(e,2)}></a>
                        </div>
                        }
                    </div>
                    <div className="content">
                        <h1>{detail.title}</h1>
                        <div className="yh_price">
                            {detail.vipsellingprice?
                                <span className="th">¥&nbsp;&nbsp;<b>{detail.frontmoney}</b>&nbsp;&nbsp;/{detail.vipsellingprice}天</span>:
                                <span className="th">¥&nbsp;&nbsp;<b>{detail.frontmoney}</b></span>
                            }
                            <span className="sc">市场价格：{detail.listprice}</span>
                        </div>
                        <div className="yhxx">
                            <span className="label">优惠信息</span>
                            <span className="shrq">{detail.moneyinfo}</span>
                        </div>
                        {detail.bobogift&&
                        <div className="yhxx xj">
                            <span className="label" style={{color:'#ec4243'}}>波波有礼</span>
                            <span className="shrq" style={{color:'#ec4243'}}>{detail.bobogift}</span>
                        </div>
                        }
                        {detail.gift&&
                        <div className="yhxx xj">
                            <span className="label" style={{color:'#3f48cc'}}>学院有礼</span>
                            <span className="shrq" style={{color:'#3f48cc'}}>{detail.gift}</span>
                        </div>
                        }
                        <div className="yhxx xj">
                            <span className="label">适合学员</span>
                            <span className="shrq" dangerouslySetInnerHTML={{__html:peoplestr}}></span>
                        </div>
                    </div>
                    <div className="gz_detail">
                        <Link to={'/dssppl/'+id+'/1/'+uid}>
                            <img src="./src/assets/images/del_03.jpg" alt=""/>
                            <span>导师详情<b>Teacher</b></span>
                        </Link>
                        <Link to={'/dssppl/'+id+'/2/'+uid}>
                            <img src="./src/assets/images/del_05.jpg" alt=""/>
                            <span>课程详情<b>Details</b></span>
                        </Link>
                        <Link to={'/dssppl/'+id+'/3/'+uid}>
                            <img src="./src/assets/images/del_07.jpg" alt=""/>
                            <span>评价(<i>{detail.commentcou}</i>)<b>Comments</b></span></Link>
                    </div>
                    <div className="content">
                        <div className="count">
                            <span className="label">销&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span>
                            <span>{detail.sold}</span>
                        </div>
                        <div className="addr">
                            <span className="label">上课地址</span>
                            {detail.lon&&detail.lat?
                                <a className="ar shrq" href={'map.html?name='+detail.classaddress+'&lon='+detail.lon+'&lat='+detail.lat}>
                                    <p style={{marginTop: 0}}>{detail.oname }</p>
                                    {detail.classaddress}
                                </a>:
                                <a className="ar shrq" href="javascript:;">
                                    <p style={{marginTop: 0}}>{detail.oname }</p>
                                    {detail.classaddress}
                                </a>
                            }
                        </div>
                    </div>
                    <div className="content con_last">
                        <div className='count'>
                            <span className="label">住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宿</span>
                            <span className="shrq">{detail.stay}</span>
                        </div>
                        <div className="qt">
                            <span className="label">其它费用</span>
                            <span className="shrq">{detail.cost}</span>
                        </div>
                        <div className="gj">
                            <p>上课需带工具：</p>
                            <span>{detail.crowd}</span>
                        </div>
                    </div>
                    <div className="content kbsj">
                        <div className="date">
                            <span className="label">开课日期</span>
                            <span className="deposit-date">{nearest}</span>
                            <a className="selectdate" href="javascript:;" onClick={this.showDate.bind(this)}>
                                更多开课日期
                                <i className="iconfont icon" data-icon="&#xe600;"></i>
                            </a>
                        </div>
                        <div className="kcsc">
                            <span className="label">课程时长</span>
                            {detail.vipsellingprice?
                                <span className="shrq">{detail.vipsellingprice}天</span>:
                                <span className="shrq">不固定</span>
                            }
                        </div>
                        <div className="gmsl" onClick={this.selectNumber.bind(this)}>
                            <span className="label">购买数量</span>
                            <a className="minus" href="javascript:;"></a>
                            <span className="onum" ref="span">1</span>
                            <a className="plus" href="javascript:;"></a>
                        </div>
                    </div>
                </div>
                {!isbobo&&<div className="detail-lg">
                    <span><img src="./src/assets/images/dtllg.png" alt=""/></span>波波网专业教育推荐课程
                </div>
                }
                <a href={'tel:'+detail.cell} className="call" onClick={this.call.bind(this)}>联系学院</a>
                {detail.oblogo&&!isbobo&&<a href="javascript:;" className="attention" onClick={this.showewm.bind(this)}>关注学院</a>}
                <div className="zezao" style={{display: 'none'}} onClick={this.zezao.bind(this)}></div>
                {detail.oblogo&&
                <div id="popxy" className="popxy" style={{display: 'none'}}>
                    <img src={'http://bobosquad.qiniudn.com/'+detail.oblogo+'?imageView2/0/w/500/h/500'} alt=""/>
                </div>
                }
                <div className="poptell" style={{display: 'none'}}>
                    <h2>请填写您的手机号码</h2>
                    <input type="text" maxLength="11" placeholder="手机号" />
                    <a href="javascript:;" className="phone" onClick={this.phone.bind(this)}><span>确认手机号码</span><span className="lxw">请学院致电联系我</span></a>
                </div>
                <div className="detail-bottom row">
                    {detail.uid!=='56ba94e9-013c-40d2-937d-ea185460fafd'&&
                    <Link className="link-zy col-20" to={'/schoolpage/'+detail.uid+'/'+uid}>学院主页</Link>
                    }
                    <a className="link-qq col-20" href="javascript:;" onClick={this.moreclass.bind(this)}>更多课程</a>
                    <a className="link-tel col-20" href="javascript:;" onClick={this.poplxw.bind(this)}>请联系我</a>
                    {detail.uid!=='56ba94e9-013c-40d2-937d-ea185460fafd'?
                        <div className="col-40">
                            <a className="buy-btn f-r" onClick={this.submitBuy.bind(this)} ref="buy" href="javascript:;">
                                <div className="dt_width"><div className="other_div"><p>支付</p>定金</div><div className="rgt_div"><i>￥</i>
                                    {detail.sellingprice}</div></div>
                            </a>
                        </div>:
                        <div className="col-60">
                            <a className="buy-btn f-r" onClick={this.submitBuy.bind(this)} ref="buy" href="javascript:;">
                                <div className="dt_width"><div className="other_div"><p>支付</p>定金</div><div className="rgt_div"><i>￥</i>
                                    {detail.sellingprice}</div></div>
                            </a>
                        </div>
                    }
                </div>
                <div id="scroll-date" className={alldata.showdate?'date-box show-date':'date-box'}>
                    <div className="scroll">
                        <div id="date"></div>
                        <a className="confrim-date" href="javascript:;" onClick={this.suredate.bind(this)}>确定</a>
                    </div>
                </div>
            </div>
        )
    }
}
const getdata = state => {
    return {
        alldata:state.detailclass.toJS(),
        detail: state.detailclass.toJS().detail,
        images: state.detailclass.toJS().images,
        nearest: state.detailclass.toJS().nearest,
        peoplestr: state.detailclass.toJS().people,
        current: state.detailclass.toJS().current,
        star: state.detailclass.toJS().star,
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
)(Detail)
