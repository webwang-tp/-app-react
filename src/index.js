import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//引入redux
import { Provider } from "react-redux"
import store from "./store"
//引入重置样式
import './assets/css/reset.css'
import './assets/js/rem'
//引入ui框架css
import 'antd-mobile/dist/antd-mobile.css'
//配置路由
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider> , document.getElementById('root'));


