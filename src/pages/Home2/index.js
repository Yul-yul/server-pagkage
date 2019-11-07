import React from 'react';
import { Button } from 'antd';
const electron = window.require('electron'); // 引用electron例子
const Home2 = () => {
  const handleTest = () => {
    const BrowserWindow = electron.remote.BrowserWindow;
    new BrowserWindow({ width: 400, height: 275 });
  };
  return (
    <div>
      <p>我是influxdb配置</p>
      <p>我是主页qqq-home2</p>
      <p>home/index/js</p>
      <Button type="primary" onClick={handleTest}>测试electron</Button>
    </div>
  );
};

export default Home2;
