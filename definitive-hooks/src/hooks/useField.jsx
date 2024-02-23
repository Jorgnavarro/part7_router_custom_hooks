import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState([])

    const onChange = (e) => {
        setValue(e.target.value)
    } 

    const elementAtributes = {
        value,
        type,
        onChange
    }


    return [
        elementAtributes,
        setValue
    ]
}

/*
 **En este custom hook, useField, cuando es llamando en donde se consumirá, recibirá por props el type, que a su vez
se enviará en el objeto elementAtributes, que contiene el valor y el evento que controla los cambios en el input
onChange. Para que sea un input controlado, el value debe estar configurado.

En este caso se retorna un array con dos posiciones, la primera contiene todos los elementos que serán consumidos por 
el input que hago uso del custom hooks. En la segunda posición setValue, se usará para que desde la función que 
haga el submit del formulario, se haga el reset del mismo y el input quede vacío

Es importante recordar que en toda función de custom hooks, siempre estarán las funciones auxiliares que generalmente afectarán los estados de nuestra aplicación, con ello descargamos responsabilidad de nuestros componentes al tiempo que reutilizamos funciones en nuestros custom hooks, lo que hace más fácil mantener nuestra aplicación.
 */