/**
 * Created by Administrator on 16-9-29.
 */
import {
    GET_CLASS_DETAIL,
    SET_LIKE_STAR,
    SHOW_DATE_PAGE,
    HIDE_DATE_PAGE,
} from '../actions/types' // 引入action类型常量名
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable';
import calendar from '../libs/calendar';

const initState =fromJS({                         //用了immutable
    detail:{},
    images:[],
    nearest:'',
    people:'',
    current:false,
    star:false,
    showdate:false,
    teacherData:'',
    classData:''
});
export default createReducer(initState,{
    [GET_CLASS_DETAIL]: (state,action)=>{
        let list0 = ['', '剪裁', '染色', '造型', '烫发', '编盘', '接发', '管理', '营销'];
        let list1 = [' ', '无要求', '小工/助理', '中工/技师', '发型师', '发型总监', '教育导师', '店长/管理层'];
        let list2 = [' ', '无要求', '零基础', '2年以下', '2~4年', '5~7年', '8~10年', '10年以上'];
        let list3 = [' ', '无要求', '沙宣剪裁课程', '汤尼盖剪裁课程', '学过方圆三角'];
        let people=action.json.people;
        let type = action.json.type;
        let str='';
        if (people.indexOf(';') !== -1) {
            let peplist = people.split(';');
            if(peplist[2]=='5'){
                str = '#课程类别：' + list0[type] + '<br/>#职称：' + list1[peplist[0]] + '<br/>#经验：' + list2[peplist[1]] + '<br/>#要求基础课程：' + peplist[3];
            }else{
                str = '#课程类别：' + list0[type] + '<br/>#职称：' + list1[peplist[0]] + '<br/>#经验：' + list2[peplist[1]] + '<br/>#要求基础课程：' + list3[peplist[2]];
            }
        } else {
            str =people;
        }
        let cont = action.json.content?action.json.content.replace(/width="[\d]+"|height="[\d]+"/ig, ''):'';
        let tuto = action.json.tutorinfo?action.json.tutorinfo.replace(/width="[\d]+"|height="[\d]+"/ig, ''):'';
        return state.merge({
            detail:action.json,
            images:action.json.images.split(','),
            nearest:action.json.classdate[0],
            people:str,
            teacherData:cont,
            classData:tuto
        })
    },
    [SET_LIKE_STAR]:(state,action)=>{
        if(action.json==1){
            return state.set('current',true)
        }else{
            return state.set('star',true)
        }
    },
    [SHOW_DATE_PAGE]:(state,action)=>{
        let datearr=state.toJS().detail.classdate;
        let datasub=state.toJS().detail.tdate;
        calendar.init($('#date'), datearr, datasub);
        return state.set('showdate',true)
    },
    [HIDE_DATE_PAGE]:(state,action)=>{
        return state.set('showdate',false)
    }
})
