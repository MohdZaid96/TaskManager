import React from 'react'
import { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContextApi'


const Signup = () => {const {authState,setAuthState}=useContext(AuthContext)
const [email,setEmail]=useState("");
const [name,setName]=useState("");
const [password,setPassword]=useState("");
const [password2,setPassword2]=useState("");

const navigate=useNavigate();
const handleSignup=async()=>{
    try {
      if(password===password2){
        const res=await axios.post(`${process.env.REACT_APP_API_URL}/signup`,{
        email,
        password,
        name
      })
      console.log(res)      
      console.log("SignUp Sucess")
      navigate('/login');
    }else{
      alert("Passwords UNMATCHED");
      console.log("Password UNMATCHED")
    }

    } catch (error) {
      console.log(error);
    }
      
}

return (
  <div>Login
    <input type="text" placeholder='Name' required onChange={(e)=>{
      setName(e.target.value)
    }}/>
    <input type="text" placeholder='Email' required onChange={(e)=>{
      setEmail(e.target.value)
    }}/>

    <input type="password" placeholder='Password' required onChange={(e)=>{
      setPassword(e.target.value)
    }}/>
    <input type="password" placeholder='Change Password' required onChange={(e)=>{
      setPassword2(e.target.value)
    }}/>
    <button onClick={handleSignup}>Signup</button>
  </div>
)
}



export default Signup