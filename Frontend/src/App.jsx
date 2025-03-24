import AllTask from "./pages/AllTask"
import Home from "./pages/Home"

import {  Route, Routes, useNavigate} from "react-router-dom"
import ImporatantTask from "./pages/ImporatantTask"
import CompleteTask from "./pages/CompleteTask"
import IncompleteTask from "./pages/IncompleteTask"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import { authActions } from "./store/auth"
function App() {
  const navigate  = useNavigate()
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state)=>state.auth.isLoggedIn);
  // console.log(isLogged);

useEffect(()=>{

  if(localStorage.getItem("id") && localStorage.getItem("token")){
    dispatch(authActions.login());
  }
 else if(isLoggedin === false){
  navigate("/signup")
}
},[])
  

  return (
    <>
      
     <div className="bg-gray-900 text-white p-2 h-screen relative "> 

 
       <Routes>

        <Route exact path="/" element={<Home/>}>
        <Route  index element={<AllTask/>}/>
        <Route path="/importantTask"  element={<ImporatantTask/>}/>
        <Route  path="/completeTask" element={<CompleteTask/>}/>
        <Route  path="/incompleteTask" element={<IncompleteTask/>}/>
        


        </Route>

       <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>


       </Routes>


    </div> 
    </>
  )
}

export default App
 