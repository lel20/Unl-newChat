import {  useState } from "react";

export interface Mensaje {
  texto: string;
  emisor: "chat" | "usuario";
}

export default function usePregunta(props: {
  valor: boolean;
  pregunta: string;
}) {
  const [mensaje, setMensaje] = useState<Mensaje[]>([]);
  const [respondendo, setRespondiendo]=useState(true)
  const handleClick1 = async () => {
    if (props.valor) {
      setRespondiendo(true)
      const nuevaPregunta: Mensaje = {
        texto: props.pregunta,
        emisor: "usuario",
      };
      setMensaje((prevMensajes) => [...prevMensajes, nuevaPregunta]);
      if (nuevaPregunta.texto.trim() !== "") {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mensaje: nuevaPregunta }),
        };
        
        const respuesta = await fetch(
          "http://127.0.0.1:8000/pregunta/",
          requestOptions
        );
        const dato = await respuesta.json();
        const newRespuesta: Mensaje = { texto: dato.mensaje, emisor: "chat" };
        setMensaje((prevMensajes) => [...prevMensajes, newRespuesta]);
        setRespondiendo(false);
        
      }
    } else {
      return;
    }
  };
  

  return {
    handleClick1,
    mensaje,
    respondendo
  };
}
