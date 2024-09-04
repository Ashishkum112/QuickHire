import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "../shared/Navbar";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constants";
import { setLoading, setUser } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";

import { useColorMode } from '@chakra-ui/react';


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className={`min-h-screen w-full ${colorMode === 'light' 
      ? 'bg-gradient-to-r from-purple-100 via-gray-100 to-blue-100 text-black' 
      : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100'}`}>
      <Navbar />
      <div className={`${colorMode === 'light' 
      ? 'bg-gradient-to-r from-purple-100 via-gray-100 to-blue-100 text-black' 
      : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100'} flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md border dark:border-gray-100 rounded-md p-4 my-10 shadow-xl"
        >
          <h1 className="font-bold text-2xl mb-5 text-center">Welcome!<br/>Let's Get You Logged In</h1>
  
          <div className="my-2">
            <Label>Email</Label>
            <Input
              className="text-black"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your Email"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              className="text-black"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-[#6A38C2]">
              Login
            </Button>
          )}
          <span className="text-sm block text-center">
            Don't have an account?{"  "}

            <Link to="/signup" className="text-blue-600 font-bold">
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}
  
export default Login;
