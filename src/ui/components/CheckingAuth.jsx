// este componente se va a mostrar en todo momento en la app, cada vez que este cargando la pag, se usa en AppRouter
//se va a mostrar cada vez que el estado se encuente en 'checking'

import { CircularProgress, Grid } from "@mui/material"


export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >

      {/* caja del medio */}

      <Grid item
      justifyContent='center'
      >
        <CircularProgress color='warning' />
        
      </Grid>
    </Grid>
  )
}

