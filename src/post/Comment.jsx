import React, { Component } from 'react';
import {comment , uncomment} from './apiPost'
import {isAuthenticate} from '../auth/index'
import {Link} from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'



class Comment extends Component {



    state = { 
        text: "",
        error: ''
     }

     handleChange = event => {
        this.setState({error: ''})
        this.setState({text: event.target.value})
    
     }

     isValid = () => {
         const {text} = this.state
         if(!text.length > 0 || text.length > 150){

            this.setState({error: 'debe ingresar un comentario minimo de 150 caracteres'})
            return false
         }

         return true
     }

     addComment = e => {
        e.preventDefault()

        if(!isAuthenticate()){
            this.setState({error: 'debe iniciar sesion para comentar'})
            return false
        }
        const userId = isAuthenticate().user._id
        const postId = this.props.postId
        const token = isAuthenticate().token

        if(this.isValid()){
            comment(userId,token,postId,{text: this.state.text}).then(data => {
                if(data.error){
                    console.log(data.error)
                }else{
                    console.log(data)
                    this.setState({text: ''})
                    this.props.updateComments(data.comments)
    
                }
            })
        }
    }

    deleteComment = comment => {
        const userId = isAuthenticate().user._id;
        const token = isAuthenticate().token;
        const postId = this.props.postId;

        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.updateComments(data.comments);
            }
        });
    };

    deleteConfirmed = comment => {
        let answer = window.confirm(
            "Are you sure you want to delete your comment?"
        );
        if (answer) {
            this.deleteComment(comment);
        }
    };


    render() { 

        const {comments} = this.props 
        const{error} = this.state


        return (
            <div>
                <h2 className="mt-5 mb-5">Escribre un comentario</h2>
                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input type="text" onChange={this.handleChange} className="form-control"
                        value={this.state.text} placeholder="ingrese un comentario"
                        />

                    <button className="btn btn-raised btn-success mt-2">Publicar</button>
                    </div>
                </form>
                
                <div className="alert alert-danger"
                style={{display: error ? '' : 'none' }}
                >
                {error}
                </div>

                <hr/>

                <div className="col-md-8 col-md-offset-2">

        <h3 className="text-primary">{comments.length} Commentarios</h3>
                    <hr/>

                    {comments.map((comment,i)=> ( 
                        <div key={i} >
                                <div>

                                    <Link to={`/user/${comment.postedBy._id}`} >

                                    <img 
                                    className="float-left mr-2"
                                    height="30px"
                                    onError={i=>(i.target.src = `${DefaultProfile}`)}

                                        src={`${
                                            process.env.REACT_APP_API_URL
                                        }/user/photo/${comment.postedBy._id}`}
                                        
                                        alt={comment.postedBy.name}

                                    />
                                    </Link>
                                    <div>
                                        <p className="lead">{comment.text}</p>
                                        <br/>
                                        <p className="font-italic mark">
                                        Creado por : <Link to={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}</Link>{" "}
                                        en {new Date(comment.created).toDateString()}

                                        <span>
                                        {isAuthenticate().user && isAuthenticate().user._id === comment.postedBy._id && 
                                                        <>
                                                   
                                                            <button  onClick={() => this.deleteConfirmed(comment)} className="btn btn-raised btn-danger float-right">
                                                                Eliminar
                                                            </button>
                                                            </>
                                                        }
                                         </span>
                                        </p>
                                    </div>
                                  


                                </div>
                            </div>
                        )
                    )}

                    </div>

            </div>
          );
    }
}
 
export default Comment;