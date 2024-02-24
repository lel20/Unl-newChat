import { useState } from "react";
import Send from "/send.svg";
import usePregunta from "../hooks/Pregunta";
export const Input = () => {
  
  const [pregunta, setPregunta]= useState("")
  const handleChanged=(e:React.FormEvent<HTMLInputElement>)=>{
    setPregunta(e.currentTarget.value)
  }
  return (
    <>
      <div className="text-white w-full border h-12 flex justify-between items-center bottom-0 absolute md:static ">
        <input onChange={handleChanged} name="pregunta" 
          className="h-full w-4/5 text-blue-950 px-4"
          type="text"
          placeholder="Su pregunta?...."
        />
        <button className="h-full w-[20%] hover:scale-105 flex bg-white justify-center items-center">
          <img src={Send} alt="Logo Send" />
        </button>
      </div>
    </>
  );
};
