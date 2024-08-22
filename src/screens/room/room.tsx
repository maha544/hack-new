import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getData, sendData, editData } from '../../config/firebaseMethods';
import RoomManagementForm from './roomForm';

type RoomDetails = {
  id: string;
  roomType: string;
  customerName: string;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
  availability: boolean;
  pricePerNight: number;
};

const Room: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [rooms, setRooms] = useState<RoomDetails[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoomData = async () => {
    try {
      setLoading(true);
      const roomData: any = await getData('roomBookings');
      setRooms(roomData);
      setError(null);
    } catch (error) {
      console.error('Error fetching room data:', error);
      setError('Failed to load data');
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  const handleAddRoomClick = () => {
    setShowForm(true);
    setSelectedRoom(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveRoom = async (newRoom: Omit<RoomDetails, 'id'>) => {
    try {
      if (selectedRoom) {
        await editData('roomBookings', selectedRoom.id, { id: selectedRoom.id, ...newRoom });
      } else {
        await sendData('roomBookings', newRoom);
      }
      fetchRoomData();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  const handleEditClick = (room: RoomDetails) => {
    setSelectedRoom(room);
    setShowForm(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'roomType', headerName: 'Room Type', width: 150 },
    { field: 'customerName', headerName: 'Customer Name', width: 200 },
    { field: 'checkInDate', headerName: 'Check-In Date', width: 150 },
    { field: 'checkOutDate', headerName: 'Check-Out Date', width: 150 },
    { field: 'specialRequests', headerName: 'Special Requests', width: 200 },
    { field: 'availability', headerName: 'Availability', width: 150 },
    { field: 'pricePerNight', headerName: 'Price per Night', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row as RoomDetails)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Room Management</Typography>
          <Button variant="contained" color="primary" onClick={handleAddRoomClick}>
            Book a Room
          </Button>
        </Box>
      )}

      {showForm && <RoomManagementForm onClose={handleCloseForm} onSave={handleSaveRoom} selectedRoom={selectedRoom} />}
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && !showForm && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rooms}
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

export default Room;
