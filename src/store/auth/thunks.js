
//los thunks son acciones que yo puedo despachar, peero esas  acciones internamente tienen una tarea ASINCRONA

import { signInWithGoogle } from "../../fireBase/providers";
import { checkingCredentials } from "./authSlice";


const checkingAuthentication = (email, Password) => {  //esta es mi tarea asincrona

  return async(dispatch) => {
    dispatch( checkingCredentials() );


  }
}


export const startGoogleSigIn = () => {
  return async (dispatch) => {

    dispatch( checkingCredentials() );

    const result= await signInWithGoogle(); //esta fn la llamo desde los providers.js
    console.log ({result});
  }

}

//despachar una accion uqe ponga mi app en un estado loading, seria en el authSlice el checkingCredentials
//llamar con el dispatch el checkingCredentials, 
//el  checkingAuthentication tambien es necesario llamarlo pero del lado del formulario, en el login page(donde esta el form), se crea el useDispatch