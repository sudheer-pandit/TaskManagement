import React from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';
import { useEffect, useState } from 'react';

function CompleteTask() {
  const [data, setData]  = useState()
  const headers = { 
    authorization :`Bearer ${localStorage.getItem("token")}`
  };
  // console.log(headers)

  const fetch = async()=>{
    const response=  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v2/get-complete-tasks`,{
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
     
    <Cards home={"false"} data ={data} fetch  ={fetch}/>
    </div>
  )
}

export default CompleteTask
