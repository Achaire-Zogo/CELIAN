import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  People as PeopleIcon,
  DirectionsCar as CarIcon,
  ShoppingCart as CartIcon,
  Receipt as OrderIcon,
  Public as GlobeIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { getAllUsers, getAllVehicles, getUserCart, getAllOrders, getAllCountries } from '../api-endpoints/endpoints'; // Import your API functions

// Custom styled Paper component for cards
const Card = ({ icon, title, value, color }) => (
  <Paper
    sx={{
      p: 3,
      textAlign: 'center',
      backgroundColor: color,
      color: 'white',
      borderRadius: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {icon}
    <Typography variant="h6" sx={{ mt: 2 }}>
      {title}
    </Typography>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
      {value}
    </Typography>
  </Paper>
);

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [countryCount, setCountryCount] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoints
    getAllUsers().then((data) => setUserCount(data.length));
    getAllVehicles().then((data) => setVehicleCount(data.length));
    getUserCart().then((data) => setCartItems(data.items?.length));
    getAllOrders().then((data) => setOrderCount(data.length));
    getAllCountries().then((data) => setCountryCount(data.length));

    // Mock data for charts (replace with real API data)
    setSalesData([
      { name: 'Jan', sales: 4000 },
      { name: 'Feb', sales: 3000 },
      { name: 'Mar', sales: 2000 },
      { name: 'Apr', sales: 2780 },
      { name: 'May', sales: 1890 },
      { name: 'Jun', sales: 2390 },
    ]);

    setVehicleData([
      { name: 'Electric Cars', count: 12 },
      { name: 'Fuel Cars', count: 8 },
      { name: 'Electric Scooters', count: 15 },
      { name: 'Fuel Scooters', count: 10 },
    ]);
  }, []);

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Users Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <motion.div variants={cardVariants} initial="hidden" animate="visible">
            <Card
              icon={<PeopleIcon sx={{ fontSize: 50 }} />}
              title="Users"
              value={userCount}
              color="#3f51b5"
            />
          </motion.div>
        </Grid>

        {/* Vehicles Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Card
              icon={<CarIcon sx={{ fontSize: 50 }} />}
              title="Vehicles"
              value={vehicleCount}
              color="#4caf50"
            />
          </motion.div>
        </Grid>

        {/* Cart Items Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Card
              icon={<CartIcon sx={{ fontSize: 50 }} />}
              title="Cart Items"
              value={cartItems}
              color="#ff9800"
            />
          </motion.div>
        </Grid>

        {/* Orders Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <Card
              icon={<OrderIcon sx={{ fontSize: 50 }} />}
              title="Orders"
              value={orderCount}
              color="#e91e63"
            />
          </motion.div>
        </Grid>

        {/* Countries Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            <Card
              icon={<GlobeIcon sx={{ fontSize: 50 }} />}
              title="Countries"
              value={countryCount}
              color="#9c27b0"
            />
          </motion.div>
        </Grid>

        {/* Sales Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Monthly Sales
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Vehicle Distribution Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Vehicle Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vehicleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;