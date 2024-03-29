// Hooks React
import { useState } from "react";
// Hooks owns
import usePregunta from "./hooks/Pregunta";
// components
import { Body } from "./componentes/Body";
import { Head }  from "./componentes/Head";
import { Input } from "./componentes/Input";
import  VisibleInvicible from "./componentes/VisibleInvicible";

function App() {
  const [visible, setVisible] = useState("invisible");
  const[botonvisible, setBotonVisible]= useState('visible')
  const[pregunta, setPregunta]=useState("")
  const{enviar, mensaje, respondendo} =usePregunta({pregunta})
  const handleChanged=(e:React.FormEvent<HTMLInputElement>)=>{
    setPregunta(e.currentTarget.value)
  }
  const handleClick=()=>{
    if (visible==='visible'){
      setVisible('invisible')
      setBotonVisible('visible')
    }
    else{
      setVisible('visible')
      setBotonVisible('invisible')
    }
  }
  return (
    <>
      <div
        className={`${visible} h-full w-full md:container bg-[#0c2342]  md:h-[83%] border md:w-[400px] absolute z-20 md:right-10 md:rounded-xl md:mt-2 font-roboto text-sm`}>
        <Head 
          handleClick={handleClick}
        />
        <Body 
          mensaje={mensaje} 
          respondiendo={respondendo}
        /> 
        <Input 
          handleChanged={handleChanged}
          enviar={enviar}
        />
      </div>
      <VisibleInvicible 
        handleClick={handleClick}
        visible={botonvisible}
      />      
    </>
  );
}

export default App;
