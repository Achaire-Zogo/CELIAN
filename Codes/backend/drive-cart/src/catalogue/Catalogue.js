import React, { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Typography, TextField, Button, Paper, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchVehicles, getAllVehicles } from '../api-endpoints/endpoints';
import ElectricCar from './vehicles/ElectricCar';
import ElectricScooter from './vehicles/ElectricScooter';
import FuelScooter from './vehicles/FuelScooter';
import FuelCar from './vehicles/FuelCar';
import Fleet from './vehicles/Fleet';
import { useSelector } from 'react-redux';

const vehicleTypes = ['ELECTRIC_CAR', 'FUEL_CAR', 'ELECTRIC_SCOOTER', 'FUEL_SCOOTER', 'CAR', 'SCOOTER', 'FLEET'];

const Catalogue = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search filters
  const [searchParams, setSearchParams] = useState({
    type: '',
    model: '',
    marque: '',
    minPrice: '',
    maxPrice: '',
  });

  const snackbarId = useSelector((state) => state.vehicleSnackbarId);

  // Function to clean search parameters
  const cleanSearchParams = (params) => {
    const cleanedParams = {};
    for (const key in params) {
      if (params[key] !== '' && params[key] != null) {
        cleanedParams[key] = params[key];
      }
    }
    return cleanedParams;
  };

  // Fetch vehicles when search is triggered
  const handleSearch = () => {
    setLoading(true);

    // Clean the search parameters
    const cleanedSearchParams = cleanSearchParams(searchParams);

    searchVehicles(cleanedSearchParams)
      .then((data) => {
        console.log(data);
        setVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch vehicles. Please try again later.');
        setLoading(false);
      });
  };

  // Fetch vehicles from the backend
  useEffect(() => {
    setLoading(true);
    getAllVehicles()
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load vehicles. Please try again later.');
        setLoading(false);
      });
  }, [snackbarId]);

  // Handle search input changes
  const handleInputChange = (event) => {
    setSearchParams({ ...searchParams, [event.target.name]: event.target.value });
  };

  // Render the appropriate vehicle component based on type
  const getVehicle = (vehicle, index) => {
    switch (vehicle.type) {
      case 'ELECTRIC_CAR':
        return <ElectricCar key={index} props={vehicle} />;
      case 'ELECTRIC_SCOOTER':
        return <ElectricScooter key={index} props={vehicle} />;
      case 'FUEL_SCOOTER':
        return <FuelScooter key={index} props={vehicle} />;
      case 'FUEL_CAR':
        return <FuelCar key={index} props={vehicle} />;
      case 'FLEET':
        return <Fleet key={index} isCart={false} props={vehicle} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: '20px', mt: 12 }}>
      {/* Search Bar */}
      <Paper
        elevation={3}
        sx={{
          padding: '10px',
          borderRadius: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          label="Model"
          name="model"
          variant="outlined"
          size="small"
          value={searchParams.model}
          onChange={handleInputChange}
          sx={{ width: { xs: '100%', sm: '20%' }, backgroundColor: '#fff' }}
        />
        <TextField
          label="Marque"
          name="marque"
          variant="outlined"
          size="small"
          value={searchParams.marque}
          onChange={handleInputChange}
          sx={{ width: { xs: '100%', sm: '20%' }, backgroundColor: '#fff' }}
        />
        <TextField
          select
          label="Type"
          name="type"
          variant="outlined"
          size="small"
          value={searchParams.type}
          onChange={handleInputChange}
          sx={{ width: { xs: '100%', sm: '20%' }, backgroundColor: '#fff' }}
        >
          <MenuItem value="">All</MenuItem>
          {vehicleTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type.replace('_', ' ')}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Min Price"
          name="minPrice"
          type="number"
          variant="outlined"
          size="small"
          value={searchParams.minPrice}
          onChange={handleInputChange}
          sx={{ width: { xs: '100%', sm: '20%' }, backgroundColor: '#fff' }}
        />
        <TextField
          label="Max Price"
          name="maxPrice"
          type="number"
          variant="outlined"
          size="small"
          value={searchParams.maxPrice}
          onChange={handleInputChange}
          sx={{ width: { xs: '100%', sm: '20%' }, backgroundColor: '#fff' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          sx={{
            height: '36px',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Filter
        </Button>
      </Paper>

      {loading ? (
        // Loading state
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        // Error state
        <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginTop: 4 }}>
          {error}
        </Typography>
      ) : vehicles.length === 0 ? (
        // No results found
        <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center', marginTop: 4 }}>
          No vehicles found.
        </Typography>
      ) : (
        // Display search results
        <Grid container spacing={3} sx={{ marginTop: 3, justifyContent: 'center', alignItems: 'stretch' }}>
          {vehicles.map((vehicle, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              {getVehicle(vehicle, index)}
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Catalogue;