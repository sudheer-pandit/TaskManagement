import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import axios from 'axios';
function Cards({home, setInput, data, fetch, setUpdatedData}) {
    

    const headers = { 
      authorization :`Bearer ${localStorage.getItem("token")}`
    };
    const handleCompleteTask =async(id)=>{
  try{
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/v2/update-complete-task/${id}`,
      {},
      {headers}
     )
    //  console.log("cards:", res);
     alert(res.data.message)
     fetch();
    
  } catch (error) {
    console.log(error)
  }
    }
    
    const handleImportant =async(id)=>{
      try {
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/v2/update-imp-task/${id}`,
          {},
          {headers}
         )
        //  console.log("cards:", res);
         fetch();
        
      } catch (error) {
        console.log(error)
      }
        }

        const deleteTask =async(id)=>{
          try {
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/v2/delete-task/${id}`,
              
             { headers}
             )
            //  console.log("cards:", res);
            alert(res.data.message)
             fetch();
            
          } catch (error) {
            console.log(error)
          }
            }
    
            const handleUpdate = async(id, title, desc)=>{
                setInput("fixed")
                setUpdatedData({id: id, title:title, desc:desc})
            }

  return (
    <div className='grid grid-cols-4 gap-4 p-4  '>
      {data && data.map((items, i)=>( 
        <div key={i} className='flex flex-col justify-between  bg-gray-800 rounded-sm p-4'>
        <div  >
          <h2 className='text-xl font-semibold'>{items.title}</h2>
          <p className='text-gray-300 my-2'>{items.desc}</p>
          </div>
             <div className='mt-4 w-full flex  items-center ' >

              <button className={ 
                `${items.complete ===false ? "bg-red-700":"bg-green-700"}
                 p-2 rounded cursor-pointer w-3/6  `} onClick={()=>handleCompleteTask(items._id)}>
                {items.complete=== true ? "Completed" : "In Completed"}
                </button>
              <div className='text-white  p-2 w-3/6 text-2xl font-semibold flex justify-around'>
                 <button onClick={()=>handleImportant(items._id)} >
                  {items.important === false ? <IoMdHeart />: <FaHeart  className='text-red-500' />}
                  
                </button>
              {
                home !== "false" && (
                  <button> <FaRegEdit onClick={()=> handleUpdate(items._id, items.title, items.desc)}  />
                </button>  
                )
              }
                <button><MdDelete  onClick={()=>deleteTask(items._id)} />
                </button>
              </div>
              </div>
        </div>
      ))}
{home =="true" &&( 
  <button className='flex flex-col justify-between  items-center bg-gray-800 text-gray-300 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition:all duration-300 '
   onClick={()=>setInput("fixed")}>
  <IoIosAddCircle className='text-5xl' />
        <h2 className='text-2xl mt-4 '>Add Task</h2>
       </button>
       ) }
    </div>
  )
}

export default Cards
