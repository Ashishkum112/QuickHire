import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useColorMode } from '@chakra-ui/react';

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Full Stack Developer",
  "Machine Learning",
  "Business Analyst",
  "UI/UX Designer",
];

const CategoryCarousel = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  // Duplicate categories to ensure seamless looping
  const duplicatedCategories = [...categories, ...categories];

  // Define widths separately for mobile and desktop
  const mobileCategoryWidth = 100 / 5; // Show 3 items at once on mobile
  const desktopCategoryWidth = 100 / 7; // Show 5 items at once on desktop

  // Determine category width based on the screen size
  const categoryWidth = isMobile ? mobileCategoryWidth : desktopCategoryWidth;

  return (
    <div className={`relative w-full mx-auto my-10 overflow-hidden ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <motion.div
        className="flex"
        animate={{ x: [`0%`, `-${categoryWidth * categories.length}%`] }}
        transition={{ 
          x: { 
            repeat: Infinity,
            repeatType: "loop",
            duration: isMobile ? 18 : 15, // Adjusted speeds
            ease: "linear"
          }
        }}
        style={{
          width: `calc(${duplicatedCategories.length} * ${categoryWidth}%)` // Dynamic width calculation
        }}
      >
        {duplicatedCategories.map((cat, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `${categoryWidth}%` }} // Adjust width for each item
          >
            <Button
              onClick={() => searchJobHandler(cat)}
              variant='outline'
              className={`w-full rounded-full font-semibold text-base ${colorMode === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-200 text-gray-800 border-gray-300'}`}
              style={{ borderColor: colorMode === 'dark' ? 'transparent' : 'inherit' }}
            >
              {cat}
            </Button>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryCarousel;
