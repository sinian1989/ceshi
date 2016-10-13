import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
import Selectclass from '../components/selectclass'
import Superkcb from '../components/superkcb'
class Search extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    componentWillMount(){
        const {params:{uid},actions} = this.props;
        actions.getschoollist(uid)
    }
    componentDidMount(){
        $('.filter-type .cancle').hide();
        var mySwiper = new Swiper('.swiper-container', {
            paginationClickable: true,
            autoHeight: true,
            scrollbarHide: true,
            onSlideChangeStart: function () {
                $(".navbar .current").removeClass('current');
                $(".navbar li").eq(mySwiper.activeIndex).addClass('current');
            }
        });
        $('.navbar li').click(function (e) {
            var self = this;
            $(self).attr('class', 'current').siblings().removeClass('current');
            //mySwiper.slideTo(this.dataset.index, 500, false);//切换到第一个slide，速度为1秒
            mySwiper.slideTo($(self).index(), 500, false);//切换到第一个slide，速度为1秒
        })
    }
    render() {
        const {params:{uid},actions,biglist,smlist,zuixiao} = this.props;
        return(
        <div className="main i_search">
            <div className="navbar">
                <ul>
                    <li className="current">超级课程表</li>
                    <li>波波网合作学院</li>
                    <li>课程搜索</li>
                </ul>
            </div>
            <div className="swiper-container oth_cont">
                <div className="swiper-wrapper content_box" style={{width: 2250}}>
                    <div className="swiper-slide">
                        <h1>波波网超级课程表</h1>
                        <Superkcb uid={uid}  searchshow={true}/>
                    </div>
                    <div className="swiper-slide">
                        <div className="main hairschool">
                            <div className="big_pic">
                                {biglist.length>0&&biglist.map((item,index)=>
                                    <Link to={'/schoolpage/'+item.ouid+'/'+uid} className="acl" key={index}>
                                        <img src={'http://img.hairbobo.com'+item.relargelogo} alt=""/>
                                    </Link>
                                )}
                            </div>
                            <div className="sm_pic">
                                {smlist.length>0&&smlist.map((item,index)=>
                                    item.ouid=='223a9c64-4e59-40ef-80d3-5eeea631b4a1'?
                                        <a href="tel:0371-66988299" className="ddjl" key={index}>
                                            <img src={'http://img.hairbobo.com'+item.relargelogo} alt=""/>
                                        </a>:
                                        <Link to={'/schoolpage/'+item.ouid+'/'+uid} className="acl" key={index}>
                                            <img src={'http://img.hairbobo.com'+item.relargelogo} alt=""/>
                                        </Link>
                                )}
                            </div>
                            <div className="xwyd">
                                {zuixiao!==null?zuixiao.map((item,index)=>
                                    <Link to={'/schoolpage/'+item.ouid+'/'+uid} className="acl" key={index}>
                                        <img src={'http://img.hairbobo.com'+item.relargelogo} alt=""/>
                                    </Link>
                                ):<a href="javascript:;">
                                    <img src="./src/assets/images/xw.png" alt=""/>
                                </a>
                                }
                                <a href="javascript:;">
                                    <img src="./src/assets/images/xw.png" alt=""/>
                                </a>
                                <a href="javascript:;">
                                    <img src="./src/assets/images/xw.png" alt=""/>
                                </a>
                                <a href="javascript:;">
                                    <img src="./src/assets/images/xw.png" alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <Selectclass uid={uid} searchshow={true}/>
                    </div>

                </div>
            </div>
        </div>
        )
    }
}
const getdata = state => {
    return {
        biglist: state.schoolbanner.toJS().biglist,
        smlist: state.schoolbanner.toJS().smlist,
        zuixiao: state.schoolbanner.toJS().zuixiao,
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
)(Search)