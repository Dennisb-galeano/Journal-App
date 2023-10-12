import { Route, Routes } from "react-router-dom";
import { JournalPage } from "../journal/pages/JournalPage";
import {AuthRoutes} from "../auth/routes/AuthRoutes";


export const AppRouter = () => {
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