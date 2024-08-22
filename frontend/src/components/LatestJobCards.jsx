import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react'; // Import useColorMode

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode(); // Get the current color mode

  return (
    <motion.div 
      onClick={() => navigate(`/description/${job._id}`)} 
      className={`p-5 rounded-md shadow-xl cursor-pointer ${colorMode === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-100 text-gray-900'}`}
      initial={{ opacity: 0, y: 20 }} // Start with hidden and slightly below
      animate={{ opacity: 1, y: 0 }}  // Animate to visible and in place
      transition={{ duration: 0.5 }}   // Duration of the animation
      whileHover={{ scale: 1.05 }}     // Slightly scale up on hover
    >
      <div>
        <h1 className={`font-medium text-lg ${colorMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>{job?.company?.name}</h1>
        <p className={`text-sm ${colorMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>India</p>
      </div>
      <div>
        <h1 className={`font-bold text-lg my-2 ${colorMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>{job?.title}</h1>
        <p className={`text-sm ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={`font-bold ${colorMode === 'dark' ? 'text-blue-400' : 'text-blue-700'}`} variant='ghost'>{job?.position} Positions</Badge>
        <Badge className={`font-bold ${colorMode === 'dark' ? 'text-[#F83002]' : 'text-[#F83002]'}`} variant='ghost'>{job?.jobType}</Badge>
        <Badge className={`font-bold ${colorMode === 'dark' ? 'text-[#7209b7]' : 'text-[#7209b7]'}`} variant='ghost'>{job?.salary}LPA</Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
