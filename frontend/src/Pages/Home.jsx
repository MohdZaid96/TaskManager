import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContextApi'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios"

const Home = () => {
  const {authState}=useContext(AuthContext);
  const [data,setData]=useState([]);
  var [role,setRole]=useState("");
  const [dropdown,setDropdown]=useState("");
  const [flag,setFlag]=useState(false);



  const handledata=async()=>{
    try {
      const res=await axios.get(`${process.env.REACT_APP_API_URL}/tasks`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(res)
      setData(res.data.data);
      setRole(res.data.role);
    } catch (error) {
      console.log(error)
    }
    

  }
  const handleDropdown=async (val,_id)=>{
    try {
      const res=await axios.put(`${process.env.REACT_APP_API_URL}/updateTask/${_id}`,{
          status:val
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(res.msg)
      setDropdown(val);
      setFlag(!flag);
      console.log("Updation completed")
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    handledata();
  },[flag])
  
  return (
    <div id="tasks">
      <table>
      <thead>
        <tr>
          {role == 'admin' && <th>Email</th>}
          <th>Tasks</th>
          <th>Timestamp</th>
          <th>Status</th>
        </tr>  
      </thead>
      <tbody>
        {data?.map((ele)=>(<tr>
          {role == 'admin' && <td>{ele.email}</td>}
          <td>{ele.task}</td>
          <td>{ele.updatedAt}</td>
          <td>
          <select id="dropdown" value={ele.status} onChange={(e)=>{
            handleDropdown(e.target.value,ele._id)
          }}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
          </select>
          </td>
          </tr>))}
        </tbody>
      </table>
    </div>
  )
}

export default Home