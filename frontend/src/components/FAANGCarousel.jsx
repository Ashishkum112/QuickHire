import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useColorMode } from '@chakra-ui/react';
import atlasian from '@/assets/atlasian.png';
import google from '@/assets/google.png';
import netflix from '@/assets/netflix.png';
import amazon3 from '@/assets/amazon3.webp';
import meta from '@/assets/meta.svg';
import microsoft from '@/assets/microsoft.webp';



const faangImages = [
  atlasian,
  google,
  netflix,
  amazon3,
  meta,
  microsoft,
];

const FAANGCarousel = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Duplicate images to ensure seamless looping
  const duplicatedImages = [...faangImages, ...faangImages];

  // Define widths and heights for items
  const mobileItemWidth = 100 / 5; // Show 5 images at once on mobile
  const desktopItemWidth = 100 / 7; // Show 7 images at once on desktop
  const itemHeight = ''; // Fixed height for uniform image display

  // Determine item width based on the screen size
  const itemWidth = isMobile ? mobileItemWidth : desktopItemWidth;

  return (
    <div 
    className={`
    relative w-full mx-auto my-10 overflow-hidden ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <motion.div
        className="flex"
        animate={{ x: [`-${itemWidth * faangImages.length}%`, `0%`] }} // Reversed direction
        transition={{ 
          x: { 
            repeat: Infinity,
            repeatType: "loop",
            duration: isMobile ? 18 : 15, // Adjusted speeds
            ease: "linear"
          }
        }}
        style={{
          width: `calc(${duplicatedImages.length} * ${itemWidth}%)` // Dynamic width calculation
        }}
      >
        {duplicatedImages.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `${itemWidth}%`, height: itemHeight }} // Adjust width and fixed height for each item
          >
            <img
              src={img}
              alt={`FAANG MNC ${index}`}
              className="h-9 sm:h-14 object-contain" // Ensure the entire image is visible
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default FAANGCarousel;
    