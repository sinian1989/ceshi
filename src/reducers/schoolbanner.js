/**
 * Created by Administrator on 16-9-23.
 */
import {
    GET_SCHOOL_BANNER,
    GET_SCHOOL_LIST
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'
// import {Immutable} from 'immutable'

const initState =fromJS({                         //用了immutable
    list: [],
    biglist:[],
    smlist:[],
    zuixiao:[],
});
export default createReducer(initState,{
    [GET_SCHOOL_BANNER]: (state,action)=>{
        let list=action.json;
        let pic, biglist = [], smlist = [], zuixiao = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].recommend == 2) {
                biglist.push([list[i]]);

            } else if (list[i].recommend == 1) {
                smlist.push(list[i]);
            } else {
                zuixiao.push(list[i]);
                if (!zuixiao.length) {
                    zuixiao = null;
                }
            }
        }
        var slist=smlist;
        let len=slist.length%2==0?slist.length/2:slist.length/2+1;
        for (var k = 0; k < len; k++) {
            if(slist.length>=2){
                biglist.push(slist.splice(0, 2));
            }else{
                biglist.push(slist.splice(0));
            }
        }
        let num = Math.floor(Math.random() * biglist.length);
        pic=biglist[num];
        return state.merge({
            list:pic,
        })
    },
    [GET_SCHOOL_LIST]: (state,action)=>{
        let list=action.json;
        let biglist = [], smlist = [], zuixiao = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].recommend == 2) {
                biglist.push(list[i]);

            } else if (list[i].recommend == 1) {
                smlist.push(list[i]);
            } else {
                zuixiao.push(list[i]);
                if (!zuixiao.length) {
                    zuixiao = null;
                }
            }
        }
        return state.merge({
            biglist:biglist,
            smlist:smlist,
            zuixiao:zuixiao,
        })
    }
})
// const initState ={                         //没有用immutable
//     list: []
// };
// export default function getschoolbanner(state = initState, action){
//     // 根据不同的action type进行state的更新
//     switch(action.type) {
//         case GET_SCHOOL_BANNER:
//             let list=action.json;
//             let pic, biglist = [], smmlist = [], smlist = [], zuixiao = [];
//             for (var i = 0; i < list.length; i++) {
//                 if (list[i].recommend == 2) {
//                     biglist.push(list[i]);
//                 } else if (list[i].recommend == 1) {
//                     smlist.push(list[i]);
//                 } else {
//                     zuixiao.push(list[i]);
//                     if (!zuixiao.length) {
//                         zuixiao = null;
//                     }
//                 }
//             }
//             var slist=smlist;
//             let len=slist.length%2==0?slist.length/2:slist.length/2+1;
//             for (var k = 0; k < len; k++) {
//                 if(slist.length>=2){
//                     biglist.push(slist.splice(0, 2));
//                 }else{
//                     biglist.push(slist.splice(0));
//                 }
//             }
//             let num = Math.floor(Math.random() * biglist.length);
//             pic=biglist[num];
//             return Object.assign({}, state, {list:pic}); //没有用immutable
//             break;
//         default:
//             return state
//     }
// }
