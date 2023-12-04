import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from '../store/auth/authSlice';
import { journalSlice } from "./journal/journalSlice";


export const store = configureStore( {
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,  //apunta al reducer del journalSlice
  }, 

});




/* Instalacion de redux toolkit
- desde la pag, get started > quik statrt > copiar las instalaciones necesarias >
  > en la terminal - yarn add @reduxjs/toolkit  y yarn add react-redux

- configuraciones del Store:
   crear el store.js, en la raiz del proyecto: "mi fuente unica de la verdad" 
      import { configureStore } from "@reduxjs/toolkit";

      export const store = configureStore( {
      reducer: {

      },

    });

- configurar el proveedor "provider"
    colocar el provider en el main, en la parte mas alta de los componentes, para que los hijos reciban tooda la informacion
    el provider, " store" a ser el padre de los demas
    > importar el provider de react Redux --- import { Provider } from 'react-redux';
    > en el provider colocar el store ya que lo pide a fuerza <provider store={store}>
*/