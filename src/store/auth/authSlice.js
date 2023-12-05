// el folder auth va a contener todo lo relac al store qeu es el apartado de la autenticacion ( slices, reducers, acciones... etc)

import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',  //como quiero uqe lizca el store relacionado con el auth, son os estados uqe voy a definir
    uid: null,
    email: null,
    displayName: null,
    photoURL: null, //me lo va a proporcionar google o una red social
    errorMessage: null,
  },

  reducers: { //se van a crear varios reducer, este payload lo estoy usando en el dispatch en los thunks
    login: (state, { payload }) => {
      state.status = 'authenticated',
      state.uid = payload.uid,
      state.email = payload.email,
      state.displayName = payload.displayName,
      state.photoURL = payload.photoURL,
      state.errorMessage = null;
      // console.log(state);
      // console.log(payload);
    },

    logout: (state, { payload }) => { //dejamos el estado, de como esta actualmente

      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage; //si viene el payloar, busca el errorMessage, de lo contrario no haace
    },

    checkingCredentials: (state) => {//validara si se esta autenticado o no
      state.status = 'checking';
      console.log(state.status);
    }
  },
});
//cada reducer dispara una accion


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
//export default authSlice.reducer


/*
usar el snipet creado de slice "redux-Slice + tab.. "
- el slice tiene las funciones o las acciones que voy a terminar llamando yqe estan asosiacdas al redicer 

*/