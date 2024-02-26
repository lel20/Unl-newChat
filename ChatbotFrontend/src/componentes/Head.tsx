
import UNL from '/Logo-UNL.svg'
import Arrown from '/arrown.svg'
export default function Head(props:{handleClick:()=>void,visible:string}){
  {props.visible.replace('invisible','visible')}
  return (
    <>
      <div className="flex w-full h-[20%] items-center p-5 text-slate-50 gap-x-4">
        <img className="w-16 rounded-full" src={UNL} alt="Logo Chat" />
        <div className="flex w-full flex-col justify-start">
          <h2 className="">Posgrados Chat</h2>
          <p>Asistente de posgrados</p>
        </div>
         <button onClick={props.handleClick}><img src={Arrown} alt="arrown" /></button>
      </div>
    </>
  );
}
