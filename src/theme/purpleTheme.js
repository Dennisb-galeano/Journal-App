//se regresa un JS, 
// el theme tiene un tema por defecto pero pa fn me va a permitir sobreEscribir el conteniddo como la paleta de colores

import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


export const purpleTheme = createTheme({
  palette:{
    primary:{
      main:'#262254'
    },

    secondary:{
      main:'#543884'
    },

    error:{
      main: red.A400
    }
    
  }

})



//@material crea diferentes materiales, para el tema del mUI , COMO el red