/**
 * Created by Administrator on 16-9-27.
 */
import {
    CLASS_TYPE,
    SHOW_HIDE_PRICE,
    HIDE_SELECT,
    SHOW_SELECT,
    SHOW_OPTION,
    HIDE_OPTION,
    CHOOSE_OPTION,
    SEARCH_FOCUS,
    SEARCH_BLUR
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initState =fromJS({                         //用了immutable
    type: [],
    show:false,
    showoption:false,
    optionlist:[],
    selectval:'',
    index:'',
    showprice:false,
    showinput:false
});
export default createReducer(initState,{
    [CLASS_TYPE]: (state,action)=>{
        return state.merge({type:action.json})
    },
    [SHOW_HIDE_PRICE]: (state,action)=>{
        if(state.toJS().showprice){
            return state.set('showprice',false)
        }else{
            return state.merge({showprice:true,show:false})
        }
    },
    [HIDE_SELECT]: (state,action)=>{
        return state.set('show',false)
    },
    [SEARCH_FOCUS]: (state,action)=>{
        return state.set('showinput',true)
    },
    [SEARCH_BLUR]: (state,action)=>{
        return state.set('showinput',false)
    },
    [SHOW_SELECT]: (state,action)=>{
        return state.merge({show:true,showprice:false})
    },
    [SHOW_OPTION]: (state,action)=>{
        let obj=state.toJS().type[action.num];
        let sta=state.toJS();
        let val=sta.type[action.num].select;
        return state.merge({
            optionlist:obj.list,
            showoption:true,
            index:action.num,
            selectval:val
        })
    },
    [HIDE_OPTION]: (state,action)=>{
        return state.set('showoption',false)
    },
    [CHOOSE_OPTION]: (state,action)=>{
        // state.setIn(['type',state.get('index'),'select'],action.val)
        let list=state.get('type').toJS();
        list[state.get('index')].selectid=action.index;
        list[state.get('index')].select=action.val;
        return state.merge({
            type:list,
            showoption:false,
            selectval:action.val
        })
        //immutable写法............
        //fromJS(state).setIn(['apples',action.payload,'isEaten'], true).toJS();

        // let immutableA =fromJS([0, 0, [1, 2]])
        // let immutableB = immutableA.set 1, 1
        // let immutableC = immutableB.update 1, (x) -> x + 1
        // let immutableC = immutableB.updateIn [2, 1], (x) -> x + 1


        // immutableB = immutableA.set 'a', 1
        // immutableB = immutableA.setIn ['a', 'b'], 1
        // immutableB = immutableA.update 'a', (x) -> x + 1
        // immutableB = immutableA.updateIn ['a', 'b'], (x) -> x + 1
    },
})