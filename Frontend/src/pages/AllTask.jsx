import React, { useState ,useEffect } from 'react'
import Cards from '../components/Home/Cards'
import { IoIosAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from "axios"
function AllTask() {
  const [input, setInput] = useState("hidden");
      const [data, setData] = useState();
      const [updatedData, setUpdatedData]  = useState({
        id:"",
        title:"",
        desc:"",
      })
const headers = { 
  authorization :`Bearer ${localStorage.getItem("token")}`
};
// console.log(headers)
const fetch = async()=>{
  const response=  await axios.get("http://localhost:1000/api/v2/get-all-tasks",{
     headers
   })
  //  console.log("response", response)
   setData(response.data.data);
 }
  useEffect(()=>{
   
    
    fetch();
    },[])

  
  return (
   <>
    <div className='text-white'>
      <div className='w-full flex  justify-end px-4 py-2 cursor-pointer'> 
        <button onClick={()=>setInput("fixed")} className='cursor-pointer' >
          <IoIosAddCircle className='text-4xl cursor-pointer text-gray-500 hover:text-gray-100 transition-all duration-300 hover:cursor-pointer'  /></button>
         </div>
      {data && <Cards home={"true"} setUpdatedData= {setUpdatedData} fetch={fetch}  setInput={setInput} data={data}/>}
    </div>
    <InputData input={input} setUpdateDate = {setUpdatedData} fetch={fetch} updatedData= {updatedData}  setInput={setInput}/>
   </>
  )
}

export default AllTask
