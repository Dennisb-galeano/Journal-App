
//crea el diseño
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'; //para que no hayan conflictos al haber dos link, se le va colocar un "alias"
import { Google } from "@mui/icons-material";
import { Grid, TextField, Typography, Button, Link } from "@mui/material";

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSigIn } from '../../store/auth/thunks';

export const LoginPage = () => {

  const dispatch = useDispatch();

  //el useForm me pide como primer argumento { como se va a ver mi formulario }
  const { email, password, onInputChange } = useForm({
    email: 'encitoPrecioso@gmail.com',
    password: '123456',
  });


  const onSubmit = (event) => { //el on submit, trata de autenticar con usuario y contraseña / tareas asincronas, se crea file thunks
    event.preventDefault();

    console.log({ email, password });
    dispatch(checkingAuthentication() );
  }

  const onGoogleSignIn = () => { //esta fn, debe disparar la auth de google / tareas asincronas, se crea file thunks
    console.log("onGoogleSignIn");
    dispatch( startGoogleSigIn() );
  }


  return (
    <AuthLayout title="login">

      <form onSubmit={onSubmit}>
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

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
              <Grid item xs={12} sm={6}>
                <Button type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={onGoogleSignIn}
                >

                  <Google />
                  <Typography sx={{ ml: 1 }}>Google </Typography>

                </Button>
              </Grid>

            </Grid>


          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} to="/auth/register" color='inherit'>
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

