
//los thunks son acciones que yo puedo despachar, peero esas  acciones internamente tienen una tarea ASINCRONA

import { signInWithGoogle } from "../../fireBase/providers";
import { checkingCredentials, login, logout } from "./authSlice";


export const checkingAuthentication = (email, Password) => {  //esta es mi tarea asincrona

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