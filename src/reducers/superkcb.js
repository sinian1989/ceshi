/**
 * Created by Administrator on 16-9-29.
 */
import {
    GET_SUPER_KCB
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initState =fromJS({                         //用了immutable
    list:[]
});
export default createReducer(initState,{
    [GET_SUPER_KCB]: (state,action)=>{
        return state.merge({list:action.json})
    }
})
