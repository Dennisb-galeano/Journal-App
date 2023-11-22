// el folder auth va a contener todo lo relac al store qeu es el apartado de la autenticacion ( slices, reducers, acciones... etc)

import { createSlice } from '@reduxjs/toolkit';



export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',  //    como quiero uqe lizca el store relacionado con el auth, son os estados uqe voy a definir
    uid: null,
    email: null,
    displayName: null,
    photoURL: null, //me lo va a proporcionar google o una red social
    errorMessage: null,
  },

  reducers: { //se van a crear varios reducer
    login: (state, action) => {

    },

    logout: ( state, payload) => {

    },

    checkingCredentials: (state) =>{ //validara si se esta autenticado o no
      state.status= 'checking'; 
    },


    //cada reducer dispara una accion

  },
});


// Action creators are generated for each case reducer function
export const { login,logout,checkingCredentials } = authSlice.actions;



/*
usar el snipet creado de slice "redux-Slice + tab.. "
- el slice tiene las funciones o las acciones que voy a terminar llamando yqe estan asosiacdas al redicer 

*/