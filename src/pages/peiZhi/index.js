// 配置页面本体
import React, { useState, useEffect } from 'react';
// 数据库配置页面
import Datebase from './database/EditableContext'
// mq的配置页面
import Rabbitmq from './rabbitmq/EditableContext'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
//例子
import Example from '../Child/Example'
//例子
import Home from '../Home/index';
//例子
// import TodoList from '../Child/TodoList'
//例子
import Home2 from '../Home2/index';
// import { Router, NavLink } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
// import Menu from 'rc-menu';
// const { SubMenu } = Menu;

const peiZhi = () => {
  // 数据库配置 控制
  const [a, setA] = useState(true);
  // rabbitmq 控制
  const [b, setB] = useState(false);
  // redis 控制
  const [c, setC] = useState(false);
  // redis 控制
  const [d, setD] = useState(false);
  // redis 控制
  const [e, setE] = useState(false);
  //开启数据库 配置
  const aa = () => {
    all()
    setA(true)
  }
  //开启rabbitmq 配置
  const bb = () => {
    all()
    setB(true)
  }
  const cc = () => {
    all()
    setC(true)
  }
  const dd = () => {
    all()
    setD(true)
  }
  const ee = () => {
    all()
    setE(true)
  }

  //关闭全部视图
  const all = () => {
    setA(false);
    setB(false);
    setC(false);
    setD(false);
    setE(false);
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
      {/* //左侧菜单 */}
      <div style={{ width: '20%', }} >
        <Menu>
          <Menu.Item selectable="false">
            <h3>通用配置</h3>
          </Menu.Item>

          {/* 一级菜单 */}
          <Menu.Item key="peiZhi" onClick={aa}>
            <a ><Icon type="control" />数据库配置</a>
          </Menu.Item>

          {/* 一级菜单 */}
          <Menu.Item key="peiZhi11" onClick={bb}>
            <a ><Icon type="control" />rabbitmq配置</a>
          </Menu.Item>

          {/* 一级菜单 */}
          <Menu.Item key="peiZhi12" onClick={cc}>
            <a><Icon type="control" />redis配置</a>
          </Menu.Item>

          {/* 一级菜单 */}
          <Menu.Item key="peiZhi13" onClick={dd}>
            <a><Icon type="control" />influxdb配置</a>
          </Menu.Item>

          {/* 一级菜单 */}
          <Menu.Item key="peiZhi14" onClick={ee}>
            <a><Icon type="control" />系统配置</a>
          </Menu.Item>

        </Menu>
      </div>

      {/* //右侧页面 */}
      <div style={{ width: '80%' }}>
        {a && <Datebase />}
        {b && <Rabbitmq />}
        {c && <Example />}
        {d && <Home2 />}
        {e && <Home />}
      </div>
    </div>
  );
};

export default withRouter(peiZhi);