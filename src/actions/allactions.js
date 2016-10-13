/**
 * Created by Administrator on 16-9-21.
 */
import * as types from './types';
import base from '../libs/base';
export const setuserdata = (json) =>{
    return {
        type: types.GETUSER,
        json,
        //业界提出以一种标准 action， 叫做 Flux Standard Action , 该标准下的action除了type属性之外，只允许多加（不是必须包含）这三个属性：payload，error，meta
        payload: 'action的负载，可以是数据或 error 对象', //action的负载，可以是数据或 error 对象
        error: '指明该action是否是一个以 error 为负载的action', // 指明该action是否是一个以 error 为负载的action
        meta: '获取用户信息的action' // action元数据， 包含解释该action含义的信息
    }
};
//获取用户信息
export const getuserdata = (uid) =>{
    return (dispatch, getState) => {
        return uid === 'share' ?
            dispatch(setuserdata(
                {"nickname": "未登录用户", "logo": "src/assets/images/anonymous.png", "attach": true}
                )) :$.ajax('/api/shop/GetUserInfo',{data:{uid:uid}}).done((data)=>{
            if (data.status == 1) {
                dispatch(setuserdata(data.info))
            }else{
                console.log(data.msg)
            }
        })
        // const auth = getState().auth.toJS()
        // return api.getArticleDetaile(id)
        //     .then(response => ({json: response.data, status: response.statusText}))
        //     .then(({json,status}) => {
        //         let isLike = false
        //         let article = json.data
        //         if(auth.user){
        //             auth.user.likes.map(item=>{
        //                 if(item.toString() === article._id){
        //                     isLike = true
        //                 }
        //             })
        //         }
        //         return dispatch({
        //             type: types.ARTICLE_DETAIL_SUCCESS,
        //             articleDetail: {...article,isLike:isLike}
        //         })
        //     })
        //     .catch(error => {
        //         return dispatch({
        //             type: types.ARTICLE_DETAIL_FAILURE
        //         })
        //     })
    }
}
//获取随机学院logo
function filt(list){
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
    return pic
}
export const getschoolbanner = (uid) =>{
    return (dispatch, getState) => {
        if(sessionStorage.SCHOOL_LIST){
            dispatch({
                type: types.GET_SCHOOL_BANNER,
                // json:filt(JSON.parse(sessionStorage.SCHOOL_LIST))
                json:JSON.parse(sessionStorage.SCHOOL_LIST)
            })
        }else{
            return $.ajax('/Api/Shop/GetClublistinfo',{data:{uid:uid}}).done((data)=>{
                if (data.status == 1) {
                    sessionStorage.SCHOOL_LIST = JSON.stringify(data.info.list);
                    dispatch({
                        type: types.GET_SCHOOL_BANNER,
                        // json:filt(data.info.list)
                        json:data.info.list
                    })
                }
            })
        }
    }
}
export const getschoollist = (uid) =>{
    return (dispatch, getState) => {
        if(sessionStorage.SCHOOL_LIST){
            dispatch({
                type: types.GET_SCHOOL_LIST,
                json:JSON.parse(sessionStorage.SCHOOL_LIST)
            })
        }else{
            return $.ajax('/Api/Shop/GetClublistinfo',{data:{uid:uid}}).done((data)=>{
                if (data.status == 1) {
                    sessionStorage.SCHOOL_LIST = JSON.stringify(data.info.list);
                    dispatch({
                        type: types.GET_SCHOOL_LIST,
                        json:data.info.list
                    })
                }
            })
        }
    }
}
export const getschoolinfo = (uid,clubid) =>{
    return (dispatch, getState) => {
        return $.ajax('/Api/Shop/GetClublistinfo',{data:{uid:uid,ouid:clubid}}).done((data)=>{
            console.log('dispatch之前')
            if (data.status == 1) {
                dispatch({
                    type: types.GET_SCHOOL_INFO,
                    json:data.info
                })
                console.log('dispatch之后')
            }
        })
    }
}
export const getnewclass = (clubid) =>{
    return (dispatch, getState) => {
        return $.ajax('/Api/Shop/GetteamClassByid',{data:{uid:clubid}}).done((data)=>{
            if (data.status == 1) {
                dispatch({
                    type: types.GET_NEW_CLASS,
                    json:data.info
                })
            }
        })
    }
}
export const getteacherlist = (clubid,uid) =>{
    return (dispatch, getState) => {
        return $.ajax('/Api/Shop/Getteamlist',{data:{ouid:clubid,uid:uid}}).done((data)=>{
            if (data.status == 1) {
                dispatch({
                    type: types.GET_TEACHER_LIST,
                    json:data.info.list
                })
            }
        })
    }
}
export const getsuperkcb = (uid) =>{
    return (dispatch, getState) => {
        if(sessionStorage.SUPER_KCB){
            dispatch({
                type: types.GET_SUPER_KCB,
                json:JSON.parse(sessionStorage.SUPER_KCB)
            })
        }else{
            let mdate = new Date();
            let mdates = mdate.getFullYear() + '-' + (mdate.getMonth() + 1) + '-' + mdate.getDate();
            return $.ajax('/API/Shop/GetShopClassweek',{data:{date:mdates}}).done((data)=>{
                if (data.status == 1) {
                    sessionStorage.SUPER_KCB = JSON.stringify(data.info);
                    dispatch({
                        type: types.GET_SUPER_KCB,
                        json:data.info
                    })
                }
            })
        }
    }
}
export const getrqkc = (uid) =>{
    return (dispatch, getState) => {
        if(sessionStorage.RQKC){
            dispatch({
                type: types.GET_RQKC,
                json:JSON.parse(sessionStorage.RQKC)
            })
        }else{
            return $.ajax('/api/shop/GetRQKC',{data:{uid:uid}}).done((data)=>{
                if (data.status == 1) {
                    sessionStorage.RQKC = JSON.stringify(data.info);
                    dispatch({
                        type: types.GET_RQKC,
                        json:data.info
                    })
                }
            })
        }
    }
}
export const gettbtj = (uid) =>{
    return (dispatch, getState) => {
        if(sessionStorage.TBTJ){
            dispatch({
                type: types.GET_TBTJ,
                json:JSON.parse(sessionStorage.TBTJ)
            })
        }else{
            return $.ajax('/api/shop/GetBanner2',{data:{uid:uid}}).done((data)=>{
                if (data.status == 1) {
                    sessionStorage.TBTJ = JSON.stringify(data.info);
                    dispatch({
                        type: types.GET_TBTJ,
                        json:data.info
                    })
                }
            })
        }
    }
}
export const getcnxh = (uid) =>{
    return (dispatch, getState) => {
        if(sessionStorage.CNXH){
            dispatch({
                type: types.GET_CNXH,
                json:JSON.parse(sessionStorage.CNXH)
            })
        }else{
            return $.ajax('/api/shop/GetCNXH',{data:{uid:uid}}).done((data)=>{
                if (data.status == 1) {
                    sessionStorage.CNXH = JSON.stringify(data.info);
                    dispatch({
                        type: types.GET_CNXH,
                        json:data.info
                    })
                }
            })
        }
    }
}
export const getxxkc = (uid) =>{
    return (dispatch, getState) => {
        if(sessionStorage.XXKC){
            dispatch({
                type: types.GET_XXKC,
                json:JSON.parse(sessionStorage.XXKC)
            })
        }else{
            return $.ajax('/Api/Shop/GetShopHomeClassInfo').done((data)=>{
                if (data.status == 1) {
                    sessionStorage.XXKC = JSON.stringify(data.info);
                    dispatch({
                        type: types.GET_XXKC,
                        json:data.info
                    })
                }
            })
        }
    }
}
export const getclasstype = () =>{
    return (dispatch, getState) => {
        if(sessionStorage.CLASSTYPE){
            dispatch({
                type: types.CLASS_TYPE,
                json:JSON.parse(sessionStorage.CLASSTYPE)
            })
        }else{
            return $.ajax('/Api/Shop/GetShoptype').done((data)=>{
                if (data.status == 1) {
                    data.info.unshift({
                        "key": "month",
                        "name": "月份",
                        "list": [
                            {
                                "id": "-1", "val": "全部"
                            },
                            {
                                "id": "1", "val": "1月"
                            },
                            {
                                "id": "2", "val": "2月"
                            },
                            {
                                "id": "3", "val": "3月"
                            },
                            {
                                "id": "4", "val": "4月"
                            },
                            {
                                "id": "5", "val": "5月"
                            },
                            {
                                "id": "6", "val": "6月"
                            },
                            {
                                "id": "7", "val": "7月"
                            },
                            {
                                "id": "8", "val": "8月"
                            },
                            {
                                "id": "9", "val": "9月"
                            },
                            {
                                "id": "10", "val": "10月"
                            },
                            {
                                "id": "11", "val": "11月"
                            },
                            {
                                "id": "12", "val": "12月"
                            }
                        ]
                    });
                    data.info.map((item,index)=>{
                        item.select='';
                        item.selectid='';
                    })
                    sessionStorage.CLASSTYPE = JSON.stringify(data.info);
                    dispatch({
                        type: types.CLASS_TYPE,
                        json:data.info
                    })
                }
            })
        }
    }
}
export const showprice=()=>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SHOW_HIDE_PRICE,
        })
    }
}
export const showselect=()=>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SHOW_SELECT,
        })
    }
}
export const hideselect=()=>{
    return (dispatch, getState) => {
        dispatch({
            type: types.HIDE_SELECT,
        })
    }
}
export const showoption=(index)=>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SHOW_OPTION,
            num:index
        })
    }
}
export const hideoption=()=>{
    return (dispatch, getState) => {
        dispatch({
            type: types.HIDE_OPTION,
        })
    }
}
export const chooseoption=(index,val)=>{
    return (dispatch, getState) => {
        dispatch({
            type: types.CHOOSE_OPTION,
            index:index,
            val:val
        })
    }
}
export const defaultlist = (uid) =>{
    return (dispatch, getState) => {
        if(sessionStorage.DEFAULT_LIST){
            dispatch({
                type: types.GET_DEFAULT_LIST,
                json:JSON.parse(sessionStorage.DEFAULT_LIST)
            })
        }else{
            return $.ajax('/Api/Shop/GetShopClass',{data: {
                month: -1,
                city: -1,
                type: -1,
                cuid: -1,
                oederby: -1,
                pageindex: 1,
                pagesize: 500
            }}).done((data)=>{
                if (data.status == 1) {
                    sessionStorage.DEFAULT_LIST = JSON.stringify(data.info);
                    dispatch({
                        type: types.GET_DEFAULT_LIST,
                        json:data.info
                    })
                }
            })
        }
    }
}
export const gettop10list = (uid) =>{
    return (dispatch, getState) => {
        if(sessionStorage.TOP10_LIST){
            dispatch({
                type: types.GET_DEFAULT_LIST,
                json:JSON.parse(sessionStorage.TOP10_LIST)
            })
        }else{
            return $.ajax('/api/shop/GetSaleTop10').done((data)=>{
                if (data.status == 1) {
                    sessionStorage.TOP10_LIST = JSON.stringify(data.info);
                    dispatch({
                        type: types.GET_DEFAULT_LIST,
                        json:data.info
                    })
                }
            })
        }
    }
}
export const getresult = (obj) =>{
    return (dispatch, getState) => {
        return $.ajax('/Api/Shop/GetShopClass',{data:obj }).done((data)=>{
            if(data.status!==1){
                base.ui.alert(data.msg)
                dispatch({
                    type: types.GET_DEFAULT_LIST,
                    json:''
                })
                return false
            }
            if (data.status == 1) {
                dispatch({
                    type: types.GET_DEFAULT_LIST,
                    json:data.info
                })
            }
        })
    }
}
export const getdatelist = (date,type) =>{
    return (dispatch, getState) => {
        return $.ajax('/Api/Shop/GetShopClass',
            {
                data: {
                    month: -1,
                    city: -1,
                    type: type,
                    cuid: -1,
                    oederby: -1,
                    pageindex: 1,
                    pagesize: 100,
                    date: date
                }
            }
        ).done(function(data){
            if (data.status == 1) {
                dispatch({
                    type: types.GET_DEFAULT_LIST,
                    json:data.info
                })
            }
        })
    }
}
export const getclubclass = (clubid) =>{
    return (dispatch, getState) => {
        return $.ajax('/Api/Shop/GetShopClass',{data:{month: -1, city: -1, type: -1, cuid: clubid, oederby: -1, pageindex: 1, pagesize: 100}}).done((data)=>{
            if(data.status!==1){
                base.ui.alert(data.msg)
                dispatch({
                    type: types.GET_DEFAULT_LIST,
                    json:''
                })
                return false
            }
            if (data.status == 1) {
                dispatch({
                    type: types.GET_DEFAULT_LIST,
                    json:data.info
                })
            }
        })
    }
}
export const getsearchlist = (val) =>{
    return (dispatch, getState) => {
        return $.ajax('/Api/Shop/SearchShopClass', {data: {word: val}}).done((data)=>{
            if(data.status!==1){
                base.ui.alert(data.msg)
                dispatch({
                    type: types.GET_DEFAULT_LIST,
                    json:''
                })
                return false
            }
            if (data.status == 1) {
                dispatch({
                    type: types.GET_DEFAULT_LIST,
                    json:data.info
                })
            }
        })
    }
}
export const selectSort = (index) =>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SORT_LIST,
            index:index
        })
    }
}
export const searchFocus = (index) =>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SEARCH_FOCUS,
            index:index
        })
    }
}
export const searchBlur = (index) =>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SEARCH_BLUR,
            index:index
        })
    }
}
export const getclassdetail = (id,uid) =>{
    return (dispatch, getState) => {
        return $.ajax('/api/shop/GetShopClassdetital',{data:{id:id,uid:uid}}).done((data)=>{
            if(data.status!==1){
                base.ui.alert(data.msg, function () {
                    window.history.back();
                });
                return false
            }
            dispatch({
                type: types.GET_CLASS_DETAIL,
                json:data.info
            })
        })
    }
}
export const sendlickorstar = (id,uid,type) =>{
    return (dispatch, getState) => {
        $.ajax({
            url: '/api/shop/AddFAV',
            data: {shcid: id, uid: uid, type: type}
        }).done((data)=>{
            dispatch({
                type: types.SET_LIKE_STAR,
                json:type
            })
        })
    }
}
export const showdatepage = () =>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SHOW_DATE_PAGE,
        })
    }
}
export const hidedatepage = () =>{
    return (dispatch, getState) => {
        dispatch({
            type: types.HIDE_DATE_PAGE,
        })
    }
}
export const savecount = (obj) =>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SAVE_COUNT_DATE,
            json:obj
        })
    }
}
export const getorderdata = (uid) =>{
    return (dispatch, getState) => {
        return $.ajax('/api/shop/GetOrderAddress',{data:{uid:uid}}).done((data)=>{
            if(data.status!==1){
                base.ui.alert(data.msg);
                return false
            }
            dispatch({
                type: types.GET_ORDER_DATA,
                json:data.info
            })
        })
    }
}
export const getorderinfo = (oid) =>{
    return (dispatch, getState) => {
        return $.ajax('/api/shop/GetOrderinfo',{data:{id:oid}}).done((data)=>{
            if(data.status!==1){
                base.ui.alert(data.msg);
                return false
            }
            dispatch({
                type: types.GET_ORDER_INFO,
                json:data.info
            })
        })
    }
}
export const setstate = (index) =>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_STATE,
            json:index
        })
    }
}
export const setindex = (index) =>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_INDEX,
            json:index
        })
    }
}
export const getallorder = (uid) =>{
    return (dispatch, getState) => {
        if(sessionStorage.ALL_ORDER){
            dispatch({
                type: types.GET_ALL_ORDER,
                json:JSON.parse(sessionStorage.ALL_ORDER)
            })
        }else{
            return $.ajax('/api/shop/GetOrder',{data:{uid:uid}}).done((data)=>{
                if(data.status!==1){
                    base.ui.alert(data.msg);
                    return false
                }
                sessionStorage.ALL_ORDER = JSON.stringify(data.info);
                dispatch({
                    type: types.GET_ALL_ORDER,
                    json:data.info
                })
            })
        }
    }
}
export const setNoBuy = () =>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_NO_BUY,
        })
    }
}
export const getevaluat = (obj) =>{
    return (dispatch, getState) => {
        return $.ajax('/api/shop/GetTest',{data:obj}).done((data)=>{
            if(data.status!==1){
                base.ui.alert(data.msg);
                return false
            }
            dispatch({
                type: types.GET_EVALUAT,
                json:data.info
            })
        })
    }
}
export const answer = (index,i) =>{
    return (dispatch, getState) => {
        dispatch({
            type: types.SELECT_ANSWER,
            index:index,
            num:i
        })
    }
}
export const resetNewActive = (index,i) =>{
    return (dispatch, getState) => {
        dispatch({
            type: types.RESET_NEW_ACTIVE,
        })
    }
}
export const getclasscomment = (id) =>{
    return (dispatch, getState) => {
        return $.ajax('/api/shop/GetShopComment',{data:{id:id}}).done((data)=>{
            if(data.status!==1){
                base.ui.alert(data.msg);
                return false
            }
            dispatch({
                type: types.GET_CLASS_COMMENT,
                json:data.info
            })
        })
    }
}



