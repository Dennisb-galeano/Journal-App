
// barra lateral

import { TurnedInNot } from "@mui/icons-material";
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";


export const SideBar = ({drawerWidth}) => {
  return (

    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth}, flexShrink: { sm: 0}  }}
    >
      <Drawer 
        variant='permanent' // ó temporary para ocultar o mostrar condicionalmente
        open  //cuando tengo una propiedad en React que siempre va a mantenerse en true, no es necesaria la aclaracion "open={true}"
        sx={{
          display: {xs: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
        }}
      >


        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Encito Precioso 
          </Typography>
        </Toolbar>

        <Divider/> {/* es igual que el hr */}


          <List>   {/* crea una lista y se puede hacer scroll*/}
        {
           ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
               <ListItem key={text} disablePadding>

                <ListItemButton>  {/* permite hacer click en el boton */}
                   <ListItemIcon>  {/* permite la entrada de los iconos */}
                     <TurnedInNot /> {/* iconos */}

                   </ListItemIcon>
                   <Grid container>
                     <ListItemText primary={text} />   {/* primary, secondary son tipos de texto, el texto lo recibe del.map */}
                     <ListItemText secondary={'Ex minim esse nisi anim eu ex laborum consequat tempor adipisicing cillum do ut consequat.'} />    {/*  ctrl +shift + p  lorem*/}
                   </Grid>

                 </ListItemButton>

               </ListItem>

             ))

           }
         </List>


      </Drawer>
      
    </Box>

    )
}

//en el sx, se mesclan sas y estilos, y con el '&' como propiedad computada, se le añade a esa clase el MuiDrawer... y se le pueden especificar mas propiedades

