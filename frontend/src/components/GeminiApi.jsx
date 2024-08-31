import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";

const GeminiApi = () => {
  const { colorMode } = useColorMode();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const params = useParams();
  const jobId = params.id;

  useEffect(() => {
    const fetchJobDescription = async () => {
      try {
        const res = await axios.get(`/api/v1/job/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          setJobDescription(res.data.job.description);
        }
      } catch (error) {
        console.error("Failed to fetch job description:", error.message);
      }
    };
    fetchJobDescription();
  }, [jobId]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const prompt = `Provide a list of 10 probable interview questions suitable for the following job: ${jobDescription}`;
      const response = await axios.post('/api/v1/generative-ai', { prompt });

      setQuestions(response.data.split('\n').filter(q => q.trim()));
    } catch (error) {
      console.error("Failed to generate interview questions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${colorMode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="font-bold text-2xl sm:text-3xl mb-4">Generate Interview Questions</h1>
          <Button
            onClick={fetchQuestions}
            disabled={loading}
            className={`w-full sm:w-auto ${
              colorMode === "dark"
                ? "bg-[#7209b7] text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {loading ? "Generating..." : "Generate Your Interview Questions"}
          </Button>
        </div>
        <div className="space-y-4">
          {questions.length > 0 && (
            <div>
              <h2 className="font-bold text-xl mb-4">Interview Questions:</h2>
              <ol className="list-decimal pl-5 space-y-2">
                {questions.map((question, index) => (
                  <li key={index} className="text-lg">{question}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeminiApi;
