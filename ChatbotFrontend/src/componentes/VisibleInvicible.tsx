import Chat from '/public/chat.svg'
export default function VisibleInvicible(props:{visible:string, handleClick:()=>void}) {
  
    return (
    <div className={`${props.visible} md:visible fixed h-[70px] w-[70px]  rounded-full flex items-center justify-center bottom-1 right-5 `}>
      <button className="w-full h-full" onClick={props.handleClick}>
        <img className='rounded-full' src={Chat} alt="chat" />
      </button>
    </div>
  );
}
