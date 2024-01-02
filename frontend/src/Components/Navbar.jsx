import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextApi";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";

const Navbar = () => {
  const { logout,authState } = useContext(AuthContext);
  const [dropdown,setDropdown]=useState("pending");
  const [flag,setFlag]=useState(false);
  const [task,setTask]=useState("");
  const [render,setRender]=useState(false);

  useEffect(()=>{
    setRender(!render);
  },[authState]);

  const handleCreate = () => {
    setFlag(true) 
  };
  const handleAdd=async()=>{
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/create`,{
          name:authState.name,
          email:authState.email,
          task
        },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })

        console.log("task Added");
      } catch (error) {
        console.log("Add Failed || Error:"+error)
      }
        
  }

  return (
    <div
      style={{
        width: "100%",
        height: "20%",
        display: "flex",
        flexDirection: "row",
      }}
    >{authState.name?authState.name:"TaskManager"}
      <div id="inner">        
        {authState.isAuth? <button onClick={logout}>logout</button>
         && <button onClick={handleCreate}>
          Create+
        </button>  
        :
        <Link to={"/login"}>Login</Link> && <Link to={"/signup"}>Register</Link>
      }
        
        
                 
      </div>
      {flag && <div id='create'>
      <input type="String" placeholder="Enter Task" onChange={(e)=>{
        setTask(e.target.value);
      }}></input>
      
      <select id="dropdown" value={dropdown} onChange={(e)=>{
        setDropdown(e.target.value);
      }}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
      </select>
      <button onClick={()=>{
        setFlag(false)
      }}>Close</button>
      <button onClick={handleAdd}>Add</button>      
      </div>
    }
      
    </div>
  );
};

export default Navbar;
