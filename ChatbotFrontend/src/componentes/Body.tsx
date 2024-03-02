import { PulseLoader} from "react-spinners";
import { useEffect, useRef } from "react";
import { Mensaje } from "../hooks/Pregunta";
interface Chat {
  mensaje: Mensaje[]; // Prop mensajes tipificada como un array de objetos Mensaje
  respondiendo: boolean;
}
const estilo = "p-2 py-2 bg-slate-200 max-w-[80%] rounded-e-xl rounded-bl-xl";
export const Body = ({ mensaje, respondiendo }: Chat) => {
  console.log(respondiendo);
  const mesajeReferencia = useRef<HTMLDivElement>(null);
  const scrollBotton = () => {
    if (mesajeReferencia.current) {
      mesajeReferencia.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollBotton();
  }, [mensaje]);
  return (
    <div className="overflow-auto h-[75%] md:h-[75%] bg-white rounded-t-2xl py-4 flex flex-col p-5">
      {mensaje.map((respuesta, index) => (
        <div
          key={index}
          className={`w-full flex justify-${respuesta.emisor === "chat" ? "start" : "end"} mb-4`}
        >
          {respuesta.emisor === "chat" ? (
            <div 
             ref={mesajeReferencia}
             className={estilo}>{respuesta.texto}</div>
          ) : (
            <div
              ref={mesajeReferencia}
              className="right-0 rounded-s-xl rounded-tr-xl bg-[#0c2342] max-w-[80%] p-2 py-2 text-gray-200"
            >
              {respuesta.texto}
            </div>
          )}
        </div>
      ))}
      {mensaje.length > 0 && respondiendo && (
        <div className="py-4 rounded-e-xl rounded-bl-xl">
          <PulseLoader
            color="#364ad6"
            loading
            size={10}
            speedMultiplier={1}
          />
        </div>
      )}
    </div>
  );
};
