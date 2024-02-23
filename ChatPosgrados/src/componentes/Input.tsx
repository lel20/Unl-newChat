import Send from "/send.svg";
export const Input = () => {
  return (
    <>
      <div className="text-white w-full border h-10 bottom-0 absolute flex justify-between items-center">
        <input
          className="h-full w-4/5 text-blue-950 px-4"
          type="text"
          placeholder="Su pregunta?...."
        />
        <button className="h-full w-[20%] hover:scale-105 flex justify-center">
          <img src={Send} alt="Logo Send" />
        </button>
      </div>
    </>
  );
};
