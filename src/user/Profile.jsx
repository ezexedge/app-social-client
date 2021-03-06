import React, { Component } from 'react';
import {isAuthenticate} from '../auth'
import {Redirect , Link} from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'
import {listByUser} from '../post/apiPost'

import { read } from './apiUser'

class Profile extends Component {

    constructor() {
        super();
        this.state = {
          user: { following: [], followers: [] },
          redirectToSignin: false,
          following: false,
          error: "",
          posts: []
        };
      }
    
    // check follow
  checkFollow = user => {
    console.log(user)
    const jwt = isAuthenticate();
    const match = user.followers.find(follower => {
      // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };
    
      clickFollowButton = callApi => {
        const userId = isAuthenticate().user._id;
        const token = isAuthenticate().token;
    
        callApi(userId, token, this.state.user._id).then(data => {
          if (data.error) {
            this.setState({ error: data.error });
          } else {
            this.setState({ user: data, following: !this.state.following });
          }
        });
      };
    
      init = userId => {
        const token = isAuthenticate().token;
        read(userId, token).then(data => {
          if (data.error) {
            this.setState({ redirectToSignin: true });
          } else {
            let following = this.checkFollow(data);
            this.setState({ user: data, following });
            this.loadPosts(data._id)
          }
        });
      };

      loadPosts = userId => {
        const token = isAuthenticate().token;
        listByUser(userId,token).then(data => {
          if(data.error){
            console.log(data.error)
          }else{
            this.setState({posts: data})
          }
        })

      }


    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)

    }

    componentWillReceiveProps(props){
        const userId = props.match.params.userId
        this.init(userId)
    }

    render() { 

        const {redirectToSignin,user,posts} = this.state

        if(redirectToSignin)return <Redirect to="/signin" />


        const photoUrl = user._id ? `http://64.225.20.237/api/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile


        return ( 
            <div className="container">
                                    <h2 className="mt-5 mb-5">Perfil</h2>

                <div className="row">
                    <div className="col-md-6">

                    <img style={{height: "200px",width:'auto'}}
                className="img-thumbnail"
                src={photoUrl} 
                onError={i=>(i.target.src = `${DefaultProfile}`)}

                alt="photo" />

            

                      
                    </div>
                    <div className="col-md-6">

                    <div className="lead mt-2 ml-5">
             <p>hola : {user.name}</p>
                        <p>email: {user.email}</p>
                        <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                           

             </div>
                        {isAuthenticate().user && isAuthenticate().user._id === user._id ? (
                          
                            <div className="d-inline-block mt-5">
                                <Link className="btn btn-raised btn-info mr-5"
                                to={`/post/create`} >
                                    Crear post
                                </Link>
                                <Link className="btn btn-raised btn-success mr-5"
                                to={`/user/edit/${user._id}`} >
                                    Editar perfil
                                </Link>
                              <DeleteUser userId={user._id} />
                            </div>

                        ) : (
                       //     <p>{this.state.following ? 'following' : 'notfollowing'}</p>
                        <FollowProfileButton following={this.state.following}  onButtonClick={this.clickFollowButton}/>
                        ) }

             
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-5 mt-5">
                        <hr/>
                        <p className="lead">{user.about}</p>
                         <hr/>

                         <ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            />
                    </div>
                </div>

            </div>
         );
    }
}
 
export default Profile;