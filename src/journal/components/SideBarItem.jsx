//se pasa el list item del Sidebar.jsx para alibianar un poco el codigo del componente SideBar

import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { useDispatch } from "react-redux";


export const SideBarItem = ({ title='' , body, id, date, imageUrls=[] }) => {

  const dispatch = useDispatch();
  
  const onClickNote = () =>{   //activa la nota de la barra lateral
    dispatch (setActiveNote ({title, body, id, date, imageUrls  }) ) //info de 
     
  }

    //hook para que el texto en las notas no se pase de largo
    const newTitle = useMemo( () => {
      return title.length > 17
        ? title.substring(0,17)  + '...'
        : title;

    }, [title]) //la [dependencia], si el titulo cambia, retorna el memo


    return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>  {/*ListItemButton= Componente de MUI, me permite crear un boton en una lista  el onClickNote activa la nota, llamando el titulo, id,, etc.  */}
        <ListItemIcon>  {/* permite la entrada de los iconos */}
           <TurnedInNot /> {/*iconos de boton */}

        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />   {/* primary, secondary son tipos de texto, el texto lo recibe del.map */}
          <ListItemText secondary={ body} />  
        </Grid>
      </ListItemButton>
    </ListItem>

  )
}
