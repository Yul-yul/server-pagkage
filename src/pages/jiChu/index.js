// 配置页面本体
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import queryString from 'query-string'
import Config from './child/Config'
import Message from './child/Message'

const peiZhi = props => {
    //服务名
    const serverName = queryString.parse(props.location.search).value;
    // 第一个菜单
    const [a, setA] = useState(true);
    // 第一个菜单
    const [b, setB] = useState(false);
    //开启数据库 配置
    const aa = () => {
        all()
        setA(true)
    }
    //开启rabbitmq 配置
    const bb = () => {
        all()
        setB(true)
    }
    //关闭全部视图
    const all = () => {
        setA(false);
        setB(false);
    }
    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
            {/* //左侧菜单 */}
            <div style={{ width: '20%', }} >
                <Menu>
                    <Menu.Item selectable="false">
                        <h3>{serverName}</h3>
                    </Menu.Item>
                    {/* 一级菜单 */}
                    <Menu.Item key="peiZhi11" onClick={aa}>
                        <a ><Icon type="control" />服务信息</a>
                    </Menu.Item>
                    {/* 一级菜单 */}
                    <Menu.Item key="peiZhi12" onClick={bb}>
                        <a><Icon type="control" />配置页面</a>
                    </Menu.Item>
                </Menu>
            </div>

            {/* //右侧页面 */}
            <div style={{ width: '80%' }}>
                {/* 服务信息 */}
                {a && <Message
                    serverName={serverName} />}
                {/* 配置页面 */}
                {b && <Config
                    serverName={serverName} />}
            </div>
        </div>
    );
};

export default withRouter(peiZhi);