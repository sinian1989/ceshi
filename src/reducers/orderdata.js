/**
 * Created by Administrator on 16-9-30.
 */
import {
    GET_ORDER_DATA,
    SAVE_COUNT_DATE
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'
const initState =fromJS({                         //用了immutable
    orderdata:{},
    num:'',
    date:''
});
export default createReducer(initState,{
    [GET_ORDER_DATA]: (state,action)=>{
        return state.merge({
            orderdata:action.json,
        })
    },
    [SAVE_COUNT_DATE]: (state,action)=>{
        return state.merge({
            num:action.json.num,
            date:action.json.date
        })
    }
})
