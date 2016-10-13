import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/allactions';
import { connect } from 'react-redux'
class Selectclass extends React.Component {
    // static fetchData(params){ es7的class实例的自己的方法
    //     return actions.getclasstype()
    // }
    componentWillMount(){
        const {actions } = this.props;
        actions.getclasstype();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    submit(){
        const {actions,uid,classtype} = this.props;
        let filter = {
            pageindex: 1,
            pagesize: 100,
            oederby: -1
        };
        classtype.type.map((item,index)=>{
            filter[item.key]=item.selectid
        })
        actions.getresult(filter);
        actions.hideselect();
        location.hash='#/classlist/'+uid;
    }
    // selectSort(e){
    //     // e.preventDefault();
    //     e.stopPropagation();
    //     console.log(123131)
    // }
    sort(e,index){
        e.preventDefault();
        const {actions} = this.props;
        actions.selectSort(index);
        actions.showprice();
    }
    render() {
        const {actions,uid,classtype,selectval,searchshow} = this.props;
        // let uid=this.props.uid;
        let oplist=classtype.optionlist.map((e,i)=>
            <li className="row" data-id={e.id} data-index={i} key={i} onClick={()=>actions.chooseoption(e.id,e.val)}>
                <div className="col-80 val">{e.val}</div>
                <div className="col-20"><i className={(e.val === selectval||(e.val === '全部' && !selectval))?'radio checked':'radio'} ></i></div>
            </li>
        );
        return(
            <div className={classtype.show||classtype.showprice||searchshow? 'top-pop show':'top-pop'} id={searchshow?"searchpage":''}>
                <div className={classtype.showprice?'sort-items animate':'sort-items'}>
                    <a href="javascript:;" data-sort="0" onClick={(e)=>this.sort(e,0)}>价格从低到高</a>
                    <a href="javascript:;" data-sort="1" onClick={(e)=>this.sort(e,1)}>价格从高到低</a>
                    <a href="javascript:;" data-sort="-1" onClick={(e)=>this.sort(e,2)} >默认排序</a>
                    {/*<a href="javascript:;" data-sort="0" onClick={actions.selectSort(0)}>价格从低到高</a>*/}
                    {/*<a href="javascript:;" data-sort="1" onClick={actions.selectSort(1)}>价格从高到低</a>*/}
                    {/*<a href="javascript:;" data-sort="-1" onClick={actions.selectSort(2)}>默认排序</a>*/}
                    {/*{sortprice}*/}
                </div>
                <div className={classtype.show||searchshow?'filter-box filter-type animate':'filter-box filter-type'}>
                    <div className="menu">
                        筛选
                        <a className="cancle" href="javascript:;" data-level="1" onClick={() => actions.hideselect()}>取消</a>
                        <a className="confirm" href="javascript:;" data-level="1" onClick={()=>actions.getclasstype()}>清除选项</a>
                    </div>
                    <ul className="type-list">
                        {classtype.type.map((item,index)=>
                            <li className="row" data-key={item.key} data-index={index} key={index} onClick={()=>actions.showoption(index)}>
                                <div className="col-20 key">{item.name}</div>
                                <div className="col-80 val-box">
                                    {(item.select && item.select !== '全部')?
                                        <span className="val active" data-selectid={item.selectid}>{item.select}</span>:
                                        <span className="val" data-selectid="-1">全部</span>
                                    }
                                    <i className="iconfont" data-icon="&#xe600;"></i>
                                </div>
                            </li>
                        )}
                    </ul>
                    <a className="btn repeat-type" href="javascript:;" onClick={this.submit.bind(this)}>确定</a>
                </div>
                <div className={classtype.showoption?'filter-box filter-option animate':'filter-box filter-option'}>
                    <div className="menu menu-option">
                        筛选
                        <a className="cancle" href="javascript:;" onClick={()=>actions.hideoption()}>取消</a>
                        <a className="confirm" href="javascript:;" onClick={()=>actions.hideoption()}>确定</a>
                    </div>
                    <div className="option-list">
                        {oplist}
                    </div>
                </div>
            </div>
        )
    }
}
const getdata = state => {
    return {
        classtype: state.classtype.toJS(),
        selectval: state.classtype.toJS().selectval,
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
)(Selectclass)