//抽屉组件
import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
// import React, { Component, Fragment } from 'react'
import React from 'react'
import databases from '../json/databases.json'
const { Option } = Select;
// const path = require('path');
const fs = window.require('fs');
const route = 'C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/json/'
const jsonName = 'databases.json'

class DrawerUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, onDrawefClose, timeVale } = this.props;
        return (
            <div>
                {/* 抽屉外框 */}
                <Drawer
                    title="我是修改的抽屉"
                    width={720}
                    onClose={onDrawefClose}
                    visible={visible}
                    timeVale={timeVale}
                    destroyOnClose
                >
                    {/* //抽屉内form表单 */}
                    <Form layout="vertical" hideRequiredMark>
                        {/* //第一行 */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="名称">
                                    {getFieldDecorator('databasesName', {
                                        initialValue: timeVale.databasesName ,
                                        rules: [{ required: true, message: '请输入名称' }],
                                    })(<Input placeholder={timeVale.name} />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="数据库">
                                    {getFieldDecorator('dialect', {
                                        initialValue: 'mysql' ,
                                        rules: [{ required: true, message: '数据库' }],
                                    })(<Select
                                        showArrow
                                        // onChange={this.handleChange}
                                        defaultActiveFirstOption
                                        style={{ width: '32%' }}
                                    >
                                        <Option key="mysql" value="mysql">mysql</Option>
                                        <Option key="sqlserver" value="sqlserver">sqlserver</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* //第二行 */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="用户名">
                                    {getFieldDecorator('username', {
                                        initialValue: timeVale.username ,
                                        rules: [{ required: true, message: '请输入用户名' }],
                                    })(<Input placeholder={timeVale.name} />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="密码">
                                    {getFieldDecorator('password', {
                                        initialValue: timeVale.password ,
                                        rules: [{ required: true, message: '请输入密码' }],
                                    })(<Input placeholder="请输入密码" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* //第三行 */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="端口">
                                    {getFieldDecorator('prot', {
                                        initialValue: timeVale.prot ,
                                        rules: [{ required: true, message: '请输入端口号' }],
                                    })(<Input placeholder={timeVale.name} />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="IP地址">
                                    {getFieldDecorator('IP', {
                                        initialValue: timeVale.IP ,
                                        rules: [{ required: true, message: '请输入端口号' }],
                                    })(<Input placeholder={timeVale.IP} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* //第四行 */}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="备注">
                                    {getFieldDecorator('note', {
                                        initialValue: timeVale.note ,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'please enter url description',
                                            },
                                        ],
                                    })(<Input.TextArea rows={4} placeholder="please enter url description" />)}
                                </Form.Item>
                            </Col>

                        </Row>
                    </Form>
                    {/* //底部按钮 */}
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
                        <Button onClick={this.onSave.bind(this)} type="primary">提交</Button>

                        <Button onClick={this.onClose.bind(this)} style={{ marginRight: 8 }}>取消</Button>
                    </div>
                </Drawer>
            </div>
        );

    }

    //提交
    onSave = () => {
        //路径
        const path = route + jsonName;
        //拷贝数据库列表
        let databasesListCopy = [...databases];
        const { form } = this.props;
        form.validateFields((err, row) => {
            databasesListCopy.forEach((item, index) => {
                if (item.databasesName === row.databasesName) {
                    if(row.dialect === "mysql"){
                        row.a="spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver";
                        row.b='spring.datasource.url=jdbc:mysql://'+row.IP+':'+row.prot+'/';
                        row.c='?characterEncoding=utf-8\\&useSSL=false\\&serverTimezone=GMT%2B8';
                        row.d='spring.datasource.username='+row.username;
                        row.e='spring.datasource.password='+row.password;
                    }
                    databasesListCopy.splice(index, 1, row)
                    fs.writeFile(path, JSON.stringify(databasesListCopy, null, 4), 'utf8', (err) => {
                        if (err) throw err;
                    });
                }
            })
        })

        // form.validateFields((err, row) => {
        //     console.log(row + dataSource)
        //     const dateaa = [...dataSource];
        //     console.log(dateaa)
        //     let next = true;
        //     console.log(next)
        //     dateaa.forEach((item, index) => {
        //         console.log("aaa")
        //         console.log(item.name + "vs" + row.name)
        //         if (item.name === row.name) {
        //             console.log("BBB")
        //             next = false;
        //         }
        //     })
        //     console.log('1')
        //     console.log(next)

        //     if (next) {
        //         console.log("----")
        //         dateaa.push(row)
        //         let newContent = JSON.stringify(dateaa, null, 4);
        //         console.log(newContent)
        //         fs.writeFile('C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/Child/a.json', newContent, 'utf8', (err) => {
        //             if (err) throw err;
        //         });
        //     } else {
        //         console.log("修改")
        //         dataSource.forEach((item, index) => {
        //             if (item.name === row.name) {
        //                 dateaa.splice(index, 1, row)
        //                 let newContent = JSON.stringify(dateaa, null, 4);
        //                 fs.writeFile('C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/Child/a.json', newContent, 'utf8', (err) => {
        //                     if (err) throw err;
        //                 });
        //             }
        //         })
        //     }


        // })
        // this.writeFile();
        // onDrawefClose();
    }
    //取消 和 关闭
    onClose = () => {
        const { onDrawefClose, timeVale } = this.props;
        onDrawefClose();
    }
    //保存到指定文件
    writeFile() {
        const data = this.state.data;
        console.log(data.name + "writeFile")
        let newContent = JSON.stringify(data, null, 4);
        fs.writeFile('C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/Child/a.json', newContent, 'utf8', (err) => {
            if (err) throw err;
        });
    }

}


export default Form.create()(DrawerUpdateForm);
// ReactDOM.render(<App />, mountNode);