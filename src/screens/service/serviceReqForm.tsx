import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Service, ServiceRequest } from './interfaces';

interface ServiceRequestFormProps {
  onClose: () => void;
  onSave: (newRequest: Omit<ServiceRequest, 'id'>) => void;
  selectedRequest: ServiceRequest | null;
  services: Service[];
}

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({ onClose, onSave, selectedRequest, services }) => {
  const [serviceName, setServiceName] = useState<string>(selectedRequest?.serviceName || '');
  const [description, setDescription] = useState<string>(selectedRequest?.description || '');
  const [price, setPrice] = useState<string>(selectedRequest?.price || '');
  const [status, setStatus] = useState<string>(selectedRequest?.status || '');

  useEffect(() => {
    if (selectedRequest) {
      setServiceName(selectedRequest.serviceName || '');
      setDescription(selectedRequest.description || '');
      setPrice(selectedRequest.price || '');
      setStatus(selectedRequest.status || '');
    }
  }, [selectedRequest]);

  const handleSubmit = async () => {
    const newRequest = {
      serviceName,
      description,
      price,
      status,
      serviceId: selectedRequest?.serviceId || ''
    };
    await onSave(newRequest);
  };

  return (
    <Box sx={{ padding: 4, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {selectedRequest ? 'Edit Service Request' : 'Add New Service Request'}
      </Typography>
      <TextField
        label="Service Name"
        fullWidth
        margin="normal"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Price"
        fullWidth
        margin="normal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Status"
        fullWidth
        margin="normal"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {selectedRequest ? 'Save Changes' : 'Add Request'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};


export default ServiceRequestForm;
