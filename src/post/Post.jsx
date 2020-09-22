import React, { Component } from 'react';
import {list} from './apiPost'
import DefaultPost from '../images/mountains.jpg'
import {Link} from 'react-router-dom'

class Post extends Component {
    constructor(){
        super()
        this.state = {
            posts: []
        }
    }


    componentDidMount(){
        list().then(data => {
            if(data.error){
                console.log(data.error)
            }else{  
                this.setState({posts: data})
            }
        })
    }


        renderPosts = posts => {
            return (
                <div className="row">
                {posts.map((post,i)=> { 

                    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ''
                    const posterName = post.postedBy ? post.postedBy.name : 'desconocido'

                        return(
                            <div className="card col-md-4" style={{width: "18rem"}} key={i}>
                    
                    


                            <div className="card-body">
                            <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} 
                            alt={post.title}
                            onError= {i => i.target.src = `${DefaultPost}`}
                            className="img-thumbnail mb-3"
                            style={{height: "200px",width: "auto"}}
                            />
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">
                            {post.body.substring(0,100)}
                            </p>
                            <br/>
                            <div className="font-italic mark">
                            Creado por : <Link to={`${posterId}`}>{posterName}</Link>{" "}
                            en {new Date(post.created).toDateString()}
                            </div>
                            <Link to={`/post/${post._id}`} className="btn btn-raised btn-primary btn-sm" >
                            Leer mas
                            </Link>
                            </div>
                            </div>
                        )
                })}
            </div>
            )
        }

    render() { 
        const { posts } = this.state



        return ( 
            <div className="container">
                <h2 className="mt-5 mb-5">
                    {!posts.length ? 'loading....' : 'recent posts'}
                </h2>
              {this.renderPosts(posts)}
            </div>
         );
    }
}
 
export default Post;