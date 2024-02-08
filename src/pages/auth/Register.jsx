import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../plugins/axiosClient';

export default function Register() {
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const register =(e)=>{
        e.preventDefault();
        axiosClient.post("/auth/signup", {
            full_name: fullName,
            username: username,
            password: password
        }).then(res=>{
            console.log(res)
            if (res.tokens.access_token) {
                localStorage.setItem("token", res.tokens.access_token)
                navigate('/login')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    const active = Boolean(fullName) && Boolean(username) && Boolean(password)
  return (
    <div className='ml-[550px] w-[100%] h-[100%]'>
      <h1 className='m-[20px] ml-[100px]'>Registration</h1>
      <div className=" rounded-2xl w-[400px] h-[400px] bg-current ">
        <div>
          <form id="register" onSubmit={register}>
            <input
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name..."
              className="p-[10px] w-[350px] rounded-xl mt-10 ml-8  text-white
              "
            />
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username..."
              className="p-[10px] w-[350px] rounded-xl mt-10 ml-8  text-white"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-[10px] w-[350px] rounded-xl mt-10 ml-8  text-white"
            />
            <h3> </h3>
            <div className="ml-[140px] mt-[30px]">
              <button
                form="register"
                type="submit"
                disabled={!active}
                className=" rounded-xl p-[15px] px-[30px] text-white text-xl bg-sky-700"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
