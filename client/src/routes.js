import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './components/home/index'
import Layout from './hoc/layout'


const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Home}></Route>
            </Switch>
        </Layout>
    )
}

export default Routes;