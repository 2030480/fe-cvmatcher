import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box, Alert, Button, Stack } from '@mui/material';
import FileUpload from './components/FileUpload';
import JobDescription from './components/JobDescription';
import LinkedInProfile from './components/LinkedInProfile';
import ResultsDisplay from './components/ResultsDisplay';
import { analyzeCV } from './services/api';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
  },
});

function App() {
  const [cvFile, setCvFile] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if ((!cvFile && !linkedinUrl.trim()) || !jobDescription.trim()) {
      setError('Please upload a CV or enter a LinkedIn URL, and enter a job description');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeCV(cvFile, jobDescription, linkedinUrl);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCvFile(null);
    setLinkedinUrl('');
    setJobDescription('');
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: 'white' }}>
            CV Matcher
          </Typography>
          <Typography variant="h6" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
            Upload your CV and job description to get an intelligent match analysis
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <FileUpload
              onFileSelect={setCvFile}
              selectedFile={cvFile}
              loading={loading}
            />
            <JobDescription
              value={jobDescription}
              onChange={setJobDescription}
              loading={loading}
            />
            <LinkedInProfile
              value={linkedinUrl}
              onChange={setLinkedinUrl}
              loading={loading}
            />
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleAnalyze} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleReset} disabled={loading}>
              Reset
            </Button>
          </Stack>

          {analysisResult && (
            <Box sx={{ mt: 4 }}>
              <ResultsDisplay result={analysisResult} />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 