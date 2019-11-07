//表格 组件
import { Descriptions, Table, Form, Button } from 'antd';
import React, { Component } from 'react'
//连接 数据库配置文件
import rabbitmq from '../json/rabbitmq.json'
//导入修改数据用抽屉
import DrawerUpdateForm from './DrawerUpdateForm';
//导入新增数据用抽屉
import DrawerCreateForm from './DrawerCreateForm';
//全局路径
// const path = require('path');

const fs = window.require('fs');
let dataShow = {};

//创建表格
class EditableContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //展示数据
      //data,
      //右侧展示数据
      dataShow,
      //修改的抽屉是否可视
      editCreateVisible: false,
      //新增的抽屉是否可视
      editUpdateVisible: true,
      //向抽屉组件内传值的存放对象
      timeVale: {}
    };
    //表格格式
    this.columnsaa = [
      {
        title: '名称',
        dataIndex: 'rabbitmqName',
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
    if (rabbitmq.length > 0) {
      this.setState({
        dataShow: rabbitmq[0]
      })
    }
  }

  //左侧数据库列表展示
  onShow = record => () => {
    const This = this;
    rabbitmq.map(function (time, index) {
      if (record === time.rabbitmqName) { This.setState({ dataShow: time }) }
    })
  }
  //修改方法
  upd = record => () => {
    this.setState({
      editUpdateVisible: true,
      timeVale: record
    })
  }
  //删除方法
  del = record => () => {
    const path = 'C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/peiZhi/json/rabbitmq.json';
    const rabbitmqCopy = [...rabbitmq];
    rabbitmqCopy.forEach((item, index) => {
      if (record.rabbitmqName === item.rabbitmqName) {
        // let a = rabbitmqCopy.splice(index, 1)
        fs.writeFile(path, JSON.stringify(rabbitmqCopy.splice(index, 1), null, 4), 'utf8', (err) => {
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

  render() {
    const { editCreateVisible, editUpdateVisible } = this.state;
    return (
      <div>
        <Button onClick={this.onCreateDrawefOpen}>添加</Button>

        <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
          {/* 左侧列表 */}
          <div style={{ width: '29%' }}>
            <Table columns={this.columnsaa} dataSource={rabbitmq} />
          </div>

          {/* 中间空行分割用 */}
          <div style={{ width: '1%' }}></div>

          {/* 右侧详情 */}
          <div style={{ width: '70%' }}>
            <Descriptions title="数据库详情" bordered  style={{ width: '95%' }}>
              <Descriptions.Item label="名称rabbitmqName" span={3} >{this.state.dataShow.rabbitmqName || ''}</Descriptions.Item>
              <Descriptions.Item label="IP地址host" span={3}>{this.state.dataShow.host || ''}</Descriptions.Item>
              <Descriptions.Item label="端口号prot" span={3}>{this.state.dataShow.prot || ''}</Descriptions.Item>
              <Descriptions.Item label="用户username" span={3}>{this.state.dataShow.username || ''}</Descriptions.Item>
              <Descriptions.Item label="密码password" span={3}>{this.state.dataShow.password || ''}</Descriptions.Item>
              <Descriptions.Item label="备注note" span={3}>{this.state.dataShow.note || ''}</Descriptions.Item>
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