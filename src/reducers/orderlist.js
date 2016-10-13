/**
 * Created by Administrator on 16-10-9.
 */
import {
    GET_ALL_ORDER,
    SET_INDEX
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable';

const initState =fromJS({                         //用了immutable
    list:[],
    index:2,
    oldlist:[],
});
export default createReducer(initState,{
    [GET_ALL_ORDER]: (state,action)=>{
        return state.merge({
            list:action.json,
            oldlist:action.json,
        })
    },
    [SET_INDEX]: (state,action)=>{
        let oldlist=state.toJS().oldlist;
        let newlist;
        switch (action.json) {
            case 0:
                newlist=oldlist.filter(function(item,index){
                    return item.status === 1;
                });
                return state.merge({list:newlist,index:action.json,});
                break;
            case 1:
                newlist=oldlist.filter(function(item,index){
                    return item.status === 2;
                });
                return state.merge({list:newlist,index:action.json,});
                break;
            case 2:
                return state.merge({list:state.get('oldlist'),index:action.json});
                break;
            default:
                break;
        }
    }
})

