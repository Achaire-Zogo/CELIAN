import {React, useEffect, useState} from 'react'
import {Box, Grid} from '@mui/material'
import { getAllVehicles } from '../api-endpoints/endpoints';
import ElectricCar from './vehicles/ElectricCar';
import ElectricScooter from './vehicles/ElectricScooter';
import FuelScooter from './vehicles/FuelScooter';
import FuelCar from './vehicles/FuelCar';
import Fleet from './vehicles/Fleet';

const Catalogue = () => {
  const [vehicles, setVehicles] = useState();
 
  const getVehicle = (vehicle, index) => {
    switch(vehicle.type) {
      case "ELECTRIC_CAR": 
        return <ElectricCar 
          key={index}
          id={vehicle.id}
          batteryCapacity={vehicle.batteryCapacity}
          drivingRange={vehicle.drivingRange}
          marque={vehicle.marque}
          model={vehicle.model}
          options={vehicle.options}
          price={vehicle.price}
          uri={vehicle.uri}
          type={vehicle.type}
        />;
      
      case "ELECTRIC_SCOOTER": 
        return <ElectricScooter 
          key={index}
          id={vehicle.id}
          batteryCapacity={vehicle.batteryCapacity}
          marque={vehicle.marque}
          model={vehicle.model}
          options={vehicle.options}
          price={vehicle.price}
          uri={vehicle.uri}
          type={vehicle.type}
        />;

      case "FUEL_SCOOTER": 
        return <FuelScooter 
          key={index}
          id={vehicle.id}
          marque={vehicle.marque}
          model={vehicle.model}
          price={vehicle.price}
          uri={vehicle.uri}
          options={vehicle.options}
          type={vehicle.type}
          engineSize={vehicle.engineSize}
          fuelType={vehicle.fuelType}
        />;

      case "FUEL_CAR": 
        return <FuelCar
          key={index}
          id={vehicle.id}
          marque={vehicle.marque}
          model={vehicle.model}
          price={vehicle.price}
          uri={vehicle.uri}
          options={vehicle.options}
          type={vehicle.type}
          engineSize={vehicle.engineSize}
          fuelType={vehicle.fuelType}
        />;

      case "FLEET": 
        return <Fleet 
          key={index} 
          id={vehicle.id} 
          vehicules={vehicle.vehicules} 
        />;

      default:
        return null;
    }
  };
  
  
  
   useEffect(() => {
    getAllVehicles()
      .then((data) => setVehicles(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box margin="auto" marginTop={12}>
      <Grid container sx={{
        justifyContent: "center",
        alignItems: "center",
      }}>
        {vehicles && vehicles.map((vehicle, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }} sx={{margin: 2}}>
            {getVehicle(vehicle, index)}
          </Grid>
        ))}
      </Grid>
      
   
    </Box>
  );
};

export default Catalogue;