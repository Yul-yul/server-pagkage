//程序的入口文件
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//当用户访问一次后 会进行缓存
import * as serviceWorker from './serviceWorker';

document.addEventListener("deviceready", () => {
  //科尔多瓦设备准备好 （下面的翻译）
  // cordova device ready
}, false);
//引入app 并进行渲染
ReactDOM.render(<App />, document.getElementById('root'));
//缓存网页
serviceWorker.unregister();
