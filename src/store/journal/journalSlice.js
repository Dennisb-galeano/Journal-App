//este slice va a ayudar en la construccion de las acciones
// reduxSlice : crea snipet de slices d eredux,
//construccion de las notas, y como lucen



import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,  //bandera booleana para evitar doble posteo, que me va a decir si estoy guardando o no
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
        savingNewNote: (state) => { //deshabilita el boton si esta cargando. se usa con un use selector en el journal page, el dispatch esta en los thunks
            state.isSaving = true;
        },

        addNewEmptyNote: (state, action) => {  // esta accion,  cuando tooque el boton + me va a crear una nueva entrada y crea espacio en firebase para empezar a actualizar
            state.notes.push(action.payload); //redux toolkit muta y crea nunevo estado
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {  // hacer click y establecer nota activa
            state.active = action.payload;
            state.messageSaved = '';
        },

        setNotes: (state, action) => {  //cargar las notas, 
            state.notes = action.payload;
        },
        setSaving: (state) => {//cuando estoy guradando las notas
            state.isSaving = true;
            state.messageSaved = '';
        },

        updateNote: (state, action) => { // payload: note. noteactualizar una nota la referencia local,
            state.isSaving = false; //por que ya guardo
            state.notes = state.notes.map( note => {  // se hace asi por redux toolkit

                if (note.id === action.payload.id ) {
                    return action.payload;
                }
                return note;
            });

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`;

        },
        setPhotosToActiveNote: (state, action) => {  // se llama en los thunks en photosUrl. / establecer el arreglo de imagenes en la nota activa (es la que se va a grbar en firebase), creado en los thunks: const photosUrl... 
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false; //el isSaving en false me deja cargae
        },

        clearNotesLogout: (state) => { //restablecer npte
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        delelteNoteById: (state, action) => { //borrar nota
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);  //.filter toma todas las notas y quita la nota cuyo id es igual al id que recibi en el action.payload  (redux toolkit me permite esta sintaxis )
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    clearNotesLogout,
    delelteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;



//este slice se va a usar en el store.js