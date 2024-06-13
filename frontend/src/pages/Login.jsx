import React from 'react'
import { useState } from 'react';
const Login = () => {
 
    const [state, setState] = useState("Login");
    const [fromData, setFromData] = useState({
      username:"",
      password:"",
      email:""
    })

    const changeHandler =(e) =>{
      setFromData({...fromData,[e.target.name]:e.target.value})
    }

   const login = async () =>{
        console.log("Login function executed", fromData);
        let responseData;
    await fetch('http://localhost:4000/login',{
      method:"POST",
      headers:{
        Accept: 'application/fromData',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fromData)
    }).then((response)=> response.json()).then((data)=> responseData=data)

    if(responseData.success)
      {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      }
      else{
        alert(responseData.error)
      }
   }

   const signup = async () =>{
    console.log("signup function executed", fromData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:"POST",
      headers:{
        Accept: 'application/fromData',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fromData)
    }).then((response)=> response.json()).then((data)=> responseData=data)

    if(responseData.success)
      {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      }
      else{
        alert(responseData.error)
      }
   }

  return (
    <section className='max_padd_container flexCenter flex-col pt-32'>
      <div className='max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md'>
        <h3 className='h3'>{state}</h3>
        <div className='flex flex-col gap-4 mt-7'>
          {state==="Sign up"?<input type='text' name='username' value={fromData.username} onChange={changeHandler} placeholder='Your Name' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>:""}
          <input type='email' name='email' value={fromData.email} onChange={changeHandler} placeholder='Email Address' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>
          <input type='password' name='password' value={fromData.password} onChange={changeHandler} placeholder='Password' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}} className='btn_dark_rounded my-4 w-full !rounded-md'>Continue</button>
        {state==="Sign up"? <p className='text-black font-bold' >Already have an account? <span onClick={()=>{setState("Login")}} className='text-secondary underline cursor-pointer'>Login</span></p>
        :  <p className='text-black font-bold'>Create an account? <span onClick={()=>{setState("Sign up")}} className='text-secondary underline cursor-pointer'>Click here</span></p>}
        <div className='flexCenter mt-6 gap-3'>
          <input type='checkbox' name='' id='' />
          <p>By continuing, i aggree to the terms of use & privacy policy</p>
        </div>
      </div>
    </section>
  )
}

export default Login