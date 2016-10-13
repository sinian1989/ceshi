import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
import title from '../libs/title'
class Hairschool extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    componentWillMount(){
        const {params:{uid},actions} = this.props;
        actions.getschoollist(uid)
    }
    componentDidMount(){
        title('合作学院')
    }
    render() {
        const {params:{uid},actions,biglist,smlist,zuixiao} = this.props;
        return(
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
)(Hairschool)