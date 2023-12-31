
//crea el diseño

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'; //para que no hayan conflictos al haber dos link, se le va colocar un "alias"
import { Grid, TextField, Typography, Button, Link, Alert } from "@mui/material";

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';



// el objeto del form lo puedo hacer afuera y llamarlo como primer arg, es igual que enviar el objeto
const formData = {
  displayName: '',
  email: '',
  password: '',
}

//voy a mandar mis validaciones al use form, para determinar si el email esta ok o mal
// la primera posicion de mi arreglo es la fn que lo va a evaluar  , y la segunda el mensaje de error si NO se cumple la condicion,, arreglo de dos valores pares de valores
//voy a pasar esta const al use form ,,
const formValidations = {
  displayName: [(value) => value.length > 2, 'El nombre es Obligatorio'],
  email: [(value) => value.includes('@'), 'el correo debe tener @'],   //esta propiedad pregunta, si tiene el @, si NO, entonces va el mensaje de error, dentro de un arreglo, se va a mandar una fn para evaluarlo, vamos a rener el value de lo que la persona esta escribiendo => tomo el value y pregunto si.incluye el '@'
  password: [(value) => value.length > 6, 'la contraseña debe tener mas de 6 caracteres.'],
}


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false); //este state lo voy a llamar cuando se postee el formulario, me mantiene el estado para cuando envie el formulario si no hay nada en el,  me aparece el error en loscampos paraa que la persona complete elcampo

  const { status, errorMessage } = useSelector(state => state.auth); //usa el error message. voy a desesrtuct. voy a ocupar algo que viene del useSelector (tomo el state => del state me interesa buscar el state.auth) de ahi {desestructuro el stats y .. }
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);  // blouquea el boton de registro mientras se determina el estado de autenticacion, este hook va a memorizar el valor uqe viene del estatus si es igual a checjong [dependencia]

  //el useForm me pide como primer argumento { como se va a ver mi formulario, "formData"}
  //este hook me va a encargar de todas las validaciones, si es valido el formulario cuando pase todas las validaciones "correo valido, consraseña,nombre..." o no 
  const { formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);

  // console.log(displayNameValid);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return; //si no es valido..return.. me devuele en rojo

    dispatch(startCreatingUserWithEmailPassword(formState));
  }


  return (
    <AuthLayout title="Crear Cuenta">
      {/* <h1>FormValid: {isFormValid ? 'formato ok' : 'Incorrecto'}   </h1> */}

      <form
        onSubmit={onSubmit}      
        className="animate__animated animate_fadeIn animate_faster"
>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField //me permite escribir
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth //permite tomar TODO el ancho posible
              name="displayName"
              value={displayName}
              onChange={onInputChange} //esra fn se creo con el use form
              error={!!displayNameValid && formSubmitted} //propiedad MUI error,pone rojo el texto, se va a mostrar si NO es valido  LA DOBLE NEGACION LO CONVIERTE EN UN BOOLEANO
              helperText={displayNameValid} // propiedad me coloca mensaje

            />

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField //me permite escribir
                label="correo"
                type="email"
                placeholder="correo@encito.com"
                fullWidth //permite tomar TODO el ancho posible
                name="email"
                value={email}
                onChange={onInputChange} //esra fn se creo con el use form
                error={!!emailValid && formSubmitted} //propiedad MUI error,pone rohoel texto, se va a mostrar si NO es valido, LA DOBLE NEGACION LO CONVIERTE EN UN BOOLEANO
                helperText={emailValid}


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
                onChange={onInputChange} //esra fn se creo con el use form
                error={!!passwordValid && formSubmitted} //propiedad MUI error,pone rohoel texto, se va a mostrar si NO es valido
                helperText={passwordValid}

              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
              <Grid
                item
                xs={12}
                display={!!errorMessage ? '' : 'none'}
              >

                <Alert severity='error'>  {errorMessage} </Alert>    {/*MUI */}
              </Grid>

              <Grid item xs={12}>
                <Button
                  disabled={isCheckingAuthentication} //disabled si esta revisando la autenticacion
                  type='submit' //el boton debe tener este type para que al dar clock dispare el formulario
                  variant="contained"
                  fullWidth>
                  Crear Cuenta
                </Button>
              </Grid>


            </Grid>


          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>ya tienes una cuenta?  </Typography>
            <Link component={RouterLink} to="/auth/login" color='inherit'>
              Iniciar Sesion
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

