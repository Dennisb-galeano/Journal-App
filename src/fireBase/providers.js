
// aca van a estar todos los proveedores de autenticacion 

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider(); // new- crea una nueva instancia de la fn
googleProvider.setCustomParameters({
  prompt: 'select_account'
})


export const signInWithGoogle = async () => { //se crea fn que me sirva para auth con google, por eso el try y catch

  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);  //en el argumento van el auth(esta en config.js) y el proveedor uqe quiero para uqe aparezca el popup(el mismo para cualquie red..social o auth)
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    // console.log({ credentials });   cons estas lineas podemos  obtener ver las credenciales de google, ejemplo

    const user = result.user;
    // console.log ({user}); 

    const {displayName, email, photoURL,uid} = result.user;
    return{
      ok: true,
      //user info
      displayName, email, photoURL,uid

    }

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return{
      ok:false,
      errorMessage,
    }

  }

}