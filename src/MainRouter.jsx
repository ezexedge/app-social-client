import React from 'react';
import {Switch, Route, NavLink } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Profile from './user/Profile'
import Menu from './core/Menu'
import Users from './user/Users'
import EditProfile from './user/EditProfile'
import FindPeople from './user/FindPeople'
import NewPost from './post/NewPost'
import SinglePost from './post/SinglePost'
import EditPost from './post/EditPost'

import PrivateRoute from './auth/PrivateRoute'

const MainRouter = () => ( 
        <div>
        <Menu/>
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/post/create" component={NewPost}/>
                <PrivateRoute exact path="/post/edit/:postId" component={EditPost}/>

                <Route exact path="/post/:postId" component={SinglePost} />

                <Route exact path="/users" component={Users}/>

                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/signin" component={Signin}/>
                <PrivateRoute exact path="/user/:userId" component={Profile}/>
                <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
                <PrivateRoute exact path="/findpeople" component={FindPeople}/>

            </Switch>
        
        </div>
     );

 
export default MainRouter;