import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useSelector } from 'react-redux';
function Signup() {
  const history = useNavigate()
  const isLoggedin = useSelector((state)=>state.auth.isLoggedIn);

  if(isLoggedin === true){
    history("/")
  }
 
  const [Data, setData] = useState({username:"",email:"",  password:""})
 
  const change = (e)=>{
    const {name, value} = e.target;
    setData({...Data, [name]: value})
  }
  const submit = async(e)=>{
    e.preventDefault()
    try {
      
      if(Data.username ===""|| Data.email ==="" || Data.password ===""){
        alert("All fields are required")
      }else {
      const res =   await axios.post("http://localhost:1000/api/v1/signin", Data)
      console.log("response from signup:", res);
      
      }
      setData({username:"",email:"",  password:""})
      alert(response.data.message)
      history("/login")
      
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded bg-gray-800'>
      <div className='text-2xl font-semibold'>Signup</div>
      <input type="username"
       placeholder='username'
    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
    value={Data.username}
     name='username' onChange={change} />

     <input type="email"
       placeholder='Email'
    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
    value={Data.email}
     name='email' onChange={change} />

<input type="password"
       placeholder='password'
    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
    value={Data.password}
     name='password' onChange={change} />


    <div className='w-full flex items-center justify-between '>
   <button className='bg-blue-400 py-2 px-4 font-semibold text-black rounded cursor-pointer ' onClick={submit}>
    Signup
    </button>
    <Link to="/login" className='text-gray-400 hover:text-gray-200'>
    Already having an account ? Login here</Link>
   </div>
     </div>
    </div>
  )
}

export default Signup
