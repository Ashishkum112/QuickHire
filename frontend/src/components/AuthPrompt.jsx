import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AuthPrompt = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className=" flex flex-col">
      {/* Background Image Section */}
      <div
        className="
          w-full 
          h-[19vh] 
          sm:h-[50vh] 
          md:hidden 
          lg:hidden
          xl:hidden  
          bg-cover 
          bg-center
        "
        style={{
          backgroundImage: `url('/bg.png')`,
        }}
      ></div>

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center py-12 px-8 rounded-lg text-center relative z-10">
        <h2 className="text-3xl font-extrabold mb-4">
          Unlock Your Dream Job with <span className="text-indigo-600 dark:text-indigo-400">QuickHire!</span>
        </h2>
        <p className="text-lg mb-8">
          Sign in or create an account to access all the features.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            onClick={handleLogin} 
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition ease-in-out duration-150">
            Login
          </Button>
          <Button 
            onClick={handleSignup} 
            className="w-full sm:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-900 font-semibold rounded-lg shadow-md transition ease-in-out duration-150">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPrompt;
