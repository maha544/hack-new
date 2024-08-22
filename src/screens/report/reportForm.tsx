import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Report } from './interface';

interface ReportFormProps {
  onClose: () => void;
  onSave: (newReport: Omit<Report, 'id'>) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onClose, onSave }) => {
  const [type, setType] = useState<'occupancy' | 'revenue'>('occupancy');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const generatedAt = new Date().toISOString();
    onSave({ type, title, content, generatedAt });
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 4,
        border: '1px solid #ccc',
        borderRadius: 4,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h6" sx={{ color: '#006494' }}>
        Generate New Report
      </Typography>
      <TextField
        label="Report Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Report Type"
        select
        value={type}
        onChange={(e) => setType(e.target.value as 'occupancy' | 'revenue')}
        variant="outlined"
        SelectProps={{ native: true }}
        required
      >
        <option value="occupancy">Occupancy Rate</option>
        <option value="revenue">Revenue</option>
      </TextField>
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        multiline
        rows={4}
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Generate Report
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ReportForm;
