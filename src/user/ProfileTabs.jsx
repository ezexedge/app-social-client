import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'



class ProfileTabs extends Component {
    
    render() { 

        const {following , followers,posts} = this.props

        return ( 
            <div>
                <div className="row">

                    <div className="col-md-4">

                        <h3 className="text-primary">Seguidores</h3>
                        <hr/>

                        {followers.map((person,i)=> ( 
                            <div key={i} >
                                    <div>

                                        <Link to={`/user/${person._id}`} >

                                        <img 
                                        className="float-left mr-2"
                                        height="30px"
                                           onError={i=>(i.target.src = `${DefaultProfile}`)}

                                            src={`http://64.225.20.237/api/user/photo/${person._id}`}
                                            
                                            alt="img"

                                        />

                                        <div>
                                            <p className="lead">{person.name}</p>
                                        </div>
                                        </Link>


                                    </div>
                                </div>
                        
                            )
                        )}

                    </div>



                    <div className="col-md-4">

                        <h3 className="text-primary">Siguiendo</h3>
                        <hr/>

                        {following.map((person,i)=> ( 
                            <div key={i} >
                                    <div>

                                        <Link to={`/user/${person._id}`} >

                                        <img 
                                        className="float-left mr-2"
                                        height="30px"
                                           onError={i=>(i.target.src = `${DefaultProfile}`)}

                                            src={`http://64.225.20.237/api/user/photo/${person._id}`}
                                            
                                            alt="img"

                                        />

                                        <div>
                                            <p className="lead">{person.name}</p>
                                        </div>
                                        </Link>


                                    </div>
                                </div>
                            )
                        )}

                    </div>

                    <div className="col-md-4" >

                        <h3 className="text-primary">Post</h3>
                        
                        <hr/>

                        {posts.map((post,i)=> ( 
                            <div key={i} >
                                    <div>

                                        <Link to={`/post/${post._id}`} >

                                       

                                        <div>
                                            <p className="lead">{post.title}</p>
                                        </div>
                                        </Link>


                                    </div>
                                </div>
                            )
                        )}


                    </div>

                </div>
            </div>

         );
    }
}
 
export default ProfileTabs;