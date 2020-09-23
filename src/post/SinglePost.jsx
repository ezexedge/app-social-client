import React, { Component } from 'react';
import {singlePost,remove,like,unlike} from './apiPost'
import DefaultPost from '../images/mountains.jpg'
import {Link,Redirect} from 'react-router-dom'
import {isAuthenticate} from '../auth/index'

class SinglePost extends Component {
    state = { 
        post: '',
        redirectToHome: false,
        redirectToSignin: false,
        like:false,
        likes:0
     }

     checkLike = (likes) => {
        const userId =  isAuthenticate() && isAuthenticate().user._id
        let match = likes.indexOf(userId) !== -1
        return match


     }

     componentDidMount = () => {
         const postId =   this.props.match.params.postId
         singlePost(postId).then(data => {
             if(data.error){
                 console.log(data.error)
             }else{
                 this.setState({post: data,likes: data.likes.length,like: this.checkLike(data.likes)})
             }
         })
     }


     likeToggle = () => {

        if(!isAuthenticate()){
            this.setState({
                redirectToSignin:true
            })
            return false
        }
         let callApi = this.state.like ? unlike : like
         const userId = isAuthenticate().user._id
         const postId = this.state.post._id
         const token = isAuthenticate().token

         callApi(userId,token,postId).then(data => {
             if(data.error){
                 console.log(data.error)
             }else{
                 this.setState({
                     like: !this.state.like,
                     likes: data.likes.length
                 })
             }
         })

     }

     deletePost = () => {
        const postId =   this.props.match.params.postId
        const token = isAuthenticate().token
        remove(postId,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({redirectToHome: true})
            }
        })
     }

      confirmarEliminar = () => {
          let answer = window.confirm('deseas eliminar el post')
          if(answer){
              this.deletePost()
          }
      }

     renderPost = (post) => {

        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ''
        const posterName = post.postedBy ? post.postedBy.name : 'desconocido'

        const {like,likes} = this.state


        return(
    
    


            <div className="card-body">
            <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} 
            alt={post.title}
            onError= {i => i.target.src = `${DefaultPost}`}
            className="img-thumbnail mb-3"
            style={{height: "300px",width: "100%",objectFit: 'cover'}}
            />

        {like ? ( <h3 onClick={this.likeToggle} > <i className="fa fa-thumbs-up text-success bg-dark" style={{padding: '10px',borderRadius:'50%'}}/> {' '} {likes} likes</h3> ) : 
        ( <h3 onClick={this.likeToggle} > <i className="fa fa-thumbs-up text-warning bg-dark" style={{padding: '10px',borderRadius:'50%'}}/> {' '} {likes} likes</h3> )
 }


            <p className="card-text">
            {post.body}
            </p>
            <br/>
            <div className="font-italic mark">
            Creado por : <Link to={`${posterId}`}>{posterName}</Link>{" "}
            en {new Date(post.created).toDateString()}
            <div className="d-inline-block">
            <Link to={`/`} className="btn btn-raised btn-primary btn-sm ml-5 mr-5" >
            Volver
            </Link>
            {isAuthenticate().user && isAuthenticate().user._id === post.postedBy._id && 
         <>
         <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning mr-5">
                Update post
            </Link>
            <button  onClick={this.confirmarEliminar} className="btn btn-raised btn-danger">
                Delete post
            </button>
            </>
          }

           
           
            </div>
            </div>
            
            </div>
        
        )
     }

    render() { 
        const {post,redirectToHome,redirectToSignin} = this.state

        if(redirectToHome){
            return <Redirect to={`/`} />
        }else if (redirectToSignin){
            return <Redirect to={`/signin`} />

        }
        return ( 
            <div className="container">
                <h2 className="m text-center">{post.title}</h2>
                {!post ? <div className="jumbotron text-center">
                    <h2>Cargando...</h2>
                </div> : 
                this.renderPost(post)

                }        

            </div>
         );
    }
}
 
export default SinglePost;