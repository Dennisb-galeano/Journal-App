/* 1. test
   2. importar mi sujeto de pruebas*/

import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/fireBase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";


// import { signInWithGoogle } from "../../../src/fireBase/providers"; //para el mock se copio el path de aca

jest.mock('../../../src/fireBase/providers') //mock: que evitan la necesidad de dependencias externas en la ejmoecución de los tests

describe('pruebas en AuthThunks', () => {

  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe de invocar checkingCredentials ', async () => {

    await checkingAuthentication()(dispatch); //1ero( llamado de la fn), 2do(valor de retorno de la fn)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

  });

  // probar el googleSignIn, se le va a crear un mock

  test('startGoogleSignIn debe de llamar checkingCredentials y login si todo sale ok', async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData); //funcion de jest, ya es un mock por las exportaciones uqe tiene el path del mock

    //thunk
    await startGoogleSignIn() (dispatch);
      
    expect( dispatch).toHaveBeenCalledWith( checkingCredentials());
    expect( dispatch).toHaveBeenCalledWith( login( loginData));
    });



    test('startGoogleSignIn debe de llamar checkingCredentials y logout si hay un error', async () => {
      const loginData = { ok: false, errorMessage: 'un error en google'};
      await signInWithGoogle.mockResolvedValue(loginData); //funcion de jest, ya es un mock por las exportaciones uqe tiene el path del mock

      //thunk
      await startGoogleSignIn() (dispatch);

      expect( dispatch).toHaveBeenCalledWith( checkingCredentials());
      expect( dispatch).toHaveBeenCalledWith( logout( loginData.errorMessage));

    });


    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - si todo sale ok', async() => { 
      const loginData= { ok: true, demoUser};
      const formData ={email: demoUser.email, password:'123456' };

      await loginWithEmailPassword.mockResolvedValue( loginData);

      await startLoginWithEmailPassword( formData) (dispatch);

      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials());
      expect( dispatch ).toHaveBeenCalledWith(login(loginData) );

     });


     test('startLogout - debe de llamar logoutFirebase, clearNotesLogout y logout', async() => { 
      
      await startLogout()(dispatch);

      expect(logoutFirebase).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
      expect(dispatch).toHaveBeenCalledWith( logout() );

      });
      
});


/* checkingAuthentication regresa una fn, que el dispatch se dispare cuando re realice la accion respectiva
Para realizar pruebas con los thunks
   1. se debe realizar un mock
   2. se debe configurar jest.config para que ignore los modulos especificados (transformIgnorePatterns: [],p)

*/