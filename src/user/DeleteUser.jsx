import React, { Component } from 'react';
import {isAuthenticate} from '../auth'
import {remove} from './apiUser'
import {signout} from '../auth'
import {Redirect} from 'react-router-dom'
class DeleteUser extends Component {

    state = {
        redirect: false
    }

    deleteAccount = () => {
        //console.log('delete account')
        const token = isAuthenticate().token
        const userId = this.props.userId
        remove(userId,token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                signout(() => console.log("user is deleted"))
                this.setState({redirect:true})
            }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("deseas eliminar la cuenta?")
        if(answer){
            this.deleteAccount()
        }
        
    }

    render() { 
        if(this.state.redirect){
            return <Redirect to="/"/>
        }

        return ( 
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger ">
            Delete Profile
        </button>
         );
    }
}
 
export default DeleteUser;