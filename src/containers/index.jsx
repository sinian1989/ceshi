import React from 'react';
import {Link} from 'react-router'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
import Selectclass from '../components/selectclass'
import Superkcb from '../components/superkcb'
// import { getuserdata } from '../actions/getuser'
import base from '../libs/base';
import wxapi from '../libs/wxapi';
import title from '../libs/title';
class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){//将要插入真实 DOM
        let uid = this.props.params.uid;
        const {actions } = this.props;
        actions.getuserdata(uid);
        actions.getschoolbanner(uid);
        actions.getrqkc(uid);
        actions.gettbtj(uid);
        actions.getcnxh(uid);
        actions.getxxkc();
    }
    componentDidMount() {//已经插入真实 DOM
        if (location.search.indexOf('from=') !== -1) {
            location.href = location.origin + location.pathname + location.hash;
        }
        title('波波网专业教育');
        // let self=this;
        // window.addEventListener('scroll', this.handleScroll.bind(this));
        $(window).on('scroll', ()=> {
            var iTop = $(document).scrollTop();
            if (iTop > 200) {
                $('.wd_hd').fadeIn();
            }
            else {
                $('.wd_hd').fadeOut();
            }
        });
        require(['../libs/jquery.lazyload.js'],()=>{
            $(".lazyload").lazyload({
                placeholder : "src/assets/images/bobo.png",
                effect: 'fadeIn'
            });
        });
    }
    componentWillUpdate(){//将要从新渲染
    }
    componentDidUpdate(prevProps) {//已经从新渲染
        base.device.isWeixin && wxapi({
            showmenu: true,
            share: {
                imgUrl: 'http://shop.hairbobo.com/shop/images/logo.png',
                link: location.origin + location.pathname + '#/index/share',
                desc: '波波网专业教育栏目~',
                title: '波波网联合数十家优质合作学院提供的最优惠课程',
                callback: function (reswx) {
                    //统计分享
                }
            }
        });
    }
    //备注：在react组件里面，要开启条件更新这个生命周期函数 shouldComponentUpdate， 才会对把这个性能提高点释放出来，类似这样
    shouldComponentUpdate(nextProps, nextState) {//组件判断是否重新渲染时调用 true为渲染
        return nextProps != this.props;
    }
    componentWillReceiveProps(){//已加载组件收到新的参数时调用
    }
    componentWillUnmount () {//组件将要移除的时候
        $(window).off('scroll');
    }
    searchAction(event){
        let val =this.refs.searchInput.value;
        const {params:{uid},actions} = this.props;
        if(event.keyCode==13){
            actions.getsearchlist(val);
            location.hash='#/classlist/'+uid;
        }
    }
    searchword(){
        let val =this.refs.searchInput.value;
        const {params:{uid},actions} = this.props;
        actions.getsearchlist(val);
        location.hash='#/classlist/'+uid;
    }
    showkcb(e){
        $('.offset_kcb').slideToggle();
    }
    clubidtoclass(){
        const {params:{uid},actions} = this.props;
        let clubid='f6b474f4-13d4-4fbd-a0f3-95dff1de9792';
        actions.getclubclass(clubid);
        location.hash='#/classlist/'+uid;
    }
    defaultclasslist(){
        const {params:{uid},actions} = this.props;
        actions.defaultlist();
        location.hash='#/classlist/'+uid;
    }
    toclasslisttop(){
        const {params:{uid},actions} = this.props;
        actions.gettop10list();
        location.hash='#/classlisttop/'+uid;
    }
    totop(){
        $('html,body').animate({scrollTop: '0'}, 500);
    }
    render() {
        let uid = this.props.params.uid;
        const {actions,user,showpic,rqkclist,tbtjlist,cnxhlist,xxkclist,classtype} = this.props;
        let style = {marginRight: 20},top10style={color: '#f1781e',fontSize: 26,fontWeight: 'bold'};
        let rqkchtml=[];
        let star;
        for(var index=0;index<rqkclist.length;index++){
            var e=rqkclist[index];
            if(index==0){
                rqkchtml.push(
                    <Link to={'/detail/'+e.id+'/'+uid} data-rank={'TOP'+(parseInt(index)+1)} key={index}>
                        <div className="img">
                            <img src={'http://img.hairbobo.com/'+e.image} />
                        </div>
                        <div className="text">
                            <div className="tit">{e.title}</div>
                            <div className="boot">人气：
                                <i>★</i>
                                <i>★</i>
                                <i>★</i>
                                <i>★</i>
                                <i>★</i>
                            </div>
                        </div>
                    </Link>
                )
            }else{
                if(index ==1||index==2){
                    star='<i>★</i><i>★</i><i>★</i><i>★</i>'
                }else if(index ==3||index==4){
                    star='<i>★</i><i>★</i><i>★</i>'
                }else if(index ==5||index==6){
                    star='<i>★</i><i>★</i><i>★</i>'
                }
                rqkchtml.push(
                    <Link className="row" to={'/detail/'+e.id+'/'+uid} data-rank={'TOP'+(parseInt(index)+1)} key={index}>
                        <div className="col-30">
                            <div className="img">
                                <img src={'http://img.hairbobo.com/'+e.image}/>
                            </div>
                        </div>
                        <div className="col-70 text">
                            <div className="tit">{e.title}</div>
                            <div className="boot">
                                人气：
                                {star}
                            </div>
                        </div>
                    </Link>
                )
            }
        }
        return(
            // {/*<div className="index" id="index" onClick={() => getuserdata(uid)}>*/}
            // {/*<div className="index" id="index" onClick={() => actions.getuserdata(uid)}>*/}
             <div className="index" id="index">
                <div className="user-info row">
                    <div className="col-20" style={style}>
                        {
                            user.attach?<Link to="javascript:;" className="user-pic">
                                <img src={user.logo} alt=""/>
                            </Link>: <Link to={'/olist/'+uid} className="user-pic">
                                <img src={'http://img.hairbobo.com/'+user.logo} alt=""/>
                            </Link>
                        }
                    </div>
                    <div className="col-30">
                        <div className="name">{user.nickname}</div>
                        {
                            user.kind === 1&&
                            <div className="level">
                                {
                                    user.attach || user.grade === ''?'技术等级：无':'我的等级：'+('ABCDE'.charAt(user.grade))+'级'
                                }
                            </div>
                        }
                    </div>
                    <div className="col-45">
                        {
                            user.kind==1&&!user.attach&&
                            <div>
                                <Link className="link-pc" to={'/evaluating/0/'+uid}>自我评测</Link>
                                <Link className="link-pca" to={user.attach?'javascript:;':"/olist/"+uid}>我的订单</Link>
                            </div>
                        }
                    </div>
                </div>
                <div className="class-type row">
                    <Link className="col-50" to={'/hairschool/'+uid}><img src="./src/assets/images/hzxy.png" alt=""/></Link>
                    {/*<Link className="col-50" to={'boboclass/'+uid}><img src="./src/assets/images/bbjlb.png"/></Link>*/}
                    <a className="col-50" href="https://wap.koudaitong.com/v2/goods/3659sqcllstrd"><img src="./src/assets/images/bbjxy.jpg"/></a>
                </div>
                <div className="search_ss">
                    <input className="searc" type="text" placeholder="查找课程点这里" onKeyUp={this.searchAction.bind(this)} ref="searchInput"/>
                    <b onClick={this.searchword.bind(this)}></b>
                    <div className="kcb" onClick={(e)=>this.showkcb(e)}><span>超级课程表</span><i className="iconfont" data-icon="&#xe603;"></i></div>
                    <div className="filter" onClick={() => actions.showselect()}><span>高级筛选</span><i className={classtype.show?'iconfont current':'iconfont'} data-icon="&#xe603;"></i></div>
                </div>
                 <Superkcb uid={uid} />
                 <Selectclass uid={uid}/>
                <div className="school_banner">
                    {
                        showpic.length==2?showpic.map((e, index) =>
                            e.ouid=='223a9c64-4e59-40ef-80d3-5eeea631b4a1'?
                                <a href="tel:0371-66988299" className="mid" key={index}>
                                    <img src={'http://img.hairbobo.com'+e.relargelogo} alt=""/>
                                </a>:
                            <Link to={'/schoolpage/'+e.ouid+'/'+uid} className="mid" key={index}>
                                <img src={'http://img.hairbobo.com'+e.relargelogo} alt=""/>
                            </Link>
                        ) :showpic.map((e, index) =>
                            <Link to={'/schoolpage/'+e.ouid+'/'+uid} className="big" key={index}>
                                <img src={'http://img.hairbobo.com'+e.relargelogo} alt=""/>
                            </Link>
                        )
                    }
                </div>
                 <div className="xytg">
                     <Link onClick={this.clubidtoclass.bind(this)}>
                        <img src="http://bobosquad.qiniudn.com/ad.jpg?v=" alt="" />
                     </Link>
                 </div>
                 <div className="block rqkc">
                     <Link className="title" onClick={this.toclasslisttop.bind(this)} style={top10style}>
                         <img src="./src/assets/images/rqkc.png"/>
                             2016课程销量TOP10&nbsp;&nbsp;<i className="iconfont icon" data-icon="&#xe600;"></i>
                     </Link>
                     <div className="list">
                         {rqkchtml}
                     </div>
                 </div>
                 {tbtjlist.length>0&&
                 <div className="block tbtj">
                     <Link className="title" onClick={this.defaultclasslist.bind(this)}>
                         <img src="./src/assets/images/tbtj.png"/>
                         <i className="iconfont icon" data-icon="&#xe600;"></i>
                     </Link>
                     <div className="list">
                         {tbtjlist.length&&tbtjlist.map((item,i)=>
                             <Link to={item.url + uid} key={i}>
                                 <div className={'ad-bg-'+(item.template.split('-')[0])+'-'+(item.template.split('-')[1])}
                                      style={{background:'url(http://img.hairbobo.com/uploadimg'+item.image+') no-repeat',overflow: 'hidden'}}>
                                     <div className={'ad-txt-'+(item.template.split('-')[2])}>
                                         <span className="tit">{item.title}</span>
                                         <span className="price">{item.time}</span>
                                     </div>
                                 </div>
                             </Link>
                         )}
                     </div>
                 </div>
                 }
                 <div className="block cnxh homecnxh">
                     <Link className="title" onClick={this.defaultclasslist.bind(this)}>
                         <img src="./src/assets/images/cnxh.png" />
                         <i className="iconfont icon" data-icon="&#xe600;"></i>
                     </Link>
                     <div className="list">
                         {cnxhlist.length>0&&cnxhlist.map((item,index)=>
                             <Link className="row" to={'/detail/'+item.id+'/'+uid} key={index}>
                                 <div className="col-40">
                                     <div className="img">
                                         <img src={'http://img.hairbobo.com/'+item.image}/>
                                     </div>
                                 </div>
                                 <div className="col-60 text">
                                     <div className="tit">{item.title}</div>
                                     <div className="boot">
                                         {item.vipsellingprice?<span className="price">{item.frontmoney}元</span>:
                                         <span className="price">{item.frontmoney}元/{item.vipsellingprice}天</span>}
                                     </div>
                                 </div>
                             </Link>
                         )}
                     </div>
                 </div>
                 <div className="block xxkc">
                     <Link className="title" onClick={this.defaultclasslist.bind(this)}>
                         <img src="./src/assets/images/xxkc.png" />
                             <i className="iconfont icon" data-icon="&#xe600;"></i>
                     </Link>

                     <div className="list" id="list">
                         {xxkclist.length>0&&xxkclist.map((item,index)=>
                             <Link className="row" to={'/detail/'+item.id+'/'+uid} key={index}>
                                 <div className="col-25">
                                     <div className="img">
                                         {/*<img originalSrc={'http://img.hairbobo.com/'+item.image}  className="lazyload"/>*/}
                                         <img data-original={'http://img.hairbobo.com'+item.image} src="./src/assets/images/bobo.png"  className="lazyload"/>
                                         {/*<img data-original={'http://img.hairbobo.com'+item.image} src="./src/assets/images/pixel.gif"  className="lazyload"/>*/}
                                         {/*<img src={'http://img.hairbobo.com/'+item.image} />*/}
                                     </div>
                                 </div>
                                 <div className="col-75 text">
                                     <div className="tit">
                                         {item.title.slice(0,15)}
                                     </div>
                                     <div className="cnt">{item.moneyinfo}</div>
                                     <div className="boot">
                                         {item.bobogift&&
                                         <span className="bbyl">波波有礼</span>
                                         }
                                         {item.gift&&
                                         <span className="xyyl">学院有礼</span>
                                         }
                                         {!item.vipsellingprice?
                                             <span className="price">{item.frontmoney}元</span>:
                                             <span className="price">{item.frontmoney}元/{item.vipsellingprice}天</span>
                                         }
                                         <span className="city">{item.didname}</span>
                                     </div>
                                 </div>
                             </Link>
                         )}
                     </div>
                 </div>
                 <div className="wd_hd" style={{display: 'none'}}>
                     <Link className="wddd" to={user.attach?'javascript:;':"/olist/"+uid}>
                         <img src="./src/assets/images/wddd.png" alt="" />
                     </Link>
                     <a className="hddb" href="javascript:;" onClick={this.totop.bind(this)}>
                         <img src="./src/assets/images/hddb.png" alt="" />
                     </a>
                 </div>
            </div>
        )
    }
}
// 验证组件中的参数类型
Index.propTypes = {
    // showpic: PropTypes.arrayOf(PropTypes.shape({text: PropTypes.string.isRequired}).isRequired).isRequired
    showpic: React.PropTypes.array.isRequired
}
const getdata = state => {
    return {
        user: state.getuser.data,
        showpic: state.schoolbanner.toJS().list,
        rqkclist:state.rqkc.toJS().list,
        tbtjlist:state.tbtj.toJS().list,
        cnxhlist:state.cnxh.toJS().list,
        xxkclist:state.xxkc.toJS().list,
        classtype: state.classtype.toJS(),
    }
}
const buildActionDispatcher=(dispatch)=> {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}
export default connect(
    getdata,
    // {getuserdata}//如果不用bindActionCreators
buildActionDispatcher
)(Index)

