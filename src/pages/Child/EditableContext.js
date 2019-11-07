//表格 组件
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd';
import React, { Component, Fragment } from 'react'
import aa from './a.json';
//导入抽屉
import DrawerForma from './DrawerForm';
const path = require('path');
const fs = window.require('fs');
const data = aa;
const aPath = "C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/Child/a.json";

//创建表格
class NewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //展示数据
      data,
      //抽屉是否可视
      editVisible: false,
      //向抽屉组件内传值的存放对象
      timeVale: {}
    };
    //表格格式
    this.columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width: '10%',
        editable: true,
      },
      {
        title: 'name',
        dataIndex: 'name',
        width: '15%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '10%',
        editable: true,
      },
      {
        title: 'sex',
        dataIndex: 'sex',
        width: '10%',
        editable: true,
      },
      {
        title: 'note',
        dataIndex: 'note',
        width: '30%',
        editable: true,
      },
      {
        title: '修改',
        dataIndex: 'operation',
        render: (text, record) => {
          return <div><a onClick={this.upd(record)}>修改</a><span>  </span><a onClick={this.del(record)}>删除</a></div>
        },
      },
    ];
  }
  //修改方法
  upd = record => () => {
    this.setState({
      editVisible: true,
      timeVale: record
    })
  }
  //删除方法
  del = record => () => {
    //复制数据源
    const dateaa = [...data];
    data.forEach((item, index) => {
      if (item.name === record.name) {
        //删除数据中 从下标为index开始，删除1个元素
        dateaa.splice(index, 1)
        //写入文件   （文件路径  JSON化（数据） 编码）
        fs.writeFile(aPath, JSON.stringify(dateaa, null, 4), 'utf8', (err) => {
          if (err) throw err;
        });
      }
    })
  }
  //开启抽屉
  onDrawefOpen = () => this.setState({ editVisible : true});
  //关闭抽屉
  onDrawefClose = () => this.setState({ editVisible: false});


  // onHandleClose = () => this.setState({ editVisible: false });

  render() {
    const { editVisible, timeVale } = this.state;
    return (
      <div>
        {/* 表格 */}
        <Table
          bordered
          // key
          rowKey={record => record.name}
          // 数据源
          dataSource={this.state.data}
          // 表格格式
          columns={this.columns}
          // 表格类名
          rowClassName="editable-row"
          pagination={{onChange: this.cancel,}}
        />
        <Button onClick={this.onDrawefOpen}> 添加</Button>
        {/* 抽屉 */}
        <DrawerForma
          //是否显示
          visible={editVisible}
          //关闭的方法
          onDrawefClose={this.onDrawefClose}
          //显示的数据
          timeVale={timeVale}
        />
      </div>
    );
  }
}

export default Form.create()(NewTable);