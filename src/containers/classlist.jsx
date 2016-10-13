import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux'
import Selectclass from '../components/selectclass'
import Defaultlist from '../components/list'
class Classlist extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    shouldComponentUpdate(nextProps, nextState) {//组件判断是否重新渲染时调用 true为渲染
       //nextProps是下一个传过来的data props
       //nextState 是本地的state模式的状态
        return nextProps != this.props;
    }
    componentWillUnmount () {

    }
    searchAction(event){
        // {/*<input type="text" ref="username" />*/}
        // {/*//下面4种方式都可以通过ref获取真实DOM节点  */}
        // {/*var usernameDOM = this.refs.username.getDOMNode();*/}
        // {/*var usernameDOM = React.findDOMNode(this.refs.username);*/}
        // {/*var usernameDOM = this.refs['username'].getDOMNode();*/}
        // {/*var usernameDOM = React.findDOMNode(this.refs['username']);*/}
        // let search =this.refs.searchInput.value;
        // console.log(search);
        const {actions} = this.props;
        let self=event.currentTarget;
        if(event.keyCode==13){
           actions.getsearchlist(self.value)
       }
    }
    clicksearch(){
        const {actions} = this.props;
        let val =this.refs.searchInput.value;
        actions.getsearchlist(val)
    }
    cleardata(){
        this.refs.searchInput.value='';
        const {actions} = this.props;
        actions.defaultlist();
    }
    render() {
        let uid = this.props.params.uid;
        const {actions,classtype} = this.props;
        return(
            <div className="classlist main">
                <div className="top">
                    <div className="sort" onClick={()=>actions.showprice()}>
                        <span className="current">价格</span><i className={classtype.showprice?'iconfont current':'iconfont'} data-icon="&#xe603;"></i>
                    </div>
                    <div className={classtype.showinput?'search show':'search'}>
                        <input type="text" placeholder="输入关键字搜索" ref="searchInput"
                               onKeyUp={this.searchAction.bind(this)}
                               onFocus={()=>actions.searchFocus()}
                               onBlur={()=>actions.searchBlur()}/>
                            <i className="iconfont clear-input" data-icon="&#xe601;" onClick={this.cleardata.bind(this)}></i>
                            <div className="search-btn" onClick={this.clicksearch.bind(this)}><i className="iconfont" data-icon="&#xe602;"></i></div>
                    </div>
                    <div className="filter" onClick={() => actions.showselect()}><span>筛选</span>
                        <i className={classtype.show?'iconfont current':'iconfont'} data-icon="&#xe603;"></i></div>
                </div>
                <Selectclass uid={uid}/>
                <Defaultlist uid={uid} />
            </div>
        )
    }
}
const getdata = state => {
    return {
        classtype: state.classtype.toJS(),
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
)(Classlist)
