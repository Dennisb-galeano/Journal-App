
/*va a contener parte de la configuracion de MUI con VITE, como los componentes internos
  - el componente creado se converita en un HOC, recibiendo el children , uqe sera como el "app"
*/

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { purpleTheme } from './purpleTheme';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>

      <CssBaseline />

      {children}
    </ThemeProvider>

  )
}


// para el theme se crea el purple.js , esto crea el theme provider personalizado
//el AppTheme se debe usar en el journalApp, y no en el main para que no crezca tanto