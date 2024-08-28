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
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
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
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div
        className={`max-w-7xl mx-auto my-10 p-4 rounded-lg ${
          colorMode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge
                className="text-blue-700 font-bold"
                variant="ghost"
              >
                {singleJob?.title}
              </Badge>
              <Badge
                className="text-[#F83002] font-bold"
                variant="ghost"
              >
                {singleJob?.position} Positions
              </Badge>
              <Badge
                className="text-[#7209b7] font-bold"
                variant="ghost"
              >
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
          >
            {isApplied ? "Already Applied" : "Click Here,After Applying "}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6">
          Job Description
        </h1>
        <div className="my-4">
          <ol className="list-decimal list-inside space-y-2">
            {singleJob?.descriptionItems?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
        <Button
          className={`w-full sm:w-auto mt-6 ${
            colorMode === "dark"
              ? "bg-[#7209b7] text-white"
              : "bg-blue-500 text-white"
          }`}
          onClick={() => window.open(singleJob?.ApplyLink, "_blank")}
        >
          Apply for this Job
        </Button>
      </div>
    </div>
  );
};

export default JobDescription;
