import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Job from './Job';
import {
  Button,
  Spinner,
  Alert,
  AlertIcon,
  Box,
  Heading,
  Flex,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import Navbar from './shared/Navbar';

const GeminiApi = () => {
  const [jobs, setJobs] = useState([]);
  const [questions, setQuestions] = useState({});
  const [loadingJobId, setLoadingJobId] = useState(null); // Track loading state per job
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state management
  const [currentJobId, setCurrentJobId] = useState(null); // Track current job ID for the modal

  useEffect(() => {
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
      setLoadingJobId(jobId); // Set loading state for the specific job
      setError(null);
      const response = await axios.post(
        'https://job-portal-7iyl.onrender.com/api/v1/generative-ai',
        { prompt: jobDescription },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data) {
        // Clean up any extra characters in the API response
        const cleanedResponse = response.data.replace(/\*\*/g, '').replace(/##/g, '');

        setQuestions((prev) => ({ ...prev, [jobId]: cleanedResponse }));
        setCurrentJobId(jobId); // Set the job ID for the modal
        onOpen(); // Open the modal
      } else {
        setError('Failed to generate questions from the AI service.');
      }
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoadingJobId(null); // Reset loading state
    }
  };

  return (
    <div>
      <Navbar />
      <Box p={8}>
        <Heading as="h1" size="xl" mb={6}>
        Prepare Interview Questions
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
                    isLoading={loadingJobId === job._id} // Loading only for the specific job
                    loadingText="Generating..."
                    width="full"
                    mb={2}
                  >
                    Generate Questions
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Box>No jobs available.</Box>
          )}
        </Flex>
      </Box>

      {/* Modal to display the AI-generated questions */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AI-Generated Questions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {questions[currentJobId] && (
              <Box>
                <Text whiteSpace="pre-wrap">{questions[currentJobId]}</Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GeminiApi;
