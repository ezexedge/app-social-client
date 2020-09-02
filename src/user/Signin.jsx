import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {signin,authenticate} from '../auth'
import axios from 'axios'

class Signin extends Component {

    constructor(){
        super()
        this.state = {       
            email : "",
            password: "",
            error: "",
            redirectToReferer:false,
            loading: false
        }
    }
    
    handleChange = name => event => {
        this.setState({error: ""})
        this.setState({[name]: event.target.value})
    }




    clickSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})
        const {email,password} = this.state
        const user = {
           email: email,
           password: password
        }
        console.log(user)
        signin(user)
        .then(data => {
            if(data.error){
                this.setState({error:data.error,loading:false})
            } 
                else {
                    //auth
                    authenticate(data,()=>{
                        this.setState({redirectToReferer:true , loading:false })
                    })

                    //redirect
                }
        })
    }




signinForm = (email , password) => (

                 <form>



                    <div className="form-group" >

                        <label className="text-muted">Email</label>
                        <input type="email" onChange={this.handleChange("email")}  className="form-control" value={email} />

                    </div>


                    <div className="form-group" >

                        <label className="text-muted">Password</label>
                        <input type="password" onChange={this.handleChange("password")} className="form-control" value={password} />

                    </div>
                 <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                 </form>
)

    render() {

        const {email,password,error,redirectToReferer,loading} = this.state

        if(redirectToReferer){
            return <Redirect to="/" />
        }

        return ( 
            <div className="container">
                 <h2>signin</h2>


                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>


                {loading ? <div className="jumbotron text-center">
                    <h2>Cargando...</h2>
                </div> : 
                ""
                }        

                {this.signinForm(email,password)}

            </div>
         );
    }
}
 
export default Signin;