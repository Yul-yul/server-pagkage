//抽屉组件
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';
import React, { Component, Fragment } from 'react'
const { Option } = Select;
const path = require('path');
const fs = window.require('fs');


class DrawerForm extends React.Component {
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
                    title="我是抽屉   "
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
                                <Form.Item label="id">
                                    {getFieldDecorator('id', {
                                        initialValue: timeVale.id || undefined,
                                        rules: [{ required: true, message: '提示文字A' }],
                                    })(<Input placeholder={timeVale.name} />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="name">
                                    {getFieldDecorator('name', {
                                        initialValue: timeVale.name || undefined,
                                        rules: [{ required: true, message: '提示文字A' }],
                                    })(<Input placeholder="提示文字B" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* //第二行 */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="sex">
                                    {getFieldDecorator('sex', {
                                        initialValue: timeVale.sex || undefined,
                                        rules: [{ required: true, message: '提示文字A' }],
                                    })(<Input placeholder={timeVale.name} />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="age">
                                    {getFieldDecorator('age', {
                                        initialValue: timeVale.age || undefined,
                                        rules: [{ required: true, message: '提示文字A' }],
                                    })(<Input placeholder="提示文字B" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* //第三行 */}
                        <Row gutter={16}>

                            <Col span={24}>
                                <Form.Item label="note">
                                    {getFieldDecorator('note', {
                                        initialValue: timeVale.note || undefined,
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
        const { onDrawefClose, form, dataSource } = this.props;
        form.validateFields((err, row) => {
            const dateaa = [...dataSource];
            let next = true;
            dateaa.forEach((item, index) => {
                if (item.name === row.name) {
                    next = false;
                }
            })
            if (next) {
                dateaa.push(row)
                let newContent = JSON.stringify(dateaa, null, 4);
                fs.writeFile('C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/Child/a.json', newContent, 'utf8', (err) => {
                    if (err) throw err;
                });
            } else {
                dataSource.forEach((item, index) => {
                    if (item.name === row.name) {
                        dateaa.splice(index, 1, row)
                        let newContent = JSON.stringify(dateaa, null, 4);
                        fs.writeFile('C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/Child/a.json', newContent, 'utf8', (err) => {
                            if (err) throw err;
                        });
                    }
                })
            }


        })
        //关闭
        onDrawefClose();
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


export default Form.create()(DrawerForm);
// ReactDOM.render(<App />, mountNode);