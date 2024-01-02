
//crea el diseño
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'; //para que no hayan conflictos al haber dos link, se le va colocar un "alias"
import { Alert, Button, Grid,Link,TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks/useForm';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: 'encitoPrecioso@gmail.com',
  password: '123456',
}


export const LoginPage = () => {

  const {status, errorMessage } = useSelector( state => state.auth ); //obtener lo uqe me interesa del store, voy a obtener el state y de ahi el auth, de ese objeto del auth quiero el {status}, cin el status puedo usar un unseMemo para para uqe me regrese un booleano. se crea la const isAuthenticating que va a guardar la infomraon del estado.. y esta const, se usa en los botones del login

  const dispatch = useDispatch();

  //el useForm me pide como primer argumento { como se va a ver mi formulario }
  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo( () => status === 'checking' , [status]);  //voy a memorizar el resultado del status que obtengo desde useSelector, si el status es EXACTAMENTE IGUAL al 'checking', eso va a regresar un booleano. y la dependencia [vaa a ser el estatus] "si el estatus cambia, se va a obtener un nuevo valor, si no" no va a volver a cambiar
 
  const onSubmit = (event) => { //el on submit, trata de autenticar con usuario y contraseña / tareas asincronas, se crea file thunks
    event.preventDefault();

    console.log({ email, password });
    dispatch( startLoginWithEmailPassword ({ email, password})); //accion que se va a llamar laa loguerse, va a esperar el emil y la cont
  }


  const onGoogleSignIn = () => { //esta fn, debe disparar la auth de google / tareas asincronas, se crea file thunks
    console.log("onGoogleSignIn");
    dispatch( startGoogleSignIn() );
  }


  return (
    <AuthLayout title="Login">

      <form onSubmit={onSubmit} className="animate__animated animate_fadeIn animate_faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField //me permite escribir
              label="correo"
              type="email"
              placeholder="correo@encito.com"
              fullWidth //permite tomar TODO el ancho posible
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>


            <Grid item xs={12} sx={{ mt: 2 }} >
              <TextField //me permite escribir
                label="contraseña"
                type="password"
                placeholder="constraseña"
                fullWidth //permite tomar TODO el ancho posible
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>

            <Grid 
              container
              display={ !!errorMessage ? '': 'none' }
              sx={{ mt: 1 }}>
              <Grid 
                  item 
                  xs={ 12 }
                >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
              <Grid item xs={12} sm={6}>
                <Button
                disabled = { isAuthenticating} // isAuth.. va a estar deshabilitado si se encuentra eutenticando
                 type="submit"
                variant="contained" 
                fullWidth
                >
                  Login
                </Button>
              </Grid>


              <Grid item xs={12} sm={6}>
                <Button
                 disabled = { isAuthenticating}
                  variant="contained"
                  fullWidth
                  onClick={onGoogleSignIn}
                >

                  <Google />
                  <Typography sx={{ ml: 1 }}>Google </Typography>

                </Button>
              </Grid>

            </Grid>


          

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una Cuenta
            </Link>
          </Grid>

        </Grid>

      </form>

    </AuthLayout>

  )
}


//el grid es como un div pero con mas propuiedades o atributos
//el primary.main esta definido en el purpleTheme


//en tamaños como xs.. tambien trabaja como en bootstrap

