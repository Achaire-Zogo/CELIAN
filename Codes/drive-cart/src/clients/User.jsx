import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../api-endpoints/endpoints';
import DatagridToolbar from './DatagridToolbar';

function User() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Columns for DataGrid
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      renderCell: (params) => (
        <Link to={`/users/${params.value}`} style={{ textDecoration: 'none' }}>
          <Typography color="primary">{params.value}</Typography>
        </Link>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: true,
      sortable: true,
    },
    {
      field: 'clientType',
      headerName: 'Client Type',
      width: 150,
      editable: true,
      sortable: true,
    },
    {
      field: 'companyName',
      headerName: 'Company Name',
      width: 200,
      editable: true,
      sortable: true,
    },
    {
      field: 'registrationNumber',
      headerName: 'Registration Number',
      width: 200,
      editable: true,
      sortable: true,
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 150,
      editable: true,
      sortable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 150,
      editable: true,
      sortable: true,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
      type: 'tel',
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
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 200,
      type: 'datetime',
      editable: true,
      sortable: true,
      valueFormatter: (params) => params.value,
    },
  ];

  // Fetch users from the backend
  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load users. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <Card sx={{ mt: 8, p: 2 }}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            Users List
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

export default User;