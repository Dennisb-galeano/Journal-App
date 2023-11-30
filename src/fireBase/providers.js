
// aca van a estar todos los proveedores de autenticacion 

import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider(); // new- crea una nueva instancia de la fn
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

//esta fn me conecta con google
export const signInWithGoogle = async () => { //se crea fn que me sirva para auth con google, por eso el try y catch

  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);  //en el argumento van el auth(esta en config.js) y el proveedor uqe quiero para uqe aparezca el popup(el mismo para cualquie red..social o auth)
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    // console.log({ credentials });   cons estas lineas podemos  obtener ver las credenciales de google, ejemplo

    // const user = result.user;
    // console.log ({user}); 

    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      //user info
      displayName, email, photoURL, uid
    }

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    }

  }

}


//nuevo proveedor para registrar con usuario y password, esta funcion la voy a usar en los thunks de l auth

export const registerUserWithEmailPassword = async ({ displayName, email, password }) => {

  try {
    // console.log({ email, password, displayName })

    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password); //llamar el firebase, se ocupa con esta fn yse debe importar de firebase (el 1er objeto "FirebaseAuth" ya tiene toda config de la autenticacion modular de firebase )
    const { uid, photoURL } = resp.user;

    //actualizar el usuario en firebase: esta fn y evaluar en los thunks
    await updateProfile(FirebaseAuth.currentUser, { displayName });  //fn de firebase,"importar", loguea al usuario. en {lo que queremos actualizar }, es una tarea asincrona

    return {  //si la resp es ok retornar los datos del usuario
      ok: true,
      uid, photoURL, email, displayName
    }
    //envia mensaje de error si ya se encuentra registrado, o el error lo encuentra firebase
  } catch (error) {
    // console.log(error);
    return { ok: false, errorMessage: "El usuario ya existe" }  //o  error.message y me mostrara en redux el error de firebase
    // van las validaciones para leer los codigos codigo de error de firebase    
  }

}


export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid, photoURL, displayName
    }

  } catch (error) {
    return { ok: false, errorMessage: error.message }

  }
}
