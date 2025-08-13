import React from 'react';
import { Paper, Typography, Box, TextField } from '@mui/material';
import { LinkedIn } from '@mui/icons-material';

const LinkedInProfile = ({ value, onChange, loading }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom color="primary">
        LinkedIn Profile (optional)
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <LinkedIn sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="body2" color="text.secondary">
          Provide a public LinkedIn profile URL to analyze along with (or instead of) your CV
        </Typography>
      </Box>

      <TextField
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://www.linkedin.com/in/your-profile"
        fullWidth
        size="small"
        disabled={loading}
        InputProps={{
          sx: {
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'text',
          },
        }}
      />
    </Paper>
  );
};

export default LinkedInProfile; 