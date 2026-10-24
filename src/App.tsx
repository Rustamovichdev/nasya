import type { FC } from "react"

interface Idata{
  id:number;
  title:string
}
const data:Idata[] = [
  {
    id:1,
    title:"novidir-1"
  },
  {
    id:2,
    title:"novidir-2"
  },
  {
    id:3,
    title:"novidir-3"
  }
]
const App:FC = () => {
   return <main>
    {data.map(item => <p key={item.id}>{item.title}</p>)}
   </main>
}
export default App