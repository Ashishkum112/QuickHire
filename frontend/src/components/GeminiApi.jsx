import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Job from './Job';
import { Button, Spinner, Alert, AlertIcon, Box, Heading, Flex, Text } from '@chakra-ui/react';
import Navbar from './shared/Navbar';

const GeminiApi = () => {
  const [jobs, setJobs] = useState([]);
  const [questions, setQuestions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch jobs from the API
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://job-portal-7iyl.onrender.com/api/v1/job/get');
        if (response.data.success && Array.isArray(response.data.jobs)) {
          setJobs(response.data.jobs);
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
      // Send the job description to Gemini API for generating questions
      const response = await axios.post(
        'https://job-portal-7iyl.onrender.com/api/v1/generative-ai',
        { prompt: jobDescription },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Assuming the response is a plain text format with questions
      if (response.data) {
        setQuestions((prev) => ({ ...prev, [jobId]: response.data }));
      } else {
        setError('Failed to generate questions from the AI service.');
      }
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Box p={8}>
        <Heading as="h1" size="xl" mb={6}>
          AI-Generated Interview Questions
        </Heading>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Flex wrap="wrap" justify="center" gap={6}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Box
                key={job._id}
                className="job-card"
                bg="white"
                shadow="md"
                borderRadius="lg"
                p={4}
                w={{ base: '100%', md: '48%', lg: '30%' }}
                mb={6}
              >
                <Job job={job} />
                <Box mt={4}>
                  <Button
                    onClick={() => generateQuestions(job._id, job.description)}
                    colorScheme="blue"
                    isLoading={loading}
                    loadingText="Generating..."
                    width="full"
                    mb={2}
                  >
                    Generate Questions
                  </Button>
                  {questions[job._id] && (
                    <Box mt={4} bg="gray.100" p={3} borderRadius="md">
                      <Text whiteSpace="pre-wrap">{questions[job._id]}</Text> {/* Display the raw text response */}
                    </Box>
                  )}
                </Box>
              </Box>
            ))
          ) : (
            <Box>No jobs available.</Box>
          )}
        </Flex>
      </Box>
    </div>
  );
};

export default GeminiApi;
