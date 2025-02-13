import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  ButtonGroup,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { removeCart, updateCartQuantity } from '../api-endpoints/endpoints';
import { authActions } from '../store';

function CartItem(props) {
  const { id, vehicle, vehicleId, quantity } = props.items;
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();

  const onDataReceived = (data) => {
    dispatch(authActions.removeItem());
  };

  const removeFromCart = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      removeCart(vehicleId)
        .then((data) => onDataReceived(data))
        .catch((err) => console.log(err));
    } else {
      console.log('Not LoggedIn. Please login or create an account!');
    }
  };

  const updateQuantity = (newQuantity) => {
    if (isLoggedIn) {
      updateCartQuantity(id, newQuantity)
        .then((data) => {
          setQty(newQuantity);
          // Dispatch an action to update the quantity in the Redux store
          // dispatch(authActions.updateItemQuantity({ vehicleId, quantity: newQuantity }));
        })
        .catch((err) => console.log(err));
    } else {
      console.log('Not LoggedIn. Please login or create an account!');
    }
  };

  const increaseQuantity = () => {
    const newQuantity = qty + 1;
    updateQuantity(newQuantity);
  };

  const decreaseQuantity = () => {
    if (qty > 1) {
      const newQuantity = qty - 1;
      updateQuantity(newQuantity);
    }
  };

  // Slider settings for fleets
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
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
      {/* Slider for Fleets or Single Image for Other Vehicles */}
      <Box sx={{ width: '100%', height: 235, overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
        {vehicle.type === 'FLEET' ? (
          <Slider {...sliderSettings}>
            {vehicle.vehicules.map((item, index) => (
              <Box key={index} sx={{ height: 235, position: 'relative' }}>
                <img
                  src={item.uri}
                  alt={item.marque}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0',
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: 2,
                  }}
                >
                  {item.marque} {item.model}
                </Typography>
              </Box>
            ))}
          </Slider>
        ) : (
          <img
            src={vehicle.uri}
            alt={vehicle.marque}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px 8px 0 0',
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {vehicle.marque} {vehicle.model}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          <strong>Quantity:</strong> {qty}
        </Typography>
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
        <ButtonGroup size="small" aria-label="quantity control">
          <Button
            aria-label="reduce quantity"
            onClick={decreaseQuantity}
            disabled={qty <= 1}
            sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
          >
            <RemoveIcon />
          </Button>
          <Button
            aria-label="increase quantity"
            onClick={increaseQuantity}
            sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
          >
            <AddIcon />
          </Button>
        </ButtonGroup>
        <IconButton
          size="small"
          aria-label="remove from cart"
          color="error"
          onClick={removeFromCart}
          sx={{ backgroundColor: 'error.main', color: 'white', '&:hover': { backgroundColor: 'error.dark' } }}
        >
          <RemoveShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default CartItem;