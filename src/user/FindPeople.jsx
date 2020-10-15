import React, { Component } from 'react';
import {findPeople,follow} from './apiUser'
import {Link} from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'
import {isAuthenticate} from '../auth'
class FindPeople extends Component {
    constructor(){
        super()
        this.state = {
            users: [],
            error: '',
            open: false
        }
    }


    componentDidMount(){

        const userId = isAuthenticate().user._id
        const token = isAuthenticate().token

        findPeople(userId,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{  
                this.setState({users: data})
            }
        })
    }

    clickFollow = (user,i) => {
              const userId = isAuthenticate().user._id
        const token = isAuthenticate().token

        follow(userId,token,user._id)
        .then(data => {
            if(data.error){
                this.setState({error:data.error})
            }
            else{
                let toFollow  = this.state.users
                toFollow.splice(i,1)
                this.setState({
                    users:toFollow,
                    open: true,
                    followMessage: `following ${user.name}`
                })
            }
        })

    }


        renderUsers = users => ( 
            <div className="row">
            {users.map((user,i)=> (
             <div className="card col-md-4" style={{width: "18rem"}} key={i}>
                    <img style={{height: "200px",width:'auto'}}
                className="img-thumbnail"
                src={ `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`}
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

               <button onClick={()=> this.clickFollow(user,i)} className="btn btn-raised btn-info float-right btn-sm" >
                Seguir
               </button>
             </div>
           </div>
            ))}
        </div>
        )

    render() { 
        const { users ,open,followMessage } = this.state



        return ( 
            <div className="container">
                <h2 className="mt-5 mb-5">Usuarios</h2>

                {open && ( 
                <div className="alert alert-success">
                            <p>{followMessage}</p>
                        </div>
                       
                )}
                        {this.renderUsers(users)}
                        </div>
        
         );
    }
}
 
export default FindPeople;