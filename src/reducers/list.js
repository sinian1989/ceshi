/**
 * Created by Administrator on 16-9-28.
 */
import {
    GET_DEFAULT_LIST,
    SORT_LIST
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initState =fromJS({                         //用了immutable
    list: [],
    oldlist:[]
});
export default createReducer(initState,{
    [GET_DEFAULT_LIST]: (state,action)=>{
        return state.merge({list:action.json,oldlist:action.json});
    },
    [SORT_LIST]: (state,action)=>{
        let oldlist=state.toJS().list;
        let newlist;
        switch (action.index) {
            case 0:
                newlist = oldlist.sort(function (a, b) {
                    return a['sellingprice'] - b['sellingprice'];
                });
                return state.merge({list:newlist});
                break;
            case 1:
                newlist = oldlist.sort(function (a, b) {
                    return b['sellingprice'] - a['sellingprice'];
                });
                return state.merge({list:newlist});
                break;
            case 2:
                // newlist = oldlist.sort(function (a, b) {
                //     return b['id'] - a['id'];
                // });
                // return state.merge({list:newlist});
                return state.merge({list:state.get('oldlist')})
                break;
            default:
                break;
        }
    }
})
