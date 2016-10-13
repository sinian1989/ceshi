import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
import base from '../libs/base';
import title from '../libs/title';
import wxapi from '../libs/wxapi';
class Schoolpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showfx:false
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props)
        console.log(nextProps)
        if(this.props.info!==nextProps.info){
            console.log(111)
        }
    }
    componentWillMount(){
        const {params:{clubid,uid},actions} = this.props;
        actions.getschoolinfo(uid,clubid)
    }
    componentDidMount(){
        if (location.search.indexOf('from=') !== -1) {
            location.replace(location.origin + location.pathname + location.hash);
        }
        if(window.navigator.userAgent.indexOf('BoBoiOS') !== -1 || window.navigator.userAgent.indexOf('BoBoAndroid') !== -1){
            this.setState({
                showfx:true
            });
        }
    }
    componentDidUpdate(prevProps){
        console.log('已经从新渲染')
        console.log(prevProps)
        console.log(this.props)
        const {params:{clubid,uid},actions,info} = this.props;
        console.log(info.name)
        base.device.isWeixin&&wxapi({
            showmenu: true,
            share: {
                imgUrl: 'http://shop.hairbobo.com/shop/images/logo/' + clubid + '.jpg',
                link: location.origin + location.pathname + '#daibai/' + clubid + '/share',
                desc: info.name + '的微官网',
                title: info.name,
                callback: function (reswx) {
                    //统计分享
                }
            }
        });
    }
    fenxiang(){
        const {params:{clubid,uid},info} = this.props;
        let name=info.name;
        BoJSBridge.nativeShare({ shareImageUrl:'http://shop.hairbobo.com/shop/images/logo/' + clubid + '.jpg', //图片链接（绝对路径），分享到微信会以微信模板显示
            shareText:name + '的微官网',//分享的内容
            shareTitle:name,//分享的标题
            shareUrl:location.origin + location.pathname + '#/schoolpage/' + clubid + '/share'//分享的链接
        },function(result){});
    }
    render() {
        const {params:{clubid,uid},actions,info} = this.props;
        let showfx=this.state.showfx;
        title(info.name);
        let style={};
        if(info.photo){
          style={
              backgroundImage:'url(http://img.hairbobo.com/'+info.photo+')',
              backgroundSize:'100% 100%'
          }
        }else{
            style={
                background: 'url(./src/assets/images/by.png) no-repeat center center',
                backgroundSize: '100% 100%'
            }
        }
        return(
            <div className="daibai" style={style}>
                <div className="con">
                    <ul>
                        <Link to={'/xyclubdetail/'+clubid+'/'+uid}>
                            <li>学院介绍</li>
                        </Link>
                        <Link to={'/xynewclass/'+clubid+'/'+uid}>
                            <li>最新课程</li>
                        </Link>
                        <Link to={'/xyteacherteam/'+clubid+'/'+uid}>
                            <li>导师团队</li>
                        </Link>
                        <Link to={'/xyactivity/'+clubid+'/'+uid}>
                            <li>活动推广</li>
                        </Link>
                        {parseInt(info.oikid)!==0?
                            <a href={'http://my.bobo.so/hair/index.html#poster/'+(parseInt(info.oikid))}>
                                <li>时尚大片</li>
                            </a>:
                            <a href="http://my.bobo.so/hair/index.html#poster">
                                <li>时尚大片</li>
                            </a>
                        }
                        <a href={'tel:'+info.phone} className="lxxy">
                            <li>联系学院</li>
                        </a>
                    </ul>
                </div>
                {showfx&&
                <div className="fenxiang">
                    <img src="./src/assets/images/fx.png" alt=""/>
                </div>
                }
            </div>
        )
    }
}
const getdata = state => {
    return {
        info: state.schoolinfo.toJS().info,
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
)(Schoolpage)