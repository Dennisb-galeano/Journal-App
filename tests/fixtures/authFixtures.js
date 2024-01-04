// en este folder "ficturs " estará la data que siempre va a estar ahi para hacer las pruebas
//feculitando las pruebas,


//los estados se traen"copian" del authSlice
export const initialState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null, 
  errorMessage: null,
}

export const authenticatedState = {
  status: 'authenticated',
  uid: '123ABC',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.user.jpg', 
  errorMessage: null,
}


export const notauthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null, 
  errorMessage: null,
}



export const demoUser ={
  uid: 'ABC123',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.user.jpg', 

}