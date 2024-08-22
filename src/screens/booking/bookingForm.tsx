import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { Booking, Room, Customer } from './interface';

interface BookingFormProps {
  onClose: () => void;
  onSave: (newBooking: Omit<Booking, 'id'>) => void;
  selectedBooking: Booking | null;
  rooms: Room[];
  customers: Customer[];
}

const BookingForm: React.FC<BookingFormProps> = ({ onClose, onSave, selectedBooking, rooms, customers }) => {
  const [roomId, setRoomId] = useState(selectedBooking ? selectedBooking.roomId : '');
  const [customerId, setCustomerId] = useState(selectedBooking ? selectedBooking.customerId : '');
  const [checkInDate, setCheckInDate] = useState(selectedBooking ? selectedBooking.checkInDate : '');
  const [checkOutDate, setCheckOutDate] = useState(selectedBooking ? selectedBooking.checkOutDate : '');
  const [specialRequests, setSpecialRequests] = useState(selectedBooking ? selectedBooking.specialRequests : '');
  const [status, setStatus] = useState(selectedBooking ? selectedBooking.status : 'Booked');

  useEffect(() => {
    if (selectedBooking) {
      setRoomId(selectedBooking.roomId);
      setCustomerId(selectedBooking.customerId);
      setCheckInDate(selectedBooking.checkInDate);
      setCheckOutDate(selectedBooking.checkOutDate);
      setSpecialRequests(selectedBooking.specialRequests || '');
      setStatus(selectedBooking.status);
    }
  }, [selectedBooking]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ roomId, customerId, checkInDate, checkOutDate, specialRequests, status });
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
        {selectedBooking ? 'Edit Booking' : 'New Booking'}
      </Typography>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Room</InputLabel>
        <Select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value as string)}
          label="Room"
        >
          {rooms.map((room) => (
            <MenuItem key={room.id} value={room.id}>{room.roomType}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Customer</InputLabel>
        <Select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value as string)}
          label="Customer"
          required
        >
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Check-In Date"
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Check-Out Date"
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Special Requests"
        value={specialRequests}
        onChange={(e) => setSpecialRequests(e.target.value)}
        variant="outlined"
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Booked' | 'Checked In' | 'Checked Out')}
          label="Status"
          required
        >
          <MenuItem value="Booked">Booked</MenuItem>
          <MenuItem value="Checked In">Checked In</MenuItem>
          <MenuItem value="Checked Out">Checked Out</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {selectedBooking ? 'Save Changes' : 'Book Now'}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default BookingForm;
