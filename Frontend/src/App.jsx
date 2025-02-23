import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {


  return (
    <div>
      <Navbar/>
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
