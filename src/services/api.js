import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds timeout for file upload and AI processing
});

export const analyzeCV = async (cvFile, jobDescription, linkedinUrl) => {
  try {
    const formData = new FormData();
    if (cvFile) {
      formData.append('cv_file', cvFile);
    }
    formData.append('job_description', jobDescription);
    if (linkedinUrl && linkedinUrl.trim()) {
      formData.append('linkedin_url', linkedinUrl.trim());
    }

    const response = await api.post('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.detail || 'Server error occurred');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Unable to connect to the server. Please check your connection.');
    } else {
      // Something else went wrong
      throw new Error('An unexpected error occurred');
    }
  }
};

export const healthCheck = async () =>
  api.get('/health').then((res) => res.data);

export default api; 