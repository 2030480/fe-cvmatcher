import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paper, Typography, Box } from '@mui/material';
import { CloudUpload, Description, CheckCircle } from '@mui/icons-material';

const FileUpload = ({ onFileSelect, selectedFile, loading }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
    disabled: loading,
  });

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom color="primary">
        Upload CV
      </Typography>
      <Box
        {...getRootProps()}
        className={`file-drop-zone ${isDragActive ? 'drag-over' : ''}`}
        sx={{
          height: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        <input {...getInputProps()} />
        
        {selectedFile ? (
          <>
            <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" color="success.main" gutterBottom>
              File Selected
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {selectedFile.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </Typography>
            {!loading && (
              <Typography variant="caption" color="primary" sx={{ mt: 1 }}>
                Click to select a different file
              </Typography>
            )}
          </>
        ) : (
          <>
            <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" color="primary" gutterBottom>
              {isDragActive ? 'Drop the file here' : 'Upload your CV'}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Drag and drop your CV file here, or click to select
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Supports PDF, DOC, and DOCX files
            </Typography>
          </>
        )}
      </Box>
      
      {selectedFile && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Description sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="subtitle2" color="primary">
              File Details
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            <strong>Name:</strong> {selectedFile.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Type:</strong> {selectedFile.type || 'Unknown'}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default FileUpload; 