

//cuando no hay una nota seleccionada se va a mostrar este componente 

import { Grid, Typography } from "@mui/material"
import { StarOutlined } from "@mui/icons-material"



export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3 }}
    >

      <Grid item xs={ 12 }>
        <StarOutlined sx={{ fontSize: 100, color: "white" }}/>
      </Grid>

      <Grid item xs={ 12 }>
        <Typography color='white' variant="h5"> Selecciona o crea una entrada</Typography>
      </Grid>
    </Grid>

    )
}



/*
pagina: cubre toda la pantalla desde elpunto de vista dl usuario
  layout: cascaron y el estilo de la pagina 
    view: la vista que va a cambiar dentro del contenido de la pagina


    el padding me lo esta dando el journalLayout
*/