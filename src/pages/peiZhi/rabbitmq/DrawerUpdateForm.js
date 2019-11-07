//抽屉组件
import { Drawer, Form, Button, Col, Row, Input } from 'antd';
import React from 'react'
import rabbitmq from '../json/rabbitmq.json'
// const { Option } = Select;
// const path = require('path');
const fs = window.require('fs');


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
                                    {getFieldDecorator('rabbitmqName', {
                                        initialValue: timeVale.rabbitmqName || '暂无数据',
                                        rules: [{ required: true, message: '请输入名称' }],
                                    })(<Input placeholder={timeVale.rabbitmqName} />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="数据库">
                                    {getFieldDecorator('host', {
                                        initialValue: timeVale.host || undefined,
                                        rules: [{ required: true, message: '数据库' }],
                                    })(<Input placeholder={timeVale.host} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* //第二行 */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="用户名">
                                    {getFieldDecorator('username', {
                                        initialValue: timeVale.username || '暂无数据',
                                        rules: [{ required: true, message: '暂无数据' }],
                                    })(<Input placeholder={timeVale.username} />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="密码">
                                    {getFieldDecorator('password', {
                                        initialValue: timeVale.password || '暂无数据',
                                        rules: [{ required: true, message: '暂无数据' }],
                                    })(<Input placeholder="请输入密码" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* //第三行 */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="端口">
                                    {getFieldDecorator('prot', {
                                        initialValue: timeVale.prot || '暂无数据',
                                        rules: [{ required: true, message: '暂无数据' }],
                                    })(<Input placeholder={timeVale.prot} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* //第四行 */}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="备注">
                                    {getFieldDecorator('note', {
                                        initialValue: timeVale.note || '暂无数据',
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
        const path = 'C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/peiZhi/json/rabbitmq.json';
        let rabbitmqCopy = [...rabbitmq];
        const { onDrawefClose, form, dataSource } = this.props;
        form.validateFields((err, row) => {
            rabbitmqCopy.forEach((item, index) => {
                if (item.rabbitmqName === row.rabbitmqName) {
                    rabbitmqCopy.splice(index, 1, row)
                    fs.writeFile(path, JSON.stringify(rabbitmqCopy, null, 4), 'utf8', (err) => {
                        if (err) throw err;
                    });
                }
            })
          
        })
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