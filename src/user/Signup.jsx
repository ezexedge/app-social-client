import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {signup} from '../auth'
class Signup extends Component {

    constructor(){
        super()
        this.state = {
            name: "",
            email : "",
            password: "",
            error: "",
            open : false
        }
    }
    
    handleChange = name => event => {
        this.setState({error: ""})
        this.setState({[name]: event.target.value})
    }

    clickSubmit = event => {
        event.preventDefault()
        const {name,email,password} = this.state
        const user = {
           name: name,
           email: email,
           password: password
        }
        //console.log(user)
        signup(user)
        .then(data => {
            if(data.error) this.setState({error:data.error})
                else this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                })
        })
    }

  //signup


signupForm = (name , email , password) => (

                 <form>

                    <div className="form-group" >

                        <label className="text-muted">Nombre</label>
                        <input type="text" onChange={this.handleChange("name")}  className="form-control" value={name} />

                    </div>


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

        const {name,email,password,error,open} = this.state

        return ( 
            <div className="container">
                 <h2>Crear cuenta</h2>


                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>


                 <div className="alert alert-info" style={{display: open ? "" : "none"}}>
        Cuenta creada .Por favor ingrese a {" "} <Link to="/signin">iniciar sesion</Link> 
                </div>

                {this.signupForm(name,email,password)}

            </div>
         );
    }
}
 
export default Signup;