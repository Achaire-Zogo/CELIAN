import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import {useDispatch ,useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import { getAllCountries, payUserOrders } from '../api-endpoints/endpoints';
import { authActions } from '../store';



import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation

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
  const snackbarId = useSelector((state) => state.snackbarId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [countries, setCountries] = useState([]); // Example countries
  const paymentMethods = [{id:1,name:'PayPal',value:'CASH'}
    ,{id:2,name:'Credit Card',value:'CASH'},
    {id:3,name: 'Mobile Money',value: 'CASH'},
    {id:4,name:'Orange Money',value:'CASH'},{id:5,name:'Credit',value:'CREDIT'}] // Example payment methods
  


  useEffect(() => {
      getAllCountries()
        .then((data) => setCountries(data))
        .catch((err) => console.log(err));
    
      
    }, [snackbarId]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePay = (e)=>{
    e.preventDefault();

    payUserOrders(paymentMethods[paymentMethod-1].value,selectedCountry).then((data) => {
      console.log(data);
      dispatch(authActions.paymentSuccessful());
      navigate('/orders');
    
    })
    .catch((err) => console.log(err));
  }

  return (
    <Box sx={{ maxWidth: 400, mt: 12 }}>
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
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                {activeStep === 0 && (
                  <FormControl fullWidth sx={{mt: 3}}>
                    <InputLabel id="country-select-label">Select Country</InputLabel>
                    <Select
                      labelId="country-select-label"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      label="Select Country"
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {activeStep === 1 && (
                  <FormControl fullWidth sx={{mt: 3}}>
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

                {activeStep === 2 && (<>
                  <Typography variant="h6" color="success.main" sx={{ mb: 2 }}>
                    Congratulations! Your order is ready to be processed.
                  </Typography>
                 <Typography>You selected payment method {paymentMethods[paymentMethod-1].name} for Country {countries[selectedCountry-1].name}</Typography> 
                  </>
                )}

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={(activeStep === 0 && !selectedCountry) || (activeStep === 1 && !paymentMethod)}
                  >
                    {index === steps.length - 1 ? (
                      // "Go to Orders" or "Pay" button on last step
                      <Link to="/orders" style={{ textDecoration: 'none', color: 'white' }}>
                        Go to Orders
                      </Link>
                    ) : (
                      'Continue'
                    )}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>

                  {/* Add Pay button on the last step */}
                  {activeStep === steps.length - 1 && (
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={handlePay} // You can handle payment logic here
                    >
                      Pay Now
                    </Button>
                  )}
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you're finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default Payment;
