/**
 * Created by Administrator on 16-9-21.
 */
import React from "react";
import {render} from "react-dom";
import DevTools from "./DevTools";

export default function createDevTools(store) {
    setTimeout(() => render(
        <DevTools store={store}/>,
        window.document.body.appendChild(document.createElement('div'))
    ), 10)
}

