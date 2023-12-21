import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SaveOutlined, UploadFileRounded, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGalery } from "../components/ImageGalery";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startSaveNote, startUpLoadingFiles } from "../../store/journal/thunks";

//este componente tiene la infomacion del formulario, se usa la nota activa para mostrarla en el journal

export const NoteView = () => {

  const dispatch = useDispatch();
  //tomar la nota activa del estado de mi Store. este me muestra el estado inicial de mi nota
  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal); //se cambia el nombre a a note, de las notas activas

  const { body, title, date, onInputChange, formState } = useForm(note); //la nota se va a mandar al useForm, estos campos los voy a usar dentro de los campos como el value.. de cada espaacio

  const dateString = useMemo(() => {   //esta fn

    const newdate = new Date(date); //el date esta en la nota
    return newdate.toUTCString();  //el metodo toUTC convierte una fecha en una cadena, utilizando la zona horaria UTC
  }, [date])  //dependencia, 

  const fileInputRef = useRef();  //va a tener la referencia de nuestro HTML al imput,, simulacion de un onCLik para el boton del file


  useEffect(() => {
    dispatch(setActiveNote(formState)); //fn del journalSlice. el set va a activar la nota (el formState, tiene todas las propiedades de la nota , y actualizadas)
  }, [formState]) //cuando el fomState cambie,se va a despachar una nueva accion

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]) //cuando el mesageSaved cambie se va a disparr 



  const onSaveNote = () => {
    dispatch(startSaveNote());
  }

  const onFileInputChange = ({ target }) => {
    if(target.files === 0 ) return; //si el ususario no ingresa nada .. return
      
      dispatch ( startUpLoadingFiles (target.files ));//si carga con exito se va a mandar el dispatch

    // se crea un Helper para que me suba los archivos, es fileUpload.js, sube un arcivo a la vez;
  }

  return (

    <Grid
      container
      direction='row'
      justifyContent='space-between'
      sx={{ mb: 1 }}
      className="animate__animated animate_fadeIn animate_slower"

    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'> {dateString}</Typography>  {/*muestra la fecha en la que esta creada la nota */}
      </Grid>

      <Grid item>

        <input
          type="file" //ete type me crea un input para poder seleccionar un file
          multiple //me permite seleccionar multiples archivos, lo selec para que pe permita disparaar el on change
          ref={ fileInputRef }
          onChange={onFileInputChange}
          style={{display:'none'}} 
        />

        <IconButton /* boton de cargar los files */
        color="primary"
        disabled={isSaving }
        onClick={ () => fileInputRef.current.click()} //voy a mandar una fn que vaya a buscar el fileInputRef.xxx.xxx... que va a hacer la simulacion del onClick sobre el elemento superrior donde esta el useRef
        >

          <UploadOutlined/>
        </IconButton>
        <Button   /*Boton GUARDAR! cuando toque este boton, se va a disparar una accion que va a empezar el proceso de grabacion */
          disabled={isSaving} // se deshabilita el boton mientras esta guardando
          onClick={onSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >

          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />  {/*este es el Icomo de guardar  */}
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField  /* espacio titulo nota en journal */
          type="text"
          variant="filled"  // se ve color gris
          fullWidth      // toma todo el ancho posible
          placeholder="Ingrese un titulo"
          label="Titulo"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />


        <TextField /* espacio body (cuadro de notas) en journal */
          type="text"
          variant="filled"  // se ve color gris
          fullWidth      // toma todo el ancho posible
          multiline  // no permite que se desborde el texto, pasa a la siguiente linea
          placeholder="que sucedio en el dia de hoy?"
          minRows={5} //alto del recuadro
          name="body"
          value={body}
          onChange={onInputChange}
        />

      </Grid>
      {/* galeria de imagenes, aca esta la nota activa, esa nota que esta unsando es la active:notes del useSelector. se desestructuran las props(IMAGE) de imageGalery  */}
      <ImageGalery images={note.imageUrls} />



    </Grid>
  )
}



//box es como un div
//grid permite definir elementos internamente y por defecto ayuda a organizar mejor uqe un box