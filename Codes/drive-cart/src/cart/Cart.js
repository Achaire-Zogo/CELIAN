import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, IconButton, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart } from '../api-endpoints/endpoints';
import UndoIcon from '@mui/icons-material/Undo';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link } from 'react-router-dom';
import { authActions } from '../store';
import CartItem from './CartItem';

function Cart() {
  const snackbarId = useSelector((state) => state.snackbarId);
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from the backend
  useEffect(() => {
    setLoading(true);
    getUserCart()
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load cart items. Please try again later.');
        setLoading(false);
      });
  }, [snackbarId]);

  // Handle undo action
  const popCart = (e) => {
    e.preventDefault();
    dispatch(authActions.popCart());
  };

  return (
    <Box
      sx={{
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
        padding: 3,
        position: 'relative',
      }}
    >
      {/* Undo Button */}
      <IconButton
        onClick={popCart}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          zIndex: 1000, // Ensures button stays on top of other content
        }}
      >
        <UndoIcon sx={{ marginRight: 1 }} />
        <Typography variant="body1">Undo</Typography>
      </IconButton>

      {/* Loading State */}
      {loading ? (
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
        // Error State
        <Typography
          variant="h6"
          color="error"
          sx={{ textAlign: 'center', marginTop: 4 }}
        >
          {error}
        </Typography>
      ) : cartItems.length === 0 ? (
        // Empty Cart State
        <Typography
          variant="h5"
          sx={{ textAlign: 'center', marginTop: 4, color: 'text.secondary' }}
        >
          Your cart is empty.
        </Typography>
      ) : (
        // Display Cart Items
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {cartItems.map((item, index) => (
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
              <CartItem items={item} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Proceed to Payment Button */}
      {cartItems.length > 0 && (
        <Button
          variant="contained"
          component={Link}
          to="/payments"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            padding: '12px 24px',
            borderRadius: 2,
            zIndex: 1000, // Ensures button stays on top of other content
          }}
          startIcon={<PaymentIcon />}
        >
          Proceed to Payment
        </Button>
      )}
    </Box>
  );
}

export default Cart;