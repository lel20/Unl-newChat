import { useState } from "react";
import { Body } from "./componentes/Body";
import  Head  from "./componentes/Head";
import { Input } from "./componentes/Input";
import  VisibleInvicible from "./componentes/VisibleInvicible";
function App() {
  const [visible, setVisible] = useState("invisible");
  const[botonvisible, setBotonVisible]= useState('visible')
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
        className={`${visible} h-full md:container bg-[#0c2342]  md:h-[400px] md:w-[400px] fixed md:right-10 md:rounded-xl mt-2 font-roboto text-sm`}
      >
        <Head 
          handleClick={handleClick}
          visible={botonvisible} 
        />
        <Body />
        <Input />
      </div>
      <VisibleInvicible 
        handleClick={handleClick}
        visible={botonvisible}
      />
    </>
  );
}

export default App;
