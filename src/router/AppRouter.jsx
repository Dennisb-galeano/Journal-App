import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";

import { JournalPage } from "../journal/pages/JournalPage";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { CheckingAuth } from "../ui/components/CheckingAuth";


export const AppRouter = () => {

  const status = useCheckAuth();  //este custom hook mantiene el estado de la autenticacion al cargar.

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
