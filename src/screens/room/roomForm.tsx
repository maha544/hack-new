import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';

interface RoomDetails {
  id: string;
  roomType: string;
  customerName: string;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
  availability: boolean;
  pricePerNight: number;
}

interface RoomManagementFormProps {
  onClose: () => void;
  onSave: (newRoomDetails: Omit<RoomDetails, 'id'>) => void;
  selectedRoom: RoomDetails | null;
}

const RoomManagementForm: React.FC<RoomManagementFormProps> = ({ onClose, onSave, selectedRoom }) => {
  const [roomType, setRoomType] = useState(selectedRoom ? selectedRoom.roomType : '');
  const [customerName, setCustomerName] = useState(selectedRoom ? selectedRoom.customerName : '');
  const [checkInDate, setCheckInDate] = useState(selectedRoom ? selectedRoom.checkInDate : '');
  const [checkOutDate, setCheckOutDate] = useState(selectedRoom ? selectedRoom.checkOutDate : '');
  const [specialRequests, setSpecialRequests] = useState(selectedRoom ? selectedRoom.specialRequests : '');
  const [availability, setAvailability] = useState(selectedRoom ? selectedRoom.availability : true);
  const [pricePerNight, setPricePerNight] = useState(selectedRoom ? selectedRoom.pricePerNight : 0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (selectedRoom) {
      setRoomType(selectedRoom.roomType);
      setCustomerName(selectedRoom.customerName);
      setCheckInDate(selectedRoom.checkInDate);
      setCheckOutDate(selectedRoom.checkOutDate);
      setSpecialRequests(selectedRoom.specialRequests || '');
      setAvailability(selectedRoom.availability);
      setPricePerNight(selectedRoom.pricePerNight);
    }
  }, [selectedRoom]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!roomType) newErrors.roomType = 'Room Type is required.';
    if (pricePerNight <= 0) newErrors.pricePerNight = 'Price per Night must be a positive number.';
    if (checkInDate && checkOutDate && new Date(checkOutDate) <= new Date(checkInDate)) {
      newErrors.dates = 'Check-Out Date must be after Check-In Date.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({ roomType, customerName, checkInDate, checkOutDate, specialRequests, availability, pricePerNight });
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
        {selectedRoom ? 'Edit Room Details' : 'Add New Room'}
      </Typography>
      <TextField
        label="Room Type"
        value={roomType}
        onChange={(e) => setRoomType(e.target.value)}
        variant="outlined"
        required
        error={!!errors.roomType}
        helperText={errors.roomType}
      />
      <TextField
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        variant="outlined"
      />
      <TextField
        label="Check-In Date"
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Check-Out Date"
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        error={!!errors.dates}
        helperText={errors.dates}
      />
      <TextField
        label="Special Requests"
        value={specialRequests}
        onChange={(e) => setSpecialRequests(e.target.value)}
        variant="outlined"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
            color="primary"
          />
        }
        label="Available"
      />
      <TextField
        label="Price per Night"
        type="number"
        value={pricePerNight}
        onChange={(e) => setPricePerNight(parseFloat(e.target.value))}
        variant="outlined"
        required
        error={!!errors.pricePerNight}
        helperText={errors.pricePerNight}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {selectedRoom ? 'Save Changes' : 'Submit'}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default RoomManagementForm;
