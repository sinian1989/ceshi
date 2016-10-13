/**
 * Created by Administrator on 16-10-8.
 */
import {
    GET_ORDER_INFO,
    SET_STATE,
    SET_NO_BUY
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable';
let isbobo=(window.navigator.userAgent.indexOf('BoBoiOS') !== -1 || window.navigator.userAgent.indexOf('BoBoAndroid') !== -1)?true:false;
const initState =fromJS({                         //用了immutable
    orderinfo:{},
    puinfo:{},
    status:'',
    isbuy:isbobo
});
export default createReducer(initState,{
    [GET_ORDER_INFO]: (state,action)=>{
        return state.merge({
            orderinfo:action.json,
            puinfo:action.json.puinfo,
            status:action.json.status
        })
    },
    [SET_STATE]: (state,action)=>{
        return state.set('status',action.json)
    },
    [SET_NO_BUY]: (state,action)=>{
        return state.set('isbuy',false)
    }
})
