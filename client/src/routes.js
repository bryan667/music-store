import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './components/home/index'
import Layout from './hoc/layout'
import RegisterLogin from './components/register_login/index'
import Register from './components/register_login/register'
import UserDashboard from './components/user'


const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/user/dashboard' exact component={UserDashboard} />
                <Route path='/register' exact component={Register} />
                <Route path='/register_login' exact component={RegisterLogin} />
                <Route path='/' exact component={Home} />
            </Switch>
        </Layout>
    )
}

export default Routes;