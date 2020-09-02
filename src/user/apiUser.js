export const read = (userId,token) => {

    return fetch(`http://localhost:8000/user/${userId}`,{
         method: "GET",
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


 export const list = () => {


    return fetch(`http://localhost:8000/users`,{
         method: "GET"
     })
     .then(response => {
         return response.json()
     })
     .catch(err => console.log(err))

 }


 export const remove = (userId,token) => {

    return fetch(`http://localhost:8000/user/${userId}`,{
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