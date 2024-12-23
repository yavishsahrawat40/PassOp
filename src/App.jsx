import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className="pb-96 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">

    <Manager/>
    </div>
   </>
  )
}

export default App
