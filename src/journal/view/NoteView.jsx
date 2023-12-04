import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"

import { ImageGalery } from "../components/ImageGalery"


export const NoteView = () => {
  return (

    <Grid
      container
      direction='row'
      justifyContent='space-between'
      sx={{ mb: 1 }}
      className="animate__animated animate_fadeIn animate_slower"

    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'> 15 de octubre, 2023</Typography>
      </Grid>

      <Grid item>
        <Button color="primary" sx={{ padding: 2 }} >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />  {/*este es el Icomo de guardar  */}
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"  // se ve color gris
          fullWidth      // toma todo el ancho posible
          placeholder="Ingrese un titulo"
          label="Titulo"
          sx={{ border: 'none', mb: 1 }}
        />


        <TextField
          type="text"
          variant="filled"  // se ve color gris
          fullWidth      // toma todo el ancho posible
          multiline  // no permite que se desborde el texto, pasa a la siguiente linea
          placeholder="que sucedio en el dia de hoy?"
          minRows={5} //alto del recuadro
        />

      </Grid>
      {/* galeria de imagenes */}
      <ImageGalery />



    </Grid>
  )
}



//box es como un div
//grid permite definir elementos internamente y por defecto ayuda a organizar mejor uqe un box