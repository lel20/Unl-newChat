import { Body } from './componentes/Body'
import { Head } from './componentes/Head'
import { Input } from "./componentes/Input";
function App() {


  return (
    <div className='h-full w-screen md:container bg-[#0c2342]  md:h-[500px] md:w-[500px] fixed md:right-10 md:rounded-xl'>
      <Head />
      <Body />
     <Input />
    </div>
  )
}

export default App
