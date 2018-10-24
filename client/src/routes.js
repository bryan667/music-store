import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './components/home/index'
import Layout from './hoc/layout'
import RegisterLogin from './components/register_login/index'
import Register from './components/register_login/register'


const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/register' exact component={Register}></Route>
                <Route path='/register_login' exact component={RegisterLogin}></Route>
                <Route path='/' exact component={Home}></Route>
            </Switch>
        </Layout>
    )
}

export default Routes;