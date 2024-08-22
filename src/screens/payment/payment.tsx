import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Payment, Booking } from './interfaces';
import PaymentForm from './bookingPay';
import { getData, sendData, editData } from '../../config/firebaseMethods';
import { useParams } from 'react-router-dom';

const PaymentScreen: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [showForm, setShowForm] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  useEffect(() => {
    fetchPayments();
    fetchBookings();
  }, []);

  const fetchPayments = async () => {
    try {
      const paymentData: any = await getData('payments');
      setPayments(paymentData);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const bookingData: any = await getData('bookings');
      setBookings(bookingData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleAddPaymentClick = () => {
    setShowForm(true);
    setSelectedPayment(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSavePayment = async (newPayment: Omit<Payment, 'id'>) => {
    try {
      if (selectedPayment) {
        await editData('payments', selectedPayment.id, { id: selectedPayment.id, ...newPayment });
      } else {
        await sendData('payments', newPayment);
      }
      fetchPayments();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  const handleEditClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowForm(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'bookingId', headerName: 'Booking ID', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'paymentDate', headerName: 'Payment Date', width: 150 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row as Payment)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Payment Management</Typography>
          <Button variant="contained" color="primary" onClick={handleAddPaymentClick}>
            New Payment
          </Button>
        </Box>
      )}
      {showForm && <PaymentForm onClose={handleCloseForm} onSave={handleSavePayment} selectedPayment={selectedPayment} bookings={bookings} />}
      {!showForm && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={payments}
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

export default PaymentScreen;
