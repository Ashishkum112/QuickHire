import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Full Stack Developer",
];

const slideVariants = {
  animate: {
    x: ["0%", "-50%"], // Adjust to move only half the width of the carousel
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 6, // Adjust the duration to control the sliding speed
        ease: "linear",
      },
    },
  },
};

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  // Duplicate categories to ensure seamless looping
  const duplicatedCategories = [...categories, ...categories];

  return (
    <div className="relative w-full max-w-2xl mx-auto my-20 overflow-hidden">
      <motion.div
        className="flex"
        variants={slideVariants}
        animate="animate"
        style={{ width: `calc(${duplicatedCategories.length} * 20%)` }} // Adjust width to accommodate duplicated items
      >
        {duplicatedCategories.map((cat, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full md:basis-1/2 lg:basis-1/3 p-2"
          >
            <Button
              onClick={() => searchJobHandler(cat)}
              variant='outline'
              className="w-full rounded-full font-semibold text-base "
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
