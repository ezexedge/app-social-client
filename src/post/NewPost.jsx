import React, { Component } from 'react';
import {isAuthenticate} from '../auth'
import {Redirect , Link} from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'

import { create }from './apiPost'

class NewPost extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            body: '',
            photo: '',
            error: '',
            user: {

            },
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
      }


          componentDidMount(){
       this.postData = new FormData()
       this.setState({user: isAuthenticate().user})

    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 100000000) {
            this.setState({
                error: "Archivo debe pesar menos de 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "todos los campos debe ser llenado", loading: false });
            return false;
        }
        return true;
    };

      handleChange = name => event => {
        this.setState({ error: "" });
        const value =  name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };
    
    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticate().user._id;
            const token = isAuthenticate().token;

            create(userId, token, this.postData).then(data => {
                console.log(data)
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });
                }
                
            });
        }
    };


    // check follow
  
    
     

   

    newPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Foto post</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Titulo</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Crear Post
            </button>
        </form>
    );

  

    render() { 

        const {title,body,photo,user,error, loading, redirectToProfile} = this.state

        
        if(redirectToProfile)return <Redirect to={`/user/${user._id}`} />


      //  const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile


        return ( 
            <div className="container">

                <h2 className="mt-5 mb-5">Crear nuevo post</h2>

                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading..</h2>
                    </div>
                ) :(
                    " "
                )}
              

              


                {this.newPostForm(title, body)}

            </div>
         );
    }
}
 
export default NewPost;