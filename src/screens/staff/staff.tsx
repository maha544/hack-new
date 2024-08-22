import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Staff } from './interfaces';
import StaffForm from './staffForm';
import { getData, sendData, editData } from '../../config/firebaseMethods';

const StaffScreen: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const staffData: any = await getData('staff');
      setStaffList(staffData);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const handleAddStaffClick = () => {
    setShowForm(true);
    setSelectedStaff(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveStaff = async (newStaff: Omit<Staff, 'id'>) => {
    try {
      if (selectedStaff) {
        await editData('staff', selectedStaff.id, { id: selectedStaff.id, ...newStaff });
      } else {
        await sendData('staff', newStaff);
      }
      fetchStaffData();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving staff:', error);
    }
  };

  const handleEditClick = (staff: Staff) => {
    setSelectedStaff(staff);
    setShowForm(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'schedule', headerName: 'Schedule', width: 200 },
    { field: 'contact', headerName: 'Contact', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row as Staff)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Staff Management</Typography>
          <Button variant="contained" color="primary" onClick={handleAddStaffClick}>
            Add Staff
          </Button>
        </Box>
      )}
      {showForm && <StaffForm onClose={handleCloseForm} onSave={handleSaveStaff} selectedStaff={selectedStaff} />}
      {!showForm && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={staffList}
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

export default StaffScreen;
