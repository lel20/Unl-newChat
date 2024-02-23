import React from "react";
import UNL from '/Logo-UNL.svg'
export const Head = () => {
  return (
    <>
      <div className="flex w-full items-center p-5 text-slate-50 gap-x-4">
        <img className="w-16 rounded-full" src={UNL} alt="Logo Chat" />
        <div className="flex w-full flex-col justify-start">
          <h2 className="">Posgrados Chat</h2>
          <p>Asistente de posgrados</p>
        </div>
      </div>
    </>
  );
};
