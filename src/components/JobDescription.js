import React from 'react';
import { Paper, Typography, Box, TextareaAutosize } from '@mui/material';
import { Work } from '@mui/icons-material';

const JobDescription = ({ value, onChange, loading }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom color="primary">
        Job Description
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Work sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="body2" color="text.secondary">
          Paste the complete job description here
        </Typography>
      </Box>
      
      <textarea
        className="job-description-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here. Include required skills, experience, education, and any specific requirements..."
        disabled={loading}
        style={{
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'text',
          height: '220px',
        }}
      />
      
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          {value.length} characters
        </Typography>
        <Typography variant="caption" color={value.length < 100 ? 'warning.main' : 'success.main'}>
          {value.length < 100 ? 'Add more details for better analysis' : 'Good length for analysis'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default JobDescription; 