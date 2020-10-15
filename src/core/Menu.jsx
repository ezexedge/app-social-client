import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import {signout,isAuthenticate} from '../auth'

const isActive = (history,path) => {
    if(history.location.pathname === path) return {color:"#ff9900"}
        else return {color: "#fff"}
}



const Menu = ({history}) => (
    <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                        <Link className="nav-link" to="/" style={isActive(history,'/')} >Home</Link>
                </li>

                <li className="nav-item">
                        <Link className="nav-link" to="/users" style={isActive(history,'/users')} >Usuarios</Link>
                </li>

                   <li className="nav-item">
                                <Link to={`/post/create`} style={isActive(history,`/post/create`)} className="nav-link" >
                                Crear post
                                </Link>  
                
                         </li>

                {!isAuthenticate() && (
                    <>
                     <li className="nav-item">
                        <Link className="nav-link" to="/signin" style={isActive(history,'/signin')}>Iniciar sesion</Link>
                </li>
                <li className="nav-item">
                        <Link className="nav-link" to="/signup"  style={isActive(history,'/signup')}>Crear cuenta</Link>
                </li>

               
                </>
                )}


                   {isAuthenticate() && (
                    <>
                      <li className="nav-item">
                        <a className="nav-link"   style={isActive(history,'/signout'),{cursor: 'pointer'}} 
                        onClick={()=>signout(()=> history.push('/'))}>Cerrar sesion</a>
                         </li>

                          <li className="nav-item">
                                <Link to={`/user/${isAuthenticate().user._id}`} style={isActive(history,`/user/${isAuthenticate().user._id}`)} className="nav-link" >
                                {`${isAuthenticate().user.name} profile`}
                                </Link>

 </li>
                                     <li className="nav-item">
                                <Link to={`/findpeople`} style={isActive(history,`/findpeople`)} className="nav-link" >
                                Buscar personas
                                </Link>  
                
                         </li>

                      
                </>
                )}
               

            </ul>
    </div>
)
 
export default withRouter(Menu);




