import { Route, Routes } from "react-router-dom";
import { JournalPage } from "../journal/pages/JournalPage";
import {AuthRoutes} from "../auth/routes/AuthRoutes";
import { useSelector } from "react-redux";
import { CheckingAuth } from "../ui/components/CheckingAuth";


export const AppRouter = () => {

  const{ status} = useSelector(state => state.auth);   //permite extraer datos del store de Redux ,,, (voy a tomar algo{ }, que viene del state => state.auth). uqe voy a tomar ? -- el  { status}, 

  if(status === 'checking'){
    return <CheckingAuth/>  //este componente
  }

  return (

    <Routes>

{/* login y registro */}
      <Route path="/auth/*" element={<AuthRoutes/> } />

{/* JournalApp */}
      <Route path="/*" element={<JournalPage/> }  />

    </Routes>

    )
}


// el path de login y registro, va a ir siempre al auth. cualquier path que tenga /* va al authRoutes
// la otra ruta es que cualquier otra rutaa que no entre por auth va a entrar al journalRoute
//useSelector es un Hook que nos permite extraer datos del store de Redux utilizando una función selectora