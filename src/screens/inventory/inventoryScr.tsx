import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { InventoryItem } from './interface';
import InventoryForm from './inventoryForm';
import { getData, sendData, editData, delData } from '../../config/firebaseMethods';

const InventoryScreen: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const inventoryData: any = await getData('inventory');
      setItems(inventoryData);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  const handleAddItemClick = () => {
    setShowForm(true);
    setSelectedItem(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveItem = async (newItem: Omit<InventoryItem, 'id'>) => {
    try {
      if (selectedItem) {
        await editData('inventory', selectedItem.id, { id: selectedItem.id, ...newItem });
      } else {
        await sendData('inventory', newItem);
      }
      fetchInventoryData();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving inventory item:', error);
    }
  };

  const handleEditClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleDeleteClick = async (id: string) => {
    try {
      await delData('inventory', id);
      fetchInventoryData();
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Item Name', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'unitPrice', headerName: 'Unit Price', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row as InventoryItem)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={() => handleDeleteClick(params.row.id)}>
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Inventory Management</Typography>
          <Button variant="contained" color="primary" onClick={handleAddItemClick}>
            Add Item
          </Button>
        </Box>
      )}
      {showForm && <InventoryForm onClose={handleCloseForm} onSave={handleSaveItem} selectedItem={selectedItem} />}
      {!showForm && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={items}
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

export default InventoryScreen;
