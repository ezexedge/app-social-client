import React, { Component } from 'react';
import {list} from './apiUser'
import {Link} from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'
class Users extends Component {
    constructor(){
        super()
        this.state = {
            users: []
        }
    }


    componentDidMount(){
        list().then(data => {
            if(data.error){
                console.log(data.error)
            }else{  
                this.setState({users: data})
            }
        })
    }


        renderUsers = users => ( 
            <div className="row">
            {users.map((user,i)=> (
             <div className="card col-md-4" style={{width: "18rem"}} key={i}>
                    <img style={{height: "270px",width:'auto'}}
                className="img-thumbnail"
                src={ `http://64.225.20.237/api/user/photo/${user._id}?${new Date().getTime()}`}
                onError={i=>(i.target.src = `${DefaultProfile}`)}
                alt="photo" />

            
             <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
               <p className="card-text">
                   {user.email}
               </p>
                  
               <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary btn-sm" >
               Ver perfil
               </Link>
             </div>
           </div>
            ))}
        </div>
        )

    render() { 
        const { users } = this.state



        return ( 
            <div className="container">
                <h2 className="mt-5 mb-5">Usuarios</h2>
              {this.renderUsers(users)}
            </div>
         );
    }
}
 
export default Users;