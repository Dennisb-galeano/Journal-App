
// import { MailOutline } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView } from '../view/NothingSelectedView'
import { NoteView } from '../view/NoteView'

export const JournalPage = () => {
  return (
    <>
      <JournalLayout>

        {/* <Typography align='center'>Adipisicing aute consequat ea laboris adipisicing consequat duis ad sint adipisicing dolore non anim ullamco. Aliquip duis ea ut ullamco laborum. Enim eu eiusmod tempor occaecat sunt non. </Typography>  texto de relleno con loren ipsum, ctrl+shift+p */}
       <NothingSelectedView/>  {/*  cuando no hay una nota seleccionada se va a mostrar este componente  */}

      {/* NoteView */}
      {/* <NoteView/> */}

      <IconButton
        size='large'
        sx={{color: 'white', 
        backgroundColor: 'error.main',
        ':hover': {backgroundColor: 'error.main', opacity: 0.9}, // error.main es el color del error pricipal, este se definio en el purpleTheme.js. gracias al sx podemos acceder a ese color
        position: 'fixed',
        right: 50,
        bottom: 50
      }}
      
      >
        <AddOutlined sx={{ fontSize:30}} />  {/* icono de MUI + dentro del boton */}

      </IconButton>





      </JournalLayout>

    </>
  )

}



/* las paginas deben usar el componente de Typography... del MUI 
 - este por defecto es un parrafp <p>
 - se pueden importar iconos y diferete materiales
 -   <MailOutline/> este componente tiene una imagen
 */