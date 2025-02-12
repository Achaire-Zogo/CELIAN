# Documentation des Composants Frontend

## Structure des Composants

### 1. App (`App.js`)
Composant racine de l'application qui gère :
- Le routage principal
- L'état de connexion
- Les notifications globales

```jsx
// Routes principales
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/orders" element={<Order />} />
  <Route path="/orders/:id" element={<OrderItem />}/>
  <Route path="/catalogs" element={<Catalogue />} />
  <Route path="/clients" element={<User />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/payments" element={<Payment />} />
  <Route path="/vehicles" element={<AddVehicule/>}/>
  <Route path="/profile" element={<Profile/>}/>
</Routes>
```

### 2. Catalogue (`catalogue/Catalogue.js`)
Affiche la liste des véhicules avec :
- Filtres de recherche
- Pagination
- Différents types de véhicules

```jsx
const Catalogue = () => {
  // État local
  const [vehicles, setVehicles] = useState([]);
  const [searchParams, setSearchParams] = useState({
    model: '',
    marque: '',
    type: '',
    minPrice: '',
    maxPrice: '',
  });

  // Rendu conditionnel selon le type de véhicule
  const getVehicle = (vehicle, index) => {
    switch (vehicle.type) {
      case 'ELECTRIC_CAR': return <ElectricCar key={index} props={vehicle} />;
      case 'ELECTRIC_SCOOTER': return <ElectricScooter key={index} props={vehicle} />;
      case 'FUEL_SCOOTER': return <FuelScooter key={index} props={vehicle} />;
      case 'FUEL_CAR': return <FuelCar key={index} props={vehicle} />;
      case 'FLEET': return <Fleet key={index} isCart={false} props={vehicle} />;
      default: return null;
    }
  };
}
```

### 3. Panier (`cart/Cart.js`)
Gère le panier d'achat avec :
- Liste des articles
- Calcul du total
- Actions (ajout/suppression)
- Annulation

```jsx
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  // Chargement du panier
  useEffect(() => {
    getUserCart()
      .then((data) => setCartItems(data))
      .catch((err) => console.error(err));
  }, []);

  // Actions du panier
  const handleUndo = () => {
    undoCart()
      .then(() => dispatch(authActions.undoCart()))
      .catch((err) => console.error(err));
  };
}
```

### 4. Paiement (`payment/Payment.js`)
Processus de paiement en plusieurs étapes :
- Sélection du pays
- Choix du mode de paiement
- Confirmation

```jsx
function Payment() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(8);
  const [paymentMethod, setPaymentMethod] = useState(3);

  const paymentMethods = [
    { id: 1, name: 'PayPal', value: 'CASH' },
    { id: 2, name: 'Credit Card', value: 'CASH' },
    { id: 3, name: 'Mobile Money', value: 'CASH' },
    { id: 4, name: 'Orange Money', value: 'CASH' },
    { id: 5, name: 'Credit', value: 'CREDIT' },
  ];

  // Gestion du paiement
  const handlePay = (e) => {
    e.preventDefault();
    payUserOrders(paymentMethods[paymentMethod - 1].value, selectedCountry)
      .then((data) => {
        dispatch(authActions.paymentSuccessful());
        navigate('/orders');
      });
  };
}
```

### 5. Dashboard (`dashboard/Dashboard.js`)
Interface d'administration avec :
- Statistiques
- Graphiques
- Gestion des ressources

```jsx
function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [salesData, setSalesData] = useState([]);

  // Chargement des données
  useEffect(() => {
    getAllUsers().then((data) => setUserCount(data.length));
    getAllVehicles().then((data) => setVehicleCount(data.length));
    getAllOrders().then((data) => setOrderCount(data.length));
  }, []);

  // Graphiques avec Recharts
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </Grid>
    </Grid>
  );
}
```

## Gestion de l'État (Redux)

### Store Configuration
```javascript
// store/index.js
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    items: [],
    msg: null,
    openSnackbar: false,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});
```

## Composants Réutilisables

### 1. VehicleCard
```jsx
function VehicleCard({ vehicle, onAddToCart }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={vehicle.uri}
        alt={vehicle.model}
      />
      <CardContent>
        <Typography variant="h5">{vehicle.marque} {vehicle.model}</Typography>
        <Typography variant="body2" color="text.secondary">
          Prix: {vehicle.price}€
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onAddToCart(vehicle.id)}>
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
```

### 2. LoadingSpinner
```jsx
function LoadingSpinner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress size={60} />
    </Box>
  );
}
```

### 3. ErrorMessage
```jsx
function ErrorMessage({ message }) {
  return (
    <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginTop: 4 }}>
      {message}
    </Typography>
  );
}
```

## Styles et Thème

### Configuration du thème Material-UI
```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
```

## Hooks Personnalisés

### useAuth
```javascript
function useAuth() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const login = async (credentials) => {
    try {
      const response = await loginAPI(credentials);
      localStorage.setItem('token', response.token);
      dispatch(authActions.login());
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(authActions.logout());
  };

  return { isLoggedIn, login, logout };
}
```

### useCart
```javascript
function useCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.items);

  const addToCart = async (vehicleId, quantity = 1) => {
    try {
      await addCart(vehicleId, quantity);
      dispatch(authActions.addItem({ vehicleId, quantity }));
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await removeCart(cartId);
      dispatch(authActions.removeItem(cartId));
    } catch (error) {
      throw error;
    }
  };

  return { cartItems, addToCart, removeFromCart };
}
```
