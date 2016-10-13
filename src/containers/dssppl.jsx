import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
import base from '../libs/base';
import Swiper from 'swiper';
class Dssppl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rid:'',rname:''
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    componentWillMount(){
        const {params:{id,index,uid},actions} = this.props;
        actions.getclassdetail(id,uid);
        actions.getclasscomment(id);
    }
    componentDidMount(){
        const {params:{id,index,uid},actions} = this.props;
        if (index != 1 && index != 2 && index != 3) {
            base.ui.alert('页面不存在，请检查你输入的地址是否正确！');
            return false;
        }
        let $tab = $('.dssppl-type a');
        let oTabSwiper = new Swiper('.swiper-container1', {
            paginationClickable: true,
            initialSlide: parseInt(index) - 1,
            scrollbar: '.swiper-scrollbar',
            scrollbarHide: false,
            onSlideChangeStart: function (swiper) {
                $tab.eq(swiper.activeIndex).addClass('active').siblings().removeClass('active');
            }
        });
        $tab.on('click', function () {
            oTabSwiper.slideTo($(this).index());
        });
    }
    replyComment(e){
        const {params:{id,index,uid},actions} = this.props;
        var name = $(e.currentTarget).find('.name em').text();
        var $input = $('.reply-text');
        //存储被回复项的id
        if (e.currentTarget.dataset.id) {
            this.setState({
                rid:e.currentTarget.dataset.id,
                rname: name,
            });
            $input.val('回复' + name + ': ');
        }
    }
    commentSunmit(){
        const {params:{id,index,uid},actions} = this.props;
        var val = $('.reply-text').val();
        var rid = this.state.rid ? this.state.rid : '';
        // var reg = new RegExp("^回复" + this.rname + ":\s*");
        if (this.state.rname) {
            if (val.indexOf('回复' + this.state.rname + ': ') !== 0) {
                rid = '';
            }
            else {
                val = val.replace('回复' + this.state.rname + ': ', '')
            }
        }
        if (!$.trim(val)) {
            base.ui.alert('请输入评论内容');
            return false;
        }
        $.ajax('/api/shop/AddShopComment', {
            type:'post',
            data: {
                shcid: id,
                uid: uid,
                content: val,
                reid: rid
            }
        }).done(function (res) {
            if (res.status !== 1) {
                base.ui.alert(res.msg);
                return false;
            }
            // window.location.hash = '#/dssppl/' + id + '/3/' + uid;
            window.location.reload();
        });
    }
    render() {
        const {params:{id,index,uid},actions,comms,teacherData,classData,detail} = this.props;
        return(
            <div className="dssppl main">
                <div className="dssppl-type">
                    <div className="row">
                        <a className="col-33" href="javascript:;">导师详情</a>
                        <a className="col-33" href="javascript:;">课程详情</a>
                        <a className="col-33" href="javascript:;">评价详情</a>
                    </div>
                </div>
                <div className="container">
                    <div className="swiper-scrollbar"></div>
                    <div className="swiper-container1 dssppl-box">
                        <div className="swiper-wrapper" style={{width:2250}}>
                            <div className="swiper-slide dssppl-ds" dangerouslySetInnerHTML={{__html:classData}}>
                            </div>
                            <div className="swiper-slide dssppl-sp" dangerouslySetInnerHTML={{__html:teacherData}}>
                            </div>
                            <div className="swiper-slide dssppl-pl">
                                {!comms.length?<span>暂无评论</span>:
                                    <ul className="review-list">
                                        {comms.map((item,index)=>
                                            !item.reid&&
                                            <li key={index}>
                                                <a href="javascript:;" data-id={item.id} onClick={this.replyComment.bind(this)}>
                                                    <div className="top clearfix">
                                                        <span className="name f-l"><em>{item.nickname}</em></span>
                                                        <span className="time f-r">{item.date.slice(0, 10)}</span>
                                                    </div>
                                                    <div className="cnt">
                                                        {item.content}
                                                    </div>
                                                    <div className="bot clearfix">
                                                        <span className="good-title f-l">{detail.title}</span>
                                                        <span className="handle f-r"><i className="reply-btn"></i></span>
                                                    </div>
                                                </a>
                                                <ul className="reply-list">
                                                    {comms.map((son,i)=>
                                                        son.reid === item.id&&
                                                        <li className="reply-item" key={i}>
                                                            <a href="javascript:;" data-id={son.id}>
                                                                <div className="top clearfix">
                                                                    <span className="name f-l"><em>{son.nickname}</em>  回复  {item.nickname}</span>
                                                                    <span className="time f-r">{son.date.slice(0, 10)}</span>
                                                                </div>
                                                                <div className="cnt">
                                                                    {son.content}
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </li>
                                        )}
                                    </ul>
                                }
                            </div>
                            <div className="reply-box">
                                <div className="row">
                                    <div className="col-80">
                                        <textarea className="reply-text" placeholder="输入评论"></textarea>
                                    </div>
                                    <a className="col-20 reply-submit" href="javascript:;" onClick={this.commentSunmit.bind(this)}>发送</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const getdata = state => {
    return {
        comms: state.comment.toJS().comms,
        teacherData: state.detailclass.toJS().teacherData,
        classData: state.detailclass.toJS().classData,
        detail: state.detailclass.toJS().detail,
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
)(Dssppl)