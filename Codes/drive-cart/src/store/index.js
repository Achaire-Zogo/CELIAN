import {createSlice, configureStore} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        isAdmin: false,
        openSnackbar: false,
        msg: "",
        snackbarId: 0 , // Add this to force updates
        vehicleSnackbarId: 0
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        setAdmin(state){
            state.isAdmin = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.isAdmin = false;
        },
        addItem(state) {
            state.openSnackbar = true;
            state.msg = "Item Added to Cart Successfully !!";
            state.snackbarId += 1;  // Increment to force update
        },
        addVehicle(state) {
            state.openSnackbar = true;
            state.msg = "New Vehicle Added Successfully !!";
            state.vehicleSnackbarId += 1;  // Increment to force update
        },
        paymentSuccessful(state){
            state.openSnackbar = true;
            state.msg = "Order paid Successfully !!";
            state.snackbarId +=1;
        },
        popCart(state){
            state.openSnackbar = true;
            state.msg = "Undo successful !!";
            state.snackbarId +=1;
        },
        removeItem(state) {
            state.openSnackbar = true;
            state.msg = "Item Removed from Cart Successfully !!";
            state.snackbarId += 1;  // Increment to force update
        },
        resetSnackbar(state) {
            state.openSnackbar = false;
            state.msg = "";
        }
    },
});

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer
});