import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FAANGCarousel from './FAANGCarousel';
import { useColorMode } from "@chakra-ui/react";
import AuthPrompt from './AuthPrompt';
import FooterBanner from './FooterBanner';

const Home = () => {
  useGetAllJobs(); // Fetch jobs data
  const { user } = useSelector((store) => store.auth); // Get the current user from Redux store
  const navigate = useNavigate(); // Router hook for navigation
  const { colorMode } = useColorMode(); // For color mode theming

  // Redirect recruiters to admin area
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]);

  // Redirect non-logged-in users to the login page
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not logged in
    }
  }, [user, navigate]);

  // If user is not logged in, the component will navigate to login before rendering anything
  if (!user) {
    return null; // Render nothing while the redirection is in process
  }

  return (
    <div className={`${colorMode === 'light' 
      ? 'bg-gradient-to-r from-purple-50 via-gray-100 to-blue-100 text-black' 
      : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100'}`}>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <FAANGCarousel />
      <LatestJobs />
      <FooterBanner />
      {!user && <AuthPrompt />} 
      {/* Show AuthPrompt if user is not logged in (this won't be displayed since we're redirecting) */}
      <Footer />
    </div>
  );
};

export default Home;
