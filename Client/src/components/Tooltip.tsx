import { useState } from "react";
import Lottie from "lottie-react";
import animationData from '@/assets/tasks.json'
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useNavigate } from "react-router-dom";

const Tooltip = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const navigate  = useNavigate();
  
  const handleClick = () =>{
    setOpenTask((prev) => !prev);
  };

  return (
    <>
    <button
    onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="bg-[#c1d7d2] text-[#4c887e] border hover:bg-[rgba(0,0,0,0.2)] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  m-2 flex justify-center items-center"
      >
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
      </button>
      
      {showTooltip && (
        <div
          className="absolute z-60 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 tooltip"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          Click to add task
          <div className="tooltip-arrow" />
        </div>
      )}

<div className="flex justify-center">
    <div
        className={`${
          openTask ? "block" : "hidden"
        } absolute z-50 bg-[#e3eae9] m-6 p-8 rounded-lg shadow-lg sm:ml-80 w-full sm:w-[40vw] sm:bottom-0  sm:h-full`}
      >
        <div className="flex justify-between">
        <div className="text-xl font-semibold" >
          Task
          </div>
          <button
             onClick={handleClick}
           >
             <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="40px" fill="#434343"><path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/></svg>
           </button>
        </div>
        <div className="text-left flex justify-between w-full">
            
        <form className="w-4/5 ">
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
    <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none block w-full py-1" required onChange={(e)=>{
      settitle(e.target.value);
    }} />
  </div>
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
    <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none block w-full py-1 rounded-sm" required onChange={(e)=>{
      setDescription(e.target.value);
    }} />
  </div>
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium text-gray-900">Priority</label>
    <input type="text" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none block w-full py-1" required onChange={(e)=>{
      setPriority(e.target.value);
    }} />
  </div>
  <button type="submit" onClick={async()=>{
    setLoading(true)
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/todos/create`,{
        title,
        description,
        priority,
        userId : localStorage.getItem('userId')
      },{
        headers:{
          Authorization : localStorage.getItem("token"),
        },
      })
        console.log(response.data.todos.id);
   navigate(`/task`)
    } catch (error) {
      console.error("error while adding todo ",error)
    } finally{
      setLoading(false);
    }
  }} className="text-white bg-[#1a9e64] hover:bg-slate-500 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">{loading ? "Adding..." : "Add Todo"}</button>
</form>
<Lottie className="sm:block hidden"
        loop={true} 
        autoplay={true} 
        animationData={animationData} 
      />

        </div>
      </div>
    </div>
    </>
  )
}

export default Tooltip