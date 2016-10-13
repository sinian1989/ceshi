/**
 * Created by Administrator on 16-10-10.
 */
import {
    GET_SCHOOL_INFO,
    GET_NEW_CLASS,
    GET_TEACHER_LIST
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable';
const initState =fromJS({
    info:{},
    imglist:[],
    lat:'',
    lon:'',
    newclass:[],
    allteacher:[],
    teacherone:{},
    moreteacher:[]
});
export default createReducer(initState,{
    [GET_SCHOOL_INFO]: (state,action)=>{
        let schoolinfo=action.json;
        let imglist = [];
        if (schoolinfo.images) {
            imglist = schoolinfo.images.split(';');
        } else {
            if (schoolinfo.image1) imglist.push(schoolinfo.image1);
            if (schoolinfo.image2) imglist.push(schoolinfo.image2);
            if (schoolinfo.image3) imglist.push(schoolinfo.image3);
            if (schoolinfo.image4) imglist.push(schoolinfo.image4);
            if (schoolinfo.image5) imglist.push(schoolinfo.image5);
            if (schoolinfo.image6) imglist.push(schoolinfo.image6);
        }
        let loc = [];
        if (schoolinfo.map != '') {
            loc = schoolinfo.map.split(',');
        }
        let lat = loc[1];
        let lon = loc[0];
        console.log('我是reducers')
        return state.merge({
            info:action.json,
            imglist:imglist,
            lat:lat,
            lon:lon
        })
    },
    [GET_NEW_CLASS]: (state,action)=>{
        return state.merge({
            newclass:action.json
        })
    },
    [GET_TEACHER_LIST]: (state,action)=>{
        let teacherone=action.json[0];
        let moreteacher=action.json.slice(1);
        return state.merge({
            allteacher:action.json,
            teacherone:teacherone,
            moreteacher:moreteacher
        })
    }
})
