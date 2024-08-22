import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { InventoryItem } from './interface';

interface InventoryFormProps {
  onClose: () => void;
  onSave: (newItem: Omit<InventoryItem, 'id'>) => void;
  selectedItem: InventoryItem | null;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ onClose, onSave, selectedItem }) => {
  const [name, setName] = useState(selectedItem ? selectedItem.name : '');
  const [quantity, setQuantity] = useState(selectedItem ? selectedItem.quantity : 0);
  const [unitPrice, setUnitPrice] = useState(selectedItem ? selectedItem.unitPrice : 0);
  const [description, setDescription] = useState(selectedItem ? selectedItem.description : '');

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setQuantity(selectedItem.quantity);
      setUnitPrice(selectedItem.unitPrice);
      setDescription(selectedItem.description);
    }
  }, [selectedItem]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ name, quantity, unitPrice, description });
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
        {selectedItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
      </Typography>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        variant="outlined"
        required
      />
      <TextField
        label="Unit Price"
        type="number"
        value={unitPrice}
        onChange={(e) => setUnitPrice(Number(e.target.value))}
        variant="outlined"
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {selectedItem ? 'Save Changes' : 'Add Item'}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default InventoryForm;
