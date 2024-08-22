import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CustomerAddEdtProps {
  onClose: () => void;
  onSave: (newCustomer: Omit<Customer, 'id'>) => void;
  selectedCustomer: Customer | null;
}

const CustomerAddEdt: React.FC<CustomerAddEdtProps> = ({ onClose, onSave, selectedCustomer }) => {
  const [name, setName] = useState(selectedCustomer ? selectedCustomer.name : '');
  const [email, setEmail] = useState(selectedCustomer ? selectedCustomer.email : '');
  const [phone, setPhone] = useState(selectedCustomer ? selectedCustomer.phone : '');
  const [address, setAddress] = useState(selectedCustomer ? selectedCustomer.address : '');

  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name);
      setEmail(selectedCustomer.email);
      setPhone(selectedCustomer.phone);
      setAddress(selectedCustomer.address);
    }
  }, [selectedCustomer]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ name, email, phone, address });
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
        {selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        variant="outlined"
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {selectedCustomer ? 'Save Changes' : 'Submit'}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerAddEdt;
