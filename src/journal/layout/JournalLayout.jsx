import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";


const drawerWidth = 280;  //barra Lateral, del mismo tamaño siempre


export const JournalLayout = ({ children }) => {
  return (

    <Box 
    sx={{ display: 'flex' }}
    className="animate__animated animate_fadeIn animate_faster"

    >  {/* box es como un div */}

      {/* Navbar - drawerWith"es el ANCHO que se le va a dar al sidebar"*/}
      <NavBar drawerWidth={drawerWidth} />

      {/* sidebar "es como el navbar pero la barra es vertical"*/}
      <SideBar drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >

        {/* Toolbar me ajusta el texto bajo el navbar**/}
        <Toolbar />

        {children}

      </Box>

    </Box>

  )
}
