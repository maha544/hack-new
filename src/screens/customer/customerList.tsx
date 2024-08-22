import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getData, sendData, editData } from '../../config/firebaseMethods';
import CustomerAddEdt from './customerForm';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

const CustomerList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const customerData:any = await getData('customers');
      setCustomers(customerData);
    } catch (error) {
      console.error('Error fetching customer data:', error);
      setCustomers([]);
    }
  };
  

  const handleAddCustomerClick = () => {
    setShowForm(true);
    setSelectedCustomer(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveCustomer = async (newCustomer: Omit<Customer, 'id'>) => {
    try {
      if (selectedCustomer) {
        await editData('customers', selectedCustomer.id, { id: selectedCustomer.id, ...newCustomer });
      } else {
        await sendData('customers', newCustomer);
      }
      fetchCustomerData();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row as Customer)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Customer List</Typography>
          <Button variant="contained" color="primary" onClick={handleAddCustomerClick}>
            Booking
          </Button>
        </Box>
      )}

{showForm && <CustomerAddEdt onClose={handleCloseForm} onSave={handleSaveCustomer} selectedCustomer={selectedCustomer} />}

      {!showForm && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={customers}
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

export default CustomerList;
