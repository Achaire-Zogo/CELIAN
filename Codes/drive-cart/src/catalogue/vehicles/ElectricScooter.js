import * as React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Chip,
  Stack,
  Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { addCart, removeCart } from '../../api-endpoints/endpoints';
import { authActions } from '../../store';

function ElectricScooter({ isCart = false, props }) {
  const { id, marque, model, price, uri, options, batteryCapacity } = props;

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const onDataReceived = (data, add = true) => {
    console.log(data);
    if (add) {
      dispatch(authActions.addItem());
    } else {
      dispatch(authActions.removeItem());
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      addCart(id)
        .then((data) => onDataReceived(data, true))
        .catch((err) => console.log(err));
    } else {
      console.log('Not LoggedIn. Please login or create an account!');
    }
  };

  const removeFromCart = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      removeCart(id)
        .then((data) => onDataReceived(data, false))
        .catch((err) => console.log(err));
    } else {
      console.log('Not LoggedIn. Please login or create an account!');
    }
  };

  return (
    <Card
      sx={{
        width: 345,
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardMedia
        component="img"
        alt={`${marque} ${model}`}
        height="200"
        image={uri ? uri : '/scooter-placeholder.jpg'} // Fallback image if URI is not provided
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {marque} {model}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <strong>Battery Capacity:</strong> {batteryCapacity} kWh
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Options
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {options &&
            options.map((_option, index) => (
              <Chip key={index} label={_option} size="small" sx={{ backgroundColor: '#e0f7fa' }} />
            ))}
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {price} XAF
        </Typography>
        {!isCart ? (
          <IconButton
            size="small"
            aria-label="add to cart"
            color="primary"
            onClick={addToCart}
            sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Quantity: 1
            </Typography>
            <IconButton
              size="small"
              aria-label="remove from cart"
              color="error"
              onClick={removeFromCart}
              sx={{ backgroundColor: 'error.main', color: 'white', '&:hover': { backgroundColor: 'error.dark' } }}
            >
              <RemoveShoppingCartIcon />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </Card>
  );
}

export default ElectricScooter;