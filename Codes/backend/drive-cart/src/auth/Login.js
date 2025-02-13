import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../api-endpoints/endpoints';
import { authActions } from '../store';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle login response
  const onResReceived = (data) => {
    console.log(data);
    localStorage.setItem('userId', data.user.id);
    localStorage.setItem('token', data.token);
    localStorage.setItem('clientType', data.user.clientType);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('username', data.user.name);
    localStorage.setItem('firstName', data.user.firstName);
    localStorage.setItem('lastName', data.user.lastName);
    localStorage.setItem('phoneNumber', data.user.phoneNumber);
    localStorage.setItem('registrationNumber', data.user.registrationNumber);
    localStorage.setItem('companyName', data.user.companyName);

    dispatch(authActions.login());
    if(data.user.clientType === "ADMIN"){
      dispatch(authActions.setAdmin());
    }
    navigate('/');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    login(inputs)
      .then(onResReceived)
      .catch((err) => {
        console.error(err);
        setError('Invalid email or password. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  // Handle input change
  const handleChange = (e) => {
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
            Login
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

          {/* Login Button */}
          <Button
            sx={{ mt: 2, borderRadius: 10, padding: 1.5 }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>

          {/* Signup Link */}
          <Button
            sx={{ mt: 2, borderRadius: 10, padding: 1.5 }}
            component={Link}
            to="/register"
            variant="outlined"
            color="secondary"
            fullWidth
          >
            Don't have an account? Signup
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;