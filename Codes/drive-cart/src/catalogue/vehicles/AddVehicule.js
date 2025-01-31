import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Paper,
  Checkbox,
  ListItemText,
  IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function AddVehicule() {
  const [vehicleType, setVehicleType] = useState('');
  const [marque, setMarque] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [uri, setUri] = useState('');
  const [options, setOptions] = useState([]);
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [drivingRange, setDrivingRange] = useState('');
  const [engineSize, setEngineSize] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [flotteType, setFlotteType] = useState('');
  const [fleetVehicles, setFleetVehicles] = useState([]); // To store vehicles in the fleet

  const vehicleTypes = [
    'ELECTRIC_CAR',
    'FUEL_CAR',
    'ELECTRIC_SCOOTER',
    'FUEL_SCOOTER',
    'CAR',
    'SCOOTER',
    'FLEET',
  ];

  const fuelTypes = ['GASOLINE', 'DIESEL', 'SUPER'];
  const flotteTypes = [
    'ELECTRIC',
    'FUEL',
    'HYBRID',
    'ELECTRIC_CAR',
    'ELECTRIC_SCOOTER',
    'FUEL_CAR',
    'FUEL_SCOOTER',
  ];

  const handleAddVehicleToFleet = () => {
    const newVehicle = {
      marque,
      model,
      price,
      uri,
      options,
      batteryCapacity,
      drivingRange,
      engineSize,
      fuelType,
    };
    setFleetVehicles([...fleetVehicles, newVehicle]);
    // Clear the form fields after adding a vehicle to the fleet
    setMarque('');
    setModel('');
    setPrice('');
    setUri('');
    setOptions([]);
    setBatteryCapacity('');
    setDrivingRange('');
    setEngineSize('');
    setFuelType('');
  };

  const handleRemoveVehicleFromFleet = (index) => {
    const updatedFleet = fleetVehicles.filter((_, i) => i !== index);
    setFleetVehicles(updatedFleet);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicleData = {
      vehicleType,
      marque,
      model,
      price,
      uri,
      options,
      batteryCapacity,
      drivingRange,
      engineSize,
      fuelType,
      flotteType,
      fleetVehicles: vehicleType === 'FLEET' ? fleetVehicles : undefined,
    };
    console.log('Vehicle Data:', vehicleData);
    // Add logic to submit data to backend
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Vehicle
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Vehicle Type</InputLabel>
                <Select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  label="Vehicle Type"
                  required
                >
                  {vehicleTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Marque"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URI"
                value={uri}
                onChange={(e) => setUri(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Options</InputLabel>
                <Select
                  multiple
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {['GPS', 'Bluetooth', 'Air Conditioning', 'Heated Seats'].map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={options.indexOf(option) > -1} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {vehicleType === 'ELECTRIC_CAR' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Battery Capacity"
                    type="number"
                    value={batteryCapacity}
                    onChange={(e) => setBatteryCapacity(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Driving Range"
                    type="number"
                    value={drivingRange}
                    onChange={(e) => setDrivingRange(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </>
            )}

            {vehicleType === 'FUEL_CAR' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Engine Size"
                    type="number"
                    value={engineSize}
                    onChange={(e) => setEngineSize(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Fuel Type</InputLabel>
                    <Select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      label="Fuel Type"
                    >
                      {fuelTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            {vehicleType === 'FLEET' && (
              <>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Flotte Type</InputLabel>
                    <Select
                      value={flotteType}
                      onChange={(e) => setFlotteType(e.target.value)}
                      label="Flotte Type"
                    >
                      {flotteTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Vehicles in Fleet
                  </Typography>
                  {fleetVehicles.map((vehicle, index) => (
                    <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
                      <Typography variant="subtitle1">
                        {vehicle.marque} {vehicle.model} - ${vehicle.price}
                      </Typography>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveVehicleFromFleet(index)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Paper>
                  ))}
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddVehicleToFleet}
                    fullWidth
                  >
                    Add Vehicle to Fleet
                  </Button>
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {vehicleType === 'FLEET' ? 'Create Fleet' : 'Add Vehicle'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default AddVehicule;