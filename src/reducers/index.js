/**
 * Created by Administrator on 16-9-21.
 */
// reducers/index.js
import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
import getuser from './getuser' // 引入getuser这个reducer
// import {schoolbanner} from './schoolbanner'
import schoolbanner from './schoolbanner'
import rqkc from './rqkc'
import tbtj from './tbtj'
import cnxh from './cnxh'
import xxkc from './xxkc'
import classtype from './classtype'
import defaultlist from './list'
import superkcb from './superkcb'
import detailclass from './detailclass'
import orderdata from './orderdata'
import orderinfo from './orderinfo'
import orderlist from './orderlist'
import evaluat from './evaluat'
import comment from './detailclasscomment'
import schoolinfo from './schoolinfo'
export default combineReducers({
    getuser,
    schoolbanner,
    superkcb,
    rqkc,
    tbtj,
    cnxh,
    xxkc,
    classtype,
    defaultlist,
    detailclass,
    orderdata,
    orderinfo,
    orderlist,
    evaluat,
    comment,
    schoolinfo,
    routing: routerReducer
})
