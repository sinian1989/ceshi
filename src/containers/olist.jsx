import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux'
class Olist extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    componentWillMount(){
        const {params:{uid},actions } = this.props;
        actions.getallorder(uid);
    }
    componentDidMount(){
        const {actions } = this.props;
        actions.setindex(2)
    }
    filterOrder(e,i){
        const {actions } = this.props;
        actions.setindex(i)
    }
    render() {
        const {params:{uid},actions,list,index} = this.props;
        // let navbar=[];
        // for(var i=0;i<3;i++){
        //     console.log(i)
        //     navbar.push(
        //         <a className={i===index ? 'active' : ''} href="javascript:;" onClick={()=>actions.setindex(i)} key={i}>{['未付款', '已付款', '全部订单'][i]}</a>
        //     )
        // }
        let num=[0,1,2];
        return(
            <div className="orders main">
                <div className="order-type">
                    {num.map((e,i)=>
                        <a className={i===index ? 'active' : ''} href="javascript:;" onClick={(e)=>this.filterOrder(e,i)} key={i}>{['未付款', '已付款', '全部订单'][i]}</a>
                        )}
                </div>
                <div className="container">
                    <ul className="order-list">
                        {list.map((item,index)=>
                            <li key={index}>
                                <Link to={'/odetail/'+item.moneyno} onClick={()=>actions.setNoBuy()}>
                                    <span className="label">课程名称：</span>{item.shcname}<br/>
                                    <span className="label">订单编号：</span>{item.moneyno}<br/>
                                    <span className="label">支付方式：</span>{['','支付宝','微信'][item.paytype]}<br/>
                                    <span className="label">下单时间：</span>{item.date}<br/>
                                    <span className="label">总金额：</span><span className="high-light">¥ {item.money}</span>
                                </Link>
                                <div className="order-state">
                                    <span className="label">订单状态：</span>
                                    <span className="high-light">{['已取消','未付款','已付款'][item.status]}</span>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}
const getdata = state => {
    return {
        list: state.orderlist.toJS().list,
        index: state.orderlist.toJS().index,
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
)(Olist)