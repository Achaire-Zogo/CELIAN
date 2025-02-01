import { React, useState, useEffect } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, payUserOrders } from '../api-endpoints/endpoints';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

// Step content
const steps = [
  {
    label: 'Select a country',
    description: `Select the country where the command will be delivered.
    Taxes are applied per country at a fixed rate with up to 60 countries allowed.`,
  },
  {
    label: 'Select Payment mode',
    description: 'Payment modes allowed are PayPal, Orange Money, Mobile Money, Credit Cards.',
  },
  {
    label: 'Conclude the transaction',
    description: 'Pay the total amount plus the taxes and complete your order.',
  },
];

function Payment() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(8);
  const [paymentMethod, setPaymentMethod] = useState(3);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const snackbarId = useSelector((state) => state.snackbarId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paymentMethods = [
    { id: 1, name: 'PayPal', value: 'CASH' },
    { id: 2, name: 'Credit Card', value: 'CASH' },
    { id: 3, name: 'Mobile Money', value: 'CASH' },
    { id: 4, name: 'Orange Money', value: 'CASH' },
    { id: 5, name: 'Credit', value: 'CREDIT' },
  ];

  // Fetch countries from the backend
  useEffect(() => {
    setLoading(true);
    getAllCountries()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load countries. Please try again later.');
        setLoading(false);
      });
  }, [snackbarId]);

  // Stepper navigation
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Handle country selection
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Handle payment submission
  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    payUserOrders(paymentMethods[paymentMethod - 1].value, selectedCountry)
      .then((data) => {
        console.log(data);
        dispatch(authActions.paymentSuccessful());
        navigate('/orders');
      })
      .catch((err) => {
        console.error(err);
        setError('Payment failed. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box sx={{ maxWidth: 600, mt: 12, mx: 'auto', p: 3 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography sx={{ mb: 2 }}>{step.description}</Typography>

              {/* Step 1: Select Country */}
              {activeStep === 0 && (
                <FormControl fullWidth sx={{ mt: 3 }}>
                  <InputLabel id="country-select-label">Select Country</InputLabel>
                  <Select
                    labelId="country-select-label"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    label="Select Country"
                    disabled={loading}
                  >
                    {loading ? (
                      <MenuItem disabled>
                        <CircularProgress size={24} />
                      </MenuItem>
                    ) : error ? (
                      <MenuItem disabled>{error}</MenuItem>
                    ) : (
                      countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                          {country.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              )}

              {/* Step 2: Select Payment Method */}
              {activeStep === 1 && (
                <FormControl fullWidth sx={{ mt: 3 }}>
                  <InputLabel id="payment-method-select-label">Select Payment Method</InputLabel>
                  <Select
                    labelId="payment-method-select-label"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    label="Select Payment Method"
                  >
                    {paymentMethods.map((method) => (
                      <MenuItem key={method.id} value={method.id}>
                        {method.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Step 3: Confirm Payment */}
              {activeStep === 2 && (
                <>
                  <Typography variant="h6" color="success.main" sx={{ mb: 2 }}>
                    Congratulations! Your order is ready to be processed.
                  </Typography>
                  <Typography>
                    You selected payment method {paymentMethods[paymentMethod - 1].name} for{' '}
                    {countries[selectedCountry - 1]?.name}.
                  </Typography>
                </>
              )}

              {/* Navigation Buttons */}
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  disabled={
                    (activeStep === 0 && !selectedCountry) ||
                    (activeStep === 1 && !paymentMethod) ||
                    loading
                  }
                >
                  {index === steps.length - 1 ? 'Complete' : 'Continue'}
                </Button>
                <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {/* Final Step: Payment Confirmation */}
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            All steps completed - you're finished
          </Typography>
          <Button variant="contained" onClick={handlePay} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Pay Now'}
          </Button>
          <Button onClick={handleReset} sx={{ mt: 1, ml: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default Payment;