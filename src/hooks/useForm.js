
import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});  //este estado me va a mostrar el mensaje de error, que me diga si hay un error o no. que pueda evaluar el objeto formValidation, para evaluarlo mas facil, se hace con el hook para que re redibuje el estado y se borre

    //se va a disparar cada vez que el formState cambie, se va a llamar el create createValidators
    useEffect(() => {
        createValidators();
    }, [formState]) 

    //si todas las condiciones se cumplen permite continuar..
    const isFormValid = useMemo( () => {  //, el useMemo va a memorizar el valor del isFormValid, este valor solo debe volverse a procesar si cambia el formState.   esta fn va a validar que todos los campos del register page esten correctos para poder avanzar, ( crear cuenta)

        for (const formValue of Object.keys (formValidation)) { //voy a barrer cada una de las opciones del formValidation, y voy a evaluar 
            if (formValidation [formValue] !== null ) return false;    //si, formValid..[en la propiedad formValue]..
        }

        return true; //retorna treu si el formulario es valido
    }, [formValidation])


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    //va a tomar el objeto formValidations y crear un nuevo estado para saber si los imputs son validos o no
    // createValidators, la voy a disparar con el useEffect
    

        //hay que barrer y analizar cada propiedad del objeto de validaciones,el "formValidations" del registerPage
        // el formField es una propiedad JS, ESTOY imprimiendo los nombres de propiedades del formValidations 
    const createValidators = () => {

        const formCheckedValues = {};
            //con el for of.. se barre el objeto
            for (const formField of Object.keys( formValidations )) {  //primer valor "son iteraciones" el segundo es el objeto, object.keys, barre cada uno de las llaves de (  )
                const [ fn, errorMessage ] = formValidations[formField]; //desestructurar la fn de validacion y el errorMessage que vienen del formValidations [vasado en el formFiel], se obtiene la fn y el mensaje de error
                formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage; // si la condicion se cumple del formField(correo, nombre y contraseña ok ), entonces se almecena null, de lo ocntrario manda el error

                // console.log("soy el formField" ,formField );
            } 

            // establecer va a tener el nuevo valor que va a tener el setFormValidation
            setFormValidation( formCheckedValues );
            console.log( formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation, //este  objeto ya tiene todas las propiedades y estas tienen el nombre del campo que le mande y el texto si es un error y un veli si esta ok
        isFormValid,
    }
} 
