//表格 组件
import { Form, Button, Descriptions, Badge } from 'antd';
import React, { Component } from 'react'
//服务配置
import serverList from '../../Child/eureka.json'
//数据库配置
import databases from '../../peiZhi/json/databases.json'
const electron = window.require('electron'); // 引用electron例子
//cmd方法
var cmd = window.require("node-cmd");
const path = require('path');
//文件操作方法
const fs = window.require('fs');
//通用路径
const route = "C:/Users/gtyllc/Desktop/bat/elecaltion/"
//脚本名称
const batName = 'a.bat'
//日志名称
const logName = 'a.txt'

//创建表格
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //列表对象
      server: {}
    };
  }
  //初始化
  componentDidMount() {
    serverList.forEach((item, index) => {
      //根据传入信息判断当前服务
      if (this.props.serverName === item.serverName) {
        this.setState({
          server: item
        })
      }
    })
  }

  //打开日志
  runLog = () => {
    const path = 'notepad ' + route + logName;
    cmd.get(path, function (err, data) {
      if (err) console.log(err);
      if (data) console.log(data);
    });
  }

  //打开eureka界面
  electron = () => {
    //配置文件信息
    const config = this.state.server
    const http = 'http://' + config.IP + ':' + config.port;
    //创建窗口
    const BrowserWindow = electron.remote.BrowserWindow;
    //生成窗口
    const win = new BrowserWindow({ width: '100%', height: '100%' });
    //窗口url
    win.loadURL(http)
  }

  //运行脚本
  runbat = () => {
    //删除脚本
    this.deletebat();
    //生成脚本
    this.generate()
    //运行脚本 （命令，路径，文件）
    cmd.get("start " + route + batName, function (err, data) {
      if (err) console.log(err)
      if (data) console.log(data)
    })
  }

  //生成bat文本
  generate = () => {
    //获取服务配置信息
    const config = this.state.server
    //获取服务自定义配置信息
    const spring = config.spring
    //定义配置
    let buffor = " "
    //添加数据库信息
    databases.forEach((item, index) => {
      //如果信息存在
      if (item.databasesName === config.databasesKey) {
        buffor = buffor + " -D" + item.a + " ";
        buffor = buffor + " -D" + item.b + config.schema + item.c + " ";
        buffor = buffor + " -D" + item.d + " ";
        buffor = buffor + " -D" + item.e + " ";
      }
    })
    //修改端口号
    if (config.port != undefined) {
      buffor = buffor + " -Dserver.port=" + config.port + " "
    }
    //添加自定义配置
    spring.forEach((item, index) => {
      buffor = buffor + " -D" + item.key + "=" + item.value + " "
    })
    //脚本本体
    const bat =
      "@echo off \n" +
      "setlocal enabledelayedexpansion \n" +
      "cd /d %~dp0 \n" +
      "title eureka \n" +
      "java -jar " + buffor + "%~dp0" + config.jarName + ' > ' + logName + " \n" +
      "pause"
    // 生成脚本 （路径，内容，编码）
    fs.writeFile(route + batName, bat, 'utf8', (err) => {
      if (err) throw err;
    });
    console.log(bat)
  }

  //脚本预览
  onShowBat = () => {
    //配置文件信息
    const config = this.state.server
    const spring = config.spring
    let buffor = " \\ \n"
    databases.forEach((item, index) => {
      if (item.databasesName === config.databasesKey) {
        buffor = buffor + "-D" + item.a + " \\ \n";
        buffor = buffor + "-D" + item.b + config.schema + item.c + " \\ \n";
        buffor = buffor + "-D" + item.d + " \\ \n";
        buffor = buffor + "-D" + item.e + " \\ \n";
      }
    })
    if (config.port != undefined) {
      buffor = buffor + "-Dserver.port=" + config.port + " \\ \n"
    }
    spring.forEach((item, index) => {
      buffor = buffor + "-D" + item.key + "=" + item.value + " \\ \n"
    })
    const bat =
      "@echo off \n" +
      "setlocal enabledelayedexpansion \n" +
      "cd /d %~dp0 \n" +
      "title eureka \n" +
      "java -jar " + buffor + "%~dp0" + config.jarName + ' > ' + logName + " \n" +
      "pause"
    console.log("------------= " + batName + " =---------------- \n" + bat + "\n ------------= " + batName + " =----------------")
  }

  //删除bat脚本
  deletebat = () => {
    //删除文件(路径)
    fs.unlink(route + batName, function (err) {
      if (err) { console.log(err) } else { console.log("删除成功") }
    })
  }

  render() {
    //展示信息
    let server = this.state.server;
    return (
      <div>
        <Descriptions title={server.serverName + ' 服务信息'} bordered>
          <Descriptions.Item label="服务名" span={3}> {server.serverName} </Descriptions.Item>
          <Descriptions.Item label="IP地址"> {server.IP} </Descriptions.Item>
          <Descriptions.Item label="端口号"> {server.port} </Descriptions.Item>
          <Descriptions.Item label="版本号"> {server.version} </Descriptions.Item>
          <Descriptions.Item label="备注" span={3}>{server.note}</Descriptions.Item>
          <Descriptions.Item label="操作" span={3}>
            <Badge status="processing" text="" /><Button onClick={this.runbat}>运行服务</Button><br />
            <Badge status="processing" text="" /><Button onClick={this.runLog}>查看日志</Button><br />
            <Badge status="processing" text="" /><Button onClick={this.electron}>spring Eureka</Button><br />
            <Badge status="processing" text="测试用按钮 : " /><Button onClick={this.onShowBat}>脚本预览</Button><br />
            <Badge status="processing" text="测试用按钮 : " /><Button onClick={this.deletebat}>删除生成bat文件</Button><br />
            <Badge status="processing" text="测试用按钮 : " /><Button onClick={this.SQLServer}>打开bat文件夹</Button><br />
          </Descriptions.Item>
        </Descriptions>
      </div >
    );
  }
}
export default Form.create()(Message);;
