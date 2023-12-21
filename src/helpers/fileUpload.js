
//peticion a clodinary

export const fileUpload = async (file) => { //el file se va a mandar como argumento

  if (!file) throw new Error ('No tenemos ningún archivo a subir');

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dvdxqe5ku/upload'; //esta parte dvdxqe5ku es en nombre del Product environment cloud name, de cloudinary, con el cual se hace la peticion de http.,, link probado en postman,peticion post (si recibe) las imagens
  
  
  //construir el form data, igual que en postman
  const formData = new FormData(); //fn de JS. no hay que importar 
  formData.append ('upload_preset', 'React-JournalApp'); //append: adjuntar, LOS PARES DE VALORES SE OBTIENEN desde POSTMAN 
  formData.append ('file', file); //este file lo espera cloudinayy - LOS PARES DE VALORES SE OBTIENEN desde POSTMAN para la creacion de la peticion

  try {
    const resp = await fetch( cloudUrl, {
      method: 'POST', //ACLARAR QUE ES UN METODO POST
      body: formData
    });

    // console.log(resp);
    if(!resp.ok) throw new Error ('No se logro cargar la imagen')//si hay un error, si todo sale bien, entonces se va a serializar el body
      const cloudResp = await resp.json();
      // console.log({cloudResp});

      return cloudResp.secure_url //esta esperando el secure_url uqe me muestra postman en la imagen ya recibida
    
  } catch (error) {
    console.log(error);
    throw new Error( error.message);
  }

}
