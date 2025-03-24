import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";

const InputData = ({input,setInput, fetch, updatedData, setUpdateDate}) => {

  const [data, setData] = useState({title:"", desc:""})

  useEffect(()=>{
setData({title: updatedData.title, desc: updatedData.desc})
  },[updatedData])

  const headers = { 
    authorization :`Bearer ${localStorage.getItem("token")}`
  };
  const change = (e)=>{
    const {name, value} = e.target;
    setData({...data, [name]: value})
  }

  const submitData = async()=>{
  if(data.title === "" || data.desc ===""){
    alert("All fields are required")
  }else {
    const res = await axios.post("http://localhost:1000/api/v2/create-task",data,{
     headers
    })
    console.log("res: ", res.data.data);
    fetch();
    setData({title:"", desc:""}) 
    // setInput(res.data)
   
    setInput("hidden")
    
  }
  }
  const updateTask = async()=>{
    if(data.title === "" || data.desc ===""){
      alert("All fields are required")
    }else {
      const res = await axios.put(`http://localhost:1000/api/v2/update-task/${updatedData.id}`,data,{
       headers
      })
      console.log("res: ", res.data.data);
      fetch();
      setUpdateDate({
        id:"",
        title:"",
        desc:""
      })
     
      setInput("hidden")
      
    }
    
  }

  return (
   <>
   <div className={`${input} fixed top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}></div>
   <div className={`${input} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}>
   
    <div className='w-2/6 bg-gray-900 p-4 rounded ' >
    <div className='flex justify-end '>

   <button className='text-2xl' onClick={()=>{
    setInput("hidden");
    setData({
      title:"",
      desc:"",
    });
    setUpdateDate({
      id:"",
      title:"",
      desc:""
    })
   }} >
    <RxCross2 />
    </button>
    </div>
    <input type="text" placeholder='Title' name='title'
     className='p-3 rounded py-2 w-full bg-gray-700  my-3'  value={data.title} onChange={change}/>


     <textarea  name="desc" id="" rows="10" cols="30" placeholder='Description'
       className='p-3 rounded py-2 w-full  bg-gray-700 my-3 ' value={data.desc} onChange={change}></textarea>
{updatedData.id ==="" ? 
       <button
        className='px-3 py-2 bg-blue-400 font-semibold rounded text-black text-xl cursor-pointer'
         onClick={submitData}>
          Submit</button> : <button
        className='px-3 py-2 bg-blue-400 font-semibold rounded text-black text-xl cursor-pointer'
         onClick={updateTask}>
          Update</button> }

    </div>
    </div>

   </>
  )
}

export default InputData
 