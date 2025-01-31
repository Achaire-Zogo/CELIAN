import * as React from 'react';
import {Card,Button, ButtonGroup} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { addCart,removeCart } from '../../api-endpoints/endpoints';
import {authActions} from '../../store'


function FuelCar({
    isCart=false,
    id,
    marque,
    model,
    price,
    uri,
    options,
    type= "FUEL_CAR",
    engineSize,
    fuelType
}) {
   
     const  isLoggedIn = useSelector(state=>state.isLoggedIn);
                const dispatch = useDispatch();
        
             const onDataReceived = (data,add=true)=>{
                    console.log(data);
                    if(add){
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
            image={uri}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             {marque} model {model}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Engine Size : {engineSize}, Fuel Type : {fuelType},
              Price : {price}

            </Typography>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              {options && options.map((_option)=>{
                  return <Button>{_option}</Button>
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
         
         
        </Card>
    
      );
}

export default FuelCar