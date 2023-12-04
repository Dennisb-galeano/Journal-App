/* se crea este hook para organicar mejor el componente de App Router en las validaciones del status con la autenticacion
efecto que esta pediente de la autenticacion */


//este hook no va a regresar nada, el va a disparar lo que se le solicite, el estatus me va a decir si esta autenticado o no, se llama en el AppRouter, manrtiene el estado de la autenticacion al cargar.

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../fireBase/config";
import { onAuthStateChanged } from "firebase/auth";

import { login, logout } from "../store/auth/authSlice";



export const useCheckAuth = () => {

  const { status } = useSelector(state => state.auth);   //permite extraer datos del store de Redux ,,, (voy a tomar algo{ }, que viene del state => state.auth). uqe voy a tomar ? -- el  { status}, 
  const dispatch = useDispatch();    //para que se autentique el usuario, del use effect, hay que hacer el dispath


  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {    //firebase tiene una fn que esta pendiente para cuando el estado de la autenticacion cambia.(FirebaseAuth), esta fn regresa un "observable". es una fn uqe emite valores, cada vez que el estado cambia la fn se va a volver a disparar. luego, va la fn uqe quiero ejecutar para cuando el estado cambie, se reciba el sig valor
      // console.log(user);
      if (!user) return dispatch(logout());  //si, no hay ningun usuario entonces se llama el logout( ese esta en el authSlice)

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));  //pero, si estoy autenticado, si tengo un usario, voy a mamdar el diapatc del login
    })

  }, []);

  return status;

}
