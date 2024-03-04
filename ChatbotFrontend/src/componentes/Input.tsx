import Send from "/send.svg";
interface InputProps {
  handleChanged: React.ChangeEventHandler<HTMLInputElement>;
  enviar: () => void;
}
export const Input:React.FC<InputProps> = ({handleChanged,enviar}) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      if (e.currentTarget.value.trim() !== "") {
        enviar(); // Se presiona el botón solo al darle a la tecla enter y caundo el campo de texto no este vacio
        e.currentTarget.value = ""; // Limpiar el campo de entrada
      }
    }
  };
  const handleClick = () => {
   //Accdemos al campo de entrada (input)
    const inputElement = document.getElementsByName("pregunta")[0] as HTMLInputElement;
    //Si el campo de entrada no esta vacio
    if (inputElement.value!=''){
      //Presionamos el botón de envio
      enviar();
    //Vaciamos el campo de entrada (input)
    inputElement.value = "";
  }
};
  return (
    <>
      <div className="text-white w-full border h-12 flex justify-between items-center absolute bottom-0 ">
        <input
          onChange={handleChanged}
          onKeyDown={handleKeyDown}
          name="pregunta"
          className="h-full w-4/5 text-blue-950 px-4"
          type="text"
          placeholder="Su pregunta?...."
        />
        <button
          onClick={handleClick}
          className="h-full w-[20%] hover:scale-105 flex bg-white justify-center items-center">
          <img src={Send} alt="Logo Send" />
        </button>
      </div>
    </>
  );
};
