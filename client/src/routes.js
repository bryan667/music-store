import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './components/home/index'


const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}></Route>
        </Switch>
    )
}

export default Routes;