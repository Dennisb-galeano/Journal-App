
//crea el diseño
import { Link as RouterLink } from 'react-router-dom'; //para que no hayan conflictos al haber dos link, se le va colocar un "alias"
import { Google } from "@mui/icons-material";
import { Grid, TextField, Typography, Button, Link } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
  return (
    <AuthLayout title="login">

      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField //me permite escribir
              label="correo"
              type="email"
              placeholder="correo@encito.com"
              fullWidth //permite tomar TODO el ancho posible
            />


            <Grid item xs={12} sx={{ mt: 2 }} >
              <TextField //me permite escribir
                label="contraseña"
                type="password"
                placeholder="constraseña"
                fullWidth //permite tomar TODO el ancho posible
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth>

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

