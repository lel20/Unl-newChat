interface ControlPreguntas {
  mensaje: string;
}
import { useState } from "react";

export default function usePregunta(props: {
  valor: boolean;
  pregunta: string;
}) {
  const [enviarPregunta, setEnviarPregunta] = useState<ControlPreguntas[]>([]);
  const handleClick1 = async() => {
    if (props.valor) {
      const nevaPregunta: ControlPreguntas = { mensaje: props.pregunta };
      setEnviarPregunta([...enviarPregunta, nevaPregunta]);
      if (nevaPregunta.mensaje.trim() !== "") {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mensaje: nevaPregunta })
        };
      await fetch("http://127.0.0.1:8000/pregunta/", requestOptions)
      }
    } else {
      return;
    }
  };
  return {
    handleClick1,
    enviarPregunta,
  };
}
