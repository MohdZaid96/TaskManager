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
const [validEmail,setValidEmail]=useState(true);


const navigate=useNavigate();
const handleSignup=async()=>{
    const emailRegex=/^[a-zA-Z0-9.!#%&]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]{2,8}$/

    if(emailRegex.test(email)){
      setValidEmail(true);
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
    }else{
      setValidEmail(false);
      alert("Email Invalid")
    }
    
      
}

return (
  <div>Signup
    <input type="text" placeholder='Name' required onChange={(e)=>{
      setName(e.target.value)
    }}/>
    <input type="text" placeholder='Email' required onChange={(e)=>{
      setEmail(e.target.value)
    }}/>
    {!validEmail && <p>
      Local Part (Before the @ symbol):
      Alphanumeric characters (a-z, A-Z, 0-9)
      Special characters: ! # $ % & ' * + / = ? ^ _ `  |~
      Period (.) - Allowed, but not as the first or last character, and not consecutively.
      
      Domain Part (After the @ symbol):  
      Alphanumeric characters (a-z, A-Z, 0-9)
      Hyphen (-) - Allowed, but not as the first or last character.
      Period (.) - Allowed, but not as the first or last character, and not consecutively.
      
      Top-Level Domain (TLD):
      Alphanumeric characters (a-z, A-Z, 0-9)
      </p> }

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