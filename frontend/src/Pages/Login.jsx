import React from 'react'
import { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContextApi';


const Login = () => {
  const {authState,setAuthState}=useContext(AuthContext)
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const handleLogin=async()=>{
      try {
          const res=await axios.post(`${process.env.REACT_APP_API_URL}/login`,{
          email,
          password
        })
        console.log(res.data.token)
        localStorage.setItem("token",res.data.token)
        console.log("Login Sucess")
        setAuthState({
          ...authState,
          isAuth:true,
          name:res.data.name,
          email
        })
        navigate('/');

      } catch (error) {

        console.log(error);
      }
        
  }

  return (
    <div>Login
      <input type="text" placeholder='Email' required onChange={(e)=>{
        setEmail(e.target.value)
      }}/>
      <input type="password" placeholder='Password' required onChange={(e)=>{
        setPassword(e.target.value)
      }}/>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login