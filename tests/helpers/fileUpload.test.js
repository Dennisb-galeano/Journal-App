/* 1. desc = snippet para descripcion del test {
    2. test"snippet"
}

*/

import { fileUpload } from "../../src/helpers/fileUpload";


describe('pruebas en fileUpload "carga de archivos" ', () => {

  test('debe de subir el archivo correctamebte a cloudinary', async() => { 

    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Gran_Sabana_paisaje_1.jpg/800px-Gran_Sabana_paisaje_1.jpg';
    const resp = await fetch( imageUrl);
    const blob = await resp.blob();

    const file = new File([blob], 'paisaje.jpg');
    const url = await fileUpload( file);
    expect (typeof url).toBe( 'string');
   });

   
 });

 //descarga la imagen, la sube a cloudinary y este le responde.
 //el el tablero de cloudinary ya estan las iagenes, sube una en cada test  