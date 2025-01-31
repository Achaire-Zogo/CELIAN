/* eslint-disable default-case */
import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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


function Fleet({
    isCart=false,
    id,
    flotteType= "ELECTRIC",
    vehicules,
}) {

    //console.log(vehicules);
    

        const  isLoggedIn = useSelector(state=>state.isLoggedIn);
        const dispatch = useDispatch();

         const onDataReceived = (data,add=true)=>{
                if(add){
                    //console.log("add item");
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
         
         <ImageList  cols={2} sx={{ maxWidth: 3000, height: 235,transform: 'translateZ(0)' }} rowHeight={200} gap={1}>
      {vehicules.map((item,index) => {
        let isLast = (index+1) % 3 === 0 && vehicules.length % 2 === 1
        let cols =  isLast ? 2 : 1;
        let rows = 1;
      return isLast ?  <ImageListItem key={item.uri} cols={cols} rows={rows} >
          <img
            srcSet={`${item.uri}?w=174&h=200&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.uri}?w=174&h=200&fit=crop&auto=format`}
            alt={item.marque}
            loading="lazy"
          />
        </ImageListItem> : <ImageListItem key={item.uri}  >
          <img
            srcSet={`${item.uri}?w=174&h=200&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.uri}?w=174&h=200&fit=crop&auto=format`}
            alt={item.marque}
            loading="lazy"
          />
        </ImageListItem>
})}
    </ImageList>
    <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Fleet
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Number of Cars : {vehicules.length}, Price : {vehicules.reduce((acc, item) => acc + item.price, 0)} XAF
          </Typography>
         {vehicules.options && <> <Typography gutterBottom variant="h6" component="div">
           Options
          </Typography>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            {vehicules.options.map((_option,index)=>{
                return <Button key={index}>{_option}</Button>
            })}
         </ButtonGroup></>}
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
         
         
        </Card>);
}

export default Fleet