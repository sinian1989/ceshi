/**
 * Created by Administrator on 16-9-21.
 */
import {
    GETUSER,
} from '../actions/types' // 引入action类型常量名
// 初始化state数据
const initialState = {                                     //没有用immutable
    data: {}
}
// 通过dispatch action进入
export default function getuserdata(state = initialState, action){
    // 根据不同的action type进行state的更新
    switch(action.type) {
        case GETUSER:
            return Object.assign({}, state, {data:action.json}) //没有用immutable
            break;
        default:
            return state
    }
}

