import {React, useState,useEffect} from 'react'
import {Box, Grid, Button} from '@mui/material'
import {useDispatch ,useSelector } from 'react-redux';
import { getUserCart } from '../api-endpoints/endpoints';
import UndoIcon from '@mui/icons-material/Undo';
import IconButton from '@mui/material/IconButton';
import { authActions } from '../store';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

function Cart() {


  const snackbarId = useSelector((state) => state.snackbarId);
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  const popCart = (e)=>{
    e.preventDefault();

    dispatch(authActions.popCart());

  }

 
  useEffect(() => {
    getUserCart()
      .then((data) => setCartItems(data))
      .catch((err) => console.log(err));
  
    
  }, [snackbarId]);

   console.log(cartItems);
  return (
    <Box margin={"auto"}
    marginTop={10}
    marginBottom={10}
    position={'relative'}
   >
    <IconButton onClick={popCart}>
      
      <UndoIcon/>
       {" "}undo
    </IconButton>
    
    <Grid container sx={{
    justifyContent: "center",
    alignItems: "center",
  }}>
    {cartItems && cartItems.map((_, index) => (
      <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }} sx={{margin: 2}}>
        {<CartItem key={_} items={_} />}
       
      </Grid>
    ))}
  </Grid>
  <Button 
  variant='contained'  
  LinkComponent={Link}
  to='/payments'
  sx={{
    position: 'fixed',
    bottom: 8,
    right: 16,    // equivalent to m: 2
    padding: 1,
    zIndex: 1000  // ensures button stays on top of other content
  }}
>
  Proceed to payment
  <PaymentIcon/>
</Button>
  
  </Box>
  )
}

export default Cart