import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Snackbar, Alert} from '@mui/material'

import { authActions } from './store';
import { useEffect } from 'react';
import Header from './header/Header';
import Home from './home/Home';
import Catalogue from './catalogue/Catalogue';
import Register from './auth/Register';
import Cart from './cart/Cart';
import Dashboard from './dashboard/Dashboard';
import Order from './orders/Order';
import OrderItem from './orders/OrderItem';

import Payment from './payment/Payment';
import User from './clients/User';
import Login from './auth/Login';
import AddVehicule from './catalogue/vehicles/AddVehicule';
import Profile from './clients/Profile';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const isAdmin = useSelector(state => state.isAdmin);
  
    // Get values from Redux store including the new snackbarId
    const openSnackbar = useSelector((state) => state.openSnackbar);
    const message = useSelector((state) => state.msg);
    const snackbarId = useSelector((state) => state.snackbarId);
  
    // Effect to auto-close Snackbar
    useEffect(() => {
      if (openSnackbar) {
        const timer = setTimeout(() => {
          dispatch(authActions.resetSnackbar());
        }, 3000);
  
        return () => clearTimeout(timer);
      }
    }, [snackbarId, dispatch]); // Dependencies include snackbarId
  
    const handleSnackbarClose = () => {
      dispatch(authActions.resetSnackbar());
    };
   
   // Update state based on changes in Redux store
   useEffect(() => {
     if(localStorage.getItem('token')) {
       dispatch(authActions.login());
     }
     if(localStorage.getItem('clientType') === 'ADMIN'){
      dispatch(authActions.setAdmin());
     }
      
    
   }, [localStorage]); // Watch specific properties, not the entire cart object

  

   return (
     <div>
       <header>
         <Header />
       </header>
       <section>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           { (isLoggedIn && isAdmin) && <>
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path={"/vehicles"} element={<AddVehicule/>}/>
           <Route path="/clients" element={<User />} />
           <Route path="/catalogs" element={<Catalogue />} />
           </>
           
           }
           { isLoggedIn && <>
           <Route path="/orders" element={<Order />} />
           <Route path="/orders/:id" element={<OrderItem />}/>
           <Route path="/cart" element={<Cart />} />
           <Route path="/payments" element={<Payment />} />
           <Route path="/profile" element={<Profile/>}/>
           
           </>
           
          }
           
         </Routes>
       </section>
       <section>
           <Snackbar 
                key={snackbarId} // Add key to force re-render
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
              >
                <Alert
                  onClose={handleSnackbarClose}
                  severity="success"
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  {message}
                </Alert>
              </Snackbar>
       </section>
     </div>
   );
}

export default App;
