/**
 * Created by Administrator on 16-10-9.
 */
import {
    GET_EVALUAT,
    SELECT_ANSWER,
    RESET_NEW_ACTIVE
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable';
import base from '../libs/base';
// let active=base.tool.cookie.get('evanswer').split(';')[index - 1]?base.tool.cookie.get('evanswer').split(';')[index - 1]:0;
const initState =fromJS({                         //用了immutable
    level:{},
    result:'',
    newactive:''
});
export default createReducer(initState,{
    [GET_EVALUAT]: (state,action)=>{
        let str=['A级<br/>波波姐提醒你------学习无止境，励精图治方能长盛不衰！','B级<br/>波波姐提醒你------不要骄傲，停止不前你会变成羊！','C级<br/>波波姐提醒你------不想被人骑，继续努力学习吧！','D级<br/>波波姐提醒你------努力学习，才能知道外面的世界很精彩！','E级<br/>波波姐提醒你------拼命学习，快快向前跑吧！'][action.json];
        return state.merge({
            level:action.json,
            result:str
        })
    },
    [SELECT_ANSWER]: (state,action)=>{
        let answer = base.tool.cookie.get('evanswer').split(';');
        answer[action.index - 1] =action.num ;
        base.tool.cookie.set('evanswer', answer.join(';'));
        // let active= base.tool.cookie.get('evanswer').split(';')[action.index - 1];
        return state.merge({
            newactive:action.num
        })
    },
    [RESET_NEW_ACTIVE]: (state,action)=>{
        return state.merge({
            newactive:null
        })
    }
})

