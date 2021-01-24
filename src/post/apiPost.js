export const create = (userId, token, post) => {
    return fetch(`http://64.225.20.237/api/posts/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/*
export const list = () => {


    return fetch(`${process.env.REACT_APP_API_URL}/posts`,{
         method: "GET"
     })
     .then(response => {
         return response.json()
     })
     .catch(err => console.log(err))

 }
*/

 export const singlePost = (postId) => {


    return fetch(`http://64.225.20.237/api/posts/${postId}`,{
         method: "GET"
     })
     .then(response => {
         return response.json()
     })
     .catch(err => console.log(err))

 }

 export const listByUser = (userId,token) => {


    return fetch(`http://64.225.20.237/api/posts/by/${userId}`,{
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
     })
     .then(response => {
         return response.json()
     })
     .catch(err => console.log(err))

 }


 export const remove = (postId,token) => {

    return fetch(`http://64.225.20.237/api/posts/${postId}`,{
         method: "DELETE",
         headers: { 
         Accept: "application/json",
         "Content-Type" : "application/json",
         Authorization: `Bearer ${token}`
         }
     })
     .then(response => {
         return response.json()
     })
     .catch(err => console.log(err))
 }


 export const update = (postId, token, post) => {
    return fetch(`http://64.225.20.237/api/posts/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const like = (userId, token, postId) => {
    return fetch(`http://64.225.20.237/api/posts/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId,postId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const unlike = (userId, token, postId) => {
    return fetch(`http://64.225.20.237/api/posts/unlike`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId,postId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const comment = (userId, token, postId,comment) => {
    return fetch(`http://64.225.20.237/api/posts/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId,postId,comment})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const uncomment = (userId, token, postId,comment) => {
    return fetch(`http://64.225.20.237/api/post/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId,postId,comment})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = page => {
    return fetch(`http://64.225.20.237/api/posts/?page=${page}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
