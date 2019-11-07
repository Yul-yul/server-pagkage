import React, { useEffect } from 'react';
import { Table, Divider, Tag, Button, Input } from 'antd';
// const Column = Table.Column;
import json from './a.json';
import TodoList from './TodoList'
// import { connect } from 'http2';
// const mongoose = require('mongoose');
const path = require('path');
const newList = [];
const fs = window.require('fs');
// var child_process = require("execa") 
const child_process = window.require('child_process');
const { spawn } = require('child_process');
//fs execa  child_process react-native-fs
var cmd = window.require("node-cmd");
// import mysql from 'mysql'
var mysql = window.require('mysql');





const index = () => {

  var aa = json;
  var a = () => {
    console.log("aaa")
  }
  var b = () => {
    console.log("aaa")
    console.log(child_process)
    child_process.execFile("run.bat", null, { cwd: 'C:/Users/gtyllc/Desktop/service-pagkage/' }, function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log("exec error" + error)
      } else {
        console.log("成功")
      }
    })
    console.log("bbb")
  }
  var c = () => {
    cmd.run("notepad")
  }
  var d = () => {
    cmd.get("ping 192.168.10.6", function (err, data) {
      console.log(data);
    });
  }
  var e = () => {
    var a = 1;
    cmd.get("C: /Users/gtyllc/Desktop/service-pagkage/run.bat", function (err, data) {
      console.log(data);
    });
  }

  var f = () => {
    var data = newList;
    fs.readFile(path.join(__dirname, 'Users/gtyllc/Desktop/123123/electron-react/src/pages/Child/b.json'), 'utf-8', function (err, data) {
      if (err) throw err;
      console.log(newList);
      let list = JSON.parse(data);

      for (let i = 0; i < list.length; i++) {
        console.log(list[i])
        let result = {};
        let value = list[i];
        console.log(value)
        result.id = value.id;
        result.name = value.name;
        result.age = value.age;
        result.sex = value.sex;
        result.note = value.note;
        newList.push(result);
        console.log(newList);
      }
      console.log(83)
      let newContent = JSON.stringify(newList, null, 4);
      console.log(newContent)
      fs.writeFile('C:/Users/gtyllc/Desktop/123123/electron-react/src/pages/Child/a.json', newContent, 'utf8', (err) => {
        if (err) throw err;
        console.log('success done');
      });



    })
  }
  var test = "连接中"
  var g = () => {
    console.log(mysql)
    var poll = mysql.createConnection({
      connectionLimit: 50,
      host: "192.168.10.6",
      port: "3306",
      user: "root",
      password: "123456"
      // database: "spare_part"
    })
    console.log(poll)
    poll.connect();
    var rows = "";
    poll.query('SELECT 1+1 AS SOLUTION', function (err, rows, fields) {

      if (err) {
        console.log("连接失败" + rows)
      } else {
        console.log("连接成功" + rows)
      }
    })

    console.log('The solution is:' + rows)

    poll.end();
  }

  var h = () => {
    cmd.get("explorer.exe E:\\maven\\maven-respo", function (err, data) {
      console.log(data);
    });
  }

  const sour = [
    {
      "id": 1,
      "name": "dog1",
      "age": 10,
      "sex": "男",
      "note": "备注备注备注备注备注备注"
    },
    {
      "id": 2,
      "name": "dog2",
      "age": 10,
      "sex": "男",
      "note": "备注备注备注备注备注备注"
    },
    {
      "id": 3,
      "name": "dog3",
      "age": 10,
      "sex": "男",
      "note": "备注备注备注备注备注备注"
    },
    {
      "id": 4,
      "name": "dog4",
      "age": 10,
      "sex": "男",
      "note": "备注备注备注备注备注备注"
    }
  ]
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



  return (
    <div>
      <TodoList />
      <hr />   
        <ul>
        {aa.map((item, id) => {
          return <li name={item.id}>Dog [id:{item.id} , name:{item.name} , sex:{item.sex} , note:{item.note}]</li>
        })}
      </ul>
      {test}
      <button onClick={a}>aaa</button>
      <button onClick={b}>运行run</button>
      <button onClick={c}>记事本</button>
      <button onClick={d}>ping</button>
      <button onClick={e}>bat</button>
      <button onClick={f}>修改b.json</button>
      <button onClick={g}>mysql连接测试</button>
      <button onClick={h}>打开E盘指定目錄</button>
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <div>
        <input /><button>提交</button>
      </div>
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />

    </div>
  );
};


export default index;
