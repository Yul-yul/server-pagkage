//抽屉组件
import { Drawer, Form, Button, Col, Row, Input } from 'antd';
import React from 'react'
import rabbitmq from '../json/rabbitmq.json'
// const { Option } = Select;
// const systempPath = require('path');
// var url = systempPath.resolve('./');
const fs = window.require('fs');
//添加的抽屉
class DrawerCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    //下拉改变事件
    // handleChange = (value) => { }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, onDrawefClose, timeVale } = this.props;
        return (
            <div>
                {/* 抽屉外框 */}
                <Drawer
                    title={"我是新增的抽屉 " + __dirname}
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
                                        initialValue: '' || undefined,
                                        rules: [{ required: true, message: '请输入名称' }],
                                    })(<Input placeholder="请输入名称" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="数据库">
                                    {getFieldDecorator('host', {
                                        initialValue: '' || undefined,
                                        rules: [{ required: true, message: '数据库' }],
                                    })(<Input placeholder="请输入名称" />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* //第二行 */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="用户名">
                                    {getFieldDecorator('prot', {
                                        initialValue: '' || undefined,
                                        rules: [{ required: true, message: '请输入用户名' }],
                                    })(<Input placeholder="请输入用户名" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="密码">
                                    {getFieldDecorator('username', {
                                        initialValue: '' || undefined,
                                        rules: [{ required: true, message: '请输入密码' }],
                                    })(<Input placeholder="请输入密码" />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* //第三行 */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="端口">
                                    {getFieldDecorator('password', {
                                        initialValue: '' || undefined,
                                        rules: [{ required: true, message: '请输入端口号' }],
                                    })(<Input placeholder='请输入端口号' />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* //第四行 */}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="备注">
                                    {getFieldDecorator('note', {
                                        initialValue: '' || undefined,
                                        rules: [
                                            {
                                                required: true,
                                                message: '修改备注信息',
                                            },
                                        ],
                                    })(<Input.TextArea rows={4} placeholder="请输入备注" />)}
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
                        <Button onClick={this.onSave.bind(this)} type="primary">提交 </Button>
                        <Button onClick={this.onClose.bind(this)} style={{ marginRight: 8 }}> 取消</Button>
                    </div>
                </Drawer>
            </div>
        );
    }
    //提交
    onSave = () => {
        const path = 'C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/peiZhi/json/rabbitmq.json';
        //取出 关闭抽屉的方法 和 form表单
        const { onDrawefClose, form } = this.props;
        //复制数据库数组
        let rabbitmqCopy = [...rabbitmq];
        form.validateFields((err, row) => {
            //添加数据
            rabbitmqCopy = [...rabbitmqCopy, row];
            //添加到文件 把数组变成json字符串
            fs.writeFile(path, JSON.stringify(rabbitmqCopy, null, 4), 'utf8', (err) => {
                if (err) throw err;
            });
        })
        onDrawefClose();
    }
    //取消 和 关闭
    onClose = () => {
        const { onDrawefClose } = this.props;
        onDrawefClose();
    }
}


export default Form.create()(DrawerCreateForm);