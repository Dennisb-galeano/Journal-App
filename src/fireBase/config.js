

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA68v8RAbiApmgsdOK4XbeVmr9TdEXuw-Q",
  authDomain: "react-journalapp-a8dd8.firebaseapp.com",
  projectId: "react-journalapp-a8dd8",
  storageBucket: "react-journalapp-a8dd8.appspot.com",
  messagingSenderId: "487856633352",
  appId: "1:487856633352:web:9406007857c571051603bd"
};

// Initialize Firebase - son los objetos que necesito para poder ineractuar con firebase
export const FirebaseApp = initializeApp(firebaseConfig); // parte de autenticacion

export const FirebaseAuth =  getAuth( FirebaseApp); //funcionalidades de autenticacion

export const firebaseDB = getFirestore (FirebaseApp ) //configuracion de mi base de datos




//OBTENEMOS LA PARte DE LA AUTENTICACION con el getAuth: se importa el getAuth de firebase,
//se va a trabajar con cloudFirestore, como base de datos.

//se cambian las configuraiones, creando un providers.js aca vana a estar dotod mis proveedores de autenticacion