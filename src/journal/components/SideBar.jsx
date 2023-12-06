
// barra lateral 
import { useSelector } from "react-redux";

import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { SideBarItem } from "./SideBarItem";


export const SideBar = ({drawerWidth}) => {


const {displayName} = useSelector( state => state.auth ); //useSelector obtiene informacion del store
const { notes} = useSelector (state => state.journal );

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
            {displayName} 
          </Typography>
        </Toolbar>

        <Divider/> {/* es igual que el hr */}


          <List>   {/* crea una lista y se puede hacer scroll*/}
        {
           notes.map(note => (
            <SideBarItem key={note.id } {...note}/>

             ))

           }
         </List>


      </Drawer>
      
    </Box>

    )
}

//en el sx, se mesclan sas y estilos, y con el '&' como propiedad computada, se le añade a esa clase el MuiDrawer... y se le pueden especificar mas propiedades

