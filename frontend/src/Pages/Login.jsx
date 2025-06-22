import React from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import google from "../assets/google.png";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { toast } from "react-toastify";
import Loading from '../component/Loading';
import Nav from "../component/Nav";

function Login() {
  let [show, setShow] = useState(false);
   let {serverUrl} = useContext(authDataContext)
   
      let [email,setEmail] = useState("")
      let [password,setPassword] = useState("")
      let {getCurrentUser} = useContext(userDataContext)
      let [loading,setLoading] = useState(false)
  let navigate = useNavigate();

   const handleLogin = async (e) => {
       setLoading(true)
        e.preventDefault()
        try {
            let result = await axios.post(serverUrl + '/api/auth/login',{
                email,password
            },{withCredentials:true})
            console.log(result.data)
            setLoading(false)
            console.log("login successfully")
            toast.success("Login Successfully")
           getCurrentUser()
            navigate("/")
          
            
        } catch (error) {
            console.log(error)
            toast.error("Login Failed")
            
        }
    }


    const googleLogin = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    const user = response.user;
    const name = user.displayName;
    const email = user.email;

    // Optional: get Firebase ID token for extra security
    // const idToken = await user.getIdToken();

    const result = await axios.post(
      serverUrl + "/api/auth/googlelogin",
      { name, email }, // optionally add token
      { withCredentials: true }
    );

    console.log("Login successful:", result.data);
    // Optionally: setUser(result.data.user);
    navigate("/");

  } catch (error) {
    console.error("Google signup error:", error.response?.data || error.message);
  }
};


  return (
    <>
    <Nav/>
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
      <div
        className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="" />
        <h1 className="text-[22px] font-sans ">Trendify</h1>
      </div>

      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Registration Page</span>
        <span className="text-[16px]">
          Welcome to Trendify, Place your order
        </span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center ">
        <form
           onSubmit={handleLogin}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
          <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer" onClick={googleLogin}>
            <img src={google} alt="" className="w-[20px]" /> Registration with
            Google
          </div>

          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div> OR{" "}
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]  relative">
            <input
              type="text"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email"
              required
              onChange={(e)=>setEmail(e.target.value)} value={email}
            />
            <input
              type={show ? "text" : "password"}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Password"
              required
              onChange={(e)=>setPassword(e.target.value)} value={password}
            />
            {!show && (
              <IoEyeOutline
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <IoEye
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}

            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>{loading? <Loading/> : "Login"}</button>
            <p className="flex gap-[10px]">
              You have not any account?{" "}
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
