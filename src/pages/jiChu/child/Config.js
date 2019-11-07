import React from 'react'
import { Form, Button, Input, Icon, Tooltip, Table } from 'antd';
//获取服务列表
import serverList from '../../Child/eureka.json'
//设置路径
const route = 'C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/Child/';
//服务列表名称
const jsonName = 'eureka.json';
//文件操作方法
const fs = window.require('fs');
//配置页面
class Config extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //列表对象
            server: {},
            key: "",
            value: ""
        };
        this.columns = [
            {
                title: 'key',
                dataIndex: 'key',
                key: 'key',
                width: '15%'
            },
            {
                title: 'value',
                dataIndex: 'value',
                key: 'value',
            },
            {
                title: '操作',
                dataIndex: 'index',
                key: 'index',
                render: (text, record) => {
                    return <div><Button onClick={this.onDelete(record)}>删除</Button></div>
                }
            },
        ];
    }
    //初始化
    componentDidMount() {
        //从列表对象中获取当前对象
        serverList.forEach((item, index) => {
            if (this.props.serverName === item.serverName) {
                this.setState({
                    server: item
                })
            }
        })
    }

    //添加key-vlaue的按钮
    onShow = () => {
        //配置路径
        const paht = route + jsonName
        //设置新的属性
        const c = { "key": this.state.key, "value": this.state.value }
        //获取配置对象
        const serverObj = this.state.server;
        //添加新的属性
        if(!serverObj.spring){
            serverObj.spring = [];
        }
        console.log(serverObj.spring)
        serverObj.spring = [...serverObj.spring,c];
        let serverListCopy = [...serverList]
        console.log(serverListCopy)
        // //文本写入（路径，json格式化（内容），编码）
        fs.writeFile(paht, JSON.stringify(serverListCopy, null, 4), 'utf8', (err) => {
            if (err) console.log(err)
        })
    }

    //删除方法
    onDelete = record => () => {
        //配置路径
        const paht = route + jsonName
        //复制自定义产生信息
        let springCopy = [...this.state.server.spring]
        //复制对象列表
        let serverListCopy = [...serverList]

        springCopy.forEach((item, index) => {
            if (record.key === item.key) {
                //删除元素
                springCopy.splice(index, 1)
                //获取列表中的对象
                const serverObj = this.state.server;
                //添加新的自定义对象
                serverObj.spring = springCopy;
                //在对象列表中替换新的信息
                serverListCopy.forEach((item, index) => {
                    if (serverObj.serverName === item.serverName) {
                        serverListCopy.splice(index, 1, serverObj)
                    }
                })
                //写入文件
                fs.writeFile(paht, JSON.stringify(serverListCopy, null, 4), 'utf8', (err) => {
                    if (err) console.log(err)
                })
            }
        })
    }

    //提交按钮
    onSave = () => {
        //得获取旧的自定义配置
        let spring = [];
        if(this.state.server.spring){
            spring = this.state.server.spring;
        }
        const { form } = this.props;
        //获取全部服务信息
        let serverListCopy = [...serverList]
        //配置路径
        const path = route + jsonName;
        form.validateFields((err, row) => {
            row.spring = spring;
            if (err) console.log(err);
            //更新服务列表
            serverListCopy.forEach((item, index) => {
                if (item.serverName === row.serverName) {
                    serverListCopy.splice(index, 1, row);
                }
            })
        })
        //写入配置的方法（路径，json格式化（内容），编码）
        fs.writeFile(path, JSON.stringify(serverListCopy, null, 4), 'utf8', (err) => {
            if (err) throw err;
        })
    }

    //修改key
    onKey(e) {
        this.setState({
            key: e.target.value
        })
    }
    //修改value
    onValue(e) {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const { server } = this.state;
        return (
            <div>
                <Form {...formItemLayout} onSubmit={server}>
                    <Form.Item label="服务名" hasFeedback>
                        {getFieldDecorator('serverName', {
                            initialValue: server.serverName || undefined,
                            rules: [{ required: true, message: '提示文字A' }],
                        })(<Input placeholder={server.serverName} />)}
                    </Form.Item>
                    <Form.Item label="端口号" hasFeedback>
                        {getFieldDecorator('port', {
                            initialValue: server.port || undefined,
                            rules: [{ required: false, message: '提示文字A' }],
                        })(<Input placeholder={server.port} />)}
                    </Form.Item>
                    <Form.Item label="版本号" hasFeedback>
                        {getFieldDecorator('version', {
                            initialValue: server.version || undefined,
                            rules: [{ required: false, message: '提示文字A' }],
                        })(<Input placeholder={server.version} />)}
                    </Form.Item>
                    <Form.Item
                        label={<span>数据库&nbsp;<Tooltip title="数据库"><Icon type="question-circle-o" /></Tooltip></span>}>
                        {getFieldDecorator('databasesKey', {
                            initialValue: server.databasesKey || undefined,
                            rules: [{ required: false, message: '提示文字A' }],
                        })(<Input placeholder={server.databasesKey} />)}
                    </Form.Item>
                    <Form.Item label="jar包名">
                        {getFieldDecorator('jarName', {
                            initialValue: server.jarName || undefined,
                            rules: [{ required: false, message: '提示文字A' }],
                        })(<Input placeholder={server.jarName} />)}
                    </Form.Item>
                    <Form.Item label="数据库库名">
                        {getFieldDecorator('schema', {
                            initialValue: server.schema || undefined,
                            rules: [{ required: false, message: '提示文字A' }],
                        })(<Input placeholder={server.schema} />)}
                    </Form.Item>
                    <Form.Item label="IP">
                        {getFieldDecorator('IP', {
                            initialValue: server.IP || undefined,
                            rules: [{ required: false, message: '提示文字A' }],
                        })(<Input placeholder={server.IP} />)}
                    </Form.Item>
                    <Form.Item label="note">
                        {getFieldDecorator('note', {
                            initialValue: server.note || undefined,
                            rules: [{ required: false, message: '提示文字A' }],
                        })(<Input placeholder={server.note} />)}
                    </Form.Item>
                    <Button onClick={this.onSave.bind(this)} type="primary">提交</Button>
                    <br />

                    key :<input value={this.state.key} onChange={this.onKey.bind(this)} /> value: <input value={this.state.value} onChange={this.onValue.bind(this)} /><Button onClick={this.onShow}>增加</Button>
                    <Table dataSource={server.spring} columns={this.columns} />






                </Form>
                <Button onClick={this.onSave.bind(this)} type="primary">提交</Button>
                {/* 底部按钮
                <div style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                }}>
                    <Button onClick={this.onClose.bind(this)} style={{ marginRight: 8 }}>取消</Button>
                </div> */}
            </div >
        )
    }
}
export default Form.create()(Config);
