import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Job from './Job';
import { Button, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import Navbar from './shared/Navbar';

const GeminiApi = () => {
  const [jobs, setJobs] = useState([]); // Ensure jobs is an array
  const [questions, setQuestions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch jobs from your API
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs'); // Replace with your jobs API endpoint
        if (Array.isArray(response.data)) {
          setJobs(response.data);
        } else {
          setError('Invalid data format received from the server.');
        }
      } catch (err) {
        setError('Failed to fetch jobs. Please try again.');
      }
    };

    fetchJobs();
  }, []);

  const generateQuestions = async (jobId, jobDescription) => {
    try {
      setLoading(true);
      setError(null);
      // Replace with your actual API endpoint for generating questions
      const response = await axios.post('/api/generate-questions', {
        jobDescription,
      });
      setQuestions((prev) => ({ ...prev, [jobId]: response.data.questions }));
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar /> {/* Include Navbar at the top */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">AI-Generated Interview Questions</h1>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="relative bg-white shadow-md rounded-lg overflow-hidden p-4">
                <Job job={job} />
                <div className="mt-4">
                  <Button
                    onClick={() => generateQuestions(job._id, job.description)}
                    colorScheme="blue"
                    isLoading={loading}
                  >
                    Generate Questions
                  </Button>
                  {loading && <Spinner size="sm" color="blue.500" className="ml-4" />}
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                  {questions[job._id] && (
                    <ul className="mt-4 list-disc list-inside pl-4">
                      {questions[job._id].map((question, index) => (
                        <li key={index} className="mb-2">{`${index + 1}. ${question}`}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeminiApi;
