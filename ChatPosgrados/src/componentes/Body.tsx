import { useEffect, useRef } from "react";
interface Props {
  recibirPregunta: string[];
}
export const Body: React.FC<Props>= ({ recibirPregunta}) => {
  const mesajeReferencia= useRef<HTMLDivElement>(null)
  const scrollBotton=()=>{
    if(mesajeReferencia.current){
      mesajeReferencia.current.scrollIntoView({behavior:'smooth'})
    }
  }
  useEffect(()=>{
    scrollBotton();
  },[recibirPregunta])
  return (
    <>
      <div className="overflow-auto  h-[75%] md:h-[75%] bg-white rounded-t-2xl py-4 flex flex-col p-5">
        <div className="w-full flex justify-start mb-4">
          <div className="ps-4 py-2 bg-slate-200 max-w-[80%] rounded-e-xl rounded-bl-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
            minima vero. Id tempora temporibus voluptas natus facilis earum!
            Rerum consectetur debitis, amet porro sequi impedit corporis ut
            quasi ab corrupti. .
          </div>
        </div>

        {recibirPregunta.map((re, index) => (
          re &&
          <div ref={mesajeReferencia} key={index} className="w-full flex justify-end mb-4">
            <div className=" right-0 rounded-s-xl rounded-tr-xl bg-[#0c2342] max-w-[80%] p-2 py-2 text-gray-200">
              {re}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
