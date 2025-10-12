import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'


function Spinner({path = "login"}) {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

useEffect (()=>{
    const interval = setInterval(()=>{
        setCount((prevcount)=> --prevcount);
    },1000);
    count === 0 && navigate(`/${path}`,{state:location.pathname});
    return ()=>clearInterval(interval);
},[count,navigate,path])

  return (
   <div className="d-flex flex-column justify-content-center align-items-center vh-100">
  <h1 className="text-center mb-3">
    Redirecting to Login page in {count} seconds
  </h1>
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>


  )
}

export default Spinner