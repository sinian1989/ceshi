import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
class Xynewclass extends React.Component {
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
        actions.getnewclass(clubid)
    }
    componentDidMount(){
    }
    linktel(e){
        let shcid=$('.bord').data('id');
        // let shcid=e.currentTarget.dataset.id;
        $.ajax({url: '/API/Shop/Addclickcell',type:'post', data: {shcid:shcid}}).done(function (res) {
        })
    }
    render() {
        const {params:{clubid,uid},actions,newclass} = this.props;
        return(
            <div id="content2" className="new_class">
                <ul className="kecheng">
                    {newclass.length>0&&newclass.map((item,index)=>
                        <li>
                            <Link to={'/detail/'+item.id+'/'+uid}>
                                <div className="class_list">
                                    <img src={'http://img.hairbobo.com/'+item.images} alt=""/>
                                    <div className="top">
                                        <h2>{item.title}</h2>
                                        <b>开班时间</b><span>{item.classbegin}</span>
                                    </div>
                                    <div className="btm">特惠价：{item.moneyinfo}</div>
                                    <div className="zezao"></div>
                                </div>
                            </Link>
                            <div className="nr">
                                {item.content}
                            </div>
                            <div className="telph">
                                <a className="bord" href={'tel:'+item.cell} data-id={item.id} onClick={this.linktel.bind(this)}>
                                    <img src=".src/assets/images/daibai/tel_05.png" alt=""/>
                                </a>
                                <Link className="tiao" to={'/detail/'+item.id+'/'+uid}>
                                    <img src=".src/assets/images/daibai/tel_03.png" alt=""/>
                                </Link>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
const getdata = state => {
    return {
        newclass: state.schoolinfo.toJS().newclass,
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
)(Xynewclass)