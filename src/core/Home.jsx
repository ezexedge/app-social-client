import React from 'react';
import Post from '../post/Post'

const Home = () => ( 
    <div>
        <div className="jumbotron">
            <p className="lead">bienvenido a la appsocial</p>

        </div>

        <div className="container fluid">
            <Post/>
        </div>
    </div>

);

 
export default Home