import React from 'react';
import { Paper, Typography, Box, Grid, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, Assessment, CheckCircle, Warning } from '@mui/icons-material';

const ResultsDisplay = ({ result }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Needs Improvement';
  };

  return (
    <Box>
      {/* Match Score Section */}
      <Paper elevation={4} className="match-score" sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Assessment sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h4" component="h2">
            Match Analysis
          </Typography>
        </Box>
        
        <div className="score-circle" style={{ borderColor: getScoreColor(result.match_percentage) }}>
          <span className="score-text">{result.match_percentage}%</span>
        </div>
        
        <Typography variant="h6" sx={{ mb: 1 }}>
          {getScoreLabel(result.match_percentage)}
        </Typography>
        
        <Chip
          label={`${result.match_percentage}% Match`}
          sx={{
            backgroundColor: getScoreColor(result.match_percentage),
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            height: '32px',
          }}
        />
      </Paper>

      <Grid container spacing={3}>
        {/* Strengths Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="strengths-section">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUp sx={{ fontSize: 28, mr: 1 }} />
              <Typography variant="h5" component="h3">
                Strengths ({result.strengths.length})
              </Typography>
            </Box>
            
            {result.strengths.map((strength, index) => (
              <div key={index} className="strength-item">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircle sx={{ fontSize: 20, mr: 1, color: 'rgba(255,255,255,0.9)' }} />
                  <div className="item-title">{strength.title}</div>
                </Box>
                <div className="item-description">{strength.description}</div>
              </div>
            ))}
          </Paper>
        </Grid>

        {/* Weaknesses Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="weaknesses-section">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingDown sx={{ fontSize: 28, mr: 1 }} />
              <Typography variant="h5" component="h3">
                Areas for Improvement ({result.weaknesses.length})
              </Typography>
            </Box>
            
            {result.weaknesses.map((weakness, index) => (
              <div key={index} className="weakness-item">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Warning sx={{ fontSize: 20, mr: 1, color: 'rgba(255,255,255,0.9)' }} />
                  <div className="item-title">{weakness.title}</div>
                </Box>
                <div className="item-description">{weakness.description}</div>
                {weakness.suggestion && (
                  <div className="item-suggestion">
                    <strong>💡 Suggestion:</strong> {weakness.suggestion}
                  </div>
                )}
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Summary Section */}
      <Paper elevation={3} className="summary-section" sx={{ mt: 3 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Overall Assessment
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
          {result.summary}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ResultsDisplay; 