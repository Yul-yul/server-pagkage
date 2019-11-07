import React, { Component, Fragment } from 'react'
import { Table, Form, Row, Col, Input, Button, Icon, Divider, Tag, Checkbox } from 'antd';
import aa from './a.json';
import index from './index.js';
import EditableFormTable  from './EditableContext'
import Example from './Example';
// const [EditableFormTable] = Form.create()(EditableTable);
const path = require('path');
const fs = window.require('fs');
class TodoList extends Component {
    constructor(props) {
        super(props);
        //组件的状态
        this.state = {
            obj: {
                id: '',
                name: '',
                age: '',
                sex: '',
                note: '',
            },
            sour: aa
        }
    }
    render() {
        return (
            <div>
                <p>我是rabbitmq的配置页面</p>
                {/* <EditableFormTable /> */}
                {/* <Example /> */}
                {/* //绑定改变事件.改变this的指向*/}
                {/* id:<input value={this.state.id} onChange={this.getid.bind(this)} /><br />
                name:<input value={this.state.name} onChange={this.getname.bind(this)} /><br />
                age:<input value={this.state.age} onChange={this.getage.bind(this)} /><br />
                sex:<input value={this.state.sex} onChange={this.getsex.bind(this)} /><br />
                note:<input value={this.state.note} onChange={this.getnote.bind(this)} /><br />
                <button onClick={this.handleBtnClick.bind(this)}>提交</button> */}


                {/* <Table dataSource={columns } console={data } /> */}
                {/* <Table dataSource={this.state.sour} console={colums} >
                    <Table.Column key="index" title="index" render={(__, $, index) => index + 1} />
                    <Table.Column key="id" title="id" dataIndex="id" />
                    <Table.Column key="name" title="name" dataIndex="name" />
                    <Table.Column key="age" title="age" dataIndex="age" />
                    <Table.Column key="sex" title="sex" dataIndex="sex" />
                    <Table.Column key="note" title="note" dataIndex="note" />
                    <Table.Column key="note1" title="note1" render={
                        (sour) => {
                            return <Button onClick={this.del.bind(this, sour)}>del</Button>
                        }
                    } />
                </Table> */}

            </div>
        )
    }

    del(sour) {
        const list = this.state.sour;
        const a = 1;
        console.log()


        list.forEach((item, index, y) => {
            // if(y.name = sour.name && a == 1){
            //     console.log(y.name + "vs" + sour.name)
            //     y.splice(y.length-1,1);
            //     a = 2

            // }
        })
        this.setState({
            sour: list
        })

    }
    handleBtnClick() {
        const data = [...this.state.sour,
        {
            "id": this.state.id,
            "name": this.state.name,
            "age": this.state.age,
            "sex": this.state.sex,
            "note": this.state.note
        }]
        this.setState({
            //取出以前里面的数据
            sour: data,
        })

        this.init();



        fs.readFile(path.join(__dirname, 'Users/gtyllc/Desktop/123123/electron-react/src/pages/Child/a.json'), 'utf-8', function (err, sour) {
            if (err) throw err;

            console.log(data)
            //   let list = JSON.parse(data);
            let newContent = JSON.stringify(data, null, 4);
            fs.writeFile('C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/Child/a.json', newContent, 'utf8', (err) => {
                if (err) throw err;
            });
        })
    }
    init() {
        this.setState({
            id: '',
            name: '',
            age: '',
            sex: '',
            note: ''
        })
    }
    getid(e) {
        this.setState({
            id: e.target.value
        })
    }
    getname(e) {
        this.setState({
            name: e.target.value
        })
    }
    getage(e) {
        this.setState({
            age: e.target.value
        })
    }
    getsex(e) {
        this.setState({
            sex: e.target.value
        })
    }
    getnote(e) {
        this.setState({
            note: e.target.value
        })
    }
}
const colums = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'name',
        dataIndex: 'name',
        key: 'name'

    }, {
        title: 'age',
        dataIndex: 'age',
        key: 'age'
    }, {
        title: 'sex',
        dataIndex: 'sex',
        key: 'sex'
    }, {
        title: 'note',
        dataIndex: 'note',
        key: 'note'
    },
]

export default TodoList;