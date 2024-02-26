export default function VisibleInvicible(props:{visible:string, handleClick:()=>void}) {
  
    return (
    <div className={`${props.visible} md:visible fixed h-[72px] w-[72px] bg-amber-500 rounded-full flex items-center justify-center bottom-1 right-5`}>
      <button className="w-full h-full" onClick={props.handleClick}></button>
    </div>
  );
}
