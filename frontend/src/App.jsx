import React from 'react'
import {Routes,Route} from "react-router-dom"
import "./App.css";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
    </>
  )
}

export default App
