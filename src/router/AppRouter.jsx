import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { FirebaseAuth } from "../fireBase/config";
import { onAuthStateChanged } from "firebase/auth";

import { JournalPage } from "../journal/pages/JournalPage";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { login, logout } from "../store/auth/authSlice";


export const AppRouter = () => {

  const { status } = useSelector(state => state.auth);   //permite extraer datos del store de Redux ,,, (voy a tomar algo{ }, que viene del state => state.auth). uqe voy a tomar ? -- el  { status}, 
  const dispatch = useDispatch();    //para que se autentique el usuario, del use effect, hay que hacer el dispath


  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {    //firebase tiene una fn que esta pendiente para cuando el estado de la autenticacion cambia.(FirebaseAuth), esta fn regresa un "observable". es una fn uqe emite valores, cada vez que el estado cambia la fn se va a volver a disparar. luego, va la fn uqe quiero ejecutar para cuando el estado cambie, se reciba el sig valor
      // console.log(user);
      if (!user) return dispatch(logout());  //si, no hay ningun usuario entonces se llama el logout( ese esta en el authSlice)

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));  //pero, si estoy autenticado, si tengo un usario, voy a mamdar el diapatc del login
    })

  }, [])





  if (status === 'checking') {
    return <CheckingAuth />  //este componente con circulo de loading
  }

  return (

    <Routes>
      {/* si el estatus es autenticado solo la ruta  <JournalPage/> va a existir, si no , solo estas <AuthRoutes/> */}
      {
        (status === 'authenticated')
          ? <Route path="/*" element={<JournalPage />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }

      {/* si la persona no esta en ninguna de las rutas, entonces, va a una ruta por defecto */}
      <Route path="/*" element={<Navigate to='/auth/login' />} />


      {/* login y registro */}
      {/* <Route path="/auth/*" element={<AuthRoutes/> } /> */}

      {/* JournalApp */}
      {/* <Route path="/*" element={<JournalPage/> }  /> */}

    </Routes>

  )
}


// el path de login y registro, va a ir siempre al auth. cualquier path que tenga /* va al authRoutes
// la otra ruta es que cualquier otra rutaa que no entre por auth va a entrar al journalRoute
//useSelector es un Hook que nos permite extraer datos del store de Redux utilizando una función selectora
