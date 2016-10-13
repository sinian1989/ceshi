import React from 'react';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
class Xyactivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    componentWillReceiveProps(nextProps) {
    }
    componentWillMount(){
        const {params:{clubid,uid},actions} = this.props;
        actions.getschoolinfo(uid,clubid)
    }
    componentDidMount(){
    }
    render() {
        const {params:{clubid,uid},actions,info} = this.props;
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
            <div className="zxtg" style={style}>
                <div className="zezao"></div>
                <div className="zixun">
                    <a href={'tel:'+info.phone}>
                        <img src="./src/assets/images/daibai/ph.png" alt=""/>
                    </a>
                </div>
                <span className="new">
            <img src="./src/assets/images/daibai/new.png" alt=""/><span>最新推广</span>
        </span>
                <div className="tg">
                    <div className="spread">
                        {info.spread}
                    </div>
                </div>
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
)(Xyactivity)