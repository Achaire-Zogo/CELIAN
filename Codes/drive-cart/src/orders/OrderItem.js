import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Paper, Grid, Divider, List, ListItem, ListItemText } from '@mui/material';
import { getOrderById, getDocumentsByOrderId } from '../api-endpoints/endpoints';
import { DataGrid } from '@mui/x-data-grid';
import DatagridToolbar from '../clients/DatagridToolbar';

import { format } from 'date-fns';
import axios from 'axios';

function OrderItem() {
  const { id } = useParams();
  const [order, setOrder] = useState({
    id: 1,
    userId: 2,
    countryId: 8,
    total: 7200000,
    items: [],
    state: 'CREATED',
    type: 'CASH',
    createdAt: '2025-01-30T16:10:44',
  });

  const [documents, setDocuments] = useState([])

  useEffect(() => {
    getOrderById(id)
      .then((res) => {
        console.log(res);
        setOrder(res);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Function to generate a PDF for a vehicle by calling the backend
  const generatePDF = (vehicleId) => {
  
  };

  // Function to generate an HTML file for a vehicle by calling the backend
  const generateHTML = (vehicleId) => {
   
  };
  
  const displayAllDocuments = ()=>{
    getDocumentsByOrderId(id)
    .then((data)=>{
        setDocuments(data);
    }).catch((err) => console.log(err));
  }

  // Function to handle document download
  const handleDownload = (filename) => {
    // Here you can implement the logic for downloading the file, e.g., by making an API call
    const fileUrl = `${axios.defaults.baseURL}/api/documents/download/${filename}`; // Replace with actual file URL or API endpoint
    window.open(fileUrl, '_blank');
  };



  // Columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'Document ID', width: 150 },
    { field: 'filename', headerName: 'Filename', width: 400 },
    {
      field: 'download',
      headerName: 'Download',
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDownload(params.row.filename)}
        >
          Download
        </Button>
      ),
    },
  ];

  // Prepare rows for DataGrid
  const rows = documents.map((filename, index) => ({
    id: index + 1, // You can replace this with a more meaningful ID
    filename: filename,
  }));


  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', padding: 3, mt: 12 }}>
      {/* Order Summary Section */}
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Order #{order.id}
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          <strong>Status:</strong> <Typography variant="inherit" color="success" component="span"> {order.state}</Typography>
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          <strong>Order Created At:</strong> {format(new Date(order.createdAt), 'PPPpp')}
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          <strong>Total: </strong> ${order.total.toLocaleString()}
        </Typography>
      </Paper>

      {/* Vehicle List Section */}
      <Typography variant="h5" gutterBottom>
        Vehicles in Order:
      </Typography>

      {order.items.length > 0 ? (
        order.items.map((vehicle) => (
          <Paper key={vehicle.id} sx={{ padding: 3, marginBottom: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6">
                  <strong>Vehicle:</strong> {vehicle.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Model:</strong> {vehicle.model}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Year:</strong> {vehicle.year}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Price:</strong> ${vehicle.price.toLocaleString()}
                </Typography>
              </Grid>

              {/* Generate PDF and HTML buttons */}
              <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => generatePDF(vehicle.id)}
                  sx={{ marginBottom: 1 }}
                >
                  Generate PDF
                </Button>
                <br />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => generateHTML(vehicle.id)}
                >
                  Generate HTML
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          No vehicles associated with this order.
        </Typography>
      )}

      {/* Divider to separate content */}
      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

      {/* Button to Download All Documents (if applicable) */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={displayAllDocuments}
        >
          Display All Documents
        </Button>
      </Box>
       {/* Display Documents with Download Buttons */}
       {documents.length > 0 && (
        <>
        <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Documents:
          </Typography>
          <DataGrid 
    slots={{
        toolbar: DatagridToolbar,
        baseButton: Button,
        
    }}
    initialState={{
      pagination: {
          paginationModel: { page: 0, pageSize: 10 },
      },
  }}
   pageSizeOptions={[5, 10, 20]}
   
    slotProps={{
      baseButton: {
        variant: 'outlined',
      },
      
    }}
    
     sx={{  width: '100%'}} columns={columns} rows={rows}/>
        </Box>
        </>
      )}
    </Box>
  );
}

export default OrderItem;
