

// su contenido va a ser lo que yo sé, que necesito reutilizar , ej { los grid y typografy del login page}

import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({children, title=""}) => {
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
        className="box-shadow"
        xs={ 3 }   //xs tamaño de la caja
        sx={{ 
          width: {md: 450}, //este aplica solo para ajustar pantallas medianas
          backgroundColor: 'white', 
          padding: 3,
          borderRadius: 2 }} // sx extraestilo

      >
        <Typography variant="h5" sx={{ mb: 1 }}> {title} </Typography>

        {/* children , los hijos del componente AuthLayout van aca */}

        {children}

      </Grid>
    </Grid>
  )
}


//se desestructuran los children del componente y se colocan... en *children*
//se manda el title como una property al componente,, va como un string vacio
//este es el layout !- TODAS las paginas a las que les ponga el layout va a tener los grid y los children del componente