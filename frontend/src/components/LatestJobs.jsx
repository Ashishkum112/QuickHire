import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth); // Assuming you have an `auth` slice in your Redux store
  const navigate = useNavigate();

  const handleSeeMore = () => {
    if (user) {
      navigate('/jobs');
    } else {
      navigate('/login');
    }
  };

  const jobsToShow = allJobs.slice(0, window.innerWidth < 1024 ? 3 : 6);

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold text-center'>
        <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
      </h1>
      {/* multiple job cards display  */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
        {
          jobsToShow.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            jobsToShow.map((job) => <LatestJobCards key={job._id} job={job} />)
          )
        }
      </div>
      {/* Show "See More" button */}
      {jobsToShow.length > 0 && (
        <div className='flex justify-center mt-5'>
          <Button 
            onClick={handleSeeMore} 
            className="px-6 py-3 bg-purple-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition ease-in-out duration-150">
            See More
          </Button>
        </div>
      )}
    </div>
  );
}

export default LatestJobs;
