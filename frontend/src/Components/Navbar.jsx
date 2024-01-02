import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextApi";
import { useState } from "react";
import axios from "axios"

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [dropdown,setDropdown]=useState("pending");
  const [flag,setFlag]=useState(false);
  const handleCreate = () => {
    setFlag(!flag) 

  };

  return (
    <div
      style={{
        width: "100%",
        height: "20%",
        display: "flex",
        flexDirection: "row",
      }}
    >Taskbar
      <div id="inner">        
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Register</Link>
        <button onClick={logout}>logout</button>
        <button onClick={handleCreate}>
          Create+
        </button>          
      </div>
      {flag && <div id='create'>
      <input type="String" placeholder="Enter Task" ></input>
      
      <select id="dropdown" value={dropdown} onChange={(e)=>{
        setDropdown(e.target.value);
      }}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
      </select>
      <button>Close</button>
      <button>Add</button>      
      </div>
    }
      
    </div>
  );
};

export default Navbar;
