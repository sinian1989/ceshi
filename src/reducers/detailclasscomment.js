/**
 * Created by Administrator on 16-10-10.
 */
import {
    GET_CLASS_COMMENT
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable';

const initState =fromJS({                         //用了immutable
    comms:[]
});
export default createReducer(initState,{
    [GET_CLASS_COMMENT]:(state,action)=>{
        return state.merge({
            comms:action.json,
        })
    },
})

