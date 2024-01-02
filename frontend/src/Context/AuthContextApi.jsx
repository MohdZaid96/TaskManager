import React, { useContext, useState } from 'react';
import { createContext } from 'react';

const iniAuth={
    isAuth : false,
    email:"",
    name:""
}

export const AuthContext=createContext();

export const AuthContextApi=({children})=>{
    const [authState,setAuthState]=useState(iniAuth);

    const login=()=>{
        setAuthState({
            ...authState,
            isAuth:true,

        })
    }
    const logout=()=>{
        setAuthState({
            ...authState,
            isAuth:false
            
        })
    }
    return (
        <AuthContext.Provider value={{authState,login,logout,setAuthState}}>
            {children}
        </AuthContext.Provider>
      )
}

