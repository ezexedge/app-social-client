import React, { Component } from 'react';
import {isAuthenticate} from '../auth'
import {read,update,updateUser} from './apiUser'
import {Redirect } from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'

class EditProfile extends Component {

    constructor(){
        super()
        this.state = {
            id: '',
            name: '',
            email: '',
            password:'',
            error:'',
            redirectToProfile: false,
            fileSize: 0,
            loading: false,
            about: ''

         }
    }

    init = userId => {
        const token = isAuthenticate().token
        read(userId,token)
        .then(data => {
            if(data.error){
                this.setState({redirectToProfile: true})
            }else{
                this.setState({id: data._id,name:data.name,email:data.email,error:'',about:data.about})
            }
    
        })
    
    }

    
    componentDidMount(){
        this.userData = new FormData()
        const userId = this.props.match.params.userId
        this.init(userId)
    
    }


    isValid = () => {
        const { name, email, password , fileSize } = this.state;
       
         
        if (fileSize > 100000) {
            this.setState({ error: "la imagen debe ser menor a 100kb",loading:false});
            return false;
          }

        if (name.length === 0) {
          this.setState({ error: "El nombre es necesario",loading:false});
          return false;
        }
        // email@domain.com
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          this.setState({
            error: "El email es necesario",
            loading: false
          });
          return false;
        }
        if (password.length >= 1 && password.length <= 5) {
          this.setState({
            error: "La contrasena debe tener 6 caracteres como minimo",loading:false
          });
          return false;
        }
        return true;
      };
    


    handleChange = name => event => {
        this.setState({error: ''})
        const value = name === "photo" ? event.target.files[0] : event.target.value

        const fileSize = name === "photo" ? event.target.files[0].size : 0

        this.userData.set(name,value)
        this.setState({[name]:  value,fileSize})


    }

    clickSubmit = event => {
        event.preventDefault()
        this.setState({loading:true})
        if(this.isValid()){
           
            //console.log(user)
            //console.log(user)
            const userId = this.props.match.params.userId
            const token = isAuthenticate().token
            console.log(token)
    
           update(userId,token,this.userData)
            .then(data => {
                if(data.error){

                 this.setState({error:data.error})
                }
                  else{  
                    updateUser(data, ()=>{
                        this.setState({
                            redirectToProfile: true
                        })
                    })  
                  

                }
            })
        }
    }


    signupForm = (name , email , password,about) => (

        <form>

<div className="form-group">
        <label className="text-muted">Foto de perfil</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>

           <div className="form-group" >

               <label className="text-muted">Nombre</label>
               <input type="text" onChange={this.handleChange("name")}  className="form-control" value={name} />

           </div>


           <div className="form-group" >

               <label className="text-muted">Email</label>
               <input type="email" onChange={this.handleChange("email")}  className="form-control" value={email} />

           </div>

                <div className="form-group" >

                   <label className="text-muted">About</label>
                   <textarea type="text" onChange={this.handleChange("about")}  className="form-control" value={about} />

                </div>

           <div className="form-group" >

               <label className="text-muted">Password</label>
               <input type="password" onChange={this.handleChange("password")} className="form-control" value={password} />

           </div>
        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Modificar</button>
        </form>
)


    render() { 
        const {id,name,email,password,redirectToProfile,error,loading,about} = this.state

        if(redirectToProfile){
            return <Redirect to={`/user/${id}`} />
        }

        const photoUrl = id ? `http://64.225.20.237/api/user/photo/${id}?${new Date().getTime()}` : DefaultProfile


        return ( 
            <div className="container">

                <h2 className="mt-5 mb-5">Editar</h2>

                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                {loading ? <div className="jumbotron text-center">
                    <h2>Cargando...</h2>
                </div> : 
                ""
                }  

                <img style={{height: "200px",width:'auto'}}
                className="img-thumbnail"
                src={photoUrl} alt="photo" />

            {this.signupForm(name,email,password,about)}
            </div>
         );
    }
}
 
export default EditProfile;