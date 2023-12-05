// se crea codigo para traer las notas y usarla en los thunks en startLoadingNotes

import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../fireBase/config";

export const loadNotes = async (uid ='') => {
  if( !uid ) throw new Error('el UID del usuario no existe');

  //quiero traer mis documentos del firebase
  const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` ) //collection voy a traer la coleccion de fireBase (pide la instancia de mi db"FirebaseDB ya viene config, y el path para llegar a la coleccion que me interesa"") validar la coleccion en pag firebase
  const docs = await getDocs( collectionRef); //pide el query

  const notes=[];
  docs.forEach ( doc => {
    notes.push({id: doc.id, ...doc.data() });
  });
  console.log(notes);
  return notes;
}