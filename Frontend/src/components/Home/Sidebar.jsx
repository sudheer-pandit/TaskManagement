import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';
// import axios from 'axios';
function Sidebar() {
const dispatch = useDispatch();
const history = useNavigate();
const user = useSelector((state)=> state.auth.user)
console.log("user:-", user)
    const data = [
        {title:"All tasks",
            icon: <CgNotes />,
            link:"/"
        },
        {title:"Important tasks",
            icon:<MdLabelImportant />,
            link:"/importantTask"
        },
        {title:"Completed tasks",
            icon:<FaCheckDouble />,
            link:"/completeTask"
        },
        {title:"Incompleted tasks",
            icon:<TbNotebookOff />,
            link:"/incompleteTask"
        },
    ];
    const [Data, setData] = useState();

    const logout = ()=>{
  dispatch(authActions.logout())
  localStorage.clear("token");
 

  history("/signup")
    }


const headers = { 
  authorization :`Bearer ${localStorage.getItem("token")}`
};
// console.log("headers: ", headers)
useEffect(()=>{
const fetch = async()=>{
 const response=  await axios.get("http://localhost:1000/api/v2/get-all-tasks",{
    
    headers

  })
  console.log("response", response)
  setData(response.data.data);
}

fetch();
},[])

Data && console.log(Data)

  return (
   <>
   {Data && (
    <div> 
   <h2 className='text-xl font-semibold'>Task Management System</h2>
     <h4 className='mb-1 text-gray-400'>{user}</h4>
     <hr />
     </div>
   )}
    

     <div>
       {data.map((items,i)=>(
           <Link 

            to={items.link}
            key={i}
           className='my-4 flex items-center gap-4 hover:bg-red-300 p-2 rounded transition:all duration-300' >
            
             {items.icon}

             {items.title} 

           </Link>
       ))}
     </div>
    
    <div>
       <button className='bg-gray-600 w-full p-2 rounded cursor-pointer' onClick={logout}>Log Out</button>
    </div>
   </>
   
 
  )
}

export default Sidebar
