// Hooks
import {  useState } from "react";
// Interfaces
export interface Mensaje {
  texto: string;
  emisor: "chat" | "usuario";
}
// SedDefine una interfaz Mensaje. La interfaz tiene dos propiedades: texto, y emisor, que puede ser "chat" o "usuario". 

// Se define un hook personalizado que recibe una prop
export default function usePregunta({pregunta}:{pregunta:string}) {
  //se declara un estado para almacenar los mensajes del chat y del usuario
  const [mensaje, setMensaje] = useState<Mensaje[]>([]);
  //Se declara un estado para controlar el funcionamiento de un spnner hasta que el chat de una respueta (es como un loading)
  const [respondendo, setRespondiendo]=useState(false)
  //Se crea una función ansincrona que se ejecutal al pursar el boton enviar de chat
  const enviar = async () => {
    //si existe la pregunta se ejcuta el if
    if (pregunta.trim()!='') {
      console.log(pregunta)
      //cambiamos el estado a true para se se muestre el spinner
      setRespondiendo(true)
      //creamos unu objeto que represente la pregunta del usuario
        const nuevaPregunta: Mensaje = {
        texto: pregunta,
        emisor: "usuario",
      };
      //se agrega la pregunta al estado mensaje.Se utiliza una función de actualización para garantizar que no se pierdan los mensajes anteriores
      setMensaje((prevMensajes) => [...prevMensajes, nuevaPregunta]);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: nuevaPregunta }),
      };
      const respuesta = await fetch(
        "http://192.168.43.11:8000/pregunta/",
        requestOptions
      );
      const dato = await respuesta.json();
      const newRespuesta: Mensaje = { texto: dato.mensaje, emisor: "chat" };
      setMensaje((prevMensajes) => [...prevMensajes, newRespuesta]);
      setRespondiendo(false);
      //si no hay pregunta se hace un return
    } else {
      return;
    }
  };
  return {
    enviar,
    mensaje,
    respondendo
  };
}
