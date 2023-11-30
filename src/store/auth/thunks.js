
//los thunks son acciones que yo puedo despachar, peero esas  acciones internamente tienen una tarea ASINCRONA

import { LoginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../../fireBase/providers";
import { checkingCredentials, login, logout } from "./authSlice";


export const checkingAuthentication = () => {  //esta es mi tarea asincrona

  return async(dispatch) => {
    dispatch( checkingCredentials() );
  }
}


export const startGoogleSignIn = () => {
  return async (dispatch) => {

    dispatch( checkingCredentials() );

    const result= await signInWithGoogle(); //esta fn la llamo desde los providers.js
    // console.log ({result});
    if (!result.ok) 
      return dispatch ( logout(result.errorMessage)); //el logout esta en el authSlice alli se coloca el estado actual para el logout, si tengo un error melo muesra redux, pero si todo sale bien 

      dispatch (login( result) ) //si todo sale ok, se va ha hacer el dispatch de un objeto que pase al login, (me pude el payload.. el redult)
  }
}

//despachar una accion uqe ponga mi app en un estado loading, seria en el authSlice el checkingCredentials
//llamar con el dispatch el checkingCredentials, 
//el  checkingAuthentication tambien es necesario llamarlo pero del lado del formulario, en el login page(donde esta el form), se crea el useDispatch


//crea el usuario con email y password, se llama al register page
  export const startCreatingUserWithEmailPassword = ({ displayName, email, password }) => {
    return async ( dispatch) => {

      dispatch (checkingCredentials() );

      const { ok, uid, photoURL,errorMessage } = await registerUserWithEmailPassword({ displayName, email, password});
      if ( !ok ) return dispatch( logout( {errorMessage} ) );
// si todo ok, loguear al usuario
       
      dispatch( login({ uid, displayName, email, photoURL }));
      
    }
  }

  //el logout esta eh authSlice: este recibe el payload y este tiene el error.message
  //cuando se hace el dispatch del cheking 


  export const startLoginWithEmailPassword = ( { email, password}) => {
    return async (dispatch) => {

      dispatch( checkingCredentials( ));

      const result = await LoginWithEmailPassword({ email, password});
      console.log(result);
      
      if (!result.ok) return dispatch( logout( result.errorMessage ) );
      dispatch( login( result ));
    }



  }


  