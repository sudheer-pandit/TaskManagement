import React from 'react'
import { useState } from 'react';
import {useDispatch,useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import {authActions} from "../store/auth"
// require("dotenv").config();


const Login = () => {

  const [Data, setData] = useState({username:"",  password:""})
  const history = useNavigate()
  const dispatch = useDispatch()
  const isLoggedin = ((state)=>state.auth.isLoggedIn);
const user = useSelector((state)=> state.auth.user)

console.log(import.meta.env.VITE_BACKEND_URL);
  
  if(isLoggedin === true){
    history("/")
  }

   const change = (e)=>{
     const {name, value} = e.target;
     setData({...Data, [name]: value})
   }
   const submit = async(e)=>{
     e.preventDefault()
     try {
       
       if(Data.username ===""|| Data.password ===""){ 
         alert("All fields are required")
       }else {
       const res =   await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/login`,
        Data
      );
       console.log("response from login :", res.data.username);
       const user = res.data.username;
       console.log(user)
       setData({username:"",  password:""})
       
        // localStorage.setItem("id", Response.data.id)
        localStorage.setItem("token", res.data.token)
       
        dispatch(authActions.login(user));
        history("/")

       }
      

      
       
     } catch (error) {
       console.log(error)
     }
   }

  return (
    <div className='h-[98vh] flex items-center justify-center'>
    <div className='p-4 w-2/6 rounded bg-gray-800'>
    <div className='text-2xl font-semibold'>Login</div>
    <input type="username"
     placeholder='username'
  className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
  value={Data.username}
   name='username' onChange={change} />
   
<input type="password"
     placeholder='password'
  className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
  value={Data.password}
   name='password' onChange={change}  />

   <div className='w-full flex items-center justify-between '>
   <button className='bg-blue-400 py-2 px-4 font-semibold text-black rounded cursor-pointer ' onClick={submit}>
    Login
    </button>
    <Link to="/signup" className='text-gray-400 hover:text-gray-200'>Not having an account ? Signup here</Link>
   </div>
   
   </div>
  </div>
  )
}

export default Login
