import React from 'react'  // 引入React
import { render } from 'react-dom' // 引入render方法
import { Provider } from 'react-redux' // 利用Provider可以使我们的 store 能为下面的组件所用


// import { Router, browserHistory } from 'react-router' // Browser history 是由 React Router 创建浏览器应用推荐的 history
import {Router, Route, IndexRoute, useRouterHistory} from "react-router";
import {createHashHistory} from "history";
const appHistory = useRouterHistory(createHashHistory)({queryKey: false});


import { syncHistoryWithStore } from 'react-router-redux' // 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件

import finalCreateStore from './store/configureStore'  //引入store配置
// import DevTools from './DevTools'  // 引入Redux调试工具DevTools
import createDevTools from './createDevTools'  // 引入Redux调试工具DevTools
import reducer from './reducers/index'  // 引入reducers集合
import routes from './routes'   // 引入路由配置

import base from './libs/base';
//设置一下全局的ajax
var offset=document.getElementById('offset');
$.ajaxSetup({
    type: 'post',
    beforeSend: function () {
        offset.style.display='block';
    },
    error: function () {
        base.ui.alert('系统错误，请稍后重试！');
    },
    complete: function () {
        offset.style.display='none';
    }
});
// 给增强后的store传入reducer
const store = finalCreateStore(reducer);
// 创建一个增强版的history来结合store同步导航事件
const history = syncHistoryWithStore(appHistory, store); //路由前面必须加/，否则渲染三次

import FastClick from "fastclick";
FastClick.attach(document.body);
require(['./libs/jquery.shCircleLoader'], function (loader) {
    $('#loader').shCircleLoader({namespace: "myns", color: "transparent", dotsRadius: 15});
});
// render((
//     <Provider store={store}>
//         <Router history={appHistory}>
//         </Router>
//     </Provider>
// ), document.getElementById('app'));
//调试工具
// createDevTools(store);
render((
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>
), document.getElementById('app'));




