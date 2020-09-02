import React from 'react';
import {Switch, Route, NavLink } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Profile from './user/Profile'
import Menu from './core/Menu'
import Users from './user/Users'
const MainRouter = () => ( 
        <div>
        <Menu/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users}/>

                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/signin" component={Signin}/>
                <Route exact path="/user/:userId" component={Profile}/>

            </Switch>
        
        </div>
     );

 
export default MainRouter;