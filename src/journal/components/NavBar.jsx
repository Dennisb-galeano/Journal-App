import { useDispatch } from "react-redux";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";

import { startLogout } from "../../store/auth/thunks";


export const NavBar = ({ drawerWidth = 240 }) => {


  const dispatch = useDispatch();


  const onLogout = () => {
    dispatch (startLogout() ); //el dispatch de una accion, del auth creada en los thunks, startLogout
  }

  return (

    <AppBar
      position="fixed"
      sx={{     //xs configuracion de estilo
        width: { sm: `calc(100% - ${drawerWidth}px)` },  //el width en pantalla sm puedo hacer el `calculouqe se =100% y le puedos restar el drawer o le ancho`
        ml: { sm: `${drawerWidth} px` }   //el ml, en pantallas sm va a tener el valor del drawerwith "240px"
      }}
    >
      <Toolbar>  {/*barra de tareas */}
        <IconButton
          color='inherit'
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          
          <MenuOutlined />
        </IconButton>

        <Grid container direction='row' justifyContent='space-between' alignItems='center'>   {/*esta linea separa los hijos  */}
          <Typography variant='h6' noWrap component='div'> JournalApp</Typography>

          <IconButton 
          color="error"
          onClick={ onLogout }
          >
            <LogoutOutlined />   {/*boton logout - *flecha a la derecha* */}
          </IconButton>
        </Grid>

      </Toolbar>
    </AppBar>
  )
}

{/* <AppBar> </AppBar> */ }
