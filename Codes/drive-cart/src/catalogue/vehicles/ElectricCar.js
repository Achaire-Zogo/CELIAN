import * as React from 'react';
import {Card,Button, ButtonGroup} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { addCart,removeCart } from '../../api-endpoints/endpoints';
import {authActions} from '../../store'


function ElectricCar({
    isCart=false,
    id,
    marque,
    model,
    price,
    uri,
    options,
    type= "ELECTRIC_CAR",
    batteryCapacity,
    drivingRange
}) {
  
   
    const  isLoggedIn = useSelector(state=>state.isLoggedIn);
    const dispatch = useDispatch();

    const onDataReceived = (data,add=true)=>{
        console.log(data);
        if(add){
            //console.log("add item ");
            dispatch(authActions.addItem());
        }
        else{
            dispatch(authActions.removeItem());
        }
    }
    const addToCart = (e) =>  {

        e.preventDefault();

        if(isLoggedIn){
            addCart(id).then((data)=>onDataReceived(data,true)).catch((err)=>console.log(err))
        }
        else{
            console.log("Not LoggedIn please login or create an account !!");
        }
     
  
    }
     
    
  
    const removeFromCart = (e) =>  {
      e.preventDefault();
    
      if(isLoggedIn){
        removeCart(id).then((data)=>onDataReceived(data,false)).catch((err)=>console.log(err))
    }
    else{
        console.log("Not LoggedIn please login or create an account !!");
    }
 
  
    }


    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={uri ? uri : '/car-63930.jpg'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {marque} {model}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Battery Capacity : {batteryCapacity}, Driving Range : {drivingRange}, 
            Price : {price} XAF
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
           Options
          </Typography>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            {options && options.map((_option,index)=>{
                return <Button key={index}>{_option}</Button>
            })}
         </ButtonGroup>
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
            {isCart && <>
                <Typography gutterBottom variant="h6" component="div" sx={{float: 'left', pr: 1, color: 'text.secondary'}}>
           Quantity : {1}
          </Typography>
            <IconButton
              size="small"
              aria-label="remove to cart"
              color="error"
              onClick={(e)=>removeFromCart(e)}
            >
             
                <RemoveShoppingCartIcon />
              
            </IconButton></>}
        </CardActions>
       
       
      </Card>
  
    );
}

export default ElectricCar