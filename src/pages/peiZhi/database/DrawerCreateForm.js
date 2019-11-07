//抽屉组件
import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
import React from 'react'
import databases from '../../json/databases.json'
const { Option } = Select;
const fs = window.require('fs');
//路径
const route = 'C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/json/';
//配置名称
const jsonName = 'databases.json';
//添加的抽屉
class DrawerCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    //提交
    onSave = () => {
        //路径
        const path = route + jsonName;
        //取出 关闭抽屉的方法 和 form表单
        const { onDrawefClose, form } = this.props;
        //复制数据库数组
        let databasesCopy = [...databases];
        form.validateFields((err, row) => {
            if (row.dialect === "mysql") {
                row.a = "spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver";
                row.b = 'spring.datasource.url=jdbc:mysql://' + row.IP + ':' + row.prot + '/';
                row.c = '?characterEncoding=utf-8\\&useSSL=false\\&serverTimezone=GMT%2B8';
                row.d = 'spring.datasource.username=' + row.username;
                row.e = 'spring.datasource.password=' + row.password;
            }
            //添加数据
            databasesCopy = [...databasesCopy, row];
            //添加到文件 把数组变成json字符串
            fs.writeFile(path, JSON.stringify(databasesCopy, null, 4), 'utf8', (err) => {
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
                                    {getFieldDecorator('databasesName', {
                                        initialValue: '',
                                        rules: [{ required: true, message: '请输入名称' }],
                                    })(<Input placeholder="请输入名称" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="数据库">
                                    {getFieldDecorator('dialect', {
                                        initialValue: 'mysql',
                                        rules: [{ required: true, message: '数据库' }],
                                    })(<Select style={{ width: '32%' }} >
                                        <Option key="mysql"  >mysql</Option>
                                        <Option key="sqlserver" >sqlserver</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* //第二行 */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="用户名">
                                    {getFieldDecorator('username', {
                                        initialValue: '',
                                        rules: [{ required: true, message: '请输入用户名' }],
                                    })(<Input placeholder="请输入用户名" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="密码">
                                    {getFieldDecorator('password', {
                                        initialValue: '',
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
                                        initialValue: '',
                                        rules: [{ required: true, message: '请输入端口号' }],
                                    })(<Input placeholder='请输入端口号' />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="IP地址">
                                    {getFieldDecorator('IP', {
                                        initialValue: '',
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
                                        initialValue: '',
                                        rules: [{ required: true, message: '请输入备注', }],
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

}


export default Form.create()(DrawerCreateForm);