/**
 * Created by Administrator on 16-9-21.
 */
import React from 'react' // 引入react
import { Route, IndexRoute } from 'react-router' // 引入react路由
import App from "./app";
import Index from "./containers/index";
import Classlist from "./containers/classlist";
import Classlisttop from "./containers/classlisttop";
import Detail from "./containers/detail";
import Accounts from "./containers/accounts";
import Odetail from "./containers/odetail";
import Olist from "./containers/olist";
import Evaluating from "./containers/evaluating";
import Dssppl from "./containers/dssppl";
import Hairschool from "./containers/hairschool";
import Schoolpage from "./containers/schoolpage";
import Xyclubdetail from "./containers/xyclubdetail";
import Xynewclass from "./containers/xynewclass";
import Xyteacherteam from "./containers/xyteacherteam";
import Xyactivity from "./containers/xyactivity";
import Search from "./containers/search";
export default (
    <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="index/:uid" component={Index}/>
        <Route path="classlist/:uid(/:dbid)(/:word)" component={Classlist}/>
        <Route path="classlisttop/:uid" component={Classlisttop}/>
        <Route path="detail/:id/:uid" component={Detail}/>
        <Route path="accounts/:id/:uid(/:openid)" component={Accounts}/>
        <Route path="odetail/:oid(/:openid)" component={Odetail}/>
        <Route path="olist/:uid" component={Olist}/>
        <Route path="evaluating/:index/:uid" component={Evaluating}/>
        <Route path="dssppl/:id/:index/:uid" component={Dssppl}/>
        <Route path="hairschool/:uid" component={Hairschool}/>
        <Route path="schoolpage/:clubid/:uid" component={Schoolpage}/>
        <Route path="xyclubdetail/:clubid/:uid" component={Xyclubdetail}/>
        <Route path="xynewclass/:clubid/:uid" component={Xynewclass}/>
        <Route path="xyteacherteam/:clubid/:uid" component={Xyteacherteam}/>
        <Route path="xyactivity/:clubid/:uid" component={Xyactivity}/>
        <Route path="search/:uid(/:fuid)" component={Search}/>
    </Route>
)