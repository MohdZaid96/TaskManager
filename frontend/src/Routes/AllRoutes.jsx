import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../Pages/Home'
import SignUp from '../Pages/Signup'
import Login from "../Pages/Login"

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
  )
}

export default AllRoutes