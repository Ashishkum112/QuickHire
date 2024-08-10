import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "../shared/Navbar";
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";


const Login = () => {
  const [input,setInput] = useState({
    email:"",
    password:"",
    role:"",
  });

  const changeEventHandler = (e) =>{
    setInput({...input,[e.target.name]:e.target.value});
  }

  const changeFileHandler = (e)=>{
    setInput({...input,file:e.target.files?.[0]});
  }

  const submitHandler = async(e) =>{
    e.preventDefault();
    console.log(input);
    
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          
          <div className="my-2">
            <Label>Email</Label>
            <Input 
                type="email" 
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="ashish@gmail.com" 
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input 
            type="password" 
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="password" 
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className='flex items-center gap-4 my-4'>
              <div className="flex items-center space-x-2">
              <Input
                type='radio'
                name='role'
                value='student'
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input
                type='radio'
                name='role'
                value='recruiter'
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup> 
          </div>
        <Button type='submit' className='w-full my-4'>Login</Button>
        <span className="text-sm">Don't have an account ? <Link to='/signup' className='text-blue-600'>Sign up</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login