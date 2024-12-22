import Navbar from "@/components/Navbar"
import LoginImage from '@/assets/login.jpg'
import { Link, useNavigate } from "react-router-dom";
import { LoginInput } from "@ajinkya66/todo-common";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";

const Login = () => {
  const [loginInputs, setLoginInputs] = useState<LoginInput>({
    email : "",
    password : "",
  })
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  async function sendRequest(e: React.FormEvent){
    e.preventDefault();

    if (!loginInputs.email || !loginInputs.password) {
      console.error("All fields are required.");
      return; 
    }
    setLoading(true);
    
     try {
     const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`,loginInputs);
     console.log(response.data.jwt)
     const jwt = response.data.jwt;
     const userId = response.data.userId
     localStorage.setItem('token',jwt);
     localStorage.setItem('userId',userId);
     console.log(userId)
     navigate('/task');
    } catch (error) {
      console.error("error while sending login request",error)
    }
    
   }
  return (
    <div className="h-screen overflow-hidden">
      <Navbar/>
      <div className="grid grid-cols-1 sm:grid-cols-2 place-content-center" >
      <div className="flex justify-center items-center">
          <div className="text-5xl titillium-web-black text-center mt-14">Login.
            <p className="text-sm pt-2">Don't have an Account <Link to={'/signup'} > Signup?</Link></p>
          <img className="hidden sm:block" src={LoginImage} alt="image" />
          </div>

        </div>
        <div className="bg-[#e3eae9] p-10 m-10 rounded-lg md:w-[40vw] h-[44vh] mt-4 sm:mt-20 ">
        <form className="max-w-sm mx-auto">
  <div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
    <input type="email" className="bg-[#c1d7d2] border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2 focus:outline-none" placeholder="johndoe@gmail.com" required onChange={(e)=>{
      setLoginInputs({
       ...loginInputs,
       email:e.target.value
      })
    }} />
  </div>
  <div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
    <input type="password" className="bg-[#c1d7d2] border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2 focus:outline-none" placeholder="123456" required 
    onChange={(e)=>{
      setLoginInputs({
        ...loginInputs,
        password: e.target.value
      })
    }}
    />
  </div>
  <button type="submit" className="text-white bg-[#4d887f] hover:bg-[#527b75] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={sendRequest}>
    {
      loading ? <span>Loading...</span> : <>Login</>
    }
  </button>
</form>
        </div>
      </div>
      
    </div>
  )
}

export default Login