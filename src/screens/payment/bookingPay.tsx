import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Payment, Booking } from './interfaces'

interface PaymentFormProps {
  onClose: () => void;
  onSave: (newPayment: Omit<Payment, 'id'>) => void;
  selectedPayment: Payment | null;
  bookings: Booking[];
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onClose, onSave, selectedPayment, bookings }) => {
  const [bookingId, setBookingId] = useState(selectedPayment ? selectedPayment.bookingId : '');
  const [amount, setAmount] = useState(selectedPayment ? selectedPayment.amount : 0);
  const [paymentDate, setPaymentDate] = useState(selectedPayment ? selectedPayment.paymentDate : '');
  const [paymentMethod, setPaymentMethod] = useState(selectedPayment ? selectedPayment.paymentMethod : 'Credit Card');
  const [status, setStatus] = useState(selectedPayment ? selectedPayment.status : 'Pending');

  useEffect(() => {
    if (selectedPayment) {
      setBookingId(selectedPayment.bookingId);
      setAmount(selectedPayment.amount);
      setPaymentDate(selectedPayment.paymentDate);
      setPaymentMethod(selectedPayment.paymentMethod);
      setStatus(selectedPayment.status);
    }
  }, [selectedPayment]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ bookingId, amount, paymentDate, paymentMethod, status });
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
        {selectedPayment ? 'Edit Payment' : 'New Payment'}
      </Typography>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Booking</InputLabel>
        <Select
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value as string)}
          label="Booking"
          required
        >
          {bookings.map((booking) => (
            <MenuItem key={booking.id} value={booking.id}>{`Booking ID: ${booking.id}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        variant="outlined"
        required
      />
      <TextField
        label="Payment Date"
        type="date"
        value={paymentDate}
        onChange={(e) => setPaymentDate(e.target.value)}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        required
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as 'Credit Card' | 'Cash' | 'Other')}
          label="Payment Method"
          required
        >
          <MenuItem value="Credit Card">Credit Card</MenuItem>
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Pending' | 'Completed')}
          label="Status"
          required
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {selectedPayment ? 'Save Changes' : 'Add Payment'}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentForm;
