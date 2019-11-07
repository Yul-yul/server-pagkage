import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Page from '~/pages/Page';
import 'antd/dist/antd.css';
const history = createBrowserHistory({ basename: '/' });

const App = () => (
  //路由
  <Router history={history}>
    <Page />
  </Router>
);

export default App;
