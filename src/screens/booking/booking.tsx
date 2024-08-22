import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Booking, Room, Customer } from './interface';
import BookingForm from './bookingForm';
import { getData, sendData, editData } from '../../config/firebaseMethods';
import { useNavigate } from 'react-router-dom';

const BookingScreen: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
    fetchRooms();
    fetchCustomers();
  }, []);

  const fetchBookings = async () => {
    try {
      const bookingData: any = await getData('bookings');
      setBookings(bookingData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const roomData: any = await getData('rooms');
      setRooms(roomData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const customerData: any = await getData('customers');
      setCustomers(customerData);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleAddBookingClick = () => {
    setShowForm(true);
    setSelectedBooking(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveBooking = async (newBooking: Omit<Booking, 'id'>) => {
    try {
      if (selectedBooking) {
        await editData('bookings', selectedBooking.id, { id: selectedBooking.id, ...newBooking });
      } else {
        await sendData('bookings', newBooking);
      }
      fetchBookings();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  const handleEditClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowForm(true);
  };

  const handlePaymentClick = (bookingId: string) => {
    navigate('/dashboard/payment');
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'roomId', headerName: 'Room ID', width: 150 },
    { field: 'customerId', headerName: 'Customer ID', width: 150 },
    { field: 'checkInDate', headerName: 'Check-In Date', width: 150 },
    { field: 'checkOutDate', headerName: 'Check-Out Date', width: 150 },
    { field: 'specialRequests', headerName: 'Special Requests', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <>
          <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row as Booking)}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => handlePaymentClick(params.row.id)}>
            Payment
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Booking Management</Typography>
          <Button variant="contained" color="primary" onClick={handleAddBookingClick}>
            New Booking
          </Button>
        </Box>
      )}
      {showForm && <BookingForm onClose={handleCloseForm} onSave={handleSaveBooking} selectedBooking={selectedBooking} rooms={rooms} customers={customers} />}
      {!showForm && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={bookings}
            columns={columns}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default BookingScreen;
