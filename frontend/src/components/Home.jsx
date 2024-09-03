import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FAANGCarousel from './FAANGCarousel'
import { useColorMode } from "@chakra-ui/react";
import AboutUs from './AboutUs'


const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  useEffect(()=>{
    if(user?.role === 'recruiter'){
      navigate('/admin/companies');
    }
  },[]);
  // useEffect(()=>{
  //   if(user?.role != 'recruiter' && user?.role != 'student'){
  //     navigate('/login');
  //   }
  // },[]);


  
  return (
    <div className={`${colorMode === 'light' 
      ? 'bg-gradient-to-r from-purple-100 via-gray-100 to-blue-50 text-black' 
      : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100'}`}>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <FAANGCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home