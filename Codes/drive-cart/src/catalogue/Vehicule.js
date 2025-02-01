import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import SimpleDialog from './Dialog';

export default function Vehicule({index,isCart=false}) {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.items);
  
  //const [vehicules, setVehicules] = React.useState();
  //const [cartVehicules, setCartVehicules] = React.useState(cart);
  
  const [open, setOpen] = React.useState(false);
  const emails = ['username@gmail.com', 'user02@gmail.com'];
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  
  const addToCart = (e) =>  {
    e.preventDefault();
    console.log(index);
    handleClickOpen();
    //dispatch(authActions.addItem(index));
  

  }
   
  

  const removeFromCart = (e) =>  {
    e.preventDefault();
    console.log(cart, index);
    
    dispatch(authActions.removeItem(index));
    
  

  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/car-63930.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         Mercedes
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{float: 'right'}}>
        { !isCart &&
      <IconButton
             size="small"
            aria-label="add to cart"
            color="inherit"
            onClick={(e)=>addToCart(e)}
          >
           
              <AddShoppingCartIcon />
            
          </IconButton>
}
          {isCart &&
          <IconButton
            size="small"
            aria-label="remove to cart"
            color="error"
            onClick={(e)=>removeFromCart(e)}
          >
           
              <RemoveShoppingCartIcon />
            
          </IconButton>}
      </CardActions>
     
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        callback={()=>dispatch(authActions.addItem(index))}
      />
    </Card>

  );
}
