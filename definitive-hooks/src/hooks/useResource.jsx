import { useState, useEffect } from "react";
import axios from "axios";

export const useResource = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data) {
      axios.get(url).then((response) => {
        setData(response.data);
      });
    } else {
      console.log("Data not found");
    }
  }, [url, data]);

  const create = async (object) => {
    const response = await axios.post(url, object);
    data.concat(response.data);
  };

  return [data, create];
};

/*
Con useResource, estamos creando un custom hook que se comunica con nuestro servidor. Básicamente estamos realizando dos peticiones
La primera en donde obtenemos todos los recursos del servidor y lo almacenamos en el estado "data". 
La segunda petición crea un nuevo recurso, luego de crearlo, lo concatenamos al estado "data", que figura como dependencia del useEffect, que trae todos los recursos, es decir que siempre que se agregue un nuevo recurso, se hará un nuevo llamado al servidor para que traiga todos los datos actualizados, cuando cambie el valor "data".

Retornamos entonces, un array con dos posiciones, la primera con todos los recursos y la segunda con la función que nos permite agregar nuevos recursos.

*/
