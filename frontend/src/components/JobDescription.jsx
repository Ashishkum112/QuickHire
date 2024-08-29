import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../utils/constants";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useColorMode } from "@chakra-ui/react";

const JobDescription = () => {
  const { colorMode } = useColorMode();
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className={`${colorMode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl">{singleJob?.title}</h1>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="text-blue-700 font-bold" variant="ghost">
                {singleJob?.title}
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="text-[#7209b7] font-bold" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="my-10 space-y-6">
          <h1 className="border-b-2 border-b-gray-300 font-medium pb-2">Job Description</h1>
          <div className="space-y-4">
  <h1 className="font-bold text-lg">
    Role:
    <span className={`pl-4 font-normal ${colorMode === "dark" ? "text-gray-300" : "text-gray-800"}`}>
      {singleJob?.title}
    </span>
  </h1>
  <h1 className="font-bold text-lg">
    Location:
    <span className={`pl-4 font-normal ${colorMode === "dark" ? "text-gray-300" : "text-gray-800"}`}>
      {singleJob?.location}
    </span>
  </h1>
  <h1 className="font-bold text-lg">
    Description:
    <span className={`pl-4 font-normal ${colorMode === "dark" ? "text-gray-300" : "text-gray-800"}`}>
      {singleJob?.description}
    </span>
  </h1>
  <h1 className="font-bold text-lg">
    Experience:
    <span className={`pl-4 font-normal ${colorMode === "dark" ? "text-gray-300" : "text-gray-800"}`}>
      {singleJob?.experience}
    </span>
  </h1>
  <h1 className="font-bold text-lg">
    Salary:
    <span className={`pl-4 font-normal ${colorMode === "dark" ? "text-gray-300" : "text-gray-800"}`}>
      {singleJob?.salary} LPA
    </span>
  </h1>
  <h1 className="font-bold text-lg">
    Total Applicants:
    <span className={`pl-4 font-normal ${colorMode === "dark" ? "text-gray-300" : "text-gray-800"}`}>
      {singleJob?.applications?.length}
    </span>
  </h1>
  <h1 className="font-bold text-lg">
    Posted Date:
    <span className={`pl-4 font-normal ${colorMode === "dark" ? "text-gray-300" : "text-gray-800"}`}>
      {singleJob?.createdAt.split("T")[0]}
    </span>
  </h1>
</div>


<div className="flex flex-col sm:flex-row sm:justify-end gap-4 mt-6">
  <Button
    className={`w-full sm:w-auto ${
      colorMode === "dark"
        ? "bg-[#7209b7] text-white"
        : "bg-blue-500 text-white"
    }`}
    onClick={() => {
      if (user) {
        window.open(singleJob?.ApplyLink, "_blank");
      } else {
        toast.error("Please log in to apply for this job.");
      }
    }}
  >
    Apply for this Job
  </Button>

  <Button
    onClick={isApplied ? null : applyJobHandler}
    disabled={isApplied}
    className={`w-full sm:w-auto rounded-lg ${
      isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"
    }`}
  >
    {isApplied ? "Already Applied" : "If Applied, Click Here"}
  </Button>
</div>

        </div>
      </div>
    </div>
  );
};

export default JobDescription;
