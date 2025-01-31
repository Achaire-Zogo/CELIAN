import {React, useState} from 'react';
import { Card, IconButton, ButtonGroup, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { removeCart, updateCartQuantity } from '../api-endpoints/endpoints'; // Assuming you have an API to update quantity
import { authActions } from '../store';

function CartItem(props) {
    const { id, vehicle, vehicleId, quantity } = props.items;
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [qty, setQty] = useState(quantity);
    const dispatch = useDispatch();

    const onDataReceived = (data) => {
        dispatch(authActions.removeItem());
    };

    const removeFromCart = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            removeCart(vehicleId).then((data) => onDataReceived(data)).catch((err) => console.log(err));
        } else {
            console.log("Not LoggedIn please login or create an account !!");
        }
    };

    const updateQuantity = (newQuantity) => {
        if (isLoggedIn) {
            updateCartQuantity(id, newQuantity) // Assuming you have an API to update quantity
                .then((data) => {
                    setQty(newQuantity);
                    // Dispatch an action to update the quantity in the Redux store
                    //dispatch(authActions.updateItemQuantity({ vehicleId, quantity: newQuantity }));
                })
                .catch((err) => console.log(err));
        } else {
            console.log("Not LoggedIn please login or create an account !!");
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

    return (
        <Card sx={{ width: 345, height: 400, display: 'flex', flexDirection: 'column' }}>
            <ImageList cols={2} sx={{ width: '100%', height: 235, transform: 'translateZ(0)' }} rowHeight={200} gap={1}>
                {vehicle.type === 'FLEET' ? vehicle.vehicules.map((item, index) => {
                    let isLast = (index + 1) % 3 === 0 && vehicle.vehicules.length % 2 === 1;
                    let cols = isLast ? 2 : 1;
                    let rows = 1;
                    return isLast ? (
                        <ImageListItem key={item.uri} cols={cols} rows={rows}>
                            <img
                                srcSet={`${item.uri}?w=174&h=200&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.uri}?w=174&h=200&fit=crop&auto=format`}
                                alt={item.marque}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ) : (
                        <ImageListItem key={item.uri}>
                            <img
                                srcSet={`${item.uri}?w=174&h=200&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.uri}?w=174&h=200&fit=crop&auto=format`}
                                alt={item.marque}
                                loading="lazy"
                            />
                        </ImageListItem>
                    );
                }) : (
                    <ImageListItem key={vehicle.uri} cols={2} rows={1}>
                        <img
                            srcSet={`${vehicle.uri}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                            src={`${vehicle.uri}?w=200&h=200&fit=crop&auto=format`}
                            alt={vehicle.marque}
                            loading="lazy"
                        />
                    </ImageListItem>
                )}
            </ImageList>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                    {vehicle.marque}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Quantity: {qty}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <ButtonGroup size="small" aria-label="quantity control">
                    <Button
                        aria-label="reduce quantity"
                        onClick={decreaseQuantity}
                        disabled={qty <= 1}
                    >
                        <RemoveIcon />
                    </Button>
                    <Button
                        aria-label="increase quantity"
                        onClick={increaseQuantity}
                    >
                        <AddIcon />
                    </Button>
                </ButtonGroup>
                <IconButton
                    size="small"
                    aria-label="remove to cart"
                    color="error"
                    onClick={(e) => removeFromCart(e)}
                >
                    <RemoveShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default CartItem;