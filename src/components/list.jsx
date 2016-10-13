import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux'
class List extends React.Component {
    componentWillMount(){
        const {actions } = this.props;
        // actions.defaultlist();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    render() {
        const {actions,uid,list} = this.props;
        return(
            <div className="container">
                <div className="list">
                    {list.length>0&&list.map((item,index)=>
                        <Link className="row" to={'/detail/'+item.id+'/'+uid} key={index}>
                            <div className="col-25">
                                <div className="img"><img src={'http://img.hairbobo.com/'+item.image} /></div>
                            </div>
                            <div className="col-75 text">
                                <div className="tit">
                                    {item.title.slice(0,15)}
                                </div>
                                <div className="cnt">{item.moneyinfo}</div>
                                <div className="boot">
                                    {item.bobogift&&<span className="bbyl">波波有礼</span>}
                                    {item.gift&&<span className="xyyl">学院有礼</span>}
                                    {item.vipsellingprice=='0'||item.vipsellingprice==null?
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
        )
    }
}
const getdata = state => {
    return {
        list: state.defaultlist.toJS().list,
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
)(List)