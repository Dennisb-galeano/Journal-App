// peticiones asincronas
//empieza el proceso ! 

import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../fireBase/config";
import { addNewEmptyNote, delelteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

// esta accion se va a despachar cuando alguin haga click en el boton del + , este dispatch se usa en journal page, (donde esta el boton)
export const startNewNote = () => {
  return async (dispatch, getState) => { // para obtener el id del usuaior usamos el getState que esun fn de redux
    // console.log( getState());
    dispatch(savingNewNote()); //reducer de journal slice


    const { uid } = getState().auth;  //para grabar en firebase, vamos a opupar el uid del usuario

    const newNote = {
      title: "",
      body: "",
      imageUrls: [], //Agregando images URLS[] NO SE revieta el, new note con el imageGallery.
      date: new Date().getTime()
  };
  

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`)) //referencia al documento, (donde lo qiuiero insertar), esta importacion es de firbase
    const setDocResp = await setDoc(newDoc, newNote);
    // console.log( {newDoc, setDocResp});

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote)); // esta la accion y requiere el payload uqe es el newNote
    dispatch(setActiveNote(newNote));  //activa la nota, viene del authSlice

  }

}

export const startLoadingNotes = () => {  //lo voy a llamar en useCheckAuth
  return async (dispatch, getState) => {
    const { uid } = getState().auth;  //para grabar en firebase, vamos a opupar el uid del usuario
    if (!uid) throw new Error('el UID del usuario no existe');

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes)); //se manda el pyload)
  }
}



export const startSaveNote = () => {
  return async (dispatch, getState) => {  //uso el url de la nota que quiero act

    dispatch(setSaving());

    const { uid } = getState().auth;  //para grabar en firebase, vamos a opupar el uid del usuario
    const { active: note } = getState().journal; //en la nota activa viene el id, (remobre de la nota activa)

    const noteToFireStore = { ...note };//nota que voy a mandar a grabar 
    delete noteToFireStore.id; //elimina el id de note
    // console.log( noteToFireStore);

    //referencia al documento, al uqe quiero actualizar, se toma el id de la nota
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`); //en note se toma de active.note . linea 53
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));   //viene del journalSlice,, esa es la nota actualizada 
  }
}


//hacer una peticion http, voy a llegar a un enpoint

export const startUpLoadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());//el setSaving va a Bloquear los botones y va a poner mi app en un estado de carga

    await fileUpload(files[0]); //regresa una promesa, me sube imagenes simultaneamente, el archivo que se esta iteranso el fileUploar

    const fileUploadPromises = [];  // (disparan en secuencia) este arreglo tiene todas las promesas que voy a disparar
    for (const file of files) {  //promise.all dispara las promesas y cuando las resuellve me muestra la respuesta
      fileUploadPromises.push( fileUpload(file)) // le digo al arreglo de promesas que las almacene en el fileUpload
    }
    const photosUrl= await Promise.all ( fileUploadPromises);  //(este es mi arreglo de imagenes)para disparar.  usa el promire.all. cuando el await reuelve, voy a tener un nuevo arreglo con la resolucion de las promesas 
    //console.log (photosUrl); //esto es lo que voy a terminar mandando a la nota
    dispatch(setPhotosToActiveNote( photosUrl) );
  }

}

//se va a importar en noteViews
 export const startDeletingNote = () =>{
   return async( dispatch, getState) => {  //se ocupa la informaacion de la nota activa y del usuario activo

    const { uid } = getState().auth;
    const { active: note } = getState().journal;
        // console.log({ uid, note});

     //construir la referencia al documento para que le llegue a firebase,, el url. esta implementcion es propia de firebase
    const docRef = doc( FirebaseDB, `${uid}/journal/notes/${ note.id}`); //en note se toma de active.note . linea 53

    await deleteDoc( docRef); //para elimiar la nota

    dispatch (delelteNoteById( note.id ));//limpiarla del store, note.id para quitar la nota activa y del arreglo de las notas
  }

}



/*firebaseDB proviene de firestore y se encuentra en config.js
  el segundo valor tiene el uid del usuario autenticay y asi se hace la referencia al firestore
*/

/* en la parte de reglas de firestore de la pag, ajustar para que me deje  pasar las peticiones  si ya estoy autenticado..  allow read, write: if request.auth !==null;
con la configuracion de las reglas se puedes da o quetar permisos al usuario para que puedan o no grabar la informacion
en este punto firebase genera el uid unico ylas notas con la informacion del objeto que se le dp
*/

// JS: promise.all = sirve para disparar un monton de funciones con promesas o fn, que cuando son resueltas entonces voy a tener la respuesta, de las promesas, la fn debe tener todas las promesas que van a ser disparadas
