import { Button, Card, CardHeader, Toolbar, Typography } from '@mui/material';
import { DataGrid,GridPagination, renderActionsCell } from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react'
import DatagridToolbar from './DatagridToolbar';
import { Link } from 'react-router-dom';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { getAllUsers } from '../api-endpoints/endpoints';

function User() {

  const [data, setData] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90,
      renderCell: (params)=>{
        return <Link to={'/'} style={{textDecoration: 'none'}}>
        <Typography>{params.value}</Typography>
        </Link>
      }

     },
    
    {
      field: 'name',
      headerName: 'Name',
      width: 600,
      editable: true,
      sortable: true,
     
    },
    {
      field: 'clientType',
      headerName: 'ClientType',
      width: 600,
      editable: true,
      sortable: true,
     
    },
    {
      field: 'companyName',
      headerName: 'Company Name',
      width: 600,
      editable: true,
      sortable: true,
     
    },
    {
      field: 'registrationNumber',
      headerName: 'Registration Number',
      width: 600,
      editable: true,
      sortable: true,
     
    },
    {
      field: 'firstName',
      headerName: 'FirstName',
      width: 600,
      editable: true,
      sortable: true,
     
    },
    {
      field: 'lastName',
      headerName: 'LastName',
      width: 600,
      editable: true,
      sortable: true,
     
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 600,
      type: 'tel',
      editable: true,
      sortable: true,
     
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      width: 600,
      type: 'datetime',
      editable: true,
      sortable: true,
     
    },
    {
      field: 'updatedAt',
      headerName: 'UpdatedAt',
      width: 600,
      type:  'datetime',
      editable: true,
      sortable: true,
     
    },

  
   
   
    
  ];

  


  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    async function fetchData() {
      setLoading(true);
       getAllUsers()
       .then(data => setData(data))
       .catch(error => console.log(error))
       .finally(()=>setLoading(false));

    
    }

    fetchData();
  
  }, []);
  console.log(data);
  
  return (
   <Card sx={{mt: 3}}>
    <CardHeader>Users List </CardHeader>
   
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
    
    loading={loading} sx={{  width: '100%'}} columns={columns} rows={data}/>
   </Card>
  )
}

export default User