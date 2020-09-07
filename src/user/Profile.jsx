import React, { Component } from 'react';
import {isAuthenticate} from '../auth'
import {Redirect , Link} from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'
import DeleteUser from './DeleteUser'

import { read } from './apiUser'

class Profile extends Component {

    constructor(){
        super()
        this.state = {
            user : "",
            redirectToSignin: false
        }
    }


     init = userId => {
        const token = isAuthenticate().token
        read(userId,token)
        .then(data => {
            if(data.error){
                this.setState({redirectToSignin: true})
            }else{
                this.setState({user: data})
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

        const {redirectToSignin,user} = this.state

        if(redirectToSignin)return <Redirect to="/signin" />


        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile


        return ( 
            <div className="container">
                                    <h2 className="mt-5 mb-5">Profile</h2>

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
             <p>hole {isAuthenticate().user.name}</p>
                        <p>hole {isAuthenticate().user.email}</p>
                        <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                           

             </div>
                        {isAuthenticate().user && isAuthenticate().user._id === user._id && (
                            <div className="d-inline-block mt-5">
                                <Link className="btn btn-raised btn-success mr-5"
                                to={`/user/edit/${user._id}`} >
                                    Edit profile
                                </Link>
                              <DeleteUser userId={user._id} />
                            </div>

                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-5 mt-5">
                        <hr/>
                        <p className="lead">{user.about}</p>
                        <hr/>
                    </div>
                </div>

            </div>
         );
    }
}
 
export default Profile;