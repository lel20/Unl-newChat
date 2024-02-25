interface ControlPreguntas{
  mensaje:string
}
import { useState } from "react"

export default function usePregunta(props:{valor:boolean, pregunta:string}){
  const [enviarPregunta, setEnviarPregunta]=useState<ControlPreguntas[]>([])
  const handleClick1=()=>{
    if (props.valor){
      const nevaPregunta:ControlPreguntas={mensaje:props.pregunta}
      setEnviarPregunta([...enviarPregunta, nevaPregunta])
    }
    else{
      return
    }

  }
 return {
  handleClick1,
  enviarPregunta,
}
 
}