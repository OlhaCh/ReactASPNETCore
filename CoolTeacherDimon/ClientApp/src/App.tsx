import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Products from "./components/products";
import Login from "./components/auth/login";


import "./custom.css";

export default () => (
    <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/products" component={Products} />
    </Layout>
);
