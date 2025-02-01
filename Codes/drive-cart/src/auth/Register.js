import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../api-endpoints/endpoints';
import { authActions } from '../store';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCompany, setIsCompany] = useState(true);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
    clientType: 'COMPANY',
    companyName: '',
    registrationNumber: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clientType = {
    INDIVIDUAL: false,
    COMPANY: true,
  };

  // Handle registration response
  const onResReceived = (data) => {
    console.log(data);
    navigate('/login');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    register(inputs)
      .then(onResReceived)
      .catch((err) => {
        console.error(err);
        setError('Registration failed. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  // Handle input change
  const handleChange = (e) => {
    if (e.target.name === 'clientType') {
      setIsCompany(clientType[e.target.value]);
    }
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box
      width={{ xs: '90%', sm: '40%' }}
      borderRadius={10}
      boxShadow={'10px 5px 15px #ccc'}
      margin={'auto'}
      marginTop={12}
      sx={{ backgroundColor: 'background.paper' }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          width={'80%'}
          padding={3}
          margin={'auto'}
        >
          <Typography
            fontFamily={'quicksand'}
            padding={1}
            variant="h4"
            color="primary"
            textAlign={'center'}
            fontWeight="bold"
          >
            Register
          </Typography>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Email Field */}
          <TextField
            label="Email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
            type="email"
            required
            margin="normal"
            fullWidth
          />

          {/* Password Field */}
          <TextField
            label="Password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            type="password"
            required
            margin="normal"
            fullWidth
          />

          {/* Name Field */}
          <TextField
            label="Name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            type="text"
            required
            margin="normal"
            fullWidth
          />

          {/* Client Type Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="clientType">Type</InputLabel>
            <Select
              labelId="clientType"
              label="Type Account"
              value={inputs.clientType}
              onChange={handleChange}
              name="clientType"
              required
            >
              <MenuItem value="COMPANY">Company</MenuItem>
              <MenuItem value="INDIVIDUAL">Individual</MenuItem>
            </Select>
          </FormControl>

          {/* Conditional Fields for Company */}
          {isCompany && (
            <>
              <TextField
                label="Company Name"
                value={inputs.companyName}
                onChange={handleChange}
                name="companyName"
                type="text"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Registration Number"
                value={inputs.registrationNumber}
                onChange={handleChange}
                name="registrationNumber"
                type="text"
                margin="normal"
                fullWidth
              />
            </>
          )}

          {/* First Name Field */}
          <TextField
            label="First Name"
            value={inputs.firstName}
            onChange={handleChange}
            name="firstName"
            type="text"
            margin="normal"
            fullWidth
          />

          {/* Last Name Field */}
          <TextField
            label="Last Name"
            value={inputs.lastName}
            onChange={handleChange}
            name="lastName"
            type="text"
            margin="normal"
            fullWidth
          />

          {/* Phone Number Field */}
          <TextField
            label="Phone Number"
            value={inputs.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            type="tel"
            margin="normal"
            fullWidth
          />

          {/* Register Button */}
          <Button
            sx={{ mt: 2, borderRadius: 10, padding: 1.5 }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>

          {/* Login Link */}
          <Button
            sx={{ mt: 2, borderRadius: 10, padding: 1.5 }}
            component={Link}
            to="/login"
            variant="outlined"
            color="secondary"
            fullWidth
          >
            Already have an account? Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;