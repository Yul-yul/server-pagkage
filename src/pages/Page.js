//上方导航栏
import React from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
//菜单a
import Home from '~/pages/Home';
//菜单a
import Home2 from '~/pages/Home2';
//菜单a
import Child from '~/pages/Child';
//配置
import peiZhi from '~/pages/peiZhi';
import jiChu from './jiChu';
//基础服务
import eureka from './basic/eureka'
import auth from './basic/auth'
import gateway from './basic/gateway'
//通用服务
import module from './basic/module'
import index from './basic/index'
//导入菜单
const { SubMenu } = Menu;
// 导入cmd组件
var cmd = window.require("node-cmd");

const getPageCls = pathname => {
  return 'page-' + pathname.replace(/^\//, '').replace(/\//, '-') || 'home';
};
//路由本体
const Page = ({ location }) => {
  //打开指定文件夹的方法
  var mysql = () => {
    cmd.get("explorer.exe E:\\b\\mysql", function (err, data) {
      if (data) console.log(data);
    });
  }
  //打开指定文件夹的方法
  var Rebbitmq = () => {
    cmd.get("explorer.exe E:\\b\\Rebbitmq", function (err, data) {
      if (data) console.log(data);
    });
  }
  //打开指定文件夹的方法
  var SQLServer = () => {
    cmd.get("explorer.exe E:\\b\\SQL Server", function (err, data) {
      if (data) console.log(data);
    });
  }

  const pageCls = getPageCls(location.pathname);

  return (
    <div id="app" className={pageCls}>
      {/* //定义菜单 */}
      <Menu mode="horizontal">

        {/* 一级菜单 首页 */}
        <Menu.Item key="key-index">
          <Link to="/index">
            <Icon type="control" />
            首页
          </Link>
        </Menu.Item>

        {/* 一级菜单 配置 */}
        <Menu.Item key="peiZhi">
          <Link to="/peiZhi">
            <Icon type="control" />
            配置
          </Link>
        </Menu.Item>



        {/* 一级菜单 安装程序 */}
        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="file-zip" />安装程序</span>}>
          <Menu.Item key="setting:1"><Link to="" onClick={mysql}>Mysql 安装包</Link></Menu.Item>
          <Menu.Item key="setting:2"><Link to="" onClick={SQLServer} >SQL Server 安装包</Link></Menu.Item>
          <Menu.Item key="setting:3"><Link to="" onClick={Rebbitmq} >Rebbitmq 安装包</Link></Menu.Item>
          <Menu.Item key="setting:4"><Link to="">Redis 安装包</Link></Menu.Item>
          <Menu.Item key="setting:5"><Link to="">Influxdb 安装包</Link></Menu.Item>
        </SubMenu>

        {/* 一级菜单 基础服务 */}
        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars" />基础服务</span>}>
          <Menu.Item key="setting:16"><Link to="/eureka?value=eureka" >eureka</Link></Menu.Item>
          <Menu.Item key="setting:17"><Link to="/module?value=auth">auth</Link></Menu.Item>
          <Menu.Item key="setting:18"><Link to="/module?value=log">log</Link></Menu.Item>
          <Menu.Item key="setting:19"><Link to="/module?value=gateway">gateway</Link></Menu.Item>
        </SubMenu>

        {/* 一级菜单 基础服务 */}
        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars" />设备模块（EMS）</span>}>
          <Menu.Item key="setting:26"><Link to="/module?value=spare" >spare</Link></Menu.Item>
          <Menu.Item key="setting:27"><Link to="/module?value=auth">auth</Link></Menu.Item>
          <Menu.Item key="setting:28"><Link to="/module?value=log">log</Link></Menu.Item>
          <Menu.Item key="setting:29"><Link to="/module?value=gateway">gateway</Link></Menu.Item>
        </SubMenu>

        {/* 一级菜单 基础服务 */}
        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars" />质量模块（QMS）</span>}>
          <Menu.Item key="setting:36"><Link to="/module?value=eureka" >eureka</Link></Menu.Item>
          <Menu.Item key="setting:37"><Link to="/module?value=auth">auth</Link></Menu.Item>
          <Menu.Item key="setting:38"><Link to="/module?value=log">log</Link></Menu.Item>
          <Menu.Item key="setting:39"><Link to="/module?value=gateway">gateway</Link></Menu.Item>
        </SubMenu>

        {/* 一级菜单 基础服务 */}
        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars" />制造运营</span>}>
          <Menu.Item key="setting:46"><Link to="/eureka?value=eureka" >eureka</Link></Menu.Item>
          <Menu.Item key="setting:47"><Link to="/auth?value=auth">auth</Link></Menu.Item>
          <Menu.Item key="setting:48"><Link to="/log?value=log">log</Link></Menu.Item>
          <Menu.Item key="setting:49"><Link to="/gateway?value=gateway">gateway</Link></Menu.Item>
        </SubMenu>

        {/* 一级菜单 基础服务 */}
        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars" />帮助</span>}>
          <Menu.Item key="setting:56"><Link to="/auth?value=spart" >备件</Link></Menu.Item>
          <Menu.Item key="setting:57"><Link to="/auth?value=auth">auth</Link></Menu.Item>
          <Menu.Item key="setting:58"><Link to="/log?value=log">log</Link></Menu.Item>
          <Menu.Item key="setting:59"><Link to="/gateway?value=gateway">gateway</Link></Menu.Item>
        </SubMenu>

        {/* 一级菜单 通用服务 */}
        {/* <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars" />通用服务</span>}>
          <Menu.Item key="setting:10"><Link to="/child">activiti</Link></Menu.Item>
          <Menu.Item key="setting:11"><Link to="/child">schedule</Link></Menu.Item>
          <Menu.Item key="setting:12"><Link to="/child">equipment-fault</Link></Menu.Item>
          <Menu.Item key="setting:13"><Link to="/child">equipment-info-collection</Link></Menu.Item>
          <Menu.Item key="setting:14"><Link to="/child">equipment-maintain</Link></Menu.Item>
          <Menu.Item key="setting:15"><Link to="/child">equipment-master-data-dev</Link></Menu.Item>
          <Menu.Item key="setting:16"><Link to="/child">materialsmsd</Link></Menu.Item>
          <Menu.Item key="setting:17"><Link to="/child">route-dev</Link></Menu.Item>
          <Menu.Item key="setting:18"><Link to="/child">spare-part</Link></Menu.Item>
          <Menu.Item key="setting:19"><Link to="/child">time</Link></Menu.Item>
          <Menu.Item key="setting:20"><Link to="/child">tool</Link></Menu.Item>
          <Menu.Item key="setting:21"><Link to="/child">work-paln</Link></Menu.Item>
        </SubMenu> */}

        {/* 一级菜单 自定义服务 */}
        {/* <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />自定义服务</span>}>
          <Menu.Item key="setting:16"><Link to="/child">Mysql 安装包</Link></Menu.Item>
          <Menu.Item key="setting:17"><Link to="/child">SQL Server 安装包</Link></Menu.Item>
          <Menu.Item key="setting:18"><Link to="/child">Rebbitmq 安装包</Link></Menu.Item>
          <Menu.Item key="setting:19"><Link to="/child">Redis 安装包</Link></Menu.Item>
          <Menu.Item key="setting:20"><Link to="/child">Influxdb 安装包</Link></Menu.Item>
        </SubMenu> */}

        {/* 一级菜单 */}
        {/* <SubMenu title={<span className="submenu-title-wrapper"><Icon type="loading" />服务配置</span>}>
          <Menu.Item key="setting:21"><Link to="/child">Mysql 安装包</Link></Menu.Item>
          <Menu.Item key="setting:22"><Link to="/child">SQL Server 安装包</Link></Menu.Item>
          <Menu.Item key="setting:23"><Link to="/child">Rebbitmq 安装包</Link></Menu.Item>
          <Menu.Item key="setting:24"><Link to="/child">Redis 安装包</Link></Menu.Item>
          <Menu.Item key="setting:25"><Link to="/child">Influxdb 安装包</Link></Menu.Item>
        </SubMenu> */}

        {/* 一级菜单 */}
        {/* <Menu.Item key="mail">
          <Link to="/home">
            <Icon type="mail" />
            第一个导航
          </Link>
        </Menu.Item> */}

        {/* 一级菜单 */}
        {/* <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />导航三-子菜单</span>}>
          <Menu.ItemGroup title="一级菜单">
            <Menu.Item key="setting:100"><Link to="/child">二级菜单 1</Link></Menu.Item>
            <Menu.Item key="setting:200">二级菜单 2</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu> */}

        {/* 一级菜单 */}
        {/* <Menu.Item key="mail1">
          <Link to="/home2">
            <Icon type="mail" />
            菜单
          </Link>
        </Menu.Item> */}
      </Menu>

      <Switch>
        <Route path="/peiZhi" component={peiZhi} />
        <Route path="/jiChu" component={jiChu} />
        <Route path="/home" component={Home} />
        <Route path="/home2" component={Home2} />
        <Route path="/child" component={Child} />
        <Route path="/auth" component={auth} />
        <Route path="/eureka" component={eureka} />
        <Route path="/gateway" component={gateway} />
        <Route path="/index" component={index} />
        <Route path="/module" component={module} />
      </Switch>
    </div>
  );
};

export default withRouter(Page);
