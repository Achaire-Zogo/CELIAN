import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getOrderById, getDocumentsByOrderId } from '../api-endpoints/endpoints';
import DatagridToolbar from '../clients/DatagridToolbar';
import { format } from 'date-fns';
import axios from 'axios';

function OrderItem() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details
  useEffect(() => {
    setLoading(true);
    getOrderById(id)
      .then((res) => {
        setOrder(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load order details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  // Function to generate a PDF for a vehicle
  const generatePDF = (vehicleId) => {
    // Implement PDF generation logic here
    console.log(`Generating PDF for vehicle ID: ${vehicleId}`);
  };

  // Function to generate an HTML file for a vehicle
  const generateHTML = (vehicleId) => {
    // Implement HTML generation logic here
    console.log(`Generating HTML for vehicle ID: ${vehicleId}`);
  };

  // Function to fetch and display all documents
  const displayAllDocuments = () => {
    setLoading(true);
    getDocumentsByOrderId(id)
      .then((data) => {
        setDocuments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load documents. Please try again later.');
        setLoading(false);
      });
  };

  // Function to handle document download
  const handleDownload = (filename) => {
    const fileUrl = `${axios.defaults.baseURL}/api/documents/download/${filename}`;
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
    id: index + 1,
    filename: filename,
  }));

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3, mt: 12 }}>
      {/* Loading State */}
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 4 }}>
          {error}
        </Typography>
      )}

      {/* Order Details */}
      {order && !loading && (
        <>
          {/* Order Summary Section */}
          <Paper sx={{ padding: 3, marginBottom: 3 }}>
            <Typography variant="h4" gutterBottom>
              Order #{order.id}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              <strong>Status:</strong>{' '}
              <Typography variant="inherit" color="success" component="span">
                {order.state}
              </Typography>
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Order Created At:</strong>{' '}
              {format(new Date(order.createdAt), 'PPPpp')}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              <strong>Total:</strong> ${order.total.toLocaleString()}
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

          {/* Button to Display All Documents */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={displayAllDocuments}
              disabled={loading}
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
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  sx={{ width: '100%' }}
                  columns={columns}
                  rows={rows}
                />
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default OrderItem;