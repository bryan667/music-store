import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './components/home/index'
import Layout from './hoc/layout'
import RegisterLogin from './components/register_login/index'


const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/register_login' exact component={RegisterLogin}></Route>
                <Route path='/' exact component={Home}></Route>
            </Switch>
        </Layout>
    )
}

export default Routes;