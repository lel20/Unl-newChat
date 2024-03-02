import Send from "/send.svg";
export const Input = (props:{handleChanged:React.ChangeEventHandler<HTMLInputElement>, handleClick:()=>void}) => {
   return ( 
    <>
      <div className="text-white w-full border h-12 flex justify-between items-center absolute bottom-0 ">
        <input 
          onChange={props.handleChanged} 
          name="pregunta" 
          className="h-full w-4/5 text-blue-950 px-4"
          type="text"
          placeholder="Su pregunta?...."
        />
        <button onClick={props.handleClick}  className="h-full w-[20%] hover:scale-105 flex bg-white justify-center items-center">
          <img src={Send} alt="Logo Send" />
        </button>
      </div>
    </>
  );
};
