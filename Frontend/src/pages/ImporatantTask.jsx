import React, { useState } from 'react'
import Cards from '../components/Home/Cards'
import { useEffect } from 'react';
import axios from 'axios';
function ImporatantTask() {
 const [data, setData]  = useState()
  const headers = { 
    authorization :`Bearer ${localStorage.getItem("token")}`
  };
  // console.log(headers)
 
  const fetch = async()=>{
    const response=  await axios.get("http://localhost:1000/api/v2/get-imp-tasks",{
       headers
     })
    //  console.log("response", response)
     setData(response.data.data);
   }
   
     
   useEffect(()=>{
      fetch();
      },[])
  
      console.log(data);
    
  return (
    <div>
      <Cards home={"false"} data ={data} fetch = {fetch}/>
    </div>
  )
}

export default ImporatantTask
