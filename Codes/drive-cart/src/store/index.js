import {createSlice, configureStore} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        openSnackbar: false,
        msg: "",
        snackbarId: 0  // Add this to force updates
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        addItem(state) {
            state.openSnackbar = true;
            state.msg = "Item Added to Cart Successfully !!";
            state.snackbarId += 1;  // Increment to force update
        },
        addVehicle(state) {
            state.openSnackbar = true;
            state.msg = "New Vehicle Added Successfully !!";
            state.snackbarId += 1;  // Increment to force update
        },
        paymentSuccessful(state){
            state.openSnackbar = true;
            state.msg = "Order paid Successfully !!";
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