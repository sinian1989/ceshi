import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux';
class Xyteacherteam extends React.Component {
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
        actions.getteacherlist(clubid,uid)
    }
    componentDidMount(){
    }
    render() {
        const {params:{clubid,uid},actions,allteacher,teacherone,moreteacher} = this.props;
        return(
            <div id="content1" className="team">
                {teacherone&&
                <div className="top_ppo">
                    <i>
                        <a href={'http://my.bobo.so/hair/index.html#detailhair/'+teacherone.huid}>
                            <img src={'http://img.hairbobo.com/'+teacherone.logo} alt=""/>
                        </a>
                    </i>
                    <div>
                        <h4>{teacherone.name}(创办人)</h4>
                        <p className="xiaoz">校长</p>
                        <span>{teacherone.about}</span>
                    </div>
                </div>
                }
                {moreteacher.length>0&&
                <div className="more_tch">
                    <h3>讲师团队</h3>
                    <ul>
                        {moreteacher.map((item,index)=>
                            <li key={index}>
                                <a href={'http://my.bobo.so/hair/index.html#detailhair/'+item.huid}>
                                    <img src={'http://img.hairbobo.com/'+item.logo} alt=""/>
                                </a>
                                <p>{item.name}</p>
                            </li>
                        )}
                    </ul>
                </div>
                }
            </div>
        )
    }
}
const getdata = state => {
    return {
        allteacher: state.schoolinfo.toJS().allteacher,
        teacherone: state.schoolinfo.toJS().teacherone,
        moreteacher: state.schoolinfo.toJS().moreteacher,
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
)(Xyteacherteam)