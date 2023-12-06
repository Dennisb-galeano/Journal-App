import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"

import { ImageGalery } from "../components/ImageGalery"
import { useForm } from "../../hooks/useForm"
import { useSelector } from "react-redux"
import { useMemo } from "react"


//este componente tiene la infomacion del formulario, se usa la nota activa para mostrarla en el journal

export const NoteView = () => {

  //tomar la nota activa del estado de mi Store. este me muestra el estado inicial de mi nota
  const { active: note } = useSelector(state => state.journal); //se cambia el nombre a a note, de las notas activas

  const { body, title, date, onInputChange, formState } = useForm(note); //la nota se va a mandar al useForm, estos campos los voy a usar dentro de los campos como el value.. de cada espaacio

  const dateString = useMemo( () => {   //esta fn
    const newdate = new Date( date ); //el date esta en la nota
    return newdate.toUTCString();  //el metodo toUTC convierte una fecha en una cadena, utilizando la zona horaria UTC

  }, [date])  //dependencia, 


  return (

    <Grid
      container
      direction='row'
      justifyContent='space-between'
      sx={{ mb: 1 }}
      className="animate__animated animate_fadeIn animate_slower"

    >
      <Grid item>
         <Typography fontSize={39} fontWeight='light'> { dateString}</Typography>  {/*muestra la fecha en la que esta creada la nota */}
      </Grid>

      <Grid item>
        <Button color="primary" sx={{ padding: 2 }} >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />  {/*este es el Icomo de guardar  */}
          Guardar
        </Button>
      </Grid>

      <Grid container>
         <TextField  /* espacio titulo nota en journal */
          type="text"
          variant="filled"  // se ve color gris
          fullWidth      // toma todo el ancho posible
          placeholder="Ingrese un titulo"
          label="Titulo"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={ onInputChange}
        />


        <TextField /* espacio body (cuadro de notas) en journal */
          type="text"
          variant="filled"  // se ve color gris
          fullWidth      // toma todo el ancho posible
          multiline  // no permite que se desborde el texto, pasa a la siguiente linea
          placeholder="que sucedio en el dia de hoy?"
          minRows={5} //alto del recuadro
          name="body"
          value={body}
          onChange={ onInputChange}
        />

      </Grid>
      {/* galeria de imagenes */}
      <ImageGalery />



    </Grid>
  )
}



//box es como un div
//grid permite definir elementos internamente y por defecto ayuda a organizar mejor uqe un box