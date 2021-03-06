export const signup = (user) => {
       return fetch(`http://64.225.20.237/api/signup`,{
            method: "POST",
            headers:{
                Accept: "application/json",
                "Content-type" : "application/json"
            },
            body: JSON.stringify(user)

        })
        .then(response=>{
            return response.json()
        })
        .catch(err => console.log(err))
    }


export const  signin = (user) => {
       return fetch(`http://64.225.20.237/api/signin`,{
            method: "POST",
            headers:{
                Accept: "application/json",
                "Content-type" : "application/json"
            },
            body: JSON.stringify(user)

        })
        .then(response=>{
            return response.json()
        })
        .catch(err => console.log(err))
    }


export const  authenticate = (jwt,next) => {
        if(typeof window !== "undefined"){
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next()
        }
    } 


export const signout = (next) => {
    if(typeof window !== "undefined") localStorage.removeItem('jwt')
    next()

    return fetch(`http://64.225.20.237/api/signout`,{
        method: "GET",
    
    })
    .then(response => {
        console.log('signout',response)
        return response.json()
    })
    .catch(err => console.log(err))
}

export const isAuthenticate = () => {
    if(typeof  window == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}

export const socialLogin = user => {
    return fetch(`http://64.225.20.237/api/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

