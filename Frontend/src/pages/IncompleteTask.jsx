import React from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';
import { useEffect, useState } from 'react';
function IncompleteTask() {

  const [data, setData]  = useState()
  const headers = { 
    authorization :`Bearer ${localStorage.getItem("token")}`
  };
  // console.log(headers)
  
  const fetch = async()=>{
    const response=  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v2/get-incomplete-tasks`,{
       headers
     })
    //  console.log("response", response)
     setData(response.data.data);
   }
   
   useEffect(()=>{
      
      fetch(); 
      },[])
  
      console.log("data comming from :", data);

      
    
  return (
    <div>
      <Cards home={"false"} data={data} fetch = {fetch}/>
    </div>
  )
}

export default IncompleteTask
