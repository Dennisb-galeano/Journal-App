//este slice va a ayudar en la construccion de las acciones
// reduxSlice : crea snipet de slices d eredux,
//construccion de las notas, y como lucen



import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
      isSaving: true,  //bandera booleana para evitar doble posteo, que me va a decir si estoy guardando o no
      messageSaved: '',
      notes: [], //mis notas van a estar almacenadas en un objeto que va a ser el arreglo  
      active: null, 
      
    //   active: {
    //     id: 'ABCDR',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imageUrls: [],
    //   }
    },

    reducers: {
        addNewEmptyNote: (state, action) => {  // esta accion,  cuando tooque el boton + me va a crear una nueva entrada y crea espacio en firebase para empezar a actualizar
       
    },
        setActiveNote:( state, action) => {  // hacer click y establecer nota activa
    },

        setNotes:( state,action )  => {  //cargar las notas, 
    },
        setSaving:( state) => {//cuando estoy guradando las notas
    },
        updateNote:( state, action) =>{ //actualizar una nota
    }, 
        delelteNoteById: (state, action) => { //borrar nota
    },

    },
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    delelteNoteById,

} = journalSlice.actions;



//este slice se va a usar en el store.js