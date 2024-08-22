import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Report } from './interface';
import ReportForm from './reportForm';
import { getData, sendData, delData } from '../../config/firebaseMethods';

const ReportScreen: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const reportData: any = await getData('reports');
      setReports(reportData);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const handleAddReportClick = () => {
    setShowForm(true);
    setSelectedReport(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveReport = async (newReport: Omit<Report, 'id'>) => {
    try {
      await sendData('reports', newReport);
      fetchReportData();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving report:', error);
    }
  };

  const handleDeleteClick = async (id: string) => {
    try {
      await delData('reports', id);
      fetchReportData();
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'content', headerName: 'Content', width: 400 },
    { field: 'generatedAt', headerName: 'Generated At', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
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
          <Typography variant="h4" sx={{ color: '#006494' }}>Reports</Typography>
          <Button variant="contained" color="primary" onClick={handleAddReportClick}>
            Generate Report
          </Button>
        </Box>
      )}
      {showForm && <ReportForm onClose={handleCloseForm} onSave={handleSaveReport} />}
      {!showForm && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={reports}
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

export default ReportScreen;
