import React, { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import { getAllVehicles } from '../api-endpoints/endpoints';
import ElectricCar from './vehicles/ElectricCar';
import ElectricScooter from './vehicles/ElectricScooter';
import FuelScooter from './vehicles/FuelScooter';
import FuelCar from './vehicles/FuelCar';
import Fleet from './vehicles/Fleet';
import { useSelector } from 'react-redux';

const Catalogue = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const snackbarId = useSelector((state) => state.snackbarId);

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
    <Box sx={{ margin: 'auto', marginTop: 12, padding: 3 }}>
      {loading ? (
        // Loading state
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
      ) : error ? (
        // Error state
        <Typography
          variant="h6"
          color="error"
          sx={{ textAlign: 'center', marginTop: 4 }}
        >
          {error}
        </Typography>
      ) : (
        // Display vehicles in a grid
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {vehicles.map((vehicle, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {getVehicle(vehicle, index)}
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Catalogue;