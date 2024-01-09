/*1. describe
  2. test
*/

import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth/authSlice";
import { notauthenticatedState } from "../../fixtures/authFixtures";
import { startGoogleSignIn } from "../../../src/store/auth/thunks";

const mockstartGoogleSignIn = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockstartGoogleSignIn
}))

const store = configureStore({
  reducer: {
    auth: authSlice.reducer //ese es el que esta en el redux
  },
  preloadedState:{
    auth: notauthenticatedState
  }

});

describe('pruebas en <LoginPage/>', () => { 

  test('debe de mostrar el componente correctamente', () => { 
    
    render(
      <Provider store={store}>
         <MemoryRouter>  {/*proporciona todo lo que necesitamos para poder renderizar SIN MEMORIA */}
             <LoginPage/>
          </MemoryRouter> 
      </Provider>
    );
      
      screen.debug(); //viene de React Dom- es una herramienta útil en la API de la biblioteca de pruebas de React que le permite ver la salida HTML actual de los componentes a medida que desarrolla sus pruebas.


   });
 
    // 1.asegurar que el componente se renderice, como tienen el UI material es mas demorada la prueba
    //  tiene que recibir el store o nunca va a pasar la prueba
    //  hay que proporcionar un reducer que necesito (son los uqe tienen alguna interaccion con el componete uqe quiero renderizar)


   test('boton de google debe de llamar el startGoogleSignIn', () => { 
//el render monta el componente
    render(
      <Provider store={store}>
         <MemoryRouter>  {/*proporciona todo lo que necesitamos para poder renderizar SIN MEMORIA */}
             <LoginPage/>
          </MemoryRouter> 
      </Provider>
    );

    const googleBtn = screen.getByLabelText('google-btn');
    // console.log(googleBtn);
    fireEvent.click(googleBtn);
    expect( mockstartGoogleSignIn ).toHaveBeenCalled();

    });


  });
