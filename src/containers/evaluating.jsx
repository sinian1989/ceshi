import React from "react";
import {Link} from "react-router";
import {bindActionCreators} from "redux";
import * as actions from "../actions/allactions";
import {connect} from "react-redux";
import base from "../libs/base";
import qas from "../libs/qas";
class Evaluating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // basic:{},qa:[],active:''
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(1111111)
        return nextProps != this.props;
    }

    componentWillReceiveProps(nextProps) {//已加载组件收到新的参数时调用
        // console.log('执行componentWillReceiveProps',nextProps);
        // if (nextProps.selectedReddit !== this.props.selectedReddit) {
        //
        // }
        const {params:{index, uid}, actions} = this.props;
        if(nextProps.routeParams.index!==this.props.routeParams.index){
            actions.resetNewActive();
        }
        // console.log(this.props.routeParams.index)
        // console.log(nextProps.routeParams.index)
        if(this.props.routeParams.index==(qas.length-1)&&nextProps.routeParams.index==qas.length){
            let basicdata = base.tool.cookie.get('evbasic');
            basicdata = base.tool.unserialize(basicdata);
            let obj = {
                uid: uid,
                age: basicdata.age,
                sex: basicdata.sex,
                name: basicdata.name,
                position: basicdata.job,
                answer: base.tool.cookie.get('evanswer')
            };
            actions.getevaluat(obj);
        }
        // console.log(22222222)
        // console.log(this.props)
        // console.log(nextProps)
    }

    componentWillMount() {
        console.log(3333333333333333)
    }

    componentDidMount() {
        console.log(44444444444444)
    }

    savabasic() {
        const {params:{index, uid}} = this.props;
        let basicdata = $('.basic-form').serialize();
        let basicquery = base.tool.unserialize(basicdata);
        if (!basicquery.name) {
            base.ui.alert('姓名不能为空');
            return false;
        }
        if (!basicquery.age) {
            base.ui.alert('年龄不能为空');
            return false;
        }
        if (!basicquery.sex) {
            base.ui.alert('请选择你的性别');
            return false;
        }
        if (!basicquery.job) {
            base.ui.alert('请选择你现在的职位');
            return false;
        }
        base.tool.cookie.set('evbasic', basicdata);
        location.hash = '#/evaluating/' + (parseInt(index) + 1) + '/' + uid;
    }

    selectAnswer(e,i) {
        // var $this = $(e.currentTarget);
        // $this.addClass('active').siblings('li').removeClass('active');
        const {params:{index, uid}, actions} = this.props;
        actions.answer(index,i);
    }

    render() {
        const {params:{index, uid}, actions, level, result,newactive} = this.props;
        let basicdata = base.tool.cookie.get('evbasic');
        basicdata = base.tool.unserialize(basicdata);
        let content, basic = {};
        if (index == 0) {
            if (basicdata && basicdata.name) {
                basicdata.name = decodeURIComponent(basicdata.name.replace(/\+/g, " "));
                basic = basicdata
            }
            let jobs = ['助理', '技师', '发型师', '总监', '老板'];
            content = (
                <div>
                    <div className="tit">认真实情填写，了解自己的专业级别，确定你的努力方向，制定你的成长目标，实现自己的理想！</div>
                    <div className="basic">
                        <form className="basic-form">
                            <input className="name" type="text" name="name" defaultValue={basic.name}/>
                            <input className="age" type="text" name="age" defaultValue={basic.age}/>
                            <div className="sex">
                                <label className="male"><input type="radio" name="sex" value="0"/><i></i></label>
                                <label className="female"><input type="radio" name="sex" value="1"/><i></i></label>
                            </div>
                            <div className="job">
                                {jobs.map((item, index)=>
                                    <label key={index}><input type="radio" name="job"
                                                              defaultValue={item}/><span>{item}</span></label>
                                )}
                            </div>
                        </form>
                    </div>
                    <a href="javascript:;" className="save-basic" onClick={this.savabasic.bind(this)}></a>
                </div>
            )
        }
        else if (index == qas.length) {
            content = (
                <div>
                    <div className="tit">测试结果：{'ABCDE'.charAt(level)}</div>
                    <div className="info" dangerouslySetInnerHTML={{__html: result}}></div>
                    <Link className="link-index" to={'/index/' + uid}>
                        <span>看看波波网为您量身推荐的课程吧！</span><br/>
                        <img src="./src/assets/images/evaluating/end.png"/>
                    </Link>
                </div>
            )
        } else {
            let qa= qas[index - 1];
            let active= base.tool.cookie.get('evanswer').split(';')[index - 1];
            content = (
                <div>
                    <div className="tit">{qa.title}</div>
                    <ul className="list">
                        {qa.option.map((item, index)=>
                            <li key={index} className={(index == newactive||(index==active&&!newactive)) ? 'active' : ''}
                                onClick={(e)=>this.selectAnswer(e,index)}>{'ABCDE'.charAt(index)}：{item}</li>
                        )}
                    </ul>
                    <Link className="next" to={'/evaluating/' + (parseInt(index) + 1) + '/' + uid}></Link>
                    <Link className="back" to={'/index/' + uid}>退出测评</Link>
                </div>
            )
        }
        return (
            <div className="main evaluating">
                <div className="qas-box">
                    <div className="container">
                        {content}
                    </div>
                </div>
            </div>

        )
    }
}
const getdata = state => {
    return {
        level: state.evaluat.toJS().level,
        result: state.evaluat.toJS().result,
        newactive: state.evaluat.toJS().newactive,
    }
}
const buildActionDispatcher = (dispatch)=> {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}
export default connect(
    getdata,
    buildActionDispatcher
)(Evaluating)