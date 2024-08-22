import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Service, ServiceRequest } from './interfaces';
import ServiceRequestForm from './serviceReqForm';
import { getData, sendData, editData } from '../../config/firebaseMethods';

const ServiceScreen: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });

  useEffect(() => {
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {
    try {
      const rawData: unknown = await getData('serviceRequests');
      const serviceRequests: ServiceRequest[] = rawData as ServiceRequest[];
      console.log('Fetched Service Data:', serviceRequests);
   
      const services: Service[] = serviceRequests.map(request => ({
        id: request.id,
        name: request.serviceName,
        description: request.description,
        price: parseFloat(request.price),
        staffID: '',
        serviceName: request.serviceName,
        status: request.status,
      }));
  
      setServices(services);
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };
  

  const handleAddServiceClick = () => {
    setShowForm(true);
    setSelectedRequest(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveServiceRequest = async (newRequest: Omit<ServiceRequest, 'id'>) => {
    try {
      if (selectedRequest) {
        await editData('serviceRequests', selectedRequest.id, { id: selectedRequest.id, ...newRequest });
      } else {
        await sendData('serviceRequests', newRequest);
      }
      setShowForm(false);
      fetchServiceData();
    } catch (error) {
      console.error('Failed to save service request:', error);
    }
  };

  const handleEditClick = (service: ServiceRequest) => {
    const existingRequest: ServiceRequest = {
      id: service.id,
      serviceName: service.serviceName,
      description: service.description || '',
      price: service.price,
      status: service.status,
      serviceId: service.serviceId
    };
    setSelectedRequest(existingRequest);
    setShowForm(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'serviceName', headerName: 'Service Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row as ServiceRequest)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Service Management</Typography>
          <Button variant="contained" color="primary" onClick={handleAddServiceClick}>
            Add Service
          </Button>
        </Box>
      )}
      {showForm && (
        <ServiceRequestForm
          onClose={handleCloseForm}
          onSave={handleSaveServiceRequest}
          selectedRequest={selectedRequest}
          services={services}
        />
      )}
      {!showForm && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={services.map(service => ({
              id: service.id,
              serviceName: service.serviceName,
              description: service.description || '',
              price: service.price,
              status: service.status
            }))}
            columns={columns}
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default ServiceScreen;
