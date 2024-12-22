import Navbar from "@/components/Navbar"
import animationData from "@/assets/signup.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import {SignupInput} from '@ajinkya66/todo-common'
import { useState } from "react";
import axios from 'axios'
import { BACKEND_URL } from "@/config";


const Signup = () => {
  const navigate = useNavigate();
   const [signupInput, setSignupInput] = useState<SignupInput>({
    name : "",
    email : "",
    password : ""
   })
   
   const [loading, setLoading] = useState(false)

   async function sendRequest(e: React.FormEvent){
    e.preventDefault();

    if (!signupInput.name || !signupInput.email || !signupInput.password) {
      console.error("All fields are required.");
      return; 
    }
    setLoading(true);
    
     try {
     const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,signupInput);
     console.log(response.data.jwt)
     console.log(response.data.userId)
     const jwt = response.data.jwt;
     localStorage.setItem('token',jwt);
     navigate('/task',{ state: { name: signupInput.name } });
    } catch (error) {
      console.error("error while sending signup request",error)
    }
    
   }
  return (
    <div className="h-screen overflow-hidden">
      <Navbar/>
      <div className="grid grid-cols-1 sm:grid-cols-2 place-content-center" >
        <div className="flex justify-center items-center">
          <div className="text-5xl titillium-web-black text-center mt-14">Signup.
            <p className="text-sm pt-2">Already have an Account <Link to={'/login'} > Login?</Link></p>
          <Lottie
          className="hidden sm:block"
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ height: 400, width: 400 , margin:0}}
            />
          </div>

        </div>
        <div className="bg-[#e3eae9] p-10 m-10 rounded-lg md:w-[40vw] mt-4 sm:mt-20">
        <form className="max-w-sm mx-auto">
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
    <input type="text" className="bg-[#c1d7d2] border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2 focus:outline-none" placeholder="John Doe" required onChange={(e)=>{
      setSignupInput({
        ...signupInput,
        name : e.target.value,
      })
    }} />
  </div>
  <div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
    <input type="email" className="bg-[#c1d7d2] border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2 focus:outline-none" placeholder="johndoe@gmail.com" required onChange={(e)=>{
      setSignupInput({
        ...signupInput,
        email : e.target.value,
      })
    }}/>
  </div>
  <div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
    <input type="password" className="bg-[#c1d7d2] border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2 focus:outline-none" placeholder="123456" required onChange={(e)=>{
      setSignupInput({
        ...signupInput,
        password : e.target.value,
      })
    }} />
  </div>
  <button type="submit" onClick={sendRequest} className="text-white bg-[#4d887f] hover:bg-[#527b75] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
  {loading ? (
                  <span>Loading...</span> 
                ) : (
                  <> Signup </>
                )}

  </button>
</form>
        </div>
      </div>
    </div>
  )
}

export default Signup