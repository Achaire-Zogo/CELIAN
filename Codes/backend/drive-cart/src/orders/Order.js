import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserOrders } from '../api-endpoints/endpoints';
import DatagridToolbar from '../clients/DatagridToolbar';

function Order() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const snackbarId = useSelector((state) => state.snackbarId);

  // Columns for DataGrid
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      renderCell: (params) => (
        <Link to={`/orders/${params.value}`} style={{ textDecoration: 'none' }}>
          <Typography color="primary">{params.value}</Typography>
        </Link>
      ),
    },
    {
      field: 'countryId',
      headerName: 'Country ID',
      width: 150,
      editable: true,
      sortable: true,
    },
    {
      field: 'total',
      headerName: 'Total Amount',
      width: 200,
      editable: true,
      sortable: true,
      valueFormatter: (params) => `$${params}`,
    },
    {
      field: 'items',
      headerName: 'Number of Items',
      width: 200,
      valueGetter: (params) => params.length,
    },
    {
      field: 'state',
      headerName: 'Status',
      width: 150,
      editable: true,
      sortable: true,
    },
    {
      field: 'type',
      headerName: 'Payment Type',
      width: 200,
      editable: true,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      type: 'datetime',
      editable: true,
      sortable: true,
      valueFormatter: (params) => params.value,
    },
  ];

  // Fetch orders from the backend
  useEffect(() => {
    setLoading(true);
    getUserOrders()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      });
  }, [snackbarId]);

  return (
    <Card sx={{ mt: 8, p: 2 }}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            Orders List
          </Typography>
        }
        sx={{ backgroundColor: 'primary.main', color: 'white' }}
      />

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

      {/* DataGrid */}
      {!loading && !error && (
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
          loading={loading}
          sx={{ width: '100%', mt: 2 }}
          columns={columns}
          rows={data}
        />
      )}
    </Card>
  );
}

export default Order;