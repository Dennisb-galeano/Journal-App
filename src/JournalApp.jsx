import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"

export const JournalApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter/>
      </AppTheme>
    </>

  )
}
//aca  es donde se van a utilizar el router, se va a usar el sistema de rutas principal de la APP

//el browser router se debe colocar en la parte mas alta de la app.. esta en el main