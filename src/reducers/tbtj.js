/**
 * Created by Administrator on 16-9-26.
 */
import {
    GET_TBTJ
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'
// import {Immutable} from 'immutable'

const initState =fromJS({                         //用了immutable
    list: []
});
export default createReducer(initState,{
    [GET_TBTJ]: (state,action)=>{
        return state.merge({list:action.json})
    }
})