import { Button, Card, CardHeader,Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react'
import DatagridToolbar from '../clients/DatagridToolbar';
import {useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../api-endpoints/endpoints';

function Order() {

  const [data, setData] = useState([]);
  const snackbarId = useSelector((state) => state.snackbarId);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90,
      renderCell: (params)=>{
        return <Link to={`/orders/${params.value}`} style={{margin: 0}}>
        <Typography>{params.value}</Typography>
        </Link>
      }
      

     },
    
    {
      field: 'countryId',
      headerName: 'Country Id',
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
     
    },
    {
      field: 'items',
      headerName: 'Number Of items',
      width: 200,
      valueGetter: (value) => {
          console.log(value);
          return value.length;
       
      }
  
     

    },
   
    {
      field: 'state',
      headerName: 'STATUS',
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
      headerName: 'CreatedAt',
      width: 200,
      type: 'datetime',
      editable: true,
      sortable: true,
     
    }
   
   
    
  ];

  


  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    async function fetchData() {
      setLoading(true);
      getUserOrders()
       .then(data => setData(data))
       .catch(error => console.log(error))
       .finally(()=>setLoading(false));

    
    }

    fetchData();
  
  }, [snackbarId]);
  console.log(data);
  
  return (
   <Card sx={{mt: 3}}>
    <CardHeader>Orders List </CardHeader>
   
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

export default Order