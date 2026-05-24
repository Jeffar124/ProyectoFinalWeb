import { useState } from 'react'
import './App.css'
import Registro from './Pages/Registro/Registro'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import InicioSesion from './Pages/InicioSesion/InicioSesion.jsx'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/iniciosesion' element={<InicioSesion />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
