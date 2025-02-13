import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {
  addElectricCar,
  addFuelCar,
  addElectricScooter,
  addFuelScooter,
  addVehicleFleet,
  getAllVehicles,
} from '../../api-endpoints/endpoints';
import { authActions } from '../../store';

function AddVehicule() {
  const [type, setType] = useState('');
  const [marque, setMarque] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState(0);
  const [uri, setUri] = useState('');
  const [options, setOptions] = useState([]);
  const [batteryCapacity, setBatteryCapacity] = useState(0);
  const [drivingRange, setDrivingRange] = useState(0);
  const [engineSize, setEngineSize] = useState(0);
  const [fuelType, setFuelType] = useState('');
  const [flotteType, setFlotteType] = useState('');
  const [vehicles, setVehicles] = useState([]); // To store vehicles in the fleet
  const [existingVehicles, setExistingVehicles] = useState([]); // To store existing vehicles from the backend
  const [selectedExistingVehicle, setSelectedExistingVehicle] = useState(''); // To store the selected existing vehicle

  const dispatch = useDispatch();
  const snackbarId = useSelector((state) => state.vehicleSnackbarId);


  const types = [
    'ELECTRIC_CAR',
    'FUEL_CAR',
    'ELECTRIC_SCOOTER',
    'FUEL_SCOOTER',
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

  // Fetch existing vehicles from the backend
  useEffect(() => {
    if (type === 'FLEET') {
      getAllVehicles()
        .then((data) => setExistingVehicles(data))
        .catch((err) => console.log(err));
    }
  }, [type,snackbarId]);

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
      type, // Include the type of the vehicle
    };
    setVehicles([...vehicles, newVehicle]);
    // Clear the form fields after adding a vehicle to the fleet
    setMarque('');
    setModel('');
    setPrice(0);
    setUri('');
    setOptions([]);
    setBatteryCapacity(0);
    setDrivingRange(0);
    setEngineSize(0);
    setFuelType('');
  };

  const handleAddExistingVehicleToFleet = () => {
    if (selectedExistingVehicle) {
      // Create a new vehicle object without the `id` field
      const { id, ...vehicleWithoutId } = selectedExistingVehicle;
      setVehicles([...vehicles, vehicleWithoutId]);
      setSelectedExistingVehicle('');
    }
  };

  const handleRemoveVehicleFromFleet = (index) => {
    const updatedFleet = vehicles.filter((_, i) => i !== index);
    setVehicles(updatedFleet);
  };

  const handleData = (data) => {
    console.log(data);
    dispatch(authActions.addVehicle());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicleData = {
      type,
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
      vehicles: type === 'FLEET' ? vehicles : [],
    };

    console.log('Vehicle Data:', vehicleData);

    switch (type) {
      case 'ELECTRIC_CAR':
        addElectricCar(vehicleData)
          .then((data) => handleData(data))
          .catch((err) => console.log(err));
        break;
      case 'FUEL_CAR':
        addFuelCar(vehicleData)
          .then((data) => handleData(data))
          .catch((err) => console.log(err));
        break;
      case 'ELECTRIC_SCOOTER':
        addElectricScooter(vehicleData)
          .then((data) => handleData(data))
          .catch((err) => console.log(err));
        break;
      case 'FUEL_SCOOTER':
        addFuelScooter(vehicleData)
          .then((data) => handleData(data))
          .catch((err) => console.log(err));
        break;
      case 'FLEET':
        addVehicleFleet(vehicleData)
          .then((data) => handleData(data))
          .catch((err) => console.log(err));
        break;
      default:
        console.log('Invalid vehicle type');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
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
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Vehicle Type"
                  required
                >
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {type !== 'FLEET' && (
              <>
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

                {(type === 'ELECTRIC_CAR' || type === 'ELECTRIC_SCOOTER') && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Battery Capacity"
                        type="number"
                        value={batteryCapacity}
                        onChange={(e) => setBatteryCapacity(e.target.value)}
                        fullWidth
                        required={type === 'ELECTRIC_CAR' || type === 'ELECTRIC_SCOOTER'}
                      />
                    </Grid>
                    {type === 'ELECTRIC_CAR' && (
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Driving Range"
                          type="number"
                          value={drivingRange}
                          onChange={(e) => setDrivingRange(e.target.value)}
                          fullWidth
                          required
                        />
                      </Grid>
                    )}
                  </>
                )}

                {(type === 'FUEL_CAR' || type === 'FUEL_SCOOTER') && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Engine Size"
                        type="number"
                        value={engineSize}
                        onChange={(e) => setEngineSize(e.target.value)}
                        fullWidth
                        required={type === 'FUEL_CAR' || type === 'FUEL_SCOOTER'}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Fuel Type</InputLabel>
                        <Select
                          value={fuelType}
                          onChange={(e) => setFuelType(e.target.value)}
                          label="Fuel Type"
                          required={type === 'FUEL_CAR' || type === 'FUEL_SCOOTER'}
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
              </>
            )}

            {type === 'FLEET' && (
              <>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Flotte Type</InputLabel>
                    <Select
                      value={flotteType}
                      onChange={(e) => setFlotteType(e.target.value)}
                      label="Flotte Type"
                      required
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
                    Add Vehicles to Fleet
                  </Typography>

                  {/* Add Existing Vehicle */}
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Select Existing Vehicle</InputLabel>
                    <Select
                      value={selectedExistingVehicle}
                      onChange={(e) => setSelectedExistingVehicle(e.target.value)}
                      label="Select Existing Vehicle"
                    >
                      {existingVehicles.map((vehicle) => (
                        <MenuItem key={vehicle.id} value={vehicle}>
                          {vehicle.marque} {vehicle.model} - ${vehicle.price}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddExistingVehicleToFleet}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Add Existing Vehicle to Fleet
                  </Button>

                  {/* Add New Vehicle */}
                  <Typography variant="subtitle1" gutterBottom>
                    Or Create a New Vehicle to Add:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Marque"
                        value={marque}
                        onChange={(e) => setMarque(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
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
                      <Button
                        variant="outlined"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleAddVehicleToFleet}
                        fullWidth
                      >
                        Add New Vehicle to Fleet
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Display Vehicles in Fleet */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Vehicles in Fleet
                  </Typography>
                  {vehicles.map((vehicle, index) => (
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
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {type === 'FLEET' ? 'Create Fleet' : 'Add Vehicle'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default AddVehicule;