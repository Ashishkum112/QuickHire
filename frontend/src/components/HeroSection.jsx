import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom'; 
import { useColorMode } from '@chakra-ui/react';



const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode(); // Get the current color mode

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  }

  return (
    <div className='text-center px-4 sm:px-6 md:px-8 lg:px-10'>
      <div className='flex flex-col gap-4 sm:gap-6 md:gap-8 my-8 sm:my-12 md:my-16'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-semibold text-sm sm:text-base md:text-lg'>
          No.1 Job Hunt Website
        </span>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>
          Search, Apply & <br />
          Get Your <span className='text-[#6A38C2]'>Dream Job</span>
        </h1>
        <p className='text-sm sm:text-base md:text-lg'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas obcaecati odit recusandae dolor sapiente.
        </p>
        <div 
          className={`flex w-full max-w-md shadow-lg border pl-3 rounded-full items-center gap-4 mx-auto 
            ${colorMode === 'light' ? 'border-gray-200 bg-white' : 'border-gray-600 bg-gray-800'}`}>
          <input
            type='text'
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Find your dream job'
            className={`outline-none border-none w-full 
              ${colorMode === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} 
              rounded-full`}
          />
          <Button 
            onClick={searchJobHandler} 
            className='rounded-r-full bg-[#6A38C2]'>
            <Search className='h-5 w-5 text-white' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection;
