//数据库配置 组件本体
import { Descriptions, Table, Form, Button, Span } from 'antd';
import React, { Component } from 'react'
//连接 数据库配置文件
import databases from '../../json/databases.json'
//导入修改数据用抽屉
import DrawerUpdateForm from './DrawerUpdateForm';
//导入新增数据用抽屉
import DrawerCreateForm from './DrawerCreateForm';
//全局路径
const path = require('path');
//导入mysql连接
var mysql = window.require('mysql');
//导入文件操作
const fs = window.require('fs');
//定义右侧表格展示用数据
let dataShow = {};
//路径
const route = 'C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/peiZhi/json/';
//配置文件名称
const jsonName = 'databases.json'

//创建表格
class EditableContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //右侧展示数据
      dataShow,
      //修改的抽屉是否可视
      editCreateVisible: false,
      //新增的抽屉是否可视
      editUpdateVisible: false,
      //向抽屉组件内传值的存放对象
      timeVale: {},
      //定义测试连接后返回结果
      sour: '',
    };
    //表格格式
    this.columnsaa = [
      {
        title: '名称',
        dataIndex: 'databasesName',
        width: '15%',
        editable: true,
        render: (text, record) => {
          return <div><a onClick={this.onShow(text)}>{text}</a></div>
        }
      },
      {
        title: '修改',
        width: '10%',
        dataIndex: 'operation',
        render: (text, record) => {
          return <div><a onClick={this.upd(record)}>修改</a><span>  </span><a onClick={this.del(record)}>删除</a></div>
        }
      }
    ];
  }
  //初始化 init()
  componentDidMount() {
    //如果配置界面中有数据则默认展示第一条数据
    if (databases.length > 0) {
      this.setState({
        dataShow: databases[0]
      })
    }
  }

  //左侧数据库列表展示
  onShow = record => () => {
    const This = this;
    databases.map(function (time, index) {
      if (record === time.databasesName) {
        This.setState({
          dataShow: time,
          sour: ''
        })
      }
    })
  }

  //修改方法
  upd = record => () => {
    //打开修改抽屉
    this.setState({
      editUpdateVisible: true,
      timeVale: record
    })
  }

  //删除方法
  del = record => () => {
    //路径
    const path = route + jsonName;
    //复制配置文件
    const databasesCopy = [...databases];
    databasesCopy.forEach((item, index) => {
      if (record.databasesName === item.databasesName) {
        //（路径，json格式化(内容)，编码）
        fs.writeFile(path, JSON.stringify(databasesCopy.splice(index, 1), null, 4), 'utf8', (err) => {
          if (err) throw err;
        });
      }
    })
  }

  //开启新增的抽屉
  onCreateDrawefOpen = () => this.setState({ editCreateVisible: true });
  //关闭新增的抽屉
  onCreateDrawefClose = () => this.setState({ editCreateVisible: false });
  //开启修改的抽屉
  onUpdateDrawefOpen = () => this.setState({ editUpdateVisible: true });
  //关闭修改的抽屉
  onUpdateDrawefClose = () => this.setState({ editUpdateVisible: false });

  //连接测试
  testDatabase = () => {
    const This = this;
    const data = this.state.dataShow;
    console.log(" --- 测试连接开始 ---")
    var poll = mysql.createConnection({
      connectionLimit: 50,
      host: data.IP,
      port: data.prot,
      user: data.username,
      password: data.password
    })
    poll.connect();
    poll.query('SELECT 1+1 AS SOLUTION', function (err, rows, fields) {
      if (err) {
        This.setState({
          sour: "：连接失败 " + err
        })
      } else {
        This.setState({
          sour: "：连接成功"
        })
      }
    })
    poll.end();
    console.log(" --- 测试连接结束 ---")
  }

  render() {
    const { editCreateVisible, editUpdateVisible, sour } = this.state;
    return (
      <div>
        <Button onClick={this.onCreateDrawefOpen}>添加</Button>

        <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
          {/* 左侧列表 */}
          <div style={{ width: '29%' }}>
            <Table columns={this.columnsaa} rowKey={databases => databases.databasesName} dataSource={databases} />
          </div>

          {/* 中间空行分割用 */}
          <div style={{ width: '1%' }}></div>

          {/* 右侧详情 */}
          <div style={{ width: '70%' }}>
            <Descriptions title="数据库详情" bordered >
              <Descriptions.Item label="名称" span={3} >{this.state.dataShow.databasesName || ''}</Descriptions.Item>
              <Descriptions.Item label="数据库类型" span={3}>{this.state.dataShow.dialect || ''}</Descriptions.Item>
              <Descriptions.Item label="IP地址" span={3}>{this.state.dataShow.IP}</Descriptions.Item>
              <Descriptions.Item label="账号" span={3}>{this.state.dataShow.username || ''}</Descriptions.Item>
              <Descriptions.Item label="密码" span={3}>{this.state.dataShow.password || ''}</Descriptions.Item>
              <Descriptions.Item label="端口号" span={3}>{this.state.dataShow.prot || ''}</Descriptions.Item>
              <Descriptions.Item label="备注" span={3}>{this.state.dataShow.note || ''}</Descriptions.Item>
              <Descriptions.Item label={'数据库连接测试' + sour} span={3}>
                <Button onClick={this.testDatabase}>连接</Button>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
        {/* 新增抽屉 */}
        <DrawerCreateForm
          //是否显示
          visible={editCreateVisible}
          //关闭的方法
          onDrawefClose={this.onCreateDrawefClose}
          //显示的数据
          timeVale={this.state.dataShow}
        />
        {/* 修改抽屉 */}
        <DrawerUpdateForm
          //是否显示
          visible={editUpdateVisible}
          //关闭的方法
          onDrawefClose={this.onUpdateDrawefClose}
          //显示的数据
          timeVale={this.state.dataShow}
        />
      </div>
    );
  }
}

export default Form.create()(EditableContext);