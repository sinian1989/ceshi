import React from 'react';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
import Swiper from 'swiper';
class Schoolpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount(){
        const {params:{clubid,uid},actions} = this.props;
        actions.getschoolinfo(uid,clubid)
        console.log('componentWillMount')
    }
    componentDidMount(){
        console.log('我是componentDidMount')
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        if(nextProps.imglist.length){
            console.log('shouldComponentUpdate的imglist')
        }
        return nextProps != this.props;
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
        console.log(this.props)
        console.log(nextProps)
        if(this.props!==nextProps){
            console.log(111)
        }
        if(this.props.imglist!==nextProps.imglist){
            console.log('图片加载出来了，可是还是不能用SWIPER')
            console.log(nextProps.imglist)
        }
    }
    componentWillUpdate(){//将要从新渲染
        console.log('将要从新渲染')
    }
    componentDidUpdate(prevProps) {//已经从新渲染
        console.log('已经从新渲染')
        new Swiper('.swiper-container', {
            pagination: '.dian',
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
            paginationClickable: true
        });
        console.log('swiper完')
    }
    accordion(e){
        var $this = $(e.currentTarget);
        if ($this.find('div').is(':hidden')) {
            $this.find('b').addClass("hover");
            $this.find('s').addClass("current");
            $this.siblings().find('b').removeClass('hover');
            $this.siblings().find('s').removeClass('current');
            $this.find('div').slideDown(200);
            $this.siblings().find('div').slideUp(200);
        } else {
            $this.find('div').slideUp(200);
            $this.find('b').removeClass('hover');
            $this.find('s').removeClass('current');

        }
    }
    render() {
        const {params:{clubid,uid},actions,info,imglist,lat,lon} = this.props;
        console.log('我是render');
        return(
            <div id="content0" className="jigou">
                <div className="zixun">
                    <a href={'tel:'+info.phone}>
                        <img src="./src/assets/images/daibai/ph.png" alt=""/>
                    </a>
                </div>
                <div className="top_ct">
                    <div className="swiper-container banner">
                        <ul className="swiper-wrapper" style={{width:750*imglist.length}}>
                        {imglist.length>0&&imglist.map((item,index)=>
                            <li className="swiper-slide" key={index}>
                                <img src={'http://img.hairbobo.com'+item} alt=""/>
                            </li>
                        )}
                        </ul>
                        <div className="dian">
                            <span></span>
                        </div>
                    </div>
                    <div className="row class-title">
                        {info.address?
                            <a className="col-10 shaddr" href={'map.html?name='+info.name+'&lon='+lon+'&lat='+lat}> </a>:
                            <a className="col-10 shaddr" href="javascript:;"> </a>
                        }
                        {info.address?
                            <a href={'map.html?name='+info.name+'&lon='+lon+'&lat='+lat} className="col-85">{info.address}</a>:
                            <a className="col-85" href="javascript:;"> </a>
                        }
                        {info.address?
                            <a href={'map.html?name='+info.name+'&lon='+lon+'&lat='+lat} className="col-5">&gt;</a>:
                            <a className="col-5" href="javascript:;"> </a>
                        }
                    </div>
                    <div className="row class-title">
                        <a className="col-10 zxtel" href={'tel:'+info.phone}> </a>
                        <div className="col-90">
                            <a className="phone" href={'tel:'+info.phone}>{info.phone}</a>
                        </div>
                    </div>
                </div>
                <div className="btm_ct">
                    <ul>
                        <li onClick={this.accordion.bind(this)}>
                            <a href="javascript:;">
                                <img src="./src/assets/images/daibai/jj.png" alt=""/>
                                <span>简介</span>
                                <b></b>
                            </a>

                            <div className="word">
                                {info.sunmary}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
const getdata = state => {
    return {
        info: state.schoolinfo.toJS().info,
        imglist: state.schoolinfo.toJS().imglist,
        lat: state.schoolinfo.toJS().lat,
        lon: state.schoolinfo.toJS().lon,
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