import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Staff } from './interfaces';

interface StaffFormProps {
  onClose: () => void;
  onSave: (newStaff: Omit<Staff, 'id'>) => void;
  selectedStaff: Staff | null;
}

const StaffForm: React.FC<StaffFormProps> = ({ onClose, onSave, selectedStaff }) => {
  const [name, setName] = useState(selectedStaff ? selectedStaff.name : '');
  const [role, setRole] = useState(selectedStaff ? selectedStaff.role : '');
  const [schedule, setSchedule] = useState(selectedStaff ? selectedStaff.schedule : '');
  const [contact, setContact] = useState(selectedStaff ? selectedStaff.contact : '');

  useEffect(() => {
    if (selectedStaff) {
      setName(selectedStaff.name);
      setRole(selectedStaff.role);
      setSchedule(selectedStaff.schedule);
      setContact(selectedStaff.contact);
    }
  }, [selectedStaff]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ name, role, schedule, contact });
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
        {selectedStaff ? 'Edit Staff' : 'Add New Staff'}
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Schedule"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        variant="outlined"
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {selectedStaff ? 'Save Changes' : 'Add Staff'}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default StaffForm;
