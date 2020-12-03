import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Products from './components/products';

import './custom.css'
import 'antd/dist/antd.css';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/products' component={Products} />
    </Layout>
);
