import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Stack,
  Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { addCart, removeCart } from '../../api-endpoints/endpoints';
import { authActions } from '../../store';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Fleet({ isCart = false, props }) {
  const { id, flotteType, price, vehicules } = props;

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

  // Slider settings
  const sliderSettings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Auto-play the slider
    autoplaySpeed: 3000, // Auto-play speed in milliseconds
    arrows: true, // Show navigation arrows
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
      {/* Slider for Fleet Images */}
      <Box sx={{ width: '100%', height: 250, overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
        <Slider {...sliderSettings}>
          {vehicules.map((item, index) => (
            <Box key={index} sx={{ height: 250, position: 'relative' }}>
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
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          Fleet - {flotteType}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <strong>Number of Vehicles:</strong> {vehicules.length}
          <br />
          <strong>Price:</strong> {price} XAF
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

export default Fleet;